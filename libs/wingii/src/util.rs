extern crate serde;
extern crate serde_json;

pub mod package_json {
	use std::{collections::HashSet, fs};

	use camino::{Utf8Path, Utf8PathBuf};

	use crate::node_resolve::{is_path_dependency, resolve_from};

	pub fn dependencies_of(package_json: &serde_json::Value) -> HashSet<String> {
		// merge both dependencies and peerDependencies and return the list of keys
		let mut deps = HashSet::new();
		if let Some(deps_obj) = package_json.get("dependencies") {
			deps.extend(deps_obj.as_object().unwrap().keys().cloned());
		}
		if let Some(deps_obj) = package_json.get("peerDependencies") {
			deps.extend(deps_obj.as_object().unwrap().keys().cloned());
		}
		deps
	}

	pub fn bundled_dependencies_of(package_json: &serde_json::Value) -> Vec<String> {
		// merge both bundledDependencies and bundleDependencies and return the list of keys
		let mut deps = Vec::new();
		if let Some(deps_obj) = package_json.get("bundledDependencies") {
			deps.extend(
				deps_obj
					.as_array()
					.unwrap()
					.iter()
					.map(|s| s.as_str().unwrap().to_string()),
			);
		}
		if let Some(deps_obj) = package_json.get("bundleDependencies") {
			deps.extend(
				deps_obj
					.as_array()
					.unwrap()
					.iter()
					.map(|s| s.as_str().unwrap().to_string()),
			);
		}
		deps
	}

	pub fn find_up(mut directory: Utf8PathBuf, predicate: impl Fn(&Utf8PathBuf) -> bool) -> Option<Utf8PathBuf> {
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

	pub fn find_package_json_up(package_name: &str, directory: Utf8PathBuf) -> Option<Utf8PathBuf> {
		find_up(directory, |dir| {
			let package_json = dir.join("package.json");
			if package_json.exists() {
				if is_path_dependency(package_name) {
					return true;
				}
				let package_json = fs::read_to_string(&package_json).unwrap();
				let package_json: serde_json::Value = serde_json::from_str(&package_json).unwrap();
				package_json.get("name").and_then(|x| x.as_str()) == Some(package_name)
			} else {
				false
			}
		})
	}

	pub fn find_dependency_directory(dependency_name: &str, search_start: &Utf8Path) -> Option<Utf8PathBuf> {
		let entrypoint = resolve_from(dependency_name, search_start);
		let entrypoint = entrypoint.ok()?;
		let dep_pkg_json_path = find_package_json_up(dependency_name, entrypoint);
		let dep_pkg_json_path = dep_pkg_json_path?;
		if dep_pkg_json_path.exists() {
			Some(dep_pkg_json_path)
		} else {
			None
		}
	}
}
