use std::cell::RefCell;

use indexmap::IndexMap;

use crate::{
	ast::{
		ArgList, Class, ClassField, Expr, ExprKind, FunctionDefinition, FunctionParameter, FunctionSignature, Initializer,
		Phase, Reference, Scope, Stmt, StmtKind, Symbol, TypeAnnotation, TypeAnnotationKind, UserDefinedType,
	},
	diagnostic::WingSpan,
	fold::{self, Fold},
};

const PARENT_THIS_NAME: &str = "__parent_this";

/// Transforms inflight closures defined in preflight scopes into preflight classes.
///
/// This is done by wrapping the closure's code in a preflight class with a single method,
/// and replacing the closure with a reference to an instance of that class.
/// The class is given a unique name to avoid collisions.
///
/// For example, the following code:
/// ```wing
/// let b = new cloud.Bucket();
/// let f = inflight (message: str) => {
///   b.put("file.txt", message);
/// };
/// ```
/// is transformed into:
/// ```wing
/// let b = new cloud.Bucket();
/// class $Inflight1 {
///   init() {}
///   inflight handle(message: str) {
///     b.put("file.txt", message);
///   }
/// }
/// let f = new $Inflight1();
pub struct ClosureTransformer {
	// Whether the transformer is inside a preflight or inflight scope.
	// Only inflight closures defined in preflight scopes need to be transformed.
	phase: Phase,
	// Whether the transformer is inside a scope where "this" is valid.
	inside_scope_with_this: bool,
	// Helper state for generating unique class names
	inflight_counter: usize,
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
			inflight_counter: 0,
			class_statements: vec![],
			nearest_stmt_idx: 0,
		}
	}
}

impl Fold for ClosureTransformer {
	fn fold_scope(&mut self, node: Scope) -> Scope {
		let mut statements = vec![];

		// If we are inside a scope with "this", add define `let __parent_this = this` which can be
		// used by the newly-created preflight classes
		if self.inside_scope_with_this {
			let parent_this_name = Symbol::global(PARENT_THIS_NAME); // TODO: can we use a span?
			let this_name = Symbol::global("this"); // TODO: can we use a span?
			let parent_this_def = Stmt {
				kind: StmtKind::VariableDef {
					reassignable: false,
					var_name: parent_this_name,
					initial_value: Expr {
						kind: ExprKind::Reference(Reference::Identifier(this_name)),
						span: WingSpan::default(),          // TODO: can we use a span?
						evaluated_type: RefCell::new(None), // thank god we have type reference
					},
					type_: None,
				},
				span: WingSpan::default(), // TODO: can we use a span?
				idx: 0,
			};

			statements.push(parent_this_def);
		}

		for stmt in node.statements {
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

		let new_node = fold::fold_function_definition(self, node);

		self.phase = prev_phase;
		new_node
	}

	fn fold_class(&mut self, node: Class) -> Class {
		Class {
			name: self.fold_symbol(node.name),
			fields: node
				.fields
				.into_iter()
				.map(|field| self.fold_class_field(field))
				.collect(),
			methods: node
				.methods
				.into_iter()
				.map(|(name, def)| {
					let new_symbol = self.fold_symbol(name);

					let new_def = if !def.is_static {
						let prev_inside_scope_with_this = self.inside_scope_with_this;
						self.inside_scope_with_this = true;
						let new_def = self.fold_function_definition(def);
						self.inside_scope_with_this = prev_inside_scope_with_this;
						new_def
					} else {
						self.fold_function_definition(def)
					};

					(new_symbol, new_def)
				})
				.collect(),
			initializer: {
				let prev_inside_scope_with_this = self.inside_scope_with_this;
				self.inside_scope_with_this = true;
				let new_constructor = self.fold_initializer(node.initializer);
				self.inside_scope_with_this = prev_inside_scope_with_this;
				new_constructor
			},
			parent: node.parent.map(|parent| self.fold_user_defined_type(parent)),
			implements: node
				.implements
				.into_iter()
				.map(|interface| self.fold_user_defined_type(interface))
				.collect(),
			is_resource: node.is_resource,
			inflight_initializer: node
				.inflight_initializer
				.map(|init| self.fold_function_definition(init)),
		}
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
				self.inflight_counter += 1;

				let new_class_name = Symbol {
					name: format!("$Inflight{}", self.inflight_counter),
					span: expr.span.clone(),
				};
				let handle_name = Symbol {
					name: "handle".to_string(),
					span: expr.span.clone(),
				};

				let class_type_annotation = TypeAnnotation {
					kind: TypeAnnotationKind::UserDefined(UserDefinedType {
						root: new_class_name.clone(),
						fields: vec![],
					}),
					span: expr.span.clone(),
				};

				let class_fields: Vec<ClassField> = vec![];
				let class_init_params: Vec<FunctionParameter> = vec![];

				let new_func_def = if self.inside_scope_with_this {
					// If we are inside a class, we transform inflight closures with an extra
					// `let __parent_this = this;` statement before the class definition, and replace all references
					// of `this` with `__parent_this` so that they can access the parent class's fields.
					let mut this_transform = RenameIdentifierTransformer {
						from: "this",
						to: PARENT_THIS_NAME,
					};
					this_transform.fold_function_definition(func_def)
				} else {
					func_def
				};

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
						is_resource: true,
						initializer: Initializer {
							signature: FunctionSignature {
								parameters: class_init_params,
								return_type: Some(Box::new(class_type_annotation.clone())),
								phase: Phase::Preflight,
							},
							statements: Scope::new(vec![], expr.span.clone()),
							span: expr.span.clone(),
						},
						fields: class_fields,
						implements: vec![],
						parent: None,
						methods: vec![(handle_name.clone(), new_func_def)],
						inflight_initializer: None,
					}),
					idx: self.nearest_stmt_idx,
					span: expr.span.clone(),
				};

				// new_class_instance :=
				// ```
				// new <new_class_name>();
				// ```
				let new_class_instance = Expr::new(
					ExprKind::New {
						class: class_type_annotation,
						arg_list: ArgList {
							named_args: IndexMap::new(),
							pos_args: vec![],
						},
						obj_id: None,
						obj_scope: None,
					},
					expr.span.clone(),
				);

				self.class_statements.push(class_def);

				new_class_instance
			}
			_ => fold::fold_expr(self, expr),
		}
	}
}

/// Rename all occurrences of an identifier to a new name.
struct RenameIdentifierTransformer<'a> {
	from: &'a str,
	to: &'a str,
}

impl<'a> Fold for RenameIdentifierTransformer<'a> {
	fn fold_reference(&mut self, node: Reference) -> Reference {
		match node {
			Reference::Identifier(ident) => {
				if ident.name == self.from {
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
