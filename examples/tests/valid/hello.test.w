bring cloud;

let bucket = new cloud.Bucket();

test "test1" {
  bucket.put("key", "value");
}

test "test2" {
  assert(bucket.list().length == 0, "Bucket should be empty");
}
