use std::path::PathBuf;
use tree_sitter_cli::generate::generate_parser_in_directory;

fn main() {
	let src_dir = std::path::Path::new("src");

	generate_parser_in_directory(&PathBuf::from("."), None, tree_sitter::LANGUAGE_VERSION, false, None)
		.expect("Generating parser");

	let mut c_config = cc::Build::new();
	c_config
		.include(src_dir)
		.flag("-Wno-unused-parameter")
		.flag("-Wno-unused-but-set-variable")
		.flag("-Wno-trigraphs")
		.file(&src_dir.join("parser.c"))
		.file(&src_dir.join("scanner.c"));

	if cfg!(target_arch = "wasm32") {
		// This parser is used in a WASI context, so it needs to be compiled with
		// the sysroot and other tools needed for WASI-compatible C
		c_config.flag(
			format!(
				"--sysroot={}/share/wasi-sysroot",
				env!("WASI_SDK", "WASI_SDK env not set")
			)
			.as_str(),
		);
	}

	c_config.compile("parser");

	println!("cargo:rerun-if-changed=grammar.js");
	println!("cargo:rerun-if-changed=src/scanner.c");
}
