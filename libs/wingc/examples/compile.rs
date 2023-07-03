// Compiles a source file and prints any errors to stderr.
// This should only be used for testing wingc directly.

use std::{env, path::Path, process};
use wingc::{compile, diagnostic::get_diagnostics};

pub fn main() {
	let args: Vec<String> = env::args().collect();

	if args.len() < 2 {
		panic!("Usage: cargo run --example compile <source_file>");
	}

	let source_path = &args[1];
	let source_path = Path::new(source_path);

	let results = compile(
		source_path,
		Some(env::current_dir().unwrap().join("target").as_path()),
		Some(source_path.canonicalize().unwrap().parent().unwrap()),
	);
	if results.is_err() {
		let mut diags = get_diagnostics();
		// Sort error messages by line number (ascending)
		diags.sort();
		eprintln!(
			"Compilation failed with {} errors\n{}",
			diags.len(),
			diags.iter().map(|d| format!("{}", d)).collect::<Vec<_>>().join("\n")
		);
		process::exit(1);
	}
}
