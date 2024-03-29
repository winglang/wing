use std::error::Error;

use crate::constants::WING_CACHE_DIR;
use crate::constants::{VERSION, WING_SDK_DIR};

pub fn check_sdk_version() -> Result<String, Box<dyn Error>> {
	let pkg_json = WING_SDK_DIR.join("package.json");
	tracing::info!("Checking SDK version from {}", pkg_json.as_str());
	let pkg_json_contents = std::fs::read_to_string(pkg_json)?;
	let pkg_json_parsed: serde_json::Value = serde_json::from_str(&pkg_json_contents)?;
	let sdk_version = pkg_json_parsed["version"]
		.as_str()
		.expect("SDK version is not a string");
	tracing::info!("SDK version is {}", sdk_version);
	Ok(sdk_version.to_string())
}

pub fn install_sdk() -> Result<(), Box<dyn Error>> {
	std::fs::create_dir_all(WING_CACHE_DIR.as_str())?;
	let mut install_command = std::process::Command::new("npm");
	install_command
		.arg("install")
		.arg(format!("@winglang/sdk@{VERSION}"))
		.arg("esbuild"); // TODO: should this not be an optional dependency?
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
