use lsp_types::{
	CodeAction, CodeActionKind, CodeActionOrCommand, CodeActionParams, CodeActionTriggerKind, Diagnostic,
	DiagnosticSeverity, TextEdit, Url, WorkspaceEdit,
};
use std::collections::HashMap;

use crate::diagnostic::{get_diagnostics, ERR_EXPECTED_SEMICOLON};
use crate::wasm_util::extern_json_fn;

#[no_mangle]
pub unsafe extern "C" fn wingc_on_code_action(ptr: u32, len: u32) -> u64 {
	extern_json_fn(ptr, len, on_code_action)
}

pub fn on_code_action(params: CodeActionParams) -> Vec<CodeActionOrCommand> {
	let mut action_list = vec![];
	let uri = params.text_document.uri;
	let context = params.context;

	if matches!(context.trigger_kind, Some(CodeActionTriggerKind::INVOKED)) && !context.diagnostics.is_empty() {
		for diagnostic in context.diagnostics {
			if let Some(mut action) = get_fix_for_diagnostic(uri.clone(), diagnostic) {
				if let CodeActionOrCommand::CodeAction(action) = &mut action {
					if action.kind == Some(CodeActionKind::SOURCE_FIX_ALL) {
						action.kind = Some(CodeActionKind::QUICKFIX);
					}
				}

				action_list.push(action);
			}
		}
		return action_list;
	}

	let mut auto_insert_semicolons = vec![];

	let file_id = uri.to_file_path().unwrap().to_str().unwrap().to_string();
	let original_diagnostics = get_diagnostics();
	for original_diagnostic in &original_diagnostics {
		let Some(original_span) = &original_diagnostic.span else {
			continue;
		};
		if original_span.file_id != file_id {
			continue;
		}

		let action = get_fix_for_diagnostic(
			uri.clone(),
			Diagnostic {
				message: original_diagnostic.message.clone(),
				range: original_diagnostic.span.clone().unwrap_or_default().into(),
				severity: Some(DiagnosticSeverity::ERROR),
				..Default::default()
			},
		);
		if let Some(mut action) = action {
			if let CodeActionOrCommand::CodeAction(action) = &mut action {
				if action.title == "Insert ';'" {
					let mut add_autofix = true;
					// ensure that this error doesn't intersect any other errors
					for other_diagnostic in &original_diagnostics {
						if other_diagnostic.message != original_diagnostic.message
							&& other_diagnostic
								.span
								.as_ref()
								.unwrap()
								.contains_span(&original_diagnostic.span.as_ref().unwrap())
						{
							add_autofix = false;
							break;
						}
					}
					if add_autofix {
						auto_insert_semicolons.push((
							action.diagnostics.as_ref().unwrap()[0].clone(),
							action.edit.as_ref().unwrap().changes.as_ref().unwrap().clone(),
						));
					}
				}
			}

			action_list.push(action);
		}
	}

	// if there are semicolons missing, add a fix all action to correct them all at once
	if !auto_insert_semicolons.is_empty() {
		let mut combined_changes = HashMap::new();
		for changes in &auto_insert_semicolons {
			for (file, edits) in &changes.1 {
				combined_changes
					.entry(file.clone())
					.or_insert_with(|| vec![])
					.extend(edits.clone());
			}
		}

		action_list.push(CodeActionOrCommand::CodeAction(CodeAction {
			title: "Insert ';'".to_string(),
			kind: Some(CodeActionKind::SOURCE_FIX_ALL),
			diagnostics: Some(
				auto_insert_semicolons
					.iter()
					.map(|(diagnostic, _)| diagnostic)
					.cloned()
					.collect(),
			),
			edit: Some(WorkspaceEdit {
				changes: Some(combined_changes),
				..Default::default()
			}),

			is_preferred: Some(true),
			..Default::default()
		}));
	}

	action_list
}

fn get_fix_for_diagnostic(file: Url, diagnostic: Diagnostic) -> Option<CodeActionOrCommand> {
	match diagnostic.message.as_str() {
		ERR_EXPECTED_SEMICOLON => {
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
				kind: Some(CodeActionKind::QUICKFIX),
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
			assert!(action.kind == Some(CodeActionKind::QUICKFIX));
		} else {
			panic!("Expected first action to CodeAction");
		}
		if let CodeActionOrCommand::CodeAction(action) = &insert_semicolon[1] {
			assert!(action.kind == Some(CodeActionKind::SOURCE_FIX_ALL));
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
