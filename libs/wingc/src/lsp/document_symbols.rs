use crate::ast::{Scope, *};
use crate::lsp::ast_traversal::visit_symbols;
use crate::lsp::sync::FILES;
use crate::wasm_util::{combine_ptr_and_length, ptr_to_string};
use lsp_types::DocumentSymbol;
use lsp_types::Position;
use lsp_types::Range;
use lsp_types::SymbolKind;

#[no_mangle]
pub unsafe extern "C" fn wingc_on_document_symbol(ptr: u32, len: u32) -> u64 {
	let parse_string = ptr_to_string(ptr, len);
	if let Ok(parsed) = serde_json::from_str(&parse_string) {
		if let Some(token_result) = on_document_symbols(parsed) {
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

fn create_symbols<'a>(scope: &'a Scope) -> Vec<DocumentSymbol> {
	let mut symbols: Vec<DocumentSymbol> = vec![];

	let mut symbol_visitor = |_scope: &'a Scope, statement: &'a Stmt, _expr: Option<&'a Expr>, symbol: &'a Symbol| {
		let symbol_kind = match &statement.kind {
			StmtKind::Bring { .. } => SymbolKind::NAMESPACE,
			StmtKind::VariableDef { var_name, .. } => {
				if var_name.name == symbol.name {
					SymbolKind::VARIABLE
				} else {
					return;
				}
			}
			StmtKind::ForLoop { iterator, .. } => {
				if iterator.name == symbol.name {
					SymbolKind::VARIABLE
				} else {
					return;
				}
			}
			StmtKind::Class(c) => {
				if c.name.name == symbol.name {
					SymbolKind::CLASS
				} else {
					// eventually we should handle the entire class symbol hierarchy
					return;
				}
			}
			StmtKind::Struct { name, .. } => {
				if name.name == symbol.name {
					SymbolKind::STRUCT
				} else {
					// eventually we should handle the entire struct symbol hierarchy
					return;
				}
			}
			StmtKind::Enum { name, .. } => {
				if name.name == symbol.name {
					SymbolKind::ENUM
				} else {
					// eventually we should handle the entire enum symbol hierarchy
					return;
				}
			}
			_ => return,
		};

		let symbol_range = Range {
			start: Position {
				line: symbol.span.start.row as u32,
				character: symbol.span.start.column as u32,
			},
			end: Position {
				line: symbol.span.end.row as u32,
				character: symbol.span.end.column as u32,
			},
		};

		// "deprecated" is deprecated (lol) but still required
		#[allow(deprecated)]
		let symbol = DocumentSymbol {
			name: symbol.name.clone(),
			detail: None,
			kind: symbol_kind,
			range: symbol_range,
			selection_range: symbol_range,
			children: None,
			tags: None,
			deprecated: None,
		};

		symbols.push(symbol);
	};

	visit_symbols(scope, &mut symbol_visitor);

	symbols
}

pub fn on_document_symbols<'a>(params: lsp_types::DocumentSymbolParams) -> Option<Vec<DocumentSymbol>> {
	FILES.with(|files| {
		let files = files.borrow();
		let files = files.read();
		let files = files.unwrap();
		let parse_result = files.get(&params.text_document.uri);
		let parse_result = parse_result.unwrap();
		let scope = &parse_result.scope;

		let symbols = create_symbols(scope);

		if symbols.is_empty() {
			None
		} else {
			Some(symbols)
		}
	})
}
