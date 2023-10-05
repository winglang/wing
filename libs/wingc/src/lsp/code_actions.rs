use lsp_types::{
	CodeAction, CodeActionKind, CodeActionOrCommand, CodeActionParams, Diagnostic, DiagnosticSeverity, TextEdit, Url,
	WorkspaceEdit,
};
use std::collections::HashMap;

use crate::diagnostic::get_diagnostics;
use crate::wasm_util::{ptr_to_string, string_to_combined_ptr, WASM_RETURN_ERROR};

#[no_mangle]
pub unsafe extern "C" fn wingc_on_code_action(ptr: u32, len: u32) -> u64 {
	let parse_string = ptr_to_string(ptr, len);
	if let Ok(parsed) = serde_json::from_str(&parse_string) {
		let result = on_code_action(parsed);
		let result = serde_json::to_string(&result).unwrap();

		// return result as u64 with ptr and len
		string_to_combined_ptr(result)
	} else {
		WASM_RETURN_ERROR
	}
}

pub fn on_code_action(params: CodeActionParams) -> Vec<CodeActionOrCommand> {
	let uri = params.text_document.uri;

	let original_diagnostics = get_diagnostics();
	let mut action_list = vec![];
	for original_diagnostic in &original_diagnostics {
		let mut action = get_fix_for_diagnostic(
			uri.clone(),
			Diagnostic {
				message: original_diagnostic.message.clone(),
				range: original_diagnostic.span.clone().unwrap_or_default().into(),
				severity: Some(DiagnosticSeverity::ERROR),
				..Default::default()
			},
		);
		if let Some(ref mut action) = action {
			if let CodeActionOrCommand::CodeAction(action) = action {
				if action.kind == Some(CodeActionKind::SOURCE_FIX_ALL) {
					// ensure that this error doesn't intersect any other errors
					for other_diagnostic in &original_diagnostics {
						if other_diagnostic.message != original_diagnostic.message
							&& other_diagnostic
								.span
								.as_ref()
								.unwrap()
								.contains_span(&original_diagnostic.span.as_ref().unwrap())
						{
							action.kind = Some(CodeActionKind::QUICKFIX);
							break;
						}
					}
				}
			}

			action_list.push(action.clone());

			if let CodeActionOrCommand::CodeAction(action) = action {
				if action.kind == Some(CodeActionKind::SOURCE_FIX_ALL) {
					// add a quickfix clone of this action
					action.kind = Some(CodeActionKind::QUICKFIX);
					action_list.push(CodeActionOrCommand::CodeAction(action.clone()));
				}
			}
		}
	}

	action_list
}

fn get_fix_for_diagnostic(file: Url, diagnostic: Diagnostic) -> Option<CodeActionOrCommand> {
	match diagnostic.message.as_str() {
		"Expected ';'" => {
			let mut change_hashmap = HashMap::new();
			change_hashmap.insert(
				file,
				vec![TextEdit {
					range: diagnostic.range,
					new_text: ";".to_string(),
				}],
			);
			Some(CodeActionOrCommand::CodeAction(CodeAction {
				title: "Insert ';'".to_string(),
				kind: Some(CodeActionKind::SOURCE_FIX_ALL),
				diagnostics: Some(vec![diagnostic.clone()]),
				edit: Some(WorkspaceEdit {
					changes: Some(change_hashmap),
					..Default::default()
				}),
				is_preferred: Some(true),
				..Default::default()
			}))
		}
		_ => None,
	}
}

#[cfg(test)]
mod tests {
	use crate::lsp::code_actions::*;
	use crate::lsp::sync::test_utils::*;

	/// Creates a snapshot test for a given wing program's code_actions for the entire document
	///
	/// Result is a Vec of [CodeActionOrCommand]
	macro_rules! test_code_actions {
		($name:ident, $code:literal) => {
			test_code_actions!($name, $code,);
		};
		($name:ident, $code:literal, $($assertion:stmt)*) => {
			#[test]
			fn $name() {
				// NOTE: this is needed for debugging to work regardless of where you run the test
				std::env::set_current_dir(env!("CARGO_MANIFEST_DIR")).unwrap();

				let text_document_position = load_file_with_contents($code);
				let $name = on_code_action(CodeActionParams {
					text_document: text_document_position.text_document.clone(),
          range: Default::default(),
					context: Default::default(),
					work_done_progress_params: Default::default(),
					partial_result_params: Default::default(),
				});

        insta::with_settings!(
          {
            prepend_module_to_snapshot => false,
            omit_expression => true,
            snapshot_path => "./snapshots/code_actions",
          }, {
            insta::assert_yaml_snapshot!($name, {
              "[].edit.changes" => insta::dynamic_redaction(|value, _path| {
								// value is a hashmap with guid filename keys, change the keys to just be incrementing numbers
                let mut new_map_entries = vec![];
                if let insta::internals::Content::Map(map) = value {
                  for (i, (_, value)) in map.iter().enumerate() {
                    new_map_entries.push((insta::internals::Content::String(format!("file{}", i)), value.clone()));
                  }
                }

                insta::internals::Content::Map(new_map_entries)
            }),
            });
          }
        );
        $($assertion)*

			}
		};
	}

	test_code_actions!(
		insert_semicolon,
		r#"let x = 2"#,
		assert!(insert_semicolon.len() == 2)
		if let CodeActionOrCommand::CodeAction(action) = &insert_semicolon[0] {
			assert!(action.kind == Some(CodeActionKind::SOURCE_FIX_ALL));
		} else {
			panic!("Expected first action to CodeAction");
		}
		if let CodeActionOrCommand::CodeAction(action) = &insert_semicolon[1] {
			assert!(action.kind == Some(CodeActionKind::QUICKFIX));
		} else {
			panic!("Expected second action to CodeAction");
		}
	);

	test_code_actions!(
		insert_semicolon_quickfix_only,
		r#"let x = bad"#,
		assert!(insert_semicolon_quickfix_only.len() == 1)
		if let CodeActionOrCommand::CodeAction(action) = &insert_semicolon_quickfix_only[0] {
			assert!(action.kind == Some(CodeActionKind::QUICKFIX));
		} else {
			panic!("Expected CodeAction");
		}
	);
}
