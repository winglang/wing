use lsp_types::{CompletionItem, CompletionItemKind, CompletionResponse, Position};
use tree_sitter::{Node, Point, Tree};
use tree_sitter_traversal::{traverse, Order};

use crate::lsp::sync::FILES;
use crate::wasm_util::{ptr_to_string, string_to_combined_ptr, WASM_RETURN_ERROR};

#[derive(Debug)]
pub struct WingCompletionItem {
	pub text: String,
	pub kind: CompletionItemKind,
	pub detail: Option<String>,
}

pub fn completions_from_ast(source: &str, tree: &Tree, position: Position) -> Vec<WingCompletionItem> {
	let nodes: Vec<Node<'_>> = traverse(tree.walk(), Order::Pre).collect::<Vec<_>>();
	let mut completions: Vec<WingCompletionItem> = Vec::new();

	let point = Point::new(
		position.line.try_into().unwrap(),
		position.character.try_into().unwrap(),
	);
	let node: Option<Node> = tree.root_node().descendant_for_point_range(point, point);
	if let Some(node) = node {
		match node.kind() {
			"source" => {
				let keywords = vec!["as", "bring", "class", "else", "for", "if", "in", "inflight", "new"];
				completions.extend(
					keywords
						.iter()
						.map(|x| WingCompletionItem {
							text: x.to_string(),
							kind: CompletionItemKind::KEYWORD,
							detail: None,
						})
						.collect::<Vec<_>>(),
				);
			}
			"block" | "ERROR" => {
				let keywords = vec!["class", "else", "for", "if", "in", "inflight", "new", "return"];
				completions.extend(
					keywords
						.iter()
						.map(|x| WingCompletionItem {
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
						.map(|x| WingCompletionItem {
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
				let completion = WingCompletionItem {
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

#[no_mangle]
pub unsafe extern "C" fn wingc_on_completion(ptr: u32, len: u32) -> u64 {
	let parse_string = ptr_to_string(ptr, len);
	if let Ok(parsed) = serde_json::from_str(&parse_string) {
		let result = on_completion(parsed);
		let result = serde_json::to_string(&result).unwrap();

		// return result as u64 with ptr and len
		string_to_combined_ptr(result)
	} else {
		WASM_RETURN_ERROR
	}
}
pub fn on_completion(params: lsp_types::CompletionParams) -> CompletionResponse {
	FILES.with(|files| {
		let files = files.borrow();
		let uri = params.text_document_position.text_document.uri;
		let result = files.get(&uri).unwrap();

		let position = params.text_document_position.position;
		let completions = completions_from_ast(&result.contents.as_str(), &result.tree, position);

		CompletionResponse::Array(
			completions
				.iter()
				.map(|item| {
					let text = item.text.as_str();
					CompletionItem {
						label: text.to_string(),
						insert_text: None,
						kind: Some(item.kind),
						detail: item.detail.clone(),
						preselect: Some(true),
						..Default::default()
					}
				})
				.collect(),
		)
	})
}
