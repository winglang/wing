bring cloud;
bring math;
bring util;

let q = new cloud.Queue();
let c = new cloud.Counter();

q.setConsumer(inflight (msg: str) => {
  c.inc();
});

test "setConsumer" {
  q.push("hello", "world");

  util.waitUntil(
    inflight () => { return c.peek() == 2; }, timeout: 10m, interval: 1s
  );
}


let q2 = new cloud.Queue() as "q2";
let c2 = new cloud.Counter() as "c2";

q2.setConsumer(inflight (message) => {
  if message == "hello" {
    q2.push("world");
  }
  c2.inc();
});

test "function can push back to the queue" {
  q2.push("hello");
  util.waitUntil(inflight () => { return c2.peek() >= 2; });
}
