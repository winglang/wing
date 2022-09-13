use super::*;
use rand::Rng;
use serde_json::json;
use std::env;
use std::fs;
use std::fs::File;
use std::path::PathBuf;

fn create_temp_assembly() -> PathBuf {
    let temp_dir = env::temp_dir();
    let mut temp_assembly_dir = temp_dir.clone();
    let mut rng = rand::thread_rng();
    temp_assembly_dir.push(format!("ass-{}", rng.gen::<u32>()));
    fs::create_dir(&temp_assembly_dir).unwrap();
    let assembly_path = temp_assembly_dir.join(spec::SPEC_FILE_NAME);
    let assembly = json!({
      // TODO: add more fields
    });
    let assembly_file = File::create(&assembly_path).unwrap();
    serde_json::to_writer_pretty(assembly_file, &assembly).unwrap();
    println!("Created assembly at {}", assembly_path.display());
    assembly_path
}

fn remove_temp_assembly(assembly_path: PathBuf) {
    fs::remove_dir_all(assembly_path.parent().unwrap()).unwrap();
}

#[cfg(test)]
mod tests {
    use crate::test::{create_temp_assembly, remove_temp_assembly};

    #[test]
    fn does_not_blow_up() {
        let assembly_path = create_temp_assembly();
        remove_temp_assembly(assembly_path);
        assert_eq!(2 + 2, 4);
    }
}
