bring cloud;

let bucket = new cloud.Bucket();
let queue = new cloud.Queue();

let handler = (message: str): str ~> {
  bucket.put("hello.txt", "Hello, ${message}!");
  return message;
};

queue.on_message(handler);
