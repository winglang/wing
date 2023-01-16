bring cloud;

let data = {1,2,3};
let res = new cloud.Bucket();

let handler = inflight (e: str) => {
  assert(data.size == 3);

  res.put("file.txt", "world");
  assert(res.get("file.txt") == "world");
};

new cloud.Function(handler) as "test";