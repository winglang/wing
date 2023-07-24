bring cloud;

let bucket = new cloud.Bucket();
let queue = new cloud.Queue();
let counter = new cloud.Counter();

new cloud.Function(inflight (event: str) => {
  bucket.put("test", "hallo");
});


test "Increment counter" {
  let previous = counter.inc();
  log("Assertion should fail: ${previous} === ${counter.peek()}");
  assert(previous == 1);
}
