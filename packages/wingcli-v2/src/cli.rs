use std::io::Write;
use std::time::Duration;

use termcolor::{BufferWriter, Color, ColorChoice, ColorSpec, WriteColor};

pub(crate) fn print_compiling(text: &str) {
	print_colourful_prefix("Compiling", text)
}

pub(crate) fn print_installing(text: &str) {
	print_colourful_prefix("Installing", text)
}

pub(crate) fn print_compiled(duration: Duration) {
	print_colourful_prefix("Compiled", &format!("in {}", seconds(duration)))
}

pub fn seconds(duration: Duration) -> String {
	format!("{:.2}s", duration.as_millis() as f32 / 1000.)
}

pub fn print_colourful_prefix(prefix: &str, text: &str) {
	let buffer_writer = stdout_buffer_writer();
	let mut buffer = buffer_writer.buffer();
	buffer
		.set_color(ColorSpec::new().set_intense(true).set_fg(Some(Color::Cyan)))
		.expect("print_cyan_prefix");
	write!(buffer, "{prefix: >11}").expect("print_cyan_prefix");
	buffer.set_color(&ColorSpec::new()).expect("print_cyan_prefix");
	writeln!(buffer, " {text}").expect("print_cyan_prefix");
	buffer_writer.print(&buffer).expect("print_cyan_prefix");
}

pub fn stderr_buffer_writer() -> BufferWriter {
	// Don't add color codes to the output if standard error isn't connected to a terminal
	termcolor::BufferWriter::stderr(color_choice())
}

pub fn stdout_buffer_writer() -> BufferWriter {
	// Don't add color codes to the output if standard error isn't connected to a terminal
	termcolor::BufferWriter::stdout(color_choice())
}

fn color_choice() -> ColorChoice {
	if std::io::IsTerminal::is_terminal(&std::io::stderr()) {
		termcolor::ColorChoice::Auto
	} else {
		termcolor::ColorChoice::Never
	}
}
