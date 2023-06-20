#![allow(clippy::all)]
#![deny(clippy::correctness)]
#![deny(clippy::suspicious)]
#![deny(clippy::complexity)]
#![allow(clippy::vec_box)]

#[macro_use]
extern crate lazy_static;

use ast::{Scope, Stmt, Symbol, UtilityFunctions};
use closure_transform::ClosureTransformer;
use comp_ctx::set_custom_panic_hook;
use diagnostic::{found_errors, report_diagnostic, Diagnostic};
use fold::Fold;
use jsify::JSifier;
use type_check::symbol_env::StatementIdx;
use type_check::{FunctionSignature, SymbolKind, Type};
use type_check_assert::TypeCheckAssert;
use wasm_util::{ptr_to_string, string_to_combined_ptr, WASM_RETURN_ERROR};
use wingii::type_system::TypeSystem;

use crate::docs::Docs;
use crate::parser::Parser;
use std::alloc::{alloc, dealloc, Layout};
use std::cell::RefCell;

use std::fs;
use std::mem;
use std::path::{Path, PathBuf};

use crate::ast::Phase;
use crate::type_check::symbol_env::SymbolEnv;
use crate::type_check::{FunctionParameter, TypeChecker, Types};

pub mod ast;
pub mod closure_transform;
mod comp_ctx;
pub mod debug;
pub mod diagnostic;
mod docs;
pub mod fold;
pub mod jsify;
pub mod lsp;
pub mod parser;
pub mod type_check;
mod type_check_assert;
pub mod visit;
mod wasm_util;

const WINGSDK_ASSEMBLY_NAME: &'static str = "@winglang/sdk";

pub const WINGSDK_STD_MODULE: &'static str = "std";
const WINGSDK_REDIS_MODULE: &'static str = "redis";
const WINGSDK_CLOUD_MODULE: &'static str = "cloud";
const WINGSDK_UTIL_MODULE: &'static str = "util";
const WINGSDK_HTTP_MODULE: &'static str = "http";

const WINGSDK_DURATION: &'static str = "std.Duration";
const WINGSDK_MAP: &'static str = "std.ImmutableMap";
const WINGSDK_MUT_MAP: &'static str = "std.MutableMap";
const WINGSDK_ARRAY: &'static str = "std.ImmutableArray";
const WINGSDK_MUT_ARRAY: &'static str = "std.MutableArray";
const WINGSDK_SET: &'static str = "std.ImmutableSet";
const WINGSDK_MUT_SET: &'static str = "std.MutableSet";
const WINGSDK_STRING: &'static str = "std.String";
const WINGSDK_JSON: &'static str = "std.Json";
const WINGSDK_MUT_JSON: &'static str = "std.MutJson";
const WINGSDK_RESOURCE: &'static str = "std.Resource";
const WINGSDK_TEST_CLASS_NAME: &'static str = "Test";

const CONSTRUCT_BASE_CLASS: &'static str = "constructs.Construct";

const MACRO_REPLACE_SELF: &'static str = "$self$";
const MACRO_REPLACE_ARGS: &'static str = "$args$";

pub struct CompilerOutput {}

/// Exposes an allocation function to the WASM host
///
/// _This implementation is copied from wasm-bindgen_
#[no_mangle]
pub unsafe extern "C" fn wingc_malloc(size: usize) -> *mut u8 {
	let align = mem::align_of::<usize>();
	let layout = Layout::from_size_align(size, align).expect("Invalid layout");
	if layout.size() > 0 {
		let ptr = alloc(layout);
		if !ptr.is_null() {
			return ptr;
		} else {
			std::alloc::handle_alloc_error(layout);
		}
	} else {
		return align as *mut u8;
	}
}

/// Expose a deallocation function to the WASM host
///
/// _This implementation is copied from wasm-bindgen_
#[no_mangle]
pub unsafe extern "C" fn wingc_free(ptr: *mut u8, size: usize) {
	// This happens for zero-length slices, and in that case `ptr` is
	// likely bogus so don't actually send this to the system allocator
	if size == 0 {
		return;
	}
	let align = mem::align_of::<usize>();
	let layout = Layout::from_size_align_unchecked(size, align);
	dealloc(ptr, layout);
}

/// Expose one time-initiliazation function to the WASM host,
/// should be called before any other function
#[no_mangle]
pub unsafe extern "C" fn wingc_init() {
	// Setup a custom panic hook to report panics as complitation diagnostics
	set_custom_panic_hook();
}

#[no_mangle]
pub unsafe extern "C" fn wingc_compile(ptr: u32, len: u32) -> u64 {
	let args = ptr_to_string(ptr, len);

	let split = args.split(";").collect::<Vec<&str>>();
	let source_file = Path::new(split[0]);
	let output_dir = split.get(1).map(|s| Path::new(s));
	let absolute_project_dir = split.get(2).map(|s| Path::new(s));

	let results = compile(source_file, output_dir, absolute_project_dir);
	if results.is_err() {
		WASM_RETURN_ERROR
	} else {
		string_to_combined_ptr("winged it!".to_string())
	}
}

pub fn parse(source_path: &Path) -> Scope {
	let language = tree_sitter_wing::language();
	let mut parser = tree_sitter::Parser::new();
	parser.set_language(language).unwrap();

	let source = match fs::read(&source_path) {
		Ok(source) => source,
		Err(err) => {
			report_diagnostic(Diagnostic {
				message: format!("Error reading source file: {}: {:?}", source_path.display(), err),
				span: None,
			});

			// Set up a dummy scope to return
			let empty_scope = Scope {
				statements: Vec::<Stmt>::new(),
				env: RefCell::new(None),
				span: Default::default(),
			};
			return empty_scope;
		}
	};

	let tree = match parser.parse(&source[..], None) {
		Some(tree) => tree,
		None => {
			panic!("Failed parsing source file: {}", source_path.display());
		}
	};

	let wing_parser = Parser::new(&source[..], source_path.to_str().unwrap().to_string());

	wing_parser.wingit(&tree.root_node())
}

pub fn type_check(scope: &mut Scope, types: &mut Types, source_path: &Path, jsii_types: &mut TypeSystem) {
	assert!(scope.env.borrow().is_none(), "Scope should not have an env yet");
	let env = SymbolEnv::new(None, types.void(), false, Phase::Preflight, 0);
	scope.set_env(env);

	// note: Globals are emitted here and wrapped in "{ ... }" blocks. Wrapping makes these emissions, actual
	// statements and not expressions. this makes the runtime panic if these are used in place of expressions.
	add_builtin(
		UtilityFunctions::Log.to_string().as_str(),
		Type::Function(FunctionSignature {
			this_type: None,
			parameters: vec![FunctionParameter {
				name: "message".into(),
				typeref: types.string(),
				docs: Docs::with_summary("The message to log"),
			}],
			return_type: types.void(),
			phase: Phase::Independent,
			js_override: Some("{console.log($args$)}".to_string()),
			docs: Docs::with_summary("Logs a message"),
		}),
		scope,
		types,
	);
	add_builtin(
		UtilityFunctions::Assert.to_string().as_str(),
		Type::Function(FunctionSignature {
			this_type: None,
			parameters: vec![FunctionParameter {
				name: "condition".into(),
				typeref: types.bool(),
				docs: Docs::with_summary("The condition to assert"),
			}],
			return_type: types.void(),
			phase: Phase::Independent,
			js_override: Some("{((cond) => {if (!cond) throw new Error(`assertion failed: '$args$'`)})($args$)}".to_string()),
			docs: Docs::with_summary("Asserts that a condition is true"),
		}),
		scope,
		types,
	);
	add_builtin(
		UtilityFunctions::Throw.to_string().as_str(),
		Type::Function(FunctionSignature {
			this_type: None,
			parameters: vec![FunctionParameter {
				typeref: types.string(),
				name: "message".into(),
				docs: Docs::with_summary("The message to throw"),
			}],
			return_type: types.void(),
			phase: Phase::Independent,
			js_override: Some("{((msg) => {throw new Error(msg)})($args$)}".to_string()),
			docs: Docs::with_summary("throws an error"),
		}),
		scope,
		types,
	);
	add_builtin(
		UtilityFunctions::Panic.to_string().as_str(),
		Type::Function(FunctionSignature {
			this_type: None,
			parameters: vec![FunctionParameter {
				typeref: types.string(),
				name: "message".into(),
				docs: Docs::with_summary("The message to panic with"),
			}],
			return_type: types.void(),
			phase: Phase::Independent,
			js_override: Some("{((msg) => {console.error(msg, (new Error()).stack);process.exit(1)})($args$)}".to_string()),
			docs: Docs::with_summary("panics with an error"),
		}),
		scope,
		types,
	);

	let mut tc = TypeChecker::new(types, source_path, jsii_types);
	tc.add_globals(scope);

	tc.type_check_scope(scope);
}

// TODO: refactor this (why is scope needed?) (move to separate module?)
fn add_builtin(name: &str, typ: Type, scope: &mut Scope, types: &mut Types) {
	let sym = Symbol::global(name);
	scope
		.env
		.borrow_mut()
		.as_mut()
		.unwrap()
		.define(
			&sym,
			SymbolKind::make_free_variable(sym.clone(), types.add_type(typ), false, Phase::Independent),
			StatementIdx::Top,
		)
		.expect("Failed to add builtin");
}

pub fn compile(
	source_path: &Path,
	out_dir: Option<&Path>,
	absolute_project_root: Option<&Path>,
) -> Result<CompilerOutput, ()> {
	if !source_path.exists() {
		report_diagnostic(Diagnostic {
			message: format!("Source file cannot be found: {}", source_path.display()),
			span: None,
		});
		return Err(());
	}

	if !source_path.is_file() {
		report_diagnostic(Diagnostic {
			message: format!(
				"Source path must be a file (not a directory or symlink): {}",
				source_path.display()
			),
			span: None,
		});
		return Err(());
	}

	let file_name = source_path.file_name().unwrap().to_str().unwrap();
	let default_out_dir = PathBuf::from(format!("{}.out", file_name));
	let out_dir = out_dir.unwrap_or(default_out_dir.as_ref());

	// -- PARSING PHASE --
	let scope = parse(&source_path);

	// -- DESUGARING PHASE --

	// Transform all inflight closures defined in preflight into single-method resources
	let mut inflight_transformer = ClosureTransformer::new();
	let mut scope = inflight_transformer.fold_scope(scope);

	// -- TYPECHECKING PHASE --

	// Create universal types collection (need to keep this alive during entire compilation)
	let mut types = Types::new();
	let mut jsii_types = TypeSystem::new();

	// Type check everything and build typed symbol environment
	type_check(&mut scope, &mut types, &source_path, &mut jsii_types);

	// Validate that every Expr in the final tree has been type checked
	let mut tc_assert = TypeCheckAssert::new(&types);
	tc_assert.check(&scope);

	// bail out now (before jsification) if there are errors (no point in jsifying)
	if found_errors() {
		return Err(());
	}

	// -- JSIFICATION PHASE --

	let app_name = source_path.file_stem().unwrap().to_str().unwrap();
	let project_dir = absolute_project_root
		.unwrap_or(source_path.parent().unwrap())
		.to_path_buf();

	// Verify that the project dir is absolute
	if !is_project_dir_absolute(&project_dir) {
		report_diagnostic(Diagnostic {
			message: format!("Project directory must be absolute: {}", project_dir.display()),
			span: None,
		});
		return Err(());
	}

	let mut jsifier = JSifier::new(&types, app_name, &project_dir, true);
	jsifier.jsify(&scope);
	jsifier.emit_files(&out_dir);

	if found_errors() {
		return Err(());
	}

	return Ok(CompilerOutput {});
}

fn is_project_dir_absolute(project_dir: &PathBuf) -> bool {
	if project_dir.starts_with("/") {
		return true;
	}

	let dir_str = project_dir.to_str().expect("Project dir is valid UTF-8");
	// Check if this is a Windows path instead by checking if the second char is a colon
	// Note: Cannot use Path::is_absolute() because it doesn't work with Windows paths on WASI
	if dir_str.len() < 2 || dir_str.chars().nth(1).expect("Project dir has second character") != ':' {
		return false;
	}

	return true;
}

#[cfg(test)]
mod sanity {
	use crate::compile;
	use std::{
		fs,
		path::{Path, PathBuf},
	};

	fn get_wing_files<P>(dir: P) -> impl Iterator<Item = PathBuf>
	where
		P: AsRef<Path>,
	{
		fs::read_dir(dir)
			.unwrap()
			.map(|entry| entry.unwrap().path())
			.filter(|path| path.is_file() && path.extension().map(|ext| ext == "w").unwrap_or(false))
	}

	fn compile_test(test_dir: &str, expect_failure: bool) {
		for test_file in get_wing_files(test_dir) {
			println!("\n=== {} ===\n", test_file.display());

			let mut out_dir = test_file.parent().unwrap().to_path_buf();
			out_dir.push(format!(
				"target/wingc/{}.out",
				test_file.file_name().unwrap().to_str().unwrap()
			));

			// reset out_dir
			if out_dir.exists() {
				fs::remove_dir_all(&out_dir).expect("remove out dir");
			}

			let result = compile(
				&test_file,
				Some(&out_dir),
				Some(test_file.canonicalize().unwrap().parent().unwrap()),
			);

			if result.is_err() {
				assert!(
					expect_failure,
					"{}: Expected compilation success, but failed: {:#?}",
					test_file.display(),
					result.err().unwrap()
				);
			} else {
				assert!(
					!expect_failure,
					"{}: Expected compilation failure, but succeeded",
					test_file.display()
				);
			}
		}
	}

	#[test]
	fn can_compile_valid_files() {
		compile_test("../../examples/tests/valid", false);
	}

	#[test]
	fn can_compile_error_files() {
		compile_test("../../examples/tests/error", false);
	}

	#[test]
	fn cannot_compile_invalid_files() {
		compile_test("../../examples/tests/invalid", true);
	}
}
