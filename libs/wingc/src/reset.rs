use crate::{
	ast::{Expr, FunctionDefinition, Scope},
	visit_mut::{self, VisitMut},
};

pub struct EnvResetter;

impl VisitMut<'_> for EnvResetter {
	fn visit_expr_mut(&mut self, expr: &mut Expr) {
		expr.evaluated_type.borrow_mut().take();
		visit_mut::visit_expr_mut(self, expr);
	}

	fn visit_scope_mut(&mut self, node: &mut Scope) {
		node.env.borrow_mut().take();
		visit_mut::visit_scope_mut(self, node);
	}

	fn visit_function_definition_mut(&mut self, node: &mut FunctionDefinition) {
		node.captures.borrow_mut().take();
		visit_mut::visit_function_definition_mut(self, node);
	}
}
