bring aws;
bring cloud;
bring expect;
bring util;

if util.env("WING_TARGET") == "tf-aws" {
  let fn = new cloud.Function(inflight () => {
    return "Hello world!";
  });

  if let lambda = aws.Function.from(fn) {
    // Using a public layer from https://docs.powertools.aws.dev/lambda/typescript/latest/
    lambda.addLambdaLayer("arn:aws:lambda:us-east-1:094274105915:layer:AWSLambdaPowertoolsTypeScriptV2:7");
  }

  test "the function runs" {
    let result = fn.invoke();
    expect.equal(result, "Hello world!");
  }
}
