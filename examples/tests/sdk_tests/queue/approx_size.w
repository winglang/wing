bring cloud;

let q = new cloud.Queue();

test "test" {
  assert(q.approx_size() == 0);
  q.push("message");
  assert(q.approx_size() == 1);
}
