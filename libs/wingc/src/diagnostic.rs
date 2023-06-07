use colored::Colorize;
use std::{cell::RefCell, fmt::Display};
use tree_sitter::Point;

use lsp_types::{Position, Range};

use serde::Serialize;

pub type FileId = String;
type Diagnostics = Vec<Diagnostic>;
pub type DiagnosticResult<T> = Result<T, ()>;

/// Line and character location in a UTF8 Wing source file
#[derive(Clone, Copy, Debug, Default, PartialEq, Eq, Hash, PartialOrd, Ord, Serialize)]
pub struct WingLocation {
	pub line: u32,
	pub col: u32,
}

/// tree-sitter-based Point => WingLocation
impl From<Point> for WingLocation {
	fn from(point: Point) -> Self {
		Self {
			line: point.row as u32,
			col: point.column as u32,
		}
	}
}

/// LSP-based Position => WingLocation
impl From<Position> for WingLocation {
	fn from(position: Position) -> Self {
		Self {
			line: position.line,
			col: position.character,
		}
	}
}

/// WingLocation => tree-sitter-based Point
impl Into<Point> for WingLocation {
	fn into(self) -> Point {
		Point {
			row: self.line as usize,
			column: self.col as usize,
		}
	}
}

/// WingLocation => LSP-based Position
impl Into<Position> for WingLocation {
	fn into(self) -> Position {
		Position {
			line: self.line,
			character: self.col,
		}
	}
}

impl Display for WingLocation {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		write!(f, "{}:{}", self.line, self.col)
	}
}

/// A span of text in a Wing source file
#[derive(Debug, Default, PartialEq, Eq, Hash, Clone, Serialize)]
pub struct WingSpan {
	pub start: WingLocation,
	pub end: WingLocation,
	/// Relative path to the file based on the working directory used to invoke the compiler
	pub file_id: String,
}

impl Into<Range> for WingSpan {
	fn into(self) -> Range {
		Range {
			start: self.start.into(),
			end: self.end.into(),
		}
	}
}

impl Into<Range> for &WingSpan {
	fn into(self) -> Range {
		Range {
			start: self.start.into(),
			end: self.end.into(),
		}
	}
}

impl WingSpan {
	pub fn contains(&self, position: &Position) -> bool {
		let pos_line = position.line;
		let pos_char = position.character;
		let start = self.start;
		let end = self.end;

		if pos_line >= start.line && pos_line <= end.line {
			if start.line == end.line && pos_line == start.line {
				pos_char >= start.col && pos_char <= end.col
			} else if pos_line == start.line {
				pos_char >= start.col
			} else if pos_line == end.line {
				pos_char <= end.col
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
		write!(f, "{}:{}:{}", self.file_id, self.start.line + 1, self.start.col + 1)
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

#[derive(Debug, Clone, PartialEq, Eq, Hash, Serialize)]
pub struct Diagnostic {
	pub message: String,
	pub span: Option<WingSpan>,
}

impl std::fmt::Display for Diagnostic {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		if let Some(span) = &self.span {
			write!(f, "Error at {} | {}", span, self.message.bold().white())
		} else {
			write!(f, "Error | {}", self.message.bold().white())
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

thread_local! {
	pub static DIAGNOSTICS: RefCell<Diagnostics> = RefCell::new(Diagnostics::new());
}

/// Report a compilation diagnostic
pub fn report_diagnostic(diagnostic: Diagnostic) {
	// Add the diagnostic to the list of diagnostics
	DIAGNOSTICS.with(|diagnostics| {
		diagnostics.borrow_mut().push(diagnostic);
	});
}

/// Returns whether any errors were found during compilation
pub fn found_errors() -> bool {
	DIAGNOSTICS.with(|diagnostics| {
		let diagnostics = diagnostics.borrow();
		!diagnostics.is_empty()
	})
}

/// Returns the list of diagnostics
pub fn get_diagnostics() -> Vec<Diagnostic> {
	DIAGNOSTICS.with(|diagnostics| {
		let diagnostics = diagnostics.borrow();
		diagnostics.clone()
	})
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

#[cfg(test)]
mod tests {
	use super::*;

	#[test]
	fn wingspan_contains() {
		let span = WingSpan {
			start: WingLocation { line: 0, col: 0 },
			end: WingLocation { line: 1, col: 10 },
			file_id: "test".to_string(),
		};

		let in_position = Position { line: 0, character: 5 };
		let out_position = Position { line: 2, character: 5 };

		assert!(span.contains(&in_position));
		assert!(!span.contains(&out_position));
	}

	#[test]
	fn wingspan_comparisons() {
		let span1 = WingSpan {
			start: WingLocation { line: 1, col: 5 },
			end: WingLocation { line: 1, col: 10 },
			file_id: "test".to_string(),
		};

		let like_span1 = span1.clone();

		let sooner = WingSpan {
			start: WingLocation { line: 0, col: 0 },
			end: WingLocation { line: 1, col: 1 },
			file_id: "test".to_string(),
		};
		let later = WingSpan {
			start: WingLocation { line: 2, col: 0 },
			end: WingLocation { line: 2, col: 5 },
			file_id: "test".to_string(),
		};

		assert!(span1 == like_span1);
		assert!(span1 < later);
		assert!(span1 <= later);
		assert!(span1 > sooner);
		assert!(span1 >= sooner);
	}
}
