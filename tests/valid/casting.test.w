bring cloud;
bring util;
bring "@cdktf/provider-aws" as aws;

let b = new cloud.Bucket();

if util.env("WING_TARGET") == "tf-aws" {
  let s3Bucket: aws.s3Bucket.S3Bucket = unsafeCast(b.node.findChild("Default"));
  
  s3Bucket.addOverride("bucket_prefix", "my-prefix-");
  log(s3Bucket.node.path);
}
