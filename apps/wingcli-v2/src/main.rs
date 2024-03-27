mod cli;
mod compile;
mod constants;
mod sdk;

use std::io::Write;

use camino::Utf8PathBuf;
use clap::Parser;
use compile::command_compile;
use strum::{Display, EnumString};

#[derive(Parser, Debug)]
#[clap(version, styles=get_styles())]
enum Command {
	/// Compile one or more Wing files
	Compile {
		/// Source file or directory to compile
		file: Utf8PathBuf,

		/// The platform to target
		#[clap(short, long)]
		target: Option<Target>,
	},
}

#[derive(Parser, Debug, EnumString, Display, Clone, Copy)]
enum Target {
	/// Local simulator
	#[strum(serialize = "sim")]
	Sim,
	/// AWS with Terraform
	#[strum(serialize = "tf-aws")]
	TfAws,
}

fn as_dir_prefix(target: &Target) -> &'static str {
	match target {
		Target::Sim => "sim",
		Target::TfAws => "tfaws",
	}
}

fn main() {
	initialize_logger();
	let stderr = cli::stderr_buffer_writer();
	let result = match Command::parse() {
		Command::Compile { file, target } => command_compile(file, target),
	};

	match result {
		Ok(_) => {
			tracing::info!("Successfully completed");
		}
		Err(error) => {
			tracing::error!(error = ?error, "Failed");
			let mut buffer = stderr.buffer();
			writeln!(buffer, "Error: {}", error).expect("Error writing");
			stderr.print(&buffer).expect("Final result error writing");
			std::process::exit(1);
		}
	}
}

fn initialize_logger() {
	let enable_logs = std::env::var("WING_LOG").is_ok_and(|x| !x.is_empty() && x != "off" && x != "0");
	let enable_colours = std::env::var("WING_LOG_NOCOLOR").is_err();
	if enable_logs {
		tracing_subscriber::fmt()
			.with_writer(std::io::stderr)
			.with_target(false)
			.with_ansi(enable_colours)
			.without_time()
			.init();
	}
}

pub fn get_styles() -> clap::builder::Styles {
	clap::builder::Styles::styled()
		.usage(anstyle::Style::new().bold())
		.header(anstyle::Style::new().bold())
		.literal(anstyle::Style::new().fg_color(Some(anstyle::Color::Ansi(anstyle::AnsiColor::Green))))
		.invalid(
			anstyle::Style::new()
				.bold()
				.fg_color(Some(anstyle::Color::Ansi(anstyle::AnsiColor::Red))),
		)
		.error(
			anstyle::Style::new()
				.bold()
				.fg_color(Some(anstyle::Color::Ansi(anstyle::AnsiColor::Red))),
		)
		.valid(
			anstyle::Style::new()
				.bold()
				.underline()
				.fg_color(Some(anstyle::Color::Ansi(anstyle::AnsiColor::Green))),
		)
		.placeholder(anstyle::Style::new().fg_color(Some(anstyle::Color::Ansi(anstyle::AnsiColor::White))))
}

#[cfg(test)]
mod test {
	use self::sdk::install_sdk;

	use super::*;
	use std::sync::Once;

	static INIT: Once = Once::new();

	fn initialize() {
		INIT.call_once(|| {
			install_sdk().expect("Failed to install SDK");
		});
	}

	#[test]
	fn test_compile_sim() {
		initialize();
		let res = command_compile("../../examples/tests/valid/hello.test.w".into(), Some(Target::Sim));
		assert!(res.is_ok());
	}

	#[test]
	fn test_compile_tfaws() {
		initialize();
		let res = command_compile("../../examples/tests/valid/hello.test.w".into(), Some(Target::TfAws));
		assert!(res.is_ok());
	}
}
