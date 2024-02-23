bring cloud;
bring util;


let c = new cloud.Counter();
let b = new cloud.Bucket();

let f1 = new cloud.Function(inflight () => {
    c.inc();
}, cloud.FunctionProps { concurrency: 1 }) as "concurrency fn";

test "function with concurrency can be invoked" {
    assert(c.peek() == 0);
    f1.invoke("");
    assert(c.peek() == 1);
  }