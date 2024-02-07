bring tf_aws;
bring cloud;
bring util;


if util.env("WING_TARGET") == "tf-aws" {
  let bucket = tf_aws.Bucket.fromBucketName(this, "some-existing-bucket-name");

  new cloud.Function(inflight (msg: str) => {
    bucket.put("somefile.txt", "wow this goes in an existing bucket!");
  });
}
