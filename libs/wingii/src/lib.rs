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
	use std::env::temp_dir;
	use std::fs::File;
	use std::io::Read;
	use std::path::PathBuf;
	use std::time::Duration;
	use std::time::SystemTime;

	use crate::jsii::{Assembly, JsiiFile};
	use crate::Result;
	use std::fs;
	use std::path::Path;

	pub const SPEC_FILE_NAME: &str = ".jsii";
	pub const REDIRECT_FIELD: &str = "jsii/file-redirect";
	const CACHE_FILE_EXT: &str = "bincode";
	const CACHE_FILE_DIR: &str = ".wing/jsii_manifest_cache";

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

	fn try_load_from_cache(hash: &str) -> Option<Assembly> {
		let mut file_path = temp_dir();
		file_path.push(format!("{CACHE_FILE_DIR}/{hash}.{CACHE_FILE_EXT}"));
		let data = fs::read(file_path).ok()?;
		let (asm, _): (Assembly, usize) = bincode::decode_from_slice(&data, bincode::config::standard()).ok()?;
		Some(asm)
	}

	pub fn load_assembly_from_file(path_to_file: &str, compression: Option<&str>) -> Result<Assembly> {
		let assembly_path = Path::new(path_to_file);

		// First try loading the manifest from the cache
		let fingerprint = get_manifest_fingerprint(assembly_path);
		let maybe_manifest = fingerprint
			.as_ref()
			.and_then(|fingerprint| try_load_from_cache(&fingerprint))
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
					let _ = cache_manifest(assmbly, fingerprint);
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
				load_assembly_from_file(
					path.to_str().expect("JSII redirect path invalid"),
					Some(&asm_redirect.compression),
				)
			}
		}
	}

	fn get_manifest_fingerprint(assembly_path: &Path) -> Option<String> {
		struct FpData {
			canonic_name: PathBuf,
			modified_time: Duration,
			len: u64,
		}
		let metadata = fs::metadata(assembly_path).ok()?;
		let fp_data = FpData {
			canonic_name: fs::canonicalize(assembly_path).ok()?,
			modified_time: metadata.modified().ok()?.duration_since(SystemTime::UNIX_EPOCH).ok()?,
			len: metadata.len(),
		};
		let fp_raw_str = format!(
			"{}-{}-{}",
			fp_data.canonic_name.to_string_lossy(),
			fp_data.modified_time.as_nanos(),
			fp_data.len
		);
		Some(blake3::hash(&fp_raw_str.as_bytes()).to_string())
	}

	fn cache_manifest(manifest: &Assembly, hash: &str) -> Result<()> {
		fs::create_dir_all(CACHE_FILE_DIR)?;
		let mut writer = File::create(format!("{CACHE_FILE_DIR}/{hash}.{CACHE_FILE_EXT}"))?;
		bincode::encode_into_std_write(manifest, &mut writer, bincode::config::standard())?;
		Ok(())
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
			let name = assembly.name.clone();
			if !self.assemblies.contains_key(&name) {
				self.assemblies.insert(name.clone(), assembly);
			}
			Ok(name)
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
