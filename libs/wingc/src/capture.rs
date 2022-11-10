use std::collections::{BTreeMap, BTreeSet};

use crate::{
	ast::{ArgList, Expr, ExprKind, Flight, Reference, Scope, StmtKind, Symbol},
	debug,
	type_check::type_env::TypeEnv,
	type_check::Type,
};

/* This is a definition of how a resource is captured. The most basic way to capture a resource
is to use a subset of its client's methods. In that case we need to specify the name of the method
used in the capture. Currently this is the only capture definition supported.
In the future we might want add more verbose capture definitions like regexes on method parameters etc. */
#[derive(Debug, PartialEq, Eq, Hash, Ord, PartialOrd)]
pub struct CaptureDef {
	pub method: String,
}

struct Capture {
	pub object: Symbol,
	pub def: CaptureDef,
}

pub type Captures = BTreeMap<Symbol, BTreeSet<CaptureDef>>;

fn collect_captures(capture_list: Vec<Capture>) -> Captures {
	let mut captures: Captures = BTreeMap::new();
	for capture in capture_list {
		captures
			.entry(capture.object)
			.or_insert(BTreeSet::new())
			.insert(capture.def);
	}
	captures
}

pub fn scan_captures(ast_root: &Scope) {
	for s in ast_root.statements.iter() {
		match &s.kind {
			StmtKind::FunctionDefinition(func_def) => {
				if let Flight::In = func_def.signature.flight {
					let mut func_captures = func_def.captures.borrow_mut();
					assert!(func_captures.is_none());
					*func_captures = Some(collect_captures(scan_captures_in_scope(&func_def.statements)));
				}
			}
			StmtKind::ForLoop {
				iterator: _,
				iterable: _,
				statements,
			} => scan_captures(&statements),
			StmtKind::If {
				condition: _,
				statements,
				else_statements,
			} => {
				scan_captures(statements);
				if let Some(else_statements) = else_statements {
					scan_captures(else_statements);
				}
			}
			StmtKind::Scope(s) => scan_captures(s),
			StmtKind::Class {
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
		res.extend(scan_captures_in_expression(&object, env));

		// If the expression evaluates to a resource we should check what method of the resource we're accessing
		if let &Type::ResourceObject(resource) = object.evaluated_type.borrow().unwrap().into() {
			let resource = resource.as_resource().unwrap();
			let (prop_type, _flight) = match resource.env.lookup_ext(property) {
				Ok(_type) => _type,
				Err(type_error) => {
					panic!("Type error: {}", type_error);
				}
			};

			let func = prop_type.as_function_sig().unwrap();
			if matches!(func.flight, Flight::Pre) {
				panic!("Can't access preflight method {} inflight", property);
			}
			debug!(
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
	match &exp.kind {
		ExprKind::New {
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
		ExprKind::Reference(r) => match r {
			Reference::Identifier(symbol) => {
				// Lookup the symbol
				let (t, f) = match env.lookup_ext(&symbol) {
					Ok(_type) => _type,
					Err(type_error) => {
						panic!("Type error: {}", type_error);
					}
				};

				if let (Some(resource), Flight::Pre) = (t.as_resource_object(), f) {
					// TODO: for now we add all resource client methods to the capture, in the future this should be done based on:
					//   1. explicit capture definitions
					//   2. analyzing inflight code and figuring out what methods are being used on the object
					res.extend(
						resource
							.methods()
							.filter(|(_, sig)| matches!(sig.as_function_sig().unwrap().flight, Flight::In))
							.map(|(name, _)| Capture {
								object: symbol.clone(),
								def: CaptureDef { method: name.clone() },
							})
							.collect::<Vec<Capture>>(),
					);
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
				// 		debug!(
				// 			"We seem to be accessing the preflight resource {} {} inflight!",
				// 			r, property.span
				// 		);
				// 		res.push(r);
				// 	}
				// }
			}
		},
		ExprKind::Call { function, args } => res.extend(scan_captures_in_call(&function, &args, env)),
		ExprKind::Unary { op: _, exp } => res.extend(scan_captures_in_expression(exp, env)),
		ExprKind::Binary { op: _, lexp, rexp } => {
			scan_captures_in_expression(lexp, env);
			scan_captures_in_expression(rexp, env);
		}
		ExprKind::Literal(_) => {}
		ExprKind::StructLiteral { fields, .. } => {
			for v in fields.values() {
				res.extend(scan_captures_in_expression(&v, env));
			}
		}
		ExprKind::MapLiteral { fields, .. } => {
			for v in fields.values() {
				res.extend(scan_captures_in_expression(&v, env));
			}
		}
	}
	res
}

fn scan_captures_in_scope(scope: &Scope) -> Vec<Capture> {
	let mut res = vec![];
	let env = scope.env.as_ref().unwrap();

	// Make sure we're looking for captures only in inflight code
	assert!(matches!(env.flight, Flight::In));

	for s in scope.statements.iter() {
		match &s.kind {
			StmtKind::VariableDef {
				var_name: _,
				initial_value,
				type_: _,
			} => res.extend(scan_captures_in_expression(initial_value, env)),
			StmtKind::FunctionDefinition(func_def) => res.extend(scan_captures_in_scope(&func_def.statements)),
			StmtKind::ForLoop {
				iterator: _,
				iterable,
				statements,
			} => {
				res.extend(scan_captures_in_expression(iterable, env));
				res.extend(scan_captures_in_scope(statements));
			}
			StmtKind::If {
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
			StmtKind::Expression(e) => res.extend(scan_captures_in_expression(e, env)),
			StmtKind::Assignment { variable: _, value } => res.extend(scan_captures_in_expression(value, env)),
			StmtKind::Return(e) => {
				if let Some(e) = e {
					res.extend(scan_captures_in_expression(e, env));
				}
			}
			StmtKind::Scope(s) => res.extend(scan_captures_in_scope(s)),
			StmtKind::Class {
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
			StmtKind::Use {
				module_name: _,
				identifier: _,
			} => {
				todo!()
			}
			StmtKind::Struct {
				name: _,
				extends: _,
				members: _,
			} => {}
		}
	}
	res
}
