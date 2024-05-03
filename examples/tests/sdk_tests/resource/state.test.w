// TODO: add a test for accessing uninitialized state

bring fs;
bring sim;

inflight class ResourceWithStateBackend impl sim.IResource {
  var ctx: sim.IResourceContext?;

  new() { this.ctx = nil; }

  pub onStart(ctx: sim.IResourceContext) { this.ctx = ctx; }
  pub onStop() {}

  pub writeState() {
    let file = fs.join(this.ctx?.statedir()!, "state.txt");
    fs.writeFile(file, "my state");
  }

  pub readState(): str {
    let file = fs.join(this.ctx?.statedir()!, "state.txt");
    return fs.readFile(file);
  }
}

class ResourceWithState {
  backend: sim.Resource;

  new() {
    this.backend = new sim.Resource(inflight () => {
      return new ResourceWithStateBackend();
    });
  }

  pub inflight writeState() {
    this.backend.call("writeState");
  }

  pub inflight readState(): str {
    return str.fromJson(this.backend.call("readState"));
  }
}

let r = new ResourceWithState();

test "sim.Resource can read and write state" {
  r.writeState();
  assert(r.readState() == "my state");
}
