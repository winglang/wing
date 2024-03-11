bring cloud;
bring util;

// TODO: support concurrency on AWS

if util.env("WING_TARGET") == "sim" {
  let c = new cloud.Counter();
  
  let f1 = new cloud.Function(inflight () => {
    c.inc();
    util.sleep(5s);
  }, concurrency: 1) as "concurrency fn";
  
  test "f1 concurrency limit reached" {
    f1.invokeAsync();
    try {
      f1.invoke();
    } catch e {
      assert(e.contains("Too many requests, the function has reached its concurrency limit"));
      return;
    }
  
    log("No error thrown");
    assert(false);
  }

  let q = new cloud.Queue();

  q.setConsumer(inflight (message: str) => {
    util.sleep(1s);
    c.inc();
  }, concurrency: 1, batchSize: 1);

  test "queue applies backpressure to functions with limited concurrency" {
    q.push("m1");
    q.push("m2");
    q.push("m3");

    util.sleep(5s);

    log("c: {c.peek()}");
    assert(c.peek() == 3);
  }
}
