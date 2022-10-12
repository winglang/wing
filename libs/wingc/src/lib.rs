use ast::Scope;
use diagnostic::{print_diagnostics, Diagnostics};

use crate::parser::Parser;
use std::cell::RefCell;
use std::fs;
use std::path::PathBuf;

use crate::ast::Flight;
use crate::capture::scan_captures;
use crate::type_check::{TypeChecker, Types};
use crate::type_env::TypeEnv;

pub mod ast;
pub mod capture;
pub mod diagnostic;
pub mod jsify;
pub mod parser;
pub mod type_check;
pub mod type_env;

pub type DiagnosticTuple<T> = (T, Diagnostics);

pub fn parse(source_file: &str) -> DiagnosticTuple<Scope> {
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
	scope.set_env(TypeEnv::new(None, None, false, Flight::Pre));
	let mut tc = TypeChecker::new(types);
	tc.type_check_scope(scope);

	tc.diagnostics.into_inner()
}

pub fn compile(source_file: &str, out_dir: Option<&str>) -> String {
	// Create universal types collection (need to keep this alive during entire compilation)
	let mut types = Types::new();
	// Build our AST
	let scope_result = parse(source_file);
	let mut scope = scope_result.0;
	let parse_diagnostics = scope_result.1;

	// Type check everything and build typed symbol environment
	let type_check_diagnostics = type_check(&mut scope, &mut types);

	// Analyze inflight captures
	scan_captures(&scope);

	// prepare output directory for support inflight code
	let out_dir = PathBuf::from(&out_dir.unwrap_or(format!("{}.out", source_file).as_str()));
	fs::create_dir_all(&out_dir).expect("create output dir");

	let intermediate_js = jsify::jsify(&scope, &out_dir, true);
	let intermediate_file = out_dir.join("intermediate.js");
	fs::write(&intermediate_file, &intermediate_js).expect("Write intermediate JS to disk");

	// Print diagnostics
	print_diagnostics(&parse_diagnostics);
	print_diagnostics(&type_check_diagnostics);

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
			if let Ok(entry) = entry {
				if let Some(source) = entry.path().to_str() {
					if source.ends_with(".w") {
						println!("\n=== {} ===\n", source);
						println!("{}\n---", compile(source, None));
					}
				}
			}
		}
	}
}
