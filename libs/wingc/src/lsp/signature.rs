use std::cmp::max;

use lsp_types::{ParameterInformation, ParameterLabel, Position, SignatureHelp, SignatureInformation};
use tree_sitter::Point;

use crate::ast::{Expr, ExprKind};
use crate::diagnostic::{WingLocation, WingSpan};
use crate::lsp::sync::FILES;

use crate::visit::{visit_expr, Visit};
use crate::wasm_util::{ptr_to_string, string_to_combined_ptr, WASM_RETURN_ERROR};

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
	FILES.with(|files| {
		let files = files.borrow();
		let uri = params.text_document_position_params.text_document.uri;
		let result = files.get(&uri).expect("File must be open to get completions");

		let root_scope = &result.scope;

		let point = Point::new(
			params.text_document_position_params.position.line as usize,
			max(params.text_document_position_params.position.character as i64, 0) as usize,
		);

		let file = uri.to_file_path().ok().expect("LSP only works on real filesystems");

		let wing_location = WingLocation {
			col: point.column as u32,
			line: point.row as u32,
		};

		let mut scope_visitor = ScopeVisitor::new(WingSpan {
			start: wing_location,
			end: wing_location,
			file_id: file.to_str().expect("File path must be valid utf8").to_string(),
		});
		scope_visitor.visit_scope(root_scope);

		if let Some(expr) = scope_visitor.call_expr {
			if let ExprKind::Call { callee, arg_list: _ } = &expr.kind {
				let t = callee.evaluated_type.borrow();
				let t = t.as_ref().unwrap();
				let sig = t.as_function_sig().unwrap();
				let signature_info = SignatureInformation {
					label: format!(
						"{}({})",
						t.to_string(),
						sig
							.parameters
							.iter()
							.map(|p| p.to_string())
							.collect::<Vec<String>>()
							.join(", ")
					),
					documentation: None,
					parameters: Some(
						sig
							.parameters
							.iter()
							.map(|p| ParameterInformation {
								label: ParameterLabel::Simple(p.to_string()),
								documentation: None,
							})
							.collect(),
					),
					active_parameter: None,
				};

				return Some(SignatureHelp {
					signatures: vec![signature_info],
					active_signature: None,
					active_parameter: None,
				});
			}
		}

		None
	})
}

/// This visitor is used to find the scope
/// and relevant expression that contains a given location.
pub struct ScopeVisitor<'a> {
	/// The target location we're looking for
	pub location: WingSpan,
	/// The nearest expression before (or containing) the target location
	pub call_expr: Option<&'a Expr>,
}

impl<'a> ScopeVisitor<'a> {
	pub fn new(location: WingSpan) -> Self {
		Self {
			location,
			call_expr: None,
		}
	}
}

impl<'a> Visit<'a> for ScopeVisitor<'a> {
	fn visit_expr(&mut self, node: &'a Expr) {
		// We want to find the nearest expression to our target location
		// i.e we want the expression that is to the left of it
		if node.span.contains(&Position {
			character: self.location.start.col,
			line: self.location.start.line,
		}) {
			match node.kind {
				ExprKind::Call { .. } | ExprKind::New { .. } => {
					self.call_expr = Some(node);
				}
				_ => {}
			}
		}

		visit_expr(self, node);
	}
}
