use std::{
	collections::HashMap,
	error::Error,
	fmt::{self, Display},
	fs::{self, File},
	io::Write,
};

use camino::{Utf8Path, Utf8PathBuf};

use crate::diagnostic::{Diagnostic, DiagnosticSeverity};

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
			annotations: vec![],
			hints: vec![],
			severity: DiagnosticSeverity::Error,
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

			update_file(&full_path, content)?;
		}
		Ok(())
	}
}

/// Write file to disk
pub fn write_file(path: &Utf8Path, content: &str) -> Result<(), FilesError> {
	let mut file = File::create(path).map_err(FilesError::IoError)?;
	file.write_all(content.as_bytes()).map_err(FilesError::IoError)?;
	file.flush().map_err(FilesError::IoError)?;
	Ok(())
}

// Check if the content of a file is the same as existing content. If so, skip writing the file.
pub fn update_file(path: &Utf8Path, content: &str) -> Result<(), FilesError> {
	let Ok(existing_content) = fs::read(path) else {
		return write_file(path, content);
	};

	if existing_content != content.as_bytes() {
		write_file(path, content)
	} else {
		Ok(())
	}
}

/// Remove file from the filesystem
pub fn remove_file(path: &Utf8Path) -> Result<(), FilesError> {
	fs::remove_file(path).map_err(FilesError::IoError)
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
	fn test_emit_files_avoids_rewrites() {
		let temp_dir = tempfile::tempdir().expect("Failed to create temporary directory");
		let out_dir = Utf8Path::from_path(temp_dir.path()).expect("invalid unicode path");

		write_file(&out_dir.join("file1"), "content1").expect("Failed to write file");

		let file1_stat = out_dir.join("file1").metadata().expect("Failed to get file metadata");
		let file1_modified = file1_stat.modified().expect("Failed to get file modified time");

		let mut files = Files::new();
		files
			.add_file("file1", "content1".to_owned())
			.expect("Failed to add file");
		files
			.add_file("file2", "content2".to_owned())
			.expect("Failed to add file");

		assert!(files.emit_files(out_dir).is_ok());

		// Verify that the files were emitted correctly
		let file1_path = &out_dir.join("file1");
		let file2_path = out_dir.join("file2");
		assert!(file1_path.exists());
		assert!(file2_path.exists());

		let file1_content = fs::read_to_string(file1_path).expect("Failed to read file");
		let file2_content = fs::read_to_string(file2_path).expect("Failed to read file");
		assert_eq!(file1_content, "content1");
		assert_eq!(file2_content, "content2");

		// Verify that file1 was not updated
		let updated = file1_path
			.metadata()
			.expect("Failed to get file metadata")
			.modified()
			.expect("Failed to get file modified time");
		assert_eq!(updated, file1_modified);
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
	#[test]
	fn test_update_file() {
		let temp_dir = tempfile::tempdir().expect("Failed to create temporary directory");
		let out_dir = Utf8Path::from_path(temp_dir.path()).expect("invalid unicode path");

		let file_path = out_dir.join("file");

		// Write the file for the first time
		assert!(update_file(&file_path, "content").is_ok());

		// Update the file
		let new_content = "new content";
		assert!(update_file(&file_path, new_content).is_ok());

		// Verify that the file was updated
		let file_content = fs::read_to_string(file_path.clone()).expect("Failed to read file");
		assert_eq!(file_content, new_content);
		let last_updated = file_path
			.metadata()
			.expect("Failed to get file metadata")
			.modified()
			.expect("Failed to get file modified time");

		// Try to update the file with the same content
		assert!(update_file(&file_path, new_content).is_ok());

		// Verify that the file was not updated (check the timestamps via stat)
		let updated = file_path
			.metadata()
			.expect("Failed to get file metadata")
			.modified()
			.expect("Failed to get file modified time");

		assert_eq!(updated, last_updated);
	}
}
