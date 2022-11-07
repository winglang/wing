use tree_sitter::Point;

use crate::debug;

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
		write!(f, "{}:{}:{}", self.file_id, self.start.row + 1, self.start.column + 1)
	}
}

impl Ord for WingSpan {
	fn cmp(&self, other: &Self) -> std::cmp::Ordering {
		if self.file_id == other.file_id {
			let start_ord = self.start.cmp(&other.start);
			if start_ord == std::cmp::Ordering::Equal {
				self.end.cmp(&other.end)
			} else {
				start_ord
			}
		} else {
			self.file_id.cmp(&other.file_id)
		}
	}
}

impl PartialOrd for WingSpan {
	fn partial_cmp(&self, other: &Self) -> Option<std::cmp::Ordering> {
		if self.file_id == other.file_id {
			let start_ord = self.start.partial_cmp(&other.start);
			if start_ord == Some(std::cmp::Ordering::Equal) {
				self.end.partial_cmp(&other.end)
			} else {
				start_ord
			}
		} else {
			self.file_id.partial_cmp(&other.file_id)
		}
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

pub fn print_diagnostics(diagnostics: &Diagnostics) {
	for diagnostic in diagnostics {
		debug!("{}", diagnostic);
	}
}

pub struct TypeError {
	pub message: String,
	pub span: WingSpan,
}

impl std::fmt::Display for TypeError {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		write!(f, "{} at {}", self.message, self.span)
	}
}
