use crate::{
	ast::{Scope, Stmt, Symbol},
	diagnostic::{DiagnosticLevel, WingSpan},
	parser::Parser,
	type_check,
	wasm_util::{ptr_to_string, string_to_combined_ptr},
	Diagnostics,
};
use itertools::Itertools;
use lsp_types::{
	CompletionItem, CompletionResponse, Hover, HoverContents, MarkupContent, MarkupKind, Position, Range, SemanticToken,
	SemanticTokens, SemanticTokensResult, Url,
};
use std::{
	cell::RefCell,
	collections::{HashMap, HashSet},
	sync::RwLock,
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
	/// The top scope of the file
	pub scope: RefCell<Scope>,
}

lazy_static! {
	static ref NOTIFICATION_TYPE_LOG: Vec<u8> = "window/logMessage".to_string().into_bytes();
	static ref NOTIFICATION_TYPE_DIAGNOSTIC: Vec<u8> = "textDocument/publishDiagnostics".to_string().into_bytes();
}

thread_local! {
	/// When consumed as a WASM library, wingc is not in control of the process/memory in which it is running.
	/// This means that it cannot reliably manage stateful data like this between function calls.
	/// Here we will assume the process is single threaded, and use thread_local to store this data.
	pub static FILES: RefCell<RwLock<HashMap<Url,FileData>>> = RefCell::new(RwLock::new(HashMap::new()));
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
/// On wasm32, this is expected to be implemented by whatever is consuming wingc.
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
		files.write().unwrap().insert(uri, result);
	});
}

#[no_mangle]
pub unsafe extern "C" fn wingc_on_completion(ptr: u32, len: u32) -> u64 {
	let parse_string = ptr_to_string(ptr, len);
	if let Ok(parsed) = serde_json::from_str(&parse_string) {
		let result = on_completion(parsed);
		let result = serde_json::to_string(&result).unwrap();

		// return result as u64 with ptr and len
		string_to_combined_ptr(result)
	} else {
		panic!("Failed to parse 'completion': {}", parse_string);
	}
}
pub fn on_completion(params: lsp_types::CompletionParams) -> CompletionResponse {
	FILES.with(|files| {
		let files = files.borrow();
		let files = files.read().unwrap();
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
		files.write().unwrap().insert(uri, result);
	});
}

#[no_mangle]
pub unsafe extern "C" fn wingc_on_semantic_tokens(ptr: u32, len: u32) -> u64 {
	let parse_string = ptr_to_string(ptr, len);
	if let Ok(parsed) = serde_json::from_str(&parse_string) {
		if let Some(token_result) = on_semantic_tokens(parsed) {
			let result = serde_json::to_string(&token_result).unwrap();

			// return result as u64 with ptr and len
			let leaked = result.into_bytes().leak();
			combine_ptr_and_length(leaked.as_ptr() as u32, leaked.len() as u32)
		} else {
			0
		}
	} else {
		eprintln!("Failed to parse 'did open' text document: {}", parse_string);
		0
	}
}
pub fn on_semantic_tokens(params: lsp_types::SemanticTokensParams) -> Option<SemanticTokensResult> {
	FILES.with(|files| {
		let files = files.borrow();
		let files = files.read().unwrap();
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

		let scope = parse_result.scope.borrow();
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
			hover_string.push_str(&format!("{}: ", symbol.name));

			let env_ref = point_context.0.env.borrow();
			let env = env_ref.as_ref().unwrap();

			if let Ok(lookup) = env.lookup(symbol, None) {
				match lookup {
					type_check::SymbolKind::Type(t) => {
						let ff = &**t;
						hover_string.push_str(format!("{}", ff).as_str());
						hover_string.push_str(format!("{:p}", t).as_str());
					}
					type_check::SymbolKind::Variable(v) => {
						let ff = &*v._type;
						hover_string.push_str(format!("{}", ff).as_str());
						hover_string.push_str(format!("{:p}", ff).as_str());
					}
					type_check::SymbolKind::Namespace(n) => {
						hover_string.push_str(n.name.as_str());
					}
				}
			}

			hover_string.push_str(format!("\n\n*{}*", symbol.span).as_str());

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
		scope: RefCell::new(scope),
	};
}

type PointContext<'a> = (&'a Scope, &'a Stmt, &'a Symbol);

fn find_symbol_in_scope<'a>(scope: &'a Scope, position: Position) -> Option<PointContext<'a>> {
	for statement in scope.statements.iter() {
		if let Some(point_context) = find_symbol_in_statement(scope, statement, position) {
			return Some(point_context);
		}
	}
	None
}

fn find_symbol_in_statement<'a>(scope: &'a Scope, statement: &'a Stmt, position: Position) -> Option<PointContext<'a>> {
	if !span_contains(&statement.span, &position) {
		return None;
	}
	match &statement.kind {
		crate::ast::StmtKind::Use {
			module_name,
			identifier,
		} => {
			if span_contains(&module_name.span, &position) {
				return Some((scope, statement, &module_name));
			}
			if let Some(identifier) = identifier {
				if span_contains(&identifier.span, &position) {
					return Some((scope, statement, &identifier));
				}
			}
		}
		crate::ast::StmtKind::VariableDef {
			reassignable,
			var_name,
			initial_value,
			type_,
		} => {
			if span_contains(&var_name.span, &position) {
				return Some((scope, statement, &var_name));
			}
		}
		crate::ast::StmtKind::ForLoop {
			iterator,
			iterable,
			statements,
		} => {
			if span_contains(&iterator.span, &position) {
				return Some((scope, statement, &iterator));
			}
			if let Some(point_context) = find_symbol_in_scope(statements, position) {
				return Some(point_context);
			}
		}
		crate::ast::StmtKind::While { condition, statements } => {
			if let Some(point_context) = find_symbol_in_scope(statements, position) {
				return Some(point_context);
			}
		}
		crate::ast::StmtKind::If {
			condition,
			statements,
			elif_statements,
			else_statements,
		} => {
			if let Some(point_context) = find_symbol_in_scope(statements, position) {
				return Some(point_context);
			}
			for elif in elif_statements.iter() {
				if let Some(point_context) = find_symbol_in_scope(&elif.statements, position) {
					return Some(point_context);
				}
			}
			if let Some(else_statements) = else_statements {
				if let Some(point_context) = find_symbol_in_scope(else_statements, position) {
					return Some(point_context);
				}
			}
		}
		crate::ast::StmtKind::Expression(_) => {}
		crate::ast::StmtKind::Assignment { variable, value } => {}
		crate::ast::StmtKind::Return(_) => {}
		crate::ast::StmtKind::Scope(s) => return find_symbol_in_scope(s, position),
		crate::ast::StmtKind::Class {
			name,
			members,
			methods,
			constructor,
			parent,
			is_resource,
		} => {
			if span_contains(&name.span, &position) {
				return Some((scope, statement, &name));
			}
		}
		crate::ast::StmtKind::Struct { name, extends, members } => {
			if span_contains(&name.span, &position) {
				return Some((scope, statement, &name));
			}
		}
		crate::ast::StmtKind::Enum { name, values } => {
			if span_contains(&name.span, &position) {
				return Some((scope, statement, &name));
			}
		}
	}

	None
}

fn span_contains(span: &WingSpan, position: &Position) -> bool {
	span.start.row <= position.line as usize
		&& span.end.row >= position.line as usize
		&& span.start.column <= position.character as usize
		&& span.end.column >= position.character as usize
}
