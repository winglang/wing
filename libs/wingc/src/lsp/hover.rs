use crate::docs::Documented;
use crate::lsp::sync::PROJECT_DATA;
use crate::type_check::symbol_env::LookupResult;
use crate::visit::Visit;
use crate::wasm_util::extern_json_fn;
use lsp_types::{Hover, HoverContents, MarkupContent, MarkupKind};

use super::symbol_locator::{SymbolLocator, SymbolLocatorResult};
use super::sync::{check_utf8, WING_TYPES};

#[no_mangle]
pub unsafe extern "C" fn wingc_on_hover(ptr: u32, len: u32) -> u64 {
	extern_json_fn(ptr, len, on_hover)
}
pub fn on_hover(params: lsp_types::HoverParams) -> Option<Hover> {
	WING_TYPES.with(|types| {
		let types = types.borrow_mut();
		PROJECT_DATA.with(|project_data| {
			let project_data = project_data.borrow();
			let uri = params.text_document_position_params.text_document.uri.clone();
			let file = check_utf8(uri.to_file_path().expect("LSP only works on real filesystems"));
			let ast = project_data.asts.get(&file).unwrap();
			let root_scope = ast.root();

			let mut symbol_finder = SymbolLocator::new(ast, &types, params.text_document_position_params.position.into());
			symbol_finder.visit_scope(root_scope);

			if let Some(lookup) = symbol_finder.lookup_located_symbol() {
				if let LookupResult::Found(symbol_info, ..) = &lookup {
					let docs = symbol_info.render_docs();
					let span = symbol_finder.located_span()?;
					return Some(Hover {
						contents: HoverContents::Markup(MarkupContent {
							kind: MarkupKind::Markdown,
							value: docs,
						}),
						range: Some(span.into()),
					});
				}
			} else {
				if let SymbolLocatorResult::LooseField { field_type, field, .. } = &symbol_finder.result {
					let span = symbol_finder.located_span().unwrap();
					let value = format!("```wing\n{}: {field_type}\n```", field.name);

					return Some(Hover {
						contents: HoverContents::Markup(MarkupContent {
							kind: MarkupKind::Markdown,
							value,
						}),
						range: Some(span.into()),
					});
				}
			}

			None
		})
	})
}

#[cfg(test)]
mod tests {
	use crate::lsp::hover::*;
	use crate::lsp::sync::test_utils::*;
	use lsp_types::*;

	/// Creates a snapshot test for a given wing program's hover at a given position
	/// In the wing program, place a comment "//^" into the text where the "^" is pointing to the desired character position
	///
	/// First parameter will be the name of the tests, as well as the identifier to use for the list of completion in the asserts (see last parameter)
	/// Second parameter is the wing code block as a string literal
	/// After the first two parameters, any additional are optional statements that should be used for asserting on the given hover data.
	///
	/// Result is a [Hover] object
	macro_rules! test_hover_list {
		($name:ident, $code:literal) => {
			test_hover_list!($name, $code,);
		};
		($name:ident, $code:literal, $($assertion:stmt)*) => {
			#[test]
			fn $name() {
				// NOTE: this is needed for debugging to work regardless of where you run the test
				std::env::set_current_dir(env!("CARGO_MANIFEST_DIR")).unwrap();

				let text_document_position_params = load_file_with_contents($code);
				let hover = on_hover(HoverParams {
					text_document_position_params,
					work_done_progress_params: Default::default(),
				});

				if let Some($name) = hover {
					insta::with_settings!(
						{
							prepend_module_to_snapshot => false,
							omit_expression => true,
							snapshot_path => "./snapshots/hovers",
						}, {
							insta::assert_yaml_snapshot!($name);
						}
					);
					$($assertion)*
				} else {
					panic!("Expected hover data");
				}
			}
		};
	}

	test_hover_list!(
		just_variable,
		r#"
		let myString = "hello";
        //^
		"#,
	);

	test_hover_list!(
		new_expression_nested,
		r#"
bring cloud;
new cloud. 
		//^
"#,
	);

	test_hover_list!(
		class_symbol,
		r#"
		bring cloud;

		let bucket = new cloud.Bucket();
        //^
"#,
	);

	test_hover_list!(
		class_symbol_in_closure,
		r#"
inflight class MyClass { }

inflight () => {
  let myClass = new MyClass();
    //^

}
"#,
	);

	test_hover_list!(
		class_property,
		r#"
bring cloud;

let bucket = new cloud.Bucket();
bucket.addObject
      //^
"#,
	);

	test_hover_list!(
		static_stdtype_method,
		r#"
Json.stringify(123);
      //^
"#,
	);

	test_hover_list!(
		inside_inflight_test,
		r#"
test "hello" {
  let a = 1;
    //^
}
"#,
	);

	test_hover_list!(
		inside_class_method,
		r#"
class Foo {
  bar() {
    let hello = 1;
        //^
  }
}
"#,
	);

	test_hover_list!(
		inside_class_field,
		r#"
bring cloud;
class Foo {
  my_bucket: cloud.Bucket;
    //^
}
"#,
	);

	test_hover_list!(
		new_statement,
		r#"
bring cloud;
new cloud.Bucket();
          //^
"#
	);

	test_hover_list!(
		user_defined_types,
		r#"
class Foo { }
     //^
"#
	);

	test_hover_list!(
		user_defined_type_annotation,
		r#"
class Foo { }
let a: Foo = new Foo();
      //^
"#
	);

	test_hover_list!(
		user_defined_type_reference_property,
		r#"
class Foo { 
	static static_method() { }
}
Foo.static_method();
   //^
"#
	);

	test_hover_list!(
		user_defined_type_reference_type,
		r#"
class Foo { 
	static static_method() { }
}
Foo.static_method();
//^
"#
	);

	test_hover_list!(
		static_method,
		r#"
class Foo {
  static my(a: str, b: bool): str { return "str"; }
}

Foo.my();
  //^
"#
	);

	test_hover_list!(
		builtin_in_preflight,
		r#"
assert(true);
//^
"#
	);

	test_hover_list!(
		builtin_in_inflight,
		r#"
class Foo {
  inflight bar() {
    assert(true);
    //^
  }
}
"#
	);

	test_hover_list!(
		test_bring_sdk,
		r#"
bring cloud;
      //^
"#
	);

	test_hover_list!(
		test_var,
		r#"
let var xoo = "hello";
log(xoo);
    //^
"#
	);

	test_hover_list!(
		test_var_inside_preflight_closure,
		r#"
() => {
  let var goooo = "gar";
          //^
}"#
	);

	test_hover_list!(
		test_var_inside_inflight_closure,
		r#"
inflight () => {
  let var goooo = "gar";
          //^
}"#
	);

	test_hover_list!(
		test_builtin_instance_method,
		r#"
"hello".startsWith("h");
           //^
"#
	);

	test_hover_list!(
		multipart_reference_hover_middle,
		r#"
let j = Json {};
j.get("hello").get("world");
 //^
"#
	);

	test_hover_list!(
		map_element,
		r#"
let k = "hi";
{ k => "" }
//^
"#
	);

	test_hover_list!(
		json_element,
		r#"
{ hi: "cool" }
 //^
"#
	);

	test_hover_list!(
		json_element_nested_top,
		r#"
{ hi: { inner: [1, 2, 3] } }
 //^
"#
	);

	test_hover_list!(
		json_element_nested_inner,
		r#"
{ hi: { inner: [1, 2, 3] } }
        //^
"#
	);

	test_hover_list!(
		inflight_init,
		r#"
struct Data {
	field: str;
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

	test_hover_list!(
		class_init_this_field,
		r#"
class T {
  stuff: num;

  new() {
    this.stuff = 1;
         //^
  }
}
"#
	);

	test_hover_list!(
		struct_decl_field,
		r#"
struct S {
  field: str;
  //^
}
"#
	);

	test_hover_list!(
		static_method_root,
		r#"
Json.stringify({});
//^
"#
	);
}
