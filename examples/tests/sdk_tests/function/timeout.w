
/*\
skip: true
\*/
bring cloud;

let c = new cloud.Counter();

class Helper {
  init () {}
  extern "../external/sleep.js" inflight sleep(time_ms: num);
}

let helper = new Helper();

let f = new cloud.Function(inflight () => {
  // call sleep
  helper.sleep(1500);
  c.inc();
}, cloud.FunctionProps {timeout: 1s});

// doesn't work yet- see issue: https://github.com/winglang/wing/issues/1980
new cloud.Function(inflight () => {
  f.invoke("");
  assert(c.peek() == 0);
}) as "test:function timeout";


