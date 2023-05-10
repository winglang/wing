bring cloud;

let q = new cloud.Queue();

new cloud.Function(inflight ()=>{
  assert(q.approxSize() == 0);
  q.push("message");
  assert(q.approxSize() == 1);
}) as "test";