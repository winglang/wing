use crate::{
	ast::{Stmt, StmtKind},
	visit::{self, Visit},
};

/// Determine a list of all fields that are initialized in a class constructor.
#[derive(Default)]
pub struct HasReturnStatementVisitor {
	pub seen_return: bool,
}

impl HasReturnStatementVisitor {
	pub fn visit(&mut self, statements: &[Stmt]) {
		for stmt in statements {
			self.visit_stmt(stmt);
		}
	}
}

impl Visit<'_> for HasReturnStatementVisitor {
	fn visit_stmt(&mut self, node: &Stmt) {
		match &node.kind {
			StmtKind::Return(_) => self.seen_return = true,
			_ => (),
		}
		visit::visit_stmt(self, node);
	}
}
