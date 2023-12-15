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
      assert(actual.contains(expected));
      error = true;
    }
    assert(error);
  };

  let KEY1 = "original.txt";
  let VALUE1 = "Hello, Wing!";
  let KEY2 = "renamed.txt";
  let KEY3 = "to-overwrite.txt";
  let VALUE3 = "Hello, World!";
  let UNEXISTING_KEY = "no-such-file.txt";
  let SAME_KEY_ERROR = "Renaming an object to its current name is not a valid operation (srcKey={KEY3}, dstKey={KEY3}).";
  let OBJECT_DOES_NOT_EXIST_ERROR = "Source object does not exist (srcKey={UNEXISTING_KEY}).";

  b.put(KEY1, VALUE1);
  b.put(KEY3, VALUE3);

  // Test valid rename
  b.rename(KEY1, KEY2);
  assert(b.exists(KEY2));
  assert(!b.exists(KEY1));
  expect.equal(b.get(KEY2), VALUE1);

  // Test valid rename with overwrite
  b.rename(KEY2, KEY3);
  assert(b.exists(KEY3));
  assert(!b.exists(KEY2));
  expect.equal(b.get(KEY3), VALUE1);

  // Test invalid rename
  assertThrows(SAME_KEY_ERROR, () => {
    b.rename(KEY3, KEY3);
  });

  // Test renaming non-existent object
  assertThrows(OBJECT_DOES_NOT_EXIST_ERROR, () => {
    b.rename(UNEXISTING_KEY, "new-name.txt");
  });
}
