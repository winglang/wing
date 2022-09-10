extern crate serde;
extern crate serde_json;

pub mod package_json {
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

    pub fn find_dependency_directory(dependency_name: &str, search_start: &str) -> Option<String> {
        // find the directory of a dependency by searching upwards from the given directory
        let mut current_dir = std::path::Path::new(search_start);
        loop {
            let package_json_path = current_dir.join("package.json");
            if package_json_path.exists() {
                let package_json = std::fs::read_to_string(package_json_path).unwrap();
                let package: serde_json::Value = serde_json::from_str(&package_json).unwrap();
                if let Some(name) = package.get("name") {
                    if name.as_str().unwrap() == dependency_name {
                        return Some(current_dir.to_str().unwrap().to_string());
                    }
                }
            }
            if current_dir.parent().is_none() {
                return None;
            }
            current_dir = current_dir.parent().unwrap();
        }
    }
}
