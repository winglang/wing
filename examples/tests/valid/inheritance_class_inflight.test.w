bring expect;

class FooBase {
  pub inflight bug(): num { return 42; }
  pub inflight over_inflight(): num { return 123; }
}

class Foo extends FooBase {
  pub inflight bang(): Array<str> { return ["hi"]; }
  pub inflight over_inflight(): num { return 456; }
}

let foo = new Foo();

test "class inheritence" {
  expect.equal(foo.bang(), ["hi"]);
  expect.equal(foo.bug(), 42);
  expect.equal(foo.over_inflight(), 456);
}