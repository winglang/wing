bring cloud;
bring util;

class Date {
  extern "./util.sleep.js" static inflight timeNow(): num;
}

test "test sleep" {
  // --inflight env--
  let startDate = Date.timeNow();
  let sleepDuration: duration = 0.1s;
  util.sleep(sleepDuration);
  let currentDate = Date.timeNow();
  assert(currentDate - startDate >= 100);
}
