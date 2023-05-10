bring cloud;

let bucket = new cloud.Bucket();
let queue = new cloud.Queue();

queue.addConsumer(inflight (message: str) => {
  bucket.put("wing.txt", "Hello, ${message}");
});