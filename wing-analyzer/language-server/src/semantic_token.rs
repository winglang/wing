use tower_lsp::lsp_types::{CompletionItemKind, Position, SemanticTokenType};
use tree_sitter::{Node, Point, Tree};
use tree_sitter_traversal::{traverse, Order};

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
    pub detail: Option<String>,
}

pub fn get_token_type(token_type: &SemanticTokenType) -> usize {
    LEGEND_TYPE.iter().position(|x| x == token_type).unwrap()
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

    let point = Point::new(
        position.line.try_into().unwrap(),
        position.character.try_into().unwrap(),
    );
    let node: Option<Node> = tree.root_node().descendant_for_point_range(point, point);
    if let Some(node) = node {
        completions.push(RelativeCompletionToken {
            text: format!("_0 {:#?}", node),
            kind: CompletionItemKind::SNIPPET,
            detail: Some("Node".to_string()),
        });
        if node.parent().is_some() {
            completions.push(RelativeCompletionToken {
                text: format!("_1 {:#?}", node.parent().unwrap()),
                kind: CompletionItemKind::SNIPPET,
                detail: Some("Parent".to_string()),
            });
        }
        if node.next_sibling().is_some() {
            completions.push(RelativeCompletionToken {
                text: format!("_2 {:#?}", node.next_sibling().unwrap()),
                kind: CompletionItemKind::SNIPPET,
                detail: Some("Next".to_string()),
            });
        }
        if node.prev_sibling().is_some() {
            completions.push(RelativeCompletionToken {
                text: format!("_3 {:#?}", node.prev_sibling().unwrap()),
                kind: CompletionItemKind::SNIPPET,
                detail: Some("Prev".to_string()),
            });
        }

        match node.kind() {
            "source" => {
                let keywords = vec![
                    "as", "bring", "class", "else", "for", "if", "in", "init", "inflight", "new",
                ];
                completions.extend(
                    keywords
                        .iter()
                        .map(|x| RelativeCompletionToken {
                            text: x.to_string(),
                            kind: CompletionItemKind::KEYWORD,
                            detail: None,
                        })
                        .collect::<Vec<_>>(),
                );
            }
            "block" | "ERROR" => {
                let keywords = vec![
                    "class", "else", "for", "if", "in", "inflight", "new", "return",
                ];
                completions.extend(
                    keywords
                        .iter()
                        .map(|x| RelativeCompletionToken {
                            text: x.to_string(),
                            kind: CompletionItemKind::KEYWORD,
                            detail: None,
                        })
                        .collect::<Vec<_>>(),
                );
                let builtin_types = vec!["bool", "number", "string"];
                completions.extend(
                    builtin_types
                        .iter()
                        .map(|x| RelativeCompletionToken {
                            text: x.to_string(),
                            kind: CompletionItemKind::TYPE_PARAMETER,
                            detail: None,
                        })
                        .collect::<Vec<_>>(),
                );
            }
            _ => {}
        }
    }

    for node in nodes {
        if node.start_position().row >= position.line.try_into().unwrap() {
            break;
        }

        let kind = node.kind();

        match kind {
            "variable_definition_statement" => {
                let name = node.child_by_field_name("name").unwrap();
                let name_text = name.utf8_text(source.as_bytes()).unwrap();
                let completion = RelativeCompletionToken {
                    text: name_text.to_string(),
                    kind: CompletionItemKind::VARIABLE,
                    detail: None,
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
        _ => None,
    }
}
