#[macro_use]
extern crate lazy_static;

use ast::{Scope, Stmt, Symbol, UtilityFunctions};
use diagnostic::{print_diagnostics, Diagnostic, DiagnosticLevel, Diagnostics};
use jsify::JSifier;
use type_check::symbol_env::StatementIdx;
use type_check::{FunctionSignature, SymbolKind, Type};

use crate::parser::Parser;
use std::cell::RefCell;
use std::collections::HashSet;
use std::fs;
use std::path::{Path, PathBuf};

use crate::ast::Phase;
use crate::capture::scan_for_inflights_in_scope;
use crate::type_check::symbol_env::SymbolEnv;
use crate::type_check::{TypeChecker, Types};

pub mod ast;
pub mod capture;
pub mod debug;
pub mod diagnostic;
pub mod jsify;
pub mod parser;
pub mod type_check;
pub mod utilities;

const WINGSDK_ASSEMBLY_NAME: &'static str = "@winglang/sdk";
const WINGSDK_STD_MODULE: &'static str = "std";
const WINGSDK_DURATION: &'static str = "std.Duration";
const WINGSDK_MAP: &'static str = "std.ImmutableMap";
const WINGSDK_MUT_MAP: &'static str = "std.MutableMap";
const WINGSDK_ARRAY: &'static str = "std.ImmutableArray";
const WINGSDK_MUT_ARRAY: &'static str = "std.MutableArray";
const WINGSDK_SET: &'static str = "std.ImmutableSet";
const WINGSDK_MUT_SET: &'static str = "std.MutableSet";
const WINGSDK_STRING: &'static str = "std.String";
const WINGSDK_RESOURCE: &'static str = "core.Resource";
const WINGSDK_INFLIGHT: &'static str = "core.Inflight";

const CONSTRUCT_BASE: &'static str = "constructs.Construct";

pub struct CompilerOutput {
	pub preflight: String,
	// pub inflights: BTreeMap<String, String>,
	pub diagnostics: Diagnostics,
}

unsafe fn ptr_to_string(ptr: u32, len: u32) -> String {
	let slice = std::slice::from_raw_parts(ptr as *const u8, len as usize);
	String::from_utf8_unchecked(slice.to_vec())
}

#[no_mangle]
pub unsafe extern "C" fn wingc_malloc(size: u32) -> *mut u8 {
	let layout = core::alloc::Layout::from_size_align_unchecked(size as usize, 0);
	std::alloc::alloc(layout)
}

#[no_mangle]
pub unsafe extern "C" fn wingc_free(ptr: u32, size: u32) {
	let layout = core::alloc::Layout::from_size_align_unchecked(size as usize, 0);
	std::alloc::dealloc(ptr as *mut u8, layout);
}

#[no_mangle]
pub unsafe extern "C" fn wingc_compile(ptr: u32, len: u32) {
	let args = ptr_to_string(ptr, len);

	let split = args.split(";").collect::<Vec<&str>>();
	let source_file = split[0];
	let output_dir = split.get(1).map(|s| *s);

	let results = compile(source_file, output_dir);
	if let Err(mut err) = results {
		// Sort error messages by line number (ascending)
		err.sort_by(|a, b| a.cmp(&b));
		eprintln!(
			"Compilation failed with {} errors\n{}",
			err.len(),
			err.iter().map(|d| format!("{}", d)).collect::<Vec<_>>().join("\n")
		);
	}
}

pub fn parse(source_file: &str) -> (Scope, Diagnostics) {
	let language = tree_sitter_wing::language();
	let mut parser = tree_sitter::Parser::new();
	parser.set_language(language).unwrap();

	let source = match fs::read(&source_file) {
		Ok(source) => source,
		Err(err) => {
			let mut diagnostics = Diagnostics::new();

			diagnostics.push(Diagnostic {
				message: format!("Error reading source file: {}: {:?}", &source_file, err),
				span: None,
				level: DiagnosticLevel::Error,
			});

			// Set up a dummy scope to return
			let empty_scope = Scope {
				statements: Vec::<Stmt>::new(),
				env: RefCell::new(None),
			};
			return (empty_scope, diagnostics);
		}
	};

	let tree = match parser.parse(&source[..], None) {
		Some(tree) => tree,
		None => {
			panic!("Failed parsing source file: {}", source_file);
		}
	};

	let wing_parser = Parser {
		source: &source[..],
		source_name: source_file.to_string(),
		error_nodes: RefCell::new(HashSet::new()),
		diagnostics: RefCell::new(Diagnostics::new()),
	};

	let scope = wing_parser.wingit(&tree.root_node());

	(scope, wing_parser.diagnostics.into_inner())
}

pub fn type_check(scope: &mut Scope, types: &mut Types) -> Diagnostics {
	let env = SymbolEnv::new(None, types.void(), false, false, Phase::Preflight, 0);
	scope.set_env(env);

	add_builtin(
		UtilityFunctions::Print.to_string().as_str(),
		Type::Function(FunctionSignature {
			args: vec![types.string()],
			return_type: types.void(),
			flight: Phase::Independent,
		}),
		scope,
		types,
	);
	add_builtin(
		UtilityFunctions::Assert.to_string().as_str(),
		Type::Function(FunctionSignature {
			args: vec![types.bool()],
			return_type: types.void(),
			flight: Phase::Independent,
		}),
		scope,
		types,
	);
	add_builtin(
		UtilityFunctions::Throw.to_string().as_str(),
		Type::Function(FunctionSignature {
			args: vec![types.string()],
			return_type: types.void(),
			flight: Phase::Independent,
		}),
		scope,
		types,
	);
	add_builtin(
		UtilityFunctions::Panic.to_string().as_str(),
		Type::Function(FunctionSignature {
			args: vec![types.string()],
			return_type: types.void(),
			flight: Phase::Independent,
		}),
		scope,
		types,
	);

	let mut tc = TypeChecker::new(types);
	tc.add_globals(scope);

	tc.type_check_scope(scope);

	tc.diagnostics.into_inner()
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
			SymbolKind::make_variable(types.add_type(typ), false),
			StatementIdx::Top,
		)
		.expect("Failed to add builtin");
}

pub fn compile(source_file: &str, out_dir: Option<&str>) -> Result<CompilerOutput, Diagnostics> {
	// Create universal types collection (need to keep this alive during entire compilation)
	let mut types = Types::new();
	// Build our AST
	let (mut scope, parse_diagnostics) = parse(source_file);

	// Type check everything and build typed symbol environment
	let type_check_diagnostics = if scope.statements.len() > 0 {
		type_check(&mut scope, &mut types)
	} else {
		// empty scope, no type checking needed
		Diagnostics::new()
	};

	// Print diagnostics
	print_diagnostics(&parse_diagnostics);
	print_diagnostics(&type_check_diagnostics);

	// collect all diagnostics
	let mut diagnostics = parse_diagnostics;
	diagnostics.extend(type_check_diagnostics);

	// Analyze inflight captures
	let mut capture_diagnostics = Diagnostics::new();
	scan_for_inflights_in_scope(&scope, &mut capture_diagnostics);
	diagnostics.extend(capture_diagnostics);

	let errors = diagnostics
		.iter()
		.filter(|d| matches!(d.level, DiagnosticLevel::Error))
		.cloned()
		.collect::<Vec<_>>();

	if errors.len() > 0 {
		return Err(errors);
	}

	// prepare output directory for support inflight code
	let out_dir = PathBuf::from(&out_dir.unwrap_or(format!("{}.out", source_file).as_str()));
	fs::create_dir_all(&out_dir).expect("create output dir");

	let app_name = Path::new(source_file).file_stem().unwrap().to_str().unwrap();
	let jsifier = JSifier::new(out_dir, app_name, true);
	let intermediate_js = jsifier.jsify(&scope);
	let intermediate_name = std::env::var("WINGC_PREFLIGHT").unwrap_or("preflight.js".to_string());
	let intermediate_file = jsifier.out_dir.join(intermediate_name);
	fs::write(&intermediate_file, &intermediate_js).expect("Write intermediate JS to disk");

	return Ok(CompilerOutput {
		preflight: intermediate_js,
		diagnostics,
	});
}

#[cfg(test)]
mod sanity {
	use crate::compile;
	use std::{fs, path::PathBuf};

	fn get_wing_files(dir: &str) -> Vec<PathBuf> {
		let mut files = Vec::new();
		for entry in fs::read_dir(dir).unwrap() {
			let entry = entry.unwrap();
			let path = entry.path();
			if let Some(ext) = path.extension() {
				if ext == "w" {
					files.push(path);
				}
			}
		}
		files
	}

	fn compile_test(test_dir: &str, expect_failure: bool) {
		for test_pathbuf in get_wing_files(test_dir) {
			let test_file = test_pathbuf.to_str().unwrap();
			println!("\n=== {} ===\n", test_file);

			let out_dir = format!("{}.out", test_file);

			// reset out_dir
			let out_dirbuf = PathBuf::from(&out_dir);
			if out_dirbuf.exists() {
				fs::remove_dir_all(&out_dirbuf).expect("remove out dir");
			}

			let result = compile(test_file, Some(out_dir.as_str()));

			if result.is_err() {
				assert!(
					expect_failure,
					"Expected compilation success, but failed: {:#?}",
					result.err().unwrap()
				);
			} else {
				assert!(!expect_failure, "Expected compilation failure, but succeeded");
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
