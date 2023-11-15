bring cloud;
bring aws;
bring util;

let target = util.env("WING_TARGET");


let website = new cloud.Website(path: "./website") as "aws-wing-website";

let getWebsiteInfo = (b: cloud.Website): Map<str>? => {
  if let bucket = aws.Bucket.from(b) {
    return {
      bucketName: bucket.bucketName(),
      arn: bucket.arn(),
    };
  }
  return nil;
};

let bucketName = getWebsiteInfo(website);

test "validates the AWS bucket name" {
  if let bucket = bucketName {
    if target == "tf-aws" {
      assert(bucket.get("arn").contains("arn:aws:s3:::"));
      assert(bucket.get("arn").contains("aws-wing-website"));
      assert(bucket.get("bucketName").contains("aws-wing-website"));
    } else { // If it's not a 'tf-aws' target, it's an 'awscdk'
      assert(bucket.get("arn").contains("arn:aws:s3:::"));
      assert(bucket.get("arn").contains("awswingwebsite"));
      assert(bucket.get("bucketName").contains("awswingwebsite"));
    }
  }
  // If the test is not on AWS, it should not fail, so I am returning true.
  assert(true);
}