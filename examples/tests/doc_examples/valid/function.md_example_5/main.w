// This file was auto generated from an example found in: function.md_example_5
// Example metadata: {"valid":true}
bring aws;
bring cloud;

let f = new cloud.Function(inflight () => {
  log("Hello world!");
});
if let lambdaFn = aws.Function.from(f) {
  lambdaFn.addLambdaLayer("arn:aws:lambda:us-west-2:123456789012:layer:my-layer:1");
}
