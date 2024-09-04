bring cloud;
bring "constructs" as constructs;
bring expect;

class BucketFactory {
  pub static makeBucket(scope: constructs.IConstruct): cloud.Bucket {
    let bucket = new cloud.Bucket() in scope;
    // apply customizations to bucket...
    return bucket;
  }
}

// Test that we can use the factory pattern by passing top-level "this"
let bucket = BucketFactory.makeBucket(this);
log(nodeof(bucket).path);

test "can use bucket" {
  bucket.put("hello", "world");
  expect.equal(bucket.list().length, 1);
}

test "can use other bucket" {
  bucket.put("yo", "sup");
  expect.equal(bucket.list().length, 1);
}
