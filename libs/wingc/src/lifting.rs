use crate::{
	ast::{
		Class, Expr, ExprKind, FunctionBody, FunctionDefinition, Phase, Reference, Scope, Stmt, Symbol, UserDefinedType,
	},
	comp_ctx::{CompilationContext, CompilationPhase},
	diagnostic::{report_diagnostic, Diagnostic, WingSpan},
	jsify::{JSifier, JSifyContext},
	type_check::{
		lifts::{Liftable, Lifts},
		resolve_user_defined_type,
		symbol_env::LookupResult,
		ClassLike, TypeRef, CLOSURE_CLASS_HANDLE_METHOD,
	},
	visit::{self, Visit},
	visit_context::VisitContext,
};

pub struct LiftVisitor<'a> {
	ctx: VisitContext,
	jsify: &'a JSifier<'a>,
	lifts_stack: Vec<Lifts>,
}

impl<'a> LiftVisitor<'a> {
	pub fn new(jsifier: &'a JSifier<'a>) -> Self {
		Self {
			jsify: jsifier,
			ctx: VisitContext::new(),
			lifts_stack: vec![],
		}
	}

	fn is_self_type_reference(&self, udt: &UserDefinedType) -> bool {
		let Some(current_class_udt) = self.ctx.current_class() else {
			return false;
		};

		udt.full_path_str() == current_class_udt.full_path_str()
	}

	fn is_defined_in_current_env(&self, fullname: &str, span: &WingSpan) -> bool {
		// if the symbol is defined later in the current environment, it means we can't capture a
		// reference to a symbol with the same name from a parent so bail out.
		// notice that here we are looking in the current environment and not in the method's environment
		if let Some(env) = self.ctx.current_env() {
			let lookup = env.lookup_nested_str(&fullname, Some(self.ctx.current_stmt_idx()));

			match lookup {
				LookupResult::Found(_, e) => {
					// if we found the symbol in the current environment, it means we don't need to capture it at all
					if e.env.is_same(env) {
						return true;
					}
				}
				LookupResult::DefinedLater => {
					report_diagnostic(Diagnostic {
						span: Some(span.clone()),
						message: format!(
							"Cannot capture symbol \"{fullname}\" because it is shadowed by another symbol with the same name"
						),
					});
					return true;
				}
				LookupResult::NotFound(_) | LookupResult::ExpectedNamespace(_) => {}
			}
		}

		return false;
	}

	// TODO: merge with should_capture_expr
	fn should_capture_type(&self, node: &UserDefinedType) -> bool {
		// let (fullname, span) = match r {
		// 	Reference::Identifier(ref symb) => (symb.name.clone(), symb.span.clone()),
		// 	//Reference::TypeReference(ref t) => (t.full_path_str(), t.span.clone()),
		// 	_ => return false,
		// };

		let fullname = node.full_path_str();

		// skip "This" (which is the type of "this")
		if self.is_self_type_reference(node) {
			return false;
		}

		// if the symbol is defined in the *current* environment (which could also be a nested scope
		// inside the current method), we don't need to capture it
		if self.is_defined_in_current_env(&fullname, &node.span) {
			return false;
		}

		let Some(method_env) = self.ctx.current_method_env() else {
			return false;
		};

		let lookup = method_env.lookup_nested_str(&fullname, Some(self.ctx.current_stmt_idx()));

		// any other lookup failure is likely a an invalid reference so we can skip it
		let LookupResult::Found(vi, symbol_info) = lookup else {
			return false;
		};

		// now, we need to determine if the environment this symbol is defined in is a parent of the
		// method's environment. if it is, we need to capture it.
		if symbol_info.env.is_same(&method_env) || symbol_info.env.is_child_of(&method_env) {
			return false;
		}

		// the symbol is defined in a parent environment, but it's still an inflight environment
		// which means we don't need to capture.
		if symbol_info.phase == Phase::Inflight && symbol_info.env.phase == Phase::Inflight {
			return false;
		}

		// skip macros
		if let Some(x) = vi.as_variable() {
			if let Some(f) = x.type_.as_function_sig() {
				if f.js_override.is_some() {
					return false;
				}
			}
		}

		return true;
	}

	fn should_capture_expr(&self, node: &Expr) -> bool {
		let ExprKind::Reference(ref r) = node.kind else {
			return false;
		};

		let (fullname, span) = match r {
			Reference::Identifier(ref symb) => (symb.name.clone(), symb.span.clone()),
			//Reference::TypeReference(ref t) => (t.full_path_str(), t.span.clone()),
			_ => return false,
		};

		// skip "This" (which is the type of "this")
		if let Some(class) = &self.ctx.current_class() {
			if class.full_path_str() == fullname {
				return false;
			}
		}

		// if the symbol is defined in the *current* environment (which could also be a nested scope
		// inside the current method), we don't need to capture it
		if self.is_defined_in_current_env(&fullname, &span) {
			return false;
		}

		let Some(method_env) = self.ctx.current_method_env() else {
			return false;
		};

		let lookup = method_env.lookup_nested_str(&fullname, Some(self.ctx.current_stmt_idx()));

		// any other lookup failure is likely a an invalid reference so we can skip it
		let LookupResult::Found(vi, symbol_info) = lookup else {
			return false;
		};

		// now, we need to determine if the environment this symbol is defined in is a parent of the
		// method's environment. if it is, we need to capture it.
		if symbol_info.env.is_same(&method_env) || symbol_info.env.is_child_of(&method_env) {
			return false;
		}

		// the symbol is defined in a parent environment, but it's still an inflight environment
		// which means we don't need to capture.
		if symbol_info.phase == Phase::Inflight && symbol_info.env.phase == Phase::Inflight {
			return false;
		}

		// skip macros
		if let Some(x) = vi.as_variable() {
			if let Some(f) = x.type_.as_function_sig() {
				if f.js_override.is_some() {
					return false;
				}
			}
		}

		return true;
	}

	fn jsify_expr(&mut self, node: &Expr, phase: Phase) -> String {
		self.ctx.push_phase(phase);
		let res = self.jsify.jsify_expression(
			&node,
			&mut JSifyContext {
				lifts: None,
				visit_ctx: &mut self.ctx,
			},
		);
		self.ctx.pop_phase();
		res
	}

	fn jsify_udt(&mut self, node: &UserDefinedType) -> String {
		let res = self.jsify.jsify_user_defined_type(
			&node,
			&mut JSifyContext {
				lifts: None,
				visit_ctx: &mut self.ctx,
			},
		);
		res
	}
}

impl<'a> Visit<'a> for LiftVisitor<'a> {
	fn visit_reference(&mut self, node: &'a Reference) {
		match node {
			Reference::InstanceMember { property, .. } => {
				self.ctx.push_property(property.name.clone());
				visit::visit_reference(self, &node);
				self.ctx.pop_property();
			}
			Reference::TypeMember { property, .. } => {
				self.ctx.push_property(property.name.clone());
				visit::visit_reference(self, &node);
				self.ctx.pop_property();
			}
			_ => visit::visit_reference(self, &node),
		}
	}

	fn visit_expr(&mut self, node: &'a Expr) {
		CompilationContext::set(CompilationPhase::Lifting, &node.span);

		let expr_phase = self.jsify.types.get_expr_phase(&node).unwrap();
		let expr_type = self.jsify.types.get_expr_type(&node);

		// this whole thing only applies to inflight code
		if self.ctx.current_phase() == Phase::Preflight {
			visit::visit_expr(self, node);
			return;
		}

		// if this expression represents the current class, no need to capture it (it is by definition
		// available in the current scope)
		// if self.is_self_type_reference(&node) {
		// 	visit::visit_expr(self, node);
		// 	return;
		// }

		//---------------
		// LIFT
		if expr_phase == Phase::Preflight {
			// jsify the expression so we can get the preflight code
			let code = self.jsify_expr(&node, Phase::Preflight);

			let property = if let Some(property) = self.ctx.current_property() {
				Some(property)
			} else if expr_type.is_closure() {
				// this is the case where we are lifting a "closure class" (e.g. a class that has a "handle"
				// method) the reason we might not have "property" set is because closure classes might be
				// syntheticaly generated by the compiler from closures.
				Some(CLOSURE_CLASS_HANDLE_METHOD.to_string())
			} else {
				None
			};

			// check that we can qualify the lift (e.g. determine which property is being accessed)
			if property.is_none() && expr_type.as_preflight_class().is_some() {
				report_diagnostic(Diagnostic {
					message: format!(
						"Cannot qualify access to a lifted object of type \"{}\" (see https://github.com/winglang/wing/issues/76 for more details)",
						expr_type.to_string()
					),
					span: Some(node.span.clone()),
				});

				return;
			}

			// if this is an inflight property (of "this") no need to lift it
			if is_inflight_field(&node, expr_type, &property) {
				return;
			}

			let mut lifts = self.lifts_stack.pop().unwrap();
			lifts.lift(&Liftable::Expr(node.id), self.ctx.current_method(), property, &code);
			self.lifts_stack.push(lifts);

			return;
		}

		//---------------
		// CAPTURE

		if self.should_capture_expr(&node) {
			// jsify the expression so we can get the preflight code
			let code = self.jsify_expr(&node, Phase::Inflight);

			let mut lifts = self.lifts_stack.pop().unwrap();
			lifts.capture(&Liftable::Expr(node.id), &code);
			self.lifts_stack.push(lifts);

			return;
		}

		visit::visit_expr(self, node);
	}

	// TODO: implement visit_user_defined_type and capture the type if it needs to be captured (see `should_capture_expr` and TypeReference logic)
	fn visit_user_defined_type(&mut self, node: &'a UserDefinedType) {
		// this whole thing only applies to inflight code
		if self.ctx.current_phase() == Phase::Preflight {
			visit::visit_user_defined_type(self, node);
			return;
		}

		// if type represents the current class, no need to capture it (it is by definition
		// available in the current scope)
		if self.is_self_type_reference(node) {
			visit::visit_user_defined_type(self, node);
			return;
		}

		// Get the type of the udt
		let udt_type = resolve_user_defined_type(
			node,
			self.ctx.current_env().expect("an env"),
			self.ctx.current_stmt_idx(),
		)
		.unwrap_or(self.jsify.types.error());

		//---------------
		// LIFT
		if udt_type.is_preflight_class() {
			// jsify the expression so we can get the preflight code
			let code = self.jsify_udt(&node);

			let property = if let Some(property) = self.ctx.current_property() {
				Some(property)
			} else if udt_type.is_closure() {
				// this is the case where we are lifting a "closure class" (e.g. a class that has a "handle"
				// method) the reason we might not have "property" set is because closure classes might be
				// syntheticaly generated by the compiler from closures.
				Some(CLOSURE_CLASS_HANDLE_METHOD.to_string())
			} else {
				None
			};

			// check that we can qualify the lift (e.g. determine which property is being accessed)
			if property.is_none() && udt_type.as_preflight_class().is_some() {
				report_diagnostic(Diagnostic {
					message: format!(
						"Cannot qualify access to a lifted type \"{udt_type}\" (see https://github.com/winglang/wing/issues/76 for more details)"),
					span: Some(node.span.clone()),
				});

				return;
			}

			// The following is not relevant because if we're in "This" we don't need to lift for the current class
			// if this is an inflight property, no need to lift it
			// if let Some(property) = &property {
			// 	if is_inflight_field(udt_type, property) {
			// 		return;
			// 	}
			// }

			let mut lifts = self.lifts_stack.pop().unwrap();
			lifts.lift(
				&Liftable::Type(node.clone()),
				self.ctx.current_method(),
				property,
				&code,
			);
			self.lifts_stack.push(lifts);

			return;
		}

		//---------------
		// CAPTURE

		if self.should_capture_type(&node) {
			// jsify the type so we can get the preflight code
			let code = self.jsify_udt(&node);

			let mut lifts = self.lifts_stack.pop().unwrap();
			lifts.capture(&Liftable::Type(node.clone()), &code);
			self.lifts_stack.push(lifts);

			return;
		}

		visit::visit_user_defined_type(self, node);
	}

	// State Tracking

	fn visit_function_definition(&mut self, node: &'a FunctionDefinition) {
		match &node.body {
			FunctionBody::Statements(scope) => {
				self.ctx.push_function_definition(
					&node.name,
					&node.signature.phase,
					self.jsify.types.get_scope_env(&scope),
				);

				visit::visit_function_definition(self, node);
				self.ctx.pop_function_definition();
			}
			FunctionBody::External(_) => visit::visit_function_definition(self, node),
		}
	}

	fn visit_class(&mut self, node: &'a Class) {
		// nothing to do if we are emitting an inflight class from within an inflight scope
		if self.ctx.current_phase() == Phase::Inflight && node.phase == Phase::Inflight {
			self.visit_symbol(&node.name);
			for field in node.fields.iter() {
				self.visit_symbol(&field.name);
				self.visit_type_annotation(&field.member_type);
			}
			for (name, def) in node.methods.iter() {
				self.visit_symbol(&name);
				visit::visit_function_definition(self, &def);
			}
			visit::visit_function_definition(self, &node.initializer);
			if let Some(parent) = &node.parent {
				self.visit_user_defined_type(&parent);
			}
			for interface in node.implements.iter() {
				self.visit_user_defined_type(&interface);
			}
			visit::visit_function_definition(self, &node.inflight_initializer);
			return;
		}

		// extract the "env" from the class initializer and push it to the context
		// because this is the environment in which we want to resolve references
		// as oppose to the environment of the class definition itself.
		let init_env = if let FunctionBody::Statements(ref s) = node.initializer.body {
			Some(self.jsify.types.get_scope_env(&s))
		} else {
			None
		};

		let udt = UserDefinedType {
			root: node.name.clone(),
			fields: vec![],
			span: node.name.span.clone(),
		};

		self.ctx.push_class(udt.clone(), &node.phase, init_env);

		self.lifts_stack.push(Lifts::new());

		if let Some(parent) = &node.parent {
			let mut lifts = self.lifts_stack.pop().unwrap();
			lifts.capture(&Liftable::Type(parent.clone()), &self.jsify_udt(&parent));
			self.lifts_stack.push(lifts);
		}

		visit::visit_class(self, node);

		self.ctx.pop_class();

		let lifts = self.lifts_stack.pop().expect("Unable to pop class tokens");

		if let Some(env) = self.ctx.current_env() {
			if let Some(mut t) = resolve_user_defined_type(&udt, env, 0).ok() {
				let mut_class = t.as_class_mut().unwrap();
				mut_class.set_lifts(lifts);
			}
		}
	}

	fn visit_scope(&mut self, node: &'a Scope) {
		self.ctx.push_env(self.jsify.types.get_scope_env(&node));
		visit::visit_scope(self, node);
		self.ctx.pop_env();
	}

	fn visit_stmt(&mut self, node: &'a Stmt) {
		CompilationContext::set(CompilationPhase::Lifting, &node.span);

		self.ctx.push_stmt(node.idx);
		visit::visit_stmt(self, node);
		self.ctx.pop_stmt();
	}
}

/// Check if an expression is a reference to an inflight field (`this.<field>`).
/// in this case, we don't need to lift the field because it is already available
fn is_inflight_field(expr: &Expr, expr_type: TypeRef, property: &Option<String>) -> bool {
	if let ExprKind::Reference(Reference::Identifier(symb)) = &expr.kind {
		if symb.name == "this" {
			if let (Some(cls), Some(property)) = (expr_type.as_preflight_class(), property) {
				if let LookupResult::Found(kind, _) = cls.env.lookup_nested_str(&property, None) {
					if let Some(var) = kind.as_variable() {
						// TODO: ?? why is this here
						if !var.type_.is_closure() {
							if var.phase != Phase::Preflight {
								return true;
							}
						}
					}
				}
			}
		}
	}

	return false;
}
// fn is_inflight_field(type_: TypeRef, property: &str) -> bool {
// 	if let Some(cls) = type_.as_class() {
// 		if let Some(vi) = cls.get_field(&Symbol::global(property)) {
// 			// TODO: ?? why is this here
// 			if !vi.type_.is_closure() {
// 				if vi.phase != Phase::Preflight {
// 					return true;
// 				}
// 			}
// 		}
// 	}

// 	return false;
// }
