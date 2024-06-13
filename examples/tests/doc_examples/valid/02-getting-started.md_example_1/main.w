// This file was auto generated from an example found in: 02-getting-started.md_example_1
// Example metadata: {"valid":true}
bring cloud;

// define a queue, a bucket and a counter
let bucket = new cloud.Bucket();
let counter = new cloud.Counter(initial: 1);
let queue = new cloud.Queue();

// When a message is received in the queue it should be consumed
// by the following closure
queue.setConsumer(inflight (message: str) => {
  // Increment the distributed counter, the index variable will 
  // store the value prior to the increment
  let index = counter.inc();
  // Once two messages are pushed to the queue, e.g. "Wing" and "Queue".
  // Two files will be created:
  // - wing-1.txt with "Hello Wing"
  // - wing-2.txt with "Hello Queue"
  bucket.put("wing-{index}.txt", "Hello, {message}");
  log("file wing-{index}.txt created");
});
