mod cli;

use std::{error::Error, io::Write, time::Instant};

use camino::{Utf8Path, Utf8PathBuf};
use clap::Parser;
use cli::{print_compiled, print_compiling, print_installing};
use strum::{Display, EnumString};
use wingc::compile;

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

fn main() {
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

	let project_dir = Utf8PathBuf::from_path_buf(std::env::current_dir()?).expect("invalid utf8");
	let source_file = Utf8Path::new(&file);
	let target_dir = project_dir.join("target");

	// Print that work is being done
	print_compiling(source_file.as_str());

	link_sdk(&project_dir)?;

	let result = compile(&project_dir, source_file, None, &target_dir);

	match result {
		Ok(_) => {}
		Err(error) => {
			tracing::error!(error = ?error, "Failed");
			return Err("Compiler error".into());
		}
	}

	let target = target.unwrap_or(Target::Sim);
	run_javascript_node(source_file, &target_dir, target)?;

	print_compiled(start.elapsed());
	Ok(())
}

fn link_sdk(project_dir: &Utf8Path) -> Result<(), Box<dyn Error>> {
	// Check if we have a version of the SDK to link to
	// by running `node -e 'require.resolve("@winglang/sdk")'`
	let mut command = std::process::Command::new("node");
	command.arg("-e").arg("console.log(require.resolve('@winglang/sdk'))");
	command.current_dir(project_dir);
	command.stdout(std::process::Stdio::piped());
	command.stderr(std::process::Stdio::piped());
	let output = command.spawn()?.wait_with_output()?;
	let status = output.status;
	let stdout = output.stdout;

	if status.success() {
		let sdk_root = Utf8Path::new(std::str::from_utf8(&stdout).unwrap().trim());
		// path ends in lib/index.js, so remove those parts
		let sdk_root = sdk_root.parent().unwrap().parent().unwrap();
		std::env::set_var("WINGSDK_MANIFEST_ROOT", sdk_root);
	} else {
		// If the SDK is not installed, we need to install it
		print_installing("Wing SDK");

		let mut install_command = std::process::Command::new("npm");
		install_command.arg("install").arg("@winglang/sdk");
		install_command.current_dir(project_dir);
		install_command.stdout(std::process::Stdio::piped());
		install_command.stderr(std::process::Stdio::piped());
		let status = install_command.status()?;
		if !status.success() {
			// TODO better error handling
			return Err("Failed to install SDK".into());
		}

		let sdk_root = project_dir.join("node_modules/@winglang/sdk");
		std::env::set_var("WINGSDK_MANIFEST_ROOT", sdk_root);
	}

	Ok(())
}

fn run_javascript_node(source_file: &Utf8Path, target_dir: &Utf8Path, target: Target) -> Result<(), Box<dyn Error>> {
	let mut command = std::process::Command::new("node");
	command.arg(target_dir.join("preflight.js"));
	command.env("WING_PLATFORMS", target.to_string());
	command.env(
		"WING_SOURCE_DIR",
		source_file
			.canonicalize_utf8()?
			.parent()
			.expect("source file has no parent"),
	);
	let status = command.status()?;
	if !status.success() {
		return Err("Node.js failed".into());
	}
	Ok(())
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
