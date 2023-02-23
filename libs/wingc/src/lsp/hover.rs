use lsp_types::{Hover, HoverContents, MarkupContent, MarkupKind, Position};

use crate::ast::{Class, Constructor, Expr, FunctionDefinition, Reference, Scope, Stmt, StmtKind, Symbol};
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

		self.with_scope(&node.statements, |v| {
			for param in &node.parameters {
				v.visit_symbol(&param.0);
			}
		});
		for param_type in &node.signature.parameters {
			self.visit_type_annotation(param_type);
		}
		if let Some(return_type) = &node.signature.return_type {
			self.visit_type_annotation(return_type);
		}

		self.visit_scope(&node.statements);
	}

	fn visit_class(&mut self, node: &'a Class) {
		if self.is_found() {
			return;
		}
		self.visit_symbol(&node.name);

		self.visit_constructor(&node.constructor);

		self.with_scope(&node.constructor.statements, |v| {
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

		self.with_scope(&node.statements, |v| {
			for param in &node.parameters {
				v.visit_symbol(&param.0);
			}
		});

		self.visit_scope(&node.statements);
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
pub fn on_hover<'a>(params: lsp_types::HoverParams) -> Option<Hover> {
	FILES.with(|files| {
		let files = files.borrow();
		let parse_result = files.get(&params.text_document_position_params.text_document.uri.clone());
		let parse_result = parse_result.expect(
			format!(
				"Compiled data not found for \"{}\"",
				params.text_document_position_params.text_document.uri
			)
			.as_str(),
		);

		let position = params.text_document_position_params.position;

		let root_scope = &parse_result.scope;
		let root_env = root_scope.env.borrow();
		let root_env = root_env.as_ref().expect("All scopes should have a symbol environment");

		let mut hover_visitor = HoverVisitor::new(position);
		hover_visitor.visit_scope(root_scope);

		if let Some(symbol) = hover_visitor.found_symbol {
			let scope = hover_visitor.current_scope.expect("All symbols must be in a scope");
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

			let mut symbol_lookup = root_env.lookup_ext(symbol, None);
			if symbol_lookup.is_err() {
				// If the symbol is not found in the root scope, try the given scope
				symbol_lookup = env.lookup_ext(symbol, None);

				// NOTE: We lookup in the root scope first because failing to lookup there is much faster than failing to lookup in an inner scope.
				// The reason for this is due to a current bug in SymbolEnv where the .parent ref gets lost when referencing the root, and becomes bad data
				// This bad data sometimes causes the lookup to take a long time (lots of entries), or even panic.
				// This should not cause incorrect lookups because we do not generally have shadowing in Wing
				// https://github.com/winglang/wing/issues/1644
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
