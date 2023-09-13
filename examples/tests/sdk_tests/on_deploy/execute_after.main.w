bring cloud;

let counter = new cloud.Counter();

let init1 = new cloud.OnDeploy(inflight () => {
  counter.set(10);
}) as "init1";
let init2 = new cloud.OnDeploy(inflight () => {
  counter.inc();
}, executeAfter: [init1]) as "init2";

test "counter" {
  assert(counter.peek() == 11);
}
