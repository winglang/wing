bring cloud;
bring aws;

let bucket = new cloud.Bucket() as "aws-wing-bucket";

let getBucketInfo = (b: cloud.Bucket): Map<str>? => {
  if let bucket = aws.Bucket.from(b) {
    return {
      bucketName: bucket.bucketName,
      bucketArn: bucket.bucketArn,
      bucketDomainName: bucket.bucketDomainName
    };
  }
  return nil;
};

let bucketInfo = getBucketInfo(bucket);

test "validates the AWS Bucket" {
  if let bucket = bucketInfo {
    if @target == "tf-aws" {
      assert(bucket.get("bucketArn").contains("arn:aws:s3:::aws-wing-bucket"));
      assert(bucket.get("bucketName").contains("aws-wing-bucket"));
      assert(bucket.get("bucketDomainName").contains("aws-wing-bucket.s3.amazonaws.com"));
    } else { // If it's not a 'tf-aws' target, it's an 'awscdk'
      assert(bucket.get("bucketArn").contains("arn:aws:s3:::"));
      assert(bucket.get("bucketArn").contains("awswingbucket"));
      assert(bucket.get("bucketName").contains("awswingbucket"));
      assert(bucket.get("bucketDomainName").contains("awswingbucket.s3.amazonaws.com"));
    }
  } else {
    // If the test is not on AWS, it should not fail, so I am returning true.
    assert(true);
  }
}
