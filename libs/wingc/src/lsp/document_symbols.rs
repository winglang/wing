use crate::ast::*;
use crate::closure_transform::{CLOSURE_CLASS_PREFIX, PARENT_THIS_NAME};
use crate::lsp::sync::PROJECT_DATA;
use crate::visit::Visit;
use crate::wasm_util::extern_json_fn;
use lsp_types::{DocumentSymbol, SymbolKind};

use super::sync::check_utf8;

pub struct DocumentSymbolVisitor<'a> {
	pub document_symbols: Vec<DocumentSymbol>,
	pub ast: &'a Ast,
}

impl<'a> DocumentSymbolVisitor<'a> {
	pub fn new(ast: &'a Ast) -> Self {
		Self {
			document_symbols: vec![],
			ast,
		}
	}
}

impl<'a> Visit<'a> for DocumentSymbolVisitor<'a> {
	fn ast(&self) -> &'a Ast {
		self.ast
	}

	fn visit_stmt(&mut self, statement: &'a Stmt) {
		match &statement.kind {
			StmtKind::Bring { source, identifier } => {
				if let Some(identifier) = identifier {
					let symbol = identifier;
					self
						.document_symbols
						.push(create_document_symbol(symbol, SymbolKind::VARIABLE));
				} else {
					match &source {
						BringSource::BuiltinModule(name) => {
							self
								.document_symbols
								.push(create_document_symbol(name, SymbolKind::MODULE));
						}
						BringSource::TrustedModule(name, _) => {
							self
								.document_symbols
								.push(create_document_symbol(name, SymbolKind::MODULE));
						}
						// in these cases, an alias is required (like "bring foo as bar;")
						// so we don't need to add a symbol for the module itself
						BringSource::WingLibrary(_, _) => {}
						BringSource::JsiiModule(_) => {}
						BringSource::WingFile(_) => {}
						BringSource::Directory(_) => {}
					};
				}
			}
			StmtKind::Let { var_name, .. } => {
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
			StmtKind::Struct(st) => {
				let symbol = &st.name;
				self
					.document_symbols
					.push(create_document_symbol(symbol, SymbolKind::STRUCT));
			}
			StmtKind::Enum(enu) => {
				let symbol = &enu.name;
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
	extern_json_fn(ptr, len, on_document_symbols)
}

pub fn on_document_symbols(params: lsp_types::DocumentSymbolParams) -> Vec<DocumentSymbol> {
	PROJECT_DATA.with(|project_data| {
		let project_data = project_data.borrow();
		let uri = params.text_document.uri;
		let file = check_utf8(uri.to_file_path().expect("LSP only works on real filesystems"));
		let ast = project_data.asts.get(&file).unwrap();
		let scope = ast.root();

		let mut visitor = DocumentSymbolVisitor::new(ast);
		visitor.visit_scope(scope);

		visitor
			.document_symbols
			.into_iter()
			.filter(|sym| filter_symbol(sym))
			.collect()
	})
}

fn filter_symbol(symbol: &DocumentSymbol) -> bool {
	!{ symbol.name.starts_with(CLOSURE_CLASS_PREFIX) || symbol.name.starts_with(PARENT_THIS_NAME) }
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
