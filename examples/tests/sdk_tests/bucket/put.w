bring cloud;

let b = new cloud.Bucket();

test "put" {
  b.put("test1.txt", "Foo");
  b.put("test2.txt", "Bar");

  let first = b.get("test1.txt");
  let second = b.get("test2.txt");
  
  assert(first == "Foo");
  assert(second == "Bar");

  b.delete("test1.txt");
  let files = b.list();
  
  assert(files.contains("test1.txt") == false);
  assert(files.contains("test2.txt") == true);

  b.put("test2.txt", "Baz");

  let third = b.get("test2.txt");
  assert(third == "Baz");
}