use crate::parser::Parser;
use clap::*;
use std::fs;
use std::path::PathBuf;

use crate::type_check::TypeChecker;
use crate::type_env::TypeEnv;

pub mod ast;
pub mod diagnostic;
pub mod jsify;
pub mod parser;
pub mod type_check;
pub mod type_env;

#[derive(clap::Parser, Debug)]
#[clap(author, version, about, long_about = None)]
struct Args {
	#[clap(value_parser)]
	source_file: String,

	#[clap(value_parser, short, long)]
	out_dir: Option<String>,
}

fn main() {
	let args = Args::parse();

	let language = tree_sitter_winglang::language();
	let mut parser = tree_sitter::Parser::new();
	parser.set_language(language).unwrap();

	let source = match fs::read(&args.source_file) {
		Ok(source) => source,
		Err(_) => {
			println!("Error reading source file: {}", &args.source_file);
			std::process::exit(1);
		}
	};

	let tree = match parser.parse(&source[..], None) {
		Some(tree) => tree,
		None => {
			println!("Failed parsing source file: {}", args.source_file);
			std::process::exit(1);
		}
	};

	let out_dir = PathBuf::from(&args.out_dir.unwrap_or(format!("{}.out", args.source_file)));
	fs::create_dir_all(&out_dir).expect("create output dir");

	let ast_root = Parser {
		source: &source[..],
		source_name: args.source_file,
	}
	.wingit(&tree.root_node());

	let mut root_env = TypeEnv::new(None, None, false);

	let mut tc = TypeChecker::new();
	tc.type_check_scope(&ast_root, &mut root_env);

	println!("{}", jsify::jsify(&ast_root, true));
}
