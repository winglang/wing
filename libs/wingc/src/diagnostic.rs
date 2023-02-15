use lsp_types::Position;
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

impl WingSpan {
	pub fn global() -> Self {
		Self {
			start: Point { row: 0, column: 0 },
			end: Point { row: 0, column: 0 },
			start_byte: 0,
			end_byte: 0,
			file_id: String::from(""),
		}
	}

	pub fn contains(self: &Self, position: &Position) -> bool {
		let pos_line = position.line as usize;
		let pos_char = position.character as usize;
		let start = self.start;
		let end = self.end;

		if pos_line >= start.row && pos_line <= end.row {
			if start.row == end.row && pos_line == start.row {
				pos_char >= start.column && pos_char <= end.column
			} else if pos_line == start.row {
				pos_char >= start.column
			} else if pos_line == end.row {
				pos_char <= end.column
			} else {
				true
			}
		} else {
			false
		}
	}
}

impl std::fmt::Display for WingSpan {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		write!(f, "{}:{}:{}", self.file_id, self.start.row + 1, self.start.column + 1)
	}
}

impl Ord for WingSpan {
	fn cmp(&self, other: &Self) -> std::cmp::Ordering {
		self
			.file_id
			.cmp(&other.file_id)
			.then(self.start.cmp(&other.start))
			.then(self.end.cmp(&other.end))
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

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum DiagnosticLevel {
	Error,
	Warning,
	Note,
}

#[derive(Debug, Clone, PartialEq, Eq)]
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

impl Ord for Diagnostic {
	fn cmp(&self, other: &Self) -> std::cmp::Ordering {
		self.span.cmp(&other.span)
	}
}

impl PartialOrd for Diagnostic {
	fn partial_cmp(&self, other: &Self) -> Option<std::cmp::Ordering> {
		self.span.partial_cmp(&other.span)
	}
}

pub fn print_diagnostics(diagnostics: &Diagnostics) {
	for diagnostic in diagnostics {
		debug!("{}", diagnostic);
	}
}

#[derive(Debug)]
pub struct TypeError {
	pub message: String,
	pub span: WingSpan,
}

impl std::fmt::Display for TypeError {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		write!(f, "{} at {}", self.message, self.span)
	}
}
