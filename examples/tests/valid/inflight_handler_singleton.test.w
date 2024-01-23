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

let sim = util.env("WING_TARGET") == "sim";

test "single instance of Foo" {
  let x = fn.invoke("");
  let y = fn.invoke("");

  // the simulator intentionally reuses the sandbox across invocations
  // but we can't trust that this will always happen on the cloud
  if sim {
    expect.equal(x, "100");
    expect.equal(y, "101");
    log("client has been reused");
  }
}