bring cloud;

let b = new cloud.Bucket();
let x = 12;

// make sure capture happens in binary expressions
test "binary expressions" {
  b.put("file", "foo");
  assert(b.get("file") == "foo");
  assert(12 == x);
}
