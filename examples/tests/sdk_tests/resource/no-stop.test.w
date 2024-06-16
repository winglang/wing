bring sim;
bring expect;
bring util;

class Simple {
  pub foo: str;
  new() {
    let r = new sim.Resource(inflight (ctx) => {
      ctx.resolveToken("foo", "bar");
    });

    this.foo = r.createToken("foo");
  }
}

let s = new Simple();

test "token is resolved" {
  if (util.tryEnv("WING_TARGET") == "sim") {
    expect.equal(s.foo, "bar");
  }
}
