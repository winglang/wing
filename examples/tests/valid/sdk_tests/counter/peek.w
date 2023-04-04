bring cloud;

let c = new cloud.Counter();

new cloud.Function(inflight () => {
  assert(c.peek() == 0);
  assert(c.peek() == 0);
  c.inc();
  assert(c.peek() == 1);
}) as "test:peek";