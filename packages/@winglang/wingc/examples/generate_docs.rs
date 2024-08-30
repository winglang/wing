// Compiles a project directory and generates docs for it.

use camino::Utf8Path;
use std::{env, process};
use wingc::{diagnostic::get_diagnostics, generate_docs::generate_docs};

pub fn main() {
	let args: Vec<String> = env::args().collect();

	if args.len() < 2 {
		panic!("Usage: cargo run --example generate_docs <project_dir>");
	}

	let project_dir = Utf8Path::new(&args[1]).canonicalize_utf8().unwrap();

	let docs = generate_docs(&project_dir);
	let mut diags = get_diagnostics();
	if !diags.is_empty() {
		// Sort error messages by line number (ascending)
		diags.sort();
		eprintln!(
			"Compilation failed with {} errors\n{}",
			diags.len(),
			diags.iter().map(|d| format!("{}", d)).collect::<Vec<_>>().join("\n")
		);
		process::exit(1);
	}

	println!("{}", docs.unwrap());
}
