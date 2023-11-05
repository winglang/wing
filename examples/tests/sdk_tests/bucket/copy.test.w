bring cloud;
bring util;

let b = new cloud.Bucket();

test "copy()" {
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
  let OBJECT_DOES_NOT_EXIST_ERROR = "Unable to copy. Source object does not exist (srcKey=${UNEXISTING_KEY}).";

  let KEY1 = "file1.main.w";
  let VALUE1 = "bring cloud;";
  let KEY2 = "file2.txt";
  let VALUE2 = { msg: "Hello world!" };

  b.put(KEY1, VALUE1);
  b.putJson(KEY2, VALUE2);
  let file1SrcMetadata = b.metadata(KEY1);
  let file2SrcMetadata = b.metadata(KEY2);

  // Sleep 2s to ensure 'metadata.lastModified' changes upon copy.
  util.sleep(2s);

  b.copy(KEY1, KEY1);
  b.copy(KEY2, "dir/${KEY2}");
  let file1DstMetadata = b.metadata(KEY1);
  let file2DstMetadata = b.metadata("dir/${KEY2}");

  assert(file1SrcMetadata.contentType == file1DstMetadata.contentType);
  assert(file1SrcMetadata.size == file1DstMetadata.size);
  assert(file1SrcMetadata.lastModified != file1DstMetadata.lastModified);

  assert(file2SrcMetadata.contentType == file2DstMetadata.contentType);
  assert(file2SrcMetadata.size == file2DstMetadata.size);
  assert(file2SrcMetadata.lastModified != file2DstMetadata.lastModified);
  assert(b.get(KEY2) == b.get("dir/${KEY2}"));

  assertThrows(OBJECT_DOES_NOT_EXIST_ERROR, () => {
    b.copy(UNEXISTING_KEY, KEY1);
  });
}