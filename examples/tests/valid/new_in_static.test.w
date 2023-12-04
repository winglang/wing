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

test "play with bucket" {
  assert(bucket.list().length == 0);
}