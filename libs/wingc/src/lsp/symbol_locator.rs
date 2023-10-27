use crate::{
	ast::*,
	diagnostic::*,
	type_check::{
		resolve_super_method, resolve_user_defined_type_ref, symbol_env::*, ClassLike, Type, TypeRef, Types,
		CLASS_INFLIGHT_INIT_NAME, CLASS_INIT_NAME,
	},
	visit::*,
	visit_context::*,
};

#[derive(Debug)]
/// Result of using the [SymbolLocato]
pub enum SymbolLocatorResult {
	NotFound,
	/// Simple symbol reference
	Symbol(Symbol),
	/// Reference to a property on an object
	ObjectPropertyReference {
		object: ExprId,
		property: Symbol,
		span: WingSpan,
	},
	/// Reference to a property on a type
	TypePropertyReference {
		type_name: UserDefinedType,
		property: Symbol,
		span: WingSpan,
	},
	/// Direct reference to a type
	TypeReference {
		nested_string: String,
		span: WingSpan,
	},
	// Field on a struct
	StructField {
		struct_type: TypeRef,
		field: Symbol,
	},
	/// This may be a json or map key
	LooseField {
		object: TypeRef,
		field_type: TypeRef,
		field: Symbol,
	},
}

pub struct SymbolLocator<'a> {
	ctx: VisitContext,
	types: &'a Types,
	location: WingLocation,
	result_ctx: VisitContext,
	pub result: SymbolLocatorResult,
}

impl<'a> VisitorWithContext for SymbolLocator<'a> {
	fn ctx(&mut self) -> &mut VisitContext {
		&mut self.ctx
	}
}

impl<'a> SymbolLocator<'a> {
	pub fn new(types: &'a Types, location: WingLocation) -> Self {
		Self {
			types,
			ctx: VisitContext::new(),
			result: SymbolLocatorResult::NotFound,
			location,
			result_ctx: VisitContext::new(),
		}
	}

	fn set_result(&mut self, result: SymbolLocatorResult) {
		self.result = result;
		self.result_ctx = self.ctx.clone();
	}

	fn push_scope_env(&mut self, scope: &'a Scope) {
		self.ctx.push_env(self.types.get_scope_env(scope));
	}

	fn is_found(&self) -> bool {
		!matches!(self.result, SymbolLocatorResult::NotFound)
	}

	fn get_env_from_classlike_symbol(&'a self, sym: &'a Symbol) -> Option<SymbolEnvRef> {
		let struct_type = self.ctx.current_env()?.lookup(sym, None)?;
		let struct_type = struct_type.as_type()?;
		match &*struct_type {
			Type::Class(c) => Some(c.get_env().into()),
			Type::Interface(c) => Some(c.get_env().into()),
			Type::Struct(c) => Some(c.get_env().into()),
			_ => None,
		}
	}

	fn lookup_property_on_udt(
		&'a self,
		type_name: &'a UserDefinedType,
		property: &'a Symbol,
	) -> Option<LookupResult<'a>> {
		let current_env = self.result_ctx.current_env()?;
		let type_ = resolve_user_defined_type_ref(type_name, current_env, self.result_ctx.current_stmt_idx()).ok()?;

		match &**type_ {
			// enum variants are not really properties, so just return the enum info
			Type::Enum(..) => {
				let lookup = current_env.lookup_nested_str(&type_name.full_path_str(), Some(self.ctx.current_stmt_idx()));
				Some(lookup)
			}
			_ => self.lookup_property_on_type(type_, property),
		}
	}

	fn lookup_property_on_type(&'a self, type_: &'a TypeRef, property: &'a Symbol) -> Option<LookupResult<'a>> {
		match &**type_ {
			Type::Optional(_)
			| Type::Anything
			| Type::Void
			| Type::Nil
			| Type::Unresolved
			| Type::Inferred(_)
			| Type::Function(_)
			| Type::Enum(_) => None,

			Type::Array(_)
			| Type::MutArray(_)
			| Type::Map(_)
			| Type::MutMap(_)
			| Type::Set(_)
			| Type::MutSet(_)
			| Type::Json(_)
			| Type::MutJson
			| Type::Number
			| Type::String
			| Type::Duration
			| Type::Boolean => {
				if let Some((std_type, ..)) = self.types.get_std_class(&type_) {
					if let Some(t) = std_type.as_type_ref() {
						if let Some(c) = t.as_class() {
							let env = c.get_env();
							let lookup = env.lookup_ext(property, None);
							return Some(lookup);
						}
					}
				}
				None
			}

			Type::Class(c) => {
				let env = c.get_env();
				return Some(env.lookup_ext(property, None));
			}
			Type::Interface(c) => {
				let env = c.get_env();
				return Some(env.lookup_ext(property, None));
			}
			Type::Struct(c) => {
				let env = c.get_env();
				return Some(env.lookup_ext(property, None));
			}
		}
	}

	pub fn lookup_located_symbol(&'a self) -> Option<LookupResult<'a>> {
		match &self.result {
			SymbolLocatorResult::NotFound => None,
			SymbolLocatorResult::Symbol(symbol) => {
				let current_env = self.result_ctx.current_env()?;
				return Some(current_env.lookup_ext(symbol, None));
			}
			SymbolLocatorResult::ObjectPropertyReference { object, property, .. } => {
				let expr_type = self.types.get_expr_id_type_ref(*object).maybe_unwrap_option();

				self.lookup_property_on_type(&expr_type, property)
			}
			SymbolLocatorResult::TypePropertyReference {
				type_name, property, ..
			} => self.lookup_property_on_udt(type_name, property),
			SymbolLocatorResult::TypeReference { nested_string, .. } => {
				let current_env = self.result_ctx.current_env()?;
				let lookup = current_env.lookup_nested_str(&nested_string, None);
				return Some(lookup);
			}
			SymbolLocatorResult::StructField { struct_type, field } => self.lookup_property_on_type(&struct_type, field),
			SymbolLocatorResult::LooseField { .. } => None,
		}
	}

	/// Get the span of the symbol that was located
	pub fn located_span(&self) -> Option<&WingSpan> {
		match &self.result {
			SymbolLocatorResult::NotFound => None,
			SymbolLocatorResult::Symbol(symbol) => Some(&symbol.span),
			SymbolLocatorResult::StructField { field, .. } => Some(&field.span),
			SymbolLocatorResult::LooseField { field, .. } => Some(&field.span),
			SymbolLocatorResult::TypePropertyReference { span, .. }
			| SymbolLocatorResult::ObjectPropertyReference { span, .. }
			| SymbolLocatorResult::TypeReference { span, .. } => Some(&span),
		}
	}
}

impl<'a> Visit<'a> for SymbolLocator<'a> {
	fn visit_scope(&mut self, node: &'a Scope) {
		if self.is_found() {
			return;
		}

		self.ctx.push_env(self.types.get_scope_env(node));
		visit_scope(self, node);
		self.ctx.pop_env();
	}

	fn visit_stmt(&mut self, node: &'a crate::ast::Stmt) {
		if self.is_found() {
			return;
		}

		self.ctx.push_stmt(node.idx);

		// Handle situations where symbols are actually defined in inner scopes
		match &node.kind {
			StmtKind::Struct { name, fields, .. } => {
				let Some(struct_env) = self.get_env_from_classlike_symbol(name) else {
					return;
				};

				self.ctx.push_env(struct_env);

				for field in fields {
					self.visit_symbol(&field.name);
				}

				self.ctx.pop_env();
			}
			StmtKind::Interface(interface) => {
				let Some(interface_env) = self.get_env_from_classlike_symbol(&interface.name) else {
					return;
				};

				self.ctx.push_env(interface_env);

				for method in &interface.methods {
					self.visit_symbol(&method.0);
				}

				self.ctx.pop_env();
			}
			StmtKind::ForLoop {
				iterator, statements, ..
			} => {
				self.push_scope_env(&statements);
				self.visit_symbol(iterator);
				self.ctx.pop_env();
			}
			StmtKind::TryCatch { catch_block, .. } => {
				if let Some(catch_block) = catch_block {
					if let Some(exception_var) = &catch_block.exception_var {
						self.push_scope_env(&catch_block.statements);
						self.visit_symbol(exception_var);
						self.ctx.pop_env();
					}
				}
			}
			StmtKind::IfLet(IfLet {
				var_name,
				statements,
				elif_statements,
				..
			}) => {
				self.push_scope_env(&statements);
				self.visit_symbol(var_name);
				self.ctx.pop_env();

				for elif in elif_statements {
					self.push_scope_env(&elif.statements);
					self.visit_symbol(&elif.var_name);
					self.ctx.pop_env();
				}
			}
			_ => {}
		}

		visit_stmt(self, node);

		self.ctx.pop_stmt();
	}

	fn visit_expr(&mut self, node: &'a Expr) {
		if self.is_found() {
			return;
		}

		self.ctx.push_expr(node.id);

		match &node.kind {
			ExprKind::New(new_expr) => {
				let found_named_arg = new_expr
					.arg_list
					.named_args
					.iter()
					.find(|a| a.0.span.contains_location(&self.location));

				if let Some((arg_name, ..)) = found_named_arg {
					// we need to get the struct type from the class constructor
					let class_type = self.types.get_expr_type(node);
					let Some(class_phase) = self.types.get_expr_phase(node) else {
						return;
					};
					let Some(class_type) = class_type.as_class() else {
						return;
					};
					let init_info = match class_phase {
						Phase::Inflight => class_type.get_method(&Symbol::global(CLASS_INFLIGHT_INIT_NAME)),
						Phase::Preflight => class_type.get_method(&Symbol::global(CLASS_INIT_NAME)),
						Phase::Independent => panic!("Cannot get hover info for independent class"),
					};
					if let Some(var_info) = init_info {
						if let Some(func) = var_info.type_.maybe_unwrap_option().as_function_sig() {
							if let Some(arg) = func.parameters.last() {
								let struct_type = arg.typeref.maybe_unwrap_option();
								self.set_result(SymbolLocatorResult::StructField {
									struct_type: struct_type.to_owned(),
									field: arg_name.clone(),
								});
							}
						}
					}
				}
			}
			ExprKind::Call { arg_list, callee } => {
				let x = arg_list
					.named_args
					.iter()
					.find(|a| a.0.span.contains_location(&self.location));
				if let Some((arg_name, ..)) = x {
					let Some(env) = self.ctx.current_env() else {
						return;
					};
					// we need to get the struct type from the callee
					let callee_type = match callee {
						CalleeKind::Expr(expr) => self.types.get_expr_type(expr),
						CalleeKind::SuperCall(method) => resolve_super_method(method, &env, &self.types)
							.ok()
							.map_or(self.types.error(), |t| t.0),
					}
					.maybe_unwrap_option()
					.to_owned();

					if let Some(func) = callee_type.as_function_sig() {
						if let Some(arg) = func.parameters.last() {
							let struct_type = arg.typeref.maybe_unwrap_option();
							self.set_result(SymbolLocatorResult::StructField {
								struct_type: struct_type.to_owned(),
								field: arg_name.clone(),
							});
						}
					}
				}
			}
			ExprKind::MapLiteral { fields, .. }
			| ExprKind::JsonMapLiteral { fields }
			| ExprKind::StructLiteral { fields, .. } => {
				if let Some(f) = fields.iter().find(|f| f.0.span.contains_location(&self.location)) {
					let field_name = f.0;
					let type_ = self.types.maybe_unwrap_inference(self.types.get_expr_type(node));
					let type_ = *if let Some(type_) = self.types.get_type_from_json_cast(node.id) {
						*type_
					} else {
						type_
					}
					.maybe_unwrap_option();

					if type_.is_struct() {
						self.set_result(SymbolLocatorResult::StructField {
							struct_type: type_.to_owned(),
							field: field_name.clone(),
						});
					} else {
						// just use the type info
						let inner_type = self.types.maybe_unwrap_inference(self.types.get_expr_type(f.1));
						self.set_result(SymbolLocatorResult::LooseField {
							object: type_.to_owned(),
							field_type: inner_type.to_owned(),
							field: field_name.clone(),
						});
					}
				}
			}
			_ => {}
		}

		crate::visit::visit_expr(self, node);

		self.ctx.pop_expr();
	}

	fn visit_function_definition(&mut self, node: &'a FunctionDefinition) {
		if self.is_found() {
			return;
		}

		if let FunctionBody::Statements(scope) = &node.body {
			self.push_scope_env(scope);
			for param in &node.signature.parameters {
				self.visit_function_parameter(&param);
			}
			self.ctx.pop_env();
		}

		visit_function_definition(self, node);
	}

	fn visit_class(&mut self, node: &'a Class) {
		if self.is_found() {
			return;
		}

		let Some(class_env) = self.get_env_from_classlike_symbol(&node.name) else {
			return;
		};

		self.ctx.push_env(class_env);

		for field in &node.fields {
			self.visit_symbol(&field.name);
		}
		for method in &node.methods {
			self.visit_symbol(&method.0);
		}

		self.ctx.pop_env();

		visit_class(self, node);
	}

	fn visit_reference(&mut self, node: &'a Reference) {
		if self.is_found() {
			return;
		}

		match node {
			Reference::Identifier(sym) => self.visit_symbol(sym),
			Reference::InstanceMember { object, property, .. } => {
				self.visit_expr(object);

				if property.span.contains_location(&self.location) {
					self.set_result(SymbolLocatorResult::ObjectPropertyReference {
						span: object.span.merge(&property.span),
						object: object.id,
						property: property.clone(),
					});
				}
			}
			Reference::TypeMember { type_name, property } => {
				if property.span.contains_location(&self.location) {
					self.set_result(SymbolLocatorResult::TypePropertyReference {
						type_name: type_name.clone(),
						property: property.clone(),
						span: type_name.span.merge(&property.span),
					});
				} else {
					self.visit_user_defined_type(type_name);
				}
			}
		}

		visit_reference(self, node);
	}

	fn visit_user_defined_type(&mut self, node: &'a UserDefinedType) {
		if self.is_found() {
			return;
		}

		if node.span.contains_location(&self.location) {
			if node.root.span.contains_location(&self.location) {
				self.visit_symbol(&node.root);
			} else {
				let mut full_string = node.root.name.clone();
				let mut full_span = node.root.span.clone();
				for segment in &node.fields {
					full_string = format!("{}.{}", full_string, segment.name);
					full_span = full_span.merge(&segment.span);

					if segment.span.contains_location(&self.location) {
						self.set_result(SymbolLocatorResult::TypeReference {
							nested_string: full_string,
							span: full_span,
						});
						break;
					}
				}
			}
		}
	}

	fn visit_symbol(&mut self, node: &'a crate::ast::Symbol) {
		if self.is_found() {
			return;
		}

		if node.span.contains_location(&self.location) {
			self.set_result(SymbolLocatorResult::Symbol(node.clone()));
		}
	}
}
