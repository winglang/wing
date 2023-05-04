use crate::{
	ast::{Expr, Scope},
	fold::{self, Fold},
};

pub struct EnvResetter;

impl Fold for EnvResetter {
	fn fold_expr(&mut self, expr: Expr) -> Expr {
		let expr = fold::fold_expr(self, expr);
		expr.evaluated_type.borrow_mut().take();
		expr
	}

	fn fold_scope(&mut self, node: Scope) -> Scope {
		let scope = fold::fold_scope(self, node);
		scope.env.borrow_mut().take();
		scope
	}
}
