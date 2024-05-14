bring sim;
bring util;

inflight class BadTokenResolverBackend impl sim.IResource {
  ctx: sim.IResourceContext;
  new(ctx: sim.IResourceContext) { this.ctx = ctx; }
  pub onStop() {}

  pub foo() {
    this.ctx.resolveToken("my-attr", "value");
  }
}

class BadTokenResolver {
  backend: sim.Resource;

  new() {
    this.backend = new sim.Resource(inflight (ctx) => {
      return new BadTokenResolverBackend(ctx);
    });
  }

  pub inflight foo() {
    this.backend.call("foo");
  }
}

// Only run these tests in the simulator
if util.env("WING_TARGET") == "sim" {
  let r = new BadTokenResolver();

  test "calling resolveToken during a method call emits an error" {
    let var msg = "";
    try {
      r.foo();
    } catch err {
      msg = err;
    }
    assert(msg.contains("cannot resolve attributes outside of onStop method"));
  }
}
