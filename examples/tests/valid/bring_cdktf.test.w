bring "@cdktf/provider-aws" as aws;
bring "cdktf" as cdktf;

let bucket = new aws.s3Bucket.S3Bucket(
  bucketPrefix: "hello",
  versioning: {
    enabled: true,
    mfaDelete: true,
  },
) as "Bucket";
nodeof(bucket).color = "pink";

class Foo {
  new() {
    // Test importing a non-standard Construct that doesn't have a `scope`/`id` property pair as its first two arguments
    // Some of cdktf's backend constructs are like this.
    new cdktf.S3Backend(this, cdktf.S3BackendConfig {bucket: "foo", key: "bar"});
  }
}
