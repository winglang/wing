use tower_lsp::lsp_types::{CompletionItemKind, SemanticTokenType, SymbolKind};
use tree_sitter::{Query, QueryCursor, Tree};
use wingc::{ast, diagnostic::WingSpan};

use crate::prep::ParseResult;

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

// pub fn semantic_token_from_parse_result(parse_result: &ParseResult) -> Vec<RelativeSemanticToken> {
//     let mut tokens: Vec<RelativeSemanticToken> = vec![];

//     for statement in parse_result.ast.statements.iter() {
//         match statement {
//             ast::Statement::Use {
//                 module_name,
//                 identifier,
//             } => {
//                 tokens.push(token_from_span(
//                     module_name.span,
//                     SemanticTokenType::INTERFACE,
//                 ));
//                 if let Some(identifier) = identifier {
//                     tokens.push(token_from_span(identifier.span, SemanticTokenType::STRUCT));
//                 }
//             }
//             ast::Statement::VariableDef {
//                 var_name,
//                 initial_value,
//             } => todo!(),
//             ast::Statement::FunctionDefinition(_) => todo!(),
//             ast::Statement::ForLoop {
//                 iterator,
//                 iterable,
//                 statements,
//             } => todo!(),
//             ast::Statement::If {
//                 condition,
//                 statements,
//                 else_statements,
//             } => todo!(),
//             ast::Statement::Expression(_) => todo!(),
//             ast::Statement::Assignment { variable, value } => todo!(),
//             ast::Statement::Return(_) => todo!(),
//             ast::Statement::Scope(_) => todo!(),
//             ast::Statement::Class {
//                 name,
//                 members,
//                 methods,
//                 constructor,
//                 parent,
//                 is_resource,
//             } => todo!(),
//         };
//     }

//     tokens
// }

pub fn semantic_token_from_ast(source: &str, ast: &Tree) -> Vec<RelativeSemanticToken> {
    let query = Query::new(ast.language(), tree_sitter_winglang::HIGHLIGHTS_QUERY).unwrap();

    QueryCursor::new()
        .captures(&query, ast.root_node(), source.as_bytes())
        .filter_map(|(mat, capture_index)| {
            let capture = mat.captures[capture_index];
            let capture_name = &query.capture_names()[capture.index as usize];
            let node = capture.node;

            let kind = get_capture_kind(capture_name.as_str());

            if let Some(kind) = kind {
                Some(RelativeSemanticToken {
                    start: node.start_byte(),
                    end: node.end_byte(),
                    length: node.end_byte() - node.start_byte(),
                    token_type: get_token_type(&kind.2),
                })
            } else {
                if node.is_extra() {
                    Some(RelativeSemanticToken {
                        start: node.start_byte(),
                        end: node.end_byte(),
                        length: node.end_byte() - node.start_byte(),
                        token_type: get_token_type(&SemanticTokenType::COMMENT),
                    })
                } else {
                    None
                }
            }
        })
        .collect()
}

pub fn completions_from_ast(source: &str, ast: &Tree) -> Vec<RelativeCompletionToken> {
    let query = Query::new(ast.language(), tree_sitter_winglang::HIGHLIGHTS_QUERY).unwrap();

    QueryCursor::new()
        .captures(&query, ast.root_node(), source.as_bytes())
        .filter_map(|(mat, capture_index)| {
            let capture = mat.captures[capture_index];
            let capture_name = &query.capture_names()[capture.index as usize];
            let node = capture.node;

            let kind = get_capture_kind(capture_name.as_str());

            if let Some(kind) = kind {
                Some(RelativeCompletionToken {
                    text: node.utf8_text(source.as_bytes()).unwrap().to_string(),
                    kind: kind.0,
                })
            } else {
                None
            }
        })
        .collect()
}

fn get_capture_kind(
    capture_name: &str,
) -> Option<(CompletionItemKind, SymbolKind, SemanticTokenType)> {
    match capture_name {
        "variable" => Some((
            CompletionItemKind::VARIABLE,
            SymbolKind::VARIABLE,
            SemanticTokenType::VARIABLE,
        )),
        "function" | "function.macro" => Some((
            CompletionItemKind::FUNCTION,
            SymbolKind::FUNCTION,
            SemanticTokenType::FUNCTION,
        )),
        "type" => Some((
            CompletionItemKind::TYPE_PARAMETER,
            SymbolKind::TYPE_PARAMETER,
            SemanticTokenType::TYPE_PARAMETER,
        )),
        "label" => Some((
            CompletionItemKind::TEXT,
            SymbolKind::STRING,
            SemanticTokenType::STRING,
        )),
        "module" => Some((
            CompletionItemKind::MODULE,
            SymbolKind::MODULE,
            SemanticTokenType::NAMESPACE,
        )),
        "keyword" | "repeat" | "keyword.operator" | "keyword.return" => Some((
            CompletionItemKind::KEYWORD,
            SymbolKind::KEY,
            SemanticTokenType::KEYWORD,
        )),
        "struct" => Some((
            CompletionItemKind::STRUCT,
            SymbolKind::STRUCT,
            SemanticTokenType::STRUCT,
        )),
        "enum" => Some((
            CompletionItemKind::ENUM,
            SymbolKind::ENUM,
            SemanticTokenType::ENUM,
        )),
        "number" | "character" | "boolean" => Some((
            CompletionItemKind::VALUE,
            SymbolKind::NUMBER,
            SemanticTokenType::NUMBER,
        )),
        "interface" => Some((
            CompletionItemKind::INTERFACE,
            SymbolKind::INTERFACE,
            SemanticTokenType::INTERFACE,
        )),
        "constant" | "constant.builtin" => Some((
            CompletionItemKind::CONSTANT,
            SymbolKind::CONSTANT,
            SemanticTokenType::ENUM_MEMBER,
        )),
        "string" | "string.escape" => Some((
            CompletionItemKind::TEXT,
            SymbolKind::STRING,
            SemanticTokenType::STRING,
        )),
        "include" => Some((
            CompletionItemKind::MODULE,
            SymbolKind::MODULE,
            SemanticTokenType::NAMESPACE,
        )),
        "parameter" => Some((
            CompletionItemKind::VARIABLE,
            SymbolKind::VARIABLE,
            SemanticTokenType::PARAMETER,
        )),
        "property" => Some((
            CompletionItemKind::PROPERTY,
            SymbolKind::PROPERTY,
            SemanticTokenType::PROPERTY,
        )),
        "method" => Some((
            CompletionItemKind::METHOD,
            SymbolKind::METHOD,
            SemanticTokenType::METHOD,
        )),
        "constructor" => Some((
            CompletionItemKind::CONSTRUCTOR,
            SymbolKind::CONSTRUCTOR,
            SemanticTokenType::METHOD,
        )),
        "field" => Some((
            CompletionItemKind::FIELD,
            SymbolKind::FIELD,
            SemanticTokenType::PROPERTY,
        )),
        "package" => Some((
            CompletionItemKind::MODULE,
            SymbolKind::MODULE,
            SemanticTokenType::NAMESPACE,
        )),
        "namespace" => Some((
            CompletionItemKind::MODULE,
            SymbolKind::MODULE,
            SemanticTokenType::NAMESPACE,
        )),
        "class" => Some((
            CompletionItemKind::CLASS,
            SymbolKind::CLASS,
            SemanticTokenType::CLASS,
        )),
        "enum_member" => Some((
            CompletionItemKind::ENUM_MEMBER,
            SymbolKind::ENUM_MEMBER,
            SemanticTokenType::ENUM_MEMBER,
        )),
        "getter" => Some((
            CompletionItemKind::PROPERTY,
            SymbolKind::PROPERTY,
            SemanticTokenType::PROPERTY,
        )),
        "setter" => Some((
            CompletionItemKind::PROPERTY,
            SymbolKind::PROPERTY,
            SemanticTokenType::PROPERTY,
        )),
        "operator"
        | "punctuation"
        | "punctuation.bracket"
        | "punctuation.delimiter"
        | "punctuation.special"
        | "conditional" => Some((
            CompletionItemKind::OPERATOR,
            SymbolKind::OPERATOR,
            SemanticTokenType::OPERATOR,
        )),
        _ => None,
    }
}
