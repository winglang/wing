bring cloud;

let q = new cloud.Queue();

new cloud.Function(inflight () => {
  q.push("foo");
  q.push("bar");
  q.push("baz");
  assert(q.approxSize() == 3);
  q.purge();
  assert(q.approxSize() == 0);
}) as "test";