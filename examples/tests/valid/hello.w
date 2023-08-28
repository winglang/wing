bring cloud;

let bucket = new cloud.Bucket();
let queue = new cloud.Queue();

queue.setConsumer(inflight fn(message: str) {
  bucket.put("wing.txt", "Hello, ${message}");
});
