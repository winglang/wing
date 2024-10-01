bring cloud;

let bucket = new cloud.Bucket();

test "Bucket is empty" {
  assert(bucket.list().length == 0);
}