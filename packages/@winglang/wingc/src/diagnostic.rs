use camino::Utf8Path;
use colored::Colorize;
use std::{cell::RefCell, fmt::Display};
use tree_sitter::Point;

use lsp_types::{Position, Range};

use serde::Serialize;

use crate::ast::Spanned;

pub type FileId = String;
type Diagnostics = Vec<Diagnostic>;
pub type DiagnosticResult<T> = Result<T, ()>;

// error constant
pub const ERR_EXPECTED_SEMICOLON: &str = "Expected ';'";

/// Line and character location in a UTF8 Wing source file
#[derive(Clone, Copy, Debug, Default, PartialEq, Eq, Hash, Serialize)]
pub struct WingLocation {
	pub line: u32,
	pub col: u32,
}

impl Ord for WingLocation {
	fn cmp(&self, other: &Self) -> std::cmp::Ordering {
		if self.line == other.line {
			self.col.cmp(&other.col)
		} else {
			self.line.cmp(&other.line)
		}
	}
}

impl PartialOrd for WingLocation {
	fn partial_cmp(&self, other: &Self) -> Option<std::cmp::Ordering> {
		Some(self.cmp(other))
	}
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
	/// Relative path to the file based on the entrypoint file
	pub file_id: String,
	/// Byte-level offsets into the file.
	/// Not used for comparisons (start/end are used instead)
	pub start_offset: usize,
	pub end_offset: usize,
}

impl WingSpan {
	pub fn for_file<S: Into<String>>(file_id: S) -> Self {
		Self {
			file_id: file_id.into(),
			..Default::default()
		}
	}
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

impl From<&WingSpan> for WingSpan {
	fn from(span: &WingSpan) -> Self {
		span.clone()
	}
}

impl WingSpan {
	/// Checks if the given span is contained within this span
	pub fn contains_span(&self, position: &Self) -> bool {
		let start = self.start;
		let end = self.end;
		let other_start = position.start;
		let other_end = position.end;

		if start.line == end.line && other_start.line == other_end.line {
			other_start.col >= start.col && other_end.col <= end.col
		} else if start.line == end.line {
			other_start.col >= start.col
				&& other_start.line == start.line
				&& other_end.line == end.line
				&& other_end.col <= end.col
		} else if other_start.line == other_end.line {
			other_start.line >= start.line
				&& other_start.col >= start.col
				&& other_end.line == end.line
				&& other_end.col <= end.col
		} else {
			other_start.line >= start.line
				&& other_start.col >= start.col
				&& other_end.line <= end.line
				&& other_end.col <= end.col
		}
	}

	/// Checks if the given location is contained within this span
	pub fn contains_location(&self, position: &WingLocation) -> bool {
		let pos_line = position.line;
		let pos_char = position.col;
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

	pub fn contains_lsp_position(&self, position: &Position) -> bool {
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

	pub fn merge(&self, other: &Self) -> Self {
		if self.is_default() {
			return other.clone();
		} else if other.is_default() {
			return self.clone();
		}

		assert!(self.file_id == other.file_id);

		let start = if self.start < other.start {
			self.start
		} else {
			other.start
		};
		let end = if self.end > other.end { self.end } else { other.end };
		let start_offset = if self.start_offset < other.start_offset {
			self.start_offset
		} else {
			other.start_offset
		};
		let end_offset = if self.end_offset > other.end_offset {
			self.end_offset
		} else {
			other.end_offset
		};

		Self {
			start,
			end,
			file_id: self.file_id.clone(),
			start_offset,
			end_offset,
		}
	}

	pub fn byte_size(&self) -> usize {
		self.end_offset - self.start_offset
	}

	/// Checks if this span is the default span. This means the span is covers nothing by ending at (0,0).
	pub fn is_default(&self) -> bool {
		self.end == WingLocation::default()
	}
}

impl Display for WingSpan {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		write!(
			f,
			"{}:{}:{}",
			Utf8Path::new(&self.file_id).file_name().unwrap_or("<unknown>"),
			self.start.line + 1,
			self.start.col + 1
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
		Some(self.cmp(other))
	}
}

#[derive(Debug, Clone, PartialEq, Eq, Hash, Serialize)]
pub struct Diagnostic {
	pub message: String,
	pub annotations: Vec<DiagnosticAnnotation>,
	pub span: Option<WingSpan>,
	pub hints: Vec<String>,
	pub severity: DiagnosticSeverity,
}

impl Diagnostic {
	pub fn new(msg: impl ToString, span: &impl Spanned) -> Self {
		Self {
			message: msg.to_string(),
			span: Some(span.span()),
			annotations: vec![],
			hints: vec![],
			severity: DiagnosticSeverity::Error,
		}
	}

	pub fn add_anotation(&mut self, msg: impl ToString, span: impl Spanned) {
		self.annotations.push(DiagnosticAnnotation {
			message: msg.to_string(),
			span: span.span(),
		});
	}

	pub fn add_hint(&mut self, hint: impl ToString) {
		self.hints.push(hint.to_string());
	}

	pub fn annotate(self, msg: impl ToString, span: impl Spanned) -> Self {
		let mut new = self;
		new.add_anotation(msg, span);
		new
	}

	pub fn hint(self, hint: impl ToString) -> Self {
		let mut new = self;
		new.add_hint(hint);
		new
	}

	pub fn severity(mut self, level: DiagnosticSeverity) -> Self {
		self.severity = level;
		self
	}

	pub fn report(self) {
		report_diagnostic(self);
	}
}

#[derive(Debug, Clone, PartialEq, Eq, Hash, Serialize)]
pub struct DiagnosticAnnotation {
	pub message: String,
	pub span: WingSpan,
}

impl DiagnosticAnnotation {
	pub fn new(msg: impl ToString, span: &impl Spanned) -> Self {
		Self {
			message: msg.to_string(),
			span: span.span(),
		}
	}
}

#[derive(Debug, Clone, PartialEq, Eq, Hash, Serialize)]
#[serde(rename_all = "lowercase")]
pub enum DiagnosticSeverity {
	Error,
	Warning,
}

impl std::fmt::Display for Diagnostic {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		if let Some(span) = &self.span {
			write!(f, "Error at {} | {}", span, self.message.bold().white())?;
		} else {
			write!(f, "Error | {}", self.message.bold().white())?;
		}
		if !self.annotations.is_empty() {
			if self.annotations.len() == 1 {
				write!(f, " ({} annotation)", self.annotations.len())?;
			} else {
				write!(f, " ({} annotations)", self.annotations.len())?;
			}
		}
		if !self.hints.is_empty() {
			if self.hints.len() == 1 {
				write!(f, " ({} hint)", self.hints.len())?;
			} else {
				write!(f, " ({} hints)", self.hints.len())?;
			}
		}
		Ok(())
	}
}

impl Ord for Diagnostic {
	fn cmp(&self, other: &Self) -> std::cmp::Ordering {
		self.span.cmp(&other.span)
	}
}

impl PartialOrd for Diagnostic {
	fn partial_cmp(&self, other: &Self) -> Option<std::cmp::Ordering> {
		Some(self.cmp(other))
	}
}

thread_local! {
	static DIAGNOSTICS: RefCell<Diagnostics> = RefCell::new(Diagnostics::new());
}

/// Report a compilation diagnostic
pub fn report_diagnostic(diagnostic: Diagnostic) {
	// Add the diagnostic to the list of diagnostics
	DIAGNOSTICS.with(|diagnostics| {
		diagnostics.borrow_mut().push(diagnostic.clone());
	});

	// If we're running in wasm32 then send the diagnostic to the client
	#[cfg(target_arch = "wasm32")]
	{
		match serde_json::to_string(&diagnostic) {
			Ok(json) => {
				let bytes = json.as_bytes();
				unsafe {
					send_diagnostic(bytes.as_ptr(), bytes.len() as u32);
				}
			}
			Err(err) => {
				eprintln!("Error serializing diagnostic: {}", err);
				// avoiding a panic here because we don't want to crash the panic handler
			}
		}
	}
}

#[cfg(target_arch = "wasm32")]
extern "C" {
	pub fn send_diagnostic(data: *const u8, data_length: u32);
}

/// Returns whether any errors were found during compilation
pub fn found_errors() -> bool {
	DIAGNOSTICS.with(|diagnostics| {
		let diagnostics = diagnostics.borrow();
		diagnostics.iter().any(|d| d.severity == DiagnosticSeverity::Error)
	})
}

#[cfg(test)]
/// Asserts that no panics occurred during compilation. Should only be used for testing
pub fn assert_no_panics() {
	let panics = DIAGNOSTICS.with(|diagnostics| {
		let diagnostics = diagnostics.borrow();
		diagnostics
			.iter()
			.filter(|d| d.message.starts_with("Compiler bug"))
			.cloned()
			.collect::<Vec<_>>()
	});

	assert_eq!(panics.len(), 0, "Compiler bug detected: {:#?}", panics);
}

/// Returns the list of diagnostics
pub fn get_diagnostics() -> Vec<Diagnostic> {
	DIAGNOSTICS.with(|diagnostics| {
		let diagnostics = diagnostics.borrow();
		diagnostics.clone()
	})
}

/// Reset diagnostics, this is useful if we perform more than one compilation
/// in a single session
pub fn reset_diagnostics() {
	DIAGNOSTICS.with(|diagnostics| {
		let mut diagnostics = diagnostics.borrow_mut();
		diagnostics.clear();
	})
}

#[derive(Debug)]
pub struct TypeError {
	pub message: String,
	pub span: WingSpan,
	pub annotations: Vec<DiagnosticAnnotation>,
	pub hints: Vec<String>,
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
	fn wingspan_contains_lsp_position() {
		let span = WingSpan {
			start: WingLocation { line: 0, col: 0 },
			end: WingLocation { line: 1, col: 10 },
			file_id: "test".to_string(),
			start_offset: 0,
			end_offset: 10,
		};

		let in_position = Position { line: 0, character: 5 };
		let out_position = Position { line: 2, character: 5 };

		assert!(span.contains_lsp_position(&in_position));
		assert!(!span.contains_lsp_position(&out_position));
	}

	#[test]
	fn wingspan_contains_span() {
		let file_id = "test";

		let span = WingSpan {
			start: WingLocation { line: 0, col: 0 },
			end: WingLocation { line: 1, col: 10 },
			file_id: file_id.to_string(),
			start_offset: 0,
			end_offset: 10,
		};

		let in_span = WingSpan {
			start: WingLocation { line: 0, col: 5 },
			end: WingLocation { line: 1, col: 5 },
			file_id: file_id.to_string(),
			start_offset: 0,
			end_offset: 10,
		};
		let out_span = WingSpan {
			start: WingLocation { line: 2, col: 0 },
			end: WingLocation { line: 2, col: 5 },
			file_id: file_id.to_string(),
			start_offset: 0,
			end_offset: 10,
		};

		assert!(span.contains_span(&in_span));
		assert!(!span.contains_span(&out_span));
	}

	#[test]
	fn wingspan_contains_location() {
		let span = WingSpan {
			start: WingLocation { line: 0, col: 0 },
			end: WingLocation { line: 1, col: 10 },
			file_id: "test".to_string(),
			start_offset: 0,
			end_offset: 10,
		};

		let in_location = WingLocation { line: 0, col: 5 };
		let out_location = WingLocation { line: 2, col: 5 };

		assert!(span.contains_location(&in_location));
		assert!(!span.contains_location(&out_location));
	}

	#[test]
	fn wingspan_comparisons() {
		let span1 = WingSpan {
			start: WingLocation { line: 1, col: 5 },
			end: WingLocation { line: 1, col: 10 },
			file_id: "test".to_string(),
			start_offset: 0,
			end_offset: 10,
		};

		let like_span1 = span1.clone();

		let sooner = WingSpan {
			start: WingLocation { line: 0, col: 0 },
			end: WingLocation { line: 1, col: 1 },
			file_id: "test".to_string(),
			start_offset: 0,
			end_offset: 10,
		};
		let later = WingSpan {
			start: WingLocation { line: 2, col: 0 },
			end: WingLocation { line: 2, col: 5 },
			file_id: "test".to_string(),
			start_offset: 0,
			end_offset: 10,
		};

		assert!(span1 == like_span1);
		assert!(span1 < later);
		assert!(span1 <= later);
		assert!(span1 > sooner);
		assert!(span1 >= sooner);
	}
}
