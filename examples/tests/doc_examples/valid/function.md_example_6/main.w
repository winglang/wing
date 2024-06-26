// This file was auto generated from an example found in: function.md_example_6
// Example metadata: {"valid":true}
bring aws;
bring cloud;

class Datadog {
  pub inflight fetchMetrics() {
    // ...implementation...
  }
  pub onLift(host: std.IInflightHost, ops: Array<str>) {
    // Note: `ops` is an array of inflight methods that are being used
    // so you can conditionally add the layer based on the methods called
    if let lambdaFn = aws.Function.from(host) {
      lambdaFn.addLambdaLayer("arn:aws:lambda:us-west-2:123456789012:layer:datadog-layer:1");
    }
  }
}

let d = new Datadog();

let api = new cloud.Api();
api.get("/metrics", inflight () => {
  d.fetchMetrics();
});
