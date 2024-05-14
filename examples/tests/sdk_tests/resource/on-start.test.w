bring sim;
bring util;

inflight class OnStartThrowerBackend impl sim.IResource {
  new() {
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

// Only run these tests in the simulator
if util.env("WING_TARGET") == "sim" {
  let r = new OnStartThrower();

  test "method calls fail if the resource fails to start" {
    let var msg = "";
    try {
      r.noop();
    } catch err {
      msg = err;
    }
    assert(msg.contains("Resource is not running"));
  }
}
