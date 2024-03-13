bring sim;
bring fs;
bring util;

class MyResource extends sim.Resource {
  pub inflight start(ctx: sim.IResourceContext) {
    log("start called");
    // ctx.resolveAttribute("foo", "bar");
    fs.writeFile("/tmp/boom.txt", "bam");
  }

  pub inflight do(): num {
    let text = fs.readFile("/tmp/boom.txt");
    log(text);
    return 5;
  }

  pub inflight stop() {
    log("stopping!");
  }
}

let r = new MyResource();

test "call method on MyResource" {
  let x = r.do();
  log("{x}");
  assert(x == 5);
}

class MyCounter extends sim.Resource {
  inflight var count: num;
  inflight new() {
    this.count = 0;
  }

  pub inflight start(ctx: sim.IResourceContext) {}
  pub inflight inc(): num {
    this.count += 1;
    return this.count;
  }
  pub inflight peek(): num {
    return this.count;
  }
  pub inflight stop() {}
}

let c = new MyCounter();

test "counter peek" {
  assert(c.peek() == 0);
}

test "counter inc" {
  assert(c.peek() == 0);
  assert(c.inc() == 1);
  assert(c.peek() == 1);
}

// TODO: try methods that throw errors
// TODO: resolve attributes
