bring cloud;

let q = new cloud.Queue();

test "test" {
  q.push("foo");
  q.push("bar");
  q.push("baz");
  assert(q.approxSize() == 3);
  q.purge();
  assert(q.approxSize() == 0);
}
