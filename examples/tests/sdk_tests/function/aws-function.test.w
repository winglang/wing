bring aws;
bring cloud;
bring expect;
bring util;

let target = util.env("WING_TARGET");

let lambda = new cloud.Function(inflight () => {}) as "aws-wing-function";

let getFunctionInfo = (f: cloud.Function): Map<str>? => {
  if let lambda = aws.Function.from(f) {
    return {
      functionName: lambda.functionName,
      functionArn: lambda.functionArn,
    };
  }
  return nil;
};

let functionInfo = getFunctionInfo(lambda);

test "validates the AWS Function" {
  if let lambda = functionInfo {
    if target == "tf-aws" {      
      assert(lambda.get("functionArn").contains("arn:aws:lambda:"));
      assert(lambda.get("functionArn").contains(":function:"));
      assert(lambda.get("functionArn").contains("aws-wing-function"));
      assert(lambda.get("functionName").contains("aws-wing-function"));
    } else { // If it's not a 'tf-aws' target, it's an 'awscdk'
      assert(lambda.get("functionArn").contains("arn:aws:lambda:"));
      assert(lambda.get("functionArn").contains(":function:"));
      assert(lambda.get("functionArn").contains("awswingfunction"));
      assert(lambda.get("functionName").contains("awswingfunction"));
    }
  } else {
    // If the test is not on AWS, it should not fail, so I am returning true.
    assert(true);
  }
}

let fn = new cloud.Function(inflight (msg: str?) => {
  if msg == "error" {
    throw "fake error";
  }

  if let ctx = aws.Function.context() {
    log(Json.stringify(ctx));
    expect.equal(ctx.functionVersion, "$LATEST");

    let remainingTime = ctx.remainingTimeInMillis();
    assert(remainingTime > 0);
  } else {
    if target == "tf-aws" || target == "awscdk" {
      expect.fail("Expected to have a context object");
    }
  }

  return msg;
}) as "FunctionAccessingContext";

test "can access lambda context" {
  let result = fn.invoke("hello");
  expect.equal(result, "hello");

  let result2 = fn.invoke("hello2");
  expect.equal(result2, "hello2");

  let var msg = "";
  try {
    fn.invoke("error");
  } catch err {
    msg = err;
  }
  expect.ok(msg.contains("fake error"), "Expected fake error message");
}
