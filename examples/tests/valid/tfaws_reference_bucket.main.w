bring tf_aws;
bring cloud;


let bucket = tf_aws.Bucket.fromBucketName(this, "some-existing-bucket-name");

new cloud.Function(inflight (msg: str) => {
  bucket.put("somefile.txt", "wow this goes in an existing bucket!");
});