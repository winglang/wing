use tower_lsp::lsp_types::SemanticTokenType;
use tree_sitter::{Node, Point, Tree};
use tree_sitter_traversal::{traverse, Order};

// For efficiency, this lets us minimize store space when communicating through the LSP
pub const LEGEND_TYPE: &[SemanticTokenType] = &[
    SemanticTokenType::VARIABLE,
    SemanticTokenType::TYPE,
    SemanticTokenType::TYPE_PARAMETER,
    SemanticTokenType::STRUCT,
    SemanticTokenType::STRING,
    SemanticTokenType::PROPERTY,
    SemanticTokenType::PARAMETER,
    SemanticTokenType::OPERATOR,
    SemanticTokenType::NUMBER,
    SemanticTokenType::NAMESPACE,
    SemanticTokenType::MODIFIER,
    SemanticTokenType::METHOD,
    SemanticTokenType::MACRO,
    SemanticTokenType::KEYWORD,
    SemanticTokenType::INTERFACE,
    SemanticTokenType::FUNCTION,
    SemanticTokenType::ENUM,
    SemanticTokenType::ENUM_MEMBER,
    SemanticTokenType::COMMENT,
    SemanticTokenType::CLASS,
    SemanticTokenType::EVENT,
];

#[derive(Debug)]
pub struct AbsoluteSemanticToken {
    pub start: Point,
    pub length: usize,
    pub token_type: usize,
}

pub fn get_token_type(token_type: &SemanticTokenType) -> usize {
    LEGEND_TYPE.iter().position(|x| x == token_type).unwrap()
}

// visit all nodes in tree-sitter tree
pub fn semantic_token_from_ast(tree: &Tree) -> Vec<AbsoluteSemanticToken> {
    let nodes: Vec<Node<'_>> = traverse(tree.walk(), Order::Pre).collect::<Vec<_>>();
    let mut semantic_tokens: Vec<AbsoluteSemanticToken> = Vec::new();

    for node in nodes {
        if let Some(token) = semantic_token_from_node(&node) {
            semantic_tokens.push(token);
        }
    }

    return semantic_tokens;
}

fn new_absolute_token(node: &Node, token_type: &SemanticTokenType) -> AbsoluteSemanticToken {
    let start = node.start_position();
    let end = node.end_position();
    AbsoluteSemanticToken {
        start,
        // TODO how can lsp handle multiline?
        length: (end.column - start.column),
        token_type: get_token_type(token_type),
    }
}

fn semantic_token_from_node(node: &Node) -> Option<AbsoluteSemanticToken> {
    let parent = node.parent()?;
    let parent_kind = parent.kind();
    let node_kind = node.kind();

    match parent_kind {
        "reference" => match node_kind {
            "identifier" => {
                return Some(new_absolute_token(node, &SemanticTokenType::VARIABLE));
            }
            _ => None,
        },
        "variable_definition_statement" => match node_kind {
            "identifier" => {
                return Some(new_absolute_token(node, &SemanticTokenType::VARIABLE));
            }
            _ => None,
        },
        "namespaced_identifier" => match node_kind {
            "identifier" => {
                return Some(new_absolute_token(node, &SemanticTokenType::TYPE));
            }
            _ => None,
        },
        _ => None,
    }
}
