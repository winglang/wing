// This file was auto generated from an example found in: queue.md_example_4
// Example metadata: {"valid":true}
bring cloud;
bring aws;

let outbox = new aws.QueueRef("arn:aws:sqs:us-east-1:111111111111:Outbox");

new cloud.Function(inflight () => {
  outbox.push("send an email");
});
