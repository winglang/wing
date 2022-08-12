use crate::parser::Parser;
use std::ffi::{CStr, CString};
use std::os::raw::c_char;
use std::path::PathBuf;
use std::{fs, mem};

use crate::type_check::TypeChecker;
use crate::type_env::TypeEnv;

pub mod ast;
pub mod diagnostic;
pub mod jsify;
pub mod parser;
pub mod type_check;
pub mod type_env;

#[no_mangle]
pub extern "C" fn wingc_compile(source: *const c_char, outdir: *const c_char) -> *const c_char {
	let source_file = unsafe { CStr::from_ptr(source).to_str().unwrap() };
	let out_dir = if outdir != std::ptr::null() {
		unsafe { CStr::from_ptr(outdir).to_str().unwrap() }
	} else {
		Box::leak(format!("{}.out", source_file).into_boxed_str())
	};
	let language = tree_sitter_winglang::language();
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

	let out_dir = PathBuf::from(&out_dir);
	fs::create_dir_all(&out_dir).expect("create output dir");

	let ast_root = Parser {
		source: &source[..],
		source_name: source_file.to_string(),
	}
	.wingit(&tree.root_node());

	let mut root_env = TypeEnv::new(None, None, false);

	let mut tc = TypeChecker::new();
	tc.type_check_scope(&ast_root, &mut root_env);

	let output = jsify::jsify(&ast_root, true);

	CString::new(output).unwrap().into_raw()
}

#[no_mangle]
pub extern "C" fn wingc_release(s: *const c_char) {
	let _ = unsafe { CString::from_raw(mem::transmute(s)) };
}

#[cfg(test)]
mod sanity {
	use crate::{wingc_compile, wingc_release};
	use std::ffi::CString;
	use std::ptr::null;

	#[test]
	fn does_not_blow_up() {
		let source = "../corpus/math.w";
		let source_raw = CString::new(source).unwrap();
		let intermediate = wingc_compile(source_raw.as_ptr(), null());
		wingc_release(intermediate)
	}
}
