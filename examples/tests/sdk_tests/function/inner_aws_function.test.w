bring cloud;
bring aws;
bring util;

let target = util.env("WING_TARGET");

let lambda = new cloud.Function(inflight () => {}) as "aws-wing-function";

let getFunctionName = (q: cloud.Function): str? => {
  if let lambda = aws.Function.from(q) {
    let functionAws = lambda.innerAwsFunction();
    return functionAws.functionName;
  }
  return nil;
};

let functionName = getFunctionName(lambda);

test "validates the AWS function name" {
  if let name = functionName {
    if target == "tf-aws" {
      assert(name.contains("aws-wing-function"));
    } else { // If it's not a 'tf-aws' target, it's an 'awscdk'
      assert(name.contains("awswingfunction"));
    }
  }
  // If the test is not on AWS, it should not fail, so I am returning true.
  assert(true);
}