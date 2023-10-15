bring cloud;

let b = new cloud.Bucket();

test "metadata" {
  b.put("test1.txt", "Foo");

  let metadata = b.metadata("test1.txt");
  assert(metadata.size == 3);
  assert(metadata.contentType == "application/octet-stream");
  assert(metadata.lastModified.year >= 2023);

  try {
    b.metadata("no-such-file.txt").lastModified;
  } catch e {
    assert(e.contains("Object does not exist (key=no-such-file.txt)."));
  }
}
