bring "@cdktf/provider-aws" as aws;

new aws.s3Bucket.S3Bucket(
  bucketPrefix: "hello",
  versioning: aws.s3Bucket.S3BucketVersioning {
    enabled: true,
    mfaDelete: true,
  },
) as "Bucket";
