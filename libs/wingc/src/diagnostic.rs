use relative_path::RelativePathBuf;
use tree_sitter::Point;

pub type FileId = RelativePathBuf;
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
	pub span: WingSpan,
	pub level: DiagnosticLevel,
}

impl std::fmt::Display for Diagnostic {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		// TODO: implement a Display for DiagnosticLevel (instead of Debug formatting)
		write!(f, "{:?} at {}\n{}", self.level, self.span, self.message)
	}
}
