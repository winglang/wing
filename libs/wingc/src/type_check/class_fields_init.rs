use crate::{
	ast::{AssignmentKind, Ast, FunctionDefinition, Reference, Stmt, StmtKind, Symbol},
	visit::{self, Visit},
};

/// Determine a list of all fields that are initialized in a class constructor.
pub struct VisitClassInit<'a> {
	ast: &'a Ast,
	pub fields: Vec<Symbol>,
}

impl<'a> VisitClassInit<'a> {
	pub fn new(ast: &'a Ast) -> Self {
		Self { ast, fields: vec![] }
	}

	pub fn analyze_statements<I>(mut self, statements: I) -> Vec<Symbol>
	where
		I: IntoIterator<Item = &'a Stmt>,
	{
		for stmt in statements {
			self.visit_stmt(stmt);
		}
		self.fields
	}
}

impl<'a> Visit<'a> for VisitClassInit<'a> {
	fn ast(&self) -> &'a Ast {
		self.ast
	}

	fn visit_stmt(&mut self, node: &'a Stmt) {
		match &node.kind {
			StmtKind::Assignment {
				kind: AssignmentKind::Assign,
				variable,
				value: _,
			} => match variable {
				Reference::InstanceMember {
					property,
					object: _,
					optional_accessor: _,
				} => self.fields.push(Symbol {
					name: property.name.clone(),
					span: property.span.clone(),
				}),
				_ => (),
			},
			_ => (),
		}
		visit::visit_stmt(self, node);
	}

	fn visit_function_definition(&mut self, _node: &FunctionDefinition) {
		// Skip visiting inner functions since any assignments inside them are
		// (probably) not executed in the constructor.
	}
}
