use std::cell::RefCell;

use indexmap::{IndexMap, IndexSet};

use crate::{
	ast::{
		ArgList, CatchBlock, Class, ClassField, Constructor, Expr, ExprKind, FunctionBody, FunctionDefinition,
		FunctionParameter, FunctionSignature, Phase, Reference, Scope, Stmt, StmtKind, Symbol, TypeAnnotation,
		UserDefinedType, UtilityFunctions,
	},
	fold::{self, Fold},
	type_check::SymbolKind,
};

pub struct InflightTransformer {
	curr_phase: Phase,
}

impl InflightTransformer {
	pub fn new() -> Self {
		Self {
			curr_phase: Phase::Preflight,
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
				let resource_name = Symbol {
					name: "$Resource1".to_string(),
					span: expr.span.clone(),
				};
				let handle_name = Symbol {
					name: "handle".to_string(),
					span: expr.span.clone(),
				};

				let resource_type_annotation = TypeAnnotation::UserDefined(UserDefinedType {
					root: resource_name.clone(),
					fields: vec![],
				});

				let mut free_var_transformer = FreeVariableTransformer::new(vec![
					Symbol::global(UtilityFunctions::Log.to_string()),
					Symbol::global(UtilityFunctions::Assert.to_string()),
					Symbol::global(UtilityFunctions::Throw.to_string()),
					Symbol::global(UtilityFunctions::Panic.to_string()),
				]);
				let (transformed_def, free_vars) = free_var_transformer.transform_def(def);

				let mut resource_fields: Vec<ClassField> = vec![];
				let mut resource_init_params: Vec<FunctionParameter> = vec![];
				for var in free_vars.iter() {
					if let FunctionBody::Statements(scope) = &transformed_def.body {
						// look up the type of the free variable in the function's environment
						let env = scope.env.borrow();
						let (result, extra_info) = env
							.as_ref()
							.unwrap()
							.lookup_ext(&var, None)
							.expect("free variable not found in environment");

						assert!(
							extra_info.phase == Phase::Preflight,
							"free variable didn't come from preflight scope"
						);

						match result {
							SymbolKind::Variable(var_info) => {
								let type_annotation: TypeAnnotation = var_info.type_.try_into().unwrap();
								resource_init_params.push(FunctionParameter {
									name: var.clone(),
									type_annotation: type_annotation.clone(),
									reassignable: false,
								});
								resource_fields.push(ClassField {
									name: var.clone(),
									is_static: false,
									member_type: type_annotation,
									phase: Phase::Preflight,
									reassignable: false,
								});
							}
							SymbolKind::Type(_) => continue,
							SymbolKind::Namespace(_) => continue,
						}
					}
				}

				// resource_def = resource {
				//   <resource_fields>
				//   init(<resource_init_params>) {<resource_init_body>}
				//   inflight handle() {
				//     <transformed_def>
				//   }
				// }
				let resource_def = Stmt {
					kind: StmtKind::Class(Class {
						name: resource_name.clone(),
						is_resource: true,
						constructor: Constructor {
							signature: FunctionSignature {
								parameters: resource_init_params,
								return_type: Some(Box::new(resource_type_annotation.clone())),
								phase: Phase::Preflight,
							},
							statements: Scope::new(vec![], expr.span.clone()),
						},
						fields: resource_fields,
						implements: vec![],
						parent: None,
						methods: vec![(handle_name.clone(), transformed_def)],
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
								pos_args: free_vars
									.iter()
									.map(|var| {
										Expr::new(
											ExprKind::Reference(Reference::Identifier(var.clone())),
											expr.span.clone(),
										)
									})
									.collect(),
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
							return_type: Some(Box::new(TypeAnnotation::Resource)),
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
						arg_list: ArgList::new(),
						callee: Box::new(make_resource_closure),
					},
					expr.span,
				);
				call_expr
			}
			_ => fold::fold_expr(self, expr),
		}
	}
}

// AST transform that rewrites all free variables in a scope to be
// prefixed with "this.".
struct FreeVariableTransformer {
	bound_vars: Vec<Symbol>,
	free_vars: IndexSet<Symbol>,
}

impl FreeVariableTransformer {
	pub fn new(globals: Vec<Symbol>) -> Self {
		Self {
			bound_vars: globals,
			free_vars: IndexSet::new(),
		}
	}

	pub fn transform_def(&mut self, def: FunctionDefinition) -> (FunctionDefinition, Vec<Symbol>) {
		let new_def = self.fold_function_definition(def);
		let free_vars = self.free_vars.iter().cloned().collect();
		(new_def, free_vars)
	}
}

impl Fold for FreeVariableTransformer {
	fn fold_reference(&mut self, node: Reference) -> Reference {
		if let Reference::Identifier(ref x) = node {
			if self.bound_vars.contains(x) {
				return node;
			} else {
				self.free_vars.insert(x.clone());
				return Reference::InstanceMember {
					object: Box::new(Expr::new(
						ExprKind::Reference(Reference::Identifier(Symbol {
							name: "this".to_string(),
							span: x.span.clone(),
						})),
						x.span.clone(),
					)),
					property: x.clone(),
				};
			}
		};

		return fold::fold_reference(self, node);
	}

	// invariant: adds net zero bound variables
	fn fold_scope(&mut self, scope: Scope) -> Scope {
		let old_bound_vars = self.bound_vars.clone();
		let new_scope = fold::fold_scope(self, scope);
		self.bound_vars = old_bound_vars;
		new_scope
	}

	fn fold_stmt(&mut self, stmt: Stmt) -> Stmt {
		let kind = match stmt.kind {
			// this statement introduces bound variables!
			StmtKind::Bring {
				module_name,
				identifier,
			} => {
				let new_module_name = self.fold_symbol(module_name);
				// bring cloud;
				if !(new_module_name.name.starts_with('"') && new_module_name.name.ends_with('"')) {
					// add `cloud` to the list of bound variables
					self.bound_vars.push(new_module_name.clone());
				}

				let new_identifier = identifier.map(|id| self.fold_symbol(id));
				// bring "foo" as bar;
				if let Some(ref id) = new_identifier {
					// add `bar` to the list of bound variables
					self.bound_vars.push(id.clone());
				}

				StmtKind::Bring {
					module_name: new_module_name,
					identifier: new_identifier,
				}
			}
			// this statement introduces bound variables!
			StmtKind::VariableDef {
				reassignable,
				var_name,
				initial_value,
				type_,
			} => {
				let new_var_name = self.fold_symbol(var_name);
				let new_initial_value = self.fold_expr(initial_value);
				let new_type = type_.map(|type_| self.fold_type_annotation(type_));
				self.bound_vars.push(new_var_name.clone());
				StmtKind::VariableDef {
					reassignable,
					var_name: new_var_name,
					initial_value: new_initial_value,
					type_: new_type,
				}
			}
			// invariant: adds net zero bound variables
			StmtKind::ForLoop {
				iterator,
				iterable,
				statements,
			} => {
				let new_iterator = self.fold_symbol(iterator);
				let new_iterable = self.fold_expr(iterable);
				self.bound_vars.push(new_iterator.clone());
				let new_statements = self.fold_scope(statements);
				self.bound_vars.pop();
				StmtKind::ForLoop {
					iterator: new_iterator,
					iterable: new_iterable,
					statements: new_statements,
				}
			}
			// invariant: adds net zero bound variables
			StmtKind::TryCatch {
				try_statements,
				catch_block,
				finally_statements,
			} => {
				let new_try_statements = self.fold_scope(try_statements);
				let new_catch_block = catch_block.map(|cb| {
					let new_exception_var = cb.exception_var.map(|var| self.fold_symbol(var));
					if let Some(ref var) = new_exception_var {
						self.bound_vars.push(var.clone());
					}
					let new_catch_statements = self.fold_scope(cb.statements);
					if new_exception_var.is_some() {
						self.bound_vars.pop();
					}
					CatchBlock {
						exception_var: new_exception_var,
						statements: new_catch_statements,
					}
				});
				let new_finally_statements = finally_statements.map(|stmts| self.fold_scope(stmts));
				StmtKind::TryCatch {
					try_statements: new_try_statements,
					catch_block: new_catch_block,
					finally_statements: new_finally_statements,
				}
			}
			_ => return fold::fold_stmt(self, stmt),
		};

		Stmt {
			kind,
			idx: stmt.idx,
			span: stmt.span,
		}
	}

	// invariant: adds net zero bound variables
	fn fold_function_definition(&mut self, node: FunctionDefinition) -> FunctionDefinition {
		let FunctionDefinition {
			signature,
			body,
			captures,
			is_static,
			span,
		} = node;

		let new_function_signature = self.fold_function_signature(signature);

		// TODO: what to do about "this"?

		for param in &new_function_signature.parameters {
			self.bound_vars.push(param.name.clone());
		}

		let new_body = match body {
			FunctionBody::Statements(statements) => {
				let new_statements = self.fold_scope(statements);
				FunctionBody::Statements(new_statements)
			}
			FunctionBody::External(s) => FunctionBody::External(s),
		};

		for _ in &new_function_signature.parameters {
			self.bound_vars.pop();
		}

		FunctionDefinition {
			signature: new_function_signature,
			body: new_body,
			captures,
			is_static,
			span,
		}
	}
}
