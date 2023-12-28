bring cloud;
bring util;

let q = new cloud.Queue();
let c = new cloud.Counter();

q.setConsumer(inflight (msg: str) => {
  c.inc();
});

test "setConsumer" {
  q.push("hello", "world");

  assert(util.waitUntil(
    inflight () => { return c.peek() == 2; }, timeout: 10m, interval: 1s
  ));
}
