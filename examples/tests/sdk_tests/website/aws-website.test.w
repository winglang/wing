bring cloud;
bring aws;
bring util;

let target = util.env("WING_TARGET");


let website = new cloud.Website(path: "./website") as "aws-wing-website";

let getWebsiteInfo = (b: cloud.Website): Map<str>? => {
  if let website = aws.Website.from(b) {
    return {
      bucketName: website.bucketName,
      bucketArn: website.bucketArn,
    };
  }
  return nil;
};

let websiteName = getWebsiteInfo(website);

test "validates the AWS bucket name" {
  if let website = websiteName {
    if target == "tf-aws" {
      assert(website.get("bucketArn").contains("arn:aws:s3:::"));
      assert(website.get("bucketArn").contains("aws-wing-website"));
      assert(website.get("bucketName").contains("aws-wing-website"));
    } else { // If it's not a 'tf-aws' target, it's an 'awscdk'
      assert(website.get("bucketArn").contains("arn:aws:s3:::"));
      assert(website.get("bucketArn").contains("awswingwebsite"));
      assert(website.get("bucketName").contains("awswingwebsite"));
    }
  }
  // If the test is not on AWS, it should not fail, so I am returning true.
  assert(true);
}