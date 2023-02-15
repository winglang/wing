use lsp_types::{Hover, HoverContents, MarkupContent, MarkupKind, Position, Range};

use crate::{
	type_check,
	wasm_util::{combine_ptr_and_length, ptr_to_string},
};

use crate::lsp::ast_traversal::find_symbol_in_scope;
use crate::lsp::sync::FILES;

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
pub fn on_hover(params: lsp_types::HoverParams) -> Option<Hover> {
	FILES.with(|files| {
		let files = files.borrow();
		let files = files.read().unwrap();
		let parse_result = files
			.get(&params.text_document_position_params.text_document.uri)
			.unwrap();
		let position = params.text_document_position_params.position;

		let scope = &parse_result.scope;
		let point_context = find_symbol_in_scope(&scope, position);

		if let Some(point_context) = point_context {
			let mut hover = Hover {
				contents: HoverContents::Markup(MarkupContent {
					kind: MarkupKind::Markdown,
					value: String::new(),
				}),
				range: None,
			};

			let mut hover_string = String::new();
			let symbol = point_context.2;
			let symbol_name = symbol.name.as_str();

			let env_ref = point_context.0.env.borrow();
			let env = env_ref.as_ref().unwrap();

			if let Ok(lookup) = env.lookup_ext(symbol, None) {
				match lookup.0 {
					type_check::SymbolKind::Type(t) => {
						hover_string.push_str(format!("**{}**", t).as_str());
					}
					type_check::SymbolKind::Variable(v) => {
						let flight = match lookup.1.flight {
							crate::ast::Phase::Inflight => "inflight ",
							crate::ast::Phase::Preflight => "preflight ",
							crate::ast::Phase::Independent => "",
						};
						if v.reassignable {
							hover_string.push_str(format!("```wing\n{flight}let var {symbol_name}: {}\n```", &v._type).as_str());
						} else {
							hover_string.push_str(format!("```wing\n{flight}let {symbol_name}: {}\n```", &v._type).as_str());
						}
					}
					type_check::SymbolKind::Namespace(n) => {
						hover_string.push_str(format!("```wing\nbring **{}**\n```", n.name).as_str());
					}
				}
			} else {
				let root_env_ref = scope.env.borrow();
				let root_env = root_env_ref.as_ref().unwrap();

				if let Ok(lookup) = root_env.lookup_ext(symbol, None) {
					match lookup.0 {
						type_check::SymbolKind::Type(t) => {
							hover_string.push_str(format!("**{}**", t).as_str());
						}
						type_check::SymbolKind::Variable(v) => {
							let flight = match lookup.1.flight {
								crate::ast::Phase::Inflight => "inflight ",
								crate::ast::Phase::Preflight => "preflight ",
								crate::ast::Phase::Independent => "",
							};
							if v.reassignable {
								hover_string.push_str(format!("```wing\n{flight}let var {symbol_name}: {}\n```", &v._type).as_str());
							} else {
								hover_string.push_str(format!("```wing\n{flight}let {symbol_name}: {}\n```", &v._type).as_str());
							}
						}
						type_check::SymbolKind::Namespace(n) => {
							hover_string.push_str(format!("```wing\nbring **{}**\n```", n.name).as_str());
						}
					}
				} else {
					hover_string.push_str(&format!("**{}**", symbol.name));
				}
			}

			hover.range = Some(Range::new(
				Position {
					line: symbol.span.start.row as u32,
					character: symbol.span.start.column as u32,
				},
				Position {
					line: symbol.span.end.row as u32,
					character: symbol.span.end.column as u32,
				},
			));

			hover.contents = HoverContents::Markup(MarkupContent {
				kind: MarkupKind::Markdown,
				value: hover_string,
			});

			Some(hover)
		} else {
			None
		}
	})
}
