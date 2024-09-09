use std::env;
use std::fs::read_dir;

use camino::Utf8Path;
use itertools::Itertools;
use tempfile;

use crate::{
	compile,
	diagnostic::{found_errors, get_diagnostics},
};

#[macro_export]
macro_rules! assert_compile_dir {
  ($code:literal) => {
    insta::with_settings!({
      prepend_module_to_snapshot => false,
      omit_expression => true,
    }, {
      insta::assert_snapshot!($crate::test_utils::compile_dir($code));
    })
  };
}

#[macro_export]
macro_rules! assert_compile_ok {
  ($code:literal) => {
    insta::with_settings!({
      prepend_module_to_snapshot => false,
      omit_expression => true,
    }, {
      insta::assert_snapshot!($crate::test_utils::compile_ok($code));
    })
  };
}

#[macro_export]
macro_rules! assert_compile_fail {
  ($code:literal) => {
    insta::with_settings!({
      prepend_module_to_snapshot => false,
      omit_expression => true,
    }, {
      insta::assert_snapshot!($crate::test_utils::compile_fail($code));
    })
  };
}

pub fn compile_dir(code: &str) -> String {
	let snap = compile_code(code, true);
	if found_errors() {
		get_diagnostics().iter().for_each(|d| println!("{}", d));
		assert!(false, "expected no errors");
	}
	snap
}

pub fn compile_ok(code: &str) -> String {
	let snap = compile_code(code, false);
	if found_errors() {
		get_diagnostics().iter().for_each(|d| println!("{}", d));
		assert!(false, "expected no errors");
	}
	snap
}

pub fn compile_fail(code: &str) -> String {
	let snap = compile_code(code, false);
	assert!(found_errors());
	snap
}

/// Compiles `code` and returns the capture scanner results as a string that can be snapshotted
fn compile_code(code: &str, as_dir: bool) -> String {
	let project_dir = tempfile::tempdir().unwrap();
	let project_dir = Utf8Path::from_path(project_dir.path()).unwrap();
	let out_dir = project_dir.join("target/main.out/.wing");

	// NOTE: this is needed for debugging to work regardless of where you run the test
	env::set_current_dir(env!("CARGO_MANIFEST_DIR")).unwrap();

	// convert tabs to 2 spaces
	let code = code.replace("\t", "  ");

	let result = if as_dir {
		// Write lib.w to the project dir because compiling a directory requires an actual file to exist
		std::fs::write(project_dir.join("lib.w"), &code).unwrap();

		compile(&project_dir, None, &out_dir)
	} else {
		compile(&project_dir.join("main.w"), Some(code.clone()), &out_dir)
	};

	let mut snap = vec![];

	match result {
		Ok(_) => {
			let Ok(files) = read_dir(out_dir) else {
				panic!("failed to read dir");
			};

			snap.push("## Code".to_string());
			snap.push("".into());
			snap.push("```w".into());
			snap.push(code);
			snap.push("```".into());
			snap.push("".into());

			let files = files
				.filter(|f| f.is_ok())
				.map(|f| f.unwrap().path())
				.filter(|f| f.extension().unwrap_or_default() != "map")
				.sorted_by_key(|f| f.as_os_str().to_string_lossy().to_string())
				.collect::<Vec<_>>();

			for path in files {
				let name = path.file_name().unwrap().to_string_lossy().into_owned();
				let contents = std::fs::read_to_string(&path).unwrap();
				snap.push(format!("## {name}"));
				snap.push("".into());
				snap.push("```js".into());
				snap.push(contents.trim().into());
				snap.push("```".into());
				snap.push("".into());
			}
		}
		Err(_) => {
			snap.push("## Errors".into());

			for d in get_diagnostics() {
				let span = if let Some(span) = d.span {
					format!("{}:{}", span.start.line, span.start.col)
				} else {
					"<unknown>".to_string()
				};

				snap.push(format!("{} {}", d.message, span))
			}
		}
	}

	return snap.join("\n");
}
