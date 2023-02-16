use lsp_types::Position;

use crate::ast::ExprKind::*;
use crate::ast::StmtKind::*;
use crate::ast::{Scope, *};

pub fn visit_symbols<'a>(
	scope: &'a Scope,
	visitor_function: &mut dyn FnMut(&'a Scope, &'a Stmt, Option<&'a Expr>, &'a Symbol),
) {
	let mut statement_visitor_function = |scope: &'a Scope, statement: &'a Stmt| match &statement.kind {
		Bring { .. } => {}
		VariableDef { var_name, .. } => {
			visitor_function(scope, statement, None, var_name);
		}
		ForLoop { iterator, .. } => {
			visitor_function(scope, statement, None, iterator);
		}
		Assignment { variable, .. } => match variable {
			crate::ast::Reference::Identifier(s) => {
				visitor_function(scope, statement, None, s);
			}
			crate::ast::Reference::NestedIdentifier { property, .. } => {
				visitor_function(scope, statement, None, property);
			}
		},
		Class(c) => {
			visitor_function(scope, statement, None, &c.name);
			for param in c.constructor.parameters.iter() {
				visitor_function(scope, statement, None, &param.0);
			}
			for field in c.fields.iter() {
				visitor_function(scope, statement, None, &field.name);
			}
			for method in c.methods.iter() {
				visitor_function(scope, statement, None, &method.0);
				for parameter in method.1.parameters.iter() {
					visitor_function(scope, statement, None, &parameter.0);
				}
			}
		}
		Struct { name, extends, members } => {
			visitor_function(scope, statement, None, name);
			for member in members.iter() {
				visitor_function(scope, statement, None, &member.name);
			}
			for extend in extends.iter() {
				visitor_function(scope, statement, None, extend);
			}
		}
		Enum { name, values } => {
			visitor_function(scope, statement, None, name);
			for value in values.iter() {
				visitor_function(scope, statement, None, value);
			}
		}
		TryCatch { .. } => {}
		While { .. } => {}
		If { .. } => {}
		Return { .. } => {}
		Expression { .. } => {}
		Scope(_) => {}
	};
	visit_statements(scope, &mut statement_visitor_function);

	let mut expr_visitor = |scope: &'a Scope, statement: &'a Stmt, expr: &'a Expr| {
		let exp = Some(expr);

		match &expr.kind {
			New { arg_list, .. } => {
				for arg in arg_list.named_args.iter() {
					visitor_function(scope, statement, exp, arg.0);
				}
			}
			Literal(_) => {}
			Reference(r) => match r {
				crate::ast::Reference::Identifier(s) => {
					visitor_function(scope, statement, exp, s);
				}
				crate::ast::Reference::NestedIdentifier { property, .. } => {
					visitor_function(scope, statement, exp, property);
				}
			},
			Call { args, .. } => {
				for arg in args.named_args.iter() {
					visitor_function(scope, statement, exp, arg.0);
				}
			}
			Unary { .. } => {}
			Binary { .. } => {}
			ArrayLiteral { .. } => {}
			StructLiteral { fields, .. } => {
				for field in fields.iter() {
					visitor_function(scope, statement, exp, field.0);
				}
			}
			MapLiteral { .. } => {}
			SetLiteral { .. } => {}
			FunctionClosure(f) => {
				for parameter in f.parameters.iter() {
					visitor_function(scope, statement, exp, &parameter.0);
				}
			}
		};
	};

	visit_expressions(scope, &mut expr_visitor);
}

pub fn visit_statements_in_expression<'a>(
	scope: &'a Scope,
	expr: &'a Expr,
	visitor_function: &mut dyn FnMut(&'a Scope, &'a Stmt),
) {
	match &expr.kind {
		New { arg_list, .. } => {
			for arg in arg_list.named_args.iter() {
				visit_statements_in_expression(scope, arg.1, visitor_function);
			}
			for arg in arg_list.pos_args.iter() {
				visit_statements_in_expression(scope, arg, visitor_function);
			}
		}
		FunctionClosure(f) => visit_statements(&f.statements, visitor_function),
		Call { function, args } => {
			visit_statements_in_expression(scope, function, visitor_function);
			for arg in args.named_args.iter() {
				visit_statements_in_expression(scope, arg.1, visitor_function);
			}
		}
		_ => {}
	}
}

pub fn visit_statements<'a>(scope: &'a Scope, visitor_function: &mut dyn FnMut(&'a Scope, &'a Stmt)) {
	for statement in scope.statements.iter() {
		visitor_function(scope, statement);
		match &statement.kind {
			Bring { .. } => {}
			VariableDef { initial_value, .. } => {
				visit_statements_in_expression(scope, initial_value, visitor_function);
			}
			ForLoop {
				statements, iterable, ..
			} => {
				visit_statements(statements, visitor_function);
				visit_statements_in_expression(scope, iterable, visitor_function);
			}
			While { statements, condition } => {
				visit_statements(statements, visitor_function);
				visit_statements_in_expression(scope, condition, visitor_function);
			}
			If {
				statements,
				elif_statements,
				else_statements,
				condition,
			} => {
				visit_statements(statements, visitor_function);
				for elif in elif_statements.iter() {
					visit_statements(&elif.statements, visitor_function);
				}
				if let Some(else_statements) = else_statements {
					visit_statements(else_statements, visitor_function);
				}
				visit_statements_in_expression(scope, condition, visitor_function);
			}
			Expression(exp) => {
				visit_statements_in_expression(scope, exp, visitor_function);
			}
			Assignment { value, .. } => {
				visit_statements_in_expression(scope, value, visitor_function);
			}
			Return(r) => {
				if let Some(value) = r {
					visit_statements_in_expression(scope, value, visitor_function);
				}
			}
			Scope(s) => {
				visit_statements(s, visitor_function);
			}
			Class(c) => {
				visit_statements(&c.constructor.statements, visitor_function);
				for method in c.methods.iter() {
					visit_statements(&method.1.statements, visitor_function);
				}
			}
			TryCatch {
				try_statements,
				catch_block,
				finally_statements,
			} => {
				visit_statements(try_statements, visitor_function);

				if let Some(catch_block) = catch_block {
					visit_statements(&catch_block.statements, visitor_function);
				}

				if let Some(finally_statements) = finally_statements {
					visit_statements(finally_statements, visitor_function);
				}
			}
			Struct { .. } => {}
			Enum { .. } => {}
		}
	}
}

pub fn visit_expression_recursive<'a>(
	scope: &'a Scope,
	statement: &'a Stmt,
	expression: &'a Expr,
	visitor_function: &mut dyn FnMut(&'a Scope, &'a Stmt, &'a Expr),
) {
	visitor_function(scope, statement, expression);
	match &expression.kind {
		Literal(l) => {
			if let crate::ast::Literal::InterpolatedString(s) = l {
				for part in s.parts.iter() {
					match part {
						crate::ast::InterpolatedStringPart::Static(_) => {}
						crate::ast::InterpolatedStringPart::Expr(e) => {
							visit_expression_recursive(scope, statement, e, visitor_function);
						}
					}
				}
			}
		}
		Reference(r) => match r {
			crate::ast::Reference::Identifier(_) => {}
			crate::ast::Reference::NestedIdentifier { object, .. } => {
				visit_expression_recursive(scope, statement, object, visitor_function);
			}
		},
		Call { function, args } => {
			visit_expression_recursive(scope, statement, function, visitor_function);
			for arg in args.named_args.iter() {
				visit_expression_recursive(scope, statement, arg.1, visitor_function);
			}
			for arg in args.pos_args.iter() {
				visit_expression_recursive(scope, statement, arg, visitor_function);
			}
		}
		Unary { exp, .. } => {
			visit_expression_recursive(scope, statement, exp, visitor_function);
		}
		Binary { lexp, rexp, .. } => {
			visit_expression_recursive(scope, statement, lexp, visitor_function);
			visit_expression_recursive(scope, statement, rexp, visitor_function);
		}
		ArrayLiteral { items, .. } => {
			for item in items.iter() {
				visit_expression_recursive(scope, statement, item, visitor_function);
			}
		}
		StructLiteral { fields, .. } => {
			for field in fields.iter() {
				visit_expression_recursive(scope, statement, field.1, visitor_function);
			}
		}
		MapLiteral { fields, .. } => {
			for field in fields.iter() {
				visit_expression_recursive(scope, statement, field.1, visitor_function);
			}
		}
		SetLiteral { items, .. } => {
			for item in items.iter() {
				visit_expression_recursive(scope, statement, item, visitor_function);
			}
		}
		FunctionClosure(_) => {}
		New {
			obj_scope, arg_list, ..
		} => {
			for arg in arg_list.named_args.iter() {
				visit_expression_recursive(scope, statement, arg.1, visitor_function);
			}
			for arg in arg_list.pos_args.iter() {
				visit_expression_recursive(scope, statement, arg, visitor_function);
			}
			if let Some(obj_scope) = obj_scope {
				visit_expression_recursive(scope, statement, obj_scope, visitor_function);
			}
		}
	}
}

pub fn visit_expressions<'a>(scope: &'a Scope, visitor_function: &mut dyn FnMut(&'a Scope, &'a Stmt, &'a Expr)) {
	let mut statement_expression_visitor = |scope: &'a Scope, statement: &'a Stmt| {
		match &statement.kind {
			VariableDef { initial_value, .. } => {
				visit_expression_recursive(scope, statement, initial_value, visitor_function);
			}
			ForLoop { iterable, .. } => {
				visit_expression_recursive(scope, statement, iterable, visitor_function);
			}
			While { condition, .. } => {
				visit_expression_recursive(scope, statement, condition, visitor_function);
			}
			If { condition, .. } => {
				visit_expression_recursive(scope, statement, condition, visitor_function);
			}
			Expression(expr) => {
				visit_expression_recursive(scope, statement, expr, visitor_function);
			}
			Assignment { variable, value } => {
				match variable {
					crate::ast::Reference::Identifier(_) => {}
					crate::ast::Reference::NestedIdentifier { object, .. } => {
						visit_expression_recursive(scope, statement, object, visitor_function);
					}
				};

				visit_expression_recursive(scope, statement, value, visitor_function);
			}
			Return(r) => {
				if let Some(r) = r {
					visit_expression_recursive(scope, statement, r, visitor_function);
				}
			}
			Struct { .. } => {}
			Class(_) => {}
			Scope(_) => {}
			Enum { .. } => {}
			Bring { .. } => {}
			TryCatch { .. } => {}
		};
	};

	visit_statements(scope, &mut statement_expression_visitor);
}
