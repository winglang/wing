use crate::{
	ast::{ArgList, Expr, ExprKind, InterpolatedStringPart, Literal, Phase, Reference, Scope, StmtKind, Symbol},
	debug,
	diagnostic::{Diagnostic, DiagnosticLevel, Diagnostics},
	type_check::symbol_env::SymbolEnv,
	type_check::Type,
};
use std::collections::{BTreeMap, BTreeSet};

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
	pub kind: CaptureKind,
}

#[derive(Debug, PartialEq, Eq, Hash, Ord, PartialOrd)]
pub enum CaptureKind {
	Resource(CaptureDef),
	ImmutableData,
}

pub type Captures = BTreeMap<String, BTreeSet<CaptureKind>>;

fn collect_captures(capture_list: Vec<Capture>) -> Captures {
	let mut captures: Captures = BTreeMap::new();
	for capture in capture_list {
		captures
			.entry(capture.object.name)
			.or_insert(BTreeSet::new())
			.insert(capture.kind);
	}
	captures
}

pub fn scan_for_inflights_in_scope(scope: &Scope, diagnostics: &mut Diagnostics) {
	for s in scope.statements.iter() {
		match &s.kind {
			StmtKind::ForLoop {
				iterator: _,
				iterable: _,
				statements,
			} => scan_for_inflights_in_scope(&statements, diagnostics),
			StmtKind::If {
				condition: _,
				statements,
				else_statements,
			} => {
				scan_for_inflights_in_scope(statements, diagnostics);
				if let Some(else_statements) = else_statements {
					scan_for_inflights_in_scope(else_statements, diagnostics);
				}
			}
			StmtKind::Scope(s) => scan_for_inflights_in_scope(s, diagnostics),
			StmtKind::Class {
				name: _,
				members: _,
				methods,
				constructor,
				parent: _,
				is_resource,
			} => {
				// If this is a resource then we need to capture all its members
				if *is_resource {
					// TODO: what do I do with these?
				}

				match constructor.signature.flight {
					Phase::Inflight => {
						// TODO: what do I do with these?
						scan_captures_in_inflight_scope(&constructor.statements, diagnostics);
					}
					Phase::Independent => scan_for_inflights_in_scope(&constructor.statements, diagnostics),
					Phase::Preflight => scan_for_inflights_in_scope(&constructor.statements, diagnostics),
				}
				for (_, method_def) in methods.iter() {
					match method_def.signature.flight {
						Phase::Inflight => {
							// TODO: what do I do with these?
							scan_captures_in_inflight_scope(&method_def.statements, diagnostics);
						}
						Phase::Independent => scan_for_inflights_in_scope(&constructor.statements, diagnostics),
						Phase::Preflight => scan_for_inflights_in_scope(&method_def.statements, diagnostics),
					}
				}
			}
			StmtKind::VariableDef { initial_value, .. } => {
				scan_for_inflights_in_expression(initial_value, diagnostics);
			}
			StmtKind::Expression(exp) => {
				scan_for_inflights_in_expression(exp, diagnostics);
			}
			StmtKind::Assignment { variable: _, value } => {
				scan_for_inflights_in_expression(value, diagnostics);
			}
			StmtKind::Return(Some(exp)) => {
				scan_for_inflights_in_expression(exp, diagnostics);
			}
			_ => (),
		}
	}
}

pub fn scan_for_inflights_in_expression(expr: &Expr, diagnostics: &mut Diagnostics) {
	match &expr.kind {
		ExprKind::New {
			class: _,
			obj_id: _,
			obj_scope,
			arg_list,
		} => {
			if let Some(obj_scope) = obj_scope {
				scan_for_inflights_in_expression(obj_scope, diagnostics);
			}
			scan_for_inflights_in_arglist(arg_list, diagnostics);
		}
		ExprKind::Literal(Literal::InterpolatedString(istr)) => {
			for part in istr.parts.iter() {
				if let InterpolatedStringPart::Expr(e) = part {
					scan_for_inflights_in_expression(e, diagnostics);
				}
			}
		}
		ExprKind::Reference(Reference::NestedIdentifier { object, property: _ }) => {
			scan_for_inflights_in_expression(object, diagnostics);
		}
		ExprKind::Call { function, args } => {
			if let Reference::NestedIdentifier { object, property: _ } = function {
				scan_for_inflights_in_expression(object, diagnostics);
			}
			scan_for_inflights_in_arglist(args, diagnostics);
		}
		ExprKind::Unary { op: _, exp } => {
			scan_for_inflights_in_expression(exp, diagnostics);
		}
		ExprKind::Binary { op: _, lexp, rexp } => {
			scan_for_inflights_in_expression(lexp, diagnostics);
			scan_for_inflights_in_expression(rexp, diagnostics);
		}
		ExprKind::StructLiteral { type_: _, fields } => {
			for (_, value) in fields.iter() {
				scan_for_inflights_in_expression(value, diagnostics);
			}
		}
		ExprKind::MapLiteral { type_: _, fields } => {
			for (_, value) in fields.iter() {
				scan_for_inflights_in_expression(value, diagnostics);
			}
		}
		ExprKind::FunctionClosure(func_def) => {
			if let Phase::Inflight = func_def.signature.flight {
				let mut func_captures = func_def.captures.borrow_mut();
				assert!(func_captures.is_none());
				assert!(func_def.statements.env.borrow().is_some()); // make sure env is defined
				*func_captures = Some(collect_captures(scan_captures_in_inflight_scope(
					&func_def.statements,
					diagnostics,
				)));
				println!("Collected captures: {:?}", func_captures);
			}
		}
		_ => (),
	}
}

fn scan_for_inflights_in_arglist(args: &ArgList, diagnostics: &mut Diagnostics) {
	for arg in args.pos_args.iter() {
		scan_for_inflights_in_expression(arg, diagnostics);
	}
	for (_, arg_expr) in args.named_args.iter() {
		scan_for_inflights_in_expression(arg_expr, diagnostics);
	}
}

fn scan_captures_in_call(
	reference: &Reference,
	args: &ArgList,
	env: &SymbolEnv,
	statement_idx: usize,
	diagnostics: &mut Diagnostics,
) -> Vec<Capture> {
	let mut res = vec![];
	if let Reference::NestedIdentifier { object, property } = reference {
		res.extend(scan_captures_in_expression(&object, env, statement_idx, diagnostics));

		// If the expression evaluates to a resource we should check what method of the resource we're accessing
		if let Type::Resource(ref resource) = **object.evaluated_type.borrow().as_ref().unwrap() {
			let (prop_type, _flight) = match resource.env.lookup_ext(property, None) {
				Ok((prop_type, phase)) => (
					prop_type
						.as_variable()
						.expect("Expected resource property to be a variable")
						._type,
					phase,
				),
				Err(type_error) => {
					panic!("{}", type_error);
				}
			};

			let func = prop_type.as_function_sig().unwrap();
			if matches!(func.flight, Phase::Preflight) {
				panic!("Can't access preflight method {} inflight", property);
			}
			debug!(
				"We seem to be accessing the preflight method {}.{} {} inflight!",
				resource.name.name, property.name, property.span
			);
		}
	}

	for arg in args.pos_args.iter() {
		res.extend(scan_captures_in_expression(&arg, env, statement_idx, diagnostics));
	}
	for arg in args.named_args.values() {
		res.extend(scan_captures_in_expression(arg, env, statement_idx, diagnostics));
	}
	res
}

fn scan_captures_in_expression(
	exp: &Expr,
	env: &SymbolEnv,
	statement_idx: usize,
	diagnostics: &mut Diagnostics,
) -> Vec<Capture> {
	let mut res = vec![];
	match &exp.kind {
		ExprKind::New {
			class: _,
			obj_id: _,
			obj_scope: _,
			arg_list,
		} => {
			for e in arg_list.pos_args.iter() {
				res.extend(scan_captures_in_expression(e, env, statement_idx, diagnostics));
			}
			for e in arg_list.named_args.values() {
				res.extend(scan_captures_in_expression(e, env, statement_idx, diagnostics));
			}
		}
		ExprKind::Reference(r) => match r {
			Reference::Identifier(symbol) => {
				// Lookup the symbol
				let x = env.lookup_ext(&symbol, Some(statement_idx));

				// we ignore errors here because if the lookup symbol
				// wasn't found, a error diagnostic is already emitted
				// the type checker.

				if x.is_ok() {
					let (var, si) = x.unwrap();

					if var.as_variable().is_none() {
						diagnostics.push(Diagnostic {
							level: DiagnosticLevel::Error,
							message: "Expected identifier to be a variable".to_string(),
							span: Some(symbol.span.clone()),
						});
					} else {
						let t = var.as_variable().unwrap()._type;

						// if the identifier represents a preflight value, then capture it
						if si.flight == Phase::Preflight {
							if var.is_reassignable() {
								diagnostics.push(Diagnostic {
									level: DiagnosticLevel::Error,
									message: format!("Cannot capture a reassignable variable \"{}\"", symbol.name),
									span: Some(symbol.span.clone()),
								});
								return res;
							}

							// capture as a resource
							if let Some(resource) = t.as_resource() {
								// TODO: for now we add all resource client methods to the capture, in the future this should be done based on:
								//   1. explicit capture definitions
								//   2. analyzing inflight code and figuring out what methods are being used on the object
								res.extend(
									resource
										.methods()
										.filter(|(_, sig)| matches!(sig.as_function_sig().unwrap().flight, Phase::Inflight))
										.map(|(name, _)| Capture {
											object: symbol.clone(),
											kind: CaptureKind::Resource(CaptureDef { method: name.clone() }),
										})
										.collect::<Vec<Capture>>(),
								);
							} else if t.is_immutable_collection() || t.is_primitive() {
								// capture as an immutable data type (primitive/collection)
								res.push(Capture {
									object: symbol.clone(),
									kind: CaptureKind::ImmutableData,
								});
							} else {
								// unsupported capture
								diagnostics.push(Diagnostic {
									level: DiagnosticLevel::Error,
									message: format!(
										"Cannot reference '{}' of type '{}' from an inflight context",
										symbol.name, t
									),
									span: Some(symbol.span.clone()),
								});
							}
						}
					}
				}
			}
			Reference::NestedIdentifier { object, property: _ } => {
				res.extend(scan_captures_in_expression(object, env, statement_idx, diagnostics));

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
		ExprKind::Call { function, args } => {
			res.extend(scan_captures_in_call(&function, &args, env, statement_idx, diagnostics))
		}
		ExprKind::Unary { op: _, exp } => res.extend(scan_captures_in_expression(exp, env, statement_idx, diagnostics)),
		ExprKind::Binary { op: _, lexp, rexp } => {
			res.extend(scan_captures_in_expression(lexp, env, statement_idx, diagnostics));
			res.extend(scan_captures_in_expression(rexp, env, statement_idx, diagnostics));
		}
		ExprKind::Literal(lit) => match lit {
			Literal::String(_) => {}
			Literal::InterpolatedString(interpolated_str) => {
				res.extend(
					interpolated_str
						.parts
						.iter()
						.filter_map(|part| match part {
							InterpolatedStringPart::Expr(expr) => {
								Some(scan_captures_in_expression(expr, env, statement_idx, diagnostics))
							}
							InterpolatedStringPart::Static(_) => None,
						})
						.flatten()
						.collect::<Vec<_>>(),
				);
			}
			Literal::Number(_) => {}
			Literal::Duration(_) => {}
			Literal::Boolean(_) => {}
		},
		ExprKind::ArrayLiteral { items, .. } => {
			for v in items {
				res.extend(scan_captures_in_expression(&v, env, statement_idx, diagnostics));
			}
		}
		ExprKind::StructLiteral { fields, .. } => {
			for v in fields.values() {
				res.extend(scan_captures_in_expression(&v, env, statement_idx, diagnostics));
			}
		}
		ExprKind::MapLiteral { fields, .. } => {
			for v in fields.values() {
				res.extend(scan_captures_in_expression(&v, env, statement_idx, diagnostics));
			}
		}
		ExprKind::SetLiteral { items, .. } => {
			for v in items {
				res.extend(scan_captures_in_expression(&v, env, statement_idx, diagnostics));
			}
		}
		ExprKind::FunctionClosure(func_def) => {
			// Can't define preflight stuff in inflight context
			assert!(func_def.signature.flight != Phase::Preflight);
			if let Phase::Inflight = func_def.signature.flight {
				let mut func_captures = func_def.captures.borrow_mut();
				assert!(func_captures.is_none());
				*func_captures = Some(collect_captures(scan_captures_in_inflight_scope(
					&func_def.statements,
					diagnostics,
				)));
			}
		}
	}
	res
}

fn scan_captures_in_inflight_scope(scope: &Scope, diagnostics: &mut Diagnostics) -> Vec<Capture> {
	let mut res = vec![];
	let env_ref = scope.env.borrow();
	let env = env_ref.as_ref().unwrap();

	// Make sure we're looking for captures only in inflight code
	assert!(matches!(env.flight, Phase::Inflight));

	for s in scope.statements.iter() {
		match &s.kind {
			StmtKind::VariableDef { initial_value, .. } => {
				res.extend(scan_captures_in_expression(initial_value, env, s.idx, diagnostics))
			}
			StmtKind::ForLoop {
				iterator: _,
				iterable,
				statements,
			} => {
				res.extend(scan_captures_in_expression(iterable, env, s.idx, diagnostics));
				res.extend(scan_captures_in_inflight_scope(statements, diagnostics));
			}
			StmtKind::While { condition, statements } => {
				res.extend(scan_captures_in_expression(condition, env, s.idx, diagnostics));
				res.extend(scan_captures_in_inflight_scope(statements, diagnostics));
			}
			StmtKind::If {
				condition,
				statements,
				else_statements,
			} => {
				res.extend(scan_captures_in_expression(condition, env, s.idx, diagnostics));
				res.extend(scan_captures_in_inflight_scope(statements, diagnostics));
				if let Some(else_statements) = else_statements {
					res.extend(scan_captures_in_inflight_scope(else_statements, diagnostics));
				}
			}
			StmtKind::Expression(e) => res.extend(scan_captures_in_expression(e, env, s.idx, diagnostics)),
			StmtKind::Assignment { variable: _, value } => {
				res.extend(scan_captures_in_expression(value, env, s.idx, diagnostics))
			}
			StmtKind::Return(e) => {
				if let Some(e) = e {
					res.extend(scan_captures_in_expression(e, env, s.idx, diagnostics));
				}
			}
			StmtKind::Scope(s) => res.extend(scan_captures_in_inflight_scope(s, diagnostics)),
			StmtKind::Class {
				name: _,
				members: _,
				methods,
				constructor,
				parent: _,
				is_resource: _,
			} => {
				res.extend(scan_captures_in_inflight_scope(&constructor.statements, diagnostics));
				for (_, m) in methods.iter() {
					res.extend(scan_captures_in_inflight_scope(&m.statements, diagnostics))
				}
			}
			StmtKind::Use {
				module_name: _,
				identifier: _,
			} => {
				todo!()
			}
			// Type definitions with no expressions in them can't capture anything
			StmtKind::Struct { .. } | StmtKind::Enum { .. } => {}
		}
	}
	res
}
