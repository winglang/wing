bring cloud;

let q = new cloud.Queue();

test "pop" {
  q.push("Foo", "Bar");

  let first = q.pop();
  let second = q.pop();
  let third = q.pop();

  assert(first == "Foo");
  assert(second == "Bar");
  assert(third == nil);
}