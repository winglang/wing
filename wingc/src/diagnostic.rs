use tree_sitter::Point;

pub type FileId = String;
pub type CharacterLocation = Point;
pub type ByteIndex = usize;
pub type Diagnostics = Vec<Diagnostic>;
pub type DiagnosticResult<T> = Result<T, Diagnostics>;

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
		write!(f, "{} - {} in {}", self.start, self.end, self.file_id)
	}
}

pub enum DiagnosticLevel {
	Error,
	Warning,
	Note,
}

pub struct Diagnostic {
	pub message: String,
	pub span: WingSpan,
	pub level: DiagnosticLevel,
}
