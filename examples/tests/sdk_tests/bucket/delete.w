bring cloud;

let b = new cloud.Bucket();

test "delete" {
  let jsonObj1 = Json { key1: "value1" };

  b.putJson("file1.json", jsonObj1);
  b.delete("file1.txt");

  assert(b.list().length == 1);

  b.delete("file1.json");
  b.delete("file1.json");

  assert(b.list().length == 0);

  b.put("file2.txt", "Foo");
  b.delete("file2.txt");

  assert(b.list().length == 0);
}