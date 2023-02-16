use lsp_types::Position;

use crate::ast::ExprKind::*;
use crate::ast::StmtKind::*;
use crate::ast::{Scope, *};

#[derive(Debug, Clone, Copy)]
pub struct TreeLocationContext<'a> {
	pub scope: &'a Scope,
	pub statement: &'a Stmt,
	pub expression: Option<&'a Expr>,
}

pub fn find_symbol<'a>(scope: &'a Scope, position: &'a Position) -> Option<(TreeLocationContext<'a>, &'a Symbol)> {
	let all_statements = get_statements_from_scope_raw(scope);
	for context in all_statements {
		let statement = context.statement;
		if !statement.span.contains(position) {
			continue;
		}
		match &statement.kind {
			Bring { .. } => {}
			VariableDef { var_name, .. } => {
				if var_name.span.contains(position) {
					return Some((context, var_name));
				};
			}
			ForLoop { iterator, .. } => {
				if iterator.span.contains(position) {
					return Some((context, iterator));
				}
			}
			Assignment { variable, .. } => match variable {
				crate::ast::Reference::Identifier(s) => {
					if s.span.contains(position) {
						return Some((context, s));
					}
				}
				crate::ast::Reference::NestedIdentifier { property, .. } => {
					if property.span.contains(position) {
						return Some((context, property));
					}
				}
			},
			Class(c) => {
				if c.name.span.contains(position) {
					return Some((context, &c.name));
				}
				for param in c.constructor.parameters.iter() {
					if param.0.span.contains(position) {
						return Some((context, &param.0));
					}
				}
				for field in c.fields.iter() {
					if field.name.span.contains(position) {
						return Some((context, &field.name));
					}
				}
				for method in c.methods.iter() {
					if method.0.span.contains(position) {
						return Some((context, &method.0));
					}
					for parameter in method.1.parameters.iter() {
						if parameter.0.span.contains(position) {
							return Some((context, &parameter.0));
						}
					}
				}
			}
			Struct { name, extends, members } => {
				if name.span.contains(position) {
					return Some((context, name));
				}
				for member in members.iter() {
					if member.name.span.contains(position) {
						return Some((context, &member.name));
					}
				}
				for extend in extends.iter() {
					if extend.span.contains(position) {
						return Some((context, extend));
					}
				}
			}
			Enum { name, values } => {
				if name.span.contains(position) {
					return Some((context, name));
				}
				for value in values.iter() {
					if value.span.contains(position) {
						return Some((context, value));
					}
				}
			}
			TryCatch { .. } => {}
			While { .. } => {}
			If { .. } => {}
			Return { .. } => {}
			Expression { .. } => {}
			Scope(_) => {}
		};

		let all_expressions = get_expressions_from_statement(context);

		for expression_context in all_expressions {
			if let Some(expression) = expression_context.expression {
				if !expression.span.contains(position) {
					continue;
				}
				match &expression.kind {
					New { arg_list, .. } => {
						for arg in arg_list.named_args.iter() {
							if arg.0.span.contains(position) {
								return Some((expression_context, arg.0));
							}
						}
					}
					Literal(_) => {}
					Reference(r) => match r {
						crate::ast::Reference::Identifier(s) => {
							if s.span.contains(position) {
								return Some((expression_context, s));
							}
						}
						crate::ast::Reference::NestedIdentifier { property, .. } => {
							if property.span.contains(position) {
								return Some((expression_context, property));
							}
						}
					},
					Call { args, .. } => {
						for arg in args.named_args.iter() {
							if arg.0.span.contains(position) {
								return Some((expression_context, arg.0));
							}
						}
					}
					StructLiteral { fields, .. } => {
						for field in fields.iter() {
							if field.0.span.contains(position) {
								return Some((expression_context, &field.0));
							}
						}
					}
					FunctionClosure(f) => {
						for parameter in f.parameters.iter() {
							if parameter.0.span.contains(position) {
								return Some((expression_context, &parameter.0));
							}
						}
					}
					Unary { .. } => {}
					Binary { .. } => {}
					ArrayLiteral { .. } => {}
					MapLiteral { .. } => {}
					SetLiteral { .. } => {}
				};
			}
		}
	}

	None
}

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

pub fn get_expressions_from_statement<'a>(context: TreeLocationContext) -> Vec<TreeLocationContext> {
	let mut return_expressions: Vec<TreeLocationContext> = vec![];
	match &context.statement.kind {
		VariableDef { initial_value, .. } => {
			return_expressions.extend(get_expressions_from_expression(TreeLocationContext {
				expression: Some(initial_value),
				..context
			}));
		}
		ForLoop { iterable, .. } => {
			return_expressions.extend(get_expressions_from_expression(TreeLocationContext {
				expression: Some(iterable),
				..context
			}));
		}
		While { condition, .. } => {
			return_expressions.extend(get_expressions_from_expression(TreeLocationContext {
				expression: Some(condition),
				..context
			}));
		}
		If { condition, .. } => {
			return_expressions.extend(get_expressions_from_expression(TreeLocationContext {
				expression: Some(condition),
				..context
			}));
		}
		Expression(expr) => {
			return_expressions.extend(get_expressions_from_expression(TreeLocationContext {
				expression: Some(expr),
				..context
			}));
		}
		Assignment { variable, value } => {
			match variable {
				crate::ast::Reference::Identifier(_) => {}
				crate::ast::Reference::NestedIdentifier { object, .. } => {
					return_expressions.extend(get_expressions_from_expression(TreeLocationContext {
						expression: Some(object),
						..context
					}));
				}
			};

			return_expressions.extend(get_expressions_from_expression(TreeLocationContext {
				expression: Some(value),
				..context
			}));
		}
		Return(r) => {
			if let Some(r) = r {
				return_expressions.extend(get_expressions_from_expression(TreeLocationContext {
					expression: Some(r),
					..context
				}));
			}
		}
		TryCatch {
			try_statements,
			catch_block,
			finally_statements,
		} => {
			return_expressions.extend(get_expressions_from_scope(TreeLocationContext {
				scope: try_statements,
				expression: None,
				..context
			}));

			if let Some(catch_block) = catch_block {
				return_expressions.extend(get_expressions_from_scope(TreeLocationContext {
					scope: &catch_block.statements,
					expression: None,
					..context
				}));
			}

			if let Some(finally_statements) = finally_statements {
				return_expressions.extend(get_expressions_from_scope(TreeLocationContext {
					scope: finally_statements,
					expression: None,
					..context
				}));
			}
		}
		Class(c) => {
			return_expressions.extend(get_expressions_from_scope(TreeLocationContext {
				scope: &c.constructor.statements,
				expression: None,
				..context
			}));

			for method in c.methods.iter() {
				return_expressions.extend(get_expressions_from_scope(TreeLocationContext {
					scope: &method.1.statements,
					expression: None,
					..context
				}));
			}
		}
		Scope(scope) => {
			return_expressions.extend(get_expressions_from_scope(TreeLocationContext {
				scope: &scope,
				expression: None,
				..context
			}));
		}
		Enum { .. } => {}
		Bring { .. } => {}
		Struct { .. } => {}
	}
	return_expressions
}

pub fn get_expressions_from_expression<'a>(context: TreeLocationContext) -> Vec<TreeLocationContext> {
	let mut return_expressions = vec![context];

	if let Some(expr) = context.expression {
		match &expr.kind {
			Literal(l) => {
				if let crate::ast::Literal::InterpolatedString(s) = l {
					for part in s.parts.iter() {
						match part {
							crate::ast::InterpolatedStringPart::Static(_) => {}
							crate::ast::InterpolatedStringPart::Expr(e) => {
								return_expressions.extend(get_expressions_from_expression(TreeLocationContext {
									expression: Some(e),
									..context
								}));
							}
						}
					}
				}
			}
			Reference(r) => match r {
				crate::ast::Reference::Identifier(_) => {}
				crate::ast::Reference::NestedIdentifier { object, .. } => {
					return_expressions.extend(get_expressions_from_expression(TreeLocationContext {
						expression: Some(object),
						..context
					}));
				}
			},
			Call { function, args } => {
				return_expressions.extend(get_expressions_from_expression(TreeLocationContext {
					expression: Some(function),
					..context
				}));
				for arg in args.named_args.iter() {
					return_expressions.extend(get_expressions_from_expression(TreeLocationContext {
						expression: Some(&arg.1),
						..context
					}));
				}
				for arg in args.pos_args.iter() {
					return_expressions.extend(get_expressions_from_expression(TreeLocationContext {
						expression: Some(arg),
						..context
					}));
				}
			}
			Unary { exp, .. } => {
				return_expressions.extend(get_expressions_from_expression(TreeLocationContext {
					expression: Some(exp),
					..context
				}));
			}
			Binary { lexp, rexp, .. } => {
				return_expressions.extend(get_expressions_from_expression(TreeLocationContext {
					expression: Some(lexp),
					..context
				}));
				return_expressions.extend(get_expressions_from_expression(TreeLocationContext {
					expression: Some(rexp),
					..context
				}));
			}
			ArrayLiteral { items, .. } => {
				for item in items.iter() {
					return_expressions.extend(get_expressions_from_expression(TreeLocationContext {
						expression: Some(item),
						..context
					}));
				}
			}
			StructLiteral { fields, .. } => {
				for field in fields.iter() {
					return_expressions.extend(get_expressions_from_expression(TreeLocationContext {
						expression: Some(&field.1),
						..context
					}));
				}
			}
			MapLiteral { fields, .. } => {
				for field in fields.iter() {
					return_expressions.extend(get_expressions_from_expression(TreeLocationContext {
						expression: Some(&field.1),
						..context
					}));
				}
			}
			SetLiteral { items, .. } => {
				for item in items.iter() {
					return_expressions.extend(get_expressions_from_expression(TreeLocationContext {
						expression: Some(item),
						..context
					}));
				}
			}
			New {
				obj_scope, arg_list, ..
			} => {
				if let Some(obj_scope) = obj_scope {
					return_expressions.extend(get_expressions_from_expression(TreeLocationContext {
						expression: Some(obj_scope),
						..context
					}));
				}
				for arg in arg_list.named_args.iter() {
					return_expressions.extend(get_expressions_from_expression(TreeLocationContext {
						expression: Some(&arg.1),
						..context
					}));
				}
				for arg in arg_list.pos_args.iter() {
					return_expressions.extend(get_expressions_from_expression(TreeLocationContext {
						expression: Some(arg),
						..context
					}));
				}
				for arg in arg_list.named_args.iter() {
					return_expressions.extend(get_expressions_from_expression(TreeLocationContext {
						expression: Some(&arg.1),
						..context
					}));
				}
			}
			FunctionClosure(fc) => {
				return_expressions.extend(get_expressions_from_scope(TreeLocationContext {
					scope: &fc.statements,
					expression: None,
					..context
				}));
			}
		}
	} else {
		return return_expressions;
	}

	return_expressions
}

pub fn get_statements_from_statement<'a>(context: TreeLocationContext) -> Vec<TreeLocationContext> {
	let mut return_statements = vec![context];
	match &context.statement.kind {
		VariableDef { initial_value, .. } => {
			return_statements.extend(get_statements_from_expression(TreeLocationContext {
				expression: Some(initial_value),
				..context
			}));
		}
		ForLoop {
			iterable, statements, ..
		} => {
			return_statements.extend(get_statements_from_scope(TreeLocationContext {
				scope: statements,
				expression: None,
				..context
			}));
			return_statements.extend(get_statements_from_expression(TreeLocationContext {
				expression: Some(iterable),
				..context
			}));
		}
		While { condition, statements } => {
			return_statements.extend(get_statements_from_scope(TreeLocationContext {
				scope: statements,
				expression: None,
				..context
			}));
			return_statements.extend(get_statements_from_expression(TreeLocationContext {
				expression: Some(condition),
				..context
			}));
		}
		If {
			condition,
			elif_statements,
			else_statements,
			statements,
		} => {
			return_statements.extend(get_statements_from_scope(TreeLocationContext {
				scope: statements,
				expression: None,
				..context
			}));
			return_statements.extend(get_statements_from_expression(TreeLocationContext {
				expression: Some(condition),
				..context
			}));

			for elif in elif_statements.iter() {
				return_statements.extend(get_statements_from_scope(TreeLocationContext {
					scope: &elif.statements,
					expression: None,
					..context
				}));
				return_statements.extend(get_statements_from_expression(TreeLocationContext {
					expression: Some(&elif.condition),
					..context
				}));
			}

			if let Some(else_statements) = else_statements {
				return_statements.extend(get_statements_from_scope(TreeLocationContext {
					scope: else_statements,
					expression: None,
					..context
				}));
			}
		}
		Expression(expr) => {
			return_statements.extend(get_statements_from_expression(TreeLocationContext {
				expression: Some(expr),
				..context
			}));
		}
		Assignment { variable, value } => {
			return_statements.extend(get_statements_from_expression(TreeLocationContext {
				expression: Some(value),
				..context
			}));
			if let crate::ast::Reference::NestedIdentifier { object, .. } = variable {
				return_statements.extend(get_statements_from_expression(TreeLocationContext {
					expression: Some(object),
					..context
				}));
			}
		}
		Return(r) => {
			if let Some(r) = r {
				return_statements.extend(get_statements_from_expression(TreeLocationContext {
					expression: Some(r),
					..context
				}));
			}
		}
		Class(c) => {
			// the order here assumes that the constructor is always the first statement, which is not true
			return_statements.extend(get_statements_from_scope(TreeLocationContext {
				scope: &c.constructor.statements,
				expression: None,
				..context
			}));

			for method in c.methods.iter() {
				return_statements.extend(get_statements_from_scope(TreeLocationContext {
					scope: &method.1.statements,
					expression: None,
					..context
				}));
			}
		}
		Scope(s) => {
			return_statements.extend(get_statements_from_scope(TreeLocationContext {
				scope: s,
				expression: None,
				..context
			}));
		}
		TryCatch {
			try_statements,
			catch_block,
			finally_statements,
		} => {
			return_statements.extend(get_statements_from_scope(TreeLocationContext {
				scope: try_statements,
				expression: None,
				..context
			}));
			if let Some(catch_block) = catch_block {
				return_statements.extend(get_statements_from_scope(TreeLocationContext {
					scope: &catch_block.statements,
					expression: None,
					..context
				}));
			}
			if let Some(finally_statements) = finally_statements {
				return_statements.extend(get_statements_from_scope(TreeLocationContext {
					scope: finally_statements,
					expression: None,
					..context
				}));
			}
		}
		Enum { .. } => {}
		Bring { .. } => {}
		Struct { .. } => {}
	}
	return_statements
}

pub fn get_statements_from_expression<'a>(context: TreeLocationContext) -> Vec<TreeLocationContext> {
	let mut return_statements = vec![];

	if let Some(expression) = context.expression {
		match &expression.kind {
			Literal(l) => {
				if let crate::ast::Literal::InterpolatedString(s) = l {
					for part in s.parts.iter() {
						match part {
							crate::ast::InterpolatedStringPart::Static(_) => {}
							crate::ast::InterpolatedStringPart::Expr(e) => {
								return_statements.extend(get_statements_from_expression(TreeLocationContext {
									expression: Some(e),
									..context
								}));
							}
						}
					}
				}
			}
			Reference(r) => match r {
				crate::ast::Reference::Identifier(_) => {}
				crate::ast::Reference::NestedIdentifier { object, .. } => {
					return_statements.extend(get_statements_from_expression(TreeLocationContext {
						expression: Some(object),
						..context
					}));
				}
			},
			Call { function, args } => {
				return_statements.extend(get_statements_from_expression(TreeLocationContext {
					expression: Some(function),
					..context
				}));
				for arg in args.named_args.iter() {
					return_statements.extend(get_statements_from_expression(TreeLocationContext {
						expression: Some(&arg.1),
						..context
					}));
				}
				for arg in args.pos_args.iter() {
					return_statements.extend(get_statements_from_expression(TreeLocationContext {
						expression: Some(arg),
						..context
					}));
				}
			}
			Unary { exp, .. } => {
				return_statements.extend(get_statements_from_expression(TreeLocationContext {
					expression: Some(exp),
					..context
				}));
			}
			Binary { lexp, rexp, .. } => {
				return_statements.extend(get_statements_from_expression(TreeLocationContext {
					expression: Some(lexp),
					..context
				}));
				return_statements.extend(get_statements_from_expression(TreeLocationContext {
					expression: Some(rexp),
					..context
				}));
			}
			ArrayLiteral { items, .. } => {
				for item in items.iter() {
					return_statements.extend(get_statements_from_expression(TreeLocationContext {
						expression: Some(item),
						..context
					}));
				}
			}
			StructLiteral { fields, .. } => {
				for field in fields.iter() {
					return_statements.extend(get_statements_from_expression(TreeLocationContext {
						expression: Some(field.1),
						..context
					}));
				}
			}
			MapLiteral { fields, .. } => {
				for field in fields.iter() {
					return_statements.extend(get_statements_from_expression(TreeLocationContext {
						expression: Some(&field.1),
						..context
					}));
				}
			}
			SetLiteral { items, .. } => {
				for item in items.iter() {
					return_statements.extend(get_statements_from_expression(TreeLocationContext {
						expression: Some(item),
						..context
					}));
				}
			}
			New {
				obj_scope, arg_list, ..
			} => {
				if let Some(obj_scope) = obj_scope {
					return_statements.extend(get_statements_from_expression(TreeLocationContext {
						expression: Some(obj_scope),
						..context
					}));
				}
				for arg in arg_list.named_args.iter() {
					return_statements.extend(get_statements_from_expression(TreeLocationContext {
						expression: Some(&arg.1),
						..context
					}));
				}
				for arg in arg_list.pos_args.iter() {
					return_statements.extend(get_statements_from_expression(TreeLocationContext {
						expression: Some(arg),
						..context
					}));
				}
			}
			FunctionClosure(fc) => {
				return_statements.extend(get_statements_from_scope(TreeLocationContext {
					scope: &fc.statements,
					expression: None,
					..context
				}));
			}
		}
	}
	return_statements
}

pub fn get_statements_from_scope<'a>(context: TreeLocationContext) -> Vec<TreeLocationContext> {
	let mut return_statements = vec![];
	for statement in context.scope.statements.iter() {
		return_statements.extend(get_statements_from_statement(TreeLocationContext {
			statement,
			expression: None,
			..context
		}));
	}
	return_statements
}

pub fn get_expressions_from_scope<'a>(context: TreeLocationContext) -> Vec<TreeLocationContext> {
	let mut return_expressions = vec![];
	for statement in context.scope.statements.iter() {
		return_expressions.extend(get_expressions_from_statement(TreeLocationContext {
			statement,
			expression: None,
			..context
		}));
	}
	return_expressions
}

pub fn get_statements_from_scope_raw<'a>(scope: &'a Scope) -> Vec<TreeLocationContext> {
	let mut return_statements = vec![];
	for statement in scope.statements.iter() {
		let context = TreeLocationContext {
			scope,
			statement,
			expression: None,
		};
		return_statements.extend(get_statements_from_statement(context));
	}
	return_statements
}
