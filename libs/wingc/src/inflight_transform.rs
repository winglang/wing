use std::cell::RefCell;

use indexmap::IndexMap;

use crate::{
	ast::{
		ArgList, Class, ClassField, Expr, ExprKind, FunctionDefinition, FunctionParameter, FunctionSignature, Initializer,
		Phase, Scope, Stmt, StmtKind, Symbol, TypeAnnotation, TypeAnnotationKind, UserDefinedType,
	},
	fold::{self, Fold},
};

pub struct InflightTransformer {
	curr_phase: Phase,
	// Helper state for generating unique class names for resources
	inflight_counter: RefCell<usize>,
}

impl InflightTransformer {
	pub fn new() -> Self {
		Self {
			curr_phase: Phase::Preflight,
			inflight_counter: RefCell::new(0),
		}
	}
}

impl Fold for InflightTransformer {
	fn fold_function_definition(&mut self, node: FunctionDefinition) -> FunctionDefinition {
		let old_phase = self.curr_phase;
		self.curr_phase = node.signature.phase;
		let new_node = fold::fold_function_definition(self, node);
		self.curr_phase = old_phase;
		new_node
	}

	fn fold_expr(&mut self, expr: Expr) -> Expr {
		// No preflight scopes can exist inside an inflight scope, so
		// we know that if we encounter any inflight closures, they won't
		// need to be transformed.
		if self.curr_phase == Phase::Inflight {
			return expr;
		}

		// If we encounter a non-inflight closure, we can don't need to
		// transform it into a resource, but we still want to recurse
		// in case its body contains any inflight closures.
		if let ExprKind::FunctionClosure(ref def) = expr.kind {
			if def.signature.phase != Phase::Inflight {
				return fold::fold_expr(self, expr);
			}
		}

		match expr.kind {
			ExprKind::FunctionClosure(def) => {
				let mut inflight_counter = self.inflight_counter.borrow_mut();
				*inflight_counter += 1;

				let resource_name = Symbol {
					name: format!("$Inflight{}", inflight_counter),
					span: expr.span.clone(),
				};
				let handle_name = Symbol {
					name: "handle".to_string(),
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

				// resource_def = resource {
				//   <resource_fields>
				//   init(<resource_init_params>) {<resource_init_body>}
				//   inflight handle() {
				//     <def>
				//   }
				// }
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
						methods: vec![(handle_name.clone(), def)],
						inflight_initializer: None,
					}),
					idx: 0,
					span: expr.span.clone(),
				};

				// return_resource_instance = return new <resource_name>();
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
					idx: 1,
					span: expr.span.clone(),
				};

				// make_resource_body = {
				//   <resource_def>
				//   <return_resource_instance>
				// }
				let make_resource_body = Scope::new(vec![resource_def, return_resource_instance], expr.span.clone());

				// make_resource_closure = (): resource => { ...<make_resource_body> }
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
						captures: RefCell::new(None),
						is_static: false,
						span: expr.span.clone(),
					}),
					expr.span.clone(),
				);

				// call_expr = <make_resource_closure>()
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
