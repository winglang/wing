bring cloud;

let q = new cloud.Queue();

test "test" {
  q.push("foo");
  q.push("bar");
  q.push("baz");
  assert(q.approx_size() == 3);
  q.purge();
  assert(q.approx_size() == 0);
}
