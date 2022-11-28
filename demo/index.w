bring cloud;

let bucket = new cloud.Bucket();
let queue = new cloud.Queue();

inflight handler(message: str): str {
    bucket.put("wing.txt", "Hello, ${message}");
}

queue.on_message(handler);
