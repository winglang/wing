use crate::{diagnostic::DiagnosticLevel, parser::Parser, type_check, Diagnostics};
use itertools::Itertools;
use lsp_types::{CompletionItem, CompletionResponse, Position, Range, Url};
use std::{
	cell::RefCell,
	collections::{HashMap, HashSet},
};
use tree_sitter::Tree;

use self::completions::completions_from_ast;

mod completions;

pub struct FileData {
	pub contents: String,
	pub tree: Tree,
	pub diagnostics: Diagnostics,
}

thread_local! {
	// TODO probably need Arc here
	pub static FILES: RefCell<HashMap<String, FileData>> = RefCell::new(HashMap::new());
}

#[cfg(target_arch = "wasm32")]
extern "C" {
	pub fn send_log(notification: *const u8, len: u32);
	pub fn send_diagnostics(diagnostics: *const u8, len: u32);
}

#[cfg(not(target_arch = "wasm32"))]
pub unsafe fn send_log(_notification: *const u8, _len: u32) {
	panic!("send_log called on non-wasm32 target");
}

#[cfg(not(target_arch = "wasm32"))]
pub unsafe fn send_diagnostics(_diagnostics: *const u8, _len: u32) {
	panic!("send_diagnostics called on non-wasm32 target");
}

pub fn on_completion(params: lsp_types::CompletionParams) -> CompletionResponse {
	FILES.with(|files| {
		let files = files.borrow();
		let uri = params.text_document_position.text_document.uri;
		let uri_path = uri.to_file_path().unwrap();
		let path = uri_path.to_str().unwrap();
		let result = files.get(path).unwrap();

		let position = params.text_document_position.position;
		let completions = completions_from_ast(&result.contents.as_str(), &result.tree, position);
		send_log_notification("did complete");

		CompletionResponse::Array(
			completions
				.iter()
				.map(|item| {
					let text = item.text.as_str();
					CompletionItem {
						label: text.to_string(),
						insert_text: Some(text.to_string()),
						kind: Some(item.kind),
						detail: item.detail.clone(),
						..Default::default()
					}
				})
				.collect(),
		)
	})
}

pub fn on_document_did_open(params: lsp_types::DidOpenTextDocumentParams) {
	FILES.with(|files| {
		let mut files = files.borrow_mut();
		let uri = params.text_document.uri;
		let uri_path = uri.to_file_path().unwrap();
		let path = uri_path.to_str().unwrap();
		let result = parse_text(path, params.text_document.text.as_bytes());
		let diagnostics = result.diagnostics.clone();
		files.insert(path.to_string(), result);
		send_diagnostics_notification(uri, &diagnostics);
		send_log_notification("did open");
	});
}

fn send_log_notification(message: &str) {
	let notification = serde_json::json!({
		"type": lsp_types::MessageType::INFO,
		"message": message.to_string(),
	});

	let json = serde_json::to_string(&notification).unwrap();
	unsafe {
		send_log(json.as_ptr(), json.len() as u32);
	}
}

fn send_diagnostics_notification(uri: Url, diagnostics: &Diagnostics) {
	let final_diags = diagnostics
		.iter()
		.filter(|item| matches!(item.level, DiagnosticLevel::Error) && item.span.is_some())
		.map(|item| {
			let span = item.span.as_ref().unwrap();
			let start_position = Position {
				line: span.start.row as u32,
				character: span.start.column as u32,
			};
			let end_position = Position {
				line: span.end.row as u32,
				character: span.end.column as u32,
			};
			lsp_types::Diagnostic::new_simple(Range::new(start_position, end_position), item.message.clone())
		})
		.collect_vec();

	let notification = serde_json::json!({
		"uri": uri,
		"diagnostics": final_diags,
	});

	let json = serde_json::to_string(&notification).unwrap();
	unsafe {
		send_diagnostics(json.as_ptr(), json.len() as u32);
	}
}

pub fn on_document_did_change(params: lsp_types::DidChangeTextDocumentParams) {
	FILES.with(|files| {
		let mut files = files.borrow_mut();
		let uri = params.text_document.uri;
		let uri_path = uri.to_file_path().unwrap();
		let path = uri_path.to_str().unwrap();

		let result = parse_text(path, params.content_changes[0].text.as_bytes());
		let diagnostics = result.diagnostics.clone();
		files.insert(path.to_string(), result);
		send_diagnostics_notification(uri, &diagnostics);
	});
	send_log_notification("did change");
}

pub fn parse_text(source_file: &str, text: &[u8]) -> FileData {
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

	let mut types = type_check::Types::new();
	let type_diag = type_check(&mut scope, &mut types);
	let parse_diag = wing_parser.diagnostics.into_inner();

	let diagnostics = vec![parse_diag, type_diag].concat();

	return FileData {
		contents: String::from_utf8(text.to_vec()).unwrap(),
		tree,
		diagnostics,
	};
}
