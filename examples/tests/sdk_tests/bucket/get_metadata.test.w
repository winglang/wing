bring cloud;

let b = new cloud.Bucket();

test "getMetadata()" {
  b.put("file1.main.w", "Foo");
  b.put("file2.txt", "Bar",);
  b.put("file3.txt", "Baz", { contentType: "application/json" });

  let file1Metadata = b.getMetadata("file1.main.w");
  assert(file1Metadata.size == 3);
  assert(file1Metadata.contentType == "application/octet-stream");
  assert(file1Metadata.lastModified.year >= 2023);

  let file2Metadata = b.getMetadata("file2.txt");
  assert(file2Metadata.size == 3);
  assert(file2Metadata.contentType == "text/plain");
  assert(file2Metadata.lastModified.year >= 2023);

  let file3Metadata = b.getMetadata("file3.txt");
  assert(file3Metadata.size == 3);
  assert(file3Metadata.contentType == "application/json");
  assert(file3Metadata.lastModified.year >= 2023);

  try {
    b.getMetadata("no-such-file.txt");
  } catch e {
    assert(e.contains("Object does not exist (key=no-such-file.txt)."));
  }
}
