// Regression test for https://github.com/winglang/wing/issues/3979
// When a test only accesses a preflight field of a preflight class, the class's
// `$inflight_init` must still be called, otherwise side effects (like writing to
// a Bucket in the init) never happen.

bring cloud;

class Foo {
  pub b: cloud.Bucket;

  new() {
    this.b = new cloud.Bucket() as "test-bucket";
  }

  inflight new() {
    this.b.put("hello.txt", "world");
  }
}

let foo = new Foo();

test "test" {
  // Only the field is accessed in the inflight test - the parent's
  // `$inflight_init` must still run for the put() to have happened.
  log(foo.b.get("hello.txt"));
  assert(foo.b.get("hello.txt") == "world");
}
