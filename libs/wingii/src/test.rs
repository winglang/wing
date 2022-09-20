use super::*;
use rand::Rng;
use serde_json::json;
use std::env;
use std::fs;
use std::fs::File;
use std::path::PathBuf;

#[cfg(test)]
mod tests {
    use crate::type_system::TypeSystem;

    use super::*;
    use std::fs;

    #[test]
    fn does_not_blow_up() {
        let assembly_path = create_temp_assembly();
        remove_temp_assembly(assembly_path);
    }

    #[test]
    fn can_correctly_tell_redirects() {
        let assembly_path = create_temp_assembly();
        let manifest: serde_json::Value =
            serde_json::from_str(&fs::read_to_string(assembly_path.clone()).unwrap()).unwrap();
        assert_eq!(spec::is_assembly_redirect(&manifest), false);
        remove_temp_assembly(assembly_path);
    }

    #[test]
    fn can_load_assembly_from_single_file() {
        let assembly_path = create_temp_assembly();
        let assembly = spec::load_assembly_from_file(assembly_path.to_str().unwrap()).unwrap();
        assert_eq!(assembly.name, "jsii-test-dep"); // TODO: write a better test
        remove_temp_assembly(assembly_path);
    }

    #[test]
    fn can_load_assembly_from_path() {
        let assembly_path = create_temp_assembly();
        let assembly =
            spec::load_assembly_from_path(assembly_path.parent().unwrap().to_str().unwrap())
                .unwrap();
        assert_eq!(assembly.name, "jsii-test-dep"); // TODO: write a better test
        remove_temp_assembly(assembly_path);
    }

    #[test]
    fn can_load_constructs_assembly_with_type_system() {
        let mut type_system = TypeSystem::new();
        let fixture_path = PathBuf::from(env!("CARGO_MANIFEST_DIR"))
            .join("src")
            .join("fixtures")
            .join("constructs");
        let name = type_system.load(fixture_path.to_str().unwrap()).unwrap();
        assert_eq!(name, "constructs");
        let assembly = type_system.get_assembly(name).unwrap();
        assert_eq!(assembly.name, "constructs");
    }
}

fn create_temp_assembly() -> PathBuf {
    let temp_dir = env::temp_dir();
    let mut temp_assembly_dir = temp_dir.clone();
    let mut rng = rand::thread_rng();
    temp_assembly_dir.push(format!("ass-{}", rng.gen::<u32>()));
    fs::create_dir(&temp_assembly_dir).unwrap();
    let assembly_path = temp_assembly_dir.join(spec::SPEC_FILE_NAME);
    let assembly = json!({
      "schema": "jsii/0.10.0",
      "name": "jsii-test-dep",
      "version": "1.2.4",
      "license": "Apache-2.0",
      "description": "A test assembly",
      "homepage": "https://github.com/aws/jsii",
      "repository": { "type": "git", "url": "git://github.com/aws/jsii.git" },
      "author": {
        "name": "Amazon Web Services",
        "url": "https://aws.amazon.com",
        "organization": true,
        "roles": ["author"],
      },
      "fingerprint": "F1NG3RPR1N7",
      "dependencies": {
        "jsii-test-dep-dep": "3.2.1",
      },
      "jsiiVersion": "1.0.0",
    });
    let assembly_file = File::create(&assembly_path).unwrap();
    serde_json::to_writer_pretty(assembly_file, &assembly).unwrap();
    assembly_path
}

fn remove_temp_assembly(assembly_path: PathBuf) {
    fs::remove_dir_all(assembly_path.parent().unwrap()).unwrap();
}
