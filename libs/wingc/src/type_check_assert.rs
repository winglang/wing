use crate::{
	ast::{Ast, Expr, Scope},
	type_check::Types,
	visit::{self, Visit},
};

/// This visitor validates:
/// 1. All expressions in the AST were resolved to some type.
/// 2. If any were resolved to `Unresolved` then we should have generated some error diagnostics.
/// 3. Any Json literal expression only has legal json values unless it is being used as a struct.
pub struct TypeCheckAssert<'a> {
	ast: &'a Ast,
	types: &'a Types,
	tc_found_errors: bool,
}

impl<'a> TypeCheckAssert<'a> {
	pub fn new(ast: &'a Ast, types: &'a Types, tc_found_errors: bool) -> Self {
		Self {
			ast,
			types,
			tc_found_errors,
		}
	}

	pub fn check(&mut self, scope: &'a Scope) {
		self.visit_scope(scope);
	}
}

impl<'a> Visit<'a> for TypeCheckAssert<'a> {
	fn ast(&self) -> &'a Ast {
		self.ast
	}

	fn visit_expr(&mut self, expr: &'a Expr) {
		if let Some(t) = self.types.try_get_expr_type(expr.id) {
			assert!(
				self.tc_found_errors || !t.is_unresolved(),
				"Expr's type was not resolved: {:?}",
				expr
			);
		} else {
			panic!("Expr was not type checked: {:?}", expr)
		}
		visit::visit_expr(self, expr);
	}
}
