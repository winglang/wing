use std::env;

fn main() {
	let crate_dir = env::var("CARGO_MANIFEST_DIR").unwrap();
	cbindgen::Builder::new()
		.with_crate(crate_dir)
		.with_config(cbindgen::Config {
			language: cbindgen::Language::C,
			cpp_compat: true,
			no_includes: true,
			include_guard: Some("WINGC_BUILD_H_".to_string()),
			..Default::default()
		})
		.exclude_item("tree_sitter_wing")
		.generate()
		.expect("Unable to generate bindings")
		.write_to_file("wingc.h");
}
