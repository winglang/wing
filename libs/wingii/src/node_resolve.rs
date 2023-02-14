// TODO: most of this code is copied from https://github.com/goto-bus-stop/node-resolve/tree/default
// and modified to work with WASI. The only change made to the code is that it no longer returned normalized / absolute paths.
// We should try to upstream this to the node-resolve crate if possible.
// See: https://github.com/goto-bus-stop/node-resolve/issues/11

use std::{
	error::Error,
	fs::File,
	path::{Path, PathBuf},
};

use serde_json::Value;

static ROOT: &str = "/";
static NODE_EXTENSIONS: [&str; 3] = [".js", "json", ".node"];
static NODE_MAIN_FIELDS: [&str; 1] = ["main"];
static NODE_BUILTINS: [&str; 33] = [
	"assert",
	"buffer",
	"child_process",
	"cluster",
	"console",
	"constants",
	"crypto",
	"dgram",
	"dns",
	"domain",
	"events",
	"fs",
	"http",
	"https",
	"module",
	"net",
	"os",
	"path",
	"process",
	"punycode",
	"querystring",
	"readline",
	"repl",
	"stream",
	"string_decoder",
	"timers",
	"tls",
	"tty",
	"url",
	"util",
	"v8",
	"vm",
	"zlib",
];

/// Resolve a node.js module path relative to `basedir`.
/// Returns the path to the module, or an error.
pub fn resolve_from(target: &str, basedir: &Path) -> Result<PathBuf, Box<dyn Error>> {
	// 1. If X is a core module
	if is_core_module(target) {
		// 1.a. Return the core module
		return Ok(PathBuf::from(target));
	}

	// 2. If X begins with '/'
	let basedir: &Path = if target.starts_with('/') {
		// 2.a. Set Y to be the filesystem root
		Path::new(ROOT)
	} else {
		basedir
	};

	// 3. If X begins with './' or '/' or '../'
	if target.starts_with("./") || target.starts_with('/') || target.starts_with("../") {
		let path = basedir.join(target);
		return resolve_as_file(&path)
			.or_else(|_| resolve_as_directory(&path))
			.and_then(|p| Ok(p));
	}

	resolve_node_modules(target, basedir).and_then(|p| Ok(p))
}

/// Resolve a path as a file. If `path` refers to a file, it is returned;
/// otherwise the `path` + each extension is tried.
fn resolve_as_file(path: &Path) -> Result<PathBuf, Box<dyn Error>> {
	// 1. If X is a file, load X as JavaScript text.
	if path.is_file() {
		return Ok(path.to_path_buf());
	}

	// 1. If X.js is a file, load X.js as JavaScript text.
	// 2. If X.json is a file, parse X.json to a JavaScript object.
	// 3. If X.node is a file, load X.node as binary addon.
	let mut ext_path = path.to_path_buf();
	if let Some(file_name) = ext_path.file_name().and_then(|name| name.to_str()).map(String::from) {
		for ext in NODE_EXTENSIONS {
			ext_path.set_file_name(format!("{}{}", file_name, ext));
			if ext_path.is_file() {
				return Ok(ext_path);
			}
		}
	}

	Err(String::from("Not Found").into())
}

/// Resolve by walking up node_modules folders.
fn resolve_node_modules(target: &str, basedir: &Path) -> Result<PathBuf, Box<dyn Error>> {
	let node_modules = basedir.join("node_modules");
	if node_modules.is_dir() {
		let path = node_modules.join(target);
		let result = resolve_as_file(&path).or_else(|_| resolve_as_directory(&path));
		if result.is_ok() {
			return result;
		}
	}

	match basedir.parent() {
		Some(parent) => resolve_node_modules(target, parent),
		None => Err(String::from("Not Found").into()),
	}
}

/// Resolve a path as a directory, using the "main" key from a package.json file if it
/// exists, or resolving to the index.EXT file if it exists.
fn resolve_as_directory(path: &Path) -> Result<PathBuf, Box<dyn Error>> {
	if !path.is_dir() {
		return Err(String::from("Not Found").into());
	}

	// 1. If X/package.json is a file, use it.
	let pkg_path = path.join("package.json");
	if pkg_path.is_file() {
		let main = resolve_package_main(&pkg_path);
		if main.is_ok() {
			return main;
		}
	}

	// 2. LOAD_INDEX(X)
	resolve_index(path)
}

/// Resolve using the package.json "main" key.
fn resolve_package_main(pkg_path: &Path) -> Result<PathBuf, Box<dyn Error>> {
	let pkg_dir = pkg_path.parent().unwrap_or_else(|| Path::new(ROOT));
	let file = File::open(pkg_path)?;
	let pkg: Value = serde_json::from_reader(file)?;
	if !pkg.is_object() {
		return Err(String::from("package.json is not an object").into());
	}

	let main_field = NODE_MAIN_FIELDS
		.iter()
		.find(|name| pkg[name].is_string())
		.and_then(|name| pkg[name].as_str());
	match main_field {
		Some(target) => {
			let path = pkg_dir.join(target);
			resolve_as_file(&path).or_else(|_| resolve_as_directory(&path))
		}
		None => Err(String::from("package.json does not contain a \"main\" string").into()),
	}
}

/// Resolve a directory to its index.EXT.
fn resolve_index(path: &Path) -> Result<PathBuf, Box<dyn Error>> {
	// 1. If X/index.js is a file, load X/index.js as JavaScript text.
	// 2. If X/index.json is a file, parse X/index.json to a JavaScript object.
	// 3. If X/index.node is a file, load X/index.node as binary addon.
	for ext in NODE_EXTENSIONS.iter() {
		let ext_path = path.join(format!("index{}", ext));
		if ext_path.is_file() {
			return Ok(ext_path);
		}
	}

	Err(String::from("Not Found").into())
}

/// Check if a string references a core module, such as "events"
fn is_core_module(target: &str) -> bool {
	NODE_BUILTINS.iter().any(|builtin| builtin == &target)
}
