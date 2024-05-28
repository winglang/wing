use indexmap::IndexMap;

use crate::{
	ast::{
		AccessModifier, ArgList, AssignmentKind, Ast, CalleeKind, Class, ClassField, Expr, ExprKind, FunctionBody,
		FunctionDefinition, FunctionParameter, FunctionSignature, Literal, New, Phase, Reference, Scope, ScopeId, StmtId,
		StmtKind, Symbol, TypeAnnotation, TypeAnnotationKind, UserDefinedType,
	},
	diagnostic::WingSpan,
	fold::{self, Fold},
	type_check::{CLASS_INFLIGHT_INIT_NAME, CLASS_INIT_NAME, CLOSURE_CLASS_HANDLE_METHOD},
};

pub const CLOSURE_CLASS_PREFIX: &str = "$Closure";
pub const PARENT_THIS_NAME: &str = "__parent_this";

/// Transforms inflight closures defined in preflight scopes into preflight classes.
///
/// This is done by wrapping the closure's code in a preflight class with a single method,
/// and replacing the closure with a reference to an instance of that class.
/// The class is given a unique name to avoid collisions.
///
/// For example, the following code:
///
/// ```wing
/// let b = new cloud.Bucket();
/// let f = inflight (message: str) => {
///   b.put("file.txt", message);
/// };
/// ```
///
/// is transformed into:
///
/// ```wing
/// let b = new cloud.Bucket();
/// class $Closure1 {
///   new() {}
///   inflight handle(message: str) {
///     b.put("file.txt", message);
///   }
/// }
/// let f = new $Closure1();
/// ```
pub struct ClosureTransformer<'a> {
	// Whether the transformer is inside a preflight or inflight scope.
	// Only inflight closures defined in preflight scopes need to be transformed.
	phase: Phase,
	// Whether the transformer is inside a scope where "this" is valid.
	inside_scope_with_this: bool,
	// Helper state for generating unique class names
	closure_counter: usize,
	// Stores the list of class definitions that need to be added to the nearest scope
	class_statements: Vec<StmtId>,
	// Track the statement index of the nearest statement we're inside so that
	// newly-inserted classes will have access to the correct state
	nearest_stmt_idx: usize,
	/// The AST being transformed
	ast: &'a mut Ast,
}

impl<'a> ClosureTransformer<'a> {
	pub fn new(ast: &'a mut Ast) -> Self {
		Self {
			phase: Phase::Preflight,
			inside_scope_with_this: false,
			closure_counter: 0,
			class_statements: vec![],
			nearest_stmt_idx: 0,
			ast,
		}
	}
}

impl<'a> Fold for ClosureTransformer<'a> {
	fn ast(&self) -> &Ast {
		&self.ast
	}

	fn ast_mut(&mut self) -> &mut Ast {
		&mut self.ast
	}

	fn fold_scope(&mut self, node: ScopeId) -> ScopeId {
		let mut statements = vec![];

		let scope = self.ast_mut().remove_scope(node);
		for stmt_id in scope.statements.into_iter() {
			let stmt = self.ast().get_stmt(stmt_id);
			// TODO: can we remove "idx" from Stmt to avoid having to reason about this?
			// or add a compiler step that updates statement indices after folding?
			let old_nearest_stmt_idx = self.nearest_stmt_idx;
			self.nearest_stmt_idx = stmt.idx;
			let new_stmt = self.fold_stmt(stmt_id);
			self.nearest_stmt_idx = old_nearest_stmt_idx;

			// Add any new statements we have accumulated that define temporary classes
			statements.append(&mut self.class_statements);

			// Push the folded statement last. This way it has access to all of the temporary
			// classes we have defined.
			statements.push(new_stmt);

			// Reset scope-specific state
			self.class_statements.clear();
		}

		self.ast_mut().set_scope(Scope {
			id: scope.id,
			statements,
			span: scope.span,
		});
		node
	}

	fn fold_function_definition(&mut self, node: FunctionDefinition) -> FunctionDefinition {
		let prev_phase = self.phase;
		self.phase = node.signature.phase;
		let prev_inside_scope_with_this = self.inside_scope_with_this;
		if !node.is_static {
			self.inside_scope_with_this = true;
		}
		let new_node = fold::fold_function_definition(self, node);
		self.inside_scope_with_this = prev_inside_scope_with_this;
		self.phase = prev_phase;
		new_node
	}

	fn fold_expr(&mut self, expr: Expr) -> Expr {
		// Inflight closures that are themselves defined inflight do not need
		// to be transformed, since they are not created in preflight.
		if self.phase == Phase::Inflight {
			return expr;
		}

		// If we encounter a preflight closure, we don't need to
		// transform it into a preflight class, but we still want to recurse
		// in case its body contains any inflight closures.
		if let ExprKind::FunctionClosure(ref func_def) = expr.kind {
			if func_def.signature.phase != Phase::Inflight {
				return fold::fold_expr(self, expr);
			}
		}

		match expr.kind {
			ExprKind::FunctionClosure(func_def) => {
				self.closure_counter += 1;

				let file_id = &expr.span.file_id;

				let new_class_name = Symbol {
					name: format!("{}{}", CLOSURE_CLASS_PREFIX, self.closure_counter),
					span: WingSpan::for_file(file_id),
				};
				let handle_name = Symbol {
					name: CLOSURE_CLASS_HANDLE_METHOD.to_string(),
					span: WingSpan::for_file(file_id),
				};

				let class_udt = UserDefinedType {
					root: new_class_name.clone(),
					fields: vec![],
					span: WingSpan::for_file(file_id),
				};

				let class_type_annotation = TypeAnnotation {
					kind: TypeAnnotationKind::UserDefined(class_udt.clone()),
					span: WingSpan::for_file(file_id),
				};

				let class_fields: Vec<ClassField> = vec![];
				let class_init_params: Vec<FunctionParameter> = vec![];

				let parent_this = format!("{}_{}", PARENT_THIS_NAME, self.closure_counter);
				let (new_func_def, preformed_this_renames) = if self.inside_scope_with_this {
					let mut this_transform = RenameThisTransformer::new(self.ast_mut(), &parent_this.as_str());
					// If we are inside a class, we transform inflight closures with an extra
					// `let __parent_this_${CLOSURE_COUNT} = this;` statement before the class definition, and replace references
					// to `this` with `__parent_this_${CLOSURE_COUNT}` so that they can access the parent class's fields.
					let tr = this_transform.fold_function_definition(func_def);
					(tr, this_transform.performed_renames)
				} else {
					(func_def, false)
				};

				let new_func_def = FunctionDefinition {
					name: Some(handle_name.clone()),
					body: new_func_def.body,
					signature: new_func_def.signature,
					span: new_func_def.span,

					// Anonymous functions are always static -- since the function code is now an instance method on a class,
					// we need to set this to false.
					is_static: false,
					access: AccessModifier::Public,
					doc: None,
				};

				// class_init_body :=
				// ```
				// nodeof(this).hidden = true;
				// ```
				let std_display_of_this = Expr::new(
					ExprKind::Call {
						callee: CalleeKind::Expr(Box::new(Expr::new(
							ExprKind::Reference(Reference::Identifier(Symbol::new(
								"nodeof",
								WingSpan::for_file(file_id),
							))),
							expr.stmt,
							WingSpan::for_file(file_id),
						))),
						arg_list: ArgList::new(
							vec![Expr::new(
								ExprKind::Reference(Reference::Identifier(Symbol::new("this", WingSpan::for_file(file_id)))),
								expr.stmt,
								WingSpan::for_file(file_id),
							)],
							IndexMap::new(),
							WingSpan::for_file(file_id),
						),
					},
					expr.stmt,
					WingSpan::for_file(file_id),
				);

				let stmt_id = self.ast.gen_stmt_id();
				let class_init_body = vec![self.ast.new_stmt_with_id(
					stmt_id,
					StmtKind::Assignment {
						kind: AssignmentKind::Assign,
						variable: Reference::InstanceMember {
							object: Box::new(std_display_of_this),
							property: Symbol::new("hidden", WingSpan::for_file(file_id)),
							optional_accessor: false,
						},

						value: Expr::new(
							ExprKind::Literal(Literal::Boolean(true)),
							stmt_id,
							WingSpan::for_file(file_id),
						),
					},
					0,
					None,
					WingSpan::for_file(file_id),
				)];
				let class_init_body = self.ast.new_scope(class_init_body, WingSpan::for_file(file_id));

				// If we are inside a scope with "this", add define `let __parent_this_${CLOSURE_COUNT} = this` which can be
				// used by the newly-created preflight classes
				if self.inside_scope_with_this && preformed_this_renames {
					let parent_this_name = Symbol::new(parent_this, WingSpan::for_file(file_id));
					let this_name = Symbol::new("this", WingSpan::for_file(file_id));
					let stmt_id = self.ast.gen_stmt_id();
					let parent_this_def = self.ast.new_stmt_with_id(
						stmt_id,
						StmtKind::Let {
							reassignable: false,
							var_name: parent_this_name,
							initial_value: Expr::new(
								ExprKind::Reference(Reference::Identifier(this_name.clone())),
								stmt_id,
								WingSpan::for_file(file_id),
							),
							type_: None,
						},
						0,
						None,
						WingSpan::for_file(file_id),
					);

					self.class_statements.push(parent_this_def);
				}

				// class_def :=
				// ```
				// class <new_class_name> {
				//   new(<class_init_params>) {<class_init_body>}
				//   inflight handle() {
				//     <transformed_def>
				//   }
				// }
				// ```
				let empty_scope = self.ast.new_scope(vec![], WingSpan::for_file(file_id));
				let class_def = self.ast.new_stmt(
					StmtKind::Class(Class {
						name: new_class_name.clone(),
						span: new_func_def.span.clone(),
						phase: Phase::Preflight,
						initializer: FunctionDefinition {
							name: Some(CLASS_INIT_NAME.into()),
							signature: FunctionSignature {
								parameters: class_init_params,
								return_type: Box::new(class_type_annotation.clone()),
								phase: Phase::Preflight,
							},
							is_static: true,
							body: FunctionBody::Statements(class_init_body),
							span: WingSpan::for_file(file_id),
							access: AccessModifier::Public,
							doc: None,
						},
						fields: class_fields,
						implements: vec![],
						parent: None,
						methods: vec![(handle_name.clone(), new_func_def)],
						inflight_initializer: FunctionDefinition {
							name: Some(CLASS_INFLIGHT_INIT_NAME.into()),
							signature: FunctionSignature {
								parameters: vec![],
								return_type: Box::new(TypeAnnotation {
									kind: TypeAnnotationKind::Void,
									span: WingSpan::for_file(file_id),
								}),
								phase: Phase::Inflight,
							},
							is_static: false,
							body: FunctionBody::Statements(empty_scope),
							span: WingSpan::for_file(file_id),
							access: AccessModifier::Public,
							doc: None,
						},
						access: AccessModifier::Private,
						auto_id: true,
					}),
					self.nearest_stmt_idx,
					None,
					WingSpan::for_file(file_id),
				);

				// new_class_instance :=
				// ```
				// new <new_class_name>();
				// ```
				let new_class_instance = Expr::new(
					ExprKind::New(New {
						class: class_udt,
						arg_list: ArgList::new_empty(WingSpan::for_file(file_id)),
						obj_id: None,
						obj_scope: None,
					}),
					expr.stmt,         // <<-- stmt of original expression
					expr.span.clone(), // <<-- span of original expression
				);

				self.class_statements.push(class_def);

				new_class_instance
			}
			_ => fold::fold_expr(self, expr),
		}
	}
}

/// Rename all occurrences of an identifier inside an inflight closure to a new name.
struct RenameThisTransformer<'a> {
	from: &'a str,
	to: &'a str,
	performed_renames: bool,
	/// The AST being transformed
	ast: &'a mut Ast,
}

impl<'a> RenameThisTransformer<'a> {
	fn new(ast: &'a mut Ast, to: &'a str) -> Self {
		Self {
			from: "this",
			to,
			performed_renames: false,
			ast,
		}
	}
}

impl<'a> Fold for RenameThisTransformer<'a> {
	fn ast_mut(&mut self) -> &mut Ast {
		&mut self.ast
	}

	fn fold_class(&mut self, node: Class) -> Class {
		// The transform shouldn't change references to `this` inside inflight classes since
		// they refer to different objects. Skip inner class.
		node
	}

	fn fold_reference(&mut self, node: Reference) -> Reference {
		match node {
			Reference::Identifier(ident) => {
				if ident.name == self.from {
					self.performed_renames = true;
					Reference::Identifier(Symbol {
						name: self.to.to_string(),
						span: ident.span,
					})
				} else {
					Reference::Identifier(ident)
				}
			}
			Reference::InstanceMember { .. } | Reference::TypeMember { .. } | Reference::ElementAccess { .. } => {
				fold::fold_reference(self, node)
			}
		}
	}

	fn ast(&self) -> &Ast {
		&self.ast
	}
}
