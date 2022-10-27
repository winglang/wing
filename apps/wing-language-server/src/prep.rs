use std::cell::RefCell;

use tree_sitter::Tree;
use wingc::{ast::Scope, diagnostic::Diagnostics, parser::Parser, type_check};

#[derive(Debug)]
pub struct ParseResult {
	pub tree: Tree,
	pub diagnostics: Diagnostics,
}

pub fn parse_text(source_file: &str, text: &[u8]) -> ParseResult {
	let language = tree_sitter_wing::language();
	let mut parser = tree_sitter::Parser::new();
	parser.set_language(language).unwrap();

	let tree = match parser.parse(&text[..], None) {
		Some(tree) => tree,
		None => {
			panic!("Failed parsing source file: {}", source_file);
		}
	};

	let wing_parser = Parser {
		source: &text[..],
		source_name: source_file.to_string(),
		diagnostics: RefCell::new(Diagnostics::new()),
	};

	let mut scope = wing_parser.wingit(&tree.root_node());

	let mut types = type_check::Types::new();
	let type_diag = type_check(&mut scope, &mut types);
	let parse_diag = wing_parser.diagnostics.into_inner();

	let diagnostics = vec![parse_diag, type_diag].concat();

	return ParseResult { tree, diagnostics };
}
