use std::{error::Error, time::Instant};

use camino::{Utf8Path, Utf8PathBuf};
use wingc::compile;

use crate::{
	as_dir_prefix,
	cli::{print_compiled, print_compiling, print_installing, print_updating},
	constants::{VERSION, WING_CACHE_DIR, WING_SDK_DIR},
	sdk::{check_sdk_version, install_sdk},
	Target,
};

pub fn command_compile(source_file: Utf8PathBuf, target: Option<Target>) -> Result<(), Box<dyn Error>> {
	let start = Instant::now();
	let target = target.unwrap_or(Target::Sim);

	let project_dir = Utf8PathBuf::from_path_buf(std::env::current_dir()?).expect("invalid utf8");
	let target_dir = project_dir.join("target").join(format!(
		"{}.{}",
		source_file.file_stem().unwrap_or("main"),
		as_dir_prefix(&target),
	));
	let work_dir = target_dir.join(".wing");

	if !WING_SDK_DIR.exists() {
		print_installing("Wing SDK");
		install_sdk()?;
	} else {
		// Check if the SDK version is correct
		let sdk_version = check_sdk_version()?;
		if sdk_version != VERSION {
			tracing::warn!(
				"SDK version mismatch. Installed version: {}, required version: {}",
				sdk_version,
				VERSION
			);
			print_updating("Wing SDK");
			install_sdk()?;
		}
	}

	// Print that work is being done
	print_compiling(source_file.as_str());

	tracing::info!("Using SDK at {}", WING_SDK_DIR.as_str());

	// Special pragma used by wingc to find the SDK types
	std::env::set_var("WINGSDK_MANIFEST_ROOT", WING_SDK_DIR.as_os_str());

	let result = compile(&project_dir, &source_file, None, &work_dir);
	match result {
		Ok(_) => {}
		Err(error) => {
			tracing::error!(error = ?error, "Failed");
			return Err("Compiler error".into());
		}
	}

	run_javascript_node(&source_file, &target_dir, target)?;
	print_compiled(start.elapsed());
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

	tracing::info!("Running command: {:?}", command);
	let status = command.status()?;
	if !status.success() {
		return Err("Node.js failed".into());
	}
	Ok(())
}
