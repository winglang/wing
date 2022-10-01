use ast::Scope;
use diagnostic::Diagnostics;

use tree_sitter::*;
use tree_sitter_traversal::*;

use crate::parser::Parser;
use std::cell::RefCell;
use std::collections::HashSet;
use std::error::Error;
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

fn amalgamate_recursive(source_file: &str, imports: &mut HashSet<String>) -> Result<Vec<u8>, Box<dyn Error>> {
	if imports.contains(source_file) {
		println!("Circular bring detected: {}", source_file);
		Err("Circular bring detected")?
	}
	imports.insert(source_file.to_string());
	let context = Box::new(PathBuf::from(source_file).parent().unwrap().to_path_buf());
	let language = tree_sitter_wing::language();
	let mut parser = tree_sitter::Parser::new();
	parser.set_language(language).unwrap();

	let mut source = match fs::read(&source_file) {
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

	let nodes: Vec<Node<'_>> = traverse(tree.walk(), Order::Pre).collect::<Vec<_>>();
	let mut patches: Vec<(usize, usize, Vec<u8>)> = Vec::new();

	// iterate over nodes and check for "bring"	nodes
	let mut circular_detected = false;
	nodes.iter().for_each(|node| {
		if node.kind() == "short_import_statement" {
			if circular_detected {
				return;
			}
			let child = node.child_by_field_name("module_name").unwrap();
			if child.kind() == "string" {
				// get a copy of child node's text value
				let inner_source = child.utf8_text(&source).unwrap();
				// remove quotes around local_source_path string
				let inner_source = &inner_source[1..inner_source.len() - 1];
				// join context and local_source_path
				let inner_source = context.join(inner_source);
				// resolve the address
				let inner_source = inner_source.canonicalize().unwrap();
				// get the string value to pass recursively down again
				let inner_source = inner_source.to_str().unwrap();
				// parse the inner source
				let inner_parsed = amalgamate_recursive(inner_source, imports);
				// propagate errors back out
				if inner_parsed.is_err() {
					circular_detected = true;
					return;
				}
				// add this to patches to the original "source"
				patches.push((node.start_byte(), node.end_byte(), inner_parsed.unwrap()));
			}
		}
	});

	if circular_detected {
		Err("Circular bring detected")?
	}

	// apply patches one by one, update indices as needed
	// this is adopted from https://github.com/bendrucker/patch-text/blob/master/index.js
	if patches.len() > 0 {
		let mut offset: i32 = 0;
		for (start, end, patch) in patches {
			let patch_len = patch.len();
			let start = (start as i32 + offset) as usize;
			let end = (end as i32 + offset) as usize;
			source.splice(start..end, patch);
			offset += patch_len as i32 - (end - start) as i32;
		}
	}

	Ok(source)
}

pub fn amalgamate_brings(source_file: &str) -> Result<Vec<u8>, Box<dyn Error>> {
	let mut imports: HashSet<String> = HashSet::new();
	// get the canonical path of the source file
	let source_file = PathBuf::from(source_file).canonicalize().unwrap();
	amalgamate_recursive(source_file.to_str().unwrap(), &mut imports)
}

pub fn parse(source_file: &str) -> Scope {
	let language = tree_sitter_wing::language();
	let mut parser = tree_sitter::Parser::new();
	parser.set_language(language).unwrap();

	// recursively "bring" all wing sources and amalgamate them into one source
	let source = amalgamate_brings(source_file).expect("Failed to amalgamate brings");

	let tree = match parser.parse(&source[..], None) {
		Some(tree) => tree,
		None => {
			println!("Failed parsing source file: {}", source_file);
			std::process::exit(1);
		}
	};

	let wing_parser = Parser {
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

	scope
}

pub fn type_check(scope: &mut Scope, types: &mut Types) {
	scope.set_env(TypeEnv::new(None, None, false, Flight::Pre));
	let mut tc = TypeChecker::new(types);
	tc.type_check_scope(scope);
}

pub fn compile(source_file: &str, out_dir: Option<&str>) -> String {
	// Create universal types collection (need to keep this alive during entire compilation)
	let mut types = Types::new();
	// Build our AST
	let mut scope = parse(source_file);
	// Type check everything and build typed symbol environment
	type_check(&mut scope, &mut types);
	// Analyze inflight captures
	scan_captures(&scope);

	// prepare output directory for support inflight code
	let out_dir = PathBuf::from(&out_dir.unwrap_or(format!("{}.out", source_file).as_str()));
	fs::create_dir_all(&out_dir).expect("create output dir");

	let intermediate_js = jsify::jsify(&scope, true);
	let intermediate_file = out_dir.join("intermediate.js");
	fs::write(&intermediate_file, &intermediate_js).expect("Write intermediate JS to disk");

	return intermediate_js;
}

#[cfg(test)]
mod sanity {
	use crate::{amalgamate_brings, compile};
	use std::fs;

	#[test]
	fn should_throw_on_circular_brings() {
		let source = "../../examples/invalid/circular-bring.w";
		let result = amalgamate_brings(source);
		assert!(result.is_err());
	}

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
