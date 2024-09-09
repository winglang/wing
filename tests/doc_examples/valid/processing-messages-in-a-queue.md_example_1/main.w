// This file was auto generated from an example found in: processing-messages-in-a-queue.md_example_1
// Example metadata: {"valid":true}
bring cloud;
bring util;
bring expect;

let bucket = new cloud.Bucket();
let queue = new cloud.Queue();

queue.setConsumer(inflight (message) => {
  bucket.put("wing.txt", "Hello, {message}");
}, timeout: 30s);

test "Hello, world!" {
  queue.push("world!");

  let found = util.waitUntil(() => {
    log("Checking if wing.txt exists");
    return bucket.exists("wing.txt");
  });

  expect.equal(bucket.get("wing.txt"), "Hello, world!");
}
