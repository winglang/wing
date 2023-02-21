use lsp_types::{DidChangeTextDocumentParams, DidOpenTextDocumentParams, Url};
use std::collections::HashSet;
use std::path::Path;
use std::sync::RwLock;
use std::{cell::RefCell, collections::HashMap};
use tree_sitter::Tree;

use crate::capture::CaptureVisitor;
use crate::lsp::notifications::send_diagnostics;
use crate::parser::Parser;
use crate::type_check;
use crate::visit::Visit;
use crate::{ast::Scope, diagnostic::Diagnostics, type_check::Types, wasm_util::ptr_to_string};

/// The result of running wingc on a file
pub struct FileData {
	/// Text data contained in the file (ut ≥f8)
	pub contents: String,
	/// tree-sitter tree
	pub tree: Tree,
	/// The diagnostics returned by wingc
	pub diagnostics: Diagnostics,
	/// The top scope of the file
	pub scope: Scope,
	/// The universal type collection for the scope. This is saved to ensure references live long enough.
	pub types: Types,
}

thread_local! {
	/// When consumed as a WASM library, wingc is not in control of the process/memory in which it is running.
	/// This means that it cannot reliably manage stateful data like this between function calls.
	/// Here we will assume the process is single threaded, and use thread_local to store this data.
	pub static FILES: RefCell<RwLock<HashMap<Url,FileData>>> = RefCell::new(RwLock::new(HashMap::new()));
}

#[no_mangle]
pub unsafe extern "C" fn wingc_on_did_open_text_document(ptr: u32, len: u32) {
	let parse_string = ptr_to_string(ptr, len);
	if let Ok(parsed) = serde_json::from_str(&parse_string) {
		on_document_did_open(parsed);
	} else {
		eprintln!("Failed to parse 'did open' text document: {}", parse_string);
	}
}
pub fn on_document_did_open(params: DidOpenTextDocumentParams) {
	FILES.with(|files| {
		let files = files.borrow_mut();
		let uri = params.text_document.uri;
		let uri_path = uri.to_file_path().unwrap();
		let path = uri_path.to_str().unwrap();
		let result = partial_compile(path, params.text_document.text.as_bytes());
		send_diagnostics(&uri, &result.diagnostics);
		files.write().unwrap().insert(uri, result);
	});
}

#[no_mangle]
pub unsafe extern "C" fn wingc_on_did_change_text_document(ptr: u32, len: u32) {
	let parse_string = ptr_to_string(ptr, len);
	if let Ok(parsed) = serde_json::from_str(&parse_string) {
		on_document_did_change(parsed);
	} else {
		eprintln!("Failed to parse 'did change' text document: {}", parse_string);
	}
}
pub fn on_document_did_change(params: DidChangeTextDocumentParams) {
	FILES.with(|files| {
		let files = files.borrow_mut();
		let uri = params.text_document.uri;
		let uri_path = uri.to_file_path().unwrap();
		let path = uri_path.to_str().unwrap();

		let result = partial_compile(path, params.content_changes[0].text.as_bytes());
		send_diagnostics(&uri, &result.diagnostics);
		files.write().unwrap().insert(uri, result);
	});
}

/// Runs several phases of the wing compile on a file, including: parsing, type checking, and capturing
fn partial_compile(source_file: &str, text: &[u8]) -> FileData {
	let mut types = type_check::Types::new();

	let language = tree_sitter_wing::language();
	let mut parser = tree_sitter::Parser::new();
	parser.set_language(language).unwrap();

	let tree = match parser.parse(&text[..], None) {
		Some(tree) => tree,
		None => {
			panic!("Failed parsing source file: {}", source_file);
		}
	};

	let wing_parser = Parser {
		source: &text[..],
		source_name: source_file.to_string(),
		error_nodes: RefCell::new(HashSet::new()),
		diagnostics: RefCell::new(Diagnostics::new()),
	};

	let mut scope = wing_parser.wingit(&tree.root_node());

	let type_diag = type_check(&mut scope, &mut types, &Path::new(source_file));
	let parse_diag = wing_parser.diagnostics.into_inner();

	// Analyze inflight captures
	let mut capture_visitor = CaptureVisitor::new();
	capture_visitor.visit_scope(&scope);

	let diagnostics = vec![parse_diag, type_diag, capture_visitor.diagnostics].concat();

	return FileData {
		contents: String::from_utf8(text.to_vec()).unwrap(),
		tree,
		diagnostics,
		scope,
		types,
	};
}
