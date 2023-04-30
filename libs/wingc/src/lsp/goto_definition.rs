use crate::lsp::sync::FILES;
use crate::wasm_util::{ptr_to_string, string_to_combined_ptr, WASM_RETURN_ERROR};
use tree_sitter::Point;

#[no_mangle]
pub unsafe extern "C" fn wingc_on_goto_definition(ptr: u32, len: u32) -> u64 {
	let parse_string = ptr_to_string(ptr, len);
	if let Ok(parsed) = serde_json::from_str(&parse_string) {
		let doc_symbols = on_goto_definition(parsed);
		let result = serde_json::to_string(&doc_symbols).expect("Failed to serialize GotoDefinition response");

		string_to_combined_ptr(result)
	} else {
		WASM_RETURN_ERROR
	}
}

pub fn on_goto_definition(params: lsp_types::GotoDefinitionParams) -> Vec<lsp_types::LocationLink> {
	FILES.with(|files| {
		let files = files.borrow();
		let uri = params.text_document_position_params.text_document.uri;
		let result = files.get(&uri).expect("File must be open to get completions");
		let wing_source = result.contents.as_bytes();

		let point = Point::new(
			params.text_document_position_params.position.line as usize,
			params.text_document_position_params.position.character as usize,
		);
		let node = result
			.tree
			.root_node()
			.descendant_for_point_range(point, point)
			.expect("There is always at-least one tree-sitter node");

		// we only support goto definition for extern right now
		match node.kind() {
			"string" => {
				let parent = node.parent().unwrap();
				if parent.kind() == "extern_modifier" {
					if node.named_child_count() > 0 {
						// this is a string interpolation
						return vec![];
					}

					let path = node.utf8_text(wing_source).unwrap();
					// remove the quotes on the path
					let path = &path[1..path.len() - 1];

					if let Ok(extern_uri) = uri.join(path) {
						let node_start = node.start_position();
						let node_end = node.end_position();

						vec![lsp_types::LocationLink {
							origin_selection_range: Some(lsp_types::Range {
								start: lsp_types::Position {
									line: node_start.row as u32,
									character: node_start.column as u32,
								},
								end: lsp_types::Position {
									line: node_end.row as u32,
									character: node_end.column as u32,
								},
							}),
							target_uri: extern_uri,
							target_range: Default::default(),
							target_selection_range: Default::default(),
						}]
					} else {
						vec![]
					}
				} else {
					vec![]
				}
			}
			_ => vec![],
		}
	})
}
