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
    let factory = inflight (): sim.IResource => {
      return new OnStartThrowerBackend();
    };

    this.backend = new sim.Resource(factory);
  }

  pub inflight noop() {
    this.backend.call("noop");
  }
}

let r = new OnStartThrower();

test "something happens if the onStart method fails" {
  let var msg = "";
  try {
    r.noop();
  } catch err {
    msg = err;
  }
  assert(msg.contains("resource not started"));
}
