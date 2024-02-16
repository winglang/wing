bring cloud;

let b = new cloud.Bucket();

inflight class Foo {
  pub uploadToBucket(k: str, value: str) {
    b.put(k, value);
    assert(b.get(k) == value);
    log(b.get(k));
  }
}

test "inflight class captures preflight resource" {
  let f = new Foo();
  f.uploadToBucket("hello.txt", "world");
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
