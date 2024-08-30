use itertools::Itertools;

use crate::{
	ast::{
		Class, Expr, ExprKind, FunctionBody, FunctionDefinition, Phase, Reference, Scope, Stmt, StmtKind, Symbol,
		UserDefinedType,
	},
	comp_ctx::{CompilationContext, CompilationPhase},
	diagnostic::{report_diagnostic, Diagnostic, DiagnosticSeverity},
	jsify::{JSifier, JSifyContext},
	type_check::{
		get_udt_definition_phase,
		lifts::{Liftable, Lifts},
		resolve_user_defined_type,
		symbol_env::LookupResult,
		ClassLike, ResolveSource, SymbolKind, TypeRef, CLOSURE_CLASS_HANDLE_METHOD,
	},
	visit::{self, Visit},
	visit_context::{PropertyObject, VisitContext, VisitorWithContext},
};

pub struct LiftVisitor<'a> {
	ctx: VisitContext,
	jsify: &'a JSifier<'a>,
	lifts_stack: Vec<Lifts>,
	// Used during visiting to track whether we're inside an explicit `lift` qualification block
	in_disable_lift_qual_err: usize,
	// Used during visiting to track whether we're inside an inner inflight class
	in_inner_inflight_class: usize,
}

impl<'a> LiftVisitor<'a> {
	pub fn new(jsifier: &'a JSifier<'a>) -> Self {
		Self {
			jsify: jsifier,
			ctx: VisitContext::new(),
			lifts_stack: vec![],
			in_inner_inflight_class: 0,
			in_disable_lift_qual_err: 0,
		}
	}

	fn is_self_type_reference(&self, udt: &UserDefinedType) -> bool {
		let Some(current_class_udt) = self.ctx.current_class() else {
			return false;
		};

		udt.full_path_str() == current_class_udt.full_path_str()
	}

	fn verify_defined_in_current_env(&mut self, symbol: &Symbol) {
		// Skip this check if we're in an "unresolved" expression (e.g. type errors) to avoid cascading errors
		if let Some(expr_id) = self.ctx().current_expr() {
			if self.jsify.types.get_expr_id_type(expr_id).is_unresolved() {
				return;
			}
		}

		// If the symbol is defined later in the current environment, it means we can't reference an identicatl symbol
		// from an outter scope (and we can't capture it either). In that case we'll report and error.
		// Note:
		// In theory this can be supported, but it'll fail later on when running the JS code because of how
		// JS creates all symbols *before* running the code of the current scope (https://tc39.es/ecma262/#sec-let-and-const-declarations).
		// Solving this will require renaming the symbols in the current scope to avoid the conflict, so the east way is just to adopt
		// the JS limitation. Will be good to improve on this in the future.
		if let Some(env) = self.ctx.current_env() {
			if matches!(
				env.lookup_ext(symbol, Some(self.ctx.current_stmt_idx())),
				LookupResult::DefinedLater(_)
			) {
				report_diagnostic(Diagnostic {
					span: Some(symbol.span.clone()),
					message: format!("Cannot access \"{symbol}\" because it is shadowed by another symbol with the same name"),
					annotations: vec![],
					hints: vec![],
					severity: DiagnosticSeverity::Error,
				});
			}
		}
	}

	fn should_capture_type(&self, node: &UserDefinedType) -> bool {
		let fullname = node.full_path_str();

		// skip "This" (which is the type of "this")
		if self.is_self_type_reference(node) {
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

	fn jsify_expr(&mut self, node: &Expr) -> String {
		self.ctx.push_phase(Phase::Preflight);
		let res = self.jsify.jsify_expression(
			&node,
			&mut JSifyContext {
				lifts: None,
				visit_ctx: &mut self.ctx,
				source_file: None,
			},
		);
		self.ctx.pop_phase();
		res.to_string()
	}

	fn jsify_udt(&mut self, node: &UserDefinedType) -> String {
		let udt_js = self
			.jsify
			.jsify_user_defined_type(
				&node,
				&mut JSifyContext {
					lifts: None,
					visit_ctx: &mut self.ctx,
					source_file: None,
				},
			)
			.to_string();

		let current_env = self.ctx.current_env().expect("an env");
		let result = current_env.lookup_nested_str(&node.full_path_str(), Some(self.ctx.current_stmt_idx()));
		let type_ = match result {
			LookupResult::Found(SymbolKind::Type(t), _) => Some(*t),
			_ => None,
		};

		// We don't have the FQN for any non-JSII classes (e.g. winglib classes)
		let fqn = if let Some(class) = type_.as_ref().and_then(|t| t.as_class()) {
			class.fqn.clone()
		} else if let Some(iface) = type_.as_ref().and_then(|t| t.as_interface()) {
			Some(iface.fqn.clone())
		} else {
			None
		};
		if let Some(SymbolKind::Namespace(root_namespace)) = current_env.lookup(&node.root, None) {
			let type_path = node.field_path_str();
			let module_path = match &root_namespace.module_path {
				ResolveSource::WingFile => "",
				ResolveSource::ExternalModule(p) => p,
			};
			if let Some(fqn) = fqn {
				format!("$stdlib.core.toLiftableModuleType(globalThis.$ClassFactory.resolveType(\"{fqn}\") ?? {udt_js}, \"{module_path}\", \"{type_path}\")")
			} else {
				format!("$stdlib.core.toLiftableModuleType({udt_js}, \"{module_path}\", \"{type_path}\")")
			}
		} else {
			// Non-namespaced reference, should be a wing type with a helper to lift it
			udt_js
		}
	}

	// Used for generating a js array represtining a lift qualificaiton (an operation done on a lifted preflight object)
	// lift qualifcations are in array format so multiple ops can be bunched together in some cases.
	fn jsify_symbol_to_op_array(&self, symb: &Symbol) -> String {
		format!("[\"{symb}\"]")
	}
}

impl<'a> Visit<'a> for LiftVisitor<'a> {
	fn visit_reference(&mut self, node: &'a Reference) {
		match node {
			Reference::InstanceMember { property, object, .. } => {
				self.ctx.push_property(PropertyObject::Instance(object.id), property);
				visit::visit_reference(self, &node);
				self.ctx.pop_property();
			}
			Reference::TypeMember { property, type_name } => {
				self
					.ctx
					.push_property(PropertyObject::UserDefinedType(type_name.clone()), property);
				visit::visit_reference(self, &node);
				self.ctx.pop_property();
			}
			Reference::Identifier(symb) => {
				self.verify_defined_in_current_env(symb);
				visit::visit_reference(self, &node);
			}
			Reference::ElementAccess { .. } => {
				visit::visit_reference(self, &node);
			}
		}
	}

	fn visit_type_annotation(&mut self, node: &'a crate::ast::TypeAnnotation) {
		self.ctx.push_type_annotation();
		visit::visit_type_annotation(self, node);
		self.ctx.pop_type_annotation();
	}

	fn visit_expr(&mut self, node: &'a Expr) {
		CompilationContext::set(CompilationPhase::Lifting, &node.span);
		self.with_expr(&node, |v| {
			let expr_phase = v.jsify.types.get_expr_phase(&node).unwrap();
			let expr_type = v.jsify.types.get_expr_type(&node);

			// Skip expressions of an unresoved type (type errors)
			if expr_type.is_unresolved() {
				visit::visit_expr(v, node);
				return;
			}

			// this whole thing only applies to inflight code
			if v.ctx.current_phase() == Phase::Preflight {
				visit::visit_expr(v, node);
				return;
			}

			// Inflight expressions that evaluate to a preflight type are currently unsupported because
			// we can't determine exactly which preflight object is being accessed and therefore can't
			// qualify the original lift expression.
			if expr_phase == Phase::Inflight
				&& expr_type.is_preflight_object_type()
				&& v.ctx.current_property().is_some()
				&& v.in_disable_lift_qual_err == 0
			{
				Diagnostic::new(
					format!(
						"Expression of type \"{expr_type}\" references an unknown preflight object, can't qualify its capabilities"
					),
					node,
				)
				.hint("Use a `lift` block to explicitly qualify the preflight object and disable this error")
				.hint("For details see: https://www.winglang.io/docs/concepts/inflights#explicit-lift-qualification")
				.report();
			}

			//---------------
			// LIFT
			if expr_phase == Phase::Preflight {
				// Get the property being accessed on the preflight expression, this is used to qualify the lift
				let property = match v.ctx.current_property() {
					Some((PropertyObject::Instance(prop_expr_id), property)) if node.id == prop_expr_id => Some(property),
					_ => {
						if expr_type.is_closure() {
							// this is the case where we are lifting a "closure class" (a preflight class that has an inflight `handle`
							// method is being called) the reason we might not have "property" set is because closure classes might be
							// syntheticaly generated by the compiler from closures.
							Some(Symbol::global(CLOSURE_CLASS_HANDLE_METHOD))
						} else {
							None
						}
					}
				};

				// if this is an inflight field of "this" no need to lift it
				if is_inflight_field(&node, expr_type, &property) {
					return;
				}

				// jsify the expression so we can get the preflight code
				let code = v.jsify_expr(&node);

				let mut lifts = v.lifts_stack.pop().unwrap();
				let is_field = code.contains("this."); // TODO: starts_with?
				lifts.lift(
					v.ctx.current_method().map(|(m, _)| m).expect("a method"),
					property.map(|p| v.jsify_symbol_to_op_array(&p)),
					&code,
				);
				lifts.capture(&Liftable::Expr(node.id), &code, is_field);
				v.lifts_stack.push(lifts);
				return;
			}

			// Before we continue lets dive into this (non-preflight) expression to see if we need to lift any parts of it
			visit::visit_expr(v, node);

			// Check if this is an inflight class defined preflight and if we need to qualify the lift with the current property
			if expr_phase == Phase::Inflight {
				if let Some(class) = expr_type.as_class() {
					if class.phase == Phase::Inflight && class.defined_in_phase == Phase::Preflight {
						if let Some((_, property)) = v.ctx.current_property() {
							let m = v.ctx.current_method().map(|(m, _)| m).expect("a method");
							let mut lifts = v.lifts_stack.pop().unwrap();
							// Get preflight code that references the type of the class so we can qualify the lift, note we use a unique
							// type alias here since we might not have the actual type name available in scope here.
							let code = &v.jsify.class_singleton(expr_type);
							lifts.lift(m, Some(v.jsify_symbol_to_op_array(&property)), code);
							v.lifts_stack.push(lifts);
							return;
						}
					}
				}
			}
		});
	}

	fn visit_user_defined_type(&mut self, node: &'a UserDefinedType) {
		// If we're inside a type annotation we currently don't need to capture type since our target compilation
		// is typeless (javascript). For typed targes we may need to also capture the types used in annotations.
		if self.ctx.in_type_annotation() {
			visit::visit_user_defined_type(self, node);
			return;
		}

		// this whole thing only applies to inflight code
		if self.ctx.current_phase() == Phase::Preflight {
			visit::visit_user_defined_type(self, node);
			return;
		}

		// Get the type of the udt
		let env = self.ctx.current_env().expect("an env");
		let udt_type =
			resolve_user_defined_type(node, env, self.ctx.current_stmt_idx()).unwrap_or(self.jsify.types.error());

		// Since our target language is isn't statically typed, we don't need to capture interfaces
		if udt_type.as_interface().is_some() {
			visit::visit_user_defined_type(self, node);
			return;
		}

		//---------------
		// LIFT
		if get_udt_definition_phase(node, env).expect("a phase") == Phase::Preflight {
			// jsify the expression so we can get the preflight code
			let code = self.jsify_udt(&node);

			let property = self.ctx.current_property();
			let mut lifts = self.lifts_stack.pop().unwrap();
			lifts.lift(
				self.ctx.current_method().map(|(m, _)| m).expect("a method"),
				property.map(|(_, p)| self.jsify_symbol_to_op_array(&p)),
				&code,
			);
			self.lifts_stack.push(lifts);
		}

		//---------------
		// CAPTURE
		if self.should_capture_type(&node) {
			// jsify the type so we can get the preflight code
			let code = self.jsify_udt(&node);

			let mut lifts = self.lifts_stack.pop().unwrap();
			lifts.capture(&Liftable::Type(node.clone()), &code, false);
			self.lifts_stack.push(lifts);

			return;
		}

		visit::visit_user_defined_type(self, node);
	}

	// State Tracking

	fn visit_function_definition(&mut self, node: &'a FunctionDefinition) {
		match &node.body {
			FunctionBody::Statements(scope) => {
				// If we're in an inner inflight class then we don't need to track this inner method since lifts are
				// collected for methods of classes defined preflight.
				if self.in_inner_inflight_class == 0 {
					self.ctx.push_function_definition(
						node.name.as_ref(),
						&node.signature,
						node.is_static,
						self.jsify.types.get_scope_env(&scope),
					);
				}

				visit::visit_function_definition(self, node);

				if self.in_inner_inflight_class == 0 {
					self.ctx.pop_function_definition();
				}
			}
			FunctionBody::External(_) => visit::visit_function_definition(self, node),
		}
	}

	fn visit_class(&mut self, node: &'a Class) {
		let in_inner_inflight_class = self.ctx.current_phase() == Phase::Inflight && node.phase == Phase::Inflight;
		if in_inner_inflight_class {
			// nothing to do if we are emitting an inflight class from within an inflight scope:
			// inner inflight classes collect lifts in their outer class, just mark we're in such a class and do nothing
			self.in_inner_inflight_class += 1;
		} else {
			self.ctx.push_class(node);

			self.lifts_stack.push(Lifts::new());

			if let Some(parent) = &node.parent {
				let mut lifts = self.lifts_stack.pop().unwrap();
				lifts.capture(&Liftable::Type(parent.clone()), &self.jsify_udt(&parent), false);
				self.lifts_stack.push(lifts);
			}
		}

		visit::visit_class(self, node);

		if in_inner_inflight_class {
			self.in_inner_inflight_class -= 1;
		} else {
			let lifts = self.lifts_stack.pop().expect("Unable to pop class tokens");

			if let Some(env) = self.ctx.current_env() {
				if let Some(mut t) = resolve_user_defined_type(&UserDefinedType::for_class(node), env, 0).ok() {
					let mut_class = t.as_class_mut().unwrap();
					mut_class.set_lifts(lifts);
				}
			}

			self.ctx.pop_class();
		}
	}

	fn visit_scope(&mut self, node: &'a Scope) {
		self.ctx.push_env(self.jsify.types.get_scope_env(&node));
		visit::visit_scope(self, node);
		self.ctx.pop_env();
	}

	fn visit_stmt(&mut self, node: &'a Stmt) {
		CompilationContext::set(CompilationPhase::Lifting, &node.span);

		self.ctx.push_stmt(node);

		// If this is an explicit lift statement then add the explicit lift
		if let StmtKind::ExplicitLift(explicit_lift) = &node.kind {
			// Mark that within this scope we should ignore unknown preflight objects
			self.in_disable_lift_qual_err += 1;

			// Add the explicit lifts
			let mut lifts = self.lifts_stack.pop().unwrap();
			for qual in explicit_lift.qualifications.iter() {
				// jsify the reference to the preflight object so we can get the preflight code
				let preflight_code = self.jsify_expr(&qual.obj);

				let ops_str = format!(
					"[{}]",
					qual.ops.iter().map(|op| format!("\"{op}\"")).collect_vec().join(", ")
				);
				lifts.lift(
					self.ctx.current_method().map(|(m, _)| m).expect("a method"),
					Some(ops_str),
					&preflight_code,
				);
			}
			self.lifts_stack.push(lifts);
		}
		visit::visit_stmt(self, node);
		if let StmtKind::ExplicitLift(_) = &node.kind {
			self.in_disable_lift_qual_err -= 1;
		}
		self.ctx.pop_stmt();
	}
}

/// Check if an expression is a reference to an inflight field (`this.<field>`).
/// in this case, we don't need to lift the field because it is already available
fn is_inflight_field(expr: &Expr, expr_type: TypeRef, property: &Option<Symbol>) -> bool {
	if let ExprKind::Reference(Reference::Identifier(symb)) = &expr.kind {
		if symb.name == "this" {
			if let (Some(cls), Some(property)) = (expr_type.as_preflight_class(), property) {
				if let Some(var) = cls.get_field(&property) {
					if var.phase != Phase::Preflight {
						return true;
					}
				}
			}
		}
	}

	return false;
}

impl VisitorWithContext for LiftVisitor<'_> {
	fn ctx(&mut self) -> &mut VisitContext {
		&mut self.ctx
	}
}
