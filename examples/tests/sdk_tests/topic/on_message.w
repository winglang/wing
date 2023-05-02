bring cloud;

let t = new cloud.Topic();
let c = new cloud.Counter();

t.on_message(inflight() => {
  c.inc();
});

t.on_message(inflight() => {
  c.inc();
});

new cloud.Function(inflight() => {
  for i in 0..5 {
    t.publish("msg");
  }
  assert(c.peek() == 10);
}) as "test:on_message";
