use crate::{
	diagnostic::DiagnosticLevel,
	parser::Parser,
	type_check,
	wasm_util::{combine_ptr_and_length, ptr_to_string},
	Diagnostics,
};
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
	/// Under normal cases, wingc is not in full control of the process in which it is running.
	/// This means that it cannot reliably control stateful data like this between function calls.
	/// Here we will assume the process is single threaded, and use thread_local to store this data.
	pub static FILES: RefCell<HashMap<String, FileData>> = RefCell::new(HashMap::new());
}

#[cfg(target_arch = "wasm32")]
extern "C" {
	pub fn send_notification(
		notification_type: *const u8,
		notification_type_length: u32,
		data: *const u8,
		data_length: u32,
	);
}

/// Sends a notification to the client, not part of the typical request/response cycle.
/// On wasm32, this is expected to be implemented whatever is consuming wingc.
/// On other targets, this panics.
#[cfg(not(target_arch = "wasm32"))]
pub unsafe fn send_notification(
	notification_type: *const u8,
	notification_type_length: u32,
	data: *const u8,
	data_length: u32,
) {
	let notification_type = std::str::from_utf8(std::slice::from_raw_parts(
		notification_type,
		notification_type_length as usize,
	))
	.unwrap();
	let data = std::str::from_utf8(std::slice::from_raw_parts(data, data_length as usize)).unwrap();
	panic!(
		"send_notification called on non-wasm32 target: {} {}",
		notification_type, data
	);
}

#[no_mangle]
pub unsafe extern "C" fn wingc_on_completion(ptr: u32, len: u32) -> u64 {
	let parse_string = ptr_to_string(ptr, len);
	if let Ok(parsed) = serde_json::from_str(&parse_string) {
		let result = on_completion(parsed);
		let result = serde_json::to_string(&result).unwrap();

		// return result as u64 with ptr and len
		let leaked = result.into_bytes().leak();
		combine_ptr_and_length(leaked.as_ptr() as u32, leaked.len() as u32)
	} else {
		panic!("Failed to parse 'completion': {}", parse_string);
	}
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
		send_log("did complete");

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

#[no_mangle]
pub unsafe extern "C" fn wingc_on_did_open_text_document(ptr: u32, len: u32) {
	let parse_string = ptr_to_string(ptr, len);
	if let Ok(parsed) = serde_json::from_str(&parse_string) {
		on_document_did_open(parsed);
	} else {
		eprintln!("Failed to parse 'did open' text document: {}", parse_string);
	}
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
		send_diagnostics(uri, &diagnostics);
		send_log("did open");
	});
}

fn send_log(message: &str) {
	let notification = serde_json::json!({
		"type": lsp_types::MessageType::INFO,
		"message": message.to_string(),
	});

	unsafe {
		let json = serde_json::to_string(&notification).unwrap();
		let notif_type = "window/logMessage".to_string().into_bytes().leak();
		send_notification(
			notif_type.as_ptr(),
			notif_type.len() as u32,
			json.as_ptr(),
			json.len() as u32,
		);
	}
}

fn send_diagnostics(uri: Url, diagnostics: &Diagnostics) {
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

	unsafe {
		let json = serde_json::to_string(&notification).unwrap();
		let notif_type = "textDocument/publishDiagnostics".to_string().into_bytes().leak();
		send_notification(
			notif_type.as_ptr(),
			notif_type.len() as u32,
			json.as_ptr(),
			json.len() as u32,
		);
	}
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
pub fn on_document_did_change(params: lsp_types::DidChangeTextDocumentParams) {
	FILES.with(|files| {
		let mut files = files.borrow_mut();
		let uri = params.text_document.uri;
		let uri_path = uri.to_file_path().unwrap();
		let path = uri_path.to_str().unwrap();

		let result = parse_text(path, params.content_changes[0].text.as_bytes());
		let diagnostics = result.diagnostics.clone();
		files.insert(path.to_string(), result);
		send_diagnostics(uri, &diagnostics);
	});
	send_log("did change");
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
