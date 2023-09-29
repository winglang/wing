// Compiles a source file and prints any errors to stderr.
// This should only be used for testing wingc directly.

use camino::{Utf8Path, Utf8PathBuf};
use std::{env, fs, process};
use wingc::{compile, diagnostic::get_diagnostics};

pub fn main() {
	let args: Vec<String> = env::args().collect();

	if args.len() < 2 {
		panic!("Usage: cargo run --example compile <source_file>");
	}

	let source_path = Utf8Path::new(&args[1]).canonicalize_utf8().unwrap();
	let source_text = fs::read_to_string(&source_path).unwrap();
	let target_dir: Utf8PathBuf = env::current_dir().unwrap().join("target").try_into().unwrap();

	let results = compile(
		&source_path,
		source_text,
		Some(&target_dir),
		Some(source_path.parent().unwrap()),
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
