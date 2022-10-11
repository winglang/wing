use crate::Diagnostics;
use crate::Scope;

use crate::parser::Parser;
use std::cell::RefCell;
use std::collections::HashSet;
use std::fs;
use std::path::PathBuf;

use crate::ast::Flight;
use crate::capture::scan_captures;
use crate::type_check::type_env::TypeEnv;
use crate::type_check::{TypeChecker, Types};

pub fn bring(source_file: &str, context: Option<&str>, imports: &mut HashSet<String>) -> Option<Scope> {
	// default context directory to the current directory
	let context_dir = PathBuf::from(&context.unwrap_or("."));
	// turn "source_file" into a canonical path relative to context_dir
	let source_file = context_dir.join(source_file).canonicalize().unwrap();
	let source_file = source_file.to_str().unwrap();

	// check if "imports" already contains "source_file", panic if it does
	if imports.contains(source_file) {
		return None;
	}

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
			println!("Failed parsing source file: {}", source_file);
			std::process::exit(1);
		}
	};

	// keep track of imports to break recursive import cycles
	imports.insert(source_file.to_string());

	let wing_parser = Parser {
		imports: RefCell::new(imports),
		source: &source[..],
		source_name: source_file.to_string(),
		diagnostics: RefCell::new(Diagnostics::new()),
	};

	let scope = wing_parser.wingit(&tree.root_node());

	for diagnostic in wing_parser.diagnostics.borrow().iter() {
		println!("{}", diagnostic);
	}

	if wing_parser.diagnostics.borrow().len() > 0 {
		std::process::exit(1);
	}

	Some(scope)
}
