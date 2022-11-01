use std::io::Result;

pub trait PlatformBase {
	fn canonicalize_path(path: &str) -> String;
	fn read_file(path: &str) -> Result<String>;
	fn write_file(path: &str, content: &str) -> Result<()>;
	fn ensure_directory(path: &str) -> Result<()>;
}

#[cfg(not(target_family="wasm"))]
mod native;
#[cfg(not(target_family="wasm"))]
pub use native::Platform;

#[cfg(target_family="wasm")]
mod node;
#[cfg(target_family="wasm")]
pub use node::Platform;
