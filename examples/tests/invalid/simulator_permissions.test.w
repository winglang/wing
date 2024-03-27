bring cloud;

let buckets = [
  new cloud.Bucket() as "b1",
  new cloud.Bucket() as "b2"
];

test "incorrect resource permission" {
  // This should fail because permission is granted to b2, not b1
  lift(buckets.at(1), ["put"]);
  let var i = 10;
  while i > 0 {
    i -= 1;
  }
  buckets.at(i).put("key", "value");
}

test "incorrect permission operation" {
  // This should fail because permission is granted for "list", not "put"
  lift(buckets.at(0), ["list"]);
  let var i = 10;
  while i > 0 {
    i -= 1;
  }
  buckets.at(i).put("key", "value");
}
