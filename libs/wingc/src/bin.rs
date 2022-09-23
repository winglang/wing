use std::env;
use wingc::compile;

pub fn main() {
	let args: Vec<String> = env::args().collect();
	dbg!(args.clone());
	let source = &args[2];
	println!("Compiling {}...", source);
	let outdir = args.get(3).map(|s| s.as_str());
	println!("outdir: {:?}", outdir);
	println!("{}", compile(source, outdir));
}
