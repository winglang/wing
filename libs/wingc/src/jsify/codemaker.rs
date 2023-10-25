use indexmap::IndexMap;
use parcel_sourcemap::{OriginalLocation, SourceMap};
use serde_json::json;

use crate::diagnostic::WingSpan;

/// A helper for generating code snippets with indentation.
///
/// TODO: add `open_block` or `close_block` methods that automatically add
/// `{` and `}`?
#[derive(Default)]
pub struct CodeMaker {
	lines: Vec<LineData>,
	indent: IndentAmount,
}

pub type IndentAmount = usize;
pub type CharacterOffset = usize;

pub struct LineData {
	pub line: String,
	pub indent: IndentAmount,
	pub mappings: Option<Vec<(CharacterOffset, WingSpan)>>,
}

impl Into<LineData> for String {
	fn into(self) -> LineData {
		LineData {
			line: self,
			indent: 0,
			mappings: None,
		}
	}
}

impl Into<LineData> for &String {
	fn into(self) -> LineData {
		LineData {
			line: self.to_owned(),
			indent: 0,
			mappings: None,
		}
	}
}

impl Into<LineData> for &str {
	fn into(self) -> LineData {
		LineData {
			line: self.to_string(),
			indent: 0,
			mappings: None,
		}
	}
}

impl Into<LineData> for (String, WingSpan) {
	fn into(self) -> LineData {
		LineData {
			line: self.0,
			indent: 0,
			mappings: Some(vec![(0, self.1)]),
		}
	}
}

impl CodeMaker {
	/// Emits a line of code and then increases the indent by one.
	pub fn open<S: Into<LineData>>(&mut self, line: S) {
		self.line(line);
		self.indent += 1;
	}

	/// Decreases the indent by one and then emits a line of code.
	pub fn close<S: Into<LineData>>(&mut self, line: S) {
		self.indent -= 1;
		self.line(line);
	}

	/// Emits a line of code with the current indent.
	pub fn line<S: Into<LineData>>(&mut self, line: S) {
		let line_data: LineData = line.into();

		// remove trailing newline
		let line_text = line_data.line.strip_suffix("\n").unwrap_or(&line_data.line);

		// if the line has newlines in it, consider each line separately
		for subline in line_text.split('\n') {
			self.push_line(LineData {
				indent: self.indent,
				line: subline.into(),
				mappings: None,
			});
		}
	}

	/// Emits an empty line.
	pub fn empty_line(&mut self) {
		self.line("");
	}

	/// Emits multiple lines of code starting with the current indent.
	pub fn add_code(&mut self, code: CodeMaker) {
		assert_eq!(code.indent, 0, "Cannot add code with indent");
		for line_data in code.lines {
			self.push_line(line_data);
		}
	}

	/// Decreases the current indent by one.
	#[allow(dead_code)]
	pub fn unindent(&mut self) {
		self.indent -= 1;
	}

	/// Increases the current indent by one.
	pub fn indent(&mut self) {
		self.indent += 1;
	}

	pub fn one_line<S: Into<LineData>>(s: S) -> CodeMaker {
		let mut code = CodeMaker::default();
		code.line(s);
		code
	}

	/// Checks if there are no lines of code
	pub fn is_empty(&self) -> bool {
		self.lines.is_empty()
	}

	fn push_line(&mut self, line: LineData) {
		self.lines.push(line);
		// if let Some(ref mut sourcemap) = self.source_map {
		// 	let generated_line = self.lines.len() as u32;
		// 	let generated_column = self.lines.last().unwrap().1.len() as u32;
		// 	let original = if let Some(original_span) = &self.original_span_stack.last() {
		// 		Some(OriginalLocation::new(
		// 			original_span.start.line,
		// 			original_span.start.col,
		// 			0,
		// 			None,
		// 		))
		// 	} else {
		// 		None
		// 	};
		// 	sourcemap.add_mapping(generated_line, generated_column, original);
		// }
	}

	pub fn get_sourcemap(&mut self, root: &str, source_content: &str, generated_path: &str) -> String {
		let mut sourcemap = SourceMap::new("");
		let source_num = sourcemap.add_source(root);
		sourcemap.set_source_content(source_num as usize, source_content);

		for (line_idx, line) in self.lines.iter().enumerate() {
			let generated_line = line_idx as u32;
			let generated_column = 0;
			if let Some(mappings) = &line.mappings {
				for mapping in mappings {
					let original = OriginalLocation::new(mapping.1.start.line, mapping.1.start.col, 0, None);
					sourcemap.add_mapping(generated_line, mapping.0 as u32, Some(original));
				}
			} else {
				sourcemap.add_mapping(generated_line, generated_column, None);
			}
		}

		let mut buffer: Vec<u8> = vec![];

		sourcemap.write_vlq(&mut buffer);

		let mut json = IndexMap::new();

		json.insert("version", json!(3));
		json.insert("file", json!(generated_path));
		json.insert("sourceRoot", json!(""));
		json.insert("sources", json!(vec![root]));
		json.insert("sourcesContent", json!(sourcemap.get_sources_content()));
		json.insert("names", json!(sourcemap.get_names()));
		json.insert("mappings", json!(String::from_utf8(buffer).unwrap()));

		let json_string = serde_json::ser::to_string(&json).unwrap();

		json_string
	}
}

impl ToString for CodeMaker {
	fn to_string(&self) -> String {
		let mut code = String::new();
		for line_data in &self.lines {
			code.push_str(&"  ".repeat(line_data.indent));
			code.push_str(&line_data.line);
			code.push_str("\n");
		}
		code
	}
}

#[cfg(test)]
mod tests {
	use super::*;

	use indoc::indoc;

	#[test]
	fn codemaker_basic() {
		let mut code = CodeMaker::default();
		code.line("let a = 1;");
		code.open("if (a === 1) {");
		code.line("console.log('a is 1');");
		code.close("}");
		code.line("let b = 2;");
		code.indent();
		code.line("let c = 3;");
		code.unindent();
		code.line("let d = 4;");
		assert_eq!(
			code.to_string(),
			indoc! {r#"
				let a = 1;
				if (a === 1) {
				  console.log('a is 1');
				}
				let b = 2;
				  let c = 3;
				let d = 4;
			"#}
		);
	}

	#[test]
	fn codemaker_add_code() {
		let mut code1 = CodeMaker::default();
		code1.line("let a = 1;");
		code1.line("let b = 2;");
		let mut code2 = CodeMaker::default();
		code2.open("{");
		code2.add_code(code1);
		code2.close("}");
		assert_eq!(
			code2.to_string(),
			indoc! {r#"
			{
			  let a = 1;
			  let b = 2;
			}
		"#}
		);
	}

	#[test]
	fn codemaker_line_with_newlines() {
		let mut code = CodeMaker::default();
		code.open("<");
		code.line("hello\nworld");
		code.close(">");
		assert_eq!(
			code.to_string(),
			indoc! {r#"
				<
				  hello
				  world
				>
			"#}
		);
	}
}
