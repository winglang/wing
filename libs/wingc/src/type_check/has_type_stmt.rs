use crate::{
	ast::{FunctionDefinition, Stmt, StmtKind},
	visit::{self, Visit},
};

// List in this file the fields that are initialized in a class constructor.
#[derive(Default)]
pub struct HasStatementVisitor {
	pub seen_return: bool,
	pub seen_throw: bool,
}

impl HasStatementVisitor {
	pub fn visit(&mut self, statements: &[Stmt]) {
		for stmt in statements {
			self.visit_stmt(stmt);
		}
	}
}

impl Visit<'_> for HasStatementVisitor {
	fn visit_stmt(&mut self, node: &Stmt) {
		match &node.kind {
			StmtKind::Throw(_) => self.seen_throw = true,
			StmtKind::Return(_) => self.seen_return = true,
			_ => (),
		}
		visit::visit_stmt(self, node);
	}

	fn visit_function_definition(&mut self, _: &'_ FunctionDefinition) {
		// Don't recurse into functions. This way our search will ignore stmts in inner functions.
		return;
	}
}
