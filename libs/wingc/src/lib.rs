use ast::Scope;
use diagnostic::Diagnostics;

use crate::parser::Parser;
use std::cell::RefCell;
use std::ffi::{CStr, CString};
use std::os::raw::c_char;
use std::path::PathBuf;
use std::{fs, mem};

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

pub fn parse(source_file: &str) -> Scope {
	let language = tree_sitter_wing::language();
	let mut parser = tree_sitter::Parser::new();
	parser.set_language(language).unwrap();

	let source = match fs::read(&source_file) {
		Ok(source) => source,
		Err(_) => {
			println!("Error reading source file: {}", &source_file);
			std::process::exit(1);
		}
	};

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

	return jsify::jsify(&scope, true);
}

#[no_mangle]
pub extern "C" fn wingc_compile(source: *const c_char, outdir: *const c_char) -> *const c_char {
	let source_file = unsafe { CStr::from_ptr(source).to_str().unwrap() };
	let out_dir = if outdir != std::ptr::null() {
		unsafe { Some(CStr::from_ptr(outdir).to_str().unwrap()) }
	} else {
		None
	};

	let output = compile(source_file, out_dir);

	CString::new(output).unwrap().into_raw()
}

#[no_mangle]
pub extern "C" fn wingc_release(s: *const c_char) {
	let _ = unsafe { CString::from_raw(mem::transmute(s)) };
}

#[cfg(test)]
mod sanity {
	use crate::compile;
	use std::fs;

	#[test]
	fn can_compile_simple_files() {
		let paths = fs::read_dir("../../corpus/simple").unwrap();

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
