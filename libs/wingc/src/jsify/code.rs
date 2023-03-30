#[derive(Default)]
pub struct CodeMaker {
	lines: Vec<(usize, String)>,
	indent: usize,
}

impl CodeMaker {
	pub fn open<S: Into<String>>(&mut self, line: S) {
		self.line(line);
		self.indent += 1;
	}

	pub fn close<S: Into<String>>(&mut self, line: S) {
		self.indent -= 1;
		self.line(line);
	}

	pub fn line<S: Into<String>>(&mut self, line: S) {
		self.lines.push((self.indent, line.into()));
	}

	pub fn add_lines<S: Into<String>>(&mut self, lines: Vec<S>) {
		for line in lines {
			self.line(line);
		}
	}

	#[allow(dead_code)]
	pub fn add_code(&mut self, code: CodeMaker) {
		assert_eq!(code.indent, 0, "Cannot add code with indent");
		for (indent, line) in code.lines {
			self.lines.push((indent + self.indent, line));
		}
	}

	#[allow(dead_code)]
	pub fn unindent(&mut self) {
		self.indent -= 1;
	}

	#[allow(dead_code)]
	pub fn indent(&mut self) {
		self.indent += 1;
	}
}

impl ToString for CodeMaker {
	fn to_string(&self) -> String {
		let mut code = String::new();
		for (indent, line) in &self.lines {
			code.push_str(&"\t".repeat(*indent));
			code.push_str(&line);
			code.push_str(&"\n");
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
	fn codemaker_add_lines() {
		let mut code = CodeMaker::default();
		code.open("{");
		code.add_lines(vec!["let a = 1;", "let b = 2;"]);
		code.close("}");
		assert_eq!(
			code.to_string(),
			indoc! {r#"
			{
				let a = 1;
				let b = 2;
			}
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
}
