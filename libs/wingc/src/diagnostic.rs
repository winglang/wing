use colored::Colorize;
use std::fmt::Display;
use tree_sitter::Point;

use lsp_types::{Position, Range};

use crate::debug;

pub type FileId = String;
pub type Diagnostics = Vec<Diagnostic>;
pub type DiagnosticResult<T> = Result<T, ()>;

/// Line and character location in a UTF8 Wing source file
#[derive(Clone, Copy, Debug, Default, PartialEq, Eq, Hash, PartialOrd, Ord)]
pub struct WingPoint {
	pub line: u32,
	pub character: u32,
}

/// tree-sitter-based Point => WingPoint
impl From<Point> for WingPoint {
	fn from(point: Point) -> Self {
		Self {
			line: point.row as u32,
			character: point.column as u32,
		}
	}
}

/// LSP-based Position => WingPoint
impl From<Position> for WingPoint {
	fn from(position: Position) -> Self {
		Self {
			line: position.line,
			character: position.character,
		}
	}
}

/// WingPoint => tree-sitter-based Point
impl Into<Point> for WingPoint {
	fn into(self) -> Point {
		Point {
			row: self.line as usize,
			column: self.character as usize,
		}
	}
}

/// WingPoint => LSP-based Position
impl Into<Position> for WingPoint {
	fn into(self) -> Position {
		Position {
			line: self.line,
			character: self.character,
		}
	}
}

impl Display for WingPoint {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		write!(f, "{}:{}", self.line, self.character)
	}
}

#[derive(Debug, Default, PartialEq, Eq, Hash, Clone)]
pub struct WingSpan {
	pub start: WingPoint,
	pub end: WingPoint,
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
	pub fn contains(self: &Self, position: &Position) -> bool {
		let pos_line = position.line;
		let pos_char = position.character;
		let start = self.start;
		let end = self.end;

		if pos_line >= start.line && pos_line <= end.line {
			if start.line == end.line && pos_line == start.line {
				pos_char >= start.character && pos_char <= end.character
			} else if pos_line == start.line {
				pos_char >= start.character
			} else if pos_line == end.line {
				pos_char <= end.character
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
		write!(
			f,
			"{}:{}:{}",
			self.file_id,
			self.start.line + 1,
			self.start.character + 1
		)
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

#[derive(Debug, Clone, PartialEq, Eq, Hash)]
pub enum DiagnosticLevel {
	Error,
	Warning,
	Note,
}

#[derive(Debug, Clone, PartialEq, Eq, Hash)]
pub struct Diagnostic {
	pub message: String,
	pub span: Option<WingSpan>,
	pub level: DiagnosticLevel,
}

impl Display for DiagnosticLevel {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		match self {
			DiagnosticLevel::Error => write!(f, "{}", "Error".bold().red()),
			DiagnosticLevel::Warning => write!(f, "{}", "Warning".bold().yellow()),
			DiagnosticLevel::Note => write!(f, "{}", "Note".bold().blue()),
		}
	}
}

impl std::fmt::Display for Diagnostic {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		if let Some(span) = &self.span {
			write!(f, "{} at {} | {}", self.level, span, self.message.bold().white())
		} else {
			write!(f, "{} | {}", self.level, self.message.bold().white())
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
