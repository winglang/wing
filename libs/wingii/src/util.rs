extern crate serde;
extern crate serde_json;

pub mod package_json {
	use std::{
		fs,
		path::{Path, PathBuf},
	};

	use crate::node_resolve::resolve_from;

	pub fn find_up(mut directory: PathBuf, predicate: impl Fn(&PathBuf) -> bool) -> Option<PathBuf> {
		loop {
			if predicate(&directory) {
				return Some(directory);
			}

			let parent = directory.parent();
			if parent.is_none() {
				return None;
			}
			directory = parent.unwrap().to_path_buf();
		}
	}

	pub fn find_package_json_up(package_name: &str, directory: PathBuf) -> Option<PathBuf> {
		find_up(directory, |dir| {
			let package_json = dir.join("package.json");
			if package_json.exists() {
				if is_path_dependency(package_name) {
					return true;
				}
				let package_json = fs::read_to_string(&package_json).unwrap();
				let package_json: serde_json::Value = serde_json::from_str(&package_json).unwrap();
				package_json.get("name").map(|x| x.as_str()).flatten() == Some(package_name)
			} else {
				false
			}
		})
	}

	pub fn find_dependency_directory(dependency_name: &str, search_start: &str) -> Option<String> {
		let entrypoint = resolve_from(dependency_name, Path::new(search_start));
		let entrypoint = entrypoint.ok()?;
		let dep_pkg_json_path = find_package_json_up(dependency_name, entrypoint);
		let dep_pkg_json_path = dep_pkg_json_path?;
		if dep_pkg_json_path.exists() {
			Some(dep_pkg_json_path.to_str().unwrap().to_string())
		} else {
			None
		}
	}

	/// If the dependency looks like a path, return the path
	/// This means it starts with `./`, `../`, or `/`
	pub fn is_path_dependency(dependency_name: &str) -> bool {
		dependency_name.starts_with("./") || dependency_name.starts_with("../") || dependency_name.starts_with("/")
	}
}
