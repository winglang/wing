bring sim;
bring util;

inflight class MyResourceBackend impl sim.IResource {
  ctx: sim.IResourceContext;
  new(ctx: sim.IResourceContext) { this.ctx = ctx; }
  pub onStop() {}
}

class MyResource {
  backend: sim.Resource;

  new() {
    this.backend = new sim.Resource(inflight (ctx) => {
      return new MyResourceBackend(ctx);
    });
  }

  pub fakeAttr(): str {
    return this.backend.createToken("fake-attr");
  }
}

// Only run these tests in the simulator
if util.env("WING_TARGET") == "sim" {
  let r = new MyResource();
  let fakeAttr = r.fakeAttr();

  test "test cannot access unresolved token" {
    log(fakeAttr);
  }
}
