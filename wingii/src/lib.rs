extern crate serde;
extern crate serde_json;

#[cfg(test)]
mod test;

mod jsii;
mod util;

pub mod spec {
    use crate::jsii::Assembly;
    use std::error::Error;
    use std::fs;
    use std::path::Path;

    pub const SPEC_FILE_NAME: &str = ".jsii";
    pub const REDIRECT_FIELD: &str = "jsii/file-redirect";

    pub fn find_assembly_file(directory: &str) -> Result<String, Box<dyn Error>> {
        let dot_jsii_file = Path::new(directory).join(SPEC_FILE_NAME);
        if dot_jsii_file.exists() {
            Ok(dot_jsii_file.to_str().unwrap().to_string())
        } else {
            Err(format!(
                "Expected to find ${} file in ${}, but no such file found",
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

    pub fn load_assembly_from_file(path_to_file: &str) -> Result<Assembly, Box<dyn Error>> {
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

    pub fn load_assembly_from_path(path: &str) -> Result<Assembly, Box<dyn Error>> {
        let file = find_assembly_file(path)?;
        load_assembly_from_file(&file)
    }
}

pub mod type_system {
    use crate::jsii::Assembly;
    use crate::spec;
    use crate::util::package_json;
    use std::collections::HashMap;
    use std::error::Error;

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

        pub fn load_assembly(&mut self, path: &str) -> Result<Assembly, Box<dyn Error>> {
            Ok(spec::load_assembly_from_path(path)?)
        }

        pub fn add_root(&mut self, assembly: &Assembly) -> Result<(), Box<dyn Error>> {
            if !(self.roots.iter().any(|a| a == &assembly.name)) {
                self.roots.push(assembly.name.clone());
            }
            Ok(())
        }

        pub fn add_assembly(
            &mut self,
            assembly: Assembly,
            is_root: bool,
        ) -> Result<(), Box<dyn Error>> {
            if !(self.assemblies.contains_key(&assembly.name)) {
                self.assemblies
                    .insert(assembly.name.clone(), assembly.clone());
            }
            if is_root {
                self.add_root(&assembly)?;
            }
            Ok(())
        }

        pub fn load_file(
            &mut self,
            path: &str,
            is_root: Option<bool>,
        ) -> Result<(), Box<dyn Error>> {
            let assembly = spec::load_assembly_from_path(path)?;
            self.add_assembly(assembly, is_root.unwrap_or(false))
        }

        pub fn load_module(
            &mut self,
            module_directory: &str,
            is_root: Option<bool>,
        ) -> Result<(), Box<dyn Error>> {
            // append "package.json"
            let file_path = std::path::Path::new(module_directory).join("package.json");
            // parse package.json
            let package_json = std::fs::read_to_string(file_path)?;
            let package: serde_json::Value = serde_json::from_str(&package_json)?;
            // get the "jsii" section
            let _ = package
                .get("jsii")
                .ok_or("Could not find jsii section in package.json")?;
            // load the assembly
            let asm = self.load_assembly(module_directory)?;
            // check if assembly already exists
            if self.assemblies.contains_key(&asm.name) {
                // get a reference to the current assembly
                let existing = self.assemblies.get(&asm.name).unwrap();
                // check if the version is the same
                if existing.version != asm.version {
                    // if not, throw an error
                    return Err(format!(
                        "Assembly {} already exists with version {}",
                        asm.name, existing.version
                    )
                    .into());
                }
                // make sure the assembly is marked as a root
                if is_root.unwrap_or(false) {
                    self.add_root(&asm)?;
                }
                return Ok(());
            }
            // add the assembly to the type system
            self.add_assembly(asm, is_root.unwrap_or(false))?;
            // make an array of strings for the bundled dependencies
            let bundled = package_json::bundled_dependencies_of(&package);
            let deps = package_json::dependencies_of(&package);
            for dep in deps {
                if !bundled.contains(&dep) {
                    let dep_dir =
                        package_json::find_dependency_directory(&dep, &module_directory).unwrap();
                    self.load_module(&dep_dir, None)?;
                }
            }
            Ok(())
        }
    }
}
