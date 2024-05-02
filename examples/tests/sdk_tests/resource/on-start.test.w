bring sim;

inflight class OnStartThrowerBackend impl sim.IResource {
  pub onStart(ctx: sim.IResourceContext) {
    throw "unexpected error!";
  }
  pub onStop() {}
  pub noop() {}
}

class OnStartThrower {
  backend: sim.Resource;

  new() {
    this.backend = new sim.Resource(inflight () => {
      return new OnStartThrowerBackend();
    });
  }

  pub inflight noop() {
    this.backend.call("noop");
  }
}

let r = new OnStartThrower();

test "method calls fail if the resource fails to start" {
  let var msg = "";
  try {
    r.noop();
  } catch err {
    msg = err;
  }
  assert(msg.contains("resource not started"));
}
