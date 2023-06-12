use lsp_types::{Hover, HoverContents, MarkupContent, MarkupKind, Position};

use crate::ast::{Class, Expr, FunctionBody, FunctionDefinition, Phase, Reference, Scope, Stmt, StmtKind, Symbol};
use crate::diagnostic::WingSpan;
use crate::lsp::sync::FILES;
use crate::type_check::symbol_env::{LookupResult, SymbolLookupInfo};
use crate::type_check::SymbolKind;
use crate::visit::Visit;
use crate::wasm_util::WASM_RETURN_ERROR;
use crate::{
	ast::ExprKind,
	wasm_util::{ptr_to_string, string_to_combined_ptr},
};

use super::sync::FileData;

pub struct HoverVisitor<'a> {
	pub position: Position,
	pub current_scope: Option<&'a Scope>,
	pub current_expr: Option<&'a Expr>,
	pub found_symbol: Option<&'a Symbol>,
}

impl<'a> HoverVisitor<'a> {
	pub fn new(position: Position) -> Self {
		Self {
			position,
			current_scope: None,
			current_expr: None,
			found_symbol: None,
		}
	}

	fn is_found(&self) -> bool {
		self.found_symbol.is_some()
	}

	fn should_check_span(&self, span: &'a WingSpan) -> bool {
		span.contains(&self.position)
	}

	fn with_scope(&mut self, scope: &'a Scope, mut f: impl FnMut(&mut Self)) {
		let last_scope = self.current_scope;
		self.current_scope = Some(scope);
		f(self);
		if !self.is_found() {
			self.current_scope = last_scope;
		}
	}
}

impl<'a> Visit<'a> for HoverVisitor<'a> {
	fn visit_scope(&mut self, node: &'a Scope) {
		if self.is_found() {
			return;
		}

		self.with_scope(node, |v| {
			for stmt in &node.statements {
				v.visit_stmt(stmt);
			}
		});
	}

	fn visit_stmt(&mut self, node: &'a Stmt) {
		if self.is_found() || !self.should_check_span(&node.span) {
			return;
		}

		// Handle situations where symbols are actually defined in inner scopes
		match &node.kind {
			StmtKind::ForLoop {
				iterator,
				iterable,
				statements,
			} => {
				self.with_scope(statements, |v| {
					v.visit_symbol(iterator);
				});
				self.visit_expr(iterable);
				self.visit_scope(statements);
			}
			StmtKind::TryCatch {
				try_statements,
				catch_block,
				finally_statements,
			} => {
				self.visit_scope(try_statements);
				if let Some(catch_block) = catch_block {
					if let Some(exception_var) = &catch_block.exception_var {
						self.with_scope(&catch_block.statements, |v| {
							v.visit_symbol(exception_var);
						});
					}
					self.visit_scope(&catch_block.statements);
				}
				if let Some(finally_statements) = finally_statements {
					self.visit_scope(finally_statements);
				}
			}
			_ => crate::visit::visit_stmt(self, node),
		}
	}

	fn visit_expr(&mut self, node: &'a Expr) {
		if self.is_found() || !self.should_check_span(&node.span) {
			return;
		}

		let last_expr = self.current_expr;
		self.current_expr = Some(node);

		crate::visit::visit_expr(self, node);

		if !self.is_found() {
			self.current_expr = last_expr;
		}
	}

	fn visit_function_definition(&mut self, node: &'a FunctionDefinition) {
		if self.is_found() {
			return;
		}

		if let FunctionBody::Statements(scope) = &node.body {
			self.with_scope(scope, |v| {
				for param in &node.signature.parameters {
					v.visit_function_parameter(&param);
				}
			});
		}

		if let Some(return_type) = &node.signature.return_type {
			self.visit_type_annotation(return_type);
		}

		if let FunctionBody::Statements(scope) = &node.body {
			self.visit_scope(scope);
		}
	}

	fn visit_class(&mut self, node: &'a Class) {
		if self.is_found() {
			return;
		}
		self.visit_symbol(&node.name);

		self.visit_function_definition(&node.initializer);

		let scope = if let FunctionBody::Statements(statements) = &node.initializer.body {
			statements
		} else {
			panic!("Initializer cannot be 'extern'");
		};

		self.with_scope(&scope, |v| {
			for field in &node.fields {
				v.visit_symbol(&field.name);
				v.visit_type_annotation(&field.member_type);
			}

			for method in &node.methods {
				v.visit_symbol(&method.0);
				v.visit_function_definition(&method.1);
			}
		});
	}

	fn visit_symbol(&mut self, node: &'a Symbol) {
		if self.is_found() || !self.should_check_span(&node.span) {
			return;
		}

		self.found_symbol = Some(node);
	}
}

#[no_mangle]
pub unsafe extern "C" fn wingc_on_hover(ptr: u32, len: u32) -> u64 {
	let parse_string = ptr_to_string(ptr, len);
	if let Ok(parsed) = serde_json::from_str(&parse_string) {
		if let Some(token_result) = on_hover(parsed) {
			let result = serde_json::to_string(&token_result).expect("Failed to serialize Hover response");

			string_to_combined_ptr(result)
		} else {
			WASM_RETURN_ERROR
		}
	} else {
		eprintln!("Failed to parse 'onHover' text document: {}", parse_string);
		WASM_RETURN_ERROR
	}
}
pub fn on_hover(params: lsp_types::HoverParams) -> Option<Hover> {
	FILES.with(|files| {
		let files = files.borrow();
		let file_data = files.get(&params.text_document_position_params.text_document.uri.clone());
		let file_data = file_data.expect(
			format!(
				"Compiled data not found for \"{}\"",
				params.text_document_position_params.text_document.uri
			)
			.as_str(),
		);

		let root_scope = &file_data.scope;

		let mut hover_visitor = HoverVisitor::new(params.text_document_position_params.position);
		hover_visitor.visit_scope(root_scope);

		if let Some(symbol) = hover_visitor.found_symbol {
			// If the given symbol is in a nested identifier, we can skip looking it up in the symbol environment
			if let Some(expr) = hover_visitor.current_expr {
				if let ExprKind::Reference(Reference::InstanceMember { property, .. }) = &expr.kind {
					return build_nested_identifier_hover(file_data, &property, &expr);
				}
			}

			let env = hover_visitor
				.current_scope
				.expect("All symbols must be in a scope")
				.env
				.borrow();
			let env = env.as_ref().expect("All scopes should have a symbol environment");

			let symbol_lookup = env.lookup_ext(symbol, None);

			let hover_string = if let LookupResult::Found(kind, info) = symbol_lookup {
				format_symbol_with_lookup(&symbol.name, (kind, info))
			} else {
				format_unknown_symbol(&symbol.name)
			};

			return Some(Hover {
				contents: HoverContents::Markup(MarkupContent {
					kind: MarkupKind::Markdown,
					value: hover_string,
				}),
				range: Some((&symbol.span).into()),
			});
		}

		None
	})
}

/// Formats a hover string for a symbol that has been found in the symbol environment
fn format_symbol_with_lookup(symbol_name: &str, symbol_lookup: (&SymbolKind, SymbolLookupInfo)) -> String {
	let symbol_kind = symbol_lookup.0;
	let lookup_info = symbol_lookup.1;

	match symbol_kind {
		SymbolKind::Type(t) => {
			format!("**{}**", t)
		}
		SymbolKind::Variable(variable_info) => {
			let flight = match lookup_info.phase {
				Phase::Inflight => "inflight ",
				Phase::Preflight => "preflight ",
				Phase::Independent => "",
			};
			let reassignable = if variable_info.reassignable { "var " } else { "" };
			let _type = &variable_info.type_;

			format!("```wing\n{flight}{reassignable}{symbol_name}: {_type}\n```")
		}
		SymbolKind::Namespace(namespace) => {
			let namespace_name = &namespace.name;

			format!("```wing\nbring {namespace_name}\n```")
		}
	}
}

/// Formats a hover string for a symbol that we don't yet know how to handle yet
fn format_unknown_symbol(symbol_name: &str) -> String {
	format!("```wing\n{symbol_name}\n```")
}

/// Builds the entire Hover response for a nested identifier, which are handled differently than other "loose" symbols
fn build_nested_identifier_hover(file_data: &FileData, property: &Symbol, expr: &Expr) -> Option<Hover> {
	let symbol_name = &property.name;

	let expr_type = file_data.types.get_expr_type(&expr).unwrap();

	return Some(Hover {
		contents: HoverContents::Markup(MarkupContent {
			kind: MarkupKind::Markdown,
			value: format!("```wing\n{symbol_name}: {expr_type}\n```"),
		}),
		// When hovering over a reference, we want to highlight the entire relevant expression
		// e.g. Hovering over `b` in `a.b.c` will highlight `a.b`
		range: Some((&expr.span).into()),
	});
}

#[cfg(test)]
mod tests {
	use crate::lsp::hover::*;
	use crate::lsp::sync::test_utils::*;
	use lsp_types::*;

	/// Creates a snapshot test for a given wing program's hover at a given position
	/// In the wing program, place a comment "//^" into the text where the "^" is pointing to the desired character position
	///
	/// First parameter will be the name of the tests, as well as the identifier to use for the list of completion in the asserts (see last parameter)
	/// Second parameter is the wing code block as a string literal
	/// After the first two parameters, any additional are optional statements that should be used for asserting on the given hover data.
	///
	/// Result is a [Hover] object
	macro_rules! test_hover_list {
		($name:ident, $code:literal, $($assertion:stmt)*) => {
			#[test]
			fn $name() {
				let text_document_position_params = load_file_with_contents($code);
				let hover = on_hover(HoverParams {
					text_document_position_params,
					work_done_progress_params: Default::default(),
				});

				if let Some($name) = hover {
					insta::with_settings!(
						{
							prepend_module_to_snapshot => false,
							omit_expression => true,
							snapshot_path => "./snapshots/hovers",
						}, {
							insta::assert_yaml_snapshot!($name);
						}
					);
					$($assertion)*
				} else {
					panic!("Expected hover data");
				}
			}
		};
	}

	test_hover_list!(
		new_expression_nested,
		r#"
bring cloud;

new cloud. 
   //^"#,
	);

	test_hover_list!(
		class_symbol,
		r#"
bring cloud;

let bucket = new cloud.Bucket();
   //^"#,
	);

	test_hover_list!(
		class_symbol_in_closure,
		r#"
bring cloud;

let bucket = new cloud.Bucket();
   //^"#,
	);

	test_hover_list!(
		class_property,
		r#"
bring cloud;

let bucket = new cloud.Bucket();
bucket.addObject
      //^"#,
	);
}
