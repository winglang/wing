use ast::Scope;
use diagnostic::{print_diagnostics, DiagnosticLevel, Diagnostics};

use crate::parser::Parser;
use std::cell::RefCell;
use std::path::{Path, PathBuf};
use std::{env, fs};

use crate::ast::Flight;
use crate::capture::scan_captures;
use crate::type_check::type_env::TypeEnv;
use crate::type_check::{TypeChecker, Types};

pub mod ast;
pub mod capture;
pub mod diagnostic;
pub mod jsify;
pub mod parser;
pub mod type_check;

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

pub fn type_check(scope: &mut Scope, types: &mut Types, wingii_dirs: Vec<PathBuf>) -> Diagnostics {
	scope.set_env(TypeEnv::new(None, None, false, Flight::Pre));
	let mut tc = TypeChecker::new(types, wingii_dirs);
	tc.type_check_scope(scope);

	tc.diagnostics.into_inner()
}

pub fn compile(source_file: &str, out_dir: Option<&str>) -> String {
	// Create universal types collection (need to keep this alive during entire compilation)
	let mut types = Types::new();
	// Build our AST
	let (mut scope, parse_diagnostics) = parse(source_file);

	let source_dir = match Path::new(source_file).is_absolute() {
		true => Path::new(source_file).parent().unwrap().to_path_buf(),
		false => env::current_dir().unwrap(),
	};
	println!("source_dir: {}", source_dir.display());

	// Type check everything and build typed symbol environment
	let type_check_diagnostics = type_check(&mut scope, &mut types, vec![source_dir]);

	// Analyze inflight captures
	scan_captures(&scope);

	// prepare output directory for support inflight code
	let out_dir = PathBuf::from(&out_dir.unwrap_or(format!("{}.out", source_file).as_str()));
	fs::create_dir_all(&out_dir).expect("create output dir");

	// Print diagnostics
	print_diagnostics(&parse_diagnostics);
	print_diagnostics(&type_check_diagnostics);

	if parse_diagnostics
		.iter()
		.any(|x| matches!(x.level, DiagnosticLevel::Error))
		|| type_check_diagnostics
			.iter()
			.any(|x| matches!(x.level, DiagnosticLevel::Error))
	{
		std::process::exit(1);
	}

	let intermediate_js = jsify::jsify(&scope, &out_dir, true);
	let intermediate_file = out_dir.join("intermediate.js");
	fs::write(&intermediate_file, &intermediate_js).expect("Write intermediate JS to disk");

	return intermediate_js;
}

#[cfg(test)]
mod sanity {
	use crate::compile;
	use std::fs;

	#[test]
	fn can_compile_simple_files() {
		let paths = fs::read_dir("../../examples/simple").unwrap();

		for entry in paths {
			if let Ok(entry) = dbg!(entry) {
				if let Some(source) = entry.path().canonicalize().unwrap().to_str() {
					if source.ends_with(".w") {
						println!("\n=== {} ===\n", source);
						println!("{}\n---", compile(source, None));
					}
				}
			}
		}
	}
}
