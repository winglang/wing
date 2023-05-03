use crate::{
	ast::{Expr, FunctionDefinition, Scope},
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

	fn fold_function_definition(&mut self, node: FunctionDefinition) -> FunctionDefinition {
		let func_def = fold::fold_function_definition(self, node);
		func_def.captures.borrow_mut().take();
		func_def
	}
}
