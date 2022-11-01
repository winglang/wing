use std::io::Result;

pub trait PlatformBase {
	fn canonicalize_path(path: &str) -> String;
	fn read_file(path: &str) -> Result<String>;
	fn write_file(path: &str, content: &str) -> Result<()>;
	fn ensure_directory(path: &str) -> Result<()>;
}

mod native;
pub use native::Platform;
