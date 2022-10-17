use std::{env, path::Path};
use wingc::compile;

pub fn main() {
	let args: Vec<String> = env::args().collect();

	if args.len() < 2 {
		panic!("Usage: wingc <source_file> [output_dir]");
	}

	let source = &args[1];
	let outdir = args.get(2).map(|s| s.as_str());

	// for now, assume that dependencies are in the directory of the source file
	// TODO: make this configurable via CLI argument
	let wing_path = match Path::new(source).is_absolute() {
		true => Path::new(source).parent().unwrap().to_path_buf(),
		false => env::current_dir()
			.unwrap()
			.join(Path::new(source))
			.parent()
			.unwrap()
			.to_path_buf(),
	};

	compile(source, outdir, &vec![wing_path]);
}
