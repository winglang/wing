bring cloud;
bring expect;

let b = new cloud.Bucket();

test "get range of an object" {
  let assertThrows = (expected: str, block: (): void) => {
    let var error = false;
    try {
      block();
    } catch actual {
      assert(actual.contains(expected), "Expected error to contain: \"{expected}\" but got: \"{actual}");
      error = true;
    }
    assert(error);
  };

  b.put("test1.txt", "12345");

  expect.equal(b.get("test1.txt", startByte: 1, endByte: 3), "234");
  expect.equal(b.get("test1.txt", startByte: 1), "2345");
  expect.equal(b.get("test1.txt", endByte: 3), "1234");

  b.put("test2.txt", "𠮷");

  expect.equal(b.get("test2.txt", startByte: 0, endByte: 3), "𠮷");

  assertThrows("The encoded data was not valid for encoding utf-8", () => {
    b.get("test2.txt", startByte: 0, endByte: 2);
  });
}

test "get empty object" {
  b.put("empty.txt", "");

  expect.equal(b.get("empty.txt"), "");
}
