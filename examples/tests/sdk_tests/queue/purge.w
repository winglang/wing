bring cloud;

let q = new cloud.Queue();

test "purge" {
  q.push("foo");
  q.push("bar");
  q.push("baz");
  assert(q.approxSize() == 3);
  q.purge();
  assert(q.approxSize() == 0);
}
