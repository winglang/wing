use crate::lsp::symbol_locator::SymbolLocator;
use crate::lsp::sync::PROJECT_DATA;
use crate::type_check::symbol_env::LookupResult;
use crate::visit::Visit;
use crate::wasm_util::extern_json_fn;
use lsp_types::{GotoDefinitionParams, LocationLink, Position, Range, Url};
use tree_sitter::Point;

use super::sync::{check_utf8, WING_TYPES};

#[no_mangle]
pub unsafe extern "C" fn wingc_on_goto_definition(ptr: u32, len: u32) -> u64 {
	extern_json_fn(ptr, len, on_goto_definition)
}

pub fn on_goto_definition(params: GotoDefinitionParams) -> Vec<LocationLink> {
	WING_TYPES.with(|types| {
		let types = types.borrow();
		PROJECT_DATA.with(|project_data| -> Vec<LocationLink> {
			let project_data = project_data.borrow();
			let uri = params.text_document_position_params.text_document.uri;
			let file = check_utf8(uri.to_file_path().expect("LSP only works on real filesystems"));
			let wing_source = project_data.files.get_file(&file).unwrap().as_bytes();
			let ast = project_data.asts.get(&file).unwrap();
			let scope = ast.root();

			let mut symbol_finder = SymbolLocator::new(ast, &types, params.text_document_position_params.position.into());
			symbol_finder.visit_scope(scope);

			if let Some(lookup) = symbol_finder.lookup_located_symbol() {
				if let LookupResult::Found(_, info) = &lookup {
					if let Ok(target_uri) = Url::from_file_path(&info.span.file_id) {
						let origin_span = &info.span;
						return vec![LocationLink {
							origin_selection_range: symbol_finder.located_span().map(|span| span.clone().into()),
							target_uri,
							target_range: origin_span.into(),
							target_selection_range: origin_span.into(),
						}];
					}
				}
			}

			let point = Point::new(
				params.text_document_position_params.position.line as usize,
				params.text_document_position_params.position.character as usize,
			);
			let node = project_data
				.trees
				.get(&file)
				.unwrap()
				.root_node()
				.descendant_for_point_range(point, point)
				.expect("There is always at-least one tree-sitter node");

			// we only support goto definition for extern right now
			match node.kind() {
				"string" => {
					let parent = node.parent().unwrap();
					if matches!(parent.kind(), "extern_modifier" | "import_statement") {
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

							vec![LocationLink {
								origin_selection_range: Some(Range {
									start: Position {
										line: node_start.row as u32,
										character: node_start.column as u32,
									},
									end: Position {
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
	})
}

#[cfg(test)]
mod tests {
	use crate::lsp::goto_definition::*;
	use crate::lsp::sync::test_utils::*;

	/// Creates a snapshot test for a given wing program's goto_definition at a given position
	/// In the wing program, place a comment "//^" into the text where the "^" is pointing to the desired character position
	/// To assert on the target range of the result, place a comment "//-" below the target, with additional "-" characters to extend the range
	///
	/// First parameter will be the name of the tests, as well as the identifier to use for the list of completion in the asserts (see last parameter)
	/// Second parameter is the wing code block as a string literal
	/// After the first two parameters, additional statements can optionally be provided to assert on the returned data.
	///
	/// Result is a Vec of document links
	macro_rules! test_goto_definition {
		($name:ident, $code:literal) => {
			test_goto_definition!($name, $code,);
		};
		($name:ident, $code:literal, $($assertion:stmt)*) => {
			#[test]
			fn $name() {
				// NOTE: this is needed for debugging to work regardless of where you run the test
				std::env::set_current_dir(env!("CARGO_MANIFEST_DIR")).unwrap();

				let text_document_position_params = load_file_with_contents($code);

				let $name = on_goto_definition(GotoDefinitionParams {
					text_document_position_params: text_document_position_params.clone(),
					work_done_progress_params: Default::default(),
					partial_result_params: Default::default(),
				});

				insta::with_settings!(
					{
						prepend_module_to_snapshot => false,
						omit_expression => true,
						snapshot_path => "./snapshots/goto_definition",
					}, {
						let document_path = text_document_position_params
							.text_document
							.uri
							.to_file_path()
							.unwrap();

						insta::assert_yaml_snapshot!($name, {
							"[].targetUri" => insta::dynamic_redaction(move |value, _path| {
								// value is a path, we want to remove the the prefix of it from text_document_position_params
								let full_w_filename = document_path.as_os_str().to_str().unwrap();
								let parent_dir = document_path.parent().unwrap().as_os_str().to_str().unwrap();

								let value = value.as_str().unwrap().replace(full_w_filename, "main.w");
								let value = value.replace(parent_dir, "");

								insta::internals::Content::String(value)
							}),
						});
					}
				);

				let ranges = get_ranges($code);
				if ranges.len() > 1 {
					panic!("test_goto_definition only supports one range");
				} else if ranges.len() == 1 {
					let range = ranges[0];

					assert_eq!(
						range,
						$name[0].target_range,
						"target_range did not match"
					);
				}

				$($assertion)*
			}
		};
	}

	test_goto_definition!(
		variable_same_scope,
		r#"
let thing = "hello";
  //-----
let otherThing = thing;
                 //^
		"#,
	);

	test_goto_definition!(
		extern_path,
		r#"
class T {
  extern "./util.js" static util(): string;
           //^
}
		"#,
	);

	test_goto_definition!(
		new_expression_incomplete,
		r#"
bring cloud;
    //-----
new cloud. 
		//^
"#,
	);

	test_goto_definition!(
		class_symbol_in_closure,
		r#"
inflight class MyClass { }
             //-------

inflight () => {
  let myClass = new MyClass();
                    //^
}
"#,
	);

	test_goto_definition!(
		user_defined_type_reference_property,
		r#"
class Foo { 
  static static_method() { }
       //-------------
}
Foo.static_method();
   //^
"#
	);

	test_goto_definition!(
		user_defined_type_reference_type,
		r#"
class Foo {
    //---
	static static_method() { }
}
Foo.static_method();
//^
"#
	);

	test_goto_definition!(
		var_in_call,
		r#"
let var xoo = "hello";
      //---
log(xoo);
    //^
"#
	);

	test_goto_definition!(
		inflight_init_struct_field,
		r#"
struct Data {
  field: str;
//-----
}

class T {
	new() {
		Data { field: "" };
	}

	inflight new() {
		Data { field: "" };
          //^
	}
}
"#
	);

	test_goto_definition!(
		class_init_this_field,
		r#"
class T {
  stuff: num;
//-----

	new() {
    this.stuff = 1;
         //^
  }
}
"#
	);

	test_goto_definition!(
		class_impl,
		r#"
interface IInterface {}
        //----------
class C impl IInterface {}
               //^
"#
	);

	test_goto_definition!(
		class_extends,
		r#"
class Parent {}
    //------
class Child extends Parent {}
                   //^
"#
	);

	test_goto_definition!(
		goto_module_path,
		r#"
bring "./blah.w" as blah;
        //^
"#,
		assert!(goto_module_path.len() == 1)
		assert_eq!(goto_module_path[0].target_uri.to_file_path().unwrap().file_name().unwrap(), "blah.w")
	);
}
