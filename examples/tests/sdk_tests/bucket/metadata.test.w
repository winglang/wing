bring cloud;
bring expect;

let b = new cloud.Bucket();

test "metadata()" {
  let assertThrows = (expected: str, block: (): void) => {
    let var error = false;
    try {
      block();
    } catch actual {
      assert(actual.contains(expected));
      error = true;
    }
    assert(error);
  };
  let UNEXISTING_KEY = "no-such-file.txt";
  let OBJECT_DOES_NOT_EXIST_ERROR = "Object does not exist (key={UNEXISTING_KEY}).";

  let KEY1 = "file1.main.w";
  let VALUE1 = "Foo";
  let KEY2 = "file2.txt";
  let VALUE2 = "Bar";
  let KEY3 = "file3.txt";
  let VALUE3 = "Baz";
  let KEY4 = "file4.txt";
  let VALUE4 = "Quz";

  b.put(KEY1, VALUE1);
  b.put(KEY2, VALUE2);
  b.put(KEY3, VALUE3, { contentType: "application/json" });
  b.putJson(KEY4, VALUE4);

  let file1Metadata = b.metadata(KEY1);
  expect.equal(file1Metadata.size, 3);
  expect.equal(file1Metadata.contentType, "application/octet-stream");
  assert(file1Metadata.lastModified.year >= 2023);

  let file2Metadata = b.metadata(KEY2);
  expect.equal(file2Metadata.size, 3);
  expect.equal(file2Metadata.contentType, "text/plain");
  assert(file2Metadata.lastModified.year >= 2023);

  let file3Metadata = b.metadata(KEY3);
  expect.equal(file3Metadata.size, 3);
  expect.equal(file3Metadata.contentType, "application/json");
  assert(file3Metadata.lastModified.year >= 2023);

  let file4Metadata = b.metadata(KEY4);
  expect.equal(file4Metadata.size, 5);
  expect.equal(file4Metadata.contentType,"application/json");
  assert(file4Metadata.lastModified.year >= 2023);

  assertThrows(OBJECT_DOES_NOT_EXIST_ERROR, () => {
    b.metadata(UNEXISTING_KEY);
  });
}
