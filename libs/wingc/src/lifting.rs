use crate::{
	ast::{Class, Expr, ExprKind, FunctionBody, FunctionDefinition, Phase, Reference, UserDefinedType},
	diagnostic::{report_diagnostic, Diagnostic, WingSpan},
	files::Files,
	fold::{self, Fold},
	jsify::{JSifier, JSifyContext},
	type_check::{lifts::Lifts, resolve_user_defined_type, symbol_env::LookupResult},
	visit::{self, Visit},
	visit_context::VisitContext,
};

pub struct LiftTransform<'a> {
	ctx: VisitContext,
	jsify: &'a JSifier<'a>,
	lifts_stack: Vec<Lifts>,
}

impl<'a> LiftTransform<'a> {
	pub fn new(jsifier: &'a JSifier<'a>) -> Self {
		Self {
			jsify: jsifier,
			ctx: VisitContext::new(),
			lifts_stack: vec![],
		}
	}

	fn is_self_type_reference(&self, node: &Expr) -> bool {
		let Some(current_class_udt) = self.ctx.current_class() else {
			return false;
		};

		let Some(udt) = node.as_type_reference() else {
			return false;
		};

		udt.full_path_str() == current_class_udt.full_path_str()
	}

	fn should_capture_reference(&self, fullname: &str, span: &WingSpan) -> bool {
		if self.is_capture_shadow(fullname, span) {
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

	fn is_capture_shadow(&self, fullname: &str, span: &WingSpan) -> bool {
		// if the symbol is defined later in the current environment, it means we can't capture a
		// reference to a symbol with the same name from a parent so bail out.
		// notice that here we are looking in the current environment and not in the method's environment
		if let Some(env) = self.ctx.current_env() {
			let lookup = env.lookup_nested_str(&fullname, Some(self.ctx.current_stmt_idx()));

			if let LookupResult::DefinedLater = lookup {
				report_diagnostic(Diagnostic {
					span: Some(span.clone()),
					message: format!(
						"Cannot capture symbol \"{fullname}\" because it is shadowed by another symbol with the same name"
					),
				});
				return true;
			}
		}

		return false;
	}

	fn should_capture_expr(&self, node: &Expr) -> bool {
		let ExprKind::Reference(ref r) = node.kind else {
		return false;
	};

		match r {
			Reference::Identifier(ref symb) => {
				let fullname = symb.name.clone();
				let span = symb.span.clone();
				self.should_capture_reference(&fullname, &span)
			}
			Reference::TypeReference(ref t) => {
				let fullname = t.full_path_str();
				let span = t.span.clone();

				// skip "This" (which is the type of "this")
				if let Some(class) = &self.ctx.current_class() {
					if class.full_path_str() == fullname {
						return false;
					}
				}

				self.should_capture_reference(&fullname, &span)
			}
			_ => false,
		}
	}

	fn jsify_expr(&self, node: &Expr, phase: Phase) -> String {
		self.jsify.jsify_expression(
			&node,
			&mut JSifyContext {
				in_json: false,
				phase: phase,
				files: &mut Files::default(),
				lifts: &mut Lifts::disabled(),
			},
		)
	}
}

impl<'a> Fold for LiftTransform<'a> {
	fn fold_reference(&mut self, node: Reference) -> Reference {
		match node {
			Reference::InstanceMember {
				object,
				property,
				optional_accessor,
			} => {
				self.ctx.push_property(property.name.clone());
				let result = Reference::InstanceMember {
					object: Box::new(self.fold_expr(*object)),
					property: self.fold_symbol(property),
					optional_accessor,
				};
				self.ctx.pop_property();
				return result;
			}
			Reference::TypeMember { typeobject, property } => {
				self.ctx.push_property(property.name.clone());
				let result = Reference::TypeMember {
					typeobject: Box::new(self.fold_expr(*typeobject)),
					property: self.fold_symbol(property),
				};
				self.ctx.pop_property();
				return result;
			}
			_ => {}
		}

		fold::fold_reference(self, node)
	}

	fn fold_expr(&mut self, node: Expr) -> Expr {
		let expr_phase = self.jsify.types.get_expr_phase(&node).unwrap();
		let expr_type = self.jsify.types.get_expr_type(&node).unwrap();
		let is_field = includes_this(&node);

		// this whole thing only applies to inflight expressions
		if self.ctx.current_phase() == Phase::Preflight {
			return fold::fold_expr(self, node);
		}

		// if this expression represents the current class, no need to capture it (it is by definition
		// available in the current scope)
		if self.is_self_type_reference(&node) {
			return fold::fold_expr(self, node);
		}

		//---------------
		// LIFT

		if expr_phase == Phase::Preflight {
			// jsify the expression so we can get the preflight code
			let code = self.jsify_expr(&node, Phase::Preflight);

			// check that we can qualify the lift (e.g. determine which property is being accessed)
			if self.ctx.current_property().is_none()
				&& expr_type.as_preflight_class().is_some()
				&& !expr_type.is_handler_preflight_class()
			{
				report_diagnostic(Diagnostic {
					message: format!(
						"Cannot qualify access to a lifted object of type \"{}\"",
						expr_type.to_string()
					),
					span: Some(node.span.clone()),
				});

				return node;
			}

			// println!("Lifting: {}", preflight);
			let mut lifts = self.lifts_stack.pop().unwrap();
			lifts.lift(
				node.id,
				self.ctx.current_method(),
				self.ctx.current_property(),
				is_field,
				&code,
			);
			self.lifts_stack.push(lifts);

			return node;
		}

		//---------------
		// CAPTURE

		if !is_field && self.should_capture_expr(&node) {
			// jsify the expression so we can get the preflight code
			let preflight = self.jsify_expr(&node, Phase::Inflight);

			// println!("Capturing: {}", preflight);
			let mut lifts = self.lifts_stack.pop().unwrap();
			lifts.capture(&node.id, &preflight);
			self.lifts_stack.push(lifts);

			return node;
		}

		fold::fold_expr(self, node)
	}

	// State Tracking

	fn fold_function_definition(&mut self, node: FunctionDefinition) -> FunctionDefinition {
		match node.body {
			FunctionBody::External(s) => {
				return FunctionDefinition {
					name: node.name.clone().map(|f| f.clone()),
					body: FunctionBody::External(s),
					signature: self.fold_function_signature(node.signature.clone()),
					is_static: node.is_static,
					span: node.span.clone(),
				};
			}

			FunctionBody::Statements(scope) => {
				self.ctx.push_function_definition(
					&node.name,
					&node.signature.phase,
					scope.env.borrow().as_ref().unwrap().get_ref(),
				);

				let result = FunctionDefinition {
					name: node.name.clone().map(|f| f.clone()),
					body: FunctionBody::Statements(self.fold_scope(scope)),
					signature: self.fold_function_signature(node.signature.clone()),
					is_static: node.is_static,
					span: node.span.clone(),
				};

				self.ctx.pop_function_definition();

				result
			}
		}
	}

	fn fold_class(&mut self, node: Class) -> Class {
		// extract the "env" from the class initializer and push it to the context
		// because this is the environment in which we want to resolve references
		// as oppose to the environment of the class definition itself.
		let init_env = if let FunctionBody::Statements(ref s) = node.initializer.body {
			Some(s.env.borrow().as_ref().unwrap().get_ref())
		} else {
			None
		};

		if self.ctx.current_phase() == Phase::Inflight {
			if let Some(parent) = &node.parent {
				let mut lifts = self.lifts_stack.pop().unwrap();
				lifts.capture(&parent.id, &self.jsify_expr(&parent, Phase::Inflight));
				self.lifts_stack.push(lifts);
			}
		}

		let udt = UserDefinedType {
			root: node.name.clone(),
			fields: vec![],
			span: node.name.span.clone(),
		};

		self.ctx.push_class(udt.clone(), &node.phase, init_env);

		self.lifts_stack.push(Lifts::new());

		if let Some(parent) = &node.parent {
			let mut lifts = self.lifts_stack.pop().unwrap();
			lifts.capture(&parent.id, &self.jsify_expr(&parent, Phase::Inflight));
			self.lifts_stack.push(lifts);
		}

		let result = fold::fold_class(self, node);

		self.ctx.pop_class();

		let lifts = self.lifts_stack.pop().expect("Unable to pop class tokens");

		if let Some(env) = &self.ctx.current_env() {
			if let Some(mut t) = resolve_user_defined_type(&udt, env, 0).ok() {
				let mut_class = t.as_class_mut().unwrap();
				mut_class.set_lifts(lifts);
			}
		}

		result
	}

	fn fold_scope(&mut self, node: crate::ast::Scope) -> crate::ast::Scope {
		self.ctx.push_env(node.env.borrow().as_ref().unwrap().get_ref());
		let result = fold::fold_scope(self, node);
		self.ctx.pop_env();
		result
	}

	fn fold_stmt(&mut self, node: crate::ast::Stmt) -> crate::ast::Stmt {
		self.ctx.push_stmt(node.idx);
		let result = fold::fold_stmt(self, node);
		self.ctx.pop_stmt();
		result
	}
}

/// Checks if a given expression
fn includes_this(node: &Expr) -> bool {
	struct V {
		found: bool,
	}

	impl<'a> Visit<'a> for V {
		fn visit_reference(&mut self, node: &'a Reference) {
			if let Reference::Identifier(i) = node {
				if i.name == "this" {
					self.found = true;
				}
			}

			visit::visit_reference(self, node);
		}
	}

	let mut v = V { found: false };
	v.visit_expr(node);
	v.found
}
