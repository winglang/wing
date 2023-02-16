use lsp_types::{Hover, HoverContents, MarkupContent, MarkupKind};

use crate::lsp::ast_traversal::find_symbol;
use crate::lsp::sync::FILES;
use crate::{
	ast::ExprKind,
	wasm_util::{combine_ptr_and_length, ptr_to_string},
};

#[no_mangle]
pub unsafe extern "C" fn wingc_on_hover(ptr: u32, len: u32) -> u64 {
	let parse_string = ptr_to_string(ptr, len);
	if let Ok(parsed) = serde_json::from_str(&parse_string) {
		if let Some(token_result) = on_hover(parsed) {
			let result = serde_json::to_string(&token_result).unwrap();

			// return result as u64 with ptr and len
			let leaked = result.into_bytes().leak();
			combine_ptr_and_length(leaked.as_ptr() as u32, leaked.len() as u32)
		} else {
			0
		}
	} else {
		eprintln!("Failed to parse 'onHover' text document: {}", parse_string);
		0
	}
}
pub fn on_hover<'a>(params: lsp_types::HoverParams) -> Option<Hover> {
	FILES.with(|files| {
		let files = files.borrow();
		let files = files.read().unwrap();
		let parse_result = files.get(&params.text_document_position_params.text_document.uri.clone());
		let parse_result = parse_result.unwrap();

		let position = params.text_document_position_params.position;

		let root_scope = &parse_result.scope;
		let root_env_ref = root_scope.env.borrow();
		let root_env = root_env_ref.as_ref().unwrap();

		if let Some(symbol_context) = find_symbol(root_scope, &position) {
			let symbol = symbol_context.1;
			let expr = symbol_context.0.expression;
			let scope = symbol_context.0.scope;
			let symbol_name = &symbol.name;
			let expression_type = if let Some(expr) = expr {
				let t = expr.evaluated_type.borrow();
				t.clone()
			} else {
				None
			};
			let reference = if let Some(expr) = expr {
				if let ExprKind::Reference(reference) = &expr.kind {
					Some(reference)
				} else {
					None
				}
			} else {
				None
			};
			let span = if let Some(_) = reference {
				&expr.unwrap().span
			} else {
				&symbol.span
			};

			let env_ref = scope.env.borrow();
			let env = env_ref.as_ref().unwrap();

			let mut symbol_lookup = env.lookup_ext(symbol, None);
			if symbol_lookup.is_err() {
				// There is a bug with the .parent of immediate children of the root scope, so attempt to look up the symbol in the root scope
				symbol_lookup = root_env.lookup_ext(symbol, None);
			}

			let mut hover_string = String::new();

			if let Ok(symbol_lookup) = symbol_lookup {
				let symbol_kind = symbol_lookup.0;
				let lookup_info = symbol_lookup.1;

				match symbol_kind {
					crate::type_check::SymbolKind::Type(t) => {
						hover_string.push_str(format!("**{}**", t).as_str());
					}
					crate::type_check::SymbolKind::Variable(v) => {
						let flight = match lookup_info.flight {
							crate::ast::Phase::Inflight => "inflight ",
							crate::ast::Phase::Preflight => "preflight ",
							crate::ast::Phase::Independent => "",
						};
						let reassignable = if v.reassignable { "var " } else { "" };
						let _type = &v._type;
						hover_string.push_str(format!("```wing\n{flight}{reassignable}{symbol_name}: {_type}\n```").as_str());
					}
					crate::type_check::SymbolKind::Namespace(n) => {
						let namespace_name = &n.name;
						hover_string.push_str(format!("```wing\nbring {namespace_name}\n```").as_str());
					}
				};
			} else {
				if reference.is_some() && expression_type.is_some() {
					let expression_type = expression_type.unwrap();
					hover_string.push_str(format!("```wing\n{symbol_name}: {expression_type}\n```").as_str());
				} else {
					// It's a symbol of some kind, but not sure how to handle it yet
					hover_string.push_str(format!("```wing\n{symbol_name}```").as_str());
				}
			}

			if !hover_string.is_empty() {
				return Some(Hover {
					contents: HoverContents::Markup(MarkupContent {
						kind: MarkupKind::Markdown,
						value: hover_string,
					}),
					range: Some(span.range()),
				});
			}
		}

		None
	})
}
