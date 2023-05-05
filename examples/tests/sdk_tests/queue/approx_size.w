bring cloud;

let q = new cloud.Queue();

new cloud.Function(inflight ()=>{
  assert(q.approx_size() == 0);
  q.push("message");
  assert(q.approx_size() == 1);
}) as "test";