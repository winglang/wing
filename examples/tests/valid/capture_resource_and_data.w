bring cloud;

let data = {1,2,3};
let res = new cloud.Bucket();
let queue = new cloud.Queue();

let handler = inflight (e: str) => {
  assert(data.size == 3);

  res.put("file.txt", "world");
  assert(res.get("file.txt") == "world");

  queue.push("spirulina");
};

new cloud.Function(handler) as "test";