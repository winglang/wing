use itertools::Itertools;
use lsp_types::{
	Command, CompletionItem, CompletionItemKind, CompletionResponse, Documentation, InsertTextFormat, MarkupContent,
	MarkupKind, Position, Range, TextEdit,
};
use std::cmp::max;
use tree_sitter::{Node, Point};

use crate::ast::{
	CalleeKind, Expr, ExprKind, Phase, Scope, Symbol, TypeAnnotation, TypeAnnotationKind, UserDefinedType,
};
use crate::closure_transform::{CLOSURE_CLASS_PREFIX, PARENT_THIS_NAME};
use crate::diagnostic::{WingLocation, WingSpan};
use crate::docs::Documented;
use crate::lsp::sync::{JSII_TYPES, PROJECT_DATA, WING_TYPES};
use crate::type_check::symbol_env::{LookupResult, StatementIdx};
use crate::type_check::{
	fully_qualify_std_type, import_udt_from_jsii, resolve_super_method, resolve_user_defined_type, ClassLike, Namespace,
	Struct, SymbolKind, Type, TypeRef, Types, UnsafeRef, VariableKind, CLASS_INFLIGHT_INIT_NAME, CLASS_INIT_NAME,
};
use crate::visit::{visit_expr, visit_type_annotation, Visit};
use crate::wasm_util::{ptr_to_string, string_to_combined_ptr, WASM_RETURN_ERROR};
use crate::{WINGSDK_ASSEMBLY_NAME, WINGSDK_STD_MODULE};

use super::sync::check_utf8;

#[no_mangle]
pub unsafe extern "C" fn wingc_on_completion(ptr: u32, len: u32) -> u64 {
	let parse_string = ptr_to_string(ptr, len);
	if let Ok(parsed) = serde_json::from_str(&parse_string) {
		let result = on_completion(parsed);
		let result = serde_json::to_string(&result).unwrap();

		// return result as u64 with ptr and len
		string_to_combined_ptr(result)
	} else {
		WASM_RETURN_ERROR
	}
}

pub fn on_completion(params: lsp_types::CompletionParams) -> CompletionResponse {
	WING_TYPES.with(|types| {
		let mut types = types.borrow_mut();
		let mut final_completions = PROJECT_DATA.with(|project_data| {
			let project_data = project_data.borrow();
			let uri = params.text_document_position.text_document.uri;
			let file = check_utf8(uri.to_file_path().expect("LSP only works on real filesystems"));
			let root_ts_node = project_data.trees.get(&file).expect("tree not found").root_node();
			let root_scope = project_data.asts.get(&file).expect("ast not found");
			let root_env = types.get_scope_env(root_scope);
			let contents = project_data.files.get_file(&file).expect("file not found");

			// get all character from file_data.contents up to the current position
			let preceding_text = contents
				.lines()
				.enumerate()
				.take_while(|(i, _)| *i <= params.text_document_position.position.line as usize)
				.map(|(i, s)| {
					if i == params.text_document_position.position.line as usize {
						&s[..params.text_document_position.position.character as usize].trim_end()
					} else {
						s
					}
				})
				.join("\n");
			let last_char_is_colon = preceding_text.ends_with(':');

			let true_point = Point::new(
				params.text_document_position.position.line as usize,
				params.text_document_position.position.character as usize,
			);
			let true_node = root_ts_node
				.named_descendant_for_point_range(true_point, true_point)
				.unwrap();
			if true_node.is_extra() && !true_node.is_error() {
				// this is a comment, so don't show anything
				return vec![];
			}

			let node_to_complete = nearest_interesting_node(
				Point::new(
					params.text_document_position.position.line as usize,
					max(params.text_document_position.position.character as i64 - 1, 0) as usize,
				),
				&root_ts_node,
			);
			let node_to_complete_kind = node_to_complete.kind();

			let mut scope_visitor = ScopeVisitor::new(
				node_to_complete.parent().map(|parent| WingSpan {
					start: parent.start_position().into(),
					end: parent.end_position().into(),
					file_id: file.to_string(),
				}),
				WingSpan {
					start: node_to_complete.start_position().into(),
					end: node_to_complete.end_position().into(),
					file_id: file.to_string(),
				},
				params.text_document_position.position.into(),
				&root_scope,
			);
			scope_visitor.visit();

			let found_env = types.get_scope_env(&scope_visitor.found_scope);

			// references have a complicated hierarchy, so it's useful to know the nearest non-reference parent
			let mut nearest_non_reference_parent = node_to_complete.parent();
			while let Some(parent) = nearest_non_reference_parent {
				let parent_kind = parent.kind();
				if parent.is_error() || matches!(parent_kind, "identifier" | "reference" | "reference_identifier") {
					nearest_non_reference_parent = parent.parent();
				} else {
					break;
				}
			}
			let nearest_non_reference_parent = nearest_non_reference_parent.unwrap_or(root_ts_node);

			if node_to_complete_kind == "." || node_to_complete_kind == "?." || node_to_complete_kind == "member_identifier" {
				let parent = node_to_complete.parent().expect("A dot must have a parent");

				if let Some(nearest_expr) = scope_visitor.nearest_expr {
					let mut nearest_expr_type = types.get_expr_type(nearest_expr);
					if let ExprKind::Call { .. } = &nearest_expr.kind {
						if let Some(f) = nearest_expr_type.maybe_unwrap_option().as_function_sig() {
							nearest_expr_type = f.return_type;
						}
					}

					// If we are inside an incomplete reference, there is possibly a type error or an anything which has no completions
					if !nearest_expr_type.is_unresolved() {
						// We need to double-check for an invalid nested reference (e.g. If there are multiple dots in a row)
						if preceding_text.ends_with("..") || preceding_text.ends_with(".?.?") {
							return vec![];
						}

						let mut completions = get_completions_from_type(&nearest_expr_type, &types, Some(found_env.phase), true);
						if nearest_expr_type.is_option() {
							// check to see if we need to add a ? to the completion
							let replace_node = if node_to_complete_kind == "." {
								Some(node_to_complete)
							} else {
								node_to_complete.prev_sibling().filter(|n| n.kind() == ".")
							};
							if let Some(replace_node) = replace_node {
								let extra_edit = Some(vec![TextEdit {
									new_text: "?.".to_string(),
									range: Range {
										start: Position {
											character: replace_node.start_position().column as u32,
											line: replace_node.start_position().row as u32,
										},
										end: Position {
											character: replace_node.end_position().column as u32,
											line: replace_node.end_position().row as u32,
										},
									},
								}]);
								for completion in completions.iter_mut() {
									completion.additional_text_edits = extra_edit.clone();
								}
							}
						}

						return completions;
					}
				}

				let is_new_expression = if let Some(parent) = parent.parent() {
					parent.kind() == "new_expression"
				} else {
					false
				};

				let filter_completions = |completions: Vec<CompletionItem>| {
					if !is_new_expression {
						completions
					} else {
						completions
							.iter()
							.filter(|c| {
								matches!(
									c.kind,
									Some(CompletionItemKind::CLASS) | Some(CompletionItemKind::MODULE)
								)
							})
							.cloned()
							.map(|mut c| {
								if c.kind == Some(CompletionItemKind::CLASS) {
									convert_to_call_completion(&mut c);
								}
								c
							})
							.collect()
					}
				};

				if let Some(nearest_type_annotation) = scope_visitor.nearest_type_annotation {
					if let TypeAnnotationKind::UserDefined(udt) = &nearest_type_annotation.kind {
						let type_lookup = resolve_user_defined_type(udt, &found_env, scope_visitor.found_stmt_index.unwrap_or(0));

						let completions = if let Ok(type_lookup) = type_lookup {
							get_completions_from_type(&type_lookup, &types, Some(found_env.phase), false)
						} else {
							// this is probably a namespace, let's look it up
							if let Some(namespace) = root_env
								.lookup_nested_str(&udt.full_path_str(), scope_visitor.found_stmt_index)
								.ok()
								.and_then(|n| n.0.as_namespace_ref())
							{
								get_completions_from_namespace(&namespace, Some(found_env.phase))
							} else {
								// This is not a known type or namespace
								vec![]
							}
						};

						return filter_completions(completions);
					}
				}

				// We're likely in a type reference of some kind, so let's use the raw text for a lookup
				let reference_bytes = &preceding_text.as_bytes()[parent.start_byte()..node_to_complete.start_byte()];
				let reference_text =
					fully_qualify_std_type(std::str::from_utf8(reference_bytes).expect("Reference must be valid utf8"));

				if let Some((lookup_thing, _)) = found_env
					.lookup_nested_str(&reference_text, scope_visitor.found_stmt_index)
					.ok()
				{
					let completions = match lookup_thing {
						SymbolKind::Type(t) => get_completions_from_type(&t, &types, Some(found_env.phase), false),
						SymbolKind::Variable(v) => get_completions_from_type(&v.type_, &types, Some(found_env.phase), false),
						SymbolKind::Namespace(n) => {
							// If the types in this namespace aren't loaded yet, load them now to get completions
							if !n.loaded {
								JSII_TYPES.with(|jsii_types| {
									let jsii_types = jsii_types.borrow();
									let parts = reference_text.split(".").collect::<Vec<_>>();
									// Dummy type representing the namespace to be loaded
									let udt = UserDefinedType {
										root: Symbol::global(parts[0].to_string()),
										fields: parts[1..].iter().map(|s| Symbol::global(s.to_string())).collect(),
										span: WingSpan::default(),
									};
									// Import all types in the namespace by trying to load the "dummy type"
									import_udt_from_jsii(&mut types, &jsii_types, &udt, &project_data.jsii_imports);
								});
							}
							get_completions_from_namespace(&n, Some(found_env.phase))
						}
					};

					return filter_completions(completions);
				}

				return vec![];
			} else if matches!(node_to_complete_kind, "struct_literal" | "json_map_literal")
				|| matches!(
					nearest_non_reference_parent.kind(),
					"struct_literal" | "struct_literal_member" | "json_map_literal" | "set_literal"
				) {
				// check to see if ":" is the last character of the same line up to the cursor
				// if it is, we want an expression instead of struct completions
				if !last_char_is_colon {
					if let Some(mut expr) = scope_visitor.expression_trail.iter().last() {
						if let ExprKind::Reference { .. } = &expr.kind {
							// if the nearest expressions is a reference, go to the next one instead
							// This covers cases where a field is partially entered like the following:
							// {
							//   field1: "good",
							//   f
							//  //^
							// }
							expr = scope_visitor.expression_trail.iter().nth_back(1).unwrap();
						}

						let (fields, structy) = if let ExprKind::StructLiteral { fields, .. } = &expr.kind {
							(fields, types.get_expr_type(expr))
						} else if let ExprKind::JsonMapLiteral { fields, .. } = &expr.kind {
							if let Some(structy) = types.get_type_from_json_cast(expr.id) {
								(fields, *structy)
							} else {
								return vec![];
							}
						} else {
							return vec![];
						};

						return if let Some(structy) = structy.maybe_unwrap_option().as_struct() {
							get_inner_struct_completions(structy, &fields.keys().map(|f| f.name.clone()).collect())
						} else {
							vec![]
						};
					}
				}
			} else if !last_char_is_colon
				&& (node_to_complete_kind == "argument_list"
					|| matches!(
						nearest_non_reference_parent.kind(),
						"argument_list" | "positional_argument"
					)) {
				if let Some(callish_expr) = scope_visitor.expression_trail.iter().rev().find_map(|e| match &e.kind {
					ExprKind::Call { arg_list, callee } => Some((
						match callee {
							CalleeKind::Expr(expr) => types.get_expr_type(expr),
							CalleeKind::SuperCall(method) => {
								resolve_super_method(method, &found_env, &types).map_or(types.error(), |(t, _)| t)
							}
						},
						arg_list,
					)),
					ExprKind::New(new_expr) => Some((types.get_expr_type(&e), &new_expr.arg_list)),
					_ => None,
				}) {
					let mut completions =
						get_current_scope_completions(&types, &scope_visitor, &node_to_complete, &preceding_text);

					let arg_list_strings = &callish_expr
						.1
						.named_args
						.iter()
						.map(|(k, _)| k.name.clone())
						.collect::<Vec<_>>();

					// if we're in a function, get the struct expansion
					if let Some(structy) = callish_expr.0.get_function_struct_arg() {
						let func = callish_expr.0.maybe_unwrap_option().as_function_sig().unwrap();
						if callish_expr
							.1
							.pos_args
							.iter()
							.filter(|a| !types.get_expr_type(a).is_unresolved())
							.count() == func.parameters.len() - 1
						{
							completions.extend(get_inner_struct_completions(structy, arg_list_strings));
						}
					}

					if let Some(class_type) = callish_expr.0.maybe_unwrap_option().as_class() {
						let init_method = if found_env.phase == Phase::Preflight {
							class_type.get_method(&Symbol::global(CLASS_INIT_NAME.to_string()))
						} else if found_env.phase == Phase::Inflight {
							class_type.get_method(&Symbol::global(CLASS_INFLIGHT_INIT_NAME.to_string()))
						} else {
							return vec![];
						};
						if let Some(init_method) = init_method {
							let func = init_method.type_.maybe_unwrap_option().as_function_sig().unwrap();
							if callish_expr
								.1
								.pos_args
								.iter()
								.filter(|a| !types.get_expr_type(a).is_unresolved())
								.count() == func.parameters.len() - 1
							{
								if let Some(structy) = init_method.type_.get_function_struct_arg() {
									completions.extend(get_inner_struct_completions(structy, arg_list_strings));
								}
							}
						}
					}

					return completions;
				}
			}

			// fallback: no special completions, just get stuff from the current scope
			get_current_scope_completions(&types, &scope_visitor, &node_to_complete, &preceding_text)
		});

		final_completions = final_completions
			.iter()
			.map(|item| {
				let mut new_item = item.clone();
				new_item.sort_text = Some(completion_sort_text(&new_item));
				new_item
			})
			.collect();

		CompletionResponse::Array(final_completions)
	})
}

/// Get symbols in the current scope as completion items
fn get_current_scope_completions(
	types: &Types,
	scope_visitor: &ScopeVisitor,
	node_to_complete: &Node,
	preceding_text: &String,
) -> Vec<CompletionItem> {
	let mut completions = vec![];

	// by default assume being after a colon means we're looking for a type, but this is not always true
	let mut in_type = preceding_text.ends_with(':');

	match node_to_complete.kind() {
		// there are no possible completions that could follow ")"
		")" => return vec![],

		"set_literal" | "struct_literal" => {
			in_type = false;
		}

		"struct_definition" | "interface_implementation" => {
			if preceding_text.ends_with("extends") {
				// TODO Should only show namespaces and matching types
				in_type = true;
			} else if !in_type {
				return vec![];
			}
		}

		"resource_implementation" | "class_implementation" => {
			if preceding_text.ends_with("impl") {
				// TODO Should only show namespaces and classes
				in_type = true;
			} else if !in_type {
				// we are inside a class definition, so for now let's show nothing at all
				return vec![CompletionItem {
					label: "init".to_string(),
					insert_text: Some("init($1) {\n\t$2\n}".to_string()),
					insert_text_format: Some(InsertTextFormat::SNIPPET),
					kind: Some(CompletionItemKind::SNIPPET),
					..Default::default()
				}];
			}
		}

		// We are somewhere in the root of a file, so let's add some fun snippets
		"source" => {
			completions.push(CompletionItem {
				label: "test \"\" { }".to_string(),
				filter_text: Some("test".to_string()),
				insert_text: Some("test \"$1\" {\n\t$2\n}".to_string()),
				insert_text_format: Some(InsertTextFormat::SNIPPET),
				kind: Some(CompletionItemKind::SNIPPET),
				..Default::default()
			});
		}

		// in block-style statements, there are no possible completions that can follow the keyword
		"interface" | "struct" | "class" | "test" => {
			return vec![];
		}

		_ => {}
	}

	if let Some(parent) = node_to_complete.parent() {
		let parent_kind = if parent.is_error() || parent.kind() == "reference" {
			parent.parent().map(|p| p.kind()).unwrap_or("source")
		} else {
			parent.kind()
		};

		match parent_kind {
			// Event if it looks like we want a type (e.g. we are following a ":"),
			// we actually want an expression here
			"argument_list"
			| "call"
			| "struct_literal"
			| "set_literal"
			| "struct_literal_member"
			| "new_expression"
			| "keyword_argument_value" => {
				in_type = false;
			}

			"struct_definition" | "interface_implementation" => {
				if !in_type {
					return vec![];
				}
			}

			"resource_implementation" | "class_implementation" => {
				if !in_type {
					// we are inside a class definition, so for now let's show nothing at all
					return vec![CompletionItem {
						label: "init".to_string(),
						insert_text: Some("init($1) {\n\t$2\n}".to_string()),
						insert_text_format: Some(InsertTextFormat::SNIPPET),
						kind: Some(CompletionItemKind::SNIPPET),
						..Default::default()
					}];
				}
			}

			"parameter_list" => {
				return vec![];
			}

			"json_map_literal" => {
				return vec![];
			}

			"custom_type" => in_type = true,
			_ => {}
		}
	}

	let found_stmt_index = scope_visitor.found_stmt_index.unwrap_or_default();
	let found_env = types.get_scope_env(&scope_visitor.found_scope);

	for symbol_data in found_env.symbol_map.iter().filter(|s| {
		if let StatementIdx::Index(i) = s.1 .0 {
			// within the found scope, we only want to show symbols that were defined before the current position
			i < found_stmt_index
		} else {
			true
		}
	}) {
		let symbol_kind = &symbol_data.1 .1;

		if let Some(completion) = format_symbol_kind_as_completion(symbol_data.0, symbol_kind) {
			completions.push(completion);
		}
	}

	if let Some(parent) = found_env.parent {
		for data in parent.iter(true) {
			if let Some(completion) = format_symbol_kind_as_completion(&data.0, &data.1) {
				if completions.iter().all(|c| c.label != completion.label) {
					completions.push(completion);
				}
			}
		}
	}

	if !in_type {
		completions.push(CompletionItem {
			label: "inflight () => {}".to_string(),
			filter_text: Some("inflight".to_string()),
			insert_text: Some("inflight ($1) => {$2}".to_string()),
			insert_text_format: Some(InsertTextFormat::SNIPPET),
			kind: Some(CompletionItemKind::SNIPPET),
			..Default::default()
		});
	}

	if in_type {
		// show only namespaces and types
		completions
			.into_iter()
			.filter(|c| {
				matches!(
					c.kind,
					Some(CompletionItemKind::CLASS)
						| Some(CompletionItemKind::MODULE)
						| Some(CompletionItemKind::ENUM)
						| Some(CompletionItemKind::STRUCT)
						| Some(CompletionItemKind::INTERFACE)
				)
			})
			.collect()
	} else {
		// we're not looking for a type, so hide things that can only result in types
		completions
			.into_iter()
			.filter(|c| !matches!(c.kind, Some(CompletionItemKind::INTERFACE)))
			.collect()
	}
}

/// Within root_node, find the nearest (previous) node on the same line that is interesting for completion
fn nearest_interesting_node<'a>(mut point: Point, root_node: &'a tree_sitter::Node<'a>) -> tree_sitter::Node<'a> {
	loop {
		let search_node = root_node
			.descendant_for_point_range(point, point)
			.expect("There is always at-least one tree-sitter node");

		if point.column == 0 || (search_node.kind() != "source" && search_node.kind() != "block" && !search_node.is_error())
		{
			return search_node;
		}

		point.column -= 1;
	}
}

/// Given a CompletionItem, mutates it so it can be used as a snippet to trigger parameter hints
fn convert_to_call_completion(completion_item: &mut CompletionItem) {
	completion_item.insert_text = Some(format!("{}($0)", completion_item.label));
	completion_item.insert_text_format = Some(InsertTextFormat::SNIPPET);
	completion_item.command = Some(Command {
		title: "triggerParameterHints".to_string(),
		command: "editor.action.triggerParameterHints".to_string(),
		arguments: None,
	});
}

/// LSP sorts completions items alphabetically
/// This function returns a string that can be used to sort the completion items in a more logical order
fn completion_sort_text(completion_item: &CompletionItem) -> String {
	let completion_kind = completion_item.kind;
	let letter = if let Some(kind) = completion_kind {
		match kind {
			CompletionItemKind::ENUM_MEMBER => "aa",
			CompletionItemKind::FIELD => "ab",
			CompletionItemKind::VARIABLE => "bb",
			CompletionItemKind::FUNCTION => "cc",
			CompletionItemKind::PROPERTY => "dd",
			CompletionItemKind::METHOD => "ff",
			CompletionItemKind::CLASS => "gg",
			CompletionItemKind::STRUCT => "hh",
			CompletionItemKind::INTERFACE => "ii",
			CompletionItemKind::ENUM => "jj",
			CompletionItemKind::MODULE => "kk",
			CompletionItemKind::SNIPPET => "ll",
			_ => "z",
		}
	} else {
		"z"
	};
	format!("{}|{}", letter, completion_item.label)
}

/// Create completion for fields within a struct.
/// This can be used in calls (struct expansion) or in struct literals
fn get_inner_struct_completions(struct_: &Struct, existing_fields: &Vec<String>) -> Vec<CompletionItem> {
	let mut completions = vec![];

	for field_data in struct_.env.iter(true) {
		if !existing_fields.contains(&field_data.0) {
			if let Some(mut base_completion) = format_symbol_kind_as_completion(&field_data.0, &field_data.1) {
				let v = field_data.1.as_variable().unwrap();
				if v.type_.maybe_unwrap_option().is_struct() {
					base_completion.insert_text = Some(format!("{}: {{\n$1\n}}", field_data.0));
				} else {
					base_completion.insert_text = Some(format!("{}: $1", field_data.0));
				}

				base_completion.label = format!("{}:", base_completion.label);
				base_completion.kind = Some(CompletionItemKind::FIELD);
				base_completion.insert_text_format = Some(InsertTextFormat::SNIPPET);
				base_completion.command = Some(Command {
					title: "triggerCompletion".to_string(),
					command: "editor.action.triggerSuggest".to_string(),
					arguments: None,
				});
				completions.push(base_completion);
			}
		}
	}
	return completions;
}

/// Gets accessible properties on a type as a list of CompletionItems
fn get_completions_from_type(
	type_: &TypeRef,
	types: &Types,
	current_phase: Option<Phase>,
	is_instance: bool,
) -> Vec<CompletionItem> {
	let type_ = *type_.maybe_unwrap_option();
	let type_ = &*types.maybe_unwrap_inference(type_);
	match type_ {
		Type::Class(c) => get_completions_from_class(c, current_phase, is_instance),
		Type::Interface(i) => get_completions_from_class(i, current_phase, is_instance),
		Type::Struct(s) => get_completions_from_class(s, current_phase, is_instance),
		Type::Enum(enum_) => {
			let variants = &enum_.values;
			variants
				.iter()
				.map(|item| CompletionItem {
					label: item.name.clone(),
					detail: Some(enum_.name.name.clone()),
					kind: Some(CompletionItemKind::ENUM_MEMBER),
					..Default::default()
				})
				.collect()
		}
		Type::Optional(t) => get_completions_from_type(t, types, current_phase, is_instance),
		Type::Void | Type::Function(_) | Type::Anything | Type::Unresolved | Type::Inferred(_) => vec![],
		Type::Number
		| Type::String
		| Type::Duration
		| Type::Boolean
		| Type::Json(_)
		| Type::MutJson
		| Type::Nil
		| Type::Array(_)
		| Type::MutArray(_)
		| Type::Map(_)
		| Type::MutMap(_)
		| Type::Set(_)
		| Type::MutSet(_) => {
			let type_name = type_.to_string();
			let mut type_name = type_name.as_str();

			// Certain primitive type names differ from how they actually appear in the std namespace
			// These are unique when used as a type definition, rather than as a type reference when calling a static method
			type_name = match type_name {
				"str" => "String",
				"duration" => "Duration",
				"bool" => "Boolean",
				"num" => "Number",
				_ => type_name,
			};
			let final_type_name = fully_qualify_std_type(type_name);
			let final_type_name = final_type_name.as_str();

			let fqn = format!("{WINGSDK_ASSEMBLY_NAME}.{final_type_name}");
			if let LookupResult::Found(std_type, _) = types.libraries.lookup_nested_str(fqn.as_str(), None) {
				return get_completions_from_type(&std_type.as_type().expect("is type"), types, current_phase, is_instance);
			} else {
				vec![]
			}
		}
	}
}

fn get_completions_from_namespace(
	namespace: &UnsafeRef<Namespace>,
	current_phase: Option<Phase>,
) -> Vec<CompletionItem> {
	// If a namespace has a class named "Util", then its members can be accessed directly from
	// the namespace as a syntactic sugar. e.g. "foo.bar()" is equivalent to "foo.Util.bar()"
	let util_completions = match namespace.env.lookup_nested_str("Util", None) {
		LookupResult::Found(kind, _) => match kind {
			SymbolKind::Type(typeref) => {
				let util_class = typeref.as_class();
				if let Some(util_class) = util_class {
					get_completions_from_class(util_class, current_phase, false)
				} else {
					vec![]
				}
			}
			SymbolKind::Variable(_) => vec![],
			SymbolKind::Namespace(_) => vec![],
		},
		LookupResult::NotFound(_) => vec![],
		LookupResult::DefinedLater => vec![],
		LookupResult::ExpectedNamespace(_) => vec![],
	};
	namespace
		.env
		.symbol_map
		.iter()
		.flat_map(|(name, symbol)| format_symbol_kind_as_completion(name, &symbol.1))
		.chain(util_completions.into_iter())
		.collect()
}

/// Gets accessible properties on a class as a list of CompletionItems
fn get_completions_from_class(
	class: &impl ClassLike,
	current_phase: Option<Phase>,
	is_instance: bool,
) -> Vec<CompletionItem> {
	class
		.get_env()
		.iter(true)
		.filter_map(|symbol_data| {
			// hide the init methods, since they're not generally callable
			if symbol_data.0 == CLASS_INIT_NAME || symbol_data.0 == CLASS_INFLIGHT_INIT_NAME {
				return None;
			}
			let variable = symbol_data
				.1
				.as_variable()
				.expect("Symbols in classes are always variables");

			// don't show static members if we're looking for instance members, and vice versa
			if matches!(variable.kind, VariableKind::StaticMember) == is_instance {
				return None;
			}

			// See `Phase::can_call_to` for phase access rules
			if let Some(current_phase) = current_phase {
				if variable.type_.maybe_unwrap_option().as_function_sig().is_some()
					&& !current_phase.can_call_to(&variable.phase)
				{
					return None;
				}
			}

			let completion_item = format_symbol_kind_as_completion(&symbol_data.0, &symbol_data.1);
			if let Some(mut completion_item) = completion_item {
				completion_item.kind = match completion_item.kind {
					Some(CompletionItemKind::FUNCTION) => Some(CompletionItemKind::METHOD),
					Some(CompletionItemKind::VARIABLE) => Some(CompletionItemKind::FIELD),
					_ => completion_item.kind,
				};
				Some(completion_item)
			} else {
				None
			}
		})
		.collect()
}

/// Formats a SymbolKind from a SymbolEnv as a CompletionItem
fn format_symbol_kind_as_completion(name: &str, symbol_kind: &SymbolKind) -> Option<CompletionItem> {
	if should_exclude_symbol(name) {
		return None;
	}

	let documentation = Some(Documentation::MarkupContent(MarkupContent {
		kind: MarkupKind::Markdown,
		value: symbol_kind.render_docs(),
	}));

	Some(match symbol_kind {
		SymbolKind::Type(t) => CompletionItem {
			label: name.to_string(),
			documentation,
			kind: Some(match **t {
				Type::Array(_)
				| Type::MutArray(_)
				| Type::Map(_)
				| Type::MutMap(_)
				| Type::Set(_)
				| Type::MutSet(_)
				| Type::Class(_) => CompletionItemKind::CLASS,
				Type::Anything
				| Type::Number
				| Type::String
				| Type::Duration
				| Type::Boolean
				| Type::Void
				| Type::Json(_)
				| Type::MutJson
				| Type::Nil
				| Type::Unresolved
				| Type::Inferred(_)
				| Type::Optional(_) => CompletionItemKind::CONSTANT,
				Type::Function(_) => CompletionItemKind::FUNCTION,
				Type::Struct(_) => CompletionItemKind::STRUCT,
				Type::Enum(_) => CompletionItemKind::ENUM,
				Type::Interface(_) => CompletionItemKind::INTERFACE,
			}),
			..Default::default()
		},
		SymbolKind::Variable(v) => {
			let kind = if v.type_.maybe_unwrap_option().as_function_sig().is_some() {
				Some(CompletionItemKind::FUNCTION)
			} else {
				Some(CompletionItemKind::VARIABLE)
			};
			let is_method = kind == Some(CompletionItemKind::FUNCTION);

			let mut completion_item = CompletionItem {
				label: name.to_string(),
				detail: Some(v.type_.to_string()),
				documentation,
				kind,
				..Default::default()
			};

			if is_method {
				if v
					.type_
					.maybe_unwrap_option()
					.as_function_sig()
					.unwrap()
					.parameters
					.is_empty()
				{
					completion_item.insert_text = Some(format!("{}()", name));
				} else {
					convert_to_call_completion(&mut completion_item);
				}
			}

			completion_item
		}
		SymbolKind::Namespace(..) => CompletionItem {
			label: name.to_string(),
			documentation,
			kind: Some(CompletionItemKind::MODULE),
			..Default::default()
		},
	})
}

fn should_exclude_symbol(symbol: &str) -> bool {
	symbol == WINGSDK_STD_MODULE || symbol.starts_with(CLOSURE_CLASS_PREFIX) || symbol.starts_with(PARENT_THIS_NAME)
}

/// This visitor is used to find the scope
/// and relevant expression that contains a given location.
pub struct ScopeVisitor<'a> {
	/// The area surrounding the location we're looking for
	pub parent_span: Option<WingSpan>,
	/// The target location we're looking for
	pub target_span: WingSpan,
	pub exact_position: WingLocation,
	/// The index of the statement that contains the target location
	/// or, the last valid statement before the target location
	pub found_stmt_index: Option<usize>,
	/// The scope that contains the target location
	pub found_scope: &'a Scope,
	/// The nearest expression before (or containing) the target location
	pub nearest_expr: Option<&'a Expr>,
	/// The nearest type annotation before (or containing) the target location
	pub nearest_type_annotation: Option<&'a TypeAnnotation>,
	pub expression_trail: Vec<&'a Expr>,
}

impl<'a> ScopeVisitor<'a> {
	pub fn new(
		parent_span: Option<WingSpan>,
		target_span: WingSpan,
		exact_position: WingLocation,
		starting_scope: &'a Scope,
	) -> Self {
		Self {
			exact_position,
			parent_span,
			target_span,
			found_stmt_index: None,
			nearest_expr: None,
			found_scope: starting_scope,
			nearest_type_annotation: None,
			expression_trail: vec![],
		}
	}

	pub fn visit(&mut self) {
		self.visit_scope(&self.found_scope);
	}
}

impl<'a> Visit<'a> for ScopeVisitor<'a> {
	fn visit_scope(&mut self, node: &'a Scope) {
		if node.span.file_id != "" && node.span.contains(&self.exact_position.into()) {
			self.found_scope = node;

			for statement in node.statements.iter() {
				if statement.span.start <= self.exact_position {
					self.visit_stmt(&statement);
				} else if self.found_stmt_index.is_none() && statement.span.file_id != "" {
					self.found_stmt_index = Some(statement.idx);
				}
			}
			if self.found_stmt_index.is_none() {
				// If we didn't find a statement, we're somewhere at the end of the scope
				self.found_stmt_index = Some(node.statements.len());
			}
		}
	}

	fn visit_expr(&mut self, node: &'a Expr) {
		let mut set_node = false;

		// if the span is exactly the same, we want to set the node
		if node.span.start == self.target_span.start && node.span.end == self.target_span.end {
			set_node = true;
		}
		// We want to find the nearest expression to our target location
		// i.e we want the expression that is to the left of it
		if node.span.end == self.target_span.start {
			set_node = true;
		}
		// if we can't get an exact match, we want to find the nearest expression within the same node-ish
		// (this is for cases like `(Json 5).`, since parentheses are not part of the span)
		else if node.span.end <= self.target_span.start {
			if let Some(parent) = &self.parent_span {
				if parent.contains(&node.span.end.into()) {
					if let Some(nearest_expr) = self.nearest_expr {
						// If we already have a nearest expression, we want to find the one that is closest to our target location
						if node.span.start > nearest_expr.span.start {
							set_node = true;
						}
					} else {
						set_node = true;
					}
				}
			}
		}

		if node.span.contains(&self.exact_position.into()) {
			self.expression_trail.push(node);
		}

		// if this node is possibly what we're looking for, no need to visit its children
		// (we will still visit sibling expressions, just in case)
		if set_node {
			self.nearest_expr = Some(node);
			// special case, we still want to visit the children of a json literal
			if matches!(
				node.kind,
				ExprKind::JsonLiteral { .. } | ExprKind::JsonMapLiteral { .. }
			) {
				visit_expr(self, node);
			}
		} else {
			visit_expr(self, node);
		}
	}

	fn visit_type_annotation(&mut self, node: &'a TypeAnnotation) {
		if node.span.end == self.target_span.end {
			self.nearest_type_annotation = Some(node);
		}

		visit_type_annotation(self, node);
	}
}

#[cfg(test)]
mod tests {
	use crate::lsp::completions::*;
	use crate::lsp::sync::test_utils::*;
	use lsp_types::*;

	/// Creates a snapshot test for a given wing program's completions at a given position
	/// In the wing program, place a comment "//^" into the text where the "^" is pointing to the desired character position
	///
	/// First parameter will be the name of the tests, as well as the identifier to use for the list of completion in the asserts (see last parameter)
	/// Second parameter is the wing code block as a string literal
	/// After the first two parameters, any additional are optional statements that should be used for asserting on the given completions.
	///
	/// Result is a list of [CompletionItem]s
	macro_rules! test_completion_list {
		($name:ident, $code:literal) => {
			test_completion_list!($name, $code,);
		};
		($name:ident, $code:literal, $($assertion:stmt)*) => {
			#[test]
			fn $name() {
				// NOTE: this is needed for debugging to work regardless of where you run the test
				std::env::set_current_dir(env!("CARGO_MANIFEST_DIR")).unwrap();

				let text_document_position = load_file_with_contents($code);
				let completion = on_completion(CompletionParams {
					context: None,
					text_document_position,
					work_done_progress_params: Default::default(),
					partial_result_params: Default::default(),
				});

				if let CompletionResponse::Array(mut $name) = completion {
					insta::with_settings!(
						{
							prepend_module_to_snapshot => false,
							omit_expression => true,
							snapshot_path => "./snapshots/completions",
						}, {
							// sort the vec by sort_text
							$name.sort_by(|a, b| a.sort_text.cmp(&b.sort_text));

							insta::assert_yaml_snapshot!($name);
						}
					);
					$($assertion)*
				} else {
					panic!("Expected array of completions");
				}
			}
		};
	}

	test_completion_list!(empty, "", assert!(!empty.is_empty()));

	test_completion_list!(
		new_expression_nested,
		r#"
bring cloud;

new cloud. 
        //^
"#,
		assert!(!new_expression_nested.is_empty())

		// all items are classes
		assert!(new_expression_nested.iter().all(|item| item.kind == Some(CompletionItemKind::CLASS)))

		// all items are preflight
		// TODO https://github.com/winglang/wing/issues/2512
		// assert!(new_expression_nested.iter().all(|item| item.detail.as_ref().unwrap().starts_with("preflight")))
	);

	test_completion_list!(
		static_method_call,
		r#"
class Resource {
	static hello() {}
}

Resource. 
       //^
"#,
		assert!(!static_method_call.is_empty())

		assert!(static_method_call.iter().filter(|c| c.label == "hello").count() == 1)
	);

	test_completion_list!(
		only_show_symbols_in_scope,
		r#"
let a = 1;

if a == 1 {
	let x = "";
}
	
let b =  
			//^
			
let c = 3;
"#,
		assert!(!only_show_symbols_in_scope.is_empty())

		assert!(only_show_symbols_in_scope.iter().all(|c| c.label != "c"))
	);

	test_completion_list!(
		incomplete_if_statement,
		r#"
let a = MutMap<str> {};
if a. 
   //^
"#,
		assert!(!incomplete_if_statement.is_empty())
	);

	test_completion_list!(
		json_statics,
		r#"
Json. 
   //^"#,
		assert!(!json_statics.is_empty())
	);

	test_completion_list!(
		undeclared_var,
		r#"
let x = 2;
notDefined.
         //^"#,
		assert!(undeclared_var.is_empty())
	);

	test_completion_list!(
		capture_in_test,
		r#"
bring cloud;
let b = new cloud.Bucket();
let x = 2;

test "test" {
  b.
  //^
}
"#,
		assert!(!capture_in_test.is_empty())
	);

	test_completion_list!(
		util_static_methods,
		r#"
bring util;

util.
   //^
"#,
		assert!(!util_static_methods.is_empty())

		assert!(util_static_methods.iter().filter(|c| c.label == "env").count() == 1)
	);

	test_completion_list!(
		namespace_inflight,
		r#"
bring http;

inflight () => {
  http.
     //^"
};
"#,
		assert!(!namespace_inflight.is_empty())
	);

	test_completion_list!(
		mut_json_methods,
		r#"
let j = MutJson {};
  j.
  //^
"#,
		assert!(!mut_json_methods.is_empty())
	);

	test_completion_list!(
		static_completions_after_expression,
		r#"
2 Json.
     //^
"#,
		assert!(!static_completions_after_expression.is_empty())
	);

	test_completion_list!(
		primitives_have_no_completions,
		r#"
69.
 //^
"#,
		assert!(primitives_have_no_completions.is_empty())
	);

	test_completion_list!(
		multiple_dots_no_completions,
		r#"
let x = Json 1;
x..
 //^
"#,
		assert!(multiple_dots_no_completions.is_empty())
	);

	test_completion_list!(
		inside_class_declaration,
		r#"
class Foo {
   
//^
}
"#,
		assert!(!inside_class_declaration.is_empty())
	);

	test_completion_list!(
		incomplete_inflight_namespace,
		r#"
bring cloud;

let f = inflight (req: cloud.
                           //^
"#,
		assert!(!incomplete_inflight_namespace.is_empty())
	);

	test_completion_list!(
		namespace_middle_dot,
		r#"
bring cloud;
cloud.Bucket.
    //^
"#,
		assert!(!namespace_middle_dot.is_empty())
	);

	test_completion_list!(
		variable_type_annotation_namespace,
		r#"
bring cloud;
let x: cloud.
           //^
"#,
		assert!(!variable_type_annotation_namespace.is_empty())
	);

	test_completion_list!(
		parentheses_expression,
		r#"
(Json {}).tryGet("t")?.
                     //^
"#,
		assert!(!parentheses_expression.is_empty())
	);

	test_completion_list!(
		static_json_after_expression,
		r#"
bring cloud;
let b = new cloud.Bucket();
Json.
   //^
"#,
		assert!(!static_json_after_expression.is_empty())
	);

	test_completion_list!(
		static_json_after_expression_statement,
		r#"
bring cloud;
let b = new cloud.Bucket();Json.
                              //^
"#,
		assert!(!static_json_after_expression_statement.is_empty())
	);

	test_completion_list!(
		optional_chaining,
		r#"
let j = Json {};
j.tryGet("")?.
            //^
"#,
		assert!(!optional_chaining.is_empty())
	);

	test_completion_list!(
		optional_chaining_auto,
		r#"
let j = Json {};
j.tryGet("").
           //^
"#,
		assert!(!optional_chaining_auto.is_empty())
	);

	test_completion_list!(
		type_annotation_shows_struct,
		r#"
struct Foo {}

let x: 
    //^
"#,
		assert!(type_annotation_shows_struct.len() == 1)
		assert!(type_annotation_shows_struct.get(0).unwrap().label == "Foo")
	);

	test_completion_list!(
		struct_definition_middle,
		r#"
struct Foo {
   
//^ 
}
"#,
		assert!(struct_definition_middle.is_empty())
	);

	test_completion_list!(
		struct_definition_types,
		r#"
bring cloud;

struct Foo {
	x:
	//^ 
}
"#
	);

	test_completion_list!(
		struct_literal_unused,
		r#"
struct Foo {
	x: str;
	y: num;
}

Foo { x: "hi", }
            //^
"#
	);

	test_completion_list!(
		struct_literal_all,
		r#"
struct Foo {
	x: str;
	y: num;
}

Foo {  }
    //^
"#
	);

	test_completion_list!(
		struct_literal_value,
		r#"
struct Foo {
	x: str;
	y: num;
}

Foo { x:   }
       //^
"#
	);

	test_completion_list!(
		partial_reference_2,
		r#"
struct Inner {
	durationThing: duration;
}
struct Outer {
	bThing: Inner;
}

let x = Outer { bThing: Inner { durationThing: 2s } };

x.bThi
    //^
"#
	);

	test_completion_list!(
		partial_reference_3,
		r#"
struct Inner {
	durationThing: duration;
}
struct Outer {
	bThing: Inner;
}

let x = Outer { bThing: Inner { durationThing: 2s } };

x.bThing.du
         //^
"#
	);

	test_completion_list!(
		partial_reference_call,
		r#"
let j = Json "";
j.asStr().leng
            //^
"#
	);

	test_completion_list!(
		call_struct_expansion,
		r#"
struct A {
	a: str;
}

let x = (arg1: A) => {};

x( )
//^
"#
	);

	test_completion_list!(
		call_struct_expansion_partial,
		r#"
struct A {
	one: str;
	two: str;
}

let x = (arg1: A) => {};

x(one: "", )
        //^
"#
	);

	test_completion_list!(
		nested_struct_literal,
		r#"
struct Inner {
	durationThing: duration;
}
struct Outer {
	bThing: Inner;
}

let x = Outer { bThing: Inner {  } };
                              //^
"#
	);

	test_completion_list!(
		json_literal_cast_inner,
		r#"
struct Inner {
	durationThing: duration;
}

let x: Inner = {  }
               //^
"#
	);

	test_completion_list!(
		nested_json_literal_cast_inner,
		r#"
struct Inner {
	durationThing: duration;
}
struct Outer {
	bThing: Inner;
}

let x: Outer = { bThing: {   } }
                         //^
"#
	);
}
