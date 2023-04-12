use crate::ast::*;
use crate::lsp::sync::FILES;
use crate::visit::Visit;
use crate::wasm_util::{ptr_to_string, string_to_combined_ptr, WASM_RETURN_ERROR};
use lsp_types::{DocumentSymbol, SymbolKind};

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
				self
					.document_symbols
					.push(create_document_symbol(mod_symbol, SymbolKind::MODULE));

				if let Some(identifier) = identifier {
					let symbol = identifier;
					self
						.document_symbols
						.push(create_document_symbol(symbol, SymbolKind::VARIABLE));
				}
			}
			StmtKind::VariableDef { var_name, .. } => {
				let symbol = var_name;
				self
					.document_symbols
					.push(create_document_symbol(symbol, SymbolKind::VARIABLE));
			}
			StmtKind::ForLoop { iterator, .. } => {
				let symbol = iterator;
				self
					.document_symbols
					.push(create_document_symbol(symbol, SymbolKind::VARIABLE));
			}
			StmtKind::Class(c) => {
				let symbol = &c.name;
				self
					.document_symbols
					.push(create_document_symbol(symbol, SymbolKind::CLASS));
			}
			StmtKind::Struct { name, .. } => {
				let symbol = name;
				self
					.document_symbols
					.push(create_document_symbol(symbol, SymbolKind::STRUCT));
			}
			StmtKind::Enum { name, .. } => {
				let symbol = name;
				self
					.document_symbols
					.push(create_document_symbol(symbol, SymbolKind::ENUM));
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
		let result = serde_json::to_string(&doc_symbols).expect("Failed to serialize DocumentSymbol response");

		string_to_combined_ptr(result)
	} else {
		WASM_RETURN_ERROR
	}
}

pub fn on_document_symbols(params: lsp_types::DocumentSymbolParams) -> Vec<DocumentSymbol> {
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

fn create_document_symbol(symbol: &Symbol, kind: SymbolKind) -> DocumentSymbol {
	let span = &symbol.span;
	#[allow(deprecated)]
	DocumentSymbol {
		name: symbol.name.clone(),
		detail: None,
		kind,
		range: span.into(),
		selection_range: span.into(),
		children: None,
		tags: None,
		deprecated: None,
	}
}
