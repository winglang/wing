use clap::*;
use tree_sitter::{Parser, Language};
use std::fs;
use std::path::PathBuf;

use crate::compiler::Compiler;
mod compiler;

#[derive(clap::Parser, Debug)]
#[clap(author, version, about, long_about = None)]
struct Args {
    #[clap(value_parser)]
    source_file: String,

    #[clap(value_parser, short, long)]
    out_dir: Option<String>,
}

extern "C" { fn tree_sitter_winglang() -> Language; }

fn main() {
    let args = Args::parse();
    
    let language = unsafe { tree_sitter_winglang() };
    let mut parser = Parser::new();
    parser.set_language(language).unwrap();

    let source = match fs::read(&args.source_file) {
        Ok(source) => source,
        Err(_) => {
            println!("Error reading source file: {}", &args.source_file);
            std::process::exit(1);
        },
    };

    let tree = match parser.parse(&source[..], None) {
        Some(tree) => tree,
        None => {
            println!("Failed parsing source file: {}", args.source_file);
            std::process::exit(1);
        },
    };

    let out_dir = PathBuf::from(&args.out_dir.unwrap_or(format!("{}.out", args.source_file)));
    fs::create_dir_all(&out_dir).expect("create output dir");
    let intermediate_dir = out_dir.join(".intermediate");

    let output = Compiler {
            out_dir: intermediate_dir,
            source: &source[..],
            shim: true
        }.compile(&tree.root_node());

    //traverse(&tree.root_node(), 0);

    println!("{}", output);
}
