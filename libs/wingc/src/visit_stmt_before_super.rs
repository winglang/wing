use crate::{
	ast::{CalleeKind, Elifs, Expr, ExprKind, IfLet, Reference, Scope, Stmt, StmtKind},
	visit::Visit,
};

#[derive(Clone)]
pub struct CheckValidBeforeSuperVisitor {
	pub supercall_valid: bool,
	pub instance_member_valid: bool,
	pub inner_scope_valid: bool,
}

impl CheckValidBeforeSuperVisitor {
	pub fn new() -> Self {
		CheckValidBeforeSuperVisitor {
			supercall_valid: true,
			instance_member_valid: true,
			inner_scope_valid: false,
		}
	}
}

impl<'ast> Visit<'ast> for CheckValidBeforeSuperVisitor {
	fn visit_expr(&mut self, node: &'ast Expr) {
		match &node.kind {
			ExprKind::Call { callee, .. } => {
				match callee {
					CalleeKind::Expr(e) => match &e.kind {
						ExprKind::Reference(r) => self.visit_reference(r),
						_ => {}
					},

					CalleeKind::SuperCall(..) => self.supercall_valid = false,
				};
			}
			ExprKind::Range { start, end, .. } => {
				self.visit_expr(start);
				self.visit_expr(end);
			}
			ExprKind::Binary { left, right, .. } => {
				self.visit_expr(left);
				self.visit_expr(right);
			}
			ExprKind::Unary { exp, .. } => self.visit_expr(exp),
			_ => self.supercall_valid = true,
		}
	}

	fn visit_reference(&mut self, node: &'ast Reference) {
		match &node {
			Reference::Identifier(s) => {
				if s.name == "this" {
					self.instance_member_valid = false;
				};
			}
			Reference::InstanceMember { object, .. } => match &object.kind {
				ExprKind::Reference(r) => self.visit_reference(r),
				_ => self.instance_member_valid = true,
			},
			_ => self.instance_member_valid = true,
		}
	}

	fn visit_stmt(&mut self, node: &'ast Stmt) {
		match &node.kind {
			StmtKind::Let { initial_value, .. } => self.visit_expr(initial_value),
			StmtKind::ForLoop { iterable, .. } => self.visit_expr(iterable),
			StmtKind::While { condition, statements } => {
				self.visit_expr(condition);
				self.visit_scope(statements);
			}
			StmtKind::IfLet(IfLet {
				value,
				statements,
				elif_statements,
				else_statements,
				..
			}) => {
				self.visit_expr(value);
				self.visit_scope(statements);
				for elif in elif_statements {
					match elif {
						Elifs::ElifBlock(elif_block) => {
							self.visit_expr(&elif_block.condition);
							self.visit_scope(&elif_block.statements);
						}
						Elifs::ElifLetBlock(elif_let_block) => {
							self.visit_expr(&elif_let_block.value);
							self.visit_scope(&elif_let_block.statements);
						}
					}
					if let Some(statements) = else_statements {
						self.visit_scope(statements);
					}
				}
			}
			StmtKind::If {
				condition,
				statements,
				elif_statements,
				else_statements,
			} => {
				self.visit_expr(condition);
				self.visit_scope(statements);
				for elif in elif_statements {
					self.visit_expr(&elif.condition);
					self.visit_scope(&elif.statements);
				}
				if let Some(statements) = else_statements {
					self.visit_scope(statements);
				}
			}
			StmtKind::Throw(e) => self.visit_expr(e),
			StmtKind::Expression(e) => self.visit_expr(e),
			StmtKind::Assignment { variable, value, .. } => {
				self.visit_reference(variable);
				self.visit_expr(value);
			}
			_ => {}
		}
	}

	fn visit_scope(&mut self, node: &'ast Scope) {
		for stmt in &node.statements {
			self.visit_stmt(stmt);
			self.inner_scope_valid = true;
		}
	}
}
