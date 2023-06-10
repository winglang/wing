use lazy_static::__Deref;
use lsp_types::{Hover, HoverContents, MarkupContent, MarkupKind, Position};

use crate::ast::{Reference, Scope, Stmt, Symbol, TypeAnnotation, TypeAnnotationKind};
use crate::diagnostic::WingSpan;
use crate::docs::Documented;
use crate::lsp::sync::FILES;
use crate::type_check::symbol_env::LookupResult;
use crate::type_check::Types;
use crate::visit::{self, Visit};
use crate::wasm_util::WASM_RETURN_ERROR;
use crate::wasm_util::{ptr_to_string, string_to_combined_ptr};

pub struct HoverVisitor<'a> {
	position: Position,
	types: &'a Types,
	current_scope: &'a Scope,
	current_statement_index: usize,
	found: Option<(WingSpan, String)>,
}

impl<'a> HoverVisitor<'a> {
	pub fn new(position: Position, scope: &'a Scope, types: &'a Types) -> Self {
		Self {
			types,
			position,
			current_scope: scope,
			current_statement_index: 0,
			found: None,
		}
	}

	pub fn visit(&mut self) -> Option<(WingSpan, String)> {
		self.visit_scope(self.current_scope);
		self.found.clone()
	}

	/// Try to look up a full path of a symbol in the current scope and if found, render the docs
	/// associated with the symbol kind. Returns `None` if not found.
	fn lookup_docs(&mut self, nested_str: &str, property: Option<&Symbol>) -> Option<String> {
		let b = self.current_scope.env.borrow();

		let Some(env) = b.deref() else {
			return None;
		};

		let result = env.lookup_nested_str(nested_str, Some(self.current_statement_index));

		if let LookupResult::Found(s, _) = result {
			// if `property` is also specified, then continue to lookup within the found type
			if let Some(p) = property {
				if let Some(b) = s.as_type() {
					if let Some(x) = b.as_class() {
						if let Some(k) = x.env.lookup(&p, None) {
							return Some(k.render_docs());
						}
					}
				}
			}

			return Some(s.render_docs());
		}

		None
	}
}

impl<'a> Visit<'a> for HoverVisitor<'a> {
	fn visit_stmt(&mut self, node: &'a Stmt) {
		if self.found.is_some() {
			return;
		}

		self.current_statement_index = node.idx;
		visit::visit_stmt(self, node);
	}

	fn visit_scope(&mut self, node: &'a Scope) {
		if self.found.is_some() {
			return;
		}

		self.current_scope = node;
		visit::visit_scope(self, node);
	}

	fn visit_type_annotation(&mut self, node: &'a TypeAnnotation) {
		if self.found.is_some() {
			return;
		}

		if let TypeAnnotationKind::UserDefined(t) = &node.kind {
			if t.span.contains(&self.position) {
				if let Some(docs) = self.lookup_docs(&t.full_path_str(), None) {
					self.found = Some((node.span.clone(), docs));
				}
			}
		}

		visit::visit_type_annotation(self, node);
	}

	fn visit_symbol(&mut self, node: &'a Symbol) {
		if self.found.is_some() {
			return;
		}

		if node.span.contains(&self.position) {
			if let Some(docs) = self.lookup_docs(&node.name, None) {
				self.found = Some((node.span.clone(), docs));
			}
		}

		visit::visit_symbol(self, node);
	}

	fn visit_reference(&mut self, node: &'a Reference) {
		if self.found.is_some() {
			return;
		}

		if let Reference::InstanceMember { object, property, .. } = node {
			if let Some(obj_type) = self.types.get_expr_type(object) {
				if object.span.contains(&self.position) {
					let docs = obj_type.render_docs();
					self.found = Some((object.span.clone(), docs));
				} else if property.span.contains(&self.position) {
					if let Some(c) = obj_type.as_class() {
						if let Some(v) = c.env.lookup(property, None) {
							let docs = v.render_docs();
							self.found = Some((property.span.clone(), docs));
						}
					}
				}
			}
		}

		if let Reference::TypeMember { type_, property } = node {
			if property.span.contains(&self.position) {
				// lookup type in environment
				if let Some(docs) = self.lookup_docs(&type_.full_path_str(), Some(property)) {
					self.found = Some((property.span.clone(), docs));
				}
			}
		}

		visit::visit_reference(self, node);
	}
}

#[no_mangle]
pub unsafe extern "C" fn wingc_on_hover(ptr: u32, len: u32) -> u64 {
	let parse_string = ptr_to_string(ptr, len);
	if let Ok(parsed) = serde_json::from_str(&parse_string) {
		if let Some(token_result) = on_hover(parsed) {
			let result = serde_json::to_string(&token_result).expect("Failed to serialize Hover response");

			string_to_combined_ptr(result)
		} else {
			WASM_RETURN_ERROR
		}
	} else {
		eprintln!("Failed to parse 'onHover' text document: {}", parse_string);
		WASM_RETURN_ERROR
	}
}
pub fn on_hover(params: lsp_types::HoverParams) -> Option<Hover> {
	FILES.with(|files| {
		let files = files.borrow();
		let file_data = files.get(&params.text_document_position_params.text_document.uri.clone());
		let file_data = file_data.expect(
			format!(
				"Compiled data not found for \"{}\"",
				params.text_document_position_params.text_document.uri
			)
			.as_str(),
		);

		let root_scope = &file_data.scope;

		let mut hover_visitor = HoverVisitor::new(
			params.text_document_position_params.position,
			&root_scope,
			&file_data.types,
		);
		if let Some((span, docs)) = hover_visitor.visit() {
			Some(Hover {
				contents: HoverContents::Markup(MarkupContent {
					kind: MarkupKind::Markdown,
					value: docs,
				}),
				range: Some(span.clone().into()),
			})
		} else {
			None
		}
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
		($name:ident, $code:literal, $($assertion:stmt)*) => {
			#[test]
			fn $name() {
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
     //^"#,
	);

	test_hover_list!(
		new_expression_nested,
		r#"
bring cloud;

new cloud. 
   //^"#,
	);

	test_hover_list!(
		class_symbol,
		r#"
bring cloud;

let bucket = new cloud.Bucket();
   //^"#,
	);

	test_hover_list!(
		class_symbol_in_closure,
		r#"
bring cloud;

let bucket = new cloud.Bucket();
   //^"#,
	);

	test_hover_list!(
		class_property,
		r#"
bring cloud;

let bucket = new cloud.Bucket();
bucket.addObject
      //^"#,
	);

	test_hover_list!(
		static_stdtype_method,
		r#"
Json.stringify(123);
      //^"#,
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
		   		 		//^"#,
	);

	test_hover_list!(
		user_defined_types,
		r#"
		class Foo { };
		   	 //^"#,
	);

	test_hover_list!(
		static_method,
		r#"
		class Foo {
			static my(): str { return "str"; }
		}

		new Foo();
       //^"#,
	);
}
