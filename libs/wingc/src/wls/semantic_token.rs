use lsp_types::SemanticTokenType;
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

// TODO Use a more efficient lookup method (map or compile-time lookup)
pub fn get_token_type(token_type: &SemanticTokenType) -> usize {
	LEGEND_TYPE.iter().position(|x| x == token_type).unwrap()
}

// visit all nodes in tree-sitter tree
pub fn semantic_token_from_ast(tree: &Tree) -> Vec<AbsoluteSemanticToken> {
	let nodes = traverse(tree.walk(), Order::Pre);
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
		// TODO how can the lsp handle multiline tokens?
		length: (end.column - start.column),
		token_type: get_token_type(token_type),
	}
}

fn semantic_token_from_node(node: &Node) -> Option<AbsoluteSemanticToken> {
	let parent = node.parent()?;
	let parent_kind = parent.kind();
	let node_kind = node.kind();

	match parent_kind {
		"variable_definition_statement" => match node_kind {
			"identifier" => Some(new_absolute_token(node, &SemanticTokenType::VARIABLE)),
			_ => None,
		},
		"parameter_definition" => match node_kind {
			"identifier" => Some(new_absolute_token(node, &SemanticTokenType::PARAMETER)),
			_ => None,
		},
		"custom_type" => {
			if node_kind == "identifier" {
				// if this is the last child, it is a type
				if parent.named_child(parent.named_child_count() - 1).unwrap().id() == node.id() {
					return Some(new_absolute_token(node, &SemanticTokenType::TYPE));
				}
			}
			None
		}
		"inflight_function_definition" => match node_kind {
			"identifier" => Some(new_absolute_token(node, &SemanticTokenType::FUNCTION)),
			_ => None,
		},
		"struct_literal_member" => match node_kind {
			"identifier" => Some(new_absolute_token(node, &SemanticTokenType::PROPERTY)),
			_ => None,
		},
		"class_member" => match node_kind {
			"identifier" => Some(new_absolute_token(node, &SemanticTokenType::PROPERTY)),
			_ => None,
		},
		"resource_definition" => match node_kind {
			"identifier" => Some(new_absolute_token(node, &SemanticTokenType::CLASS)),
			_ => None,
		},
		"class_definition" => match node_kind {
			"identifier" => Some(new_absolute_token(node, &SemanticTokenType::CLASS)),
			_ => None,
		},
		"call" => {
			if node_kind == "reference" {
				let ref_child = node.named_child(0).unwrap();
				return match ref_child.kind() {
					"identifier" => Some(new_absolute_token(&ref_child, &SemanticTokenType::FUNCTION)),
					"nested_identifier" => {
						let prop = ref_child.child_by_field_name("property").unwrap();
						return Some(new_absolute_token(&prop, &SemanticTokenType::METHOD));
					}
					_ => None,
				};
			}
			None
		}
		_ => None,
	}
}
