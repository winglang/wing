bring "@cdktf/provider-aws" as aws;

new aws.s3Bucket.S3Bucket(
  bucket_prefix: "hello",
  versioning: aws.s3Bucket.S3BucketVersioning {
    enabled: true,
    mfa_delete: true,
  },
) as "Bucket";
