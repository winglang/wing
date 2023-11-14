#![allow(clippy::all)]
#![deny(clippy::correctness)]
#![deny(clippy::suspicious)]
#![deny(clippy::complexity)]
#![allow(clippy::vec_box)]

#[macro_use]
extern crate lazy_static;

use ast::{AccessModifier, Scope, Symbol, UtilityFunctions};
use camino::{Utf8Path, Utf8PathBuf};
use closure_transform::ClosureTransformer;
use comp_ctx::set_custom_panic_hook;
use diagnostic::{found_errors, report_diagnostic, Diagnostic};
use file_graph::FileGraph;
use files::Files;
use fold::Fold;
use indexmap::IndexMap;
use jsify::JSifier;

use lifting::LiftVisitor;
use parser::parse_wing_project;
use struct_schema::StructSchemaVisitor;
use type_check::jsii_importer::JsiiImportSpec;
use type_check::symbol_env::{StatementIdx, SymbolEnvKind};
use type_check::type_reference_transform::TypeReferenceTransformer;
use type_check::{FunctionSignature, SymbolKind, Type};
use type_check_assert::TypeCheckAssert;
use valid_json_visitor::ValidJsonVisitor;
use visit::Visit;
use wasm_util::{ptr_to_str, string_to_combined_ptr, WASM_RETURN_ERROR};
use wingii::type_system::TypeSystem;

use crate::docs::Docs;
use crate::parser::normalize_path;
use std::alloc::{alloc, dealloc, Layout};

use std::mem;

use crate::ast::Phase;
use crate::type_check::symbol_env::SymbolEnv;
use crate::type_check::{FunctionParameter, TypeChecker, Types};

#[macro_use]
#[cfg(test)]
mod test_utils;

pub mod ast;
pub mod closure_transform;
mod comp_ctx;
pub mod debug;
pub mod diagnostic;
mod docs;
mod file_graph;
mod files;
pub mod fold;
pub mod jsify;
pub mod json_schema_generator;
mod lifting;
pub mod lsp;
pub mod parser;
pub mod struct_schema;
pub mod type_check;
mod type_check_assert;
mod valid_json_visitor;
pub mod visit;
mod visit_context;
mod visit_types;
mod wasm_util;

const WINGSDK_ASSEMBLY_NAME: &'static str = "@winglang/sdk";

pub const WINGSDK_STD_MODULE: &'static str = "std";
const WINGSDK_CLOUD_MODULE: &'static str = "cloud";
const WINGSDK_UTIL_MODULE: &'static str = "util";
const WINGSDK_HTTP_MODULE: &'static str = "http";
const WINGSDK_MATH_MODULE: &'static str = "math";
const WINGSDK_AWS_MODULE: &'static str = "aws";
const WINGSDK_EX_MODULE: &'static str = "ex";
const WINGSDK_EXPECT_MODULE: &'static str = "expect";
const WINGSDK_REGEX_MODULE: &'static str = "regex";
const WINGSDK_FS_MODULE: &'static str = "fs";
const WINGSDK_SIM_MODULE: &'static str = "sim";

pub const UTIL_CLASS_NAME: &'static str = "Util";

const WINGSDK_BRINGABLE_MODULES: [&'static str; 10] = [
	WINGSDK_CLOUD_MODULE,
	WINGSDK_UTIL_MODULE,
	WINGSDK_HTTP_MODULE,
	WINGSDK_MATH_MODULE,
	WINGSDK_AWS_MODULE,
	WINGSDK_EX_MODULE,
	WINGSDK_EXPECT_MODULE,
	WINGSDK_REGEX_MODULE,
	WINGSDK_FS_MODULE,
	WINGSDK_SIM_MODULE,
];

const WINGSDK_DURATION: &'static str = "std.Duration";
const WINGSDK_MAP: &'static str = "std.Map";
const WINGSDK_MUT_MAP: &'static str = "std.MutMap";
const WINGSDK_ARRAY: &'static str = "std.Array";
const WINGSDK_MUT_ARRAY: &'static str = "std.MutArray";
const WINGSDK_SET: &'static str = "std.Set";
const WINGSDK_MUT_SET: &'static str = "std.MutSet";
const WINGSDK_STRING: &'static str = "std.String";
const WINGSDK_JSON: &'static str = "std.Json";
const WINGSDK_MUT_JSON: &'static str = "std.MutJson";
const WINGSDK_RESOURCE: &'static str = "std.Resource";
const WINGSDK_STRUCT: &'static str = "std.Struct";
const WINGSDK_TEST_CLASS_NAME: &'static str = "Test";

const CONSTRUCT_BASE_CLASS: &'static str = "constructs.Construct";

const MACRO_REPLACE_SELF: &'static str = "$self$";
const MACRO_REPLACE_ARGS: &'static str = "$args$";
const MACRO_REPLACE_ARGS_TEXT: &'static str = "$args_text$";

pub const TRUSTED_LIBRARY_NPM_NAMESPACE: &'static str = "@winglibs";

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
	// Setup a custom panic hook to report panics as compilation diagnostics
	set_custom_panic_hook();
}

#[no_mangle]
pub unsafe extern "C" fn wingc_compile(ptr: u32, len: u32) -> u64 {
	let args = ptr_to_str(ptr, len);

	let split = args.split(";").collect::<Vec<&str>>();
	if split.len() != 3 {
		report_diagnostic(Diagnostic {
			message: format!("Expected 3 arguments to wingc_compile, got {}", split.len()),
			span: None,
			annotations: vec![],
			hints: vec![],
		});
		return WASM_RETURN_ERROR;
	}
	let source_path = Utf8Path::new(split[0]);
	let output_dir = split.get(1).map(|s| Utf8Path::new(s)).expect("output dir not provided");
	let project_dir = split
		.get(2)
		.map(|s| Utf8Path::new(s))
		.expect("project dir not provided");

	if !source_path.exists() {
		report_diagnostic(Diagnostic {
			message: format!("Source path cannot be found: {}", source_path),
			span: None,
			annotations: vec![],
			hints: vec![],
		});
		return WASM_RETURN_ERROR;
	}

	let results = compile(project_dir, source_path, None, output_dir);
	if results.is_err() {
		WASM_RETURN_ERROR
	} else {
		string_to_combined_ptr("".to_string())
	}
}

pub fn type_check(
	scope: &mut Scope,
	types: &mut Types,
	file_path: &Utf8Path,
	file_graph: &FileGraph,
	jsii_types: &mut TypeSystem,
	jsii_imports: &mut Vec<JsiiImportSpec>,
) {
	let mut env = types.add_symbol_env(SymbolEnv::new(None, SymbolEnvKind::Scope, Phase::Preflight, 0));
	types.set_scope_env(scope, env);

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
				variadic: false,
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
				variadic: false,
			}],
			return_type: types.void(),
			phase: Phase::Independent,
			js_override: Some(
				"{((cond) => {if (!cond) throw new Error(\"assertion failed: $args_text$\")})($args$)}".to_string(),
			),
			docs: Docs::with_summary("Asserts that a condition is true"),
		}),
		scope,
		types,
	);
	add_builtin(
		UtilityFunctions::UnsafeCast.to_string().as_str(),
		Type::Function(FunctionSignature {
			this_type: None,
			parameters: vec![FunctionParameter {
				name: "value".into(),
				typeref: types.anything(),
				docs: Docs::with_summary("The value to cast into a different type"),
				variadic: false,
			}],
			return_type: types.anything(),
			phase: Phase::Independent,
			js_override: Some("$args$".to_string()),
			docs: Docs::with_summary("Casts a value into a different type. This is unsafe and can cause runtime errors"),
		}),
		scope,
		types,
	);

	let mut tc = TypeChecker::new(types, file_path, file_graph, jsii_types, jsii_imports);
	tc.add_jsii_module_to_env(
		&mut env,
		WINGSDK_ASSEMBLY_NAME.to_string(),
		vec![WINGSDK_STD_MODULE.to_string()],
		&Symbol::global(WINGSDK_STD_MODULE),
		None,
	);

	tc.type_check_file_or_dir(file_path, scope);
}

// TODO: refactor this (why is scope needed?) (move to separate module?)
fn add_builtin(name: &str, typ: Type, scope: &mut Scope, types: &mut Types) {
	let sym = Symbol::global(name);
	let mut scope_env = types.get_scope_env(&scope);
	scope_env
		.define(
			&sym,
			SymbolKind::make_free_variable(sym.clone(), types.add_type(typ), false, Phase::Independent),
			AccessModifier::Private,
			StatementIdx::Top,
		)
		.expect("Failed to add builtin");
}

pub fn compile(
	project_dir: &Utf8Path,
	source_path: &Utf8Path,
	source_text: Option<String>,
	out_dir: &Utf8Path,
) -> Result<CompilerOutput, ()> {
	let source_path = normalize_path(source_path, None);

	// -- PARSING PHASE --
	let mut files = Files::new();
	let mut file_graph = FileGraph::default();
	let mut tree_sitter_trees = IndexMap::new();
	let mut asts = IndexMap::new();
	let topo_sorted_files = parse_wing_project(
		&source_path,
		source_text,
		&mut files,
		&mut file_graph,
		&mut tree_sitter_trees,
		&mut asts,
	);

	// -- DESUGARING PHASE --

	// Transform all inflight closures defined in preflight into single-method resources
	let mut asts = asts
		.into_iter()
		.map(|(path, scope)| {
			let mut inflight_transformer = ClosureTransformer::new();
			let scope = inflight_transformer.fold_scope(scope);
			(path, scope)
		})
		.collect::<IndexMap<Utf8PathBuf, Scope>>();

	// -- TYPECHECKING PHASE --

	// Create universal types collection (need to keep this alive during entire compilation)
	let mut types = Types::new();
	let mut jsii_types = TypeSystem::new();

	// Create a universal JSII import spec (need to keep this alive during entire compilation)
	let mut jsii_imports = vec![];

	// Type check all files in topological order (start with files that don't bring any other
	// Wing files, then move on to files that depend on those, and repeat)
	for file in &topo_sorted_files {
		let mut scope = asts.remove(file).expect("matching AST not found");
		type_check(
			&mut scope,
			&mut types,
			&file,
			&file_graph,
			&mut jsii_types,
			&mut jsii_imports,
		);

		// Make sure all type reference are no longer considered references
		let mut tr_transformer = TypeReferenceTransformer { types: &mut types };
		let scope = tr_transformer.fold_scope(scope);

		// Validate the type checker didn't miss anything - see `TypeCheckAssert` for details
		let mut tc_assert = TypeCheckAssert::new(&types, found_errors());
		tc_assert.check(&scope);

		// Validate all Json literals to make sure their values are legal
		let mut json_checker = ValidJsonVisitor::new(&types);
		json_checker.check(&scope);

		asts.insert(file.clone(), scope);
	}

	// Verify that the project dir is absolute
	if !is_absolute_path(&project_dir) {
		report_diagnostic(Diagnostic {
			message: format!("Project directory must be absolute: {}", project_dir),
			span: None,
			annotations: vec![],
			hints: vec![],
		});
		return Err(());
	}

	let mut jsifier = JSifier::new(&mut types, &files, &file_graph, &source_path);

	// -- LIFTING PHASE --

	let mut asts = asts
		.into_iter()
		.map(|(path, scope)| {
			let mut lift = LiftVisitor::new(&jsifier);
			lift.visit_scope(&scope);
			(path, scope)
		})
		.collect::<IndexMap<Utf8PathBuf, Scope>>();

	// bail out now (before jsification) if there are errors (no point in jsifying)
	if found_errors() {
		return Err(());
	}

	// -- STRUCT SCHEMA GENERATION PHASE --
	// Need to do this before jsification so that we know what struct schemas need to be generated
	asts = asts
		.into_iter()
		.map(|(path, scope)| {
			let mut reference_visitor = StructSchemaVisitor::new(&jsifier);
			reference_visitor.visit_scope(&scope);
			(path, scope)
		})
		.collect::<IndexMap<Utf8PathBuf, Scope>>();

	// -- JSIFICATION PHASE --

	for file in &topo_sorted_files {
		let scope = asts.get_mut(file).expect("matching AST not found");
		jsifier.jsify(file, &scope);
	}

	let files = jsifier.output_files.borrow_mut();
	match files.emit_files(out_dir) {
		Ok(()) => {}
		Err(err) => report_diagnostic(err.into()),
	}

	if found_errors() {
		return Err(());
	}

	return Ok(CompilerOutput {});
}

pub fn is_absolute_path(path: &Utf8Path) -> bool {
	if path.starts_with("/") {
		return true;
	}

	// Check if this is a Windows path instead by checking if the second char is a colon
	// Note: Cannot use Utf8Path::is_absolute() because it doesn't work with Windows paths on WASI
	let chars = path.as_str().chars().collect::<Vec<char>>();
	if chars.len() < 2 || chars[1] != ':' {
		return false;
	}

	return true;
}

#[cfg(test)]
mod sanity {
	use camino::{Utf8Path, Utf8PathBuf};

	use crate::{compile, diagnostic::assert_no_panics};
	use std::fs;

	fn get_wing_files<P>(dir: P) -> impl Iterator<Item = Utf8PathBuf>
	where
		P: AsRef<Utf8Path>,
	{
		fs::read_dir(dir.as_ref())
			.unwrap()
			.map(|entry| Utf8PathBuf::from_path_buf(entry.unwrap().path()).expect("invalid unicode path"))
			.filter(|path| path.is_file() && path.extension().map(|ext| ext == "w").unwrap_or(false))
	}

	fn compile_test(test_dir: &str, expect_failure: bool) {
		let test_dir = Utf8Path::new(test_dir).canonicalize_utf8().unwrap();
		for test_file in get_wing_files(&test_dir) {
			println!("\n=== {} ===\n", test_file);

			let out_dir = test_dir.join(format!("target/wingc/{}.out", test_file.file_name().unwrap()));

			// reset out_dir
			if out_dir.exists() {
				fs::remove_dir_all(&out_dir).expect("remove out dir");
			}

			let result = compile(&test_dir, &test_file, None, &out_dir);

			if result.is_err() {
				assert!(
					expect_failure,
					"{}: Expected compilation success, but failed: {:#?}",
					test_file,
					result.err().unwrap()
				);

				// Even if the test fails when we expect it to, none of the failures should be due to a compiler bug
				assert_no_panics();
			} else {
				assert!(
					!expect_failure,
					"{}: Expected compilation failure, but succeeded",
					test_file,
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
