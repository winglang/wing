use tower_lsp::lsp_types::{CompletionItemKind, Position, SemanticTokenType};
use tree_sitter::{Node, Tree};
use tree_sitter_traversal::{traverse, Order};
use wingc::diagnostic::WingSpan;

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
pub struct RelativeSemanticToken {
    pub start: usize,
    pub end: usize,
    pub length: usize,
    pub token_type: usize,
}

#[derive(Debug)]
pub struct RelativeCompletionToken {
    pub text: String,
    pub kind: CompletionItemKind,
}

pub fn get_token_type(token_type: &SemanticTokenType) -> usize {
    LEGEND_TYPE.iter().position(|x| x == token_type).unwrap()
}

pub fn token_from_span(span: WingSpan, token_type: SemanticTokenType) -> RelativeSemanticToken {
    RelativeSemanticToken {
        start: span.start_byte,
        end: span.end_byte,
        length: span.end_byte - span.start_byte,
        token_type: get_token_type(&token_type),
    }
}

// visit all nodes in tree-sitter tree
pub fn semantic_token_from_ast(tree: &Tree) -> Vec<RelativeSemanticToken> {
    let nodes: Vec<Node<'_>> = traverse(tree.walk(), Order::Pre).collect::<Vec<_>>();
    let mut semantic_tokens: Vec<RelativeSemanticToken> = Vec::new();

    for node in nodes {
        let kind = node.kind();

        let token = if let Some(kind) = map_kind_to_token_type(kind) {
            Some(RelativeSemanticToken {
                start: node.start_byte(),
                end: node.end_byte(),
                length: node.end_byte() - node.start_byte(),
                token_type: get_token_type(&kind),
            })
        } else {
            None
        };

        if let Some(token) = token {
            semantic_tokens.push(token);
        }
    }

    return semantic_tokens;
}

pub fn completions_from_ast(
    source: &str,
    tree: &Tree,
    position: Position,
) -> Vec<RelativeCompletionToken> {
    let nodes: Vec<Node<'_>> = traverse(tree.walk(), Order::Pre).collect::<Vec<_>>();
    let mut completions: Vec<RelativeCompletionToken> = Vec::new();

    for node in nodes {
        if node.start_position().row >= position.line.try_into().unwrap() {
            continue;
        }

        let kind = node.kind();

        match kind {
            "variable_definition_statement" => {
                let name = node.child_by_field_name("name").unwrap();
                let name_text = name.utf8_text(source.as_bytes()).unwrap();
                let completion = RelativeCompletionToken {
                    text: name_text.to_string(),
                    kind: CompletionItemKind::VARIABLE,
                };
                completions.push(completion);
            }
            _ => (),
        }
    }

    return completions;
}

fn map_kind_to_token_type(kind: &str) -> Option<SemanticTokenType> {
    match kind {
        "class_type" => Some(SemanticTokenType::TYPE),
        "builtin_type" => Some(SemanticTokenType::TYPE),
        "number" => Some(SemanticTokenType::NUMBER),
        "duration" => Some(SemanticTokenType::NUMBER),
        "string" => Some(SemanticTokenType::STRING),
        "comment" => Some(SemanticTokenType::COMMENT),

        "variable" => Some(SemanticTokenType::VARIABLE),
        "type_parameter" => Some(SemanticTokenType::TYPE_PARAMETER),
        "struct" => Some(SemanticTokenType::STRUCT),
        "property" => Some(SemanticTokenType::PROPERTY),
        "parameter" => Some(SemanticTokenType::PARAMETER),
        "operator" => Some(SemanticTokenType::OPERATOR),
        "namespace" => Some(SemanticTokenType::NAMESPACE),
        "modifier" => Some(SemanticTokenType::MODIFIER),
        "method" => Some(SemanticTokenType::METHOD),
        "macro" => Some(SemanticTokenType::MACRO),
        "keyword" => Some(SemanticTokenType::KEYWORD),
        "interface" => Some(SemanticTokenType::INTERFACE),
        "function" => Some(SemanticTokenType::FUNCTION),
        "enum" => Some(SemanticTokenType::ENUM),
        "enum_member" => Some(SemanticTokenType::ENUM_MEMBER),
        "class_type" => Some(SemanticTokenType::CLASS),
        "event" => Some(SemanticTokenType::EVENT),
        _ => None,
    }
}
