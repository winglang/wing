bring cloud;

let NIL = "<<NIL>>";

let q = new cloud.Queue();

test "test" {
  let msgs = ["Foo", "Bar"];
  for msg in msgs {
    q.push(msg);
  }

  let first = q.pop() ?? NIL;
  let second = q.pop() ?? NIL;
  let third = q.pop() ?? NIL;

  assert(msgs.contains(first));
  assert(msgs.contains(second));
  assert(third == NIL);
}