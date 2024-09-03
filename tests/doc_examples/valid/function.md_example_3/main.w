// This file was auto generated from an example found in: function.md_example_3
// Example metadata: {"valid":true}
bring aws;
bring cloud;

let f = new cloud.Function(inflight () => {
  log("Hello world!");
});
if let lambdaFn = aws.Function.from(f) {
  lambdaFn.addPolicyStatements(
    aws.PolicyStatement {
      actions: ["ses:sendEmail"],
      effect: aws.Effect.ALLOW,
      resources: ["*"],
    },
  );
}
