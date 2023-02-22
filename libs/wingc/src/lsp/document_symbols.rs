use crate::ast::*;
use crate::lsp::sync::FILES;
use crate::visit::Visit;
use crate::wasm_util::{ptr_to_string, string_to_combined_ptr, WASM_RETURN_ERROR};
use lsp_types::DocumentSymbol;
use lsp_types::SymbolKind;

pub struct DocumentSymbolVisitor {
	pub document_symbols: Vec<DocumentSymbol>,
}

impl DocumentSymbolVisitor {
	pub fn new() -> Self {
		Self {
			document_symbols: vec![],
		}
	}
}

impl Visit<'_> for DocumentSymbolVisitor {
	fn visit_stmt(&mut self, statement: &Stmt) {
		match &statement.kind {
			StmtKind::Bring {
				module_name,
				identifier,
			} => {
				let mod_symbol = module_name;
				let mod_symbol_range = mod_symbol.span.range();
				self.document_symbols.push(
					#[allow(deprecated)]
					DocumentSymbol {
						name: mod_symbol.name.clone(),
						detail: None,
						kind: SymbolKind::NAMESPACE,
						range: mod_symbol_range,
						selection_range: mod_symbol_range,
						children: None,
						tags: None,
						deprecated: None,
					},
				);

				if let Some(identifier) = identifier {
					let symbol = identifier;
					let symbol_range = symbol.span.range();
					self.document_symbols.push(
						#[allow(deprecated)]
						DocumentSymbol {
							name: symbol.name.clone(),
							detail: None,
							kind: SymbolKind::VARIABLE,
							range: symbol_range,
							selection_range: symbol_range,
							children: None,
							tags: None,
							deprecated: None,
						},
					);
				}
			}
			StmtKind::VariableDef { var_name, .. } => {
				let symbol = var_name;
				let symbol_range = symbol.span.range();
				self.document_symbols.push(
					#[allow(deprecated)]
					DocumentSymbol {
						name: symbol.name.clone(),
						detail: None,
						kind: SymbolKind::VARIABLE,
						range: symbol_range,
						selection_range: symbol_range,
						children: None,
						tags: None,
						deprecated: None,
					},
				);
			}
			StmtKind::ForLoop { iterator, .. } => {
				let symbol = iterator;
				let symbol_range = symbol.span.range();
				self.document_symbols.push(
					#[allow(deprecated)]
					DocumentSymbol {
						name: symbol.name.clone(),
						detail: None,
						kind: SymbolKind::VARIABLE,
						range: symbol_range,
						selection_range: symbol_range,
						children: None,
						tags: None,
						deprecated: None,
					},
				);
			}
			StmtKind::Class(c) => {
				let symbol = &c.name;
				let symbol_range = symbol.span.range();
				self.document_symbols.push(
					#[allow(deprecated)]
					DocumentSymbol {
						name: symbol.name.clone(),
						detail: None,
						kind: SymbolKind::CLASS,
						range: symbol_range,
						selection_range: symbol_range,
						children: None,
						tags: None,
						deprecated: None,
					},
				);
			}
			StmtKind::Struct { name, .. } => {
				let symbol = name;
				let symbol_range = symbol.span.range();
				self.document_symbols.push(
					#[allow(deprecated)]
					DocumentSymbol {
						name: symbol.name.clone(),
						detail: None,
						kind: SymbolKind::STRUCT,
						range: symbol_range,
						selection_range: symbol_range,
						children: None,
						tags: None,
						deprecated: None,
					},
				);
			}
			StmtKind::Enum { name, .. } => {
				let symbol = name;
				let symbol_range = symbol.span.range();
				self.document_symbols.push(
					#[allow(deprecated)]
					DocumentSymbol {
						name: symbol.name.clone(),
						detail: None,
						kind: SymbolKind::ENUM,
						range: symbol_range,
						selection_range: symbol_range,
						children: None,
						tags: None,
						deprecated: None,
					},
				);
			}
			_ => {}
		};
		crate::visit::visit_stmt(self, statement);
	}
}

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
		let parse_result = files.get(&params.text_document.uri);
		let parse_result = parse_result.unwrap();
		let scope = &parse_result.scope;

		let mut visitor = DocumentSymbolVisitor::new();
		visitor.visit_scope(scope);

		visitor.document_symbols
	})
}
