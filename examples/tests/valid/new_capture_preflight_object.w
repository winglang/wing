bring cloud;

let b = new cloud.Bucket();

// test "test" {
//   b.put("hello.txt", "world");
//   assert(b.get("hello.txt") == "world");
// }

test "nested reference" {
  assert(b.list().length == 0);
}