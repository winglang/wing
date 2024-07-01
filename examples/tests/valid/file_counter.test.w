bring cloud;

let bucket = new cloud.Bucket();
let counter = new cloud.Counter(initial: 100);
let queue = new cloud.Queue();

let handler = inflight (body: str) => {
  let next = counter.inc();
  let key = "myfile-{"hi"}.txt";
  bucket.put(key, body);
};

queue.setConsumer(handler);
