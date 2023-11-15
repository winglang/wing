bring cloud;
bring aws;
bring util;

let target = util.env("WING_TARGET");

let bucket = new cloud.Bucket() as "aws-wing-bucket";

let getBucketName = (b: cloud.Bucket): str? => {
  if let bucket = aws.Bucket.from(b) {
    let bucketAws = bucket.innerAwsBucket();
    if target == "tf-aws" {
      return bucketAws.bucketDomainName;
    }
    return bucketAws.bucketName;
  }
  return nil;
};

let bucketName = getBucketName(bucket);

test "validates the AWS bucket name" {
  if let name = bucketName {
    if target == "tf-aws" {
      assert(name.contains("aws-wing-bucket"));
    } else { // If it's not a 'tf-aws' target, it's an 'awscdk'
      assert(name.contains("awswingbucket"));
    }
  }
  // If the test is not on AWS, it should not fail, so I am returning true.
  assert(true);
}