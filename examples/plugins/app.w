bring cloud;

let b = new cloud.Bucket();
let q = new cloud.Queue();

q.on_message(inflight (msg: str) => {
  b.put("file.txt", msg);
});