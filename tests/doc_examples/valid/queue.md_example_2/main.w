// This file was auto generated from an example found in: queue.md_example_2
// Example metadata: {"valid":true}
bring cloud;

let q = new cloud.Queue();

new cloud.Function(inflight () => {
  q.push("message a");
  q.push("message b", "message c", "message d");
  log("approxSize is ${q.approxSize()}");
  log("popping message ${q.pop()!}");
  log("popping message ${q.pop()!}");
  log("approxSize is ${q.approxSize()}");
  q.purge();
  log("approxSize is ${q.approxSize()}");
});
