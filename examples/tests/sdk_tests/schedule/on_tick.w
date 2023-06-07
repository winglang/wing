bring cloud;

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

class Utils {
    extern "../external/sleep.js" static inflight sleep(milli: num);
}

// std.Test is used setting the timeout property
new std.Test(inflight () => {

    assert(c1.peek() == 0);
    assert(c2.peek() == 0);
    Utils.sleep(60 * 1000 * 1.1);
    assert(c1.peek() == 1);
    assert(c2.peek() == 1);

}, std.TestProps { timeout: 2m }) as "on tick is called both for rate and cron schedules";
