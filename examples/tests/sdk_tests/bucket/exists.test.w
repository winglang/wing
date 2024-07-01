bring cloud;

let b = new cloud.Bucket();

test "exists" {
  b.put("test1.txt", "Foo");

  assert(b.exists("test1.txt"));
  assert(!b.exists("test2.txt"));

  b.put("test2.txt", "Bar");

  assert(b.exists("test2.txt"));

  b.delete("test1.txt");

  assert(!b.exists("test1.txt"));
}