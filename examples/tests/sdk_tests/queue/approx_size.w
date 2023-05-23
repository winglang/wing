bring cloud;

let q = new cloud.Queue();

test "approxSize" {
  assert(q.approxSize() == 0);
  q.push("message");
  assert(q.approxSize() == 1);
}
