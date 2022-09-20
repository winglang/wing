use crate::{
	ast::{ArgList, Expr, ExprType, Flight, Reference, Scope, Statement, Symbol},
	type_check::Type,
	type_env::TypeEnv,
};

pub struct Capture {
	pub object: Symbol,
	pub methods: Vec<String>,
}

pub fn scan_captures(ast_root: &Scope) {
	for s in ast_root.statements.iter() {
		match s {
			Statement::FunctionDefinition(func_def) => {
				if let Flight::In = func_def.signature.flight {
					let found_captures = scan_captures_in_scope(&func_def.statements);
					let mut func_captures = func_def.captures.borrow_mut();
					assert!(func_captures.is_none());
					*func_captures = Some(found_captures);
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
						// TODO: what do I do with these?
						scan_captures_in_scope(&constructor.statements);
					}
					Flight::Pre => scan_captures(&constructor.statements),
				}
				for m in methods.iter() {
					match m.signature.flight {
						Flight::In => {
							// TODO: what do I do with these?
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

fn scan_captures_in_call(reference: &Reference, args: &ArgList, env: &TypeEnv) -> Vec<Capture> {
	let mut res = vec![];
	if let Reference::NestedIdentifier { object, property } = reference {
		// TODO: hack to check if this is reference to an imported cloud object (since we don't have typing for that yet)
		if let ExprType::Reference(Reference::Identifier(symbol)) = &object.variant {
			let (t, f) = env.lookup_ext(symbol);
			if t.is_anything() && matches!(f, Flight::Pre) {
				// for now we assume all "anythings" are imported cloud resources, remove this once we have `bring` support and typing
				res.push(Capture {
					object: symbol.clone(),
					methods: vec![property.name.clone()],
				});
			}
		}

		res.extend(scan_captures_in_expression(&object, env));

		// If the expression evaluates to a resource we should check what method of the resource we're accessing
		if let &Type::ResourceObject(resource) = object.evaluated_type.borrow().unwrap().into() {
			let resource = resource.as_resource().unwrap();
			let (prop_type, _flight) = resource.env.lookup_ext(property);
			let func = prop_type.as_function_sig().unwrap();
			if matches!(func.flight, Flight::Pre) {
				panic!("Can't access preflight method {} inflight", property);
			}
			println!(
				"We seem to be accessing the preflight method {}.{} {} inflight!",
				resource.name.name, property.name, property.span
			);
		}
	}

	// TODO: named args
	for arg in args.pos_args.iter() {
		res.extend(scan_captures_in_expression(&arg, env));
	}
	res
}

fn scan_captures_in_expression(exp: &Expr, env: &TypeEnv) -> Vec<Capture> {
	let mut res = vec![];
	match &exp.variant {
		ExprType::New {
			class: _,
			obj_id: _,
			obj_scope: _,
			arg_list,
		} => {
			// TODO: named args
			for e in arg_list.pos_args.iter() {
				res.extend(scan_captures_in_expression(e, env));
			}
		}
		ExprType::Reference(r) => match r {
			Reference::Identifier(symbol) => {
				// Lookup the symbol
				let (t, f) = env.lookup_ext(&symbol);
				if let (Some(resource), Flight::Pre) = (t.as_resource_object(), f) {
					res.push(Capture {
						object: symbol.clone(),
						// TODO: for now we add all resource client methods to the capture, in the future this should be done based on:
						//   1. explicit capture definitions
						//   2. analyzing inflight code and figuring out what methods are being used on the object
						methods: resource
							.methods()
							.filter(|(_, sig)| matches!(sig.as_function_sig().unwrap().flight, Flight::In))
							.map(|(name, _)| name)
							.collect(),
					});
				}
			}
			Reference::NestedIdentifier { object, property: _ } => {
				res.extend(scan_captures_in_expression(object, env));

				// If the expression evaluates to a resource we should check if we need to capture the property as well
				// TODO: do we really need this? I think we capture `object` above recursively and therefore don't need special handling of `property`.
				// if let &Type::ResourceObject(resource) = object.evaluated_type.borrow().unwrap().into() {
				// 	let resource = resource.as_resource().unwrap();
				// 	let (prop_type, flight) = resource.env.lookup_ext(property);
				// 	if prop_type.as_resource_object().is_some() && matches!(flight, Flight::Pre) {
				// 		println!(
				// 			"We seem to be accessing the preflight resource {} {} inflight!",
				// 			r, property.span
				// 		);
				// 		res.push(r);
				// 	}
				// }
			}
		},
		ExprType::FunctionCall { function, args } => res.extend(scan_captures_in_call(&function, &args, env)),
		ExprType::MethodCall(mc) => res.extend(scan_captures_in_call(&mc.method, &mc.args, env)),
		ExprType::Unary { op: _, exp } => res.extend(scan_captures_in_expression(exp, env)),
		ExprType::Binary { op: _, lexp, rexp } => {
			scan_captures_in_expression(lexp, env);
			scan_captures_in_expression(rexp, env);
		}
		ExprType::Literal(_) => {}
	}
	res
}

fn scan_captures_in_scope(scope: &Scope) -> Vec<Capture> {
	let mut res = vec![];
	let env = scope.env.as_ref().unwrap();

	// Make sure we're looking for captures only in inflight code
	assert!(matches!(env.flight, Flight::In));

	for s in scope.statements.iter() {
		match s {
			Statement::VariableDef {
				var_name: _,
				initial_value,
				type_: _,
			} => res.extend(scan_captures_in_expression(initial_value, env)),
			Statement::FunctionDefinition(func_def) => res.extend(scan_captures_in_scope(&func_def.statements)),
			Statement::ForLoop {
				iterator: _,
				iterable,
				statements,
			} => {
				res.extend(scan_captures_in_expression(iterable, env));
				res.extend(scan_captures_in_scope(statements));
			}
			Statement::If {
				condition,
				statements,
				else_statements,
			} => {
				res.extend(scan_captures_in_expression(condition, env));
				res.extend(scan_captures_in_scope(statements));
				if let Some(else_statements) = else_statements {
					res.extend(scan_captures_in_scope(else_statements));
				}
			}
			Statement::Expression(e) => res.extend(scan_captures_in_expression(e, env)),
			Statement::Assignment { variable: _, value } => res.extend(scan_captures_in_expression(value, env)),
			Statement::Return(e) => {
				if let Some(e) = e {
					res.extend(scan_captures_in_expression(e, env));
				}
			}
			Statement::Scope(s) => res.extend(scan_captures_in_scope(s)),
			Statement::Class {
				name: _,
				members: _,
				methods,
				constructor,
				parent: _,
				is_resource: _,
			} => {
				res.extend(scan_captures_in_scope(&constructor.statements));
				for m in methods.iter() {
					res.extend(scan_captures_in_scope(&m.statements))
				}
			}
			Statement::Use {
				module_name: _,
				identifier: _,
			} => {
				todo!()
			}
		}
	}
	res
}
