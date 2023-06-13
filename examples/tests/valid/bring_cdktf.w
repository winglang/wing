bring "@cdktf/provider-aws" as aws;

class MyClass {
  b2: aws.s3Bucket.S3Bucket;

  init() {
    this.b2 = new aws.s3Bucket.S3Bucket();
  }

  inflight getBucketArn(): str {
    return this.b2.arn;
  }
}

let b = new aws.s3Bucket.S3Bucket(
  bucketPrefix: "hello",
  acl: "private",
);

let c = new MyClass();

test "capture from inflight" {
  let x1 = b.arn;
  assert(x1.startsWith("arn:aws:s3"));
  log("b.arn=${x1}");

  let x2 = b.bucketDomainName;
  assert(x2.endsWith("s3.amazonaws.com"));
  log("b.bucketDomainName=${x2}");

  let x3 = c.getBucketArn();
  assert(x3.startsWith("arn:aws:s3"));
  log("c.getBucketArn=${x3}");
}
