// This file was auto generated from an example found in: 04-tests.md_example_3
// Example metadata: {"valid":true}
bring cloud;

let b = new cloud.Bucket();

test "bucket list should include created file" {
  b.put("file", "lorem ipsum");
  let listOfFile = b.list();
  assert(listOfFile.length == 1);
}

test "bucket starts empty" {
  let listOfFile = b.list();
  assert(listOfFile.length == 0);
}
