bring cloud;
bring "./subdir2" as subdir;

let b = new cloud.Bucket();

inflight class Foo {
  pub uploadToBucket(k: str, value: str) {
    b.put(k, value);
    assert(b.get(k) == value);
  }

  static pub fooStatic() {
    b.put("a", "b");
    assert(b.list() == ["a"]);
  }
}

test "inflight class captures preflight resource" {
  let f = new Foo();
  f.uploadToBucket("hello.txt", "world");
}

test "inflight class type captures preflight resource" {
  Foo.fooStatic();
}


let getFoo = inflight () => {
  return new Foo();
};

test "inflight class qualified without explicit reference" {
  // Get instance of Foo without mentioning the type
  let foo = getFoo();
  // Now Foo needs to be qualified correcly
  foo.uploadToBucket("greetings.txt", "universe");
}

test "inflight class defined inflight captures preflight object" {
  class Foo2 {
    pub uploadToBucket() {
      b.put("x", "y");
      assert(b.get("x") == "y");
    }
  }

  let f = new Foo2();
  f.uploadToBucket();
}

test "bring inflight class from subdir" {
  let x = new subdir.InflightClass();
  assert(x.method() == "What did you expect?");
}
