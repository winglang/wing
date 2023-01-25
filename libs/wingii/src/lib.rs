use std::error::Error;

extern crate serde;
extern crate serde_json;

#[cfg(test)]
mod test;

// this is public temporarily until reflection API is finalized
pub mod jsii;

mod util;

pub type Result<T> = std::result::Result<T, Box<dyn Error>>;

pub mod spec {
	use crate::jsii::Assembly;
	use crate::Result;
	use std::fs;
	use std::path::Path;

	pub const SPEC_FILE_NAME: &str = ".jsii";
	pub const REDIRECT_FIELD: &str = "jsii/file-redirect";

	pub fn find_assembly_file(directory: &str) -> Result<String> {
		let dot_jsii_file = Path::new(directory).join(SPEC_FILE_NAME);
		if dot_jsii_file.exists() {
			Ok(dot_jsii_file.to_str().unwrap().to_string())
		} else {
			Err(
				format!(
					"Expected to find {} file in {}, but no such file found",
					SPEC_FILE_NAME, directory
				)
				.into(),
			)
		}
	}

	pub fn is_assembly_redirect(obj: &serde_json::Value) -> bool {
		if let Some(schema) = obj.get("schema") {
			schema.as_str().unwrap() == REDIRECT_FIELD
		} else {
			false
		}
	}

	pub fn load_assembly_from_file(path_to_file: &str) -> Result<Assembly> {
		let path = Path::new(path_to_file);
		let manifest = fs::read_to_string(path)?;
		let manifest = serde_json::from_str(&manifest)?;
		if is_assembly_redirect(&manifest) {
			let redirect = manifest
				.get("filename")
				.expect("redirect assembly found but no filename is provided")
				.as_str()
				.unwrap();
			let redirect_path = Path::new(redirect);
			let redirect_manifest = fs::read_to_string(redirect_path)?;
			let redirect_manifest = serde_json::from_str(&redirect_manifest)?;
			Ok(serde_json::from_value(redirect_manifest)?)
		} else {
			Ok(serde_json::from_value(manifest)?)
		}
	}

	pub fn load_assembly_from_path(path: &str) -> Result<Assembly> {
		let file = find_assembly_file(path)?;
		load_assembly_from_file(&file)
	}
}

pub mod type_system {
	type AssemblyName = String;

	use crate::jsii;
	use crate::jsii::Assembly;
	use crate::spec;
	use crate::util::package_json;
	use crate::Result;
	use std::collections::HashMap;
	use std::path::Path;

	pub struct TypeSystem {
		assemblies: HashMap<String, Assembly>,
		roots: Vec<String>,
	}

	/// Options to pass to the assembly loader
	pub struct AssemblyLoadOptions {
		/// Is this a root assembly? If unsure, pass `true`.
		pub root: bool,
		/// Should we load dependencies recursively? If unsure, pass `true`.
		pub deps: bool,
	}

	pub trait QueryableType {}
	impl QueryableType for jsii::InterfaceType {}
	impl QueryableType for jsii::ClassType {}
	impl QueryableType for jsii::EnumType {}

	impl TypeSystem {
		pub fn new() -> TypeSystem {
			TypeSystem {
				assemblies: HashMap::new(),
				roots: Vec::new(),
			}
		}

		pub fn includes_assembly(&self, name: &str) -> bool {
			self.assemblies.contains_key(name)
		}
		pub fn is_root(&self, name: &str) -> bool {
			self.roots.contains(&name.to_string())
		}
		pub fn find_assembly(&self, name: &str) -> Option<&Assembly> {
			self.assemblies.get(name)
		}
		fn find_type<T: QueryableType + for<'de> serde::Deserialize<'de>>(&self, fqn: &str, kind: &str) -> Option<T> {
			for (_, assembly) in self.assemblies.iter() {
				if let Some(types) = &assembly.types {
					if let Some(class) = types.get(fqn) {
						if let Some(class_kind) = class.get("kind") {
							if class_kind.as_str().unwrap() == kind {
								return serde_json::from_value(class.clone()).ok();
							}
						}
					}
				}
			}
			None
		}
		pub fn find_class(&self, fqn: &str) -> Option<jsii::ClassType> {
			self.find_type(fqn, "class")
		}
		pub fn find_interface(&self, fqn: &str) -> Option<jsii::InterfaceType> {
			self.find_type(fqn, "interface")
		}
		pub fn find_enum(&self, fqn: &str) -> Option<jsii::EnumType> {
			self.find_type(fqn, "enum")
		}

		pub fn load(&mut self, file_or_directory: &str, opts: Option<AssemblyLoadOptions>) -> Result<AssemblyName> {
			let opts = opts.unwrap_or(AssemblyLoadOptions { deps: true, root: true });
			if Path::new(file_or_directory).is_dir() {
				self.load_module(file_or_directory, &opts)
			} else {
				// load_file always loads a single manifest and never recurses into dependencies
				self.load_file(file_or_directory, Some(true))
			}
		}

		fn load_assembly(&mut self, path: &str) -> Result<Assembly> {
			Ok(spec::load_assembly_from_file(path)?)
		}

		fn add_root(&mut self, assembly: &Assembly) -> Result<()> {
			if !(self.roots.iter().any(|a| a == &assembly.name)) {
				self.roots.push(assembly.name.clone());
			}
			Ok(())
		}

		fn add_assembly(&mut self, assembly: Assembly, is_root: bool) -> Result<AssemblyName> {
			if !self.assemblies.contains_key(&assembly.name) {
				self.assemblies.insert(assembly.name.clone(), assembly.clone());
			}
			if is_root {
				self.add_root(&assembly)?;
			}
			Ok(assembly.name)
		}

		fn load_file(&mut self, file: &str, is_root: Option<bool>) -> Result<AssemblyName> {
			let assembly = spec::load_assembly_from_path(file)?;
			self.add_assembly(assembly, is_root.unwrap_or(false))
		}

		fn load_module(&mut self, module_directory: &str, opts: &AssemblyLoadOptions) -> Result<AssemblyName> {
			let is_root = opts.root;
			let file_path = std::path::Path::new(module_directory).join("package.json");
			let package_json = std::fs::read_to_string(file_path)?;
			let package: serde_json::Value = serde_json::from_str(&package_json)?;
			let _ = package
				.get("jsii")
				.ok_or(format!("not a jsii module: {}", module_directory))?;
			let assembly_file = spec::find_assembly_file(module_directory)?;
			let asm = self.load_assembly(&assembly_file)?;
			if self.assemblies.contains_key(&asm.name) {
				let existing = self.assemblies.get(&asm.name).unwrap();
				if existing.version != asm.version {
					return Err(
						format!(
							"Assembly {} already exists with version {}. Got {}",
							asm.name, existing.version, asm.version
						)
						.into(),
					);
				}
				if is_root {
					self.add_root(&asm)?;
				}
				return Ok(asm.name);
			}
			let root = self.add_assembly(asm, is_root)?;
			let bundled = package_json::bundled_dependencies_of(&package);
			let deps = package_json::dependencies_of(&package);
			if opts.deps {
				for dep in deps {
					if !bundled.contains(&dep) {
						let dep_dir = package_json::find_dependency_directory(&dep, &module_directory).unwrap();
						self.load_module(&dep_dir, opts)?;
					}
				}
			}
			Ok(root)
		}
	}
}
