bring cloud;

let b = new cloud.Bucket();
let q = new cloud.Queue();

q.setConsumer(inflight (msg: str) => {
  b.put("file.txt", msg);
});