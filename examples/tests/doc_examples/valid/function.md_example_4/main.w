// This file was auto generated from an example found in: function.md_example_4
// Example metadata: {"valid":true}
bring aws;
bring cloud;

let f = new cloud.Function(inflight () => {
  if let ctx = aws.Function.context() {
    log(ctx.logGroupName); // prints the log group name
    log(ctx.logStreamName); // prints the log stream name

    let remainingTime = ctx.remainingTimeInMillis();
    assert(remainingTime > 0);
  }
});
