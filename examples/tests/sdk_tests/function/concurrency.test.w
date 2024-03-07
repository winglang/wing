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
      assert(e.contains("Too many requests, the function has reach its concurrency limit"));
      return;
    }
  
    log("No error thrown");
    assert(false);
  }
}
