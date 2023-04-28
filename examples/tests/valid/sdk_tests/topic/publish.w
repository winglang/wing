bring cloud;

let t = new cloud.Topic();
let c = new cloud.Counter();

t.on_message(inflight(e: str) => {
  c.inc();
});

t.on_message(inflight(e: str) => {
  c.inc();
});

new cloud.Function(inflight() => {
  t.publish("1");
  t.publish("2");
  t.publish("3");
  t.publish("4");
  t.publish("5");
  assert(c.peek() == 10);
}) as "test:publish";