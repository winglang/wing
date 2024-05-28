use crate::lsp::sync::PROJECT_DATA;
use crate::visit::Visit;
use crate::wasm_util::extern_json_fn;
use lsp_types::{PrepareRenameResponse, TextDocumentPositionParams};

use super::rename_visitor::RenameVisitor;
use super::sync::{check_utf8, WING_TYPES};

#[no_mangle]
pub unsafe extern "C" fn wingc_on_prepare_rename(ptr: u32, len: u32) -> u64 {
	extern_json_fn(ptr, len, on_prepare_rename)
}

pub fn on_prepare_rename(params: TextDocumentPositionParams) -> PrepareRenameResponse {
	WING_TYPES.with(|types| {
		let types = types.borrow();
		PROJECT_DATA.with(|project_data| -> PrepareRenameResponse {
			let project_data = project_data.borrow();
			let uri = params.text_document.uri;
			let file = check_utf8(uri.to_file_path().expect("LSP only works on real filesystems"));
			let scope = project_data.asts.get(&file).unwrap();

			let position = params.position;

			let mut reference_visitor = RenameVisitor::new(&types);
			reference_visitor.visit_scope(scope);

			reference_visitor.prepare_rename(position)
		})
	})
}

#[cfg(test)]
mod tests {
	use crate::lsp::rename_prepare::*;
	use crate::lsp::sync::test_utils::*;

	/// Creates a snapshot test for a given wing program's rename_prepare at a given position
	/// In the wing program, place a comment "//^" into the text where the "^" is pointing to the desired character position
	/// To assert on the target range of the result, place a comment "//-" below the target, with additional "-" characters to extend the range
	///
	/// First parameter will be the name of the tests, as well as the identifier to use for the list of completion in the asserts (see last parameter)
	/// Second parameter is the wing code block as a string literal
	/// After the first two parameters, additional statements can optionally be provided to assert on the returned data.
	///
	/// Result is a PrepareRenameResponse
	macro_rules! test_rename_prepare {
		($name:ident, $code:literal) => {
			test_rename_prepare!($name, $code,);
		};
		($name:ident, $code:literal, $($assertion:stmt)*) => {
			#[test]
			fn $name() {
				// NOTE: this is needed for debugging to work regardless of where you run the test
				std::env::set_current_dir(env!("CARGO_MANIFEST_DIR")).unwrap();

				let text_document_position_params = load_file_with_contents($code);

				let $name = on_prepare_rename(TextDocumentPositionParams {
					text_document: text_document_position_params.text_document.clone(),
          position: text_document_position_params.position.clone(),
				});

      let ranges = get_ranges($code);

      match $name {
        PrepareRenameResponse::DefaultBehavior{default_behavior} => {
          assert_eq!(
            ranges.len(),
						0,
						"target_range did not match"
					);
          assert_eq!(
            default_behavior,
						false,
						"target_range did not match"
					);
        }
          PrepareRenameResponse::Range(range) => {
            assert_eq!(
              ranges[0],
              range,
              "target_range did not match"
            );
      }
      PrepareRenameResponse::RangeWithPlaceholder{range, ..} => {
        assert_eq!(
          ranges[0],
          range,
          "target_range did not match"
        );
  }
    }

				$($assertion)*
			}
		};
	}

	test_rename_prepare!(
		cant_rename_equal_sign,
		r#"
let thing = "thing";
let thing2 = thing;
         //^
		"#
	);

	test_rename_prepare!(
		cant_rename_let,
		r#"
let thing = "thing";
//^
let thing2 = thing;
		"#
	);

	test_rename_prepare!(
		cant_rename_str,
		r#"
let thing = "thing";
              //^
let thing2 = thing;
		"#
	);

	test_rename_prepare!(
		cant_rename_semicolon,
		r#"
let thing = "thing";
                 //^
let thing2 = thing;
		"#
	);
	//

	test_rename_prepare!(
		cant_rename_numbers,
		r#"
let var thing = 6;
              //^   
		"#
	);

	test_rename_prepare!(
		cant_rename_log,
		r#"
    log("hi!")
   //^
  
		"#
	);

	test_rename_prepare!(
		can_rename_symbol,
		r#"
    let var thing = 6;
    if (thing > 8) {
    thing = 6;

    } else {
    if (thing < 0) {
      let thing = 0;
      log(thing);
        //----^
    }
    log(thing)
    }
		"#
	);

	test_rename_prepare!(
		cant_rename_class_keyword,
		r#"
class User {
//^
  name: str;
}
		"#
	);

	test_rename_prepare!(
		cant_rename_for,
		r#"
    bring cloud;

    let buckets = [new cloud.Bucket()];
    for bucket in buckets {
  //^
      bucket.addObject("bucket","bucket");
      log(bucket.toString());
    }
		"#
	);

	test_rename_prepare!(
		cant_rename_in,
		r#"
    bring cloud;

    let buckets = [new cloud.Bucket()];
    for bucket in buckets {
              //^
      bucket.addObject("bucket","bucket");
      log(bucket.toString());
    }
		"#
	);

	test_rename_prepare!(
		can_rename_vars,
		r#"
    bring cloud;

    let buckets = [new cloud.Bucket()];
      //------^
		"#
	);

	// TODO: not supported yet - therefore disabled
	test_rename_prepare!(
		cant_rename_namespace,
		r#"
    bring cloud;
           //^
    let bucket = new cloud.Bucket();
		"#
	);

	// TODO: not supported yet - therefore disabled
	test_rename_prepare!(
		cant_rename_namespace_from_property,
		r#"
    bring cloud;
    let bucket = new cloud.Bucket();
                     //^
		"#
	);

	test_rename_prepare!(
		cant_rename_comments,
		r#"
    bring cloud;
    // let bucket = new cloud.Bucket();
          //^
		"#
	);

	test_rename_prepare!(
		cant_rename_tests,
		r#"
    test "this is a test" {
    //^ 
      assert(true);
    } 
		"#
	);

	// TODO: not supported yet- therefore disabled
	test_rename_prepare!(
		cant_rename_struct_key,
		r#"
    struct user {
      name: str;
      //^
    }
 
 let a: user = {name: "a"};
		"#
	);

	test_rename_prepare!(
		cant_rename_struct_keyword,
		r#"
    struct user {
    //^
      name: str;
    }
    
    let a: user = {name: "a"};
		"#
	);
	// TODO: not supported yet - therefore disabled
	test_rename_prepare!(
		cant_rename_interface_key,
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
		"#
	);

	test_rename_prepare!(
		cant_rename_interface_keyword,
		r#"
    interface ICat {
      //^
      inflight stepOnKeyboard(): str;
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
		"#
	);

	test_rename_prepare!(
		cant_rename_types,
		r#"
    let a: str = "hi";
          //^
    "#
	);

	test_rename_prepare!(
		cant_rename_json_val,
		r#"
    let j = {a: "hi"};
               //^
    "#
	);
}
