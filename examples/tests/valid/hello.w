bring cloud;

let bucket = new cloud.Bucket();
let queue = new cloud.Queue();

inflight handler(message: str): str {
  bucket.put("hello.txt", "Hello, ${message}!");
  return message;
}

queue.onMessage(handler);
