use super::ClassCaptures;
use crate::{
	ast::{Class, Scope},
	diagnostic::{found_errors, get_diagnostics},
	partial_compile,
	visit::{self, Visit},
};
use insta::assert_snapshot;
use std::{env, fs::File, io::Write};

// -----------------------------------------------------------------------------

#[test]
fn read_primitive_value() {
	assert_snapshot!(capture_ok(
		r#"
    let x = "my_string";

    test "test" {
      log(x);
    }
    "#,
	));
}

#[test]
fn access_methods_and_properties_on_collections() {
	assert_snapshot!(capture_ok(
		r#"
    let x = [1,2,3];
    let y = ["hello"];

    test "test" {
      assert(x.length == 3);
      assert(y.at(0) == "hello");
    }
    "#
	));
}

#[test]
fn access_property_on_primitive() {
	assert_snapshot!(capture_ok(
		r#"
    let s = "hello";

    test "test" {
      assert(s.length == 5);
    }
    "#
	));
}

#[test]
fn access_property_on_value_returned_from_collection() {
	assert_snapshot!(capture_ok(
		r#"
    let s = { "hello": "123" };

    test "test" {
      assert(s.get("hello").length == 3);
    }
    "#
	));
}

#[test]
fn calls_methods_on_preflight_object() {
	assert_snapshot!(capture_ok(
		r#"
    bring cloud;
    let b = new cloud.Bucket();

    test "test" {
      b.put("hello", "world");
      b.list();
    }
    "#
	));
}

#[test]
fn fails_on_reassignable_variable() {
	assert_snapshot!(capture_fail(
		r#"
    let var x = "my_string";

    test "test" {
      log(x);
    }
    "#,
	));
}

#[test]
fn fails_on_mutable_collections() {
	assert_snapshot!(capture_fail(
		r#"
    let x = MutArray<str>["hello", "world"];

    test "test" {
      assert(x.at(0) == "hello");
    }
    "#,
	));
}

#[test]
fn enum_value() {
	assert_snapshot!(capture_ok(
		r#"
    enum MyEnum { B, C }

    test "test" {
      assert(MyEnum.B != MyEnum.C);
    }
    "#,
	));
}

#[test]
fn static_on_std_type() {
	assert_snapshot!(capture_ok(
		r#"
    test "test" {
      log(str.fromJson("hello"));
      assert(Json.values(Json {}).length == 0);
    }
    "#,
	));
}

#[test]
fn preflight_value_field() {
	assert_snapshot!(capture_ok(
		r#"
    class MyType {
      name: str;
      init() {
        this.name = "hello";
      }
    }

    let t = new MyType();

    test "test" {
      log(t.name);
      assert(t.name.length > 0);
    }
    "#,
	));
}

#[test]
fn inflight_field_from_inflight() {
	assert_snapshot!(capture_ok(
		r#"
    class MyType {
      inflight s: str;
      inflight init() {
        this.s = "hey there!";
      }
      inflight foo() {
        log(this.s);
      }
    }
    "#,
	));
}

#[test]
fn var_inflight_field_from_inflight() {
	assert_snapshot!(capture_ok(
		r#"
    class MyType {
      inflight var s: str;
      inflight init() {
        this.s = "hey there!";
      }
      inflight foo() {
        log(this.s);
        this.s = "hello!";
      }
    }
    "#,
	));
}

#[test]
fn fails_preflight_object_through_property() {
	assert_snapshot!(capture_fail(
		r#"
    bring cloud;

    class MyType {
      b: cloud.Bucket;
      init() {
        this.b = new cloud.Bucket();
      }
    }

    let t = new MyType();

    test "test" {
      t.b.put("hello", "world");
    }
    "#,
	));
}

#[test]
fn fails_on_preflight_static() {
	assert_snapshot!(capture_fail(
		r#"
    class MyType {
      static staticMethod(): str {}
    }

    test "test" {
      log(MyType.staticMethod());
    }
    "#,
	));
}

#[test]
fn reference_inflight_static() {
	assert_snapshot!(capture_ok(
		r#"
    class MyType {
      static inflight staticMethod(): str {}
    }

    test "test" {
      log(MyType.staticMethod());
    }
    "#,
	));
}

#[test]
fn reference_from_static_inflight() {
	assert_snapshot!(capture_ok(
		r#"
    let s = "hello";

    class MyType {
      static inflight staticMethod(): str {
        return s;
      }
    }
    "#,
	));
}

#[test]
fn reference_preflight_object_from_static_inflight() {
	assert_snapshot!(capture_ok(
		r#"
    bring cloud;

    let q = new cloud.Queue();

    class MyType {
      static inflight addToQueue(m: str) {
        q.push(m);
      }
    }
    "#,
	));
}

#[test]
fn reference_preflight_fields() {
	assert_snapshot!(capture_ok(
		r#"
    bring cloud;
    
		class MyType {
      s: str;
      b: cloud.Bucket;

      init() { 
        this.s = "hello"; 
        this.b = new cloud.Bucket();
      }

      inflight boom() {
        assert(this.s.length > 0);
        assert(this.b.list().length > 0);
      }

      inflight bam() {
        this.b.put("hello", "world");
        this.b.get("aaa");
      }
    }
		"#,
	));
}

#[test]
fn transitive_reference() {
	assert_snapshot!(capture_ok(
		r#"
    bring cloud;
    
		class MyType {
      b: cloud.Bucket;

      init() { 
        this.b = new cloud.Bucket();
      }

      inflight isEmpty(): bool {
        return this.b.list().length == 0;
      }

      inflight checkIfEmpty() {
        if this.isEmpty() {
          log("empty!");
        }
      }
    }

    let t = new MyType();
    test "test" {
      t.checkIfEmpty();
    }
		"#,
	));
}

// -----------------------------------------------------------------------------
// test utility functions

/// Compiles `code` and returns the capture scanner results as a string that can be snapshotted
fn capture_report(code: &str) -> String {
	let workdir = tempfile::tempdir().unwrap();
	let path = workdir.path().join("main.w");

	// NOTE: this is needed for debugging to work regardless of where you run the test
	env::set_current_dir(env!("CARGO_MANIFEST_DIR")).unwrap();

	// convert tabs to 2 spaces
	let code = code.replace("\t", "  ");

	let mut f = File::create(&path).unwrap();
	f.write(code.as_bytes()).unwrap();

	let source_path = path.as_path();
	let (scope, types) = partial_compile(source_path);

	let mut snap = vec![];

	snap.push(code.to_string());

	if !found_errors() {
		let classes = find_classes(&scope);
		for class in classes {
			snap.push("======================================================".into());
			snap.push(format!("Class: {}", class.name.name));
			let captures = ClassCaptures::scan(&types, &class);
			snap.push(captures.to_string());
		}
	}

	if found_errors() {
		snap.push("Errors:".into());
		for diag in get_diagnostics() {
			let span = diag
				.span
				.map(|f| format!("{}:{}", f.start.line, f.start.col))
				.unwrap_or_default();
			snap.push(format!(" - at {} | {}", span, diag.message));
		}
	}

	return snap.join("\n");
}

fn capture_ok(code: &str) -> String {
	let snap = capture_report(code);
	assert!(!found_errors());
	snap
}

fn capture_fail(code: &str) -> String {
	let snap = capture_report(code);
	assert!(found_errors());
	snap
}

fn find_classes<'a>(scope: &'a Scope) -> Vec<&'a Class> {
	// find the "myMethod" scope
	struct FindClassVisitor<'a> {
		results: Vec<&'a Class>,
	}

	impl<'a> Visit<'a> for FindClassVisitor<'a> {
		fn visit_class(&mut self, node: &'a Class) {
			self.results.push(&node);
			visit::visit_class(self, node);
		}
	}

	let mut visitor = FindClassVisitor { results: vec![] };

	visitor.visit_scope(scope);
	return visitor.results;
}
