bring cloud;

let b = new cloud.Bucket();
b.addObject("file3.txt", "Baz");

test "list" {
  let jsonObj1 = Json { key1: "value1" };

  assert(b.list().length == 1);

  b.putJson("file1.json", jsonObj1);
  b.put("file2.txt", "Bar");
  b.put("random", "Buz");

  let objs = b.list();
  let objs2 = b.list("file");

  assert(objs.contains("file1.json"));
  assert(objs.contains("file2.txt"));
  assert(objs.contains("file3.txt"));
  assert(objs.contains("random"));

  assert(objs2.contains("file1.json"));
  assert(objs2.contains("file2.txt"));
  assert(objs2.contains("file3.txt"));
  assert(!objs2.contains("random"));

  assert(objs.length == 4);
  assert(objs2.length == 3);
}