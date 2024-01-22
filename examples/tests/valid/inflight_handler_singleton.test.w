bring cloud;
bring expect;
bring util;

let fooInitCounter = new cloud.Counter();

class Foo {
  inflight var n: num;
  inflight new() {
    this.n = 99;
    fooInitCounter.inc();
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
  return "{n}";
}) as "cloud.Function2";

let sim = util.env("WING_TARGET") == "sim";

test "single instance of Foo" {
  let x = fn.invoke("");
  let y = fn.invoke("");

  // the simulator intentionally reuses the sandbox across invocations
  // but we can't trust that this will always happen on the cloud
  if sim {
    expect.equal(x, "100");
    expect.equal(y, "101");
    expect.equal(fooInitCounter.peek(), 1);
    log("client has been reused");
  }
}

test "separate instances of Foo" {
  expect.equal(fooInitCounter.peek(), 0);

  let x = fn.invoke("");
  let y = fn2.invoke("");

  // clients are never shared across logically distinct cloud functions
  expect.equal(x, "100");
  expect.equal(y, "100");
  expect.equal(fooInitCounter.peek(), 2);
  log("client has not been reused");
}
