bring cloud;
bring util;

let f = new cloud.Function(inflight () => {
  throw "ah!";
});

test "my test" {
  log("my log");
  f.invoke();
  util.sleep(0.5s);
  log("my log 2");
}
