
/*\
skip: true
\*/
bring cloud;

let c = new cloud.Counter();

class Helper {
  init () {}
  extern "../external/sleep.js" static inflight sleep(ms: num);
}


let f = new cloud.Function(inflight () => {
  // call sleep
  Helper.sleep(1500);
  c.inc();
}, cloud.FunctionProps {timeout: 1s});

// doesn't work yet- see issue: https://github.com/winglang/wing/issues/1980
test "timeout" {
  f.invoke("");
  assert(c.peek() == 0);
}
