bring cloud;
bring "constructs" as c;
bring "jsii-fixture" as jsii_fixture;
bring "./new_in_static_lib.w" as new_in_static_lib;

class MyClass {
  pub static createBucket(scope: c.IConstruct): cloud.Bucket {
    // JSII class
    return new cloud.Bucket() in scope;
  }

  pub static createMyClass(scope: c.IConstruct): MyClass {
    // wing class
    return new MyClass() in scope;
  }

  pub static createMyClassWithImplicitScope(id: str): MyClass {
    return new MyClass() as "implicit-scope-myclass-{id}";
  }

  pub static createBucketWithImplicitScope(): cloud.Bucket {
    return new cloud.Bucket() as "implicit-scope-bucket";
  }

  pub instanceMethod() {
    // Implicit scope should be the instance's
    let my = MyClass.createMyClassWithImplicitScope("from-instance-method");
    let bucket = MyClass.createBucketWithImplicitScope();
  }

  pub static staticMehtodThatCallsAnotherStaticMethod(): MyClass {
    return MyClass.createMyClassWithImplicitScope("from-outer-static-method");
  }

}

// these should work

let createBucket = () => {
  new cloud.Bucket() as "b1";
};

if true {
  new cloud.Bucket() as "b2";
}

let scope = new c.Construct();
let bucket = MyClass.createBucket(scope);
let bucket2 = createBucket();
let my = MyClass.createMyClass(scope);
let my2 = MyClass.createMyClassWithImplicitScope("from-root");
let bucket3 = MyClass.createBucketWithImplicitScope();
let my3 = MyClass.staticMehtodThatCallsAnotherStaticMethod();

// Call instance that instantiates stuff using static methods (should use the instance's scope)
my.instanceMethod();

// Test calling a static JSII method (no implicit scope should be passed)
assert(jsii_fixture.JsiiClass.staticMethod("foo") == "Got foo");

test "play with buckets" {
  assert(bucket.list().length == 0);
  assert(bucket3.list().length == 0);
}

// Call static method from a class's ctor
class FooParent {
  field: MyClass?;
  new(myclass: MyClass?) {
    this.field = myclass;
  }
}
class Foo extends FooParent {
  new() {
    super(
      // TODO: unsupported yet, see https://github.com/winglang/wing/issues/6016
      // MyClass.createMyClassWithImplicitScope("from-ctor-before-super")
      nil
    );
    MyClass.createMyClassWithImplicitScope("from-ctor");
  }
}
let f = new Foo();

// Create a preflight class from a static method defined in a lib
// see: https://github.com/winglang/wing/issues/6188
let lib_f = new_in_static_lib.LibClass.createFoo("lib-foo");

