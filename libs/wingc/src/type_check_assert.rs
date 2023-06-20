use crate::{
	ast::{Expr, Scope},
	type_check::Types,
	visit::{self, Visit},
};

pub struct TypeCheckAssert<'a> {
	types: &'a Types,
}

impl<'a> TypeCheckAssert<'a> {
	pub fn new(types: &'a Types) -> Self {
		Self { types }
	}

	pub fn check(&mut self, scope: &Scope) {
		self.visit_scope(scope);
	}
}

impl<'a> Visit<'_> for TypeCheckAssert<'a> {
	fn visit_expr(&mut self, expr: &Expr) {
		assert!(
			self.types.get_expr_type(expr).is_some(),
			"Expr was not type checked: {:?}",
			expr,
		);
		visit::visit_expr(self, expr);
	}
}
