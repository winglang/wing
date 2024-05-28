use itertools::Itertools;
use lsp_types::{
	Documentation, MarkupContent, MarkupKind, ParameterInformation, ParameterLabel, Position, SignatureHelp,
	SignatureInformation,
};

use crate::ast::{CalleeKind, Class, Expr, ExprKind, New, Stmt, StmtKind, Symbol};
use crate::docs::{render_summary, Documented};
use crate::jsify::codemaker::CodeMaker;
use crate::lsp::sync::PROJECT_DATA;
use crate::lsp::sync::WING_TYPES;

use crate::type_check::symbol_env::SymbolEnvRef;
use crate::type_check::{
	resolve_super_method, resolve_user_defined_type, TypeRef, Types, CLASS_INFLIGHT_INIT_NAME, CLASS_INIT_NAME,
};
use crate::visit::{visit_expr, visit_scope, visit_stmt, Visit};
use crate::wasm_util::extern_json_fn;

use super::sync::check_utf8;

#[no_mangle]
pub unsafe extern "C" fn wingc_on_signature_help(ptr: u32, len: u32) -> u64 {
	extern_json_fn(ptr, len, on_signature_help)
}

pub fn on_signature_help(params: lsp_types::SignatureHelpParams) -> Option<SignatureHelp> {
	WING_TYPES.with(|types| {
		let types = types.borrow_mut();
		PROJECT_DATA.with(|project_data| {
			let project_data = project_data.borrow();
			let uri = params.text_document_position_params.text_document.uri;
			let file = check_utf8(uri.to_file_path().ok().expect("LSP only works on real filesystems"));
			let ast = project_data.asts.get(&file).unwrap();
			let root_scope = ast.root();

			let mut scope_visitor = ScopeVisitor::new(ast, &types, params.text_document_position_params.position);
			scope_visitor.visit_scope(root_scope);

			let sig_data: (TypeRef, &crate::ast::ArgList) = if scope_visitor.call_stmt.is_some() {
				let stmt = scope_visitor.call_stmt?;
				let class = scope_visitor.class?;

				match &stmt.kind {
					StmtKind::SuperConstructor { arg_list } => {
						if let Some(p) = &class.parent {
							let t = resolve_user_defined_type(&p, &types.get_scope_env(ast, root_scope.id), 0).ok()?;
							let init_lookup = t.as_class()?.env.lookup(
								&if t.is_preflight_class() {
									CLASS_INIT_NAME
								} else {
									CLASS_INFLIGHT_INIT_NAME
								}
								.into(),
								None,
							);

							(init_lookup?.as_variable()?.type_, arg_list)
						} else {
							return None;
						}
					}
					_ => return None,
				}
			} else {
				let expr = scope_visitor.call_expr?;
				let env = scope_visitor.call_env?;
				match &expr.kind {
					ExprKind::New(new_expr) => {
						let New { class, arg_list, .. } = new_expr;

						let Some(t) = resolve_user_defined_type(class, &types.get_scope_env(ast, root_scope.id), 0).ok() else {
							return None;
						};

						let init_lookup = t.as_class()?.env.lookup(
							&Symbol {
								name: CLASS_INIT_NAME.into(),
								span: Default::default(),
							},
							None,
						);

						(init_lookup?.as_variable()?.type_, arg_list)
					}
					ExprKind::Call { callee, arg_list } => {
						let t = match callee {
							CalleeKind::Expr(expr) => types.get_expr_type(expr),
							CalleeKind::SuperCall(method) => resolve_super_method(method, &env, &types)
								.ok()
								.map_or(types.error(), |t| t.0),
						};

						(t, arg_list)
					}
					_ => return None,
				}
			};

			let sig = sig_data.0.as_function_sig()?;
			let provided_args = sig_data.1;

			let positional_arg_pos = provided_args
				.pos_args
				.iter()
				.enumerate()
				.filter(|(_, arg)| params.text_document_position_params.position <= arg.span.end.into())
				.count();
			let named_arg_pos = provided_args.named_args.iter().find(|arg| {
				arg
					.1
					.span
					.contains_lsp_position(&params.text_document_position_params.position)
			});

			let param_data = sig
				.parameters
				.iter()
				.enumerate()
				.map(|p| {
					if p.0 == sig.parameters.len() - 1 && p.1.typeref.maybe_unwrap_option().is_struct() {
						format!("...{}", p.1.name)
					} else {
						format!("{}: {}", p.1.name, p.1.typeref)
					}
				})
				.collect_vec();

			let active_parameter = if named_arg_pos.is_some() {
				sig.parameters.len() - 1
			} else {
				provided_args.pos_args.len() - positional_arg_pos
			}
			.min(if param_data.is_empty() { 0 } else { param_data.len() - 1 });

			let param_text = param_data.join(", ");
			let label = format!("({}): {}", param_text, sig.return_type);

			let mut sig_docs = CodeMaker::default();
			if let Some(d) = sig_data.0.docs() {
				render_summary(&mut sig_docs, d);
			}
			let sig_docs = sig_docs.to_string();

			let signature_info = SignatureInformation {
				label,
				documentation: Some(Documentation::MarkupContent(MarkupContent {
					kind: MarkupKind::Markdown,
					value: sig_docs.to_string(),
				})),
				parameters: Some(
					sig
						.parameters
						.iter()
						.enumerate()
						.map(|p| {
							let last_arg = p.0 == sig.parameters.len() - 1;
							let p_type = p.1.typeref;
							let structy = p_type.maybe_unwrap_option();
							let structy = structy.as_struct();

							let docstring = p.1.docs.render();
							let p_docs = if docstring.is_empty() {
								None
							} else {
								Some(Documentation::MarkupContent(MarkupContent {
									kind: MarkupKind::Markdown,
									value: if sig_docs.is_empty() {
										docstring
									} else {
										format!("{docstring}\n\n")
									},
								}))
							};

							ParameterInformation {
								label: if last_arg && structy.is_some() {
									ParameterLabel::Simple(format!("...{}", p.1.name))
								} else {
									ParameterLabel::Simple(param_data.get(p.0).unwrap_or(&format!("{}: {}", p.0, p_type)).clone())
								},
								documentation: if structy.is_some() {
									//check if this is the last arg, allowing for expansion syntax
									if p.0 == sig.parameters.len() - 1 {
										Some(Documentation::MarkupContent(MarkupContent {
											kind: MarkupKind::Markdown,
											value: format!("```wing\n{}\n```\n", p_type.render_docs()),
										}))
									} else {
										p_docs
									}
								} else {
									p_docs
								},
							}
						})
						.collect(),
				),

				active_parameter: Some(active_parameter as u32),
			};

			Some(SignatureHelp {
				signatures: vec![signature_info],
				active_signature: None,
				active_parameter: None,
			})
		})
	})
}

/// This visitor is used to find the scope
/// and relevant expression that contains a given location.
pub struct ScopeVisitor<'a> {
	/// The AST we're visiting
	pub ast: &'a Ast,
	/// The type system
	types: &'a Types,
	/// The target location we're looking for
	pub location: Position,
	/// The nearest expression before (or containing) the target location
	pub call_expr: Option<&'a Expr>,
	/// The nearest statement before (or containing) the target location - on a case we're on a super() call
	pub call_stmt: Option<&'a Stmt>,
	// The env of the found expression
	pub call_env: Option<SymbolEnvRef>,
	/// The current symbol env we're in
	curr_env: Vec<SymbolEnvRef>,
	/// the nearest class containing the call_stmt
	pub class: Option<&'a Class>,
}

impl<'a> ScopeVisitor<'a> {
	pub fn new(ast: &'a Ast, types: &'a Types, location: Position) -> Self {
		Self {
			ast,
			types,
			location,
			call_expr: None,
			call_stmt: None,
			call_env: None,
			class: None,
			curr_env: vec![],
		}
	}
}

impl<'a> Visit<'a> for ScopeVisitor<'a> {
	fn ast(&self) -> &'a Ast {
		self.ast
	}

	fn visit_expr(&mut self, node: &'a Expr) {
		visit_expr(self, node);

		if self.call_expr.is_some() || self.call_stmt.is_some() {
			return;
		}

		if node.span.contains_lsp_position(&self.location) {
			match node.kind {
				ExprKind::Call { .. } | ExprKind::New { .. } => {
					self.call_expr = Some(node);
					self.call_env = Some(*self.curr_env.last().unwrap());
				}
				_ => {}
			}
		}
	}

	fn visit_stmt(&mut self, node: &'a Stmt) {
		visit_stmt(self, node);

		if self.call_expr.is_some() || (self.call_stmt.is_some() && self.class.is_some()) {
			return;
		}

		if node.span.contains_lsp_position(&self.location) {
			match &node.kind {
				StmtKind::SuperConstructor { .. } => {
					self.call_stmt = Some(node);
				}
				StmtKind::Class(c) => {
					self.class = Some(c);
				}
				_ => {}
			}
		}
	}

	fn visit_scope(&mut self, node: &'a crate::ast::Scope) {
		let env = self.types.get_scope_env(self.ast, node.id);
		self.curr_env.push(env);
		visit_scope(self, node);
		self.curr_env.pop();
	}
}

#[cfg(test)]
mod tests {
	use crate::lsp::signature::*;
	use crate::lsp::sync::test_utils::*;
	use lsp_types::*;

	/// Creates a snapshot test for a given wing program's signature at a given position
	/// In the wing program, place a comment "//^" into the text where the "^" is pointing to the desired character position
	///
	/// First parameter will be the name of the tests, as well as the identifier to use for the list of completion in the asserts (see last parameter)
	/// Second parameter is the wing code block as a string literal
	/// After the first two parameters, any additional are optional statements that should be used for asserting on the given completions.
	///
	/// Result is a list of [CompletionItem]s
	macro_rules! test_signature {
		($name:ident, $code:literal, $($assertion:stmt)*) => {
			#[test]
			fn $name() {
				let text_document_position = load_file_with_contents($code);
				let sig = on_signature_help(SignatureHelpParams {
					context: None,
					text_document_position_params: TextDocumentPositionParams {
						text_document: text_document_position.text_document.clone(),
						position: Position {
							line: text_document_position.position.line,
							character: text_document_position.position.character,
						},
					},
					work_done_progress_params: Default::default(),
				});

				if let Some($name) = sig {
					insta::with_settings!(
						{
							prepend_module_to_snapshot => false,
							omit_expression => true,
							snapshot_path => "./snapshots/signature",
						}, {
							insta::assert_yaml_snapshot!($name);
						}
					);
					$($assertion)*
				}
			}
		};
	}

	test_signature!(empty, "", assert!(false));

	test_signature!(
		second_arg_active,
		r#"
bring cloud;
let bucket = new cloud.Bucket();
bucket.addObject("key", )
                     //^
"#,
	);

	test_signature!(
		named_arg_active,
		r#"
bring cloud;
let bucket = new cloud.Bucket();
bucket.onEvent(inflight () => {
  bucket.delete("", );
                 //^
});
"#,
	);

	test_signature!(
		constructor_arg,
		r#"
bring cloud;
let bucket = new cloud.Bucket( );
                            //^
"#,
	);

	test_signature!(
		nested_class_calls,
		r#"
bring http;

class T {
  inflight do() {
    this.handle(inflight (context: str): str => {
      http.get( )
             //^
      return "321";
    });
  }

  inflight handle(handler:  (str): str) {
    handler("123");
  }
}
"#,
	);

	test_signature!(
		class_super,
		r#"
    class Base {
      new(hello: num) {}
    }
    
    class Derived extends Base {
      new() {
        super( );
            //^
      }
    }
    
    new Derived();
"#,
	);

	test_signature!(
		inflight_class_super,
		r#"
    inflight class A {
      pub sound: str;
    
      inflight new(sound: str) {
        this.sound = sound;
      }
    }
    
    inflight class B extends A {
      inflight new(sound: str) {
        super( );
            //^
      }
    }
"#,
	);

	test_signature!(
		empty_super,
		r#"
    class A {}
    
    class B extends A {
      new() {
        super( );
            //^
      }
    }
"#,
	);
}
