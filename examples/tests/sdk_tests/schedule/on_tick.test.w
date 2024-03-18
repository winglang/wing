bring cloud;
bring util;
bring expect;

// Trigger schedule every minute
let from_cron = new cloud.Schedule( cron: "* * * * *" ) as "from_cron";
let from_rate = new cloud.Schedule( rate: 1m ) as "from_rate";
let c1 = new cloud.Counter() as "c1";
let c2 = new cloud.Counter() as "c2";

from_cron.onTick(inflight () => {
  c1.inc();
});

from_rate.onTick(inflight () => {
  c2.inc();
});

// std.Test is used for setting the timeout property
new std.Test(inflight () => {
  let c1Value = c1.peek();
  let c2Value = c2.peek();

  // wait at least two minutes
  util.sleep(2.1m);

  // Check that both counters have been incremented
  expect.equal(c1Value, 0);
  assert(c1.peek() >= c1Value + 1);
  expect.equal(c2Value, 0);
  assert(c2.peek() >= c2Value + 1);
}, timeout: 3m) as "onTick()";
