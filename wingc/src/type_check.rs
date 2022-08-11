use std::fmt::Display;

use crate::ast::*;
use crate::type_env::TypeEnv;

#[derive(PartialEq, Clone, Debug)]
pub enum Type {
	Anything,
	Nothing,
	Number,
	String,
	Duration,
	Boolean,
	Function(Box<FunctionSignature>),
}

#[derive(PartialEq, Clone, Debug)]
pub struct FunctionSignature {
	pub args: Vec<Type>,
	pub return_type: Option<Type>,
}

#[deprecated = "Remember to implement this!"]
pub fn unimplemented_type() -> Option<Type> {
	println!("Skipping unimplemented type check");
	return Some(Type::Anything);
}

impl Display for Type {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		match self {
			Type::Anything => write!(f, "anything"),
			Type::Nothing => write!(f, "nothing"),
			Type::Number => write!(f, "number"),
			Type::String => write!(f, "string"),
			Type::Duration => write!(f, "duration"),
			Type::Boolean => write!(f, "bool"),
			Type::Function(func_sig) => {
				if let Some(ret_val) = &func_sig.return_type {
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

pub fn get_primitive_type_by_name(name: &str) -> Type {
	match name {
		"number" => Type::Number,
		"string" => Type::String,
		"bool" => Type::Boolean,
		"duration" => Type::Duration,
		other => panic!("Type {} is not a primitive type", other),
	}
}

pub fn type_check_exp(exp: &Expression, env: &TypeEnv) -> Option<Type> {
	match exp {
		Expression::Literal(lit) => match lit {
			Literal::String(_) => Some(Type::String),
			Literal::Number(_) => Some(Type::Number),
			Literal::Duration(_) => Some(Type::Duration),
			Literal::Boolean(_) => Some(Type::Boolean),
		},
		Expression::Binary { op, lexp, rexp } => {
			let ltype = type_check_exp(lexp, env).unwrap();
			let rtype = type_check_exp(rexp, env).unwrap();
			validate_type(&ltype, &rtype, rexp);
			if op.boolean_args() {
				validate_type(&ltype, &Type::Boolean, rexp);
			} else if op.numerical_args() {
				validate_type(&ltype, &Type::Number, rexp);
			}

			if op.boolean_result() {
				Some(Type::Boolean)
			} else {
				validate_type(&ltype, &Type::Number, rexp);
				Some(ltype)
			}
		}
		Expression::Unary { op: _, exp: unary_exp } => {
			let _type = type_check_exp(&unary_exp, env).unwrap();
			// Add bool vs num support here (! => bool, +- => num)
			validate_type(&_type, &Type::Number, &unary_exp);
			Some(_type)
		}
		Expression::Reference(_ref) => Some(env.lookup(&_ref).clone()),
		Expression::New {
			class: _,
			obj_id: _,
			arg_list: _,
		} => unimplemented_type(),
		Expression::FunctionCall { function, args } => {
			let func_type = env.lookup(&function);

			if let Type::Function(func_type) = func_type {
				// TODO: named args
				// Argument arity check
				if args.pos_args.len() != func_type.args.len() {
					panic!(
						"Expected {} arguments for function {:#?}, but got {} instead.",
						func_type.args.len(),
						function,
						args.pos_args.len()
					)
				}
				// Argument type check
				for (passed_arg, expected_arg) in args.pos_args.iter().zip(func_type.args.iter()) {
					let passed_arg_type = type_check_exp(passed_arg, env).unwrap();
					validate_type(&passed_arg_type, &expected_arg, passed_arg);
				}
				func_type.return_type.clone()
			} else {
				panic!("Identifier {:#?} is not a function", function)
			}
		}
		Expression::MethodCall(_) => unimplemented_type(),
		Expression::CapturedObjMethodCall(_) => unimplemented_type(),
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
			let exp_type = type_check_exp(initial_value, env).unwrap();
			env.define(&var_name, exp_type);
		}
		Statement::FunctionDefinition(func_def) => {
			// TODO: make sure this function returns on all control paths when there's a return type (can be done by recursively traversing the statements and making sure there's a "return" statements in all control paths)
			let func_sig = Box::new(FunctionSignature {
				args: func_def
					.parameters
					.iter()
					.map(|param_def| param_def.parameter_type.clone())
					.collect(),
				return_type: func_def.return_type.clone(),
			});
			let function_type = Type::Function(func_sig);
			env.define(&func_def.name, function_type);

			let mut function_env = TypeEnv::new(Some(env), func_def.return_type.clone());
			for param in func_def.parameters.iter() {
				function_env.define(&param.name, param.parameter_type.clone());
			}
			type_check_scope(&func_def.statements, &mut function_env);
		}
		Statement::InflightFunctionDefinition {
			name: _,
			parameters: _,
			statements: _,
		} => {
			unimplemented_type();
		}
		Statement::ForLoop {
			iterator,
			iterable,
			statements,
		} => {
			// TODO: Expression must be iterable
			let exp_type = type_check_exp(iterable, env).unwrap();

			let mut scope_env = TypeEnv::new(Some(env), env.return_type.clone());
			scope_env.define(&iterator, exp_type);

			type_check_scope(statements, &mut scope_env);
		}
		Statement::If {
			condition,
			statements,
			else_statements,
		} => {
			let cond_type = type_check_exp(condition, env).unwrap();
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
			let exp_type = type_check_exp(value, env).unwrap();
			validate_type(&exp_type, env.lookup(&variable), value);
		}
		Statement::Use {
			module_name: _,
			identifier: _,
		} => {
			unimplemented_type();
		}
		Statement::Scope(scope) => {
			let mut scope_env = TypeEnv::new(Some(env), env.return_type.clone());
			for statement in scope.statements.iter() {
				type_check_statement(statement, &mut scope_env);
			}
		}
		Statement::Return(exp) => {
			if let Some(return_expression) = exp {
				let return_type = type_check_exp(return_expression, env).unwrap();
				if let Some(expected_return_type) = &env.return_type {
					validate_type(&return_type, expected_return_type, return_expression);
				} else {
					panic!("Return statement outside of function cannot return a value.");
				}
			} else {
				if let Some(expected_return_type) = &env.return_type {
					panic!("Expected return statement to return type {}", expected_return_type);
				}
			}
		}
		Statement::Class {
			name: _,
			members: _,
			methods: _,
		} => {
			unimplemented_type();
		}
	}
}
