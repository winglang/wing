mod cli;

use std::{
	error::Error,
	io::Write,
	path::PathBuf,
	sync::{Mutex, Once},
	time::Instant,
};

use camino::{Utf8Path, Utf8PathBuf};
use clap::Parser;
use cli::{print_compiled, print_compiling, print_installing};
use home::home_dir;
use lazy_static::lazy_static;
use strum::{Display, EnumString};
use wingc::{compile, diagnostic::get_diagnostics};

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

fn command_build(source_file: Utf8PathBuf, target: Option<Target>) -> Result<(), Box<dyn Error>> {
	let start = Instant::now();
	let target = target.unwrap_or(Target::Sim);

	let project_dir = Utf8PathBuf::from_path_buf(std::env::current_dir()?).expect("invalid utf8");
	let target_dir = project_dir.join("target").join(format!(
		"{}.{}",
		source_file.file_stem().unwrap_or("main"),
		as_dir_prefix(&target),
	));
	let work_dir = target_dir.join(".wing");

	// Print "Compiling..."
	print_compiling(source_file.as_str());

	let sdk_root = WING_CACHE_DIR.join("node_modules").join("@winglang").join("sdk");

	install_sdk()?;
	tracing::info!("Using Wing SDK at {}", sdk_root);

	// Special pragma used by wingc to find the SDK types
	if !cfg!(test) {
		std::env::set_var("WINGSDK_MANIFEST_ROOT", &sdk_root);
	}

	let result = compile(&source_file, None, &work_dir);

	match result {
		Ok(_) => {}
		Err(error) => {
			tracing::error!(error = ?error, "Failed");
			let diagnostics = get_diagnostics();
			for diagnostic in diagnostics {
				eprintln!("{}", diagnostic);
			}
			return Err("Compiler error".into());
		}
	}

	run_javascript_node(&source_file, &target_dir, target)?;

	print_compiled(start.elapsed());
	Ok(())
}

// Create a mutex to ensure that the SDK is only installed once
lazy_static! {
	static ref INSTALL_SDK_MUTEX: Mutex<()> = Mutex::new(());
}

static INSTALL_SDK_INIT: Once = Once::new();

fn install_sdk() -> Result<(), Box<dyn Error>> {
	let _guard = INSTALL_SDK_MUTEX.lock().unwrap();
	let mut result = Ok(());
	INSTALL_SDK_INIT.call_once(|| {
		result = install_sdk_helper();
	});
	result
}

fn install_sdk_helper() -> Result<(), Box<dyn Error>> {
	print_installing("Wing SDK");

	std::fs::create_dir_all(WING_CACHE_DIR.as_str())?;
	let mut install_command = std::process::Command::new("npm");
	install_command.arg("install").arg("esbuild"); // TODO: should this not be an optional dependency?

	// No need to install the latest verison of SDK from npm in tests
	if !cfg!(test) {
		install_command.arg(format!("@winglang/sdk@{}", env!("CARGO_PKG_VERSION")));
	}
	install_command.current_dir(WING_CACHE_DIR.as_str());
	install_command.stdout(std::process::Stdio::piped());
	install_command.stderr(std::process::Stdio::piped());

	tracing::info!("Running command: {:?}", install_command);

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
	command.arg(target_dir.join(".wing").join("preflight.cjs"));

	let mut node_path = WING_CACHE_DIR.join("node_modules").to_string();

	// For tests, add the local version of the SDK to the NODE_PATH
	if cfg!(test) {
		node_path = format!(
			"{}:{}",
			Utf8Path::new(env!("CARGO_MANIFEST_DIR")).join("node_modules"),
			node_path
		);
	}

	command.env("NODE_PATH", node_path);
	command.env("WING_PLATFORMS", target.to_string());
	command.env("WING_SOURCE_DIR", source_dir);
	command.env("WING_SYNTH_DIR", target_dir);

	tracing::info!("Running command: {:?}", command);
	let status = command.status()?;
	if !status.success() {
		return Err("Node.js failed".into());
	}
	Ok(())
}

fn initialize_logger() {
	let enable_logs = std::env::var("DEBUG").is_ok_and(|x| !x.is_empty() && x != "off" && x != "0");
	let enable_colours = std::env::var("WING_LOG_NOCOLOR").is_err();
	let show_thread_names = cfg!(test);
	if enable_logs {
		tracing_subscriber::fmt()
			.with_writer(std::io::stderr)
			.with_target(false)
			.with_ansi(enable_colours)
			.without_time()
			.with_thread_names(show_thread_names)
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
	use super::*;
	use std::sync::Once;

	static INIT: Once = Once::new();

	fn setup() {
		INIT.call_once(|| {
			initialize_logger();
			std::env::set_var("WINGSDK_MANIFEST_ROOT", "../@winglang/sdk");
		});
	}

	#[test]
	fn test_compile_sim() {
		setup();
		let res = command_build("../../tests/valid/hello.test.w".into(), Some(Target::Sim));
		res.expect("Failed to compile to sim");
	}

	#[test]
	fn test_compile_tfaws() {
		setup();
		let res = command_build("../../tests/valid/hello.test.w".into(), Some(Target::TfAws));
		res.expect("Failed to compile to tf-aws");
	}
}
