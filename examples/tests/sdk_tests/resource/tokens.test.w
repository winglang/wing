bring sim;

inflight class BadTokenResolverBackend impl sim.IResource {
  var ctx: sim.IResourceContext?;

  new() { this.ctx = nil; }

  pub onStart(ctx: sim.IResourceContext) { this.ctx = ctx; }
  pub onStop() {}

  pub foo() {
    this.ctx?.resolveToken("my-attr", "value");
  }
}

class BadTokenResolver {
  backend: sim.Resource;

  new() {
    this.backend = new sim.Resource(inflight () => {
      return new BadTokenResolverBackend();
    });
  }

  pub inflight foo() {
    this.backend.call("foo");
  }
}

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
