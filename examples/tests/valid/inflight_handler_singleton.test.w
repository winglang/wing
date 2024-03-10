bring cloud;
bring expect;
bring util;

class Foo {
  inflight var n: num;
  inflight new() {
    this.n = 99;
  }

  pub inflight inc(): num {
    this.n += 1;
    return this.n;
  }
}

let foo = new Foo();

let fn = new cloud.Function(inflight () => {
  let n = foo.inc();
  return "{n}";
});

let fn2 = new cloud.Function(inflight () => {
  let n = foo.inc();
  return "{n}-fn2";
}) as "fn2";

let sim = util.env("WING_TARGET") == "sim";

test "single instance of Foo" {
  let x = fn.invoke("");
  let y = fn.invoke("");
  let z = fn2.invoke("");

  expect.equal(x, "100");
  expect.equal(z, "100-fn2"); // fn2 should have a separate instance

  // y could be 100 or 101 depending on whether the execution environment
  // was reused or not between the two calls.
  assert(y == "100" || y == "101");
}
