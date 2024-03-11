bring sim;
bring fs;

class MyResource extends sim.Resource {
  pub inflight start(ctx: sim.IResourceContext) {
    log("hello, world");
    ctx.resolveAttribute("foo", "bar");
    fs.writeFile("/tmp/boom.txt", "bam");
  }

  pub inflight stop() {
    log("stopping!");
  }
}

new MyResource();
