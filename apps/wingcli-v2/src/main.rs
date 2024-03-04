mod cli;

use std::{error::Error, io::Write, path::PathBuf, time::Instant};

use camino::{Utf8Path, Utf8PathBuf};
use clap::Parser;
use cli::{print_compiled, print_compiling, print_installing};
use home::home_dir;
use lazy_static::lazy_static;
use strum::{Display, EnumString};
use wingc::compile;

pub const VERSION: &str = env!("CARGO_PKG_VERSION");

lazy_static! {
	static ref HOME_PATH: PathBuf = home_dir().expect("Could not find home directory");
	pub static ref WING_CACHE_DIR: Utf8PathBuf =
		Utf8PathBuf::from_path_buf(HOME_PATH.join(".wing").join("cache")).expect("invalid utf8");
}

#[derive(Parser, Debug)]
#[clap(version, styles=get_styles())]
enum Command {
	/// Compile one or more Wing files
	Compile {
		/// Source file or directory to compile
		file: String,

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
		Command::Compile { file, target } => command_build(file, target),
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

fn command_build(file: String, target: Option<Target>) -> Result<(), Box<dyn Error>> {
	let start = Instant::now();
	let target = target.unwrap_or(Target::Sim);

	let project_dir = Utf8PathBuf::from_path_buf(std::env::current_dir()?).expect("invalid utf8");
	let source_file = Utf8Path::new(&file);
	let target_dir = project_dir.join("target").join(format!(
		"{}.{}",
		source_file.file_stem().unwrap_or("main"),
		as_dir_prefix(&target),
	));
	let work_dir = target_dir.join(".wing");

	// Print that work is being done
	print_compiling(source_file.as_str());

	let sdk_root = WING_CACHE_DIR.join("node_modules").join("@winglang").join("sdk");
	if !sdk_root.exists() {
		install_sdk()?;
	}
	tracing::info!("Using SDK at {}", sdk_root);

	// Special pragma used by wingc to find the SDK types
	std::env::set_var("WINGSDK_MANIFEST_ROOT", &sdk_root);

	let result = compile(&project_dir, source_file, None, &work_dir);

	match result {
		Ok(_) => {}
		Err(error) => {
			tracing::error!(error = ?error, "Failed");
			return Err("Compiler error".into());
		}
	}

	run_javascript_node(source_file, &target_dir, target)?;

	print_compiled(start.elapsed());
	Ok(())
}

fn install_sdk() -> Result<(), Box<dyn Error>> {
	print_installing("Wing SDK");

	std::fs::create_dir_all(WING_CACHE_DIR.as_str())?;
	let mut install_command = std::process::Command::new("npm");
	install_command.arg("install").arg(format!("@winglang/sdk@{VERSION}"));
	install_command.current_dir(WING_CACHE_DIR.as_str());
	install_command.stdout(std::process::Stdio::piped());
	install_command.stderr(std::process::Stdio::piped());

	let output = install_command.output()?;
	if !output.status.success() {
		let stdout = String::from_utf8_lossy(&output.stdout);
		let stderr = String::from_utf8_lossy(&output.stderr);
		let error_message = format!("Failed to install SDK. stdout: {}. stderr: {}", stdout, stderr);
		return Err(error_message.into());
	}
	Ok(())
}

fn run_javascript_node(source_file: &Utf8Path, target_dir: &Utf8Path, target: Target) -> Result<(), Box<dyn Error>> {
	let source_file_canonical = source_file.canonicalize_utf8()?;
	let source_dir = source_file_canonical.parent().expect("source file has no parent");

	let mut command = std::process::Command::new("node");
	command.arg(target_dir.join(".wing").join("preflight.js"));
	command.env("NODE_PATH", WING_CACHE_DIR.join("node_modules").as_str());
	command.env("WING_PLATFORMS", target.to_string());
	command.env("WING_SOURCE_DIR", source_dir);
	command.env("WING_SYNTH_DIR", target_dir);
	let status = command.status()?;
	if !status.success() {
		return Err("Node.js failed".into());
	}
	Ok(())
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
