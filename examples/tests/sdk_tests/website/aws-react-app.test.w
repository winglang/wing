bring ex;
bring aws;
bring util;

let target = util.env("WING_TARGET");


let reactApp = new ex.ReactApp(
  projectPath: "./react-website",
  buildDir: "/build/public",
  useBuildCommand: true // builds the website
) as "aws-wing-react-app";

let getReactAppInfo = (b: ex.ReactApp): Map<str>? => {
  if let website = aws.ReactApp.from(b) {
    return {
      bucketName: website.bucketName,
      arn: website.arn,
    };
  }
  return nil;
};

let reactAppName = getReactAppInfo(reactApp);

test "validates the AWS bucket name" {
  if let website = reactAppName {
    if target == "tf-aws" {
      assert(website.get("arn").contains("arn:aws:s3:::"));
      assert(website.get("arn").contains("aws-wing-react-app"));
      assert(website.get("bucketName").contains("aws-wing-react-app"));
    }
  } else {
    // If the test is not on AWS, it should not fail, so I am returning true.
    assert(true);
  }
}