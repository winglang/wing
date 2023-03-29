// Compiles a source file and prints any errors to stderr.
// This should only be used for testing wingc directly.

use std::{env, path::Path, process};
use wingc::compile;

pub fn main() {
	let mut args: Vec<String> = env::args().collect();

	args.push("/home/marcio/code/wing/examples/tests/invalid/classes_and_resources.w".to_string());
	if args.len() < 2 {
		panic!("Usage: cargo run --example compile <source_file>");
	}

	let source_path = &args[1];

	let results = compile(Path::new(source_path), None);
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
