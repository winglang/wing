bring cloud;

let b = new cloud.Bucket();
let q = new cloud.Queue();

q.add_consumer(inflight (msg: str) => {
  b.put("file.txt", msg);
});