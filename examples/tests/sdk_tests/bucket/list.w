bring cloud;

let b = new cloud.Bucket();

test "list" {
  assert(b.list().length == 0);

  b.put("file1.txt", "Foo");
  b.put("file2.txt", "Bar");
  b.put("random", "Buz");

  let objs = b.list();
  let objs2 = b.list("file");

  assert(objs.at(0) == "file1.txt");
  assert(objs.at(1) == "file2.txt");
  assert(objs.at(2) == "random");

  assert(objs2.at(0) == "file1.txt");
  assert(objs2.at(1) == "file2.txt");
  assert(!(objs2.at(2) == "random"));

  assert(objs.length == 3);
  assert(objs2.length == 2);
}