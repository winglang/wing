bring sim;
bring expect;

class Simple {
  pub foo: str;
  new() {
    let r = new sim.Resource(inflight (ctx) => {
      ctx.resolveToken("foo", "bar");
    });

    this.foo = r.createToken("foo");
  }
}

// Only run these tests in the simulator
if @target == "sim" {
  let s = new Simple();

  test "token is resolved" {
    expect.equal(s.foo, "bar");
  }
}
