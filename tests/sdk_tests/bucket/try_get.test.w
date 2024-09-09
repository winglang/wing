bring cloud;

let b = new cloud.Bucket();

test "tryGet" {
  b.put("test1.txt", "Foo");

  assert(b.tryGet("test1.txt") == "Foo");
  assert(b.tryGet("test2.txt") == nil);

  b.put("test2.txt", "Bar");

  assert(b.tryGet("test2.txt") == "Bar");

  b.delete("test1.txt");

  assert(b.tryGet("test1.txt") == nil);
}