use itertools::Itertools;
use lsp_types::{
	Documentation, MarkupContent, MarkupKind, ParameterInformation, ParameterLabel, Position, SignatureHelp,
	SignatureInformation,
};

use crate::ast::{CalleeKind, Expr, ExprKind, NewExpr, Symbol};
use crate::docs::Documented;
use crate::lsp::sync::PROJECT_DATA;
use crate::lsp::sync::WING_TYPES;

use crate::type_check::symbol_env::SymbolEnvRef;
use crate::type_check::{resolve_super_method, resolve_user_defined_type, Types, CLASS_INIT_NAME};
use crate::visit::{visit_expr, visit_scope, Visit};
use crate::wasm_util::{ptr_to_string, string_to_combined_ptr, WASM_RETURN_ERROR};

use super::sync::check_utf8;

#[no_mangle]
pub unsafe extern "C" fn wingc_on_signature_help(ptr: u32, len: u32) -> u64 {
	let parse_string = ptr_to_string(ptr, len);
	if let Ok(parsed) = serde_json::from_str(&parse_string) {
		let result = on_signature_help(parsed);
		let result = serde_json::to_string(&result).unwrap();

		// return result as u64 with ptr and len
		string_to_combined_ptr(result)
	} else {
		WASM_RETURN_ERROR
	}
}

pub fn on_signature_help(params: lsp_types::SignatureHelpParams) -> Option<SignatureHelp> {
	WING_TYPES.with(|types| {
		let types = types.borrow_mut();
		PROJECT_DATA.with(|project_data| {
			let project_data = project_data.borrow();
			let uri = params.text_document_position_params.text_document.uri;
			let file = check_utf8(uri.to_file_path().ok().expect("LSP only works on real filesystems"));
			let root_scope = &project_data.asts.get(&file).unwrap();

			let mut scope_visitor = ScopeVisitor::new(&types, params.text_document_position_params.position);
			scope_visitor.visit_scope(root_scope);
			let expr = scope_visitor.call_expr?;
			let env = scope_visitor.call_env?;

			let sig_data: (
				crate::type_check::UnsafeRef<crate::type_check::Type>,
				&crate::ast::ArgList,
			) = match &expr.kind {
				ExprKind::New(new_expr) => {
					let NewExpr { class, arg_list, .. } = new_expr;

					let Some(t) = resolve_user_defined_type(class, &types.get_scope_env(&root_scope), 0).ok() else {
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
			};

			let sig = sig_data.0.as_function_sig()?;
			let provided_args = sig_data.1;

			let positional_arg_pos = provided_args
				.pos_args
				.iter()
				.enumerate()
				.filter(|(_, arg)| params.text_document_position_params.position <= arg.span.end.into())
				.count();
			let named_arg_pos = provided_args
				.named_args
				.iter()
				.find(|arg| arg.1.span.contains(&params.text_document_position_params.position));

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
			.min(param_data.len() - 1)
			.max(0);

			let param_text = param_data.join(", ");
			let label = format!("({}): {}", param_text, sig.return_type);

			let signature_info = SignatureInformation {
				label,
				documentation: Some(Documentation::MarkupContent(MarkupContent {
					kind: MarkupKind::Markdown,
					value: sig_data.0.render_docs(),
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
							let p_docs = p_type.render_docs();
							let p_docs = if p_docs.is_empty() {
								None
							} else {
								Some(Documentation::MarkupContent(MarkupContent {
									kind: MarkupKind::Markdown,
									value: p_docs,
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
											value: p_type.render_docs(),
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
	types: &'a Types,
	/// The target location we're looking for
	pub location: Position,
	/// The nearest expression before (or containing) the target location
	pub call_expr: Option<&'a Expr>,
	// The env of the found expression
	pub call_env: Option<SymbolEnvRef>,
	/// The current symbol env we're in
	curr_env: Vec<SymbolEnvRef>,
}

impl<'a> ScopeVisitor<'a> {
	pub fn new(types: &'a Types, location: Position) -> Self {
		Self {
			types,
			location,
			call_expr: None,
			call_env: None,
			curr_env: vec![],
		}
	}
}

impl<'a> Visit<'a> for ScopeVisitor<'a> {
	fn visit_expr(&mut self, node: &'a Expr) {
		if self.call_expr.is_some() {
			return;
		}

		if node.span.contains(&self.location) {
			match node.kind {
				ExprKind::Call { .. } | ExprKind::New { .. } => {
					self.call_expr = Some(node);
					self.call_env = Some(*self.curr_env.last().unwrap());
				}
				_ => {}
			}
		}

		visit_expr(self, node);
	}

	fn visit_scope(&mut self, node: &'a crate::ast::Scope) {
		let env = self.types.get_scope_env(node);
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
});"#,
	);

	test_signature!(
		constructor_arg,
		r#"
bring cloud;
let bucket = new cloud.Bucket( );
                            //^"#,
	);
}
