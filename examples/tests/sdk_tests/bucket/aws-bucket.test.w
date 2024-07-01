bring cloud;
bring aws;
bring util;

let target = util.env("WING_TARGET");

let bucket = new cloud.Bucket() as "aws-wing-bucket";

let getBucketInfo = (b: cloud.Bucket): Map<str>? => {
  if let bucket = aws.Bucket.from(b) {
    return {
      bucketName: bucket.bucketName,
      bucketArn: bucket.bucketArn,
    };
  }
  return nil;
};

let bucketInfo = getBucketInfo(bucket);

test "validates the AWS Bucket" {
  if let bucket = bucketInfo {
    if target == "tf-aws" {
      assert(bucket.get("bucketArn").contains("arn:aws:s3:::aws-wing-bucket"));
      assert(bucket.get("bucketName").contains("aws-wing-bucket"));
    } else { // If it's not a 'tf-aws' target, it's an 'awscdk'
      assert(bucket.get("bucketArn").contains("arn:aws:s3:::"));
      assert(bucket.get("bucketArn").contains("awswingbucket"));
      assert(bucket.get("bucketName").contains("awswingbucket"));
    }
  } else {
    // If the test is not on AWS, it should not fail, so I am returning true.
    assert(true);
  }
}