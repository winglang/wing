bring cloud;

let b = new cloud.Bucket();

test "put" {
  assert(b.list().length == 0);
  b.put("hello.txt", "world");
  assert(b.list().length == 1);
}

test "get" {
  b.put("hello.txt", "world");
  assert(b.get("hello.txt") == "world");
}
