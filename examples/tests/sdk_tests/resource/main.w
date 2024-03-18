bring cloud;
bring sim;
bring util;
bring math;

// sim.Resource is a base class for custom simulated resources
class MyCounter extends sim.Resource {
  inflight var count: num;
  inflight new() { this.count = 0; }

  pub inflight start(ctx: sim.IResourceContext) {}
  pub inflight stop() {}

  pub inflight inc(): num {
    this.count += 1;
    return this.count;
  }
  pub inflight peek(): num {
    return this.count;
  }
}

let c1 = new MyCounter() as "c1";

let worker = new cloud.Function(inflight () => {
  c1.inc();
}) as "IncCounter";

// send many concurrent requests to the singleton counter resource
let addTraffic = new cloud.Function(inflight () => {
  for _ in 0..100 {
    worker.invokeAsync();
  }
}) as "AddTraffic";

test "counter resource" {
  addTraffic.invoke();
  util.sleep(1s);
  assert(c1.peek() == 100);
}
