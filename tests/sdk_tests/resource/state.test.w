bring fs;
bring sim;
bring util;

inflight class ResourceWithStateBackend impl sim.IResource {
  ctx: sim.IResourceContext;
  new(ctx: sim.IResourceContext) { this.ctx = ctx; }
  pub onStop() {}

  pub writeState() {
    let file = fs.join(this.ctx.statedir(), "state.txt");
    fs.writeFile(file, "my state");
  }

  pub readState(): str {
    let file = fs.join(this.ctx.statedir(), "state.txt");
    return fs.readFile(file);
  }
}

class ResourceWithState {
  backend: sim.Resource;

  new() {
    this.backend = new sim.Resource(inflight (ctx) => {
      return new ResourceWithStateBackend(ctx);
    });
  }

  pub inflight writeState() {
    this.backend.call("writeState");
  }

  pub inflight readState(): str {
    return str.fromJson(this.backend.call("readState"));
  }
}

// Only run these tests in the simulator
if util.env("WING_TARGET") == "sim" {
  let r = new ResourceWithState();

  test "sim.Resource can read and write state" {
    r.writeState();
    assert(r.readState() == "my state");
  }
}
