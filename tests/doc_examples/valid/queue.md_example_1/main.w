// This file was auto generated from an example found in: queue.md_example_1
// Example metadata: {"valid":true}
bring cloud;

let q = new cloud.Queue();

q.setConsumer(inflight (m: str) => {
  log("message ${m} consumed");
});

new cloud.Function(inflight () => {
  q.push("message a");
  q.push("message b");
});
