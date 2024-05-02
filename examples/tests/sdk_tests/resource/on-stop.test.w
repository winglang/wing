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
    let factory = inflight (): sim.IResource => {
      return new OnStopThrowerBackend();
    };

    this.backend = new sim.Resource(factory);
  }

  pub inflight noop() {
    this.backend.call("noop");
  }
}

let r = new OnStopThrower();

test "something happens if the OnStop method fails" {
  r.noop();
}
