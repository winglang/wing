bring cloud;

let bucket = new cloud.Bucket();
let queue = new cloud.Queue();

queue.on_message(inflight (message: str): str => {
  bucket.put("wing.txt", "Hello, ${message}");
});