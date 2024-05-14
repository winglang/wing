bring sim;

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

let r = new MyResource();
let fakeAttr = r.fakeAttr();

test "test cannot access unresolved token" {
  log(fakeAttr);
}
