// since MyClass is a preflight class, it can only be created in from a static context with an
// explicit `scope`.
bring cloud;

class MyClass {
  pub static createBucket(): cloud.Bucket {
    return new cloud.Bucket();
  }
  pub static createMyClass(): MyClass {
    return new MyClass();
  }
}

MyClass.createMyClass();
MyClass.createBucket();