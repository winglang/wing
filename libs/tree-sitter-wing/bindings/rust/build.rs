fn main() {
	let src_dir = std::path::Path::new("src");

	let mut c_config = cc::Build::new();
	c_config.std("c11").include(src_dir).flag("-Wno-unused-parameter");

	#[cfg(target_env = "msvc")]
	c_config.flag("-utf-8");

	let parser_path = src_dir.join("parser.c");
	c_config.file(&parser_path);
	println!("cargo:rerun-if-changed={}", parser_path.to_str().unwrap());

	// External scanner
	let scanner_path = src_dir.join("scanner.c");
	c_config.file(&scanner_path);
	println!("cargo:rerun-if-changed={}", scanner_path.to_str().unwrap());

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

	c_config.compile("tree-sitter-wing");
}
