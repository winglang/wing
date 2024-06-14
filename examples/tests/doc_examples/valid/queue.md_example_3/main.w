// This file was auto generated from an example found in: queue.md_example_3
// Example metadata: {"valid":true}
bring cloud;

let dlq = new cloud.Queue() as "dead-letter queue";
let q = new cloud.Queue(
  dlq: { 
    queue: dlq,
    maxDeliveryAttempts: 2
  }
);
