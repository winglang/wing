use std::{
	collections::HashMap,
	error::Error,
	fmt::{self, Display},
	fs::{self, File},
	io::Write,
};

use camino::{Utf8Path, Utf8PathBuf};

use crate::diagnostic::Diagnostic;

#[derive(Debug)]
pub enum FilesError {
	DuplicateFile(Utf8PathBuf),
	IoError(std::io::Error),
}

impl Display for FilesError {
	fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
		match self {
			FilesError::DuplicateFile(path) => write!(f, "Cannot add two files with the same name: {}", path),
			FilesError::IoError(err) => write!(f, "I/O error: {}", err),
		}
	}
}

impl From<FilesError> for Diagnostic {
	fn from(err: FilesError) -> Self {
		Self {
			message: err.to_string(),
			span: None,
		}
	}
}

impl Error for FilesError {}

#[derive(Default)]
pub struct Files {
	data: HashMap<Utf8PathBuf, String>,
}

impl Files {
	pub fn new() -> Self {
		Self { data: HashMap::new() }
	}

	/// Add a file, returning an error if a file with the same name already exists.
	pub fn add_file<S: Into<Utf8PathBuf>>(&mut self, path: S, content: String) -> Result<(), FilesError> {
		let path = path.into();
		if self.data.contains_key(&path) {
			return Err(FilesError::DuplicateFile(path));
		}
		self.data.insert(path, content);
		Ok(())
	}

	/// Update a file, overwriting the previous contents if it already exists.
	pub fn update_file<S: Into<Utf8PathBuf>>(&mut self, path: S, content: String) {
		let path = path.into();
		self.data.insert(path, content);
	}

	/// Get a file's contents, if it exists.
	pub fn get_file<S: AsRef<Utf8Path>>(&self, path: S) -> Option<&String> {
		self.data.get(path.as_ref())
	}

	/// Check if a file exists.
	pub fn contains_file<S: AsRef<Utf8Path>>(&self, path: S) -> bool {
		self.data.contains_key(path.as_ref())
	}

	/// Write all files to the given directory.
	pub fn emit_files(&self, out_dir: &Utf8Path) -> Result<(), FilesError> {
		for (path, content) in &self.data {
			let full_path = out_dir.join(path);

			// create parent directories if they don't exist
			if let Some(parent) = full_path.parent() {
				fs::create_dir_all(parent).map_err(FilesError::IoError)?;
			}

			let mut file = File::create(full_path).map_err(FilesError::IoError)?;
			file.write_all(content.as_bytes()).map_err(FilesError::IoError)?;
			file.flush().map_err(FilesError::IoError)?;
		}
		Ok(())
	}
}

#[cfg(test)]
mod tests {
	use super::*;

	#[test]
	fn test_add_file() {
		let mut files = Files::new();
		assert!(files.add_file("file1", "content1".to_owned()).is_ok());
		assert!(files.add_file("file2", "content2".to_owned()).is_ok());
		// Adding a file with the same name should return an error
		assert!(files.add_file("file1", "content3".to_owned()).is_err());
	}

	#[test]
	fn test_contains_file() {
		let mut files = Files::new();
		files
			.add_file("file1", "content1".to_owned())
			.expect("Failed to add file");
		files
			.add_file("file2", "content2".to_owned())
			.expect("Failed to add file");
		assert!(files.contains_file("file1"));
		assert!(files.contains_file("file2"));
		assert!(!files.contains_file("file3"));
	}

	#[test]
	fn test_emit_files() {
		let temp_dir = tempfile::tempdir().expect("Failed to create temporary directory");
		let out_dir = Utf8Path::from_path(temp_dir.path()).expect("invalid unicode path");

		let mut files = Files::new();
		files
			.add_file("file1", "content1".to_owned())
			.expect("Failed to add file");
		files
			.add_file("file2", "content2".to_owned())
			.expect("Failed to add file");

		assert!(files.emit_files(out_dir).is_ok());

		// Verify that the files were emitted correctly
		let file1_path = out_dir.join("file1");
		let file2_path = out_dir.join("file2");
		assert!(file1_path.exists());
		assert!(file2_path.exists());

		let file1_content = fs::read_to_string(file1_path).expect("Failed to read file");
		let file2_content = fs::read_to_string(file2_path).expect("Failed to read file");
		assert_eq!(file1_content, "content1");
		assert_eq!(file2_content, "content2");
	}

	#[test]
	fn test_emit_files_creates_intermediate_directories() {
		let temp_dir = tempfile::tempdir().expect("Failed to create temporary directory");
		let out_dir = Utf8Path::from_path(temp_dir.path()).expect("invalid unicode path");

		let mut files = Files::new();
		files
			.add_file("subdir/file1", "content1".to_owned())
			.expect("Failed to add file");

		assert!(files.emit_files(out_dir).is_ok());

		// Verify that the files were emitted correctly
		let file1_path = out_dir.join("subdir").join("file1");
		assert!(file1_path.exists());

		let file1_content = fs::read_to_string(file1_path).expect("Failed to read file");
		assert_eq!(file1_content, "content1");
	}
}
