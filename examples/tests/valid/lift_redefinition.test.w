let y = "hello";

test "test" {
  assert(y == "hello");
  let y = "z";
  assert(y == "z");
}
