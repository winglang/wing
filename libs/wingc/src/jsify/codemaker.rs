use indexmap::IndexMap;
use parcel_sourcemap::{OriginalLocation, SourceMap};
use serde_json::json;

use crate::diagnostic::WingSpan;

macro_rules! codes {
	($base:ident, $($arg:expr),*) => {
		{
			$($base.append($arg);)*
		}
	};
}

macro_rules! new_code {
	($source:expr, $($arg:expr),*) => {
		{
			let mut base = CodeMaker::with_source($source);
			$(base.append($arg);)*
			base
		}
	};
}

/// A helper for generating code snippets with indentation.
///
/// TODO: add `open_block` or `close_block` methods that automatically add
/// `{` and `}`?
#[derive(Default, Clone, Debug)]
pub struct CodeMaker {
	lines: Vec<LineData>,
	indent: IndentAmount,
	source: Option<WingSpan>,
}

pub type IndentAmount = usize;
pub type CharacterOffset = usize;

#[derive(Default, Clone, Debug)]
pub struct LineData {
	pub line: String,
	pub indent: IndentAmount,
	pub mappings: Vec<(CharacterOffset, WingSpan)>,
}

/// Converts stringable data into a codemaker
/// This handles splitting newlines
fn string_to_code<S: Into<String>>(s: S) -> CodeMaker {
	let text: String = s.into();
	let mut code = CodeMaker::default();

	// remove trailing newline
	let line_text = text.strip_suffix("\n").unwrap_or(&text);

	// if the line has newlines in it, consider each line separately
	for subline in line_text.split('\n') {
		code.push_line(LineData {
			line: subline.to_string(),
			indent: 0,
			mappings: vec![],
		});
	}

	code
}

impl Into<CodeMaker> for String {
	fn into(self) -> CodeMaker {
		string_to_code(self)
	}
}

impl Into<CodeMaker> for &String {
	fn into(self) -> CodeMaker {
		string_to_code(self)
	}
}

impl Into<CodeMaker> for &str {
	fn into(self) -> CodeMaker {
		string_to_code(self)
	}
}

impl Into<CodeMaker> for Vec<CodeMaker> {
	fn into(self) -> CodeMaker {
		let mut code: CodeMaker = CodeMaker::default();
		for (idx, line) in self.iter().enumerate() {
			if idx > 0 {
				code.append(", ");
			}
			// TODO BAD CLONE
			code.append(line.clone());
		}
		code
	}
}

impl CodeMaker {
	pub fn with_source<S: Into<WingSpan>>(source: S) -> Self {
		Self {
			source: Some(source.into()),
			indent: 0,
			lines: vec![],
		}
	}

	/// Emits a line of code and then increases the indent by one.
	pub fn open<S: Into<CodeMaker>>(&mut self, line: S) {
		self.line(line);
		self.indent += 1;
	}

	/// Decreases the indent by one and then emits a line of code.
	pub fn close<S: Into<CodeMaker>>(&mut self, line: S) {
		self.indent -= 1;
		self.line(line);
	}

	/// Emits a line of code with the current indent.
	pub fn line<S: Into<CodeMaker>>(&mut self, line: S) {
		let mut new_code: CodeMaker = line.into();

		for mut line_data in new_code.lines.drain(..) {
			line_data.indent += self.indent;
			if line_data.mappings.is_empty() {
				if let Some(source) = self.source.as_ref() {
					line_data.mappings.push((0, source.clone()))
				}
			}
			self.push_line(line_data.clone());
		}
	}

	/// Emits an empty line.
	pub fn empty_line(&mut self) {
		self.line("");
	}

	/// Emits multiple lines of code starting with the current indent.
	pub fn add_code(&mut self, code: CodeMaker) {
		assert_eq!(code.indent, 0, "Cannot add code with indent");
		for mut line_data in code.lines {
			line_data.indent += self.indent;
			self.push_line(line_data);
		}
	}

	/// Emits code starting on the current line, mutating it if needed.
	/// Note this mutates the given code.
	pub fn append<S: Into<CodeMaker>>(&mut self, line: S) {
		let mut new_code: CodeMaker = line.into();
		if new_code.is_empty() {
			return;
		}

		if self.lines.is_empty() {
			self.empty_line();
		}

		if let Some(last_line) = self.lines.last_mut() {
			let mut first_new_line = new_code.lines.remove(0);
			last_line.line.push_str(&first_new_line.line);

			let last_original_mapping = last_line.mappings.last().cloned();
			let add_another_map = !first_new_line.mappings.is_empty();

			for (offset, span) in first_new_line.mappings.drain(..) {
				last_line
					.mappings
					.push((last_line.line.len() - first_new_line.line.len() + offset, span));
			}

			if add_another_map {
				if let Some(last_original_mapping) = last_original_mapping {
					last_line
						.mappings
						.push((last_line.line.len(), last_original_mapping.1.clone()));
				}
			}
		}

		for mut line_data in new_code.lines {
			line_data.indent += self.indent;
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

	pub fn one_line<S: Into<String>>(s: S) -> CodeMaker {
		let mut code = CodeMaker::default();
		code.line(s.into());
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

		// TODO
		let _ = sourcemap.set_source_content(source_num as usize, source_content);

		for (line_idx, line) in self.lines.iter().enumerate() {
			let generated_line = line_idx as u32;
			let generated_column = 0;
			if !line.mappings.is_empty() {
				for mapping in &line.mappings {
					let original = OriginalLocation::new(mapping.1.start.line, mapping.1.start.col, 0, None);
					sourcemap.add_mapping(generated_line, mapping.0 as u32, Some(original));
				}
			} else {
				sourcemap.add_mapping(generated_line, generated_column, None);
			}
		}

		let mut buffer: Vec<u8> = vec![];

		// TODO
		let _ = sourcemap.write_vlq(&mut buffer);

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
		for (idx, line_data) in self.lines.iter().enumerate() {
			if idx > 0 {
				code.push('\n');
			}
			code.push_str(&"  ".repeat(line_data.indent));
			code.push_str(&line_data.line);
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
				let d = 4;"#}
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
			}"#}
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
				>"#}
		);
	}
}
