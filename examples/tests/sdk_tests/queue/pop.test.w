bring cloud;
bring util;

let timeout = 3s;
let q = new cloud.Queue(timeout: timeout);

test "pop" {
  q.push("Foo", "Bar");

  let first = q.pop();
  let second = q.pop();

  // ensure messages are deleted after timeout
  util.sleep(timeout);

  let third = q.pop();

  // queue is not FIFO
  assert(first == "Foo" || first == "Bar");
  assert(second == "Foo" || second == "Bar");
  assert(third == nil);
}
