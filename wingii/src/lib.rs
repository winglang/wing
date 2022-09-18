extern crate serde;
extern crate serde_json;

#[cfg(test)]
mod test;

mod jsii;
mod types;
mod util;

pub mod spec {
    use crate::jsii::Assembly;
    use crate::types::WingIIResult;
    use std::fs;
    use std::path::Path;

    pub const SPEC_FILE_NAME: &str = ".jsii";
    pub const REDIRECT_FIELD: &str = "jsii/file-redirect";

    pub fn find_assembly_file(directory: &str) -> WingIIResult<String> {
        let dot_jsii_file = Path::new(directory).join(SPEC_FILE_NAME);
        if dot_jsii_file.exists() {
            Ok(dot_jsii_file.to_str().unwrap().to_string())
        } else {
            Err(format!(
                "Expected to find {} file in {}, but no such file found",
                SPEC_FILE_NAME, directory
            )
            .into())
        }
    }

    pub fn is_assembly_redirect(obj: &serde_json::Value) -> bool {
        if let Some(schema) = obj.get("schema") {
            schema.as_str().unwrap() == REDIRECT_FIELD
        } else {
            false
        }
    }

    pub fn load_assembly_from_file(path_to_file: &str) -> WingIIResult<Assembly> {
        let path = Path::new(path_to_file);
        let manifest = fs::read_to_string(path)?;
        let manifest = serde_json::from_str(&manifest)?;
        if is_assembly_redirect(&manifest) {
            let redirect = manifest.get("filename").unwrap().as_str().unwrap();
            let redirect_path = Path::new(redirect);
            let redirect_manifest = fs::read_to_string(redirect_path)?;
            let redirect_manifest = serde_json::from_str(&redirect_manifest)?;
            Ok(serde_json::from_value(redirect_manifest)?)
        } else {
            Ok(serde_json::from_value(manifest)?)
        }
    }

    pub fn load_assembly_from_path(path: &str) -> WingIIResult<Assembly> {
        let file = find_assembly_file(path)?;
        load_assembly_from_file(&file)
    }
}

pub mod type_system {
    type SchemaName = String;

    use crate::jsii::Assembly;
    use crate::spec;
    use crate::types::{WingIIResult, WingIIResultVoid};
    use crate::util::package_json;
    use std::collections::HashMap;
    use std::path::Path;

    pub struct TypeSystem {
        assemblies: HashMap<String, Assembly>,
        roots: Vec<String>,
    }

    impl TypeSystem {
        pub fn new() -> TypeSystem {
            TypeSystem {
                assemblies: HashMap::new(),
                roots: Vec::new(),
            }
        }

        pub fn get_assembly(&self, name: SchemaName) -> Option<&Assembly> {
            self.assemblies.get(&name)
        }

        pub fn load(&mut self, file_or_directory: &str) -> WingIIResult<SchemaName> {
            if Path::new(file_or_directory).is_dir() {
                self.load_module(file_or_directory, Some(true))
            } else {
                self.load_file(file_or_directory, Some(true))
            }
        }

        fn load_assembly(&mut self, path: &str) -> WingIIResult<Assembly> {
            Ok(spec::load_assembly_from_file(path)?)
        }

        fn add_root(&mut self, assembly: &Assembly) -> WingIIResultVoid {
            if !(self.roots.iter().any(|a| a == &assembly.name)) {
                self.roots.push(assembly.name.clone());
            }
            Ok(())
        }

        fn add_assembly(&mut self, assembly: Assembly, is_root: bool) -> WingIIResult<SchemaName> {
            if !self.assemblies.contains_key(&assembly.name) {
                self.assemblies
                    .insert(assembly.name.clone(), assembly.clone());
            }
            if is_root {
                self.add_root(&assembly)?;
            }
            Ok(assembly.name)
        }

        fn load_file(&mut self, file: &str, is_root: Option<bool>) -> WingIIResult<SchemaName> {
            let assembly = spec::load_assembly_from_path(file)?;
            self.add_assembly(assembly, is_root.unwrap_or(false))
        }

        fn load_module(
            &mut self,
            module_directory: &str,
            is_root: Option<bool>,
        ) -> WingIIResult<SchemaName> {
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
                    return Err(format!(
                        "Assembly {} already exists with version {}. Got {}",
                        asm.name, existing.version, asm.version
                    )
                    .into());
                }
                if is_root.unwrap_or(false) {
                    self.add_root(&asm)?;
                }
                return Ok(asm.name);
            }
            let root = self.add_assembly(asm, is_root.unwrap_or(false))?;
            let bundled = package_json::bundled_dependencies_of(&package);
            let deps = package_json::dependencies_of(&package);
            for dep in deps {
                if !bundled.contains(&dep) {
                    let dep_dir =
                        package_json::find_dependency_directory(&dep, &module_directory).unwrap();
                    self.load_module(&dep_dir, None)?;
                }
            }
            Ok(root)
        }
    }
}
