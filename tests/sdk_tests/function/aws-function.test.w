bring aws;
bring cloud;
bring expect;
bring util;

let target = util.env("WING_TARGET");

let getFunctionInfo = (f: cloud.Function): Map<str>? => {
  if let lambda = aws.Function.from(f) {
    return {
      functionName: lambda.functionName,
      functionArn: lambda.functionArn,
    };
  }
  return nil;
};

let fn = new cloud.Function(inflight (msg: Json?) => {
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
}) as "aws-wing-function";

let fnInfo = getFunctionInfo(fn);

new std.Test(inflight () => {
  if let info = fnInfo {
    if target == "tf-aws" {
      assert(info.get("functionArn").contains("arn:aws:lambda:"));
      assert(info.get("functionArn").contains(":function:"));
      assert(info.get("functionArn").contains("aws-wing-function"));
      assert(info.get("functionName").contains("aws-wing-function"));
    } else if target == "awscdk" {
      assert(info.get("functionArn").contains("arn:aws:lambda:"));
      assert(info.get("functionArn").contains(":function:"));
      assert(info.get("functionArn").contains("awswingfunction"));
      assert(info.get("functionName").contains("awswingfunction"));
    } else {
      expect.fail("Unexpected target " + target);
    }
  } else {
    // If the test is not on AWS, it should not fail, so I am returning true.
    assert(true);
  }

  let result = fn.invoke("hello");
  expect.equal(result, "hello");

  let result2 = fn.invoke("hello2");
  expect.equal(result2, "hello2");

  let result3 = fn.invoke();
  expect.equal(result3, nil);

  let var msg = "";
  try {
    fn.invoke("error");
  } catch err {
    msg = err;
  }
  expect.ok(msg.contains("fake error"), "Expected fake error message");
}, timeout: 3m) as "AWS Function";
