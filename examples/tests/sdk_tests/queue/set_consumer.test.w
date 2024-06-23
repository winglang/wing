bring cloud;
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

let q3 = new cloud.Queue() as "q3";
let c3 = new cloud.Counter() as "c3";

q3.setConsumer(inflight (message) => {
  util.sleep(10s);
  c3.inc();
});

test "messages pushed to queue can be processed concurrently" {
  let t1 = datetime.utcNow();
  q3.push("message1");
  q3.push("message2");
  q3.push("message3");

  util.waitUntil(inflight () => { return c3.peek() == 3; });

  let t2 = datetime.utcNow();
  let elapsed = duration.fromMilliseconds(t2.timestampMs - t1.timestampMs);

  // If the messages were processed concurrently, the elapsed time should be less than 20s.
  // Note: even though there is only one consumer, the consumer's default concurrency is more than 1.
  assert(elapsed.seconds < 20, "Messages were likely not processed concurrently");
}
