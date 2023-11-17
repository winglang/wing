bring cloud;
bring aws;
bring util;

let target = util.env("WING_TARGET");

let lambda = new cloud.Function(inflight () => {}) as "aws-wing-function";

let getFunctionInfo = (f: cloud.Function): Map<str>? => {
  if let lambda = aws.Function.from(f) {
    return {
      functionName: lambda.functionName,
      arn: lambda.arn,
    };
  }
  return nil;
};

let functionInfo = getFunctionInfo(lambda);

test "validates the AWS function name" {
  if let lambda = functionInfo {
    if target == "tf-aws" {      
      assert(lambda.get("arn").contains("arn:aws:lambda:"));
      assert(lambda.get("arn").contains(":function:"));
      assert(lambda.get("arn").contains("aws-wing-function"));
      assert(lambda.get("functionName").contains("aws-wing-function"));
    } else { // If it's not a 'tf-aws' target, it's an 'awscdk'
      assert(lambda.get("arn").contains("arn:aws:lambda:"));
      assert(lambda.get("arn").contains(":function:"));
      assert(lambda.get("arn").contains("awswingfunction"));
      assert(lambda.get("functionName").contains("awswingfunction"));
    }
  } else {
    // If the test is not on AWS, it should not fail, so I am returning true.
    assert(true);
  }
}