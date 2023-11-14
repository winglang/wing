bring cloud;

let b = new cloud.Bucket();

test "metadata()" {
  b.put("file1.main.w", "Foo");
  b.put("file2.txt", "Bar");
  b.put("file3.txt", "Baz", { contentType: "application/json" });
  b.putJson("file4.txt", "Qux");

  let file1Metadata = b.metadata("file1.main.w");
  assert(file1Metadata.size == 3);
  assert(file1Metadata.contentType == "application/octet-stream");
  assert(file1Metadata.lastModified.year >= 2023);

  let file2Metadata = b.metadata("file2.txt");
  assert(file2Metadata.size == 3);
  assert(file2Metadata.contentType == "text/plain");
  assert(file2Metadata.lastModified.year >= 2023);

  let file3Metadata = b.metadata("file3.txt");
  assert(file3Metadata.size == 3);
  assert(file3Metadata.contentType == "application/json");
  assert(file3Metadata.lastModified.year >= 2023);

  let file4Metadata = b.metadata("file4.txt");
  assert(file4Metadata.size == 5);
  assert(file4Metadata.contentType == "application/json");
  assert(file4Metadata.lastModified.year >= 2023);

  try {
    b.metadata("no-such-file.txt");
  } catch e {
    assert(e.contains("Object does not exist (key=no-such-file.txt)."));
  }
}
