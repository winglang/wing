use std::fmt::{format, Display};

use crate::ast::*;
use crate::type_env::TypeEnv;

#[derive(PartialEq, Clone, Debug)]
pub enum Type {
	Number,
	String,
	Duration,
	Boolean,
	Function(Box<FunctionSignature>),
}

#[derive(PartialEq, Clone, Debug)]
struct FunctionSignature {
	args: Vec<Type>,
	return_val: Option<Type>,
}

impl Display for Type {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		match self {
			Type::Number => write!(f, "number"),
			Type::String => write!(f, "string"),
			Type::Duration => write!(f, "duration"),
			Type::Boolean => write!(f, "bool"),
			Type::Function(func_sig) => {
				if let Some(ret_val) = &func_sig.return_val {
					write!(
						f,
						"fn({}) -> {}",
						func_sig
							.args
							.iter()
							.map(|a| format!("{}", a))
							.collect::<Vec<String>>()
							.join(", "),
						format!("{}", ret_val)
					)
				} else {
					write!(
						f,
						"fn({})",
						func_sig
							.args
							.iter()
							.map(|a| format!("{}", a))
							.collect::<Vec<String>>()
							.join(",")
					)
				}
			}
		}
	}
}

pub fn get_type_by_name(name: &str) -> Type {
	match name {
		"number" => Type::Number,
		"string" => Type::String,
		"bool" => Type::Boolean,
		"duration" => Type::Duration,
		_other => todo!(), // Type lookup in env... / function types...
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
			validate_type(&ltype, &rtype, rexp);
			if op.boolean_args() {
				validate_type(&ltype, &Type::Boolean, rexp);
			} else if op.numerical_args() {
				validate_type(&ltype, &Type::Number, rexp);
			}

			if op.boolean_result() {
				Type::Boolean
			} else {
				validate_type(&ltype, &Type::Number, rexp);
				ltype
			}
		}
		Expression::Unary { op: _, exp: unary_exp } => {
			let _type = type_check_exp(&unary_exp, env);
			// Add bool vs num support here (! => bool, +- => num)
			validate_type(&_type, &Type::Number, &unary_exp);
			_type
		}
		Expression::Reference(_ref) => env.lookup(&_ref.identifier).clone(),
		_ => panic!("Unknonwn type for expression: {:?}", exp),
	}
}

fn validate_type(actual_type: &Type, expected_type: &Type, value: &Expression) {
	if actual_type != expected_type {
		panic!("Expected type {} of {:?} to be {}", actual_type, value, expected_type);
	}
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
			name,
			parameters,
			statements,
			return_type,
		} => {
			// TODO: make sure this function returns on all control paths when there's a return type (can be done by recursively traversing the statements and making sure there's a "return" statements in all control paths)
			let func_sig = Box::new(FunctionSignature {
				args: parameters
					.iter()
					.map(|param_def| param_def.parameter_type.clone())
					.collect(),
				return_val: return_type.clone(),
			});
			let function_type = Type::Function(func_sig);
			env.define(name, function_type);

			let mut function_env = TypeEnv::new(Some(env), return_type.clone());
			for param in parameters.iter() {
				function_env.define(&param.name, param.parameter_type.clone());
			}
			type_check_scope(statements, &mut function_env);
		}
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
			validate_type(&cond_type, &Type::Boolean, condition);

			let mut scope_env = TypeEnv::new(Some(env), env.return_type.clone());
			type_check_scope(statements, &mut scope_env);

			if let Some(else_scope) = else_statements {
				let mut else_scope_env = TypeEnv::new(Some(env), env.return_type.clone());
				type_check_scope(else_scope, &mut else_scope_env);
			}
		}
		Statement::Expression(e) => {
			type_check_exp(e, env);
		}
		Statement::Assignment { variable, value } => {
			let exp_type = type_check_exp(value, env);
			validate_type(&exp_type, env.lookup(variable.identifier.as_str()), value);
		}
		Statement::Use {
			module_name: _,
			identifier: _,
		} => todo!(),
		Statement::Scope(scope) => {
			let mut scope_env = TypeEnv::new(Some(env), env.return_type.clone());
			for statement in scope.statements.iter() {
				type_check_statement(statement, &mut scope_env);
			}
		}
		Statement::Return(exp) => {
			let return_type = type_check_exp(exp, env);
			if let Some(expected_return_type) = &env.return_type {
				validate_type(&return_type, expected_return_type, exp);
			} else {
				panic!("retun statement outside of function");
			}
		}
	}
}
