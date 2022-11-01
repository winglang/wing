#[macro_use]
extern crate lazy_static;

use crate::parser::bring;
use ast::Scope;
use diagnostic::{print_diagnostics, DiagnosticLevel, Diagnostics};

use std::collections::HashSet;
use std::fs;
use std::path::PathBuf;

use crate::ast::Flight;
use crate::capture::scan_captures;
use crate::type_check::type_env::TypeEnv;
use crate::type_check::{TypeChecker, Types};

pub mod ast;
pub mod debug;
pub mod capture;
pub mod diagnostic;
pub mod jsify;
pub mod parser;
pub mod type_check;

pub fn type_check(scope: &mut Scope, types: &mut Types) -> Diagnostics {
	scope.set_env(TypeEnv::new(None, None, false, Flight::Pre));
	let mut tc = TypeChecker::new(types);
	tc.type_check_scope(scope);

	tc.diagnostics.into_inner()
}

pub fn compile(source_file: &str, out_dir: Option<&str>) -> String {
	// create a new hashmap to manage imports
	let mut imports = HashSet::new();
	// Create universal types collection (need to keep this alive during entire compilation)
	let mut types = Types::new();
	// Build our AST
	let (mut scope, parse_diagnostics) = bring::bring(source_file, None, &mut imports).unwrap();
	// Type check everything and build typed symbol environment
	let type_check_diagnostics = type_check(&mut scope, &mut types);

	// Print diagnostics
	print_diagnostics(&parse_diagnostics);
	print_diagnostics(&type_check_diagnostics);

	// collect all diagnostics
	let mut diagnostics = parse_diagnostics;
	diagnostics.extend(type_check_diagnostics);

	let errors = diagnostics
		.iter()
		.filter(|d| matches!(d.level, DiagnosticLevel::Error))
		.collect::<Vec<_>>();

	if errors.len() > 0 {
		panic!(
			"Compilation failed with {} errors\n{}",
			errors.len(),
			errors.iter().map(|d| format!("{}", d)).collect::<Vec<_>>().join("\n")
		);
	}

	// Analyze inflight captures
	scan_captures(&scope);

	// prepare output directory for support inflight code
	let out_dir = PathBuf::from(&out_dir.unwrap_or(format!("{}.out", source_file).as_str()));
	fs::create_dir_all(&out_dir).expect("create output dir");

	let intermediate_js = jsify::jsify(&scope, &out_dir, true);
	let intermediate_name = std::env::var("WINGC_PREFLIGHT").unwrap_or("preflight.js".to_string());
	let intermediate_file = out_dir.join(intermediate_name);
	fs::write(&intermediate_file, &intermediate_js).expect("Write intermediate JS to disk");

	return intermediate_js;
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
			if path.extension().unwrap() == "w" {
				files.push(path);
			}
		}
		files
	}

	#[test]
	fn can_compile_valid_files() {
		for test_file in get_wing_files("../../examples/tests/valid") {
			let test_file = test_file.to_str().unwrap();
			println!("\n=== {} ===\n", test_file);
			println!("{}\n---", compile(test_file, None));
		}
	}

	#[test]
	fn cannot_compile_invalid_files() {
		for test_file in get_wing_files("../../examples/tests/invalid") {
			let test_file = test_file.to_str().unwrap();
			println!("\n=== {} ===\n", test_file);
			let result = std::panic::catch_unwind(|| compile(test_file, None));
			assert!(result.is_err());
		}
	}
}
