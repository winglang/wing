bring cloud;
bring util;
bring expect;

let c = new cloud.Counter();

let ERROR_MSG_BY_TARGET: Map<str> = {"tf-gcp": "upstream request timeout"};
let timeoutError = ERROR_MSG_BY_TARGET.tryGet(util.env("WING_TARGET")) ?? "Function timed out";
let TIMEOUT_BY_TARGET: Map<num> = {"tf-gcp": 120}; 
let timeoutValue = TIMEOUT_BY_TARGET.tryGet(util.env("WING_TARGET")) ?? 60;

let f1 = new cloud.Function(inflight () => {
  util.sleep(1.5s);
  c.inc();
}, timeout: 1s) as "function with 1s timeout";

// testing the default timeout - should be 1 minute
let f2 = new cloud.Function(inflight () => {
  util.sleep(duration.fromSeconds(timeoutValue / 2));
  c.inc();
  util.sleep(duration.fromSeconds(timeoutValue / 2 + 1));
  c.inc();
}) as "function with default timeout";

new std.Test(inflight () => {
  let var e = "";
  try {
    f1.invoke("");
  } catch error {
    e = error;
  }

  expect.match(e, timeoutError);
  assert(c.peek() == 0);

  e = "";
  try {
    f2.invoke("");
  } catch error {
    e = error;
  }

  expect.match(e, timeoutError);
  assert(c.peek() == 1);
}, timeout: 4m) as "function invoke throws on timeout";
