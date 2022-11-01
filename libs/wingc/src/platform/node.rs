use super::PlatformBase;
use std::io::Result;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
	#[wasm_bindgen(js_namespace = platform)]
	pub fn wingc_platform_canonicalize_path(path: &str) -> String;

	#[wasm_bindgen(js_namespace = platform)]
	pub fn wingc_platform_read_file(path: &str) -> String;

	#[wasm_bindgen(js_namespace = platform)]
	pub fn wingc_platform_write_file(path: &str, content: &str);

	#[wasm_bindgen(js_namespace = platform)]
	pub fn wingc_platform_ensure_directory(path: &str);
}

pub struct Platform {
	// empty
}

impl PlatformBase for Platform {
	fn canonicalize_path(path: &str) -> String {
		wingc_platform_canonicalize_path(path)
	}

	fn read_file(path: &str) -> Result<String> {
		Ok(wingc_platform_read_file(path))
	}

	fn write_file(path: &str, content: &str) -> Result<()> {
		wingc_platform_write_file(path, content);
		Ok(()) // error handling happens in JS side with exceptions
	}

	fn ensure_directory(path: &str) -> Result<()> {
		wingc_platform_ensure_directory(path);
		Ok(()) // error handling happens in JS side with exceptions
	}
}
