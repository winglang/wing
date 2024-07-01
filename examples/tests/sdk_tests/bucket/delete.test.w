bring cloud;

let b = new cloud.Bucket();
b.addObject("file2.txt", "Bar");

test "delete" {
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

  let OBJECT_DOES_NOT_EXIST_ERROR = "Object does not exist (key=file1.json).";
  let jsonObj1 = Json { key1: "value1" };

  b.putJson("file1.json", jsonObj1);
  b.delete("file1.txt");

  assert(b.exists("file1.json"));
  assert(b.exists("file2.txt"));

  b.delete("file1.json", mustExist: true);

  assertThrows(OBJECT_DOES_NOT_EXIST_ERROR, () => {
    b.delete("file1.json", mustExist: true);
  });
  assert(b.exists("file2.txt"));

  b.delete("file2.txt");

  assert(!b.exists("file2.txt"));
}
