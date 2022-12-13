use schemafy_lib::Generator;
use std::fs;
use std::path::Path;
use std::process::Command;

const JSII_RUST_OUT: &'static str = "src/jsii.rs";
const JSII_SPEC_OUT: &'static str = "node_modules/@jsii/spec/schema/jsii-spec.schema.json";

/// This build script makes sure that "jsii.rs" and "jsii-spec.json" are up to
/// date and available to the rest of the Rust codebase. It's invoked by Cargo
/// during compilation of this crate.
fn main() {
	// make sure if anyone touches the generated files, they're rewritten over
	println!("{}", format!("cargo:rerun-if-changed={}", JSII_SPEC_OUT));
	println!("{}", format!("cargo:rerun-if-changed={}", JSII_RUST_OUT));

	// delete node_modules in the root of the project if it exists
	let node_modules_path = Path::new(env!("CARGO_MANIFEST_DIR")).join("node_modules");
	if node_modules_path.exists() {
		fs::remove_dir_all(node_modules_path).unwrap();
	}

	// execute "npm install" to fetch the JSII schema
	Command::new("npm")
		.arg("ci")
		.current_dir(Path::new(env!("CARGO_MANIFEST_DIR")))
		.status()
		.unwrap();

	// generate the rust code (strictly typed structs) from the spec
	Generator::builder()
		.with_root_name_str("JSII")
		.with_input_file(Path::new(JSII_SPEC_OUT))
		.build()
		.generate_to_file(Path::new(JSII_RUST_OUT).to_str().unwrap())
		.unwrap();

	// prepend "use serde::{Deserialize, Serialize};" to the generated file
	let mut contents = fs::read_to_string(JSII_RUST_OUT).unwrap();
	contents = format!("use serde::{{Deserialize, Serialize}};\n{}", contents);
	fs::write(JSII_RUST_OUT, contents).unwrap();
}
