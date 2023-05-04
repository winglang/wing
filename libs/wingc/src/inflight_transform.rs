use indexmap::IndexMap;

use crate::{
	ast::{
		ArgList, Class, ClassField, Expr, ExprKind, FunctionDefinition, FunctionParameter, FunctionSignature, Initializer,
		Phase, Reference, Scope, Stmt, StmtKind, Symbol, TypeAnnotation, TypeAnnotationKind, UserDefinedType,
	},
	fold::{self, Fold},
};

const PARENT_THIS_NAME: &str = "__parent_this";

/// Transforms inflight closures defined in preflight scopes into resources.
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
/// let f = ((): core.Resource => {
///   class $Inflight1 {
///     init() {}
///     inflight handle(message: str) {
///       b.put("file.txt", message);
///     }
///   }
///   return new $Inflight1();
/// })();
pub struct InflightTransformer {
	// Whether the transformer is inside a preflight or inflight scope.
	// Only inflight closures defined in preflight scopes need to be transformed.
	curr_phase: Phase,
	// Whether the transformer is inside a resource or not. If we are, we transform
	// inflight closures with an extra `let __parent_this = this;` statement so
	// that they can access the parent resource's fields.
	is_inside_resource: bool,
	// Helper state for generating unique class names for resources
	inflight_counter: usize,
}

impl InflightTransformer {
	pub fn new() -> Self {
		Self {
			curr_phase: Phase::Preflight,
			is_inside_resource: false,
			inflight_counter: 0,
		}
	}
}

impl Fold for InflightTransformer {
	fn fold_function_definition(&mut self, node: FunctionDefinition) -> FunctionDefinition {
		let prev_phase = self.curr_phase;
		self.curr_phase = node.signature.phase;
		let new_node = fold::fold_function_definition(self, node);
		self.curr_phase = prev_phase;
		new_node
	}

	fn fold_class(&mut self, node: Class) -> Class {
		let prev_is_inside_resource = self.is_inside_resource;
		self.is_inside_resource = true;
		let new_node = fold::fold_class(self, node);
		self.is_inside_resource = prev_is_inside_resource;
		new_node
	}

	fn fold_expr(&mut self, expr: Expr) -> Expr {
		// Inflight closures that are themselves defined inflight do not need
		// to be transformed, since they are not created in preflight.
		if self.curr_phase == Phase::Inflight {
			return expr;
		}

		// If we encounter a non-inflight closure, we can don't need to
		// transform it into a resource, but we still want to recurse
		// in case its body contains any inflight closures.
		if let ExprKind::FunctionClosure(ref func_def) = expr.kind {
			if func_def.signature.phase != Phase::Inflight {
				return fold::fold_expr(self, expr);
			}
		}

		match expr.kind {
			ExprKind::FunctionClosure(func_def) => {
				self.inflight_counter += 1;

				let resource_name = Symbol {
					name: format!("$Inflight{}", self.inflight_counter),
					span: expr.span.clone(),
				};
				let handle_name = Symbol {
					name: "handle".to_string(),
					span: expr.span.clone(),
				};
				let parent_this_name = Symbol {
					name: PARENT_THIS_NAME.to_string(),
					span: expr.span.clone(),
				};
				let this_name = Symbol {
					name: "this".to_string(),
					span: expr.span.clone(),
				};

				let resource_type_annotation = TypeAnnotation {
					kind: TypeAnnotationKind::UserDefined(UserDefinedType {
						root: resource_name.clone(),
						fields: vec![],
					}),
					span: expr.span.clone(),
				};

				let resource_fields: Vec<ClassField> = vec![];
				let resource_init_params: Vec<FunctionParameter> = vec![];

				let new_func_def = if self.is_inside_resource {
					// transform all occurrences of "this" into "__parent_this"
					let mut this_transform = ThisTransformer;
					this_transform.fold_function_definition(func_def)
				} else {
					func_def
				};

				// resource_def :=
				// ```
				// resource {
				//   init(<resource_init_params>) {<resource_init_body>}
				//   inflight handle() {
				//     <transformed_def>
				//   }
				// }
				// ```
				let resource_def = Stmt {
					kind: StmtKind::Class(Class {
						name: resource_name.clone(),
						is_resource: true,
						initializer: Initializer {
							signature: FunctionSignature {
								parameters: resource_init_params,
								return_type: Some(Box::new(resource_type_annotation.clone())),
								phase: Phase::Preflight,
							},
							statements: Scope::new(vec![], expr.span.clone()),
							span: expr.span.clone(),
						},
						fields: resource_fields,
						implements: vec![],
						parent: None,
						methods: vec![(handle_name.clone(), new_func_def)],
						inflight_initializer: None,
					}),
					idx: 1,
					span: expr.span.clone(),
				};

				// return_resource_instance :=
				// ```
				// return new <resource_name>();
				// ```
				let return_resource_instance = Stmt {
					kind: StmtKind::Return(Some(Expr::new(
						ExprKind::New {
							class: resource_type_annotation,
							arg_list: ArgList {
								named_args: IndexMap::new(),
								pos_args: vec![],
							},
							obj_id: None,
							obj_scope: None,
						},
						expr.span.clone(),
					))),
					idx: 2,
					span: expr.span.clone(),
				};

				// make_resource_body :=
				// ```
				// {
				//   <parent_this_def>? // only if we are inside a resource
				//   <resource_def>
				//   <return_resource_instance>
				// }
				// ```
				let make_resource_body = if self.is_inside_resource {
					// parent_this_def :=
					// ```
					// let __parent_this = this;
					// ```
					let parent_this_def = Stmt {
						kind: StmtKind::VariableDef {
							reassignable: false,
							var_name: parent_this_name,
							initial_value: Expr::new(ExprKind::Reference(Reference::Identifier(this_name)), expr.span.clone()),
							type_: None, // thank god we have type inference
						},
						idx: 0,
						span: expr.span.clone(),
					};

					Scope::new(
						vec![parent_this_def, resource_def, return_resource_instance],
						expr.span.clone(),
					)
				} else {
					Scope::new(vec![resource_def, return_resource_instance], expr.span.clone())
				};

				// make_resource_closure :=
				// ```
				// (): resource => { ...<make_resource_body> }
				// ```
				let make_resource_closure = Expr::new(
					ExprKind::FunctionClosure(FunctionDefinition {
						signature: FunctionSignature {
							parameters: vec![],
							return_type: Some(Box::new(TypeAnnotation {
								kind: TypeAnnotationKind::Resource,
								span: expr.span.clone(),
							})),
							phase: Phase::Preflight,
						},
						body: crate::ast::FunctionBody::Statements(make_resource_body),
						is_static: false,
						span: expr.span.clone(),
					}),
					expr.span.clone(),
				);

				// call_expr :=
				// ```
				// <make_resource_closure>()
				// ```
				let call_expr = Expr::new(
					ExprKind::Call {
						function: Box::new(make_resource_closure),
						arg_list: ArgList::new(),
					},
					expr.span,
				);
				call_expr
			}
			_ => fold::fold_expr(self, expr),
		}
	}
}

/// Transform usages of "this.<field>" into "__parent_this.<field>"
struct ThisTransformer;

impl Fold for ThisTransformer {
	fn fold_reference(&mut self, node: Reference) -> Reference {
		match node {
			Reference::Identifier(ident) => {
				if ident.name == "this" {
					Reference::Identifier(Symbol {
						name: PARENT_THIS_NAME.to_string(),
						span: ident.span,
					})
				} else {
					Reference::Identifier(ident)
				}
			}
			Reference::InstanceMember { .. } => fold::fold_reference(self, node),
			Reference::TypeMember { .. } => fold::fold_reference(self, node),
		}
	}
}
