bring cloud;

let b = new cloud.Bucket();

test "list" {
  let var testArray = MutArray<str>[];

  assert(b.list().length == 0);

  b.put("file1.txt", "Foo");
  b.put("file2.txt", "Bar");

  testArray = b.list().copyMut();

  assert(b.get(testArray.at(0)) == "Foo");
  assert(b.get(testArray.at(1)) == "Bar");

  b.delete("file1.txt");
  
  assert(b.list().length == 1);
}