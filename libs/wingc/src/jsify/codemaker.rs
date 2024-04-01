use indexmap::IndexMap;
use parcel_sourcemap::{OriginalLocation, SourceMap};
use serde_json::json;

use crate::diagnostic::WingSpan;

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
	/// The line of code. Cannot contain any newlines
	pub line: String,
	/// Current indent level
	pub indent: IndentAmount,
	/// Mappings from character offset of this line text to the given source span
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

impl From<String> for CodeMaker {
	fn from(s: String) -> Self {
		string_to_code(s)
	}
}

impl From<&String> for CodeMaker {
	fn from(s: &String) -> Self {
		string_to_code(s)
	}
}

impl From<&str> for CodeMaker {
	fn from(s: &str) -> Self {
		string_to_code(s)
	}
}

impl From<Vec<CodeMaker>> for CodeMaker {
	fn from(v: Vec<CodeMaker>) -> Self {
		let mut code: CodeMaker = CodeMaker::default();
		for (idx, line) in v.into_iter().enumerate() {
			if idx > 0 {
				code.append(", ");
			}
			code.append(line);
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

		for line_data in new_code.lines.drain(..) {
			let mut mappings = line_data.mappings;

			if mappings.is_empty() {
				// if there are no existing mappings, use an existing
				if let Some(source) = &self.source {
					mappings = vec![(0, source.clone())]
				}
			};

			self.push_line(LineData {
				line: line_data.line,
				indent: line_data.indent + self.indent,
				mappings,
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
			// nothing to add
			return;
		}

		if self.lines.is_empty() {
			// we need at list one line to append to
			self.empty_line();
		}

		// we know there is at least one line
		let existing_last_line = self.lines.last_mut().expect("last line");

		// Get the first new line and add to to the last line of the current
		let mut new_first_line = new_code.lines.remove(0);
		existing_last_line.line.push_str(&new_first_line.line);

		// Add the mappings from the first line of the new code to the last line of the existing code
		for (offset, span) in new_first_line.mappings.drain(..) {
			existing_last_line
				.mappings
				.push((existing_last_line.line.len() - new_first_line.line.len() + offset, span));
		}

		// Add the remaining lines of the new code (with additional indent)
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
	}

	/// Generates a sourcemap for the given source and generated paths, based on the provided source content.
	///
	/// # Remarks
	///
	/// See sourcemap spec for more details: https://sourcemaps.info/spec.html
	///
	/// # Arguments
	///
	/// * `source_path` - Path to the source file, must be the source file reference in the mappings
	/// * `source_content` - Content of the source file
	/// * `generated_path` - Path to the generated (output) file
	///
	/// # Returns
	///
	/// A JSON string that represents the generated sourcemap.
	pub fn generate_sourcemap(&mut self, source_path: &str, source_content: &str, generated_path: &str) -> String {
		let mut sourcemap = SourceMap::new("");
		let source_num = sourcemap.add_source(source_path);

		sourcemap
			.set_source_content(source_num as usize, source_content)
			.expect("Set source content");

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

		sourcemap.write_vlq(&mut buffer).expect("write vlq");

		// Per sourcemap spec, the order of keys is important (version should be first)
		let mut json = IndexMap::new();

		json.insert("version", json!(3));
		json.insert("file", json!(generated_path));
		json.insert("sources", json!(vec![source_path]));
		json.insert("names", json!(sourcemap.get_names()));
		json.insert("mappings", json!(String::from_utf8(buffer).unwrap()));

		serde_json::ser::to_string(&json).expect("serialize sourcemap")
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
	use crate::diagnostic::WingLocation;

	use super::*;

	use indoc::indoc;
	use serde_json::Value;

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

	#[test]
	fn codemaker_append() {
		let mut code = CodeMaker::default();
		code.append("1");
		code.append("2");
		code.append("\n3");

		assert!(code.lines.len() == 2);
		assert_eq!(code.to_string(), "12\n3");
	}

	#[test]
	fn sourcemap_no_sources() {
		let mut code = CodeMaker::default();

		code.line("1");
		code.line("2");
		code.append("\n3");

		assert!(code.lines.len() == 3);
		assert_eq!(code.to_string(), "1\n2\n3");

		let sourcemap: Value =
			serde_json::from_str(&code.generate_sourcemap("test.w", "1\n2\n3", "test.js")).expect("sourcemap");

		// "A" just means the line comes from somewhere in the provided source root
		assert_eq!(sourcemap["mappings"], "A;A;A");
	}

	#[test]
	fn sourcemap_default() {
		let base_span = WingSpan {
			file_id: "test.w".to_string(),
			start: WingLocation { line: 2, col: 4 },
			end: WingLocation { line: 2, col: 8 },
			start_offset: 0,
			end_offset: 0,
		};
		let mut code = CodeMaker::with_source(&base_span);
		code.line("1");
		code.line("2");

		// this line will not inherit the base source
		code.line(CodeMaker::one_line("3"));

		let next_span = WingSpan {
			start: WingLocation { line: 5, col: 10 },
			end: WingLocation { line: 5, col: 20 },
			..base_span
		};
		code.line(new_code!(next_span, "4"));

		assert!(code.lines.len() == 4);
		assert_eq!(code.to_string(), "1\n2\n3\n4");
		let sourcemap: Value =
			serde_json::from_str(&code.generate_sourcemap("test.w", "1\n2\n3", "test.js")).expect("sourcemap");

		assert_eq!(sourcemap["version"], 3);
		assert_eq!(sourcemap["file"], "test.js");
		assert_eq!(sourcemap["sources"], json!(["test.w"]));
		assert_eq!(sourcemap["names"], json!([]));

		// Useful tool to validate vlq https://www.murzwin.com/base64vlq.html
		assert_eq!(sourcemap["mappings"], "AAEI;AAAA;AAAA;AAGM");
	}

	#[test]
	fn sourcemap_multi_span_line() {
		let base_span = WingSpan {
			file_id: "test.w".to_string(),
			start: WingLocation { line: 2, col: 4 },
			end: WingLocation { line: 2, col: 8 },
			start_offset: 0,
			end_offset: 0,
		};
		let mut code = CodeMaker::with_source(&base_span);
		code.line("1");

		let next_span = WingSpan {
			start: WingLocation { line: 5, col: 10 },
			end: WingLocation { line: 5, col: 20 },
			..base_span
		};
		code.append(new_code!(next_span, "2"));
		code.append("3");
		code.line("4");

		assert!(code.lines.len() == 2);
		assert_eq!(code.to_string(), "123\n4");
		let sourcemap: Value = serde_json::from_str(&code.generate_sourcemap("", "", "")).expect("sourcemap");

		assert_eq!(sourcemap["mappings"], "AAEI,CAGM;AAHN");
	}
}
