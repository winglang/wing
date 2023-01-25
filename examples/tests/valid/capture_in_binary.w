bring cloud;

let b = new cloud.Bucket();
let x = 12;

// make sure capture happens in binary expressions
let handler2 = inflight (e: str) => {
  b.put("file", "foo");
  assert(b.get("file") == "foo");
  assert(12 == x);
};

new cloud.Function(handler2) as "test";