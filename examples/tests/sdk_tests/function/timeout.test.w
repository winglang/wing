bring cloud;
bring util;

let c = new cloud.Counter();

let f1 = new cloud.Function(inflight () => {
  util.sleep(1.5s);
  c.inc();
}, timeout: 1s) as "function with 1s timeout";

// testing the default timeout - should be 1 minute
let f2 = new cloud.Function(inflight () => {
  util.sleep(30s);
  c.inc();
  util.sleep(31s);
  c.inc();
}) as "function with default timeout";

new std.Test(inflight () => {
  let var e = "";
  try {
    f1.invoke("");
  } catch error {
    e = error;
  }

  assert(e.contains("Function timed out"));
  assert(c.peek() == 0);

  e = "";
  try {
    f2.invoke("");
  } catch error {
    e = error;
  }

  assert(e.contains("Function timed out"));
  assert(c.peek() == 1);
}, timeout: 2m) as "function invoke throws on timeout";
