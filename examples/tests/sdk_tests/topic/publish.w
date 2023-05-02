bring cloud;

let t = new cloud.Topic();
let c = new cloud.Counter();

t.on_message(inflight(e: str) => {
  assert(e == "1");
  c.inc();
});

new cloud.Function(inflight() => {
  t.publish("1");
  assert(c.peek() == 1);
}) as "test:publish";