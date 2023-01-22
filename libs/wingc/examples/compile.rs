// Compiles a source file and prints any errors to stderr.
// This should only be used for testing wingc directly.

use std::{env, process};
use wingc::compile;

pub fn main() {
	let args: Vec<String> = env::args().collect();

	if args.len() < 2 {
		panic!("Usage: cargo run --example compile <source_file>");
	}

	let source = &args[1];

	let results = compile(source, None);
	if let Err(mut err) = results {
		// Sort error messages by line number (ascending)
		err.sort_by(|a, b| a.cmp(&b));
		eprintln!(
			"Compilation failed with {} errors\n{}",
			err.len(),
			err.iter().map(|d| format!("{}", d)).collect::<Vec<_>>().join("\n")
		);
		process::exit(1);
	}
}
