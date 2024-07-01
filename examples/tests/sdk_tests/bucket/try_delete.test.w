bring cloud;

let b = new cloud.Bucket();

test "tryDelete" {
  let jsonObj2 = Json { key2: "value2" };

  b.put("file1.txt", "Foo");

  assert(b.tryDelete("file1.txt") == true);
  assert(b.tryDelete("file1.txt") == false);
  assert(b.tryDelete("random") == false);

  b.put("file2.txt", "Bar");
  b.putJson("file2.json", jsonObj2);

  assert(b.tryDelete("file2.txt") == true);
  assert(b.tryDelete("file2.json") == true);
  assert(b.tryDelete("file2.txt") == false);
  assert(b.tryDelete("file2.json") == false);
}