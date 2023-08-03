use lsp_types::{DidChangeTextDocumentParams, DidOpenTextDocumentParams, Url};
use wingii::type_system::TypeSystem;

use std::path::Path;
use std::{cell::RefCell, collections::HashMap};
use tree_sitter::Tree;

use crate::closure_transform::ClosureTransformer;
use crate::diagnostic::{get_diagnostics, reset_diagnostics, Diagnostic};
use crate::files::Files;
use crate::fold::Fold;
use crate::jsify::JSifier;
use crate::parser::Parser;
use crate::type_check;
use crate::type_check::jsii_importer::JsiiImportSpec;
use crate::{ast::Scope, type_check::Types, wasm_util::ptr_to_string};

/// The result of running wingc on a file
pub struct FileData {
	/// Text data contained in the file (ut ≥f8)
	pub contents: String,
	/// tree-sitter tree
	pub tree: Tree,
	/// The diagnostics returned by wingc
	pub diagnostics: Vec<Diagnostic>,
	/// The top scope of the file
	pub scope: Box<Scope>,
	/// The universal type collection for the scope. This is saved to ensure references live long enough.
	pub types: Types,
	/// The JSII imports for the file. This is saved so we can load JSII types (for autotocompletion for example)
	/// which don't exist explicitly in the source.
	pub jsii_imports: Vec<JsiiImportSpec>,
}

thread_local! {
	/// When consumed as a WASM library, wingc is not in control of the process/memory in which it is running.
	/// This means that it cannot reliably manage stateful data like this between function calls.
	/// Here we will assume the process is single threaded, and use thread_local to store this data.
	pub static FILES: RefCell<HashMap<Url,FileData>> = RefCell::new(HashMap::new());
	pub static JSII_TYPES: RefCell<TypeSystem> = RefCell::new(TypeSystem::new());
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
	JSII_TYPES.with(|jsii_types| {
		FILES.with(|files| {
			let uri = params.text_document.uri;
			let uri_path = uri.to_file_path().unwrap();
			let path = uri_path.to_str().unwrap();

			let result = partial_compile(path, params.text_document.text.as_bytes(), &mut jsii_types.borrow_mut());
			files.borrow_mut().insert(uri, result);
		});
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
	JSII_TYPES.with(|jsii_types| {
		FILES.with(|files| {
			let uri = params.text_document.uri;
			let uri_path = uri.to_file_path().unwrap();
			let path = uri_path.to_str().unwrap();

			let result = partial_compile(
				path,
				params.content_changes[0].text.as_bytes(),
				&mut jsii_types.borrow_mut(),
			);
			files.borrow_mut().insert(uri, result);
		});
	})
}

/// Runs several phases of the wing compile on a file, including: parsing, type checking, and capturing
fn partial_compile(source_file: &str, text: &[u8], jsii_types: &mut TypeSystem) -> FileData {
	// Reset diagnostics before new compilation (`partial_compile` can be called multiple)
	reset_diagnostics();

	let mut types = type_check::Types::new();

	let language = tree_sitter_wing::language();
	let mut parser = tree_sitter::Parser::new();
	parser.set_language(language).unwrap();

	let tree = match parser.parse(text, None) {
		Some(tree) => tree,
		None => {
			panic!("Failed parsing source file: {}", source_file);
		}
	};

	let mut files = Files::new();
	let wing_parser = Parser::new(text, source_file.to_string(), &mut files);

	let scope = wing_parser.wingit(&tree.root_node());

	// -- DESUGARING PHASE --

	// Transform all inflight closures defined in preflight into single-method resources
	let mut inflight_transformer = ClosureTransformer::new();
	// Note: The scope is intentionally boxed here to force heap allocation
	// Otherwise, the scope will be moved during type checking and we'll be left with dangling references elsewhere
	let mut scope = Box::new(inflight_transformer.fold_scope(scope));

	// -- TYPECHECKING PHASE --
	let mut jsii_imports = vec![];

	type_check(
		&mut scope,
		&mut types,
		&Path::new(source_file),
		jsii_types,
		&mut jsii_imports,
	);

	// -- JSIFICATION PHASE --

	// source_file will never be "" because it is the path to the file being compiled and lsp does not allow empty paths
	let source_path = Path::new(source_file);
	let app_name = source_path.file_stem().expect("Empty filename").to_str().unwrap();
	let project_dir = source_path.parent().expect("Empty filename");

	let mut jsifier = JSifier::new(&mut types, &files, app_name, &project_dir, true);
	jsifier.jsify(&scope);

	return FileData {
		contents: String::from_utf8(text.to_vec()).unwrap(),
		tree,
		diagnostics: get_diagnostics(),
		scope,
		types,
		jsii_imports,
	};
}

#[cfg(test)]
pub mod test_utils {
	use std::{fs, str::FromStr};
	use uuid::Uuid;

	use lsp_types::*;

	use crate::diagnostic::assert_no_panics;

	use super::on_document_did_open;

	static LANGUAGE_ID: &str = "wing";

	/// Loads a file into the language server
	///
	/// Returns a `TextDocumentPositionParams` with the generated URI and a cursor position of an indicated position in the file (using `//^`)
	///
	/// Example that gives you the position of the "o" in "Resource.":
	/// ```
	/// load_file_with_contents(
	/// r#"
	/// class Resource {
	/// 	static hello() {}
	/// }
	///
	/// Resource.
	///  //^"#
	/// )
	/// ```
	///
	pub fn load_file_with_contents(content: &str) -> TextDocumentPositionParams {
		let temp_dir = tempfile::tempdir().expect("Failed to create temporary directory");
		let filename = format!("{}.w", Uuid::new_v4());
		let file_path = temp_dir.path().join(&filename);
		fs::write(&file_path, content).expect("Failed to write to temporary file");
		let file_uri_string = format!("file:///{}", file_path.to_str().unwrap());
		let uri = Url::from_str(&file_uri_string).unwrap();
		on_document_did_open(DidOpenTextDocumentParams {
			text_document: lsp_types::TextDocumentItem {
				uri: uri.clone(),
				language_id: LANGUAGE_ID.to_string(),
				version: 0,
				text: content.to_string(),
			},
		});

		assert_no_panics();

		// find the character cursor position by looking for the character above the ^
		let mut char_pos = 0_i32;
		let mut line_pos = 0_i32;
		// Note: `.chars()` may not 1-to-1 map with characters as expected if using things like emojis
		// This generally acceptable for testing, but should not be assumed to be the case in the real language server
		// TODO: Add support for grapheme clusters
		for char in content.chars() {
			if char == '^' {
				break;
			} else if char == '\n' {
				char_pos = 0;
				line_pos += 1;
			} else {
				char_pos += 1;
			}
		}

		let cursor_position = Position {
			line: (line_pos - 1).max(0) as u32,
			character: char_pos as u32,
		};

		return TextDocumentPositionParams {
			text_document: TextDocumentIdentifier { uri },
			position: cursor_position,
		};
	}
}
