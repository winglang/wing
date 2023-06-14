use crate::{
	ast::{Expr, Scope},
	type_check::Types,
	visit::{self, Visit},
};

pub struct TypeCheckAssert<'a> {
	types: &'a Types,
	tc_found_errors: bool,
}

impl<'a> TypeCheckAssert<'a> {
	pub fn new(types: &'a Types, tc_found_errors: bool) -> Self {
		Self { types, tc_found_errors }
	}

	pub fn check(&mut self, scope: &Scope) {
		self.visit_scope(scope);
	}
}

impl<'a> Visit<'_> for TypeCheckAssert<'a> {
	fn visit_expr(&mut self, expr: &Expr) {
		if let Some(t) = self.types.get_expr_type(expr) {
			assert!(
				self.tc_found_errors || !t.is_error(),
				"Expr's type was not resolved: {:?}",
				expr
			);
		} else {
			panic!("Expr was not type checked: {:?}", expr)
		}
		visit::visit_expr(self, expr);
	}
}
