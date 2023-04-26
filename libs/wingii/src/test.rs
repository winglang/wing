use super::*;
use rand::Rng;
use serde_json::json;
use std::env;
use std::fs;
use std::fs::File;
use std::path::PathBuf;

#[cfg(test)]
mod tests {
	use flate2::{write::GzEncoder, Compression};

	use crate::{fqn::FQN, jsii::JsiiFile, type_system::TypeSystem};

	use super::*;
	use std::{
		fs,
		io::{Read, Write},
	};

	#[test]
	fn does_not_blow_up() {
		let assembly_path = create_temp_assembly();
		remove_temp_assembly(assembly_path);
	}

	#[test]
	fn can_correctly_tell_redirects() {
		let assembly_path = create_temp_assembly();
		let manifest: JsiiFile = serde_json::from_str(&fs::read_to_string(assembly_path.clone()).unwrap()).unwrap();
		assert_eq!(matches!(manifest, JsiiFile::AssemblyRedirect(..)), false);
		remove_temp_assembly(assembly_path);
	}

	#[test]
	fn can_load_assembly_from_single_file() {
		let assembly_path = create_temp_assembly();
		let assembly = spec::load_assembly_from_file(assembly_path.to_str().unwrap(), None).unwrap();
		assert_eq!(assembly.name, "jsii-test-dep"); // TODO: write a better test
		remove_temp_assembly(assembly_path);
	}

	#[test]
	fn can_load_assembly_from_single_file_compressed() {
		let assembly_path_pre = create_temp_assembly();
		let assembly_path = assembly_path_pre.with_extension("jsii.gz");

		// gzip the file
		let mut gz = GzEncoder::new(File::create(&assembly_path).unwrap(), Compression::default());
		let mut file = File::open(&assembly_path_pre).unwrap();
		let mut buffer = Vec::new();
		file.read_to_end(&mut buffer).unwrap();
		gz.write_all(&buffer).unwrap();
		gz.finish().unwrap();

		let assembly = spec::load_assembly_from_file(assembly_path.to_str().unwrap(), Some("gzip")).unwrap();
		assert_eq!(assembly.name, "jsii-test-dep"); // TODO: write a better test
		remove_temp_assembly(assembly_path);
	}

	#[test]
	fn can_load_assembly_from_file() {
		let assembly_path = create_temp_assembly();
		let assembly = spec::load_assembly_from_file(&assembly_path.to_str().unwrap(), None).unwrap();
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
		let name = type_system.load_module(fixture_path.to_str().unwrap()).unwrap();
		assert_eq!(name, "constructs");
		let assembly = type_system.find_assembly(&name).unwrap();
		assert_eq!(assembly.name, "constructs");
	}

	#[test]
	fn can_query_basic_types() {
		let mut type_system = TypeSystem::new();
		let fixture_path = PathBuf::from(env!("CARGO_MANIFEST_DIR"))
			.join("src")
			.join("fixtures")
			.join("constructs");
		let name = type_system.load_module(fixture_path.to_str().unwrap()).unwrap();
		assert_eq!(name, "constructs");
		// find class with fqn "constructs.Construct"
		let construct = type_system.find_class(&FQN::from("constructs.Construct")).unwrap();
		assert_eq!(construct.name, "Construct");
		// find enum with fqn "constructs.ConstructOrder"
		let construct_order = type_system.find_enum(&FQN::from("constructs.ConstructOrder")).unwrap();
		assert_eq!(construct_order.name, "ConstructOrder");
		// find interface with fqn "constructs.IConstruct"
		let i_construct = type_system.find_interface(&FQN::from("constructs.IConstruct")).unwrap();
		assert_eq!(i_construct.name, "IConstruct");
		// make sure incorrect fqn type query by kind returns None
		let i_construct = type_system.find_class(&FQN::from("constructs.IConstruct"));
		assert_eq!(i_construct, None);
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
