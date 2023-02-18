use crate::ast::{
	ArgList, Class, Constructor, Expr, ExprKind, FunctionDefinition, InterpolatedStringPart, Literal, Reference, Scope,
	Stmt, StmtKind,
};

pub trait Visit<'ast> {
	fn visit_scope(&mut self, e: &'ast Scope) {
		visit_scope(self, e);
	}
	fn visit_stmt(&mut self, e: &'ast Stmt) {
		visit_stmt(self, e);
	}
	fn visit_class(&mut self, e: &'ast Class) {
		visit_class(self, e);
	}
	fn visit_constructor(&mut self, e: &'ast Constructor) {
		visit_constructor(self, e);
	}
	fn visit_expr(&mut self, e: &'ast Expr) {
		visit_expr(self, e);
	}
	fn visit_literal(&mut self, e: &'ast Literal) {
		visit_literal(self, e);
	}
	fn visit_reference(&mut self, e: &'ast Reference) {
		visit_reference(self, e);
	}
	fn visit_function_definition(&mut self, e: &'ast FunctionDefinition) {
		visit_function_definition(self, e);
	}
	fn visit_args(&mut self, e: &'ast ArgList) {
		visit_args(self, e);
	}
}

pub fn visit_scope<'ast, V>(v: &mut V, node: &'ast Scope)
where
	V: Visit<'ast> + ?Sized,
{
	for stmt in &node.statements {
		v.visit_stmt(stmt);
	}
}

pub fn visit_stmt<'ast, V>(v: &mut V, node: &'ast Stmt)
where
	V: Visit<'ast> + ?Sized,
{
	match &node.kind {
		StmtKind::Bring {
			module_name: _,
			identifier: _,
		} => {}
		StmtKind::VariableDef {
			reassignable: _,
			var_name: _,
			initial_value,
			type_: _,
		} => {
			v.visit_expr(initial_value);
		}
		StmtKind::ForLoop {
			iterator: _,
			iterable,
			statements,
		} => {
			v.visit_expr(iterable);
			v.visit_scope(statements);
		}
		StmtKind::While { condition, statements } => {
			v.visit_expr(condition);
			v.visit_scope(statements);
		}
		StmtKind::If {
			condition,
			statements,
			elif_statements,
			else_statements,
		} => {
			v.visit_expr(condition);
			v.visit_scope(statements);
			for elif in elif_statements {
				v.visit_expr(&elif.condition);
				v.visit_scope(&elif.statements);
			}
			if let Some(statements) = else_statements {
				v.visit_scope(statements);
			}
		}
		StmtKind::Expression(expr) => {
			v.visit_expr(&expr);
		}
		StmtKind::Assignment { variable, value } => {
			v.visit_reference(variable);
			v.visit_expr(value);
		}
		StmtKind::Return(expr) => {
			if let Some(expr) = expr {
				v.visit_expr(expr);
			}
		}
		StmtKind::Scope(scope) => {
			v.visit_scope(scope);
		}
		StmtKind::Class(class) => {
			v.visit_class(class);
		}
		StmtKind::Struct {
			name: _,
			extends: _,
			members: _,
		} => {}
		StmtKind::Enum { name: _, values: _ } => {}
		StmtKind::TryCatch {
			try_statements,
			catch_block,
			finally_statements,
		} => {
			v.visit_scope(try_statements);
			if let Some(catch_block) = catch_block {
				v.visit_scope(&catch_block.statements);
			}
			if let Some(finally_statements) = finally_statements {
				v.visit_scope(finally_statements);
			}
		}
	}
}

pub fn visit_class<'ast, V>(v: &mut V, node: &'ast Class)
where
	V: Visit<'ast> + ?Sized,
{
	v.visit_constructor(&node.constructor);
	for method in &node.methods {
		v.visit_function_definition(&method.1);
	}
}

pub fn visit_constructor<'ast, V>(v: &mut V, node: &'ast Constructor)
where
	V: Visit<'ast> + ?Sized,
{
	v.visit_scope(&node.statements);
}

pub fn visit_expr<'ast, V>(v: &mut V, node: &'ast Expr)
where
	V: Visit<'ast> + ?Sized,
{
	match &node.kind {
		ExprKind::New {
			class: _,
			obj_id: _,
			obj_scope,
			args,
		} => {
			if let Some(scope) = obj_scope {
				v.visit_expr(scope);
			}
			v.visit_args(args);
		}
		ExprKind::Literal(lit) => {
			v.visit_literal(lit);
		}
		ExprKind::Reference(ref_) => {
			v.visit_reference(ref_);
		}
		ExprKind::Call { function, args } => {
			v.visit_expr(function);
			v.visit_args(args);
		}
		ExprKind::Unary { op: _, exp } => {
			v.visit_expr(exp);
		}
		ExprKind::Binary { op: _, left, right } => {
			v.visit_expr(left);
			v.visit_expr(right);
		}
		ExprKind::ArrayLiteral { type_: _, items } => {
			for item in items {
				v.visit_expr(item);
			}
		}
		ExprKind::StructLiteral { type_: _, fields } => {
			for val in fields.values() {
				v.visit_expr(val);
			}
		}
		ExprKind::MapLiteral { type_: _, fields } => {
			for val in fields.values() {
				v.visit_expr(val);
			}
		}
		ExprKind::SetLiteral { type_: _, items } => {
			for item in items {
				v.visit_expr(item);
			}
		}
		ExprKind::FunctionClosure(def) => {
			v.visit_function_definition(def);
		}
	}
}

pub fn visit_literal<'ast, V>(v: &mut V, node: &'ast Literal)
where
	V: Visit<'ast> + ?Sized,
{
	match node {
		Literal::InterpolatedString(interpolated_str) => {
			for part in &interpolated_str.parts {
				if let InterpolatedStringPart::Expr(exp) = part {
					v.visit_expr(exp);
				}
			}
		}
		_ => {}
	}
}

pub fn visit_reference<'ast, V>(v: &mut V, node: &'ast Reference)
where
	V: Visit<'ast> + ?Sized,
{
	match node {
		Reference::NestedIdentifier { property: _, object } => {
			v.visit_expr(object);
		}
		Reference::Identifier(_) => {}
	}
}

pub fn visit_function_definition<'ast, V>(v: &mut V, node: &'ast FunctionDefinition)
where
	V: Visit<'ast> + ?Sized,
{
	v.visit_scope(&node.statements);
}

pub fn visit_args<'ast, V>(v: &mut V, node: &'ast ArgList)
where
	V: Visit<'ast> + ?Sized,
{
	for arg in &node.pos_args {
		v.visit_expr(&arg);
	}
	for arg in &node.named_args {
		v.visit_expr(&arg.1);
	}
}
