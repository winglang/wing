// Currently we don't really take advantage of this "capture" phase in the compiler to deal with capturing resource fields.
// So this phase currently only handles capturing of inflight closures which will probably be removed
// too (see https://github.com/winglang/wing/issues/1448).
// We need to rethink the "capture" phase - maybe it's just code analysis for binding annotations
// (see https://github.com/winglang/wing/issues/1449, https://github.com/winglang/wing/issues/76)?
// Ideally we should make sure the "jsify" phase is dumb and just deal with, well, jsifying, and move anything smart to
// this capture phase.

use crate::{
	ast::{
		ArgList, Class, Expr, ExprKind, FunctionBody, FunctionDefinition, Initializer, InterpolatedStringPart, Literal,
		Phase, Reference, Scope, StmtKind, Symbol,
	},
	diagnostic::{Diagnostic, DiagnosticLevel, Diagnostics},
	type_check::{
		symbol_env::{LookupResult, SymbolEnv},
		ClassLike, Type,
	},
	visit::Visit,
};
use std::collections::{BTreeMap, BTreeSet};

/// This is a definition of how a resource or piece of data is captured. The most basic way to capture a resource
/// is to use a subset of its client's members. In that case we need to specify the name of the members
/// used in the capture. In the case of immutable data, an empty list of operations can be specified.
/// Currently these are the only kinds of capture information supported.
/// In the future we might want add more verbose capture definitions like regexes on method parameters etc.
#[derive(Debug, PartialEq, Eq, Hash, Ord, PartialOrd)]
pub struct CaptureOperation {
	/// A field or method name
	pub member: String,
}

#[derive(Debug, PartialEq, Eq, Hash, Ord, PartialOrd)]
pub struct Capture {
	/// The symbol of the resource or data being captured
	pub symbol: Symbol,
	/// The operations performed on the resource or data, if any
	pub ops: Vec<CaptureOperation>,
}

pub type Captures = BTreeSet<Capture>;

fn collect_captures(capture_list: Vec<Capture>) -> Captures {
	// Aggregate captures to the same symbol, and de-duplicate operations
	let mut capture_map: BTreeMap<Symbol, BTreeSet<CaptureOperation>> = BTreeMap::new();
	for capture in capture_list {
		capture_map
			.entry(capture.symbol)
			.or_insert(BTreeSet::new())
			.extend(capture.ops);
	}
	// Convert to a set of captures
	capture_map
		.into_iter()
		.map(|(object, ops)| Capture {
			symbol: object,
			ops: ops.into_iter().collect(),
		})
		.collect()
}

pub struct CaptureVisitor {
	pub diagnostics: Diagnostics,
}

impl CaptureVisitor {
	pub fn new() -> Self {
		Self {
			diagnostics: Diagnostics::new(),
		}
	}
}

impl Visit<'_> for CaptureVisitor {
	// TODO: currently there's no special treatment for resources, see file's top comment

	fn visit_constructor(&mut self, constructor: &Initializer) {
		match constructor.signature.phase {
			Phase::Inflight => {
				// TODO: the result of this is not used, see file's top comment
				scan_captures_in_inflight_scope(&constructor.statements, &mut self.diagnostics);
			}
			Phase::Independent => self.visit_scope(&constructor.statements),
			Phase::Preflight => self.visit_scope(&constructor.statements),
		}
	}

	fn visit_function_definition(&mut self, func_def: &FunctionDefinition) {
		let FunctionBody::Statements(func_scope) = &func_def.body else    {
			return;
		};

		match func_def.signature.phase {
			Phase::Inflight => {
				let mut func_captures = func_def.captures.borrow_mut();
				assert!(func_captures.is_none());
				assert!(func_scope.env.borrow().is_some()); // make sure env is defined
				*func_captures = Some(collect_captures(scan_captures_in_inflight_scope(
					func_scope,
					&mut self.diagnostics,
				)));
			}
			Phase::Independent => self.visit_scope(&func_scope),
			Phase::Preflight => self.visit_scope(&func_scope),
		}
	}
}

fn scan_captures_in_call(
	callee: &Expr,
	args: &ArgList,
	env: &SymbolEnv,
	statement_idx: usize,
	diagnostics: &mut Diagnostics,
) -> Vec<Capture> {
	let mut res = vec![];
	if !matches!(callee.kind, ExprKind::Reference(Reference::Identifier(_))) {
		res.extend(scan_captures_in_expression(callee, env, statement_idx, diagnostics));
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
		ExprKind::Range { start, end, .. } => {
			res.extend(scan_captures_in_expression(start, env, statement_idx, diagnostics));
			res.extend(scan_captures_in_expression(end, env, statement_idx, diagnostics));
		}
		ExprKind::Reference(r) => match r {
			Reference::Identifier(symbol) => {
				// Lookup the symbol
				let x = env.lookup_ext(&symbol.name, Some(statement_idx));

				// we ignore errors here because if the lookup symbol
				// wasn't found, a error diagnostic is already emitted
				// the type checker.

				if let LookupResult::Found(var, si) = x {
					if var.as_variable().is_none() {
						diagnostics.push(Diagnostic {
							level: DiagnosticLevel::Error,
							message: "Expected identifier to be a variable".to_string(),
							span: Some(symbol.span.clone()),
						});
					} else {
						let t = var.as_variable().unwrap().type_;

						// if the identifier represents a preflight value, then capture it
						if si.phase == Phase::Preflight {
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
										.methods(true)
										.filter(|(_, sig)| matches!(sig.as_function_sig().unwrap().phase, Phase::Inflight))
										.map(|(name, _)| Capture {
											symbol: symbol.clone(),
											ops: vec![CaptureOperation { member: name }],
										})
										.collect::<Vec<Capture>>(),
								);
								// If there are any capturable fields in the resource then we'll create a capture definition for the resource as well
								if resource.fields(true).any(|(_, t)| t.is_capturable()) {
									res.push(Capture {
										symbol: symbol.clone(),
										ops: vec![],
									});
								}
							} else if t.is_capturable() {
								// capture as an immutable data type (primitive/collection)
								res.push(Capture {
									symbol: symbol.clone(),
									ops: vec![],
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
			Reference::InstanceMember { object, property } => {
				res.extend(scan_captures_in_expression(object, env, statement_idx, diagnostics));

				// If the expression evaluates to a resource we should check what method of the resource we're accessing
				if let Type::Resource(ref resource) = **object.evaluated_type.borrow().as_ref().unwrap() {
					let (_, _flight) = if let LookupResult::Found(prop_type, li) = resource.env.lookup_ext(&property.name, None) {
						(
							prop_type
								.as_variable()
								.expect("Expected resource property to be a variable")
								.type_,
							li.phase,
						)
					} else {
						// type errors are already reported in previous diagnostics
						return res;
					};
				}
			}
			Reference::TypeMember { .. } => {
				// TODO: handle access to static preflight memebers from inflight (https://github.com/winglang/wing/issues/1669)
			}
		},
		ExprKind::Call { function, arg_list } => res.extend(scan_captures_in_call(
			&function,
			&arg_list,
			env,
			statement_idx,
			diagnostics,
		)),
		ExprKind::Unary { op: _, exp } => res.extend(scan_captures_in_expression(exp, env, statement_idx, diagnostics)),
		ExprKind::Binary { op: _, left, right } => {
			res.extend(scan_captures_in_expression(left, env, statement_idx, diagnostics));
			res.extend(scan_captures_in_expression(right, env, statement_idx, diagnostics));
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
		ExprKind::JsonLiteral { element, .. } => {
			res.extend(scan_captures_in_expression(&element, env, statement_idx, diagnostics));
		}
		ExprKind::StructLiteral { fields, .. } => {
			for exp in fields.values() {
				res.extend(scan_captures_in_expression(&exp, env, statement_idx, diagnostics));
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
			assert!(func_def.signature.phase != Phase::Preflight);
			if let Phase::Inflight = func_def.signature.phase {
				let FunctionBody::Statements(func_scope) = &func_def.body else {
					return res;
				};

				let mut func_captures = func_def.captures.borrow_mut();
				assert!(func_captures.is_none());
				*func_captures = Some(collect_captures(scan_captures_in_inflight_scope(
					func_scope,
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
	assert!(matches!(env.phase, Phase::Inflight));

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
				elif_statements,
				else_statements,
			} => {
				res.extend(scan_captures_in_expression(condition, env, s.idx, diagnostics));
				res.extend(scan_captures_in_inflight_scope(statements, diagnostics));

				for elif_block in elif_statements {
					res.extend(scan_captures_in_expression(
						&elif_block.condition,
						env,
						s.idx,
						diagnostics,
					));
					res.extend(scan_captures_in_inflight_scope(&elif_block.statements, diagnostics));
				}
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
			StmtKind::Class(Class {
				methods, initializer, ..
			}) => {
				res.extend(scan_captures_in_inflight_scope(&initializer.statements, diagnostics));
				for (_, m) in methods.iter() {
					let FunctionBody::Statements(func_scope) = &m.body else {
						continue;
					};
					res.extend(scan_captures_in_inflight_scope(func_scope, diagnostics))
				}
			}
			StmtKind::Bring {
				module_name: _,
				identifier: _,
			} => {
				todo!()
			}
			// Type definitions with no expressions in them can't capture anything
			StmtKind::Struct { .. }
			| StmtKind::Interface { .. }
			| StmtKind::Enum { .. }
			| StmtKind::Break
			| StmtKind::Continue => {}
			StmtKind::TryCatch {
				try_statements,
				catch_block,
				finally_statements,
			} => {
				res.extend(scan_captures_in_inflight_scope(try_statements, diagnostics));
				if let Some(catch_block) = catch_block {
					res.extend(scan_captures_in_inflight_scope(&catch_block.statements, diagnostics));
				}
				if let Some(finally_statements) = finally_statements {
					res.extend(scan_captures_in_inflight_scope(finally_statements, diagnostics));
				}
			}
		}
	}
	res
}
