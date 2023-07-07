use indexmap::IndexMap;

use crate::{
	ast::{
		ArgList, Class, ClassField, Expr, ExprKind, FunctionBody, FunctionDefinition, FunctionParameter, FunctionSignature,
		Literal, Phase, Reference, Scope, Stmt, StmtKind, Symbol, TypeAnnotation, TypeAnnotationKind, UserDefinedType,
	},
	diagnostic::WingSpan,
	fold::{self, Fold},
	type_check::{CLASS_INFLIGHT_INIT_NAME, CLASS_INIT_NAME, CLOSURE_CLASS_HANDLE_METHOD},
};

pub const CLOSURE_CLASS_PREFIX: &str = "$Closure";
pub const PARENT_THIS_NAME: &str = "__parent_this";
pub const PARENT_SUPER_NAME: &str = "__parent_super";

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
///   init() {}
///   inflight handle(message: str) {
///     b.put("file.txt", message);
///   }
/// }
/// let f = new $Closure1();
/// ```
pub struct ClosureTransformer {
	// Whether the transformer is inside a preflight or inflight scope.
	// Only inflight closures defined in preflight scopes need to be transformed.
	phase: Phase,
	// Whether the transformer is inside a scope where "this" is valid.
	inside_scope_with_this: bool,
	// Helper state for generating unique class names
	closure_counter: usize,
	// Stores the list of class definitions that need to be added to the nearest scope
	class_statements: Vec<Stmt>,
	// Track the statement index of the nearest statement we're inside so that
	// newly-inserted classes will have access to the correct state
	nearest_stmt_idx: usize,
}

impl ClosureTransformer {
	pub fn new() -> Self {
		Self {
			phase: Phase::Preflight,
			inside_scope_with_this: false,
			closure_counter: 0,
			class_statements: vec![],
			nearest_stmt_idx: 0,
		}
	}
}

impl Fold for ClosureTransformer {
	fn fold_scope(&mut self, node: Scope) -> Scope {
		let mut statements = vec![];

		for stmt in node.statements {
			// TODO: can we remove "idx" from Stmt to avoid having to reason about this?
			// or add a compiler step that updates statement indices after folding?
			let old_nearest_stmt_idx = self.nearest_stmt_idx;
			self.nearest_stmt_idx = stmt.idx;
			let new_stmt = self.fold_stmt(stmt);
			self.nearest_stmt_idx = old_nearest_stmt_idx;

			// Add any new statements we have accumulated that define temporary classes
			statements.append(&mut self.class_statements);

			// Push the folded statement last. This way it has access to all of the temporary
			// classes we have defined.
			statements.push(new_stmt);

			// Reset scope-specific state
			self.class_statements.clear();
		}

		Scope {
			statements,
			span: node.span,
			env: node.env,
		}
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

				let new_class_name = Symbol {
					name: format!("{}{}", CLOSURE_CLASS_PREFIX, self.closure_counter),
					span: WingSpan::default(),
				};
				let handle_name = Symbol {
					name: CLOSURE_CLASS_HANDLE_METHOD.to_string(),
					span: WingSpan::default(),
				};

				let class_udt = UserDefinedType {
					root: new_class_name.clone(),
					fields: vec![],
					span: WingSpan::default(),
				};

				let class_type_annotation = TypeAnnotation {
					kind: TypeAnnotationKind::UserDefined(class_udt.clone()),
					span: WingSpan::default(),
				};

				let class_fields: Vec<ClassField> = vec![];
				let class_init_params: Vec<FunctionParameter> = vec![];

				let new_func_def = if self.inside_scope_with_this {
					// If we are inside a class, we transform inflight closures with an extra
					// `let __parent_this_${CLOSURE_COUNT} = this;` statement before the class definition, and replace references
					// to `this` with `__parent_this_${CLOSURE_COUNT}` so that they can access the parent class's fields.
					// We also handle `super` references by replacing them with `__parent_super_${CLOSURE_COUNT}`.
					let parent_this = format!("{}_{}", PARENT_THIS_NAME, self.closure_counter);
					let parent_super = format!("{}_{}", PARENT_SUPER_NAME, self.closure_counter);
					let mut this_transform = RenameThisTransformer {
						new_this: parent_this.as_str(),
						new_super: parent_super.as_str(),
						inside_class: false,
					};
					this_transform.fold_function_definition(func_def)
				} else {
					func_def
				};

				let new_func_def = FunctionDefinition {
					name: Some(handle_name.clone()),
					body: new_func_def.body,
					signature: new_func_def.signature,
					span: new_func_def.span,

					// Anonymous functions are always static -- since the function code is now an instance method on a class,
					// we need to set this to false.
					is_static: false,
				};

				// class_init_body :=
				// ```
				// this.display.hidden = true;
				// ```
				let class_init_body = vec![Stmt {
					idx: 0,
					kind: StmtKind::Assignment {
						variable: Expr::new(
							ExprKind::Reference(Reference::InstanceMember {
								object: Box::new(Expr::new(
									ExprKind::Reference(Reference::InstanceMember {
										object: Box::new(Expr::new(
											ExprKind::Reference(Reference::Identifier(Symbol::new("this", WingSpan::default()))),
											WingSpan::default(),
										)),
										property: Symbol::new("display", WingSpan::default()),
										optional_accessor: false,
									}),
									WingSpan::default(),
								)),
								property: Symbol::new("hidden", WingSpan::default()),
								optional_accessor: false,
							}),
							WingSpan::default(),
						),
						value: Expr::new(ExprKind::Literal(Literal::Boolean(true)), WingSpan::default()),
					},
					span: WingSpan::default(),
				}];

				// If we are inside a scope with "this", add define `let __parent_this_${CLOSURE_COUNT} = this` which can be
				// used by the newly-created preflight classes
				if self.inside_scope_with_this {
					let parent_this_name = Symbol::new(
						format!("{}_{}", PARENT_THIS_NAME, self.closure_counter),
						WingSpan::default(),
					);
					let parent_super_name = Symbol::new(
						format!("{}_{}", PARENT_SUPER_NAME, self.closure_counter),
						WingSpan::default(),
					);
					let parent_this_def = Stmt {
						kind: StmtKind::Let {
							reassignable: false,
							var_name: parent_this_name,
							initial_value: Expr::new(
								ExprKind::Reference(Reference::SelfRef {
									as_super: false,
									span: WingSpan::default(),
								}),
								WingSpan::default(),
							),
							type_: None,
						},
						span: WingSpan::default(),
						idx: 0,
					};
					let parent_super_def = Stmt {
						kind: StmtKind::Let {
							reassignable: false,
							var_name: parent_super_name,
							initial_value: Expr::new(
								ExprKind::Reference(Reference::SelfRef {
									as_super: true,
									span: WingSpan::default(),
								}),
								WingSpan::default(),
							),
							type_: None,
						},
						span: WingSpan::default(),
						idx: 0,
					};
					self.class_statements.push(parent_this_def);
					self.class_statements.push(parent_super_def);
				}

				// class_def :=
				// ```
				// class <new_class_name> {
				//   init(<class_init_params>) {<class_init_body>}
				//   inflight handle() {
				//     <transformed_def>
				//   }
				// }
				// ```
				let class_def = Stmt {
					kind: StmtKind::Class(Class {
						name: new_class_name.clone(),
						phase: Phase::Preflight,
						initializer: FunctionDefinition {
							name: Some(CLASS_INIT_NAME.into()),
							signature: FunctionSignature {
								parameters: class_init_params,
								return_type: Box::new(class_type_annotation.clone()),
								phase: Phase::Preflight,
							},
							is_static: true,
							body: FunctionBody::Statements(Scope::new(class_init_body, WingSpan::default())),
							span: WingSpan::default(),
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
									span: Default::default(),
								}),
								phase: Phase::Inflight,
							},
							is_static: false,
							body: FunctionBody::Statements(Scope::new(vec![], WingSpan::default())),
							span: WingSpan::default(),
						},
					}),
					idx: self.nearest_stmt_idx,
					span: WingSpan::default(),
				};

				// new_class_instance :=
				// ```
				// new <new_class_name>();
				// ```
				let new_class_instance = Expr::new(
					ExprKind::New {
						class: Box::new(class_udt.to_expression()),
						arg_list: ArgList {
							named_args: IndexMap::new(),
							pos_args: vec![],
							span: WingSpan::default(),
						},
						obj_id: None,
						obj_scope: None,
					},
					expr.span.clone(), // <<-- span of original expression
				);

				self.class_statements.push(class_def);

				new_class_instance
			}
			_ => fold::fold_expr(self, expr),
		}
	}
}

/// Rename all references to `this`/`super` inside an inflight closure to a new name.
struct RenameThisTransformer<'a> {
	new_this: &'a str,
	new_super: &'a str,
	// The transform shouldn't change references to `this` inside inflight classes since
	// they refer to different objects.
	inside_class: bool,
}

impl Default for RenameThisTransformer<'_> {
	fn default() -> Self {
		Self {
			new_this: PARENT_THIS_NAME,
			new_super: PARENT_SUPER_NAME,
			inside_class: false,
		}
	}
}

impl<'a> Fold for RenameThisTransformer<'a> {
	fn fold_class(&mut self, node: Class) -> Class {
		let old_inside_class = self.inside_class;
		self.inside_class = true;
		let new_class = fold::fold_class(self, node);
		self.inside_class = old_inside_class;
		new_class
	}

	fn fold_reference(&mut self, node: Reference) -> Reference {
		if self.inside_class {
			return fold::fold_reference(self, node);
		}
		match node {
			Reference::SelfRef { as_super, span } => Reference::Identifier(Symbol {
				name: if as_super {
					self.new_super.to_string()
				} else {
					self.new_this.to_string()
				},
				span,
			}),
			_ => fold::fold_reference(self, node),
		}
	}
}
