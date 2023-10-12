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

new std.Test(inflight () => {
  // counters start at zero
  assert(c1.peek() == 0);
  assert(c2.peek() == 0);

  // wait at least one minute
  util.sleep(1.1m);

  // check that both counters have been incremented
  assert(c1.peek() >= 1);
  assert(c2.peek() >= 1);
},timeout: 2m) as "on tick is called both for rate and cron schedules";
