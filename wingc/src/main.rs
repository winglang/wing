use crate::parser::Parser;
use clap::*;
use std::fs;
use std::path::PathBuf;

use crate::ast::*;
use crate::diagnostic::*;
use crate::type_check::TypeChecker;
use crate::type_env::TypeEnv;

mod ast;
mod diagnostic;
mod jsify;
mod parser;
mod type_check;
mod type_env;

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

	// println!("{:?}", ast_root);
	// let ast_root = Scope {
	// 	statements: vec![
	// 		Statement::VariableDef {
	// 			var_name: Symbol {
	// 				name: "y".into(),
	// 				span: WingSpan {
	// 					start: 0,
	// 					end: 1,
	// 					file_id: "tmp1.w".into(),
	// 				},
	// 			},
	// 			initial_value: Expression::Literal(Literal::Boolean(true)),
	// 		},
	// 		Statement::FunctionDefinition(FunctionDefinition {
	// 			name: Symbol {
	// 				name: "hi".into(),
	// 				span: WingSpan {
	// 					start: 15,
	// 					end: 17,
	// 					file_id: "tmp1.w".into(),
	// 				},
	// 			},
	// 			parameters: vec![
	// 				Symbol {
	// 					name: "a".into(),
	// 					span: WingSpan {
	// 						start: 18,
	// 						end: 19,
	// 						file_id: "tmp1.w".into(),
	// 					},
	// 				},
	// 				Symbol {
	// 					name: "b".into(),
	// 					span: WingSpan {
	// 						start: 29,
	// 						end: 30,
	// 						file_id: "tmp1.w".into(),
	// 					},
	// 				},
	// 			],
	// 			statements: Scope {
	// 				statements: vec![Statement::Scope(Scope {
	// 					statements: vec![Statement::Return(Some(Expression::Binary {
	// 						op: BinaryOperator::Greater,
	// 						lexp: Box::new(Expression::Reference(Reference {
	// 							namespace: None,
	// 							identifier: Symbol {
	// 								name: "a".into(),
	// 								span: WingSpan {
	// 									start: 59,
	// 									end: 60,
	// 									file_id: "tmp1.w".into(),
	// 								},
	// 							},
	// 						})),
	// 						rexp: Box::new(Expression::Literal(Literal::Number(7.0))),
	// 					}))],
	// 				})],
	// 			},
	// 			signature: FunctionSignature {
	// 				parameters: vec![Type::Number, Type::Bool],
	// 				return_type: Some(Box::new(Type::Bool)),
	// 			},
	// 		}),
	// 	],
	// };

	let mut root_env = TypeEnv::new(None, None);

	let mut tc = TypeChecker::new();
	tc.type_check_scope(&ast_root, &mut root_env);

	println!("{}", jsify::jsify(&ast_root, true));
}
