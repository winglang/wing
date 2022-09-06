use crate::{
	ast::{ArgList, Expr, ExprType, Flight, Reference, Scope, Statement},
	type_check::Type,
	type_env::TypeEnv,
};

pub fn scan_captures(ast_root: &Scope) {
	for s in ast_root.statements.iter() {
		match s {
			Statement::FunctionDefinition(func_def) => {
				if let Flight::In = func_def.signature.flight {
					scan_captures_in_scope(&func_def.statements);
				}
			}
			Statement::ForLoop {
				iterator: _,
				iterable: _,
				statements,
			} => scan_captures(&statements),
			crate::ast::Statement::If {
				condition: _,
				statements,
				else_statements,
			} => {
				scan_captures(statements);
				if let Some(else_statements) = else_statements {
					scan_captures(else_statements);
				}
			}
			Statement::Scope(s) => scan_captures(s),
			Statement::Class {
				name: _,
				members: _,
				methods,
				constructor,
				parent: _,
				is_resource: _,
			} => {
				match constructor.signature.flight {
					Flight::In => {
						scan_captures_in_scope(&constructor.statements);
					}
					Flight::Pre => scan_captures(&constructor.statements),
				}
				for m in methods.iter() {
					match m.signature.flight {
						Flight::In => {
							scan_captures_in_scope(&m.statements);
						}
						Flight::Pre => scan_captures(&m.statements),
					}
				}
			}
			_ => (),
		}
	}
}

fn scan_captures_in_call(reference: &Reference, args: &ArgList, env: &TypeEnv) {
	if let Reference::NestedIdentifier { object, property } = reference {
		scan_captures_in_expression(&object, env);

		// If the expression evaluates to a resource we should check what method of the resource we're accessing
		if let &Type::ResourceObject(res) = object.evaluated_type.borrow().unwrap().into() {
			let res = res.as_resource().unwrap();
			let (prop_type, _flight) = res.env.lookup_ext(property);
			let func = prop_type.as_function_sig().unwrap();
			if matches!(func.flight, Flight::Pre) {
				panic!("Can't access preflight method {} inflight", property);
			}
			println!(
				"We seem to be accessing the preflight method {}.{} {} inflight!",
				res.name.name, property.name, property.span
			);
		}
	}

	// TODO: named args
	for arg in args.pos_args.iter() {
		scan_captures_in_expression(&arg, env);
	}
}

fn scan_captures_in_expression(exp: &Expr, env: &TypeEnv) {
	match &exp.variant {
		ExprType::New {
			class: _,
			obj_id: _,
			obj_scope: _,
			arg_list,
		} => {
			// TODO: named args
			for e in arg_list.pos_args.iter() {
				scan_captures_in_expression(e, env);
			}
		}
		ExprType::Reference(r) => match r {
			Reference::Identifier(symbol) => {
				// Lookup the symbol
				let (t, f) = env.lookup_ext(&symbol);
				if t.as_resource_object().is_some() && matches!(f, Flight::Pre) {
					println!("We seem to be accessing the preflight resource {} inflight!", symbol);
				}
			}
			Reference::NestedIdentifier { object, property } => {
				scan_captures_in_expression(object, env);

				// If the expression evaluates to a resource we should check if we need to capture the property as well
				if let &Type::ResourceObject(res) = object.evaluated_type.borrow().unwrap().into() {
					let res = res.as_resource().unwrap();
					let (prop_type, flight) = res.env.lookup_ext(property);
					if prop_type.as_resource_object().is_some() && matches!(flight, Flight::Pre) {
						println!(
							"We seem to be accessing the preflight resource {} {} inflight!",
							r, property.span
						);
					}
				}
			}
			Reference::NamespacedIdentifier {
				namespace: _,
				identifier: _,
			} => todo!(),
		},
		ExprType::FunctionCall { function, args } => scan_captures_in_call(&function, &args, env),
		ExprType::MethodCall(mc) => scan_captures_in_call(&mc.method, &mc.args, env),
		ExprType::Unary { op: _, exp } => scan_captures_in_expression(exp, env),
		ExprType::Binary { op: _, lexp, rexp } => {
			scan_captures_in_expression(lexp, env);
			scan_captures_in_expression(rexp, env);
		}
		ExprType::Literal(_) => (),
	}
}

fn scan_captures_in_scope(scope: &Scope) {
	let env = scope.env.as_ref().unwrap();
	for s in scope.statements.iter() {
		match s {
			Statement::VariableDef {
				var_name: _,
				initial_value,
			} => scan_captures_in_expression(initial_value, env),
			Statement::FunctionDefinition(func_def) => scan_captures_in_scope(&func_def.statements),
			Statement::ForLoop {
				iterator: _,
				iterable,
				statements,
			} => {
				scan_captures_in_expression(iterable, env);
				scan_captures_in_scope(statements);
			}
			Statement::If {
				condition,
				statements,
				else_statements,
			} => {
				scan_captures_in_expression(condition, env);
				scan_captures_in_scope(statements);
				if let Some(else_statements) = else_statements {
					scan_captures_in_scope(else_statements);
				}
			}
			Statement::Expression(e) => scan_captures_in_expression(e, env),
			Statement::Assignment { variable: _, value } => scan_captures_in_expression(value, env),
			Statement::Return(e) => {
				if let Some(e) = e {
					scan_captures_in_expression(e, env);
				}
			}
			Statement::Scope(s) => scan_captures_in_scope(s),
			Statement::Class {
				name: _,
				members: _,
				methods,
				constructor,
				parent: _,
				is_resource: _,
			} => {
				scan_captures_in_scope(&constructor.statements);
				for m in methods.iter() {
					scan_captures_in_scope(&m.statements)
				}
			}
			Statement::Use {
				module_name: _,
				identifier: _,
			} => (),
		}
	}
}
