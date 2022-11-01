use super::PlatformBase;
use std::io::Result;
use std::{fs, path::PathBuf};

pub struct Platform {
	// empty
}

impl PlatformBase for Platform {
	fn canonicalize_path(path: &str) -> String {
		let mut path = PathBuf::from(path);
		path = path.canonicalize().unwrap();
		path.to_str().unwrap().to_string()
	}

	fn read_file(path: &str) -> Result<String> {
		fs::read_to_string(path)
	}

	fn write_file(path: &str, content: &str) -> Result<()> {
		fs::write(path, content)
	}

	fn ensure_directory(path: &str) -> Result<()> {
		fs::create_dir_all(path)
	}
}
