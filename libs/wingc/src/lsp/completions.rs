use std::cmp::max;

use lsp_types::{CompletionItem, CompletionItemKind, CompletionResponse, InsertTextFormat};
use tree_sitter::Point;

use crate::ast::{Expr, ExprKind, Phase, Reference, Scope};
use crate::diagnostic::{WingLocation, WingSpan};
use crate::lsp::sync::FILES;
use crate::type_check::symbol_env::{LookupResult, StatementIdx};
use crate::type_check::{ClassLike, Namespace, SymbolKind, Type, Types, UnsafeRef};
use crate::visit::{visit_expr, Visit};
use crate::wasm_util::{ptr_to_string, string_to_combined_ptr, WASM_RETURN_ERROR};

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
	CompletionResponse::Array(FILES.with(|files| {
		let files = files.borrow();
		let uri = params.text_document_position.text_document.uri;
		let result = files.get(&uri).expect("File must be open to get completions");
		let wing_source = result.contents.as_bytes();

		let types = &result.types;
		let root_scope = &result.scope;
		let root_env = root_scope.env.borrow();
		let root_env = root_env.as_ref().expect("The root scope must have an environment");

		let mut point = Point::new(
			params.text_document_position.position.line as usize,
			max(params.text_document_position.position.character as i64 - 1, 0) as usize,
		);
		let mut node_to_complete = result
			.tree
			.root_node()
			.descendant_for_point_range(point, point)
			.expect("There is always at-least one tree-sitter node");

		while point.column > 0 && node_to_complete.kind() == "source" {
			// We are somewhere in whitespace aether, so we need to backtrack to the nearest node on this line
			point.column -= 1;
			node_to_complete = result
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

		let parent = node_to_complete.parent();

		let within_nested_node = if let Some(parent) = parent {
			node_to_complete.kind() == "."
				|| parent.kind() == "custom_type"
				|| parent.kind() == "nested_identifier"
				|| parent.kind() == "reference"
		} else {
			false
		};

		if within_nested_node {
			if let Some(nearest_reference) = scope_visitor.nearest_reference {
				if nearest_reference.0.span.contains(&wing_location.into()) {
					let nearest_expression_type = nearest_reference
						.0
						.evaluated_type
						.borrow()
						.expect("Expressions must have a type");

					// If we are inside an incomplete reference, there is possibly a type error so we can't trust "any"
					if !nearest_expression_type.is_anything() {
						return get_completions_from_type(
							&nearest_expression_type,
							types,
							scope_visitor
								.found_scope
								.map(|s| s.env.borrow().as_ref().expect("Scopes must have an environment").phase),
							true,
						);
					}
				}
			}
			// check to see if we are inside a reference of some kind (the last series of non-whitespace characters contains a ., starting from the current location)
			if let Some(sibling) = node_to_complete.prev_named_sibling().or(Some(node_to_complete)) {
				let sibling_kind = sibling.kind();
				if sibling_kind == "reference" || sibling_kind == "nested_identifier" || sibling_kind == "identifier" {
					// collect all the text of the reference
					let mut text = sibling
						.utf8_text(wing_source)
						.expect("The referenced text should be available")
						.to_string();
					if text.ends_with(".") {
						text.pop();
					}
					if !text.contains(".") {
						// Currently, we can only handle references that are just a single identifier
						// In this code path, we are inside an error state so the type checker never resolved full references
						let found_scope = scope_visitor.found_scope.expect("Should have found a scope");
						let found_env = found_scope.env.borrow();
						let found_env = found_env.as_ref().expect("Scope should have an env");
						let found_phase = Some(found_env.phase);
						let found_symbol = root_env
							.try_lookup_ext(text.as_str(), None)
							.ok()
							.or_else(|| found_env.try_lookup_ext(text.as_str(), None).ok());

						if let Some((found_symbol, _)) = found_symbol {
							match found_symbol {
								SymbolKind::Type(t) => {
									return get_completions_from_type(t, types, found_phase, false);
								}
								SymbolKind::Variable(v) => {
									return get_completions_from_type(&v.type_, types, found_phase, true);
								}
								SymbolKind::Namespace(n) => {
									return get_completions_from_namespace(n);
								}
							}
						}
					}
				} else {
					// we are inside some sort of a (possibly incomplete) literal expression
					match sibling_kind {
						"string" => return get_completions_from_type(&types.string(), types, None, true),
						"number" => return get_completions_from_type(&types.number(), types, None, true),
						"boolean" => return get_completions_from_type(&types.bool(), types, None, true),
						"duration" => return get_completions_from_type(&types.duration(), types, None, true),
						_ => {}
					}
				}
			}
		}

		// we are somewhere but not entirely sure
		// for now, lets just get all the symbols within the current scope
		let found_scope = scope_visitor.found_scope.unwrap_or(root_scope);
		let found_env = found_scope.env.borrow();
		let found_env = found_env.as_ref().expect("Scope should have an env");
		let found_stmt_index = scope_visitor
			.found_stmt_index
			.expect("Found scope should have a statement index");

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

			completions.push(format_symbol_kind_as_completion(symbol_data.0, symbol_kind));
		}

		if let Some(parent) = found_env.parent {
			for data in parent.iter(true) {
				completions.push(format_symbol_kind_as_completion(&data.0, &data.1));
			}
		}

		completions
	}))
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
		Type::Resource(c) => get_completions_from_class(c, current_phase, is_instance),
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
		Type::Void | Type::Function(_) | Type::Anything => vec![],
		Type::Number
		| Type::String
		| Type::Duration
		| Type::Boolean
		| Type::Json
		| Type::MutJson
		| Type::Array(_)
		| Type::MutArray(_)
		| Type::Map(_)
		| Type::MutMap(_)
		| Type::Set(_)
		| Type::MutSet(_) => {
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
				s => s,
			};
			if let LookupResult::Found(std_type, _) = types
				.libraries
				.try_lookup_nested_str(format!("@winglang/sdk.std.{}", type_name).as_str(), None)
			{
				return get_completions_from_type(&std_type.as_type().expect("is type"), types, current_phase, is_instance);
			} else {
				vec![]
			}
		}
	}
}

fn get_completions_from_namespace(namespace: &UnsafeRef<Namespace>) -> Vec<CompletionItem> {
	namespace
		.env
		.symbol_map
		.iter()
		.map(|(name, symbol)| format_symbol_kind_as_completion(name, &symbol.1))
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
			if symbol_data.0 == "init" {
				return None;
			}
			let variable = symbol_data
				.1
				.as_variable()
				.expect("Symbols in classes are always variables");
			if variable.is_static == is_instance {
				return None;
			}
			if let Some(current_phase) = current_phase {
				if !current_phase.can_call_to(&variable.phase) {
					return None;
				}
			}

			let kind = if variable.type_.as_function_sig().is_some() {
				Some(CompletionItemKind::METHOD)
			} else {
				Some(CompletionItemKind::FIELD)
			};
			let insert_text = if kind == Some(CompletionItemKind::METHOD) {
				Some(format!("{}($0)", symbol_data.0))
			} else {
				Some(symbol_data.0.to_string())
			};

			Some(CompletionItem {
				insert_text,
				label: symbol_data.0,
				detail: Some(variable.type_.to_string()),
				kind,
				insert_text_format: Some(InsertTextFormat::SNIPPET),
				..Default::default()
			})
		})
		.collect()
}

/// Formats a SymbolKind from a SymbolEnv as a CompletionItem
fn format_symbol_kind_as_completion(name: &str, symbol_kind: &SymbolKind) -> CompletionItem {
	match symbol_kind {
		SymbolKind::Type(t) => CompletionItem {
			label: name.to_string(),
			kind: Some(match **t {
				Type::Array(_)
				| Type::MutArray(_)
				| Type::Map(_)
				| Type::MutMap(_)
				| Type::Set(_)
				| Type::MutSet(_)
				| Type::Class(_)
				| Type::Resource(_) => CompletionItemKind::CLASS,
				Type::Anything
				| Type::Number
				| Type::String
				| Type::Duration
				| Type::Boolean
				| Type::Void
				| Type::Json
				| Type::MutJson
				| Type::Optional(_) => CompletionItemKind::CONSTANT,
				Type::Function(_) => CompletionItemKind::FUNCTION,
				Type::Struct(_) => CompletionItemKind::STRUCT,
				Type::Enum(_) => CompletionItemKind::ENUM,
				Type::Interface(_) => CompletionItemKind::INTERFACE,
			}),
			detail: Some(if t.as_resource().is_some() { "resource" } else { "class" }.to_string()),
			..Default::default()
		},
		SymbolKind::Variable(v) => {
			let kind = if v.type_.as_function_sig().is_some() {
				Some(CompletionItemKind::FUNCTION)
			} else {
				Some(CompletionItemKind::VARIABLE)
			};
			let insert_text = if kind == Some(CompletionItemKind::FUNCTION) {
				Some(format!("{}($0)", name))
			} else {
				Some(name.to_string())
			};
			CompletionItem {
				label: name.to_string(),
				insert_text,
				detail: Some(v.type_.to_string()),
				insert_text_format: Some(InsertTextFormat::SNIPPET),
				kind,
				..Default::default()
			}
		}
		SymbolKind::Namespace(n) => CompletionItem {
			label: name.to_string(),
			detail: Some(format!("bring {}", n.name)),
			kind: Some(CompletionItemKind::MODULE),
			..Default::default()
		},
	}
}

/// This visitor is used to find the scope and relevant reference
/// that contains a given location.
pub struct ScopeVisitor<'a> {
	/// The target location we're looking for
	pub location: WingSpan,
	/// The index of the statement that contains the target location
	/// or, the last valid statement before the target location
	pub found_stmt_index: Option<usize>,
	/// The scope that contains the target location
	pub found_scope: Option<&'a Scope>,
	/// The nearest reference before (or containing) to the target location
	pub nearest_reference: Option<(&'a Expr, &'a Reference)>,
}

impl<'a> ScopeVisitor<'a> {
	pub fn new(location: WingSpan) -> Self {
		Self {
			location,
			found_stmt_index: None,
			nearest_reference: None,
			found_scope: None,
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
		if let ExprKind::Reference(r) = &node.kind {
			match r {
				Reference::Identifier(i) => {
					if i.span < self.location {
						self.nearest_reference = Some((node, r));
					}
				}
				Reference::InstanceMember { object: _, property } => {
					if property.span < self.location {
						self.nearest_reference = Some((node, r));
					}
				}
				Reference::TypeMember { property, .. } => {
					if property.span < self.location {
						self.nearest_reference = Some((node, r));
					}
				}
			}
		}
		visit_expr(self, node);
	}
}
