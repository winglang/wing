bring cloud;

let bucket = new cloud.Bucket();
let queue = new cloud.Queue();

let handler = inflight (message: str): str => {
  bucket.put("hello.txt", "Hello, ${message}!");
  print("Hello, ${message}!");
  return message;
};

queue.on_message(handler);

let counter = new cloud.Counter(initial: 0);
new cloud.Function(inflight (message: str): str => {
  counter.inc();
  return message;
}) as "IncrementCounter";

let topic = new cloud.Topic() as "Topic";
