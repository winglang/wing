use crate::{
	ast::Expr,
	visit::{self, Visit},
};

pub struct TypeCheckAssert;

impl Visit<'_> for TypeCheckAssert {
	fn visit_expr(&mut self, expr: &Expr) {
		assert!(
			expr.evaluated_type.borrow().is_some(),
			"Expr was not type checked: {:?}",
			expr
		);
		visit::visit_expr(self, expr);
	}
}
