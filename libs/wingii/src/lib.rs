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
	use camino::{Utf8Path, Utf8PathBuf};
	use flate2::read::GzDecoder;
	use speedy::{Readable, Writable};
	use std::fs;
	use std::io::Read;
	use std::time::SystemTime;

	use crate::jsii::{Assembly, JsiiFile};
	use crate::Result;

	pub const SPEC_FILE_NAME: &str = ".jsii";
	pub const REDIRECT_FIELD: &str = "jsii/file-redirect";
	pub(crate) const CACHE_FILE_EXT: &str = ".jsii.speedy";

	pub fn find_assembly_file(directory: &Utf8Path) -> Result<Utf8PathBuf> {
		let dot_jsii_file = Utf8Path::new(directory).join(SPEC_FILE_NAME);
		if dot_jsii_file.exists() {
			Ok(dot_jsii_file)
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

	pub(crate) fn get_cache_file_path(manifest_path: &Utf8Path, hash: &str) -> Utf8PathBuf {
		manifest_path
			.parent()
			.unwrap()
			.to_path_buf()
			.join(format!("{hash}{CACHE_FILE_EXT}"))
	}

	pub(crate) fn try_load_from_cache(manifest_path: &Utf8Path, hash: &str) -> Option<Assembly> {
		let path = get_cache_file_path(manifest_path, hash);
		let data = fs::read(path).ok()?;
		let asm = Assembly::read_from_buffer(&data).ok()?;
		Some(asm)
	}

	pub fn load_assembly_from_file(
		name: &str,
		assembly_path: &Utf8Path,
		compression: Option<&str>,
		module_version: &Option<String>,
	) -> Result<Assembly> {
		// First try loading the manifest from the cache
		let fingerprint = get_manifest_fingerprint(name, assembly_path, module_version);
		let maybe_manifest = fingerprint
			.as_ref()
			.and_then(|fingerprint| try_load_from_cache(assembly_path, &fingerprint))
			.map(|assembly| JsiiFile::Assembly(assembly));

		let manifest = if let Some(manifest) = maybe_manifest {
			manifest
		} else {
			// Load the manifest from the file
			let manifest = if Some("gzip") == compression {
				let gz_data_reader = std::io::Cursor::new(fs::read(assembly_path)?);
				let mut manifest_data_gz = GzDecoder::new(gz_data_reader);
				let mut data = Vec::new();
				manifest_data_gz.read_to_end(&mut data)?;
				serde_json::from_slice(&data)?
			} else {
				serde_json::from_str(&fs::read_to_string(assembly_path)?)?
			};
			// Attempt to cache the manifest
			if let JsiiFile::Assembly(assmbly) = &manifest {
				if let Some(fingerprint) = &fingerprint {
					let _ = cache_manifest(&assembly_path, assmbly, fingerprint);
				}
			}
			manifest
		};

		match manifest {
			JsiiFile::Assembly(asm) => Ok(asm),
			JsiiFile::AssemblyRedirect(asm_redirect) => {
				// new path is relative to the folder of the original assembly
				let path = assembly_path
					.parent()
					.expect("Assembly path has no parent")
					.join(&asm_redirect.filename);
				load_assembly_from_file(name, &path, Some(&asm_redirect.compression), module_version)
			}
		}
	}

	pub(crate) fn get_manifest_fingerprint(
		name: &str,
		assembly_path: &Utf8Path,
		module_version: &Option<String>,
	) -> Option<String> {
		let module_version = module_version.as_ref()?;
		let metadata = fs::metadata(assembly_path).ok()?;
		let fp_raw_str = format!(
			"{name}-{}-{}-{module_version}",
			metadata
				.modified()
				.ok()?
				.duration_since(SystemTime::UNIX_EPOCH)
				.ok()?
				// Use micros and not nanos for better cross platform compatibility (WASM vs native don't produce the same nanos)
				.as_micros(),
			metadata.len(),
		);
		Some(blake3::hash(&fp_raw_str.as_bytes()).to_string())
	}

	fn cache_manifest(manifest_path: &Utf8Path, manifest: &Assembly, hash: &str) -> Result<()> {
		let cache_file_dir = manifest_path.parent().unwrap().to_path_buf();
		let cache_file_name = format!("{hash}{CACHE_FILE_EXT}");

		// Write the new cache file
		manifest.write_to_file(&cache_file_dir.join(&cache_file_name))?;

		// Remove all old cache files (except the new one)
		// We remove after creating the new cache file to avoid a race with other processes
		for old_file in fs::read_dir(cache_file_dir.clone()).unwrap().filter(|f| {
			f.as_ref()
				.map(|f| {
					f.file_name().to_str().unwrap().ends_with(CACHE_FILE_EXT)
						&& f.file_name().to_str().unwrap() != cache_file_name.as_str()
				})
				.unwrap_or(false)
		}) {
			_ = fs::remove_file(old_file.unwrap().path());
		}

		Ok(())
	}
}

pub mod type_system {
	type AssemblyName = String;

	use camino::Utf8Path;
	use serde_json::Value;

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

		fn add_assembly(&mut self, assembly: Assembly) -> Result<AssemblyName> {
			let name = assembly.name.clone();
			if !self.assemblies.contains_key(&name) {
				self.assemblies.insert(name.clone(), assembly);
			}
			Ok(name)
		}

		pub fn load_dep(&mut self, dep: &str, search_start: &Utf8Path) -> Result<AssemblyName> {
			let module_dir = package_json::find_dependency_directory(dep, search_start).ok_or(format!(
				"Unable to load \"{}\": Module not found in \"{}\"",
				dep, search_start
			))?;
			self.load_module(&module_dir)
		}

		pub fn load_module(&mut self, module_directory: &Utf8Path) -> Result<AssemblyName> {
			let file_path = Utf8Path::new(module_directory).join("package.json");
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

			// Get the module version, this is used for fingerprinting the JSII manifest
			// needed for comparing it to the JSII manifest cache
			let module_version = if let Some(Value::String(ver_str)) = package.get("version") {
				Some(ver_str.clone())
			} else {
				None
			};

			let asm = spec::load_assembly_from_file(name, &assembly_file, None, &module_version)?;
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
