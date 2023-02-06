use crate::{
	diagnostic::DiagnosticLevel,
	parser::Parser,
	type_check,
	wasm_util::{combine_ptr_and_length, ptr_to_string},
	Diagnostics,
};
use itertools::Itertools;
use lsp_types::{
	CompletionItem, CompletionResponse, Position, Range, SemanticToken, SemanticTokens, SemanticTokensResult, Url,
};
use std::{
	cell::RefCell,
	collections::{HashMap, HashSet},
};
use tree_sitter::Tree;

use self::{completions::completions_from_ast, semantic_token::semantic_token_from_ast};

mod completions;
mod semantic_token;

/// The result of running wingc on a file
pub struct FileData {
	/// Text data contained in the file (utf8)
	pub contents: String,
	/// tree-sitter tree
	pub tree: Tree,
	/// The diagnostics returned by wingc
	pub diagnostics: Diagnostics,
}

lazy_static! {
	static ref NOTIFICATION_TYPE_LOG: Vec<u8> = "window/logMessage".to_string().into_bytes();
	static ref NOTIFICATION_TYPE_DIAGNOSTIC: Vec<u8> = "textDocument/publishDiagnostics".to_string().into_bytes();
}

thread_local! {
	/// Under normal cases, wingc is not in full control of the process in which it is running.
	/// This means that it cannot reliably control stateful data like this between function calls.
	/// Here we will assume the process is single threaded, and use thread_local to store this data.
	pub static FILES: RefCell<HashMap<Url, FileData>> = RefCell::new(HashMap::new());
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
		send_diagnostics(&uri, &result.diagnostics);
		files.insert(uri, result);
	});
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
		let result = files.get(&uri).unwrap();

		let position = params.text_document_position.position;
		let completions = completions_from_ast(&result.contents.as_str(), &result.tree, position);

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
		send_diagnostics(&uri, &result.diagnostics);
		files.insert(uri, result);
	});
}

#[no_mangle]
pub unsafe extern "C" fn wingc_on_semantic_tokens(ptr: u32, len: u32) {
	let parse_string = ptr_to_string(ptr, len);
	if let Ok(parsed) = serde_json::from_str(&parse_string) {
		on_semantic_tokens(parsed);
	} else {
		eprintln!("Failed to parse 'did open' text document: {}", parse_string);
	}
}
pub fn on_semantic_tokens(params: lsp_types::SemanticTokensParams) -> Option<SemanticTokensResult> {
	FILES.with(|files| {
		let files = files.borrow();
		let parse_result = files.get(&params.text_document.uri).unwrap();
		let absolute_tokens = semantic_token_from_ast(&parse_result.tree);

		let mut last_line = 0;
		let mut last_char = 0;

		// convert absolute tokens to relative tokens
		// this logic is specific to this endpoint for perf reasons
		let mut relative_tokens: Vec<SemanticToken> = Vec::new();
		for token in absolute_tokens.iter() {
			let line = token.start.row - last_line;
			let char;
			if line == 0 {
				char = token.start.column - last_char;
			} else {
				char = token.start.column;
			}
			relative_tokens.push(SemanticToken {
				delta_line: line as u32,
				delta_start: char as u32,
				length: token.length as u32,
				token_type: token.token_type as u32,
				token_modifiers_bitset: 0,
			});
			last_line = token.start.row;
			last_char = token.start.column;
		}

		if relative_tokens.len() == 0 {
			None
		} else {
			Some(SemanticTokensResult::Tokens(SemanticTokens {
				result_id: None,
				data: relative_tokens,
			}))
		}
	})
}

fn send_diagnostics(uri: &Url, diagnostics: &Diagnostics) {
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
		let notif_type = NOTIFICATION_TYPE_DIAGNOSTIC.clone().leak();
		send_notification(
			notif_type.as_ptr(),
			notif_type.len() as u32,
			json.as_ptr(),
			json.len() as u32,
		);
	}
}

fn parse_text(source_file: &str, text: &[u8]) -> FileData {
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
