use tree_sitter::Point;

pub type FileId = String;
pub type CharacterLocation = Point;
pub type ByteIndex = usize;
pub type Diagnostics = Vec<Diagnostic>;
pub type DiagnosticResult<T> = Result<T, ()>;

#[derive(Debug, PartialEq, Eq, Hash, Clone)]
pub struct WingSpan {
	pub start: CharacterLocation,
	pub end: CharacterLocation,
	pub start_byte: ByteIndex,
	pub end_byte: ByteIndex,
	pub file_id: FileId,
}

impl std::fmt::Display for WingSpan {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		// check if default
		if self.file_id.is_empty()
			&& self.start.row == 0
			&& self.start.column == 0
			&& self.end.row == 0
			&& self.end.column == 0
		{
			return write!(f, "");
		}

		write!(f, "{}:{}:{}", self.file_id, self.start.row + 1, self.start.column + 1)
	}
}

#[derive(Debug, Clone)]
pub enum DiagnosticLevel {
	Error,
	Warning,
	Note,
}

#[derive(Debug, Clone)]
pub struct Diagnostic {
	pub message: String,
	pub span: Option<WingSpan>,
	pub level: DiagnosticLevel,
}

impl std::fmt::Display for Diagnostic {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		// TODO: implement a Display for DiagnosticLevel (instead of Debug formatting)
		if let Some(span) = &self.span {
			write!(f, "{:?} at {} | {}", self.level, span, self.message)
		} else {
			write!(f, "{:?} | {}", self.level, self.message)
		}
	}
}

// print list of diagnostics
pub fn print_diagnostics(diagnostics: &Diagnostics) {
	for diagnostic in diagnostics {
		println!("{}", diagnostic);
	}
}
