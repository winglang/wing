use indexmap::IndexMap;

use crate::{
	ast::{
		ArgList, CalleeKind, Class, ClassField, Expr, ExprKind, FunctionBody, FunctionDefinition, FunctionParameter,
		FunctionSignature, Literal, NewExpr, Phase, Reference, Scope, Stmt, StmtKind, Symbol, TypeAnnotation,
		TypeAnnotationKind, UserDefinedType,
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
			id: node.id,
			statements,
			span: node.span,
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

				let new_func_def = if self.inside_scope_with_this {
					// If we are inside a class, we transform inflight closures with an extra
					// `let __parent_this_${CLOSURE_COUNT} = this;` statement before the class definition, and replace references
					// to `this` with `__parent_this_${CLOSURE_COUNT}` so that they can access the parent class's fields.
					let parent_this = format!("{}_{}", PARENT_THIS_NAME, self.closure_counter);
					let mut this_transform = RenameThisTransformer {
						from: "this",
						to: parent_this.as_str(),
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
				// std.Node.of(this).hidden = true;
				// ```
				let std_display_of_this = Expr::new(
					ExprKind::Call {
						callee: CalleeKind::Expr(Box::new(Expr::new(
							ExprKind::Reference(Reference::TypeMember {
								type_name: UserDefinedType {
									root: Symbol::new("std", WingSpan::for_file(file_id)),
									fields: vec![Symbol::new("Node", WingSpan::for_file(file_id))],
									span: WingSpan::for_file(file_id),
								},
								property: Symbol::new("of", WingSpan::for_file(file_id)),
							}),
							WingSpan::for_file(file_id),
						))),
						arg_list: ArgList {
							named_args: IndexMap::new(),
							pos_args: vec![Expr::new(
								ExprKind::Reference(Reference::Identifier(Symbol::new("this", WingSpan::for_file(file_id)))),
								WingSpan::for_file(file_id),
							)],
							span: WingSpan::for_file(file_id),
						},
					},
					WingSpan::for_file(file_id),
				);
				let class_init_body = vec![Stmt {
					idx: 0,
					kind: StmtKind::Assignment {
						variable: Reference::InstanceMember {
							object: Box::new(std_display_of_this),
							property: Symbol::new("hidden", WingSpan::for_file(file_id)),
							optional_accessor: false,
						},

						value: Expr::new(ExprKind::Literal(Literal::Boolean(true)), WingSpan::for_file(file_id)),
					},
					span: WingSpan::for_file(file_id),
				}];

				// If we are inside a scope with "this", add define `let __parent_this_${CLOSURE_COUNT} = this` which can be
				// used by the newly-created preflight classes
				if self.inside_scope_with_this {
					let parent_this_name = Symbol::new(
						format!("{}_{}", PARENT_THIS_NAME, self.closure_counter),
						WingSpan::for_file(file_id),
					);
					let this_name = Symbol::new("this", WingSpan::for_file(file_id));
					let parent_this_def = Stmt {
						kind: StmtKind::Let {
							reassignable: false,
							var_name: parent_this_name,
							initial_value: Expr::new(
								ExprKind::Reference(Reference::Identifier(this_name)),
								WingSpan::for_file(file_id),
							),
							type_: None,
						},
						span: WingSpan::for_file(file_id),
						idx: 0,
					};
					self.class_statements.push(parent_this_def);
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
							body: FunctionBody::Statements(Scope::new(class_init_body, WingSpan::for_file(file_id))),
							span: WingSpan::for_file(file_id),
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
							body: FunctionBody::Statements(Scope::new(vec![], WingSpan::for_file(file_id))),
							span: WingSpan::for_file(file_id),
						},
					}),
					idx: self.nearest_stmt_idx,
					span: WingSpan::for_file(file_id),
				};

				// new_class_instance :=
				// ```
				// new <new_class_name>();
				// ```
				let new_class_instance = Expr::new(
					ExprKind::New(NewExpr {
						class: class_udt,
						arg_list: ArgList {
							named_args: IndexMap::new(),
							pos_args: vec![],
							span: WingSpan::for_file(file_id),
						},
						obj_id: None,
						obj_scope: None,
					}),
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
	// The transform shouldn't change references to `this` inside inflight classes since
	// they refer to different objects.
	inside_class: bool,
}

impl Default for RenameThisTransformer<'_> {
	fn default() -> Self {
		Self {
			from: "this",
			to: PARENT_THIS_NAME,
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
		match node {
			Reference::Identifier(ident) => {
				if !self.inside_class && ident.name == self.from {
					Reference::Identifier(Symbol {
						name: self.to.to_string(),
						span: ident.span,
					})
				} else {
					Reference::Identifier(ident)
				}
			}
			Reference::InstanceMember { .. } | Reference::TypeMember { .. } => fold::fold_reference(self, node),
		}
	}
}
