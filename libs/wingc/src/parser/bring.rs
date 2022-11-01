use crate::platform::*;
use crate::Diagnostics;
use crate::Scope;

use crate::parser::Parser;
use std::cell::RefCell;
use std::collections::HashSet;
use std::path::PathBuf;

pub fn bring(source_file: &str, context: Option<&str>, imports: &mut HashSet<String>) -> Option<(Scope, Diagnostics)> {
	// default context directory to the current directory
	let context_dir = PathBuf::from(&context.unwrap_or("."));
	// turn "source_file" into a canonical path relative to context_dir
	let source_file = Platform::canonicalize_path(&context_dir.join(source_file).to_str().unwrap());
	let source_file = source_file.as_str();

	if imports.contains(source_file) {
		return None;
	}

	let language = tree_sitter_wing::language();
	let mut parser = tree_sitter::Parser::new();
	parser.set_language(language).unwrap();

	let source = Platform::read_file(source_file).expect("Unable to read file");
	let source = source.as_bytes();

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

	Some((scope, wing_parser.diagnostics.into_inner()))
}
