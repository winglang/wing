bring cloud;
bring "@cdktf/provider-aws" as aws;

let b = new cloud.Bucket();

if @target == "tf-aws" {
  let s3Bucket: aws.s3Bucket.S3Bucket = unsafeCast(nodeof(b).findChild("Default"));
  
  s3Bucket.addOverride("bucket_prefix", "my-prefix-");
  log(nodeof(s3Bucket).path);
}
