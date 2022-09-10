extern crate serde;
extern crate serde_json;

mod jsii;

pub mod spec {
    use crate::jsii::Assembly;
    use std::error::Error;

    pub const SPEC_FILE_NAME: &str = ".jsii";

    pub fn find_assembly_file(path: &str) -> Result<String, Box<dyn Error>> {
        let path = std::path::Path::new(path);
        let mut current = path;
        loop {
            let spec_file = current.join(SPEC_FILE_NAME);
            if spec_file.exists() {
                return Ok(spec_file.to_str().unwrap().to_string());
            }
            current = current
                .parent()
                .ok_or(format!("Could not find {} file", SPEC_FILE_NAME))?;
        }
    }

    pub fn load_assembly_from_file(file: &str) -> Result<Assembly, Box<dyn Error>> {
        let path = std::path::Path::new(file);
        let manifest = std::fs::read_to_string(path.join(SPEC_FILE_NAME))?;
        let assembly: Assembly = serde_json::from_str(&manifest)?;
        Ok(assembly)
    }

    pub fn load_assembly_from_path(path: &str) -> Result<Assembly, Box<dyn Error>> {
        let file = find_assembly_file(path)?;
        load_assembly_from_file(&file)
    }
}

pub mod type_system {
    use crate::jsii::Assembly;
    use crate::spec::load_assembly_from_path;
    use std::collections::HashMap;
    use std::error::Error;

    pub struct TypeSystem {
        assemblies: HashMap<String, Assembly>,
        roots: Vec<Assembly>,
    }

    impl TypeSystem {
        pub fn new() -> TypeSystem {
            TypeSystem {
                assemblies: HashMap::new(),
                roots: Vec::new(),
            }
        }

        pub fn load_assembly(&mut self, path: &str) -> Result<(), Box<dyn Error>> {
            let assembly = load_assembly_from_path(path)?;
            self.assemblies.insert(assembly.name.clone(), assembly);
            Ok(())
        }

        pub fn add_root(&mut self, assembly: Assembly) -> Result<(), Box<dyn Error>> {
            if !(self.roots.iter().any(|a| a.name == assembly.name)) {
                self.roots.push(assembly);
            }
            Ok(())
        }

        pub fn add_assembly(
            &mut self,
            assembly: Assembly,
            is_root: bool,
        ) -> Result<Assembly, Box<dyn Error>> {
            if !(self.assemblies.contains_key(&assembly.name)) {
                self.assemblies
                    .insert(assembly.name.clone(), assembly.clone());
            }
            if is_root {
                self.add_root(assembly.clone())?;
            }
            return Ok(assembly);
        }

        pub fn load_file(
            &mut self,
            path: &str,
            is_root: Option<bool>,
        ) -> Result<Assembly, Box<dyn Error>> {
            let assembly = load_assembly_from_path(path)?;
            self.add_assembly(assembly, is_root.unwrap_or(false))
        }
    }
}
