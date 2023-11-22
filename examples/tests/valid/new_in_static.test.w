bring cloud;
bring "constructs" as c;

class MyClass {
  pub static createBucket(scope: c.IConstruct): cloud.Bucket {
    // JSII class
    return new cloud.Bucket() in scope;
  }

  pub static createMyClass(scope: c.IConstruct): MyClass {
    // wing class
    return new MyClass() in scope;
  }
}

// there is an implicit "this" in this scope (the app)
if true {
  new cloud.Bucket();
}

let scope = new c.Construct();
let bucket = MyClass.createBucket(scope);
let my = MyClass.createMyClass(scope);

test "play with bucket" {
  assert(bucket.list().length == 0);
}