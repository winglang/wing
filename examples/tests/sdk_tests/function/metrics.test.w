bring cloud;
bring util;
bring math;

let fn = new cloud.Function(inflight () => {
  util.sleep(0.5s);
  log("done");
  if math.random() > 0.5 {
    throw "uh oh";
  }
});

let mduration = fn.metrics.duration;
let merrors = fn.metrics.errors;

test "publish and query metrics" {
  fn.invokeAsync();
  fn.invokeAsync();
  fn.invokeAsync();
  util.sleep(1s);
  log(Json.stringify(mduration.query()));
  log(Json.stringify(merrors.query()));
}
