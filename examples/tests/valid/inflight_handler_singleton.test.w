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

  pub inflight get(): num {
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

  // the simulator intentionally reuses the sandbox across invocations
  // but we can't trust that this will always happen on the cloud
  if sim {
    expect.equal(y, "101");
    log("client has been reused");
  }

  expect.equal(z, "100-fn2"); // fn2 should have a separate instance
}

// a function that takes at least three seconds to run
let fn3 = new cloud.Function(inflight () => {
  let n = foo.inc();
  util.sleep(3s);
  assert(n == foo.get());
}) as "fn3";

test "Foo state is not shared between function invocations" {
  // start two invocations of fn, staggering them by 1 second
  fn3.invokeAsync("");
  util.sleep(1s);
  fn3.invoke("");
}
