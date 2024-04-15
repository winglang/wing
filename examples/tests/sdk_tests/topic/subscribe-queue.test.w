bring cloud;
bring util;

let msg_test = "Hello World!!1";

let c = new cloud.Counter();

let t = new cloud.Topic();
t.onMessage(inflight (msg: str) => {
  if msg == msg_test {
    c.inc(1, "t");
  }
});

let q1 = new cloud.Queue() as "q1";
q1.setConsumer(inflight (msg: str) => {
  if msg == msg_test {
    c.inc(1, "q1");
  }
});
t.subscribeQueue(q1);

let q2 = new cloud.Queue() as "q2";
q2.setConsumer(inflight (msg: str) => {
  if msg == msg_test {
    c.inc(1, "q2");
  }
});
t.subscribeQueue(q2);

test "functions and queues receiving messages from the topic" {
  t.publish(msg_test);
  assert(util.waitUntil(inflight () => { return c.peek("q1") == 1; }));
  assert(util.waitUntil(inflight () => { return c.peek("q2") == 1; }));
  assert(util.waitUntil(inflight () => { return c.peek("t") == 1; }));
}
