use crate::{
	ast::{Reference, Stmt, StmtKind, Symbol},
	visit::{self, Visit},
};

/// Determine a list of all fields that are initialized in a class constructor.
#[derive(Default)]
pub struct VisitClassInit {
	pub fields: Vec<Symbol>,
}

impl VisitClassInit {
	pub fn analyze_statements(&mut self, statements: &[Stmt]) {
		for stmt in statements {
			self.visit_stmt(stmt);
		}
	}
}

impl Visit<'_> for VisitClassInit {
	fn visit_stmt(&mut self, node: &Stmt) {
		match &node.kind {
			StmtKind::Assignment { variable, value: _ } => match &variable {
				Reference::InstanceMember { property, object: _ } => self.fields.push(Symbol {
					name: property.name.clone(),
					span: property.span.clone(),
				}),
				_ => (),
			},
			_ => (),
		}
		visit::visit_stmt(self, node);
	}
}
