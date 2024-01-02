bring cloud;
bring util;
bring expect;

let b = new cloud.Bucket();

test "rename()" {
  let assertThrows = (expected: str, block: (): void) => {
    let var error = false;
    try {
      block();
    } catch actual {
      expect.equal(actual, expected);
      error = true;
    }
    assert(error);
  };

  let KEY1 = "original.txt";
  let VALUE1 = "Hello, Wing!";
  let KEY2 = "renamed.txt";
  let KEY3 = "to-overwrite.txt";
  let VALUE3 = "Hello, World!";
  let UNEXISTING_KEY = "no-such-obj.txt";
  let SAME_KEY_ERROR = "Renaming an object to its current name is not a valid operation (srcKey={KEY3}, dstKey={KEY3}).";
  let OBJECT_DOES_NOT_EXIST_ERROR = "Source object does not exist (srcKey={UNEXISTING_KEY}).";

  b.put(KEY1, VALUE1);
  b.put(KEY3, VALUE3);
  let obj1Metadata = b.metadata(KEY1);

  // VALID RENAME
  b.rename(KEY1, KEY2);
  let obj2Metadata = b.metadata(KEY2);
  // Check object got moved
  assert(b.exists(KEY2));
  assert(!b.exists(KEY1));
  // Check object has same content
  expect.equal(b.get(KEY2), VALUE1);
  // Check object has same metadata
  expect.equal(obj1Metadata.size, obj2Metadata.size);
  expect.equal(obj1Metadata.contentType, obj2Metadata.contentType);
  expect.equal(obj1Metadata.lastModified.year, obj2Metadata.lastModified.year);

  // VALID RENAME WITH OVERWRITE
  b.rename(KEY2, KEY3);
  let obj3Metadata = b.metadata(KEY3);
  // Check object got moved
  assert(b.exists(KEY3));
  assert(!b.exists(KEY2));
  // Check object has same content
  expect.equal(b.get(KEY3), VALUE1);
  // Check object has same metadata
  expect.equal(obj2Metadata.size, obj3Metadata.size);
  expect.equal(obj2Metadata.contentType, obj3Metadata.contentType);
  expect.equal(obj2Metadata.lastModified.year, obj3Metadata.lastModified.year);

  // INVALID RENAME
  assertThrows(SAME_KEY_ERROR, () => {
    b.rename(KEY3, KEY3);
  });

  // RENAMING NON-EXISTENT OBJECT
  assertThrows(OBJECT_DOES_NOT_EXIST_ERROR, () => {
    b.rename(UNEXISTING_KEY, "new-name.txt");
  });
}
