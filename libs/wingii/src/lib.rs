#![allow(clippy::all)]
#![deny(clippy::correctness)]
#![deny(clippy::suspicious)]
#![deny(clippy::complexity)]

use std::error::Error;

extern crate serde;
extern crate serde_json;

#[cfg(test)]
mod test;

pub mod fqn;
// this is public temporarily until reflection API is finalized
pub mod jsii;

pub mod node_resolve;
mod util;

pub type Result<T> = std::result::Result<T, Box<dyn Error>>;

pub mod spec {
	use flate2::read::GzDecoder;
	use std::fs::File;
	use std::io::Read;

	use crate::jsii::{Assembly, JsiiFile};
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

	pub fn load_assembly_from_file(path_to_file: &str, compression: Option<&str>) -> Result<Assembly> {
		let assembly_path = Path::new(path_to_file);

		let manifest = if Some("gzip") == compression {
			let assembly_path_gz = File::open(assembly_path)?;
			let mut assembly_gz = GzDecoder::new(assembly_path_gz);
			let mut data = Vec::new();
			assembly_gz.read_to_end(&mut data)?;

			serde_json::from_slice(&data)?
		} else {
			let manifest = fs::read_to_string(assembly_path)?;
			serde_json::from_str(&manifest)?
		};
		match manifest {
			JsiiFile::Assembly(asm) => Ok(asm),
			JsiiFile::AssemblyRedirect(asm_redirect) => {
				// new path is relative to the folder of the original assembly
				let path = assembly_path
					.parent()
					.expect("Assembly path has no parent")
					.join(&asm_redirect.filename);
				load_assembly_from_file(
					path.to_str().expect("JSII redirect path invalid"),
					Some(&asm_redirect.compression),
				)
			}
		}
	}
}

pub mod type_system {
	type AssemblyName = String;

	use crate::fqn::FQN;
	use crate::jsii;
	use crate::jsii::Assembly;
	use crate::spec;
	use crate::util::package_json;
	use crate::Result;
	use std::collections::HashMap;

	pub struct TypeSystem {
		assemblies: HashMap<String, Assembly>,
	}

	pub trait QueryableType {}
	impl QueryableType for jsii::InterfaceType {}
	impl QueryableType for jsii::ClassType {}
	impl QueryableType for jsii::EnumType {}

	impl TypeSystem {
		pub fn new() -> TypeSystem {
			TypeSystem {
				assemblies: HashMap::new(),
			}
		}

		pub fn includes_assembly(&self, name: &str) -> bool {
			self.assemblies.contains_key(name)
		}
		pub fn find_assembly(&self, name: &str) -> Option<&Assembly> {
			self.assemblies.get(name)
		}
		fn find_type(&self, fqn: &FQN) -> Option<&jsii::Type> {
			let assembly = self.assemblies.get(fqn.assembly())?;

			if let Some(types) = &assembly.types {
				types.get(fqn.as_str())
			} else {
				None
			}
		}
		pub fn find_class(&self, fqn: &FQN) -> Option<&jsii::ClassType> {
			if let jsii::Type::ClassType(class) = self.find_type(fqn)? {
				Some(class)
			} else {
				None
			}
		}
		pub fn find_interface(&self, fqn: &FQN) -> Option<&jsii::InterfaceType> {
			if let jsii::Type::InterfaceType(interface) = self.find_type(fqn)? {
				Some(interface)
			} else {
				None
			}
		}
		pub fn find_enum(&self, fqn: &FQN) -> Option<&jsii::EnumType> {
			if let jsii::Type::EnumType(enum_type) = self.find_type(fqn)? {
				Some(enum_type)
			} else {
				None
			}
		}

		fn load_assembly(&self, path: &str) -> Result<Assembly> {
			spec::load_assembly_from_file(path, None)
		}

		fn add_assembly(&mut self, assembly: Assembly) -> Result<AssemblyName> {
			if !self.assemblies.contains_key(&assembly.name) {
				self.assemblies.insert(assembly.name.clone(), assembly.clone());
			}
			Ok(assembly.name)
		}

		pub fn load_dep(&mut self, dep: &str, search_start: &str) -> Result<AssemblyName> {
			let module_dir = package_json::find_dependency_directory(dep, search_start).ok_or(format!(
				"Unable to load \"{}\": Module not found in \"{}\"",
				dep, search_start
			))?;
			self.load_module(&module_dir)
		}

		pub fn load_module(&mut self, module_directory: &str) -> Result<AssemblyName> {
			let file_path = std::path::Path::new(module_directory).join("package.json");
			let package_json = std::fs::read_to_string(file_path)?;
			let package: serde_json::Value = serde_json::from_str(&package_json)?;
			let _ = package
				.get("jsii")
				.ok_or(format!("not a jsii module: {}", module_directory))?;
			let assembly_file = spec::find_assembly_file(module_directory)?;
			// in JSII, the assembly name is the NPM package name, so we don't need to load the assembly
			// in order to check if we've already loaded it. Also, JSII doesn't support multiple version
			// of the same assembly in the closure, so it is safe to assume that there are no version
			// conflicts (otherwise we are going to get into semantic versioning checks and stuff).
			let name = package.get("name").unwrap().as_str().unwrap();
			if self.assemblies.contains_key(name) {
				return Ok(name.to_string());
			}

			let asm = self.load_assembly(&assembly_file)?;
			let root = self.add_assembly(asm)?;
			let bundled = package_json::bundled_dependencies_of(&package);
			let deps = package_json::dependencies_of(&package);
			for dep in deps {
				if !bundled.contains(&dep) {
					let dep_dir = package_json::find_dependency_directory(&dep, &module_directory).ok_or(format!(
						"Unable to load \"{}\": Module not found from \"{}\"",
						dep, module_directory
					))?;
					self.load_module(&dep_dir).expect("unable to load assembly");
				}
			}
			Ok(root)
		}
	}
}
