// Compiles a source file and prints any errors to stderr.
// This should only be used for testing wingc directly.

use std::{path::Path, process};
use wingc::compile;

pub fn main() {
	let source_path = Path::new("../../examples/tests/valid/print.w");
	std::env::set_current_dir("/Users/eladb/code/wing/libs/wingc").unwrap();

	let results = compile(
		source_path,
		None,
		Some(source_path.canonicalize().unwrap().parent().unwrap()),
	);
	if let Err(mut err) = results {
		// Sort error messages by line number (ascending)
		err.sort();
		eprintln!(
			"Compilation failed with {} errors\n{}",
			err.len(),
			err.iter().map(|d| format!("{}", d)).collect::<Vec<_>>().join("\n")
		);
		process::exit(1);
	}
}
