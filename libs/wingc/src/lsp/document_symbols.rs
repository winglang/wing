use crate::ast::{Scope, *};
use crate::lsp::ast_traversal::{
	get_expressions_from_statement, get_statements_from_scope_no_context, get_symbols_from_expression,
	get_symbols_from_statement, TreeLocationContext,
};
use crate::lsp::sync::FILES;
use crate::wasm_util::{ptr_to_string, string_to_combined_ptr, WASM_RETURN_ERROR};
use lsp_types::DocumentSymbol;
use lsp_types::SymbolKind;

#[no_mangle]
pub unsafe extern "C" fn wingc_on_document_symbol(ptr: u32, len: u32) -> u64 {
	let parse_string = ptr_to_string(ptr, len);
	if let Ok(parsed) = serde_json::from_str(&parse_string) {
		let doc_symbols = on_document_symbols(parsed);
		let result = serde_json::to_string(&doc_symbols).unwrap();

		string_to_combined_ptr(result)
	} else {
		WASM_RETURN_ERROR
	}
}

pub fn on_document_symbols<'a>(params: lsp_types::DocumentSymbolParams) -> Vec<DocumentSymbol> {
	FILES.with(|files| {
		let files = files.borrow();
		let files = files.read();
		let files = files.unwrap();
		let parse_result = files.get(&params.text_document.uri);
		let parse_result = parse_result.unwrap();
		let scope = &parse_result.scope;

		create_symbols(scope)
	})
}

fn create_symbols<'a>(scope: &'a Scope) -> Vec<DocumentSymbol> {
	let mut document_symbols: Vec<DocumentSymbol> = vec![];
	let mut raw_symbols: Vec<(TreeLocationContext<'a>, &'a Symbol)> = vec![];

	let all_statements = get_statements_from_scope_no_context(scope);
	for context in all_statements {
		raw_symbols.extend(get_symbols_from_statement(context));

		let all_expressions = get_expressions_from_statement(context);
		for expression_context in all_expressions {
			raw_symbols.extend(get_symbols_from_expression(expression_context));
		}
	}

	for symbol_lookup in raw_symbols {
		let statement = symbol_lookup.0.statement;
		let symbol = symbol_lookup.1;
		let symbol_kind = match &statement.kind {
			StmtKind::Bring { .. } => SymbolKind::NAMESPACE,
			StmtKind::VariableDef { var_name, .. } => {
				if var_name.name == symbol.name {
					SymbolKind::VARIABLE
				} else {
					continue;
				}
			}
			StmtKind::ForLoop { iterator, .. } => {
				if iterator.name == symbol.name {
					SymbolKind::VARIABLE
				} else {
					continue;
				}
			}
			StmtKind::Class(c) => {
				if c.name.name == symbol.name {
					SymbolKind::CLASS
				} else {
					// eventually we should handle the entire class symbol hierarchy
					continue;
				}
			}
			StmtKind::Struct { name, .. } => {
				if name.name == symbol.name {
					SymbolKind::STRUCT
				} else {
					// eventually we should handle the entire struct symbol hierarchy
					continue;
				}
			}
			StmtKind::Enum { name, .. } => {
				if name.name == symbol.name {
					SymbolKind::ENUM
				} else {
					// eventually we should handle the entire enum symbol hierarchy
					continue;
				}
			}
			_ => continue,
		};

		let symbol_range = symbol.span.range();

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

		document_symbols.push(symbol);
	}

	document_symbols
}
