use lsp_types::{
	Command, CompletionItem, CompletionItemKind, CompletionResponse, Documentation, InsertTextFormat, MarkupContent,
	MarkupKind,
};
use std::cmp::max;
use tree_sitter::Point;

use crate::ast::{Expr, ExprKind, Phase, Scope, Symbol, TypeAnnotation, TypeAnnotationKind, UserDefinedType};
use crate::closure_transform::{CLOSURE_CLASS_PREFIX, PARENT_THIS_NAME};
use crate::diagnostic::{WingLocation, WingSpan};
use crate::docs::Documented;
use crate::lsp::sync::FILES;
use crate::type_check::symbol_env::{LookupResult, StatementIdx};
use crate::type_check::{
	import_udt_from_jsii, resolve_user_defined_type, ClassLike, Namespace, SymbolKind, Type, Types, UnsafeRef,
	CLASS_INFLIGHT_INIT_NAME, CLASS_INIT_NAME,
};
use crate::visit::{visit_expr, visit_type_annotation, Visit};
use crate::wasm_util::{ptr_to_string, string_to_combined_ptr, WASM_RETURN_ERROR};
use crate::{WINGSDK_ASSEMBLY_NAME, WINGSDK_STD_MODULE};

use super::sync::JSII_TYPES;

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
	let mut final_completions = FILES.with(|files| {
		let mut files = files.borrow_mut();
		let uri = params.text_document_position.text_document.uri;
		let file_data = files.get_mut(&uri).expect("File must be open to get completions");

		let types = &file_data.types;
		let root_scope = &file_data.scope;
		let root_env = root_scope.env.borrow();
		let root_env = root_env.as_ref().expect("The root scope must have an environment");

		let mut point = Point::new(
			params.text_document_position.position.line as usize,
			max(params.text_document_position.position.character as i64 - 1, 0) as usize,
		);
		let mut node_to_complete = file_data
			.tree
			.root_node()
			.descendant_for_point_range(point, point)
			.expect("There is always at-least one tree-sitter node");

		while point.column > 0 && node_to_complete.kind() == "source" {
			// We are somewhere in whitespace aether, so we need to backtrack to the nearest node on this line
			point.column -= 1;
			node_to_complete = file_data
				.tree
				.root_node()
				.descendant_for_point_range(point, point)
				.expect("There is always at-least one tree-sitter node");
		}

		let file = uri.to_file_path().ok().expect("LSP only works on real filesystems");

		let wing_location = WingLocation {
			col: point.column as u32,
			line: point.row as u32,
		};

		let mut scope_visitor = ScopeVisitor::new(WingSpan {
			start: wing_location,
			end: wing_location,
			file_id: file.to_str().expect("File path must be valid utf8").to_string(),
		});
		scope_visitor.visit_scope(root_scope);

		let found_env = scope_visitor.found_scope.unwrap();
		let found_env = found_env.env.borrow();
		let found_env = found_env.as_ref().unwrap();

		let parent = node_to_complete.parent();

		if node_to_complete.kind() == "." {
			let parent = parent.expect("A dot must have a parent");

			if parent.kind() == "nested_identifier" {
				if let Some(nearest_expr) = scope_visitor.nearest_expr {
					let nearest_expr_type = types.get_expr_type(nearest_expr).unwrap();

					// If we are inside an incomplete reference, there is possibly a type error or an anything which has no completions
					if !nearest_expr_type.is_anything() && !nearest_expr_type.is_unresolved() {
						return get_completions_from_type(
							&nearest_expr_type,
							types,
							scope_visitor
								.found_scope
								.map(|s| s.env.borrow().as_ref().expect("Scopes must have an environment").phase),
							true,
						);
					}
				}

				// We're likely in a type reference, so let's use the raw text for a lookup
				let wing_source = file_data.contents.as_bytes();
				let mut reference_text = parent
					.utf8_text(wing_source)
					.expect("The referenced text should be available")
					.to_string();
				if reference_text.ends_with(".") {
					reference_text.pop();
				}

				reference_text = add_std_namespace(&reference_text);

				let lookup_thing = found_env
					.lookup_nested_str(&reference_text, scope_visitor.found_stmt_index)
					.ok();

				if let Some((lookup_thing, _)) = lookup_thing {
					match lookup_thing {
						SymbolKind::Type(t) => {
							return get_completions_from_type(&t, types, Some(found_env.phase), false);
						}
						SymbolKind::Variable(v) => {
							return get_completions_from_type(
								&v.type_,
								types,
								scope_visitor
									.found_scope
									.map(|s| s.env.borrow().as_ref().expect("Scopes must have an environment").phase),
								false,
							)
						}
						SymbolKind::Namespace(n) => {
							// If the types in this namespace aren't loaded yet, load them now to get completions
							if !n.loaded {
								JSII_TYPES.with(|jsii_types| {
									let mut jsii_types = jsii_types.borrow_mut();
									let parts = reference_text.split(".").collect::<Vec<_>>();
									// Dummy type representing the namespace to be loaded
									let udt = UserDefinedType {
										root: Symbol::global(parts[0].to_string()),
										fields: parts[1..].iter().map(|s| Symbol::global(s.to_string())).collect(),
										span: WingSpan::default(),
									};
									// Import all types in the namespace by trying to load the "dummy type"
									import_udt_from_jsii(&mut file_data.types, &mut jsii_types, &udt, &file_data.jsii_imports);
								});
							}
							return get_completions_from_namespace(&n, Some(found_env.phase));
						}
					}
				} else {
					return vec![];
				}
			}

			if parent.kind() == "custom_type" {
				if let Some(nearest_type_annotation) = scope_visitor.nearest_type_annotation {
					if let TypeAnnotationKind::UserDefined(udt) = &nearest_type_annotation.kind {
						let type_lookup = resolve_user_defined_type(udt, found_env, scope_visitor.found_stmt_index.unwrap());

						if let Ok(type_lookup) = type_lookup {
							return get_completions_from_type(&type_lookup, types, Some(found_env.phase), false);
						} else {
							// this is probably a namespace, let's look it up
							if let Some(namespace) = root_env
								.lookup_nested_str(&udt.full_path_str(), scope_visitor.found_stmt_index)
								.ok()
								.and_then(|n| n.0.as_namespace_ref())
							{
								let completions = get_completions_from_namespace(&namespace, Some(found_env.phase));
								//for namespaces - return only classes and namespaces
								if parent.parent().expect("custom_type must have a parent node").kind() == "new_expression" {
									return completions
										.iter()
										.filter(|c| {
											matches!(
												c.kind,
												Some(CompletionItemKind::CLASS) | Some(CompletionItemKind::MODULE)
											)
										})
										.map(|c| {
											let mut c = c.clone();
											if c.kind == Some(CompletionItemKind::CLASS) {
												c.insert_text = Some(format!("{}($0)", c.label));
												c.insert_text_format = Some(InsertTextFormat::SNIPPET);
												c.command = Some(Command {
													title: "triggerParameterHints".to_string(),
													command: "editor.action.triggerParameterHints".to_string(),
													arguments: None,
												});
											}
											c
										})
										.collect();
								} else {
									return completions;
								}
							}

							// This is not a known type or namespace
							return vec![];
						}
					}
				}
			}
		}

		// we are somewhere but not entirely sure
		// for now, lets just get all the symbols within the current scope
		let found_stmt_index = scope_visitor.found_stmt_index.unwrap_or_default();

		let mut completions = vec![];

		for symbol_data in found_env.symbol_map.iter().filter(|s| {
			if let StatementIdx::Index(i) = s.1 .0 {
				// within the found scope, we only want to show symbols that were defined before the current position
				i <= found_stmt_index
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
					completions.push(completion);
				}
			}
		}

		// lets also add some fun snippets
		completions.push(CompletionItem {
			label: "inflight () => {}".to_string(),
			insert_text: Some("inflight ($1) => {$2}".to_string()),
			insert_text_format: Some(InsertTextFormat::SNIPPET),
			kind: Some(CompletionItemKind::SNIPPET),
			..Default::default()
		});

		completions.push(CompletionItem {
			label: "test \"\" { }".to_string(),
			insert_text: Some("test \"$1\" {\n\t$2\n}".to_string()),
			insert_text_format: Some(InsertTextFormat::SNIPPET),
			kind: Some(CompletionItemKind::SNIPPET),
			..Default::default()
		});

		completions
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
}

/// LSP sorts completions items alphabetically
/// This function returns a string that can be used to sort the completion items in a more logical order
fn completion_sort_text(completion_item: &CompletionItem) -> String {
	let completion_kind = completion_item.kind;
	let letter = if let Some(kind) = completion_kind {
		match kind {
			CompletionItemKind::ENUM_MEMBER => "aa",
			CompletionItemKind::VARIABLE => "bb",
			CompletionItemKind::FUNCTION => "cc",
			CompletionItemKind::PROPERTY => "dd",
			CompletionItemKind::FIELD => "ee",
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

/// Gets accessible properties on a type as a list of CompletionItems
fn get_completions_from_type(
	type_: &UnsafeRef<Type>,
	types: &Types,
	current_phase: Option<Phase>,
	is_instance: bool,
) -> Vec<CompletionItem> {
	match &**type_ {
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
		Type::Void | Type::Function(_) | Type::Anything | Type::Unresolved => vec![],
		Type::Number
		| Type::String
		| Type::Duration
		| Type::Boolean
		| Type::Json
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
			let final_type_name = add_std_namespace(type_name);
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

/// If the given type is from the std namespace, add the implicit `std.` to it
fn add_std_namespace(type_: &str) -> std::string::String {
	// This section of the code is hacky
	// This is needed because our builtin types have no API
	// So we have to get the API from the std lib
	// But the std lib sometimes doesn't have the same names as the builtin types
	// https://github.com/winglang/wing/issues/1780

	// Additionally, this doesn't handle for generics
	let type_name = type_.to_string();
	let type_name = if let Some((prefix, _)) = type_name.split_once("<") {
		prefix
	} else {
		&type_name
	};
	let type_name = match type_name {
		"Set" => "ImmutableSet",
		"Map" => "ImmutableMap",
		"Array" => "ImmutableArray",
		"MutSet" => "MutableSet",
		"MutMap" => "MutableMap",
		"MutArray" => "MutableArray",
		"Json" | "MutJson" | "MutableArray" | "MutableMap" | "MutableSet" | "ImmutableArray" | "ImmutableMap"
		| "ImmutableSet" | "String" | "Duration" | "Boolean" | "Number" => type_name,
		_ => return type_name.to_string(),
	};

	format!("{WINGSDK_STD_MODULE}.{type_name}")
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
			if variable.is_static == is_instance {
				return None;
			}

			let is_function = variable.type_.as_function_sig().is_some();

			if let Some(current_phase) = current_phase {
				if is_function && !current_phase.can_call_to(&variable.phase) {
					return None;
				}
			}

			let kind = if is_function {
				Some(CompletionItemKind::METHOD)
			} else {
				Some(CompletionItemKind::FIELD)
			};
			let is_method = kind == Some(CompletionItemKind::METHOD);

			Some(CompletionItem {
				insert_text: if is_method {
					Some(format!("{}($0)", symbol_data.0))
				} else {
					Some(symbol_data.0.to_string())
				},
				label: symbol_data.0,
				documentation: Some(Documentation::MarkupContent(MarkupContent {
					kind: MarkupKind::Markdown,
					value: symbol_data.1.render_docs(),
				})),
				kind,
				insert_text_format: Some(InsertTextFormat::SNIPPET),
				command: if is_method {
					Some(Command {
						title: "triggerParameterHints".to_string(),
						command: "editor.action.triggerParameterHints".to_string(),
						arguments: None,
					})
				} else {
					None
				},
				..Default::default()
			})
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
				| Type::Json
				| Type::MutJson
				| Type::Nil
				| Type::Unresolved
				| Type::Optional(_) => CompletionItemKind::CONSTANT,
				Type::Function(_) => CompletionItemKind::FUNCTION,
				Type::Struct(_) => CompletionItemKind::STRUCT,
				Type::Enum(_) => CompletionItemKind::ENUM,
				Type::Interface(_) => CompletionItemKind::INTERFACE,
			}),
			..Default::default()
		},
		SymbolKind::Variable(v) => {
			let kind = if v.type_.as_function_sig().is_some() {
				Some(CompletionItemKind::FUNCTION)
			} else {
				Some(CompletionItemKind::VARIABLE)
			};
			let is_method = kind == Some(CompletionItemKind::FUNCTION);

			CompletionItem {
				label: name.to_string(),
				documentation,
				insert_text: if is_method {
					Some(format!("{name}($0)"))
				} else {
					Some(name.to_string())
				},
				insert_text_format: Some(InsertTextFormat::SNIPPET),
				kind,
				command: if is_method {
					Some(Command {
						title: "triggerParameterHints".to_string(),
						command: "editor.action.triggerParameterHints".to_string(),
						arguments: None,
					})
				} else {
					None
				},
				..Default::default()
			}
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
	symbol == WINGSDK_STD_MODULE || symbol.starts_with(CLOSURE_CLASS_PREFIX) || symbol == PARENT_THIS_NAME
}

/// This visitor is used to find the scope
/// and relevant expression that contains a given location.
pub struct ScopeVisitor<'a> {
	/// The target location we're looking for
	pub location: WingSpan,
	/// The index of the statement that contains the target location
	/// or, the last valid statement before the target location
	pub found_stmt_index: Option<usize>,
	/// The scope that contains the target location
	pub found_scope: Option<&'a Scope>,
	/// The nearest expression before (or containing) the target location
	pub nearest_expr: Option<&'a Expr>,
	/// The nearest type annotation before (or containing) the target location
	pub nearest_type_annotation: Option<&'a TypeAnnotation>,
}

impl<'a> ScopeVisitor<'a> {
	pub fn new(location: WingSpan) -> Self {
		Self {
			location,
			found_stmt_index: None,
			nearest_expr: None,
			found_scope: None,
			nearest_type_annotation: None,
		}
	}
}

impl<'a> Visit<'a> for ScopeVisitor<'a> {
	fn visit_scope(&mut self, node: &'a Scope) {
		if node.span.contains(&self.location.start.into()) {
			self.found_scope = Some(node);

			for (i, statement) in node.statements.iter().enumerate() {
				if statement.span <= self.location {
					self.visit_stmt(&statement);
				} else if self.found_stmt_index.is_none() {
					self.found_stmt_index = Some(max(i as i64 - 1, 0) as usize);
				}
			}
			if self.found_stmt_index.is_none() {
				// If we didn't find a statement, we're somewhere at the end of the scope
				self.found_stmt_index = Some(node.statements.len());
			}
		}
	}

	fn visit_expr(&mut self, node: &'a Expr) {
		// We want to find the nearest expression to our target location
		// i.e we want the expression that is to the left of it
		if node.span.end <= self.location.start {
			if let Some(nearest_expr) = self.nearest_expr {
				// make sure we're not overwriting a more relevant expression
				if nearest_expr.span.end < node.span.end {
					self.nearest_expr = Some(node);
				}
			} else {
				self.nearest_expr = Some(node);
			}
		}

		// We don't want to visit the children of a reference expression
		// as that will actually be a less useful piece of information
		// e.g. With `a.b.c.` we are interested in `a.b.c` and not `a.b`
		if !matches!(&node.kind, ExprKind::Reference(_)) {
			visit_expr(self, node);
		}
	}

	fn visit_type_annotation(&mut self, node: &'a TypeAnnotation) {
		if node.span <= self.location {
			if let Some(nearest_type_annotation) = self.nearest_type_annotation {
				// make sure we're not overwriting a more relevant type annotation
				if nearest_type_annotation.span.end < node.span.end {
					self.nearest_type_annotation = Some(node);
				}
			} else {
				self.nearest_type_annotation = Some(node);
			}
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
		($name:ident, $code:literal, $($assertion:stmt)*) => {
			#[test]
			fn $name() {
				let text_document_position = load_file_with_contents($code);
				let completion = on_completion(CompletionParams {
					context: None,
					text_document_position,
					work_done_progress_params: Default::default(),
					partial_result_params: Default::default(),
				});

				if let CompletionResponse::Array($name) = completion {
					insta::with_settings!(
						{
							prepend_module_to_snapshot => false,
							omit_expression => true,
							snapshot_path => "./snapshots/completions",
						}, {
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
        //^"#,
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
       //^"#,
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
			
let c = 3;"#,
		assert!(!only_show_symbols_in_scope.is_empty())

		assert!(only_show_symbols_in_scope.iter().all(|c| c.label != "c"))
	);

	test_completion_list!(
		incomplete_if_statement,
		r#"
let a = MutMap<str> {};
if a. 
   //^"#,
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
   //^"#,
		assert!(!util_static_methods.is_empty())

		assert!(util_static_methods.iter().filter(|c| c.label == "env").count() == 1)
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
}
