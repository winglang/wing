// This file was auto generated from an example found in: 32-testing.md_example_1
// Example metadata: {"valid":false}
bring math;
bring cloud;
let b = new cloud.Bucket();

test "abs" {
  assert(1 == math.abs(-1));
}

test "bucket list should include created file" {
  b.put("file", "lorem ipsum");
  let listOfFile = b.list();
  assert(listOfFile.length == 1);
}

test "bucket starts empty" {
  let listOfFile = b.list();
  assert(listOfFile.length == 0);
}

test "this test fails" {
  throw "test throws an exception fails";
}
