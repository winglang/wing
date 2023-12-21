bring cloud;
bring util;

let counter = new cloud.Counter();

let fn = new cloud.Function(inflight (input: str) => {
  log("log inside fn");
  util.sleep(3s);
  counter.inc();
});

test "invoke() waits for function to finish" {
  assert(counter.peek() == 0);
  fn.invoke("");
  assert(counter.peek() == 1);
}

test "invokeAsync() returns without waiting for the function finishes" {
  assert(counter.peek() == 0);
  fn.invokeAsync("");
  assert(counter.peek() == 0);
  util.waitUntil(() => {
    return counter.peek() == 1;
  }, timeout: 15s);
}
