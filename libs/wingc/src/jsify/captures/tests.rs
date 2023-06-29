use crate::{
	diagnostic::{found_errors, get_diagnostics},
	jsify::JSifier,
	partial_compile,
};
use insta::assert_snapshot;
use itertools::Itertools;
use std::{env, fs::File, io::Write};

#[test]
fn free_preflight_object_from_preflight() {
	assert_snapshot!(capture_ok(
		r#"
    let x = "hello";

    class A {
      foo() { log(x); }
    }
    "#,
	));
}
#[test]
fn free_inflight_obj_from_inflight() {
	assert_snapshot!(capture_ok(
		r#"
    test "test" {
      let x = "hello";

      class A {
        init() {
          log(x);
        }
      }
    }
    "#,
	));
}

#[test]
fn static_local_inflight_class() {
	assert_snapshot!(capture_ok(
		r#"
    test "test" {
      class A {
        static foo() { log("hello"); }
      }

      class B {
        init() {
          A.foo();
        }
      }

      A.foo();
    }
    "#,
	));
}

#[test]
fn inflight_free_var_from_inflight() {
	assert_snapshot!(capture_ok(
		r#"
    test "test" {
      let s = "hello";
      
      class A {
        init() {
          log(s);
        }
      }
    }
    "#,
	));
}

#[test]
fn static_external_inflight_class() {
	assert_snapshot!(capture_ok(
		r#"
    inflight class A {
      static foo() { log("hello"); }
    }

    test "test" {
      class B {
        init() {
          A.foo();
        }
      }

      A.foo();
    }
    "#,
	));
}

#[test]
fn static_external_preflight_class() {
	assert_snapshot!(capture_ok(
		r#"
    class A {
      static inflight foo() { log("hello"); }
    }

    test "test" {
      class B {
        foo() {
          A.foo();
        }
      }

      A.foo();
    }
    "#,
	));
}

#[test]
fn namespaced_static_from_inflight() {
	assert_snapshot!(capture_ok(
		r#"
    bring util;
    test "test" {
      util.tryEnv("PATH");
    }
    "#,
	));
}

#[test]
fn preflight_primitive_value() {
	assert_snapshot!(capture_ok(
		r#"
    let a = "hello";
    test "test" {
      log(a);
    }
    "#,
	));
}

#[test]
fn fails_when_reassigning_preflight_variable() {
	assert_snapshot!(capture_fail(
		r#"
    let var a = "hello";
    inflight () => {
      a = "world";
    };
    "#,
	));
}

#[test]
fn preflight_collection() {
	assert_snapshot!(capture_ok(
		r#"
    let a = ["hello", "world"];
    test "test" {
      assert(a.length == 2);
      log(a.at(0));
    }
    "#,
	));
}

#[test]
fn preflight_object() {
	assert_snapshot!(capture_ok(
		r#"
    class A {
      inflight hello() {}
    }
    let pf_obj = new A();
    test "test" {
      pf_obj.hello();
    }
    "#,
	));
}

#[test]
fn preflight_collection_of_preflight_objects() {
	assert_snapshot!(capture_ok(
		r#"
    bring cloud;
    let arr = [
      new cloud.Bucket() as "b1",
      new cloud.Bucket() as "b2"
    ];
    test "test" {
      assert(arr.length == 2);
      let b = arr.at(0);
      b.put("hello", "world");
    }
    "#,
	));
}

#[test]
fn preflight_object_with_operations() {
	assert_snapshot!(capture_ok(
		r#"
    bring cloud;
    let b = new cloud.Bucket();
    test "test" {
      b.list();
      b.put("hello", "world");
    } 
    "#,
	));
}

#[test]
fn preflight_object_with_operations_multiple_methods() {
	assert_snapshot!(capture_ok(
		r#"
    bring cloud;
    let b = new cloud.Bucket();

    class Foo {
      inflight put() {
        b.put("hello1", "world");
      }

      inflight list() {
        b.list();
      }
    }
    "#,
	));
}

#[test]
fn preflight_nested_object_with_operations() {
	assert_snapshot!(capture_ok(
		r#"
    bring cloud;
    let b = new cloud.Bucket();
    class A {
      bucky: cloud.Bucket;
      init() {
        this.bucky = b;
      }
    }

    let a = new A();
    test "test" {
      a.bucky.list();
    } 
    "#,
	));
}

#[test]
fn static_inflight_operation() {
	assert_snapshot!(capture_ok(
		r#"
    bring cloud;
    let b = new cloud.Bucket();

    class A {
      static inflight myop() {
        b.list();
      }
    }

    test "test" {
      A.myop();
    }
    "#,
	));
}

#[test]
fn inflight_field() {
	assert_snapshot!(capture_ok(
		r#"
    class A {
      inflight x: str;
      inflight init() {
        this.x = "hello";
      }

      inflight method() {
        log(this.x);
      }
    }
    "#,
	));
}

#[test]
fn reference_inflight_field() {
	assert_snapshot!(capture_ok(
		r#"
    class Foo {
      inflight x: str;
      
      inflight init() {
        this.x = "hello";
      }
    
      inflight method() {
        this.x;
      }
    }
    "#,
	));
}

#[test]
fn reference_preflight_field() {
	assert_snapshot!(capture_ok(
		r#"
    class Foo {
      x: str;
      
      init() {
        this.x = "world";
      }
    
      inflight method() {
        this.x;
      }
    }
    "#,
	));
}

#[test]
fn reference_preflight_field_call_independent_method() {
	assert_snapshot!(capture_ok(
		r#"
    class Foo {
      arr: Array<str>;
      
      init() {
        this.arr = ["hello", "world"];
      }
    
      inflight method() {
        this.arr.at(1);
      }
    }
    "#,
	));
}

#[test]
fn reference_preflight_free_variable_with_this_in_the_expression() {
	assert_snapshot!(capture_ok(
		r#"
    bring cloud;
    let b = new cloud.Bucket();

    class Foo {
      name: str;
      
      init() {
        this.name = "my_object";
      }
    
      inflight method() {
        b.put(this.name, "value");
      }
    }
    "#,
	));
}

#[test]
fn lift_inflight_closure() {
	assert_snapshot!(capture_ok(
		r#"
    let f = inflight () => {};

    inflight () => {
      f();
    };
    "#
	));
}

// -----------------------------------------------------------------------------
// type references

#[test]
fn capture_type_static_method() {
	assert_snapshot!(capture_ok(
		r#"
    class Foo {
      static inflight bar(): str { return "bar"; }
    }

    test "test" {
      Foo.bar();
    }
    "#,
	));
}

#[test]
fn capture_type_static_method_inflight_class() {
	assert_snapshot!(capture_ok(
		r#"
    inflight class Foo {
      static bar(): str { return "bar"; }
    }

    test "test" {
      Foo.bar();
    }
    "#,
	));
}

#[test]
fn capture_type_new_inflight_class_outer() {
	assert_snapshot!(capture_ok(
		r#"
    inflight class Foo { }

    test "test" {
      new Foo();
    }
    "#,
	));
}

#[test]
fn capture_type_new_inflight_class_inner_no_capture() {
	assert_snapshot!(capture_ok(
		r#"
    test "test" {
      class Foo { }
      new Foo();
    }
    "#,
	));
}

#[test]
fn capture_type_inflight_class_sibling_from_init() {
	assert_snapshot!(capture_ok(
		r#"
    test "test" {
      class Foo { }
      class Bar {
        init() {
          new Foo();
        }
      }
    }
    "#,
	));
}

#[test]
fn capture_type_inflight_class_sibling_from_method() {
	assert_snapshot!(capture_ok(
		r#"
    test "test" {
      class Foo { }
      class Bar {
        myMethod() {
          new Foo();
        }
      }
    }
    "#,
	));
}

// ---------------------------------------------
// identifier

#[test]
fn no_capture_of_identifier_from_same_scope() {
	assert_snapshot!(capture_ok(
		r#"
    test "test" {
      let x = "hello";
      log(x);
    }
    "#,
	));
}

#[test]
fn no_capture_of_identifier_from_inner_scope() {
	assert_snapshot!(capture_ok(
		r#"
    test "test" {
      let x = "hello";
      if true {
        log(x);
      }
    }
    "#,
	));
}

#[test]
fn capture_identifier_from_preflight_scope() {
	assert_snapshot!(capture_ok(
		r#"
    let x = "hello";
    test "test" {
      log(x);
    }
    "#,
	));
}

#[test]
fn capture_identifier_from_preflight_scope_with_property() {
	assert_snapshot!(capture_ok(
		r#"
    let x = "hello";
    test "test" {
      assert(x.length > 0);
    }
    "#,
	));
}

#[test]
fn capture_identifier_from_preflight_scope_with_method_call() {
	assert_snapshot!(capture_ok(
		r#"
    class Foo {
      inflight bar() {}
    }

    let f = new Foo();
    test "test" {
      f.bar();
    }
    "#,
	));
}

#[test]
fn capture_identifier_from_preflight_scope_with_nested_object() {
	assert_snapshot!(capture_ok(
		r#"
    bring cloud;

    class Foo {
      b: cloud.Bucket;
      init() {
        this.b = new cloud.Bucket();
      }
    }

    let f = new Foo();
    test "test" {
      f.b.put("hello", "world");
    }
    "#,
	));
}

#[test]
fn capture_identifier_closure_from_preflight_scope() {
	assert_snapshot!(capture_ok(
		r#"
    let foo = inflight () => {};
    test "test" {
      foo();
    }
    "#,
	));
}

// -----------------

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
fn enum_value() {
	assert_snapshot!(capture_ok(
		r#"
    enum MyEnum { B, C }
    let x = MyEnum.C;
    test "test" {
      assert(MyEnum.B != MyEnum.C);
      assert(x == MyEnum.C);
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
      last: str;

      init() {
        this.name = "hello";
        this.last = "world";
      }
    }

    let t = new MyType();

    test "test" {
      log(t.name);
      assert(t.name.length > 0);
      log(t.last);
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
fn nested_preflight_operation() {
	assert_snapshot!(capture_ok(
		r#"
    bring cloud;
    class YourType {
      b: cloud.Bucket;
      init() {
        this.b = new cloud.Bucket();
      }
    }
    class MyType {
      y: YourType;
      init() {
        this.y = new YourType();
      }
    }

    let t = new MyType();

    test "test" {
      t.y.b.put("hello", "world");
    }
    "#,
	));
}

#[test]
fn nested_inflight_after_preflight_operation() {
	assert_snapshot!(capture_ok(
		r#"
    bring cloud;
    class YourType {
      inflight b: str;
      inflight init() {
        this.b = "hello";
      }
    }

    let y = new YourType();

    test "test" {
      log(y.b);
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
fn preflight_object_through_property() {
	assert_snapshot!(capture_ok(
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
fn chain_functions() {
	assert_snapshot!(capture_ok(
		r#"
    bring cloud;

    class Foo {
      b: cloud.Bucket;

      init() {
        this.b = new cloud.Bucket();
      }

      inflight getBucket(): cloud.Bucket {
        return this.b;
      }
    }

    let f = new Foo();
    let b = new cloud.Bucket();

    test "test" {
      f.getBucket().put("hello", "world");
    }
    "#,
	));
}

#[test]
fn reference_static_inflight() {
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

// TODO: this currently doesn't work because we don't record the fact that "test" uses
// staticMethod() and therefore we don't bind to it, and then we don't bind to the bucket.
#[test]
fn reference_static_inflight_which_references_preflight_object() {
	assert_snapshot!(capture_ok(
		r#"
    bring cloud;

    let b = new cloud.Bucket();

    class MyType {
      static inflight staticMethod(): str {
        b.list();
        return "foo";
      }
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
fn new_inflight_object() {
	assert_snapshot!(capture_ok(
		r#"
    inflight class Foo {}

    test "test" {
      new Foo();
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

#[test]
fn ref_std_macro() {
	assert_snapshot!(capture_ok(
		r#"
    let arr = [1,2,3];

    test "test" {
      assert(arr.length == 3);
    }
		"#,
	));
}

#[test]
fn fails_when_referencing_this_from_static() {
	assert_snapshot!(capture_fail(
		r#"
		class MyType {
      static inflight hello() {
        this.print();
      }
    }
		"#,
	));
}

#[test]
fn transitive_reference_via_static() {
	assert_snapshot!(capture_ok(
		r#"
    bring cloud;

    let b = new cloud.Bucket();
    
		class MyType {
      static inflight putInBucket() {
        b.put("in", "bucket");
      }
    }

    class YourType {
      inflight putIndirect() {
        MyType.putInBucket();
      }
    }

    let t = new YourType();
    test "test" {
      t.putIndirect();
    }
		"#,
	));
}

#[test]
fn fails_if_referencing_unknown_field() {
	assert_snapshot!(capture_fail(
		r#"
		class MyInflightClass {
      inflight putInBucket() {
        this.b.put("in", "bucket");
      }
    }
		"#,
	));
}

#[test]
fn transitive_reference_via_inflight_class() {
	assert_snapshot!(capture_ok(
		r#"
    bring cloud;

    let b = new cloud.Bucket();

		inflight class MyInflightClass {
      putInBucket() {
        b.put("in", "bucket");
      }
    }

    test "test" {
      let obj = new MyInflightClass();
      obj.putInBucket();
    }
		"#,
	));
}

#[test]
fn reference_inflight_class() {
	assert_snapshot!(capture_ok(
		r#"
    inflight class Foo {
      static a(): str { return "a"; }
    }

    test "test" {
      log(Foo.a());
    }
    "#
	));
}

#[test]
fn inline_inflight_class() {
	assert_snapshot!(capture_ok(
		r#"
    bring cloud;
    class Foo {
      b: cloud.Bucket;
      q: cloud.Queue;

      init() {
        this.b = new cloud.Bucket();
        this.q = new cloud.Queue();

        this.q.setConsumer(inflight () => {
          this.b.put("in", "bucket");
        });
      }
    }
    "#
	));
}

#[test]
fn inflight_field_from_inflight_class() {
	assert_snapshot!(capture_ok(
		r#"
    inflight class MyType {
      field: str;
      init() { this.field = "hi"; }
  
      getField(): str {
        return this.field;
      }
    }
  "#
	));
}

#[test]
fn reference_inflight_from_inflight() {
	assert_snapshot!(capture_ok(
		r#"
    inflight class Foo {
      foofoo() {}
    }

    test "test" {
      let f = new Foo();

      class Bar {
        bar() {
          f.foofoo();
        }
      }
    }

    "#
	));
}

#[test]
fn temp() {
	assert_snapshot!(capture_ok(
		r#"
    let jsonObj1 = Json { key1: "value1" };
 
    test "test" {
      log(Json.stringify(jsonObj1));
    }  
    "#
	));
}

// -----------------------------------------------------------------------------
// test utility functions

fn capture_ok(code: &str) -> String {
	let snap = capture_report(code);
	if found_errors() {
		get_diagnostics().iter().for_each(|d| println!("{}", d));
		assert!(false, "expected no errors");
	}
	snap
}

fn capture_fail(code: &str) -> String {
	let snap = capture_report(code);
	assert!(found_errors());
	snap
}

/// Compiles `code` and returns the capture scanner results as a string that can be snapshotted
fn capture_report(code: &str) -> String {
	let workdir = tempfile::tempdir().unwrap();
	let path = workdir.path().join("main.w");

	// NOTE: this is needed for debugging to work regardless of where you run the test
	env::set_current_dir(env!("CARGO_MANIFEST_DIR")).unwrap();

	// convert tabs to 2 spaces
	let code = code.replace("\t", "  ");

	let mut f = File::create(&path).unwrap();
	f.write_all(code.as_bytes()).unwrap();

	let source_path = path.as_path();
	let (scope, types, files) = partial_compile(source_path);

	let mut snap = vec![];

	if found_errors() {
		snap.push("======================================================".into());
		snap.push("Errors:".into());
		for diag in get_diagnostics() {
			let span = diag
				.span
				.map(|f| format!("{}:{}", f.start.line, f.start.col))
				.unwrap_or_default();
			snap.push(format!(" - at {} | {}", span, diag.message));
		}
	}

	let mut jsify = JSifier::new(&types, &files, "default", &workdir.path(), false);
	jsify.jsify(&scope);
	jsify.emit_files(workdir.path());

	snap.push("======================================================".into());
	snap.push("Files:".into());
	snap.push("".into());

	for (path, contents) in jsify.emitted_files.all_files().iter().sorted_by_key(|f| f.0) {
		snap.push(path.file_name().unwrap().to_string_lossy().into_owned());
		snap.push("------------------------------------------------------".into());
		snap.push(contents.into());
	}

	return snap.join("\n");
}
