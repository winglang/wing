bring cloud;

let b = new cloud.Bucket();
b.addObject("file3.txt", "Baz");

test "delete" {
  let jsonObj1 = Json { key1: "value1" };

  b.putJson("file1.json", jsonObj1);
  b.delete("file1.txt");

  assert(b.list().length == 2);

  b.delete("file1.json", { mustExist: true });
  b.delete("file1.json", { mustExist: false });

  assert(b.list().length == 1);

  b.delete("file3.txt");

  assert(b.list().length == 0);
}