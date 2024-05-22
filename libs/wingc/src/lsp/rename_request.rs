use std::collections::HashMap;

use crate::lsp::sync::PROJECT_DATA;
use crate::visit::Visit;
use crate::wasm_util::extern_json_fn;
use lsp_types::{RenameParams, WorkspaceEdit};

use super::rename_visitor::RenameVisitor;
use super::sync::{check_utf8, WING_TYPES};

#[no_mangle]
pub unsafe extern "C" fn wingc_on_rename(ptr: u32, len: u32) -> u64 {
	extern_json_fn(ptr, len, on_rename_request)
}

pub fn on_rename_request(params: RenameParams) -> WorkspaceEdit {
	WING_TYPES.with(|types| {
		let types = types.borrow();
		PROJECT_DATA.with(|project_data| -> WorkspaceEdit {
			let project_data = project_data.borrow();
			let uri = params.text_document_position.text_document.uri;
			let file = check_utf8(uri.to_file_path().expect("LSP only works on real filesystems"));
			let ast = project_data.asts.get(&file).unwrap();

			let new_word = params.new_name;
			let position = params.text_document_position.position;

			let mut reference_visitor = RenameVisitor::new(&types, ast);
			reference_visitor.visit_scope(ast.root());

			let text_edits = reference_visitor.create_text_edits(position, new_word.clone());

			let mut changes = HashMap::new();
			changes.insert(uri, text_edits);

			WorkspaceEdit {
				changes: Some(changes),
				document_changes: None,
				change_annotations: None,
			}
		})
	})
}

#[cfg(test)]
mod tests {
	use crate::lsp::rename_request::*;
	use crate::lsp::sync::test_utils::*;
	use lsp_types::{Range, Url};

	/// Creates a snapshot test for a given wing program's rename_request at a given position
	/// In the wing program, place a comment "//^" into the text where the "^" is pointing to the desired character position
	/// To assert on the target range of the result, place a comment "//-" below the target, with additional "-" characters to extend the range
	///
	/// First parameter will be the name of the tests, as well as the identifier to use for the list of completion in the asserts (see last parameter)
	/// Second parameter is the wing code block as a string literal
	/// Third one will be the new name to apply
	/// After the first two parameters, additional statements can optionally be provided to assert on the returned data.
	///
	/// Result is a Workspace Edit
	macro_rules! test_rename_request {
		($name:ident, $code:literal, $new_word:literal) => {
			test_rename_request!($name, $code, $new_word,);
		};
		($name:ident, $code:literal, $new_word:literal, $($assertion:stmt)*) => {
			#[test]
			fn $name() {
				// NOTE: this is needed for debugging to work regardless of where you run the test
				std::env::set_current_dir(env!("CARGO_MANIFEST_DIR")).unwrap();

				let text_document_position_params = load_file_with_contents($code);

				let $name = on_rename_request(RenameParams {
					text_document_position: text_document_position_params.clone(),
					work_done_progress_params: Default::default(),
          new_name: String::from($new_word)
				});

				insta::with_settings!(
					{
						prepend_module_to_snapshot => false,
						omit_expression => true,
						snapshot_path => "./snapshots/rename_request",
					}, {

            let mut changes = HashMap::new();
            // There is only one file, therefore we change only the first one
            let new_key = Url::parse("file:///main.w").expect("invalid url");
            if let Some(c) =  &$name.changes {
            let text_edits = c.values().next().unwrap().clone();
            changes.insert(new_key, text_edits);
            }

            insta::assert_yaml_snapshot!(WorkspaceEdit {
              changes: Some(changes),
              document_changes: None,
				      change_annotations: None,
            });


					}
				);

      let mut text_edit_ranges: Vec<Range> = vec![];
      if let Some(changes) = &$name.changes {
        for text_edits in changes.values() {
            for text_edit in text_edits {
              assert_eq!(
                $new_word,
                text_edit.new_text,
                "new_word did not match"
              );
              text_edit_ranges.push(text_edit.range.clone());
            }
        }
      }

        assert_eq!(
            get_ranges($code),
						text_edit_ranges,
						"target_range did not match"
					);

				$($assertion)*
			}
		};
	}

	test_rename_request!(
		variable_same_scope,
		r#"
let thing = "thing";
  //-----
let thing2 = thing;
           //----^
		"#,
		"t1"
	);

	test_rename_request!(
		variable_same_scope_declaration,
		r#"
let thing = "thing";
  //----^
let thing2 = thing;
           //-----
		"#,
		"t1"
	);

	test_rename_request!(
		rename_str,
		r#"
let thing = "thing";
               //^
let thing2 = thing;
		"#,
		"t1"
	);

	test_rename_request!(
		rename_symbol,
		r#"
let thing = "thing";
                 //^
let thing2 = thing;
		"#,
		"t1"
	);
	//

	test_rename_request!(
		rename_inner_scope,
		r#"
let var thing = 6;
      //-----
if (thing > 8) {
  //-----
  thing = 6;
//----^
} else {
  if (thing < 0) {
    //-----
    let thing = 0;
    log(thing);
  }
  log(thing)
    //-----
}               
		"#,
		"t1"
	);

	test_rename_request!(
		rename_outer_scope,
		r#"
    let var thing = 6;
          //----^
    if (thing > 8) {
      //-----
    thing = 6;
  //-----
    } else {
    if (thing < 0) {
      //-----
      let thing = 0;
      log(thing);
    }
    log(thing)
      //-----
    }
		"#,
		"t1"
	);

	test_rename_request!(
		rename_inner_scope_shadowing,
		r#"
    let var thing = 6;
    if (thing > 8) {
    thing = 6;

    } else {
    if (thing < 0) {
      let thing = 0;
        //-----
      log(thing);
        //----^
    }
    log(thing)
    }
		"#,
		"t1"
	);

	test_rename_request!(
		rename_class,
		r#"
class User {
    //----
  name: str;
}

class Admin extends User {
                  //----
  permission: num;
}

let a = new User();
          //---^
let b = new Admin();
		"#,
		"t1"
	);

	test_rename_request!(
		rename_closure,
		r#"
let pow = inflight (x: num) => {
  //--^
  return x * x;
};

test "pow" {
  assert(pow(5) == 25);
       //---
  assert(pow(25) == pow( pow(5) ));
       //---      //---//---
}
		"#,
		"t1"
	);

	test_rename_request!(
		rename_for_iterator,
		r#"
    bring cloud;

    let buckets = [new cloud.Bucket()];
    for bucket in buckets {
      //-----^
      bucket.addObject("bucket","bucket");
    //------
      log(bucket.toString());
        //------
    }
		"#,
		"t1"
	);

	test_rename_request!(
		rename_for_iterator_reference,
		r#"
    bring cloud;

    let buckets = [new cloud.Bucket()];
    for bucket in buckets {
      //------
      bucket.addObject("bucket","bucket");
    //------
      log(bucket.toString());
        //-----^
    }
		"#,
		"t1"
	);

	test_rename_request!(
		rename_for_loop,
		r#"
    bring cloud;

    let buckets = [new cloud.Bucket()];
      //------^
    for bucket in buckets {
                //-------
      bucket.addObject("bucket","bucket");
      log(bucket.toString());
    }
		"#,
		"t1"
	);

	// TODO: not supported yet
	test_rename_request!(
		rename_namespace,
		r#"
    bring cloud;
           //^
    let bucket = new cloud.Bucket();
		"#,
		"t1"
	);

	// TODO: not supported yet
	test_rename_request!(
		rename_namespace_from_property,
		r#"
    bring cloud;
    let bucket = new cloud.Bucket();
                     //^
		"#,
		"t1"
	);

	// TODO: not supported yet
	test_rename_request!(
		rename_struct_key,
		r#"
    struct user {
      name: str;
      //^
    }
 
 let a: user = {name: "a"};
		"#,
		"t1"
	);

	test_rename_request!(
		rename_struct_name,
		r#"
    struct user {
         //----
      name: str;
    }
    
    let a: user = {name: "a"};
         //---^
		"#,
		"t1"
	);
	// TODO: not supported yet
	test_rename_request!(
		rename_interface_key,
		r#"
    interface ICat {
      inflight stepOnKeyboard(): str;
              //^
    }
    
    class Cat impl ICat {
      pub inflight stepOnKeyboard(): str {
                 
         return "/..,.o0e";
      }
    }
    
    let hershy = new Cat();
    
    test "cat misbehaves" {
      hershy.stepOnKeyboard();
    }
		"#,
		"t1"
	);

	test_rename_request!(
		rename_interface_name,
		r#"
    interface ICat {
            //---^
      inflight stepOnKeyboard(): str;
    }
    
    class Cat impl ICat {
                 //----
      pub inflight stepOnKeyboard(): str {
                 
         return "/..,.o0e";
      }
    }
    
    let hershy = new Cat();
    
    test "cat misbehaves" {
      hershy.stepOnKeyboard();
    }
		"#,
		"t1"
	);
}
