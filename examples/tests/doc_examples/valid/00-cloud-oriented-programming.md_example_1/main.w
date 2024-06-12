// This file was auto generated from an example found in: 00-cloud-oriented-programming.md_example_1
// Example metadata: {"valid":true}
bring cloud;

let queue = new cloud.Queue(timeout: 2m);
let bucket = new cloud.Bucket();
let counter = new cloud.Counter(initial: 100);

queue.setConsumer(inflight (body: str) => {
  let next = counter.inc();
  let key = "myfile-{next}.txt";
  bucket.put(key, body);
});
