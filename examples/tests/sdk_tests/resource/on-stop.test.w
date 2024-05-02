bring sim;

inflight class OnStopThrowerBackend impl sim.IResource {
  pub onStart(ctx: sim.IResourceContext) {}
  pub onStop() {
    throw "unexpected error!";
  }
  pub noop() {}
}

class OnStopThrower {
  backend: sim.Resource;

  new() {
    this.backend = new sim.Resource(inflight () => {
      return new OnStopThrowerBackend();
    });
  }

  pub inflight noop() {
    this.backend.call("noop");
  }
}

let r = new OnStopThrower();

test "if a resource throws an error on stopping, it doesn't crash the simulation" {
  r.noop();
}
