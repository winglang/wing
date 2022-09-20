use const_format::formatcp;
use reqwest::blocking;
use schemafy_lib::Generator;
use std::fs;
use std::path::Path;

const JSII_RUST_OUT: &'static str = "src/jsii.rs";
const JSII_SPEC_OUT: &'static str = "src/jsii-spec.json";
const JSII_SPEC_VER: &'static str = "latest";
const JSII_SPEC_URL: &'static str = formatcp!(
    "https://unpkg.com/@jsii/spec@{}/schema/jsii-spec.schema.json",
    JSII_SPEC_VER
);

/// This build script makes sure that "jsii.rs" and "jsii-spec.json" are up to
/// date and available to the rest of the Rust codebase. It's invoked by Cargo
/// during compilation of this crate.
fn main() {
    // make sure if anyone touches the generated files, they're rewritten over
    println!("{}", format!("cargo:rerun-if-changed={}", JSII_SPEC_OUT));
    println!("{}", format!("cargo:rerun-if-changed={}", JSII_RUST_OUT));

    // download the spec and save it to a file
    let body = blocking::get(JSII_SPEC_URL).unwrap().text();
    fs::write(JSII_SPEC_OUT, body.unwrap()).unwrap();

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
