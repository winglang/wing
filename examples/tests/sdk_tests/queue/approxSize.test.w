/*\
skip: true
\*/

bring cloud;
bring util;

let var consumerSleep: duration = 2m;
let var testSleep: duration = 1m;
let var testTimeout: duration = 5m;
if (util.env("WING_TARGET") == "sim") {
  consumerSleep = 10s;
  testSleep = 5s;
  testTimeout = 30s;
}

let q = new cloud.Queue();

q.setConsumer(inflight () => {
  util.sleep(consumerSleep);
});

new std.Test(inflight () => {
  q.push("foo");
  q.push("bar");

  util.sleep(testSleep);

  assert(q.approxSize() == 2);
}, timeout: testTimeout) as "approxSize";
