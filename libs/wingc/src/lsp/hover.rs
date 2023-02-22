use lsp_types::{Hover, HoverContents, MarkupContent, MarkupKind, Position};

use crate::ast::{Class, Constructor, Expr, FunctionDefinition, Reference, Scope, Stmt, Symbol};
use crate::diagnostic::WingSpan;
use crate::lsp::sync::FILES;
use crate::visit::Visit;
use crate::wasm_util::WASM_RETURN_ERROR;
use crate::{
	ast::ExprKind,
	wasm_util::{ptr_to_string, string_to_combined_ptr},
};

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
}

impl<'a> Visit<'a> for HoverVisitor<'a> {
	fn visit_scope(&mut self, node: &'a Scope) {
		if self.is_found() {
			return;
		}
		for stmt in &node.statements {
			let last_scope = self.current_scope;
			self.current_scope = Some(node);
			self.visit_stmt(stmt);

			if !self.is_found() {
				self.current_scope = last_scope;
			}
		}
	}

	fn visit_stmt(&mut self, node: &'a Stmt) {
		if self.is_found() {
			return;
		}
		if node.span.contains(&self.position) {
			crate::visit::visit_stmt(self, node);
		}
	}

	fn visit_expr(&mut self, node: &'a Expr) {
		if self.is_found() {
			return;
		}
		let last_expr = self.current_expr;
		self.current_expr = Some(node);
		if self.should_check_span(&node.span) {
			crate::visit::visit_expr(self, node);
		}

		if !self.is_found() {
			self.current_expr = last_expr;
		}
	}

	fn visit_function_definition(&mut self, node: &'a FunctionDefinition) {
		if self.is_found() {
			return;
		}

		for param_type in &node.signature.parameters {
			self.visit_type_annotation(param_type);
		}
		if let Some(return_type) = &node.signature.return_type {
			self.visit_type_annotation(return_type);
		}

		let last_scope = self.current_scope;
		self.current_scope = Some(&node.statements);
		for param in &node.parameters {
			self.visit_symbol(&param.0);
		}
		if !self.is_found() {
			self.current_scope = last_scope;
			self.visit_scope(&node.statements);
		}
	}

	fn visit_class(&mut self, node: &'a Class) {
		if self.is_found() {
			return;
		}
		self.visit_symbol(&node.name);

		let last_scope = self.current_scope;
		self.current_scope = Some(&node.constructor.statements);

		for field in &node.fields {
			self.visit_symbol(&field.name);
			self.visit_type_annotation(&field.member_type);
		}

		for method in &node.methods {
			self.visit_symbol(&method.0);
			self.visit_function_definition(&method.1);
		}

		if !self.is_found() {
			self.current_scope = last_scope;
			self.visit_constructor(&node.constructor);
		}
	}

	fn visit_constructor(&mut self, node: &'a Constructor) {
		if self.is_found() {
			return;
		}

		for param_type in &node.signature.parameters {
			self.visit_type_annotation(param_type);
		}
		if let Some(return_type) = &node.signature.return_type {
			self.visit_type_annotation(return_type);
		}

		let last_scope = self.current_scope;
		self.current_scope = Some(&node.statements);
		for param in &node.parameters {
			self.visit_symbol(&param.0);
		}

		if !self.is_found() {
			self.current_scope = last_scope;
			self.visit_scope(&node.statements);
		}
	}

	fn visit_symbol(&mut self, node: &'a Symbol) {
		if self.is_found() {
			return;
		}

		if self.should_check_span(&node.span) {
			self.found_symbol = Some(node);
		}
	}
}

#[no_mangle]
pub unsafe extern "C" fn wingc_on_hover(ptr: u32, len: u32) -> u64 {
	let parse_string = ptr_to_string(ptr, len);
	if let Ok(parsed) = serde_json::from_str(&parse_string) {
		if let Some(token_result) = on_hover(parsed) {
			let result = serde_json::to_string(&token_result).unwrap();

			string_to_combined_ptr(result)
		} else {
			WASM_RETURN_ERROR
		}
	} else {
		eprintln!("Failed to parse 'onHover' text document: {}", parse_string);
		WASM_RETURN_ERROR
	}
}
pub fn on_hover<'a>(params: lsp_types::HoverParams) -> Option<Hover> {
	FILES.with(|files| {
		let files = files.borrow();
		let parse_result = files.get(&params.text_document_position_params.text_document.uri.clone());
		let parse_result = parse_result.unwrap();

		let position = params.text_document_position_params.position;

		let root_scope = &parse_result.scope;
		let root_env = root_scope.env.borrow();
		let root_env = root_env.as_ref().unwrap();

		let mut hover_visitor = HoverVisitor::new(position);
		hover_visitor.visit_scope(root_scope);

		if let Some(symbol) = hover_visitor.found_symbol {
			let scope = hover_visitor.current_scope.expect("All symbols should be in a scope");
			let expr = hover_visitor.current_expr;
			let symbol_name = &symbol.name;
			let expression_type = expr.and_then(|expr| {
				let t = expr.evaluated_type.borrow();
				t.clone()
			});
			let reference = expr.and_then(|expr| {
				if let ExprKind::Reference(reference) = &expr.kind {
					Some(reference)
				} else {
					None
				}
			});
			let span = if let Some(_) = reference {
				&expr.expect("Missing type for expression").span
			} else {
				&symbol.span
			};

			let env_ref = scope.env.borrow();
			let env = env_ref.as_ref().expect("All scopes should have a symbol environment");

			let mut symbol_lookup = env.lookup_ext(symbol, None);
			if symbol_lookup.is_err() {
				// If the symbol is not found in the current scope, try the root scope
				symbol_lookup = root_env.lookup_ext(symbol, None);
			}

			let mut hover_string = String::new();

			if let Ok(symbol_lookup) = symbol_lookup {
				let symbol_kind = symbol_lookup.0;
				let lookup_info = symbol_lookup.1;

				match symbol_kind {
					crate::type_check::SymbolKind::Type(t) => {
						hover_string = format!("**{}**", t);
					}
					crate::type_check::SymbolKind::Variable(v) => {
						let flight = match lookup_info.flight {
							crate::ast::Phase::Inflight => "inflight ",
							crate::ast::Phase::Preflight => "preflight ",
							crate::ast::Phase::Independent => "",
						};
						let reassignable = if v.reassignable { "var " } else { "" };
						let _type = &v._type;
						hover_string = format!("```wing\n{flight}{reassignable}{symbol_name}: {_type}\n```");
					}
					crate::type_check::SymbolKind::Namespace(n) => {
						let namespace_name = &n.name;
						hover_string = format!("```wing\nbring {namespace_name}\n```");
					}
				};
			} else {
				if let Some(reference) = reference {
					match reference {
						Reference::Identifier(_) => {}
						Reference::NestedIdentifier { object: _, property } => {
							let symbol_name = &property.name;
							let expression_type = expression_type.expect("Missing type for reference");
							hover_string = format!("```wing\n{symbol_name}: {expression_type}\n```");
						}
					}
				} else {
					// It's a symbol of some kind, but not sure how to handle it yet
					hover_string = format!("```wing\n{symbol_name}\n```");
				}
			}

			if !hover_string.is_empty() {
				return Some(Hover {
					contents: HoverContents::Markup(MarkupContent {
						kind: MarkupKind::Markdown,
						value: hover_string,
					}),
					range: Some(span.range()),
				});
			}
		}

		None
	})
}
