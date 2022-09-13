extern crate serde;
extern crate serde_json;

pub mod package_json {
    use node_resolve::resolve_from;
    use std::{fs, path::PathBuf};

    pub fn dependencies_of(package_json: &serde_json::Value) -> Vec<String> {
        // merge both dependencies and peerDependencies and return the list of keys
        let mut deps = Vec::new();
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

    pub fn find_up(
        mut directory: PathBuf,
        predicate: impl Fn(&PathBuf) -> bool,
    ) -> Option<PathBuf> {
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
                let package_json = fs::read_to_string(&package_json).unwrap();
                let package_json: serde_json::Value = serde_json::from_str(&package_json).unwrap();
                package_json.get("name").unwrap().as_str().unwrap() == package_name
            } else {
                false
            }
        })
    }

    pub fn find_dependency_directory(dependency_name: &str, search_start: &str) -> Option<String> {
        let entrypoint = resolve_from(dependency_name, PathBuf::from(search_start)).unwrap();
        let dep_pkg_json_path = find_package_json_up(dependency_name, entrypoint).unwrap();
        if dep_pkg_json_path.exists() {
            Some(
                dep_pkg_json_path
                    .parent()
                    .unwrap()
                    .to_str()
                    .unwrap()
                    .to_string(),
            )
        } else {
            None
        }
    }
}
