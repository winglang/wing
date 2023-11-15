bring cloud;
bring aws;
bring util;

let target = util.env("WING_TARGET");

let bucket = new cloud.Bucket() as "aws-wing-bucket";

let getBucketInfo = (b: cloud.Bucket): Map<str>? => {
  if let bucket = aws.Bucket.from(b) {
    return {
      bucketName: bucket.bucketName(),
      arn: bucket.arn(),
    };
  }
  return nil;
};

let bucketInfo = getBucketInfo(bucket);

test "validates the AWS bucket name" {
  if let bucket = bucketInfo {
    if target == "tf-aws" {
      assert(bucket.get("arn").contains("arn:aws:s3:::"));
      assert(bucket.get("arn").contains("aws-wing-bucket"));
      assert(bucket.get("bucketName").contains("aws-wing-bucket"));
    } else { // If it's not a 'tf-aws' target, it's an 'awscdk'
      assert(bucket.get("arn").contains("arn:aws:s3:::"));
      assert(bucket.get("arn").contains("awswingwebsite"));
      assert(bucket.get("bucketName").contains("awswingbucket"));
    }
  }
  // If the test is not on AWS, it should not fail, so I am returning true.
  assert(true);
}