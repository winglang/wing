bring cloud;

let b = new cloud.Bucket();

b.addFile("file1.txt", "test-files/test1.txt");
b.addFile("file2.txt", "test-files/test2.txt");

test "addObject" {
  assert(b.list().length == 2);
  assert(b.get("file1.txt") == "test1");
  assert(b.get("file2.txt") == "test2");  
}
