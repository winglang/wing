use std::fmt::Display;

use crate::ast::*;
use crate::type_env::TypeEnv;

#[derive(PartialEq, Clone, Copy, Debug)]
pub enum Type {
	Number,
	String,
	Duration,
	Boolean,
}

impl Display for Type {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		match self {
			Type::Number => write!(f, "number"),
			Type::String => write!(f, "string"),
			Type::Duration => write!(f, "duration"),
			Type::Boolean => write!(f, "bool"),
		}
	}
}

pub fn get_type_by_name(name: &str) -> Type {
	match name {
		"number" => Type::Number,
		"string" => Type::String,
		"bool" => Type::Boolean,
		"duration" => Type::Duration,
		_other => todo!(), // Type lookup in env...
	}
}

pub fn type_check_exp(exp: &Expression, env: &TypeEnv) -> Type {
	match exp {
		Expression::Literal(lit) => match lit {
			Literal::String(_) => Type::String,
			Literal::Number(_) => Type::Number,
			Literal::Duration(_) => Type::Duration,
			Literal::Boolean(_) => Type::Boolean,
		},
		Expression::Binary { op, lexp, rexp } => {
			let ltype = type_check_exp(lexp, env);
			let rtype = type_check_exp(rexp, env);
			validate_type(ltype, rtype, rexp);
			if op.boolean_args() {
				validate_type(ltype, Type::Boolean, rexp);
			} else if op.numerical_args() {
				validate_type(ltype, Type::Number, rexp);
			}

			if op.boolean_result() {
				Type::Boolean
			} else {
				validate_type(ltype, Type::Number, rexp)
			}
		}
		Expression::Unary { op: _, exp: unary_exp } => {
			let _type = type_check_exp(&unary_exp, env);
			validate_type(_type, Type::Number, &unary_exp)
		}
		Expression::Reference(_ref) => env.lookup(&_ref.identifier),
		_ => panic!("Unknonwn type for expression: {:?}", exp),
	}
}

fn validate_type(actual_type: Type, expected_type: Type, value: &Expression) -> Type {
	if actual_type != expected_type {
		panic!("Expected type {} of {:?} to be {}", actual_type, value, expected_type);
	}
	actual_type
}

pub fn type_check_scope(scope: &Scope, env: &mut TypeEnv) {
	for statement in scope.statements.iter() {
		type_check_statement(statement, env);
	}
}

fn type_check_statement(statement: &Statement, env: &mut TypeEnv) {
	match statement {
		Statement::VariableDef {
			var_name,
			initial_value,
		} => {
			let exp_type = type_check_exp(initial_value, env);
			env.define(var_name, exp_type);
		}
		Statement::FunctionDefinition {
			name: _,
			parameters: _,
			statements: _,
		} => todo!(),
		Statement::ProcessDefinition {
			name: _,
			parameters: _,
			statements: _,
		} => todo!(),
		Statement::ForLoop {
			iterator: _,
			iterable: _,
			statements: _,
		} => {}
		Statement::If {
			condition,
			statements,
			else_statements,
		} => {
			let cond_type = type_check_exp(condition, env);
			validate_type(cond_type, Type::Boolean, condition);

			let mut scope_env = TypeEnv::new(Some(env));
			type_check_scope(statements, &mut scope_env);

			if let Some(else_scope) = else_statements {
				let mut else_scope_env = TypeEnv::new(Some(env));
				type_check_scope(else_scope, &mut else_scope_env);
			}
		}
		Statement::Expression(e) => {
			type_check_exp(e, env);
		}
		Statement::Assignment { variable, value } => {
			let exp_type = type_check_exp(value, env);
			validate_type(exp_type, env.lookup(variable.identifier.as_str()), value);
		}
		Statement::Use {
			module_name: _,
			identifier: _,
		} => todo!(),
		Statement::Scope(scope) => {
			let mut scope_env = TypeEnv::new(Some(env));
			for statement in scope.statements.iter() {
				type_check_statement(statement, &mut scope_env);
			}
		}
	}
}
