use super::*;

use std::env;
use std::fs;
use std::fs::File;

use camino::Utf8PathBuf;
use rand::Rng;
use serde_json::json;

#[cfg(test)]
mod tests {
	use flate2::{write::GzEncoder, Compression};

	use crate::{fqn::FQN, jsii::JsiiFile, type_system::TypeSystem};

	use super::*;
	use std::{
		fs::{self},
		io::{Read, Write},
	};

	#[test]
	fn does_not_blow_up() {
		let (_, assembly_path) = create_temp_assembly();
		remove_temp_assembly(assembly_path);
	}

	#[test]
	fn can_correctly_tell_redirects() {
		let (_, assembly_path) = create_temp_assembly();
		let manifest: JsiiFile = serde_json::from_str(&fs::read_to_string(assembly_path.clone()).unwrap()).unwrap();
		assert_eq!(matches!(manifest, JsiiFile::AssemblyRedirect(..)), false);
		remove_temp_assembly(assembly_path);
	}

	#[test]
	fn can_load_assembly_from_single_file() {
		let (name, assembly_path) = create_temp_assembly();
		let assembly = spec::load_assembly_from_file(&name, &assembly_path, None, &None).unwrap();
		assert_eq!(assembly.name, "jsii-test-dep");
		remove_temp_assembly(assembly_path);
	}

	#[test]
	fn can_load_assembly_from_single_file_compressed() {
		let (name, assembly_path) = create_temp_gz_assembly();

		let assembly = spec::load_assembly_from_file(&name, &assembly_path, Some("gzip"), &None).unwrap();
		assert_eq!(assembly.name, "jsii-test-dep");
		remove_temp_assembly(assembly_path);
	}

	#[test]
	fn can_load_assembly_from_redirect_manifest() {
		let (name, assembly_path) = create_temp_redirect_assembly();

		let assembly = spec::load_assembly_from_file(&name, &assembly_path, None, &None).unwrap();
		assert_eq!(assembly.name, "jsii-test-dep");
		remove_temp_assembly(assembly_path);
	}

	#[test]
	fn cache_assembly() {
		// Create temp assembly for test
		let (name, assembly_path) = create_temp_assembly();

		// Load the assembly and verify a cache file was created
		let dummy_version = Some("1.2.3".to_string());
		let assembly = spec::load_assembly_from_file(&name, &assembly_path, None, &dummy_version).unwrap();
		let fingerprint = spec::get_manifest_fingerprint(&name, &assembly_path, &dummy_version).unwrap();
		let cached_assembly = spec::try_load_from_cache(&assembly_path, &fingerprint).unwrap();
		assert_eq!(assembly, cached_assembly);

		// Get the timestamp of the cache file
		let cache_file_path = spec::get_cache_file_path(&assembly_path, &fingerprint);
		let cache_file_metadata = fs::metadata(cache_file_path).unwrap();
		let cache_file_timestamp = cache_file_metadata.modified().unwrap();

		// Wait a bit and load the assembly again
		std::thread::sleep(std::time::Duration::from_millis(2));
		_ = spec::load_assembly_from_file(&name, &assembly_path, None, &dummy_version).unwrap();

		// Verify there's only a single cache file in the directory
		let cache_files = fs::read_dir(assembly_path.parent().unwrap())
			.unwrap()
			.filter(|entry| {
				let entry = entry.as_ref().unwrap();
				entry.file_name().to_str().unwrap().ends_with(spec::CACHE_FILE_EXT)
			})
			.map(|entry| entry.unwrap())
			.collect::<Vec<_>>();
		assert!(cache_files.len() == 1);
		// Verify the file has the same timestamp as before
		assert!(cache_files[0].metadata().unwrap().modified().unwrap() == cache_file_timestamp);

		// Touch the assembly file and load the assembly again to verify the cache file was updated
		std::thread::sleep(std::time::Duration::from_millis(2));
		filetime::set_file_mtime(&assembly_path, filetime::FileTime::now()).unwrap();

		_ = spec::load_assembly_from_file(&name, &assembly_path, None, &dummy_version).unwrap();

		// Verify there's still only a single cache file in the directory but it has a different timestamp
		let cache_files = fs::read_dir(assembly_path.parent().unwrap())
			.unwrap()
			.filter(|entry| {
				let entry = entry.as_ref().unwrap();
				entry.file_name().to_str().unwrap().ends_with(spec::CACHE_FILE_EXT)
			})
			.map(|entry| entry.unwrap())
			.collect::<Vec<_>>();
		assert!(cache_files.len() == 1);
		assert!(cache_files[0].metadata().unwrap().modified().unwrap() > cache_file_timestamp);

		remove_temp_assembly(assembly_path);
	}

	#[test]
	fn cache_redirected_assembly() {
		// Create temp assembly with redirects for test
		let (name, assembly_path) = create_temp_redirect_assembly();
		// Get the target assembly path
		let redirect_jsii = serde_json::from_str::<JsiiFile>(&fs::read_to_string(assembly_path.clone()).unwrap()).unwrap();
		let target_file = match redirect_jsii {
			JsiiFile::AssemblyRedirect(redirect) => redirect.filename,
			_ => panic!("Expected AssemblyRedirect"),
		};
		let target_assembly_path = assembly_path.parent().unwrap().join(target_file);

		// Load the assembly and verify a cache file was created
		let dummy_version = Some("1.2.3".to_string());
		let assembly = spec::load_assembly_from_file(&name, &assembly_path, None, &dummy_version).unwrap();
		let fingerprint = spec::get_manifest_fingerprint(&name, &target_assembly_path, &dummy_version).unwrap();
		let cached_assembly = spec::try_load_from_cache(&target_assembly_path, &fingerprint).unwrap();
		assert_eq!(assembly, cached_assembly);

		remove_temp_assembly(assembly_path);
	}

	fn create_temp_gz_assembly() -> (String, Utf8PathBuf) {
		let (name, assembly_path_pre) = create_temp_assembly();

		// gzip the file
		let assembly_path = assembly_path_pre.with_extension("gz");
		let mut gz = GzEncoder::new(File::create(&assembly_path).unwrap(), Compression::default());
		let mut file = File::open(&assembly_path_pre).unwrap();
		let mut buffer = Vec::new();
		file.read_to_end(&mut buffer).unwrap();
		gz.write_all(&buffer).unwrap();
		gz.finish().unwrap();
		(name, assembly_path)
	}

	fn create_temp_redirect_assembly() -> (String, Utf8PathBuf) {
		// Create the actual gzipped assembly
		let (name, assembly_path) = create_temp_gz_assembly();
		// Create the redirect manifest
		let target_file = assembly_path.file_name().unwrap();
		let redirect_assembly = json!({
			"schema": "jsii/file-redirect",
			"compression": "gzip",
			"filename": target_file
		});
		let redirect_file_path = assembly_path.parent().unwrap().join(spec::SPEC_FILE_NAME);
		let redirect_file = File::create(&redirect_file_path).unwrap();
		serde_json::to_writer_pretty(redirect_file, &redirect_assembly).unwrap();
		(name, redirect_file_path)
	}

	#[test]
	fn can_load_assembly_from_file() {
		let (name, assembly_path) = create_temp_assembly();
		let assembly = spec::load_assembly_from_file(&name, &assembly_path, None, &None).unwrap();
		assert_eq!(assembly.name, "jsii-test-dep");
		remove_temp_assembly(assembly_path);
	}

	#[test]
	fn can_load_constructs_assembly_with_type_system() {
		let mut type_system = TypeSystem::new();
		let fixture_path = Utf8PathBuf::from(env!("CARGO_MANIFEST_DIR"))
			.join("src")
			.join("fixtures")
			.join("constructs");
		let name = type_system.load_module(&fixture_path).unwrap();
		assert_eq!(name, "constructs");
		let assembly = type_system.find_assembly(&name).unwrap();
		assert_eq!(assembly.name, "constructs");
	}

	#[test]
	fn can_query_basic_types() {
		let mut type_system = TypeSystem::new();
		let fixture_path = Utf8PathBuf::from(env!("CARGO_MANIFEST_DIR"))
			.join("src")
			.join("fixtures")
			.join("constructs");
		let name = type_system.load_module(&fixture_path).unwrap();
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

fn create_temp_assembly() -> (String, Utf8PathBuf) {
	let temp_dir = env::temp_dir();
	let mut temp_dir = Utf8PathBuf::from_path_buf(temp_dir).expect("invalid unicode path");
	let mut rng = rand::thread_rng();
	temp_dir.push(format!("ass-{}", rng.gen::<u32>()));
	fs::create_dir(&temp_dir).unwrap();
	let assembly_path = temp_dir.join(spec::SPEC_FILE_NAME);
	let name = "jsii-test-dep".to_string();
	let assembly = json!({
		"schema": "jsii/0.10.0",
		"name": name,
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
	(name, assembly_path)
}

fn remove_temp_assembly(assembly_path: Utf8PathBuf) {
	fs::remove_dir_all(assembly_path.parent().unwrap()).unwrap();
}
