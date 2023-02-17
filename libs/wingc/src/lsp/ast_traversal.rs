use lsp_types::Position;

use crate::ast::ExprKind::*;
use crate::ast::StmtKind::*;
use crate::ast::{Scope, *};

/// While traversing the AST, this represent the context of a given node.
#[derive(Debug, Clone, Copy)]
pub struct TreeLocationContext<'a> {
	pub scope: &'a Scope,
	pub statement: &'a Stmt,
	pub expression: Option<&'a Expr>,
}

/// Traverse the AST and find the symbol at the given position.
pub fn find_symbol<'a>(scope: &'a Scope, position: &'a Position) -> Option<(TreeLocationContext<'a>, &'a Symbol)> {
	let all_statements = get_statements_from_scope_no_context(scope);
	for context in all_statements {
		let statement = context.statement;
		if !statement.span.contains(position) {
			continue;
		}

		for symbol_lookup in get_symbols_from_statement(context).iter() {
			let symbol = symbol_lookup.1;
			if symbol.span.contains(position) {
				return Some((symbol_lookup.0, symbol));
			}
		}

		let all_expressions = get_expressions_from_statement(context);

		for expression_context in all_expressions {
			for symbol_lookup in get_symbols_from_expression(expression_context).iter() {
				let symbol = symbol_lookup.1;
				if symbol.span.contains(position) {
					return Some((symbol_lookup.0, symbol));
				}
			}
		}
	}

	None
}

/// Traverse the given statement context and return all expressions inside it (recursive).
pub fn get_expressions_from_statement<'a>(context: TreeLocationContext) -> Vec<TreeLocationContext> {
	let mut return_expressions: Vec<TreeLocationContext> = vec![];
	match &context.statement.kind {
		VariableDef { initial_value, .. } => {
			return_expressions.extend(get_expressions_from_expression(TreeLocationContext {
				expression: Some(initial_value),
				..context
			}));
		}
		ForLoop {
			iterable, statements, ..
		} => {
			return_expressions.extend(get_expressions_from_expression(TreeLocationContext {
				expression: Some(iterable),
				..context
			}));
			return_expressions.extend(get_expressions_from_scope(TreeLocationContext {
				scope: &statements,
				expression: None,
				..context
			}))
		}
		While {
			condition, statements, ..
		} => {
			return_expressions.extend(get_expressions_from_expression(TreeLocationContext {
				expression: Some(condition),
				..context
			}));
			return_expressions.extend(get_expressions_from_scope(TreeLocationContext {
				scope: &statements,
				expression: None,
				..context
			}))
		}
		If {
			condition,
			statements,
			elif_statements,
			else_statements,
			..
		} => {
			return_expressions.extend(get_expressions_from_expression(TreeLocationContext {
				expression: Some(condition),
				..context
			}));
			return_expressions.extend(get_expressions_from_scope(TreeLocationContext {
				scope: &statements,
				expression: None,
				..context
			}));

			for elif in elif_statements.iter() {
				return_expressions.extend(get_expressions_from_expression(TreeLocationContext {
					expression: Some(&elif.condition),
					..context
				}));
				return_expressions.extend(get_expressions_from_scope(TreeLocationContext {
					scope: &elif.statements,
					expression: None,
					..context
				}));
			}

			if let Some(else_statements) = else_statements {
				return_expressions.extend(get_expressions_from_scope(TreeLocationContext {
					scope: else_statements,
					expression: None,
					..context
				}));
			}
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

/// Traverse the given expression context and return all expressions inside it, including itself (recursive).
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

/// Traverse the given statement context and return all statements inside it, including itself (recursive).
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

/// Traverse the given expression context and return all statements inside it (recursive).
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

/// Traverse the given scope context and return all statements inside it (recursive).
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

/// Traverse the given scope context and return all expressions inside it (recursive).
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

/// Traverse the given scope and return all statements inside it (recursive).
/// This should usually be used to start traversal.
pub fn get_statements_from_scope_no_context<'a>(scope: &'a Scope) -> Vec<TreeLocationContext> {
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

/// Traverse the given statement context and all of its symbols (NOT recursive).
pub fn get_symbols_from_statement<'a>(context: TreeLocationContext<'a>) -> Vec<(TreeLocationContext<'a>, &'a Symbol)> {
	let mut return_symbols = vec![];

	let statement = context.statement;

	match &statement.kind {
		Bring {
			module_name,
			identifier,
		} => {
			return_symbols.push((context, module_name));

			if let Some(identifier) = identifier {
				return_symbols.push((context, identifier));
			}
		}
		VariableDef { var_name, type_, .. } => {
			return_symbols.push((context, var_name));

			if let Some(type_) = type_ {
				return_symbols.extend(get_symbols_from_type_annotation(context, type_));
			}
		}
		ForLoop {
			iterator, statements, ..
		} => {
			// This symbol is technically defined in the inner scope
			return_symbols.push((
				TreeLocationContext {
					scope: statements,
					..context
				},
				iterator,
			));
		}
		Assignment { variable, .. } => match variable {
			crate::ast::Reference::Identifier(s) => {
				return_symbols.push((context, s));
			}
			crate::ast::Reference::NestedIdentifier { property, .. } => {
				return_symbols.push((context, property));
			}
		},
		Class(c) => {
			return_symbols.push((context, &c.name));

			let constructor_sig = &c.constructor.signature;
			for param in c.constructor.parameters.iter() {
				return_symbols.push((context, &param.0));
			}
			for param in constructor_sig.parameters.iter() {
				return_symbols.extend(get_symbols_from_type_annotation(context, param));
			}
			if let Some(return_type) = &constructor_sig.return_type {
				return_symbols.extend(get_symbols_from_type_annotation(context, return_type));
			}

			for field in c.fields.iter() {
				return_symbols.push((context, &field.name));
				return_symbols.extend(get_symbols_from_type_annotation(context, &field.member_type));
			}

			for method in c.methods.iter() {
				return_symbols.push((context, &method.0));
				for parameter in method.1.parameters.iter() {
					return_symbols.push((context, &parameter.0));
				}

				let method_sig = &method.1.signature;
				for param in method_sig.parameters.iter() {
					return_symbols.extend(get_symbols_from_type_annotation(context, param));
				}
				if let Some(return_type) = &method_sig.return_type {
					return_symbols.extend(get_symbols_from_type_annotation(context, return_type));
				}
			}
		}
		Struct { name, extends, members } => {
			return_symbols.push((context, name));
			for member in members.iter() {
				return_symbols.push((context, &member.name));
				return_symbols.extend(get_symbols_from_type_annotation(context, &member.member_type));
			}
			for extend in extends.iter() {
				return_symbols.push((context, extend));
			}
		}
		Enum { name, values } => {
			return_symbols.push((context, name));
			for value in values.iter() {
				return_symbols.push((context, value));
			}
		}
		TryCatch { catch_block, .. } => {
			if let Some(catch_block) = catch_block {
				if let Some(exception_var) = &catch_block.exception_var {
					return_symbols.push((context, exception_var));
				}
			}
		}
		While { .. } => {}
		If { .. } => {}
		Return { .. } => {}
		Expression { .. } => {}
		Scope(_) => {}
	};

	return_symbols
}

/// Traverse the given expression context and all of its symbols (NOT recursive).
pub fn get_symbols_from_expression<'a>(context: TreeLocationContext<'a>) -> Vec<(TreeLocationContext<'a>, &'a Symbol)> {
	let mut return_symbols = vec![];

	if let Some(expression) = context.expression {
		match &expression.kind {
			New { arg_list, class, .. } => {
				return_symbols.extend(get_symbols_from_type_annotation(context, class));
				for arg in arg_list.named_args.iter() {
					return_symbols.push((context, arg.0));
				}
			}
			Reference(r) => match r {
				crate::ast::Reference::Identifier(s) => {
					return_symbols.push((context, s));
				}
				crate::ast::Reference::NestedIdentifier { property, .. } => {
					return_symbols.push((context, property));
				}
			},
			Call { args, .. } => {
				for arg in args.named_args.iter() {
					return_symbols.push((context, arg.0));
				}
			}
			StructLiteral { fields, type_, .. } => {
				return_symbols.extend(get_symbols_from_type_annotation(context, type_));

				for field in fields.iter() {
					return_symbols.push((context, &field.0));
				}
			}
			FunctionClosure(f) => {
				// arg symbols are technically defined in the inner scope
				let function_context = TreeLocationContext {
					scope: &f.statements,
					..context
				};

				for parameter in f.parameters.iter() {
					return_symbols.push((function_context, &parameter.0));
				}

				for sig_type in f.signature.parameters.iter() {
					return_symbols.extend(get_symbols_from_type_annotation(context, sig_type));
				}

				if let Some(return_type) = &f.signature.return_type {
					return_symbols.extend(get_symbols_from_type_annotation(context, return_type));
				}
			}
			ArrayLiteral { type_, .. } => {
				if let Some(type_) = type_ {
					return_symbols.extend(get_symbols_from_type_annotation(context, type_));
				}
			}
			MapLiteral { type_, .. } => {
				if let Some(type_) = type_ {
					return_symbols.extend(get_symbols_from_type_annotation(context, type_));
				}
			}
			SetLiteral { type_, .. } => {
				if let Some(type_) = type_ {
					return_symbols.extend(get_symbols_from_type_annotation(context, type_));
				}
			}
			Unary { .. } => {}
			Binary { .. } => {}
			Literal(_) => {}
		};
	}

	return_symbols
}

/// Traverse the given type annotation node and all of its symbols (recursive).
pub fn get_symbols_from_type_annotation<'a>(
	context: TreeLocationContext<'a>,
	type_annotation: &'a TypeAnnotation,
) -> Vec<(TreeLocationContext<'a>, &'a Symbol)> {
	let mut symbols = vec![];
	match type_annotation {
		TypeAnnotation::Number => symbols,
		TypeAnnotation::String => symbols,
		TypeAnnotation::Bool => symbols,
		TypeAnnotation::Duration => symbols,
		TypeAnnotation::Optional(t) => get_symbols_from_type_annotation(context, t),
		TypeAnnotation::Array(t) => get_symbols_from_type_annotation(context, t),
		TypeAnnotation::MutArray(t) => get_symbols_from_type_annotation(context, t),
		TypeAnnotation::Map(t) => get_symbols_from_type_annotation(context, t),
		TypeAnnotation::MutMap(t) => get_symbols_from_type_annotation(context, t),
		TypeAnnotation::Set(t) => get_symbols_from_type_annotation(context, t),
		TypeAnnotation::MutSet(t) => get_symbols_from_type_annotation(context, t),
		TypeAnnotation::FunctionSignature(t) => {
			for parameter in t.parameters.iter() {
				symbols.extend(get_symbols_from_type_annotation(context, parameter));
			}
			if let Some(return_type) = &t.return_type {
				symbols.extend(get_symbols_from_type_annotation(context, return_type));
			}
			symbols
		}
		TypeAnnotation::UserDefined(t) => {
			symbols.push((context, &t.root));
			for property in t.fields.iter() {
				symbols.push((context, property));
			}
			symbols
		}
	}
}
