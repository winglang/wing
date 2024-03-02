mod cli;

use std::{error::Error, io::Write, time::Instant};

use camino::{Utf8Path, Utf8PathBuf};
use clap::Parser;
use cli::{print_compiled, print_compiling, print_installing};
use home::home_dir;
use strum::{Display, EnumString};
use wingc::compile;

pub const VERSION: &str = env!("CARGO_PKG_VERSION");

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

	let sdk_root = find_sdk(&project_dir)?;
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

fn find_sdk(project_dir: &Utf8Path) -> Result<Utf8PathBuf, Box<dyn Error>> {
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
		return Ok(sdk_root.to_owned());
	}

	let home_dir = Utf8PathBuf::from_path_buf(home_dir().expect("Could not find home directory")).expect("invalid utf8");

	// Check if the SDK is installed at ~/.wing/cache/
	let sdk_cache_dir = home_dir.join(".wing").join("cache");
	let sdk_root = sdk_cache_dir.join("node_modules").join("@winglang").join("sdk");
	if !sdk_root.exists() {
		// If the SDK is not installed, install it in ~/.wing/cache/
		print_installing("Wing SDK");

		std::fs::create_dir_all(&sdk_cache_dir)?;
		let mut install_command = std::process::Command::new("npm");
		install_command.arg("install").arg(format!("@winglang/sdk@{VERSION}"));
		install_command.current_dir(&sdk_cache_dir);
		install_command.stdout(std::process::Stdio::piped());
		install_command.stderr(std::process::Stdio::piped());
		let status = install_command.status()?;
		if !status.success() {
			// TODO better error handling
			return Err("Failed to install SDK".into());
		}
	} else {
		// TODO: Check if the SDK installed matches the version of the CLI
	}

	let sdk_root = sdk_cache_dir.join("node_modules").join("@winglang").join("sdk");
	link_sdk(&sdk_root, project_dir)?;
	Ok(sdk_root)
}

fn link_sdk(sdk_root: &Utf8Path, project_dir: &Utf8Path) -> Result<(), Box<dyn Error>> {
	// Symlink the SDK into the work directory
	let sdk_link = project_dir.join("node_modules").join("@winglang").join("sdk");
	if sdk_link.exists() {
		std::fs::remove_file(&sdk_link)?;
	}
	std::fs::create_dir_all(sdk_link.parent().unwrap()).expect("Could not create directory");

	#[cfg(target_family = "windows")]
	std::os::windows::fs::symlink_dir(sdk_root, sdk_link)?;
	#[cfg(not(target_family = "windows"))]
	std::os::unix::fs::symlink(sdk_root, sdk_link)?;

	Ok(())
}

fn run_javascript_node(source_file: &Utf8Path, target_dir: &Utf8Path, target: Target) -> Result<(), Box<dyn Error>> {
	let mut command = std::process::Command::new("node");
	command.arg(target_dir.join(".wing").join("preflight.js"));
	command.env("WING_PLATFORMS", target.to_string());
	command.env(
		"WING_SOURCE_DIR",
		source_file
			.canonicalize_utf8()?
			.parent()
			.expect("source file has no parent"),
	);
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
