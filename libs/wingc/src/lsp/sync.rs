use camino::{Utf8Path, Utf8PathBuf};
use indexmap::IndexMap;
use lsp_types::{DidChangeTextDocumentParams, DidOpenTextDocumentParams};
use wingii::type_system::TypeSystem;

use std::cell::RefCell;
use std::path::{Path, PathBuf};
use tree_sitter::Tree;

use crate::closure_transform::ClosureTransformer;
use crate::diagnostic::{found_errors, reset_diagnostics};
use crate::file_graph::FileGraph;
use crate::files::Files;
use crate::fold::Fold;
use crate::jsify::JSifier;
use crate::lifting::LiftVisitor;
use crate::parser::parse_wing_project;
use crate::type_check;
use crate::type_check::jsii_importer::JsiiImportSpec;
use crate::type_check_assert::TypeCheckAssert;
use crate::valid_json_visitor::ValidJsonVisitor;
use crate::visit::Visit;
use crate::{ast::Scope, type_check::Types, wasm_util::ptr_to_string};

/// The output of compiling a Wing project with one or more files
pub struct ProjectData {
	/// Text data contained in the files (utf8)
	pub files: Files,
	/// A graph that tracks the dependencies between files
	pub file_graph: FileGraph,
	/// tree-sitter trees
	pub trees: IndexMap<Utf8PathBuf, Tree>,
	/// AST for each file
	pub asts: IndexMap<Utf8PathBuf, Scope>,
	/// The JSII imports for the file. This is saved so we can load JSII types (for autocompletion for example)
	/// which don't exist explicitly in the source.
	pub jsii_imports: Vec<JsiiImportSpec>,
}

impl ProjectData {
	fn new() -> Self {
		ProjectData {
			files: Files::new(),
			file_graph: FileGraph::default(),
			trees: IndexMap::new(),
			asts: IndexMap::new(),
			jsii_imports: Vec::new(),
		}
	}
}

thread_local! {
	/// When consumed as a WASM library, wingc is not in control of the process/memory in which it is running.
	/// This means that it cannot reliably manage stateful data like this between function calls.
	/// Here we will assume the process is single threaded, and use thread_local to store this data.
	pub static WING_TYPES: RefCell<Types> = RefCell::new(Types::new());
	pub static PROJECT_DATA: RefCell<ProjectData> = RefCell::new(ProjectData::new());
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
	WING_TYPES.with(|wing_types| {
		JSII_TYPES.with(|jsii_types| {
			PROJECT_DATA.with(|project_data| {
				let uri = params.text_document.uri;
				let uri_path = uri.to_file_path().unwrap();
				let source_text = params.text_document.text;

				partial_compile(
					&uri_path,
					source_text,
					&mut wing_types.borrow_mut(),
					&mut jsii_types.borrow_mut(),
					&mut project_data.borrow_mut(),
				);
			});
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
	let DidChangeTextDocumentParams {
		text_document,
		content_changes,
	} = params;

	WING_TYPES.with(|wing_types| {
		JSII_TYPES.with(|jsii_types| {
			PROJECT_DATA.with(|project_data| {
				let uri = text_document.uri;
				let uri_path = uri.to_file_path().unwrap();
				let source_text = content_changes.into_iter().next().unwrap().text;

				partial_compile(
					&uri_path,
					source_text,
					&mut wing_types.borrow_mut(),
					&mut jsii_types.borrow_mut(),
					&mut project_data.borrow_mut(),
				);
			});
		})
	});
}

/// Runs several phases of the wing compiler on a file, including: parsing, type checking, and lifting
/// `ProjectData` is passed with results from previous compilations, and is updated with the results of this compilation.
fn partial_compile(
	source_path: &Path,
	source_text: String,
	mut types: &mut Types, // TODO: does this need to be shared between recompiles?
	jsii_types: &mut TypeSystem,
	project_data: &mut ProjectData,
) {
	// Reset diagnostics before new compilation (`partial_compile` can be called multiple times)
	reset_diagnostics();

	let source_path = Utf8Path::from_path(source_path).expect("invalid unicide path");

	let topo_sorted_files = parse_wing_project(
		&source_path,
		source_text,
		&mut project_data.files,
		&mut project_data.file_graph,
		&mut project_data.trees,
		&mut project_data.asts,
	);

	// -- DESUGARING PHASE --

	// Transform all inflight closures defined in preflight into single-method resources
	for file in &topo_sorted_files {
		let mut inflight_transformer = ClosureTransformer::new();
		let scope = project_data.asts.remove(file).unwrap();
		let new_scope = inflight_transformer.fold_scope(scope);
		project_data.asts.insert(file.clone(), new_scope);
	}

	// Reset all type information
	types.reset_expr_types();
	types.reset_scope_envs();

	// -- TYPECHECKING PHASE --
	let mut jsii_imports = vec![];

	// Type check all files in topological order (start with files that don't require any other
	// Wing files, then move on to files that depend on those, etc.)
	for file in &topo_sorted_files {
		let mut scope = project_data.asts.get_mut(file).expect("matching AST not found");
		type_check(&mut scope, &mut types, &file, jsii_types, &mut jsii_imports);

		// Validate the type checker didn't miss anything - see `TypeCheckAssert` for details
		let mut tc_assert = TypeCheckAssert::new(&types, found_errors());
		tc_assert.check(&scope);

		// Validate all Json literals to make sure their values are legal
		let mut json_checker = ValidJsonVisitor::new(&types);
		json_checker.check(&scope);
	}

	// -- LIFTING PHASE --

	// source_file will never be "" because it is the path to the file being compiled and lsp does not allow empty paths
	let project_dir = source_path.parent().expect("Empty filename");

	let jsifier = JSifier::new(&mut types, &project_data.files, &source_path, &project_dir);
	for file in &topo_sorted_files {
		let mut lift = LiftVisitor::new(&jsifier);
		let scope = project_data.asts.remove(file).expect("matching AST not found");
		lift.visit_scope(&scope);
		project_data.asts.insert(file.clone(), scope);
	}

	// no need to JSify in the LSP
}

pub fn check_utf8(path: PathBuf) -> Utf8PathBuf {
	path.try_into().expect("invalid unicode path")
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
