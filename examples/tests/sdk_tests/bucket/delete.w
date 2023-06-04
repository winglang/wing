bring cloud;

let b = new cloud.Bucket();
b.addObject("file2.txt", "Bar");

test "delete" {
  let jsonObj1 = Json { key1: "value1" };

  b.putJson("file1.json", jsonObj1);
  b.delete("file1.txt");

  assert(b.exists("file1.json"));
  assert(b.exists("file2.txt"));

  b.delete("file1.json", { mustExist: true });
  try {
    b.delete("file1.json", { mustExist: true });
  } catch e {
    assert(e == "Object does not exist (key=file1.json).");
  }

  assert(b.exists("file2.txt"));

  b.delete("file2.txt");

  assert(!b.exists("file2.txt"));
}