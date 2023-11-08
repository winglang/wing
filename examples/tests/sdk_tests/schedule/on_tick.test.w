bring cloud;
bring util;

// every minute
let from_cron = new cloud.Schedule( cron: "* * * * ?" ) as "from_cron";
let from_rate = new cloud.Schedule( rate: 1m ) as "from_rate";
let c1 = new cloud.Counter() as "c1";
let c2 = new cloud.Counter() as "c2";

from_cron.onTick(inflight () => {
  c1.inc();
});

from_rate.onTick(inflight () => {
  c2.inc();
});

// std.Test is used setting the timeout property
new std.Test(inflight () => {
  let c1Value = c1.peek();
  let c2Value = c2.peek();

  // wait at least one minute
  util.sleep(1.1m);

  // check that both counters have been incremented
  assert(c1.peek() >= c1Value + 1);
  assert(c2.peek() >= c2Value + 1);
}, timeout: 2m) as "on tick is called both for rate and cron schedules";
