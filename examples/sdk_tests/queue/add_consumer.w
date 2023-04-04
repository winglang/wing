bring cloud;

let q = new cloud.Queue();
let c = new cloud.Counter();

resource JSHelper {
  init(){}
  extern "helper.js" inflight sleep(milli: num);
}

// TODO: wont work without: https://github.com/winglang/wing/issues/1384
q.add_consumer(inflight (msg: str): str => {
  c.inc();
});

let js = new JSHelper();
new cloud.Function(inflight () => {
  q.push("hello");
  q.push("world");
  // TODO: replace this sleep with std.sleep: https://github.com/winglang/wing/issues/1535
  js.sleep(1000);
  let count = c.peek();
  assert(count == 2);
}) as "test";