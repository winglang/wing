bring cloud;
bring util;

let t = new cloud.Topic();
let c = new cloud.Counter();

t.onMessage(inflight() => {
  c.inc();
});

t.onMessage(inflight() => {
  c.inc();
});

test "onMessage" {
  for i in 0..5 {
    t.publish("msg");
  }

  util.waitUntil(inflight () => {
    return c.peek() == 10;
  }, timeout: 10s);
}
