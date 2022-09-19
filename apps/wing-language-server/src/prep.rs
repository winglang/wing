use tree_sitter::Tree;

#[derive(Debug)]
pub struct ParseResult {
    pub tree: Tree,
    // pub ast: Scope,
    // pub diagnostics: Diagnostics,
}

pub fn parse_text(source_file: &str, text: &[u8]) -> ParseResult {
    let language = tree_sitter_wing::language();
    let mut parser = tree_sitter::Parser::new();
    parser.set_language(language).unwrap();

    let tree = match parser.parse(&text[..], None) {
        Some(tree) => tree,
        None => {
            println!("Failed parsing source file: {}", source_file);
            std::process::exit(1);
        }
    };

    // TODO: Currently not including the actual wingc code because it's not async-friendly

    // let wing_parser = Parser {
    //     source: &text[..],
    //     source_name: source_file.to_string(),
    //     diagnostics: RefCell::new(Diagnostics::new()),
    // };

    // let scope = wing_parser.wingit(&tree.root_node());

    // for diagnostic in wing_parser.diagnostics.borrow().iter() {
    //     println!("{}", diagnostic);
    // }

    // if wing_parser.diagnostics.borrow().len() > 0 {
    //     std::process::exit(1);
    // }

    return ParseResult {
        // ast: scope,
        tree,
        // diagnostics: wing_parser.diagnostics.borrow().clone(),
    };
}
