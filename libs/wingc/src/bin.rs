use std::env;
use wingc::compile;

pub fn main() {
	let args: Vec<String> = env::args().collect();

	if args.len() < 2 {
		panic!("Usage: wingc <source_file> [output_dir]");
	}

	let source = &args[1];
	let outdir = args.get(2).map(|s| s.as_str());

	let results = compile(source, outdir);
	if let Err(err) = results {
		panic!(
			"Compilation failed with {} errors\n{}",
			err.len(),
			err.iter().map(|d| format!("{}", d)).collect::<Vec<_>>().join("\n")
		);
	}
}
