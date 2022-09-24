use std::env;
use wingc::compile;

pub fn main() {
	let args: Vec<String> = env::args().collect();
	let source = &args[2];
	println!("Compiling: {}", source);
	let outdir = args.get(3).map(|s| s.as_str());
	if outdir.is_some() {
		println!("Output Directory: {}", outdir.unwrap());
	}

	println!("========================================");
	println!("{}", compile(source, outdir));
	println!("========================================");
}
