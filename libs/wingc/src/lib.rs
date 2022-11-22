#[macro_use]
extern crate lazy_static;

use ast::{Scope, Symbol};
use diagnostic::{print_diagnostics, CharacterLocation, DiagnosticLevel, Diagnostics, WingSpan};
use type_check::type_env::StatementIdx;
use type_check::{FunctionSignature, Type};

use crate::parser::Parser;
use std::cell::RefCell;
use std::fs;
use std::path::PathBuf;

use crate::ast::Phase;
use crate::capture::scan_captures;
use crate::type_check::type_env::TypeEnv;
use crate::type_check::{TypeChecker, Types};

pub mod ast;
pub mod capture;
pub mod debug;
pub mod diagnostic;
pub mod jsify;
pub mod parser;
pub mod type_check;
pub mod utilities;

pub struct CompilerOutput {
	pub preflight: String,
	// pub inflights: BTreeMap<String, String>,
	pub diagnostics: Diagnostics,
}

pub fn parse(source_file: &str) -> (Scope, Diagnostics) {
	let language = tree_sitter_wing::language();
	let mut parser = tree_sitter::Parser::new();
	parser.set_language(language).unwrap();

	let source = match fs::read(&source_file) {
		Ok(source) => source,
		Err(err) => {
			panic!("Error reading source file: {}: {:?}", &source_file, err);
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
		diagnostics: RefCell::new(Diagnostics::new()),
	};

	let scope = wing_parser.wingit(&tree.root_node());

	(scope, wing_parser.diagnostics.into_inner())
}

pub fn type_check(scope: &mut Scope, types: &mut Types) -> Diagnostics {
	scope.set_env(TypeEnv::new(None, None, false, Phase::Preflight, 0));

	add_builtin(
		"print",
		Type::Function(FunctionSignature {
			args: vec![types.string()],
			return_type: None,
			flight: Phase::Independent,
			needs_jsii_case_conversion: false,
		}),
		scope,
		types,
	);

	let mut tc = TypeChecker::new(types);
	tc.type_check_scope(scope);

	tc.diagnostics.into_inner()
}

// TODO: refactor this (why is scope needed?) (move to separate module?)
fn add_builtin(name: &str, typ: Type, scope: &mut Scope, types: &mut Types) {
	let sym = Symbol {
		name: name.to_string(),
		span: WingSpan {
			start: CharacterLocation { row: 0, column: 0 },
			end: CharacterLocation { row: 0, column: 0 },
			start_byte: 0,
			end_byte: 0,
			file_id: "".into(),
		},
	};
	scope
		.env
		.as_mut()
		.unwrap()
		.define(&sym, types.add_type(typ), StatementIdx::Top);
}

pub fn compile(source_file: &str, out_dir: Option<&str>) -> Result<CompilerOutput, Diagnostics> {
	// Create universal types collection (need to keep this alive during entire compilation)
	let mut types = Types::new();
	// Build our AST
	let (mut scope, parse_diagnostics) = parse(source_file);

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
		.cloned()
		.collect::<Vec<_>>();

	if errors.len() > 0 {
		return Err(errors);
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
			if path.extension().unwrap() == "w" {
				files.push(path);
			}
		}
		files
	}

	fn snapshot_test(test_dir: &str, expect_failure: bool) {
		for test_pathbuf in get_wing_files(test_dir) {
			let test_file = test_pathbuf.to_str().unwrap();
			let test_file_name = test_pathbuf.file_stem().unwrap().to_str().unwrap();
			println!("\n=== {} ===\n", test_file);

			insta::with_settings!({
				omit_expression => true,
				prepend_module_to_snapshot => false,
				description => test_file,
			}, {
				let out_dir = format!("{}.out", test_file);

				// reset out_dir
				let out_dirbuf = PathBuf::from(&out_dir);
				if out_dirbuf.exists() {
					fs::remove_dir_all(&out_dirbuf).expect("remove out dir");
				}

				let result = compile(test_file, Some(out_dir.as_str()));
				let mut snapshot = String::new();

				if let Err(diagnostics) = result {
					assert!(expect_failure, "Expected compilation success, but failed");

					insta::assert_debug_snapshot!(format!("invalid_{}", test_file_name), diagnostics);
				} else {
					assert!(!expect_failure, "Expected compilation failure, but succeeded");

					let output_files = walkdir::WalkDir::new(out_dir).sort_by_file_name();
					for file in output_files {
						if let Ok(file) = file {
							let path = file.path();
							if path.is_file() {
								let file_contents = fs::read_to_string(path).unwrap();
								snapshot.push_str(&format!("// {}\n{}\n", path.to_str().unwrap(), file_contents));
							}
						}
					}

					insta::assert_snapshot!(format!("valid_{}", test_file_name), snapshot);
				}
			});
		}
	}

	#[test]
	fn can_compile_valid_files() {
		snapshot_test("../../examples/tests/valid", false);
	}

	#[test]
	fn cannot_compile_invalid_files() {
		snapshot_test("../../examples/tests/invalid", true);
	}
}
