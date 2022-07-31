extern crate bindgen;

use std::env;
use std::path::Path;
use std::path::PathBuf;

fn main() {
    println!("cargo:rustc-link-lib=wingrr");
    println!("cargo:rerun-if-changed=../wingrr.h");

    let dir = env::var("CARGO_MANIFEST_DIR").unwrap();
    let lib_dir = Path::new(&dir).join("../../build/Release");

    println!("cargo:rustc-link-search=native={}", lib_dir.display());
    println!("cargo:rustc-link-arg=-Wl,-rpath,{}", lib_dir.display());

    let bindings = bindgen::Builder::default()
        .header("../wingrr.h")
        .parse_callbacks(Box::new(bindgen::CargoCallbacks))
        .generate()
        .expect("Unable to generate bindings");

    let out_path = PathBuf::from("src");
    bindings
        .write_to_file(out_path.join("bindings.rs"))
        .expect("Couldn't write bindings!");
}
