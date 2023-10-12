bring cloud;

let b = new cloud.Bucket();

test "metadata" {
  b.put("test1.txt", "Foo");

  assert(b.metadata("test1.txt").size == 3);
  assert(b.metadata("test1.txt").contentType == "application/octet-stream");
  assert(b.metadata("test1.txt").lastModified.year >= 2023);

  try {
    b.metadata("no-such-file.txt").lastModified;
  } catch e {
    assert(e == "Object does not exist (key=no-such-file.txt).");
  }
}
