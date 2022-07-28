use std::path::PathBuf;
use tree_sitter;
use tree_sitter_cli::generate::generate_parser_in_directory;

fn main() {
	let src_dir = std::path::Path::new("src");

	generate_parser_in_directory(&PathBuf::from("."), None, tree_sitter::LANGUAGE_VERSION, false, None)
		.expect("Generating parser");

	let mut c_config = cc::Build::new();
	c_config.include(&src_dir);
	c_config
		.flag_if_supported("-Wno-unused-parameter")
		.flag_if_supported("-Wno-unused-but-set-variable")
		.flag_if_supported("-Wno-trigraphs");
	let parser_path = src_dir.join("parser.c");
	c_config.file(&parser_path);

	// If your language uses an external scanner written in C,
	// then include this block of code:

	/*
	let scanner_path = src_dir.join("scanner.c");
	c_config.file(&scanner_path);
	println!("cargo:rerun-if-changed={}", scanner_path.to_str().unwrap());
	*/

	c_config.compile("parser");
	println!("cargo:rerun-if-changed={}", "grammar.js");

	// If your language uses an external scanner written in C++,
	// then include this block of code:

	/*
	let mut cpp_config = cc::Build::new();
	cpp_config.cpp(true);
	cpp_config.include(&src_dir);
	cpp_config
			.flag_if_supported("-Wno-unused-parameter")
			.flag_if_supported("-Wno-unused-but-set-variable");
	let scanner_path = src_dir.join("scanner.cc");
	cpp_config.file(&scanner_path);
	cpp_config.compile("scanner");
	println!("cargo:rerun-if-changed={}", scanner_path.to_str().unwrap());
	*/
}
