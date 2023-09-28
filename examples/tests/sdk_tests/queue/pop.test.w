bring cloud;

let q = new cloud.Queue();

test "pop" {
  q.push("Foo", "Bar");

  let first = q.pop();
  let second = q.pop();
  let third = q.pop();

  // queue is not FIFO
  assert(first == "Foo" || first == "Bar");
  assert(second == "Foo" || second == "Bar");
  assert(third == nil);
}
