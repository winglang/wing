bring cloud;
bring util;

class JSHelper { 
  extern "./sleep-helper.js" static inflight getTime(): num;
}

let invokeCounter = new cloud.Counter();
let oneHundredMiliseconds = 0.1s;
let oneSecond = 1s;
let fiveSeconds = 5s;

test "returns true immediately" {
  let start = JSHelper.getTime();
  if util.waitUntil((): bool => { return true; }) {
    assert(JSHelper.getTime() - start < 1000);
  } else {
    assert(false);
  }
}

test "returns false goes to timeout" {
  let start = JSHelper.getTime();
  if util.waitUntil(inflight (): bool => { return false; }, timeout: oneSecond) {
      assert(false);
    } else {
      assert(JSHelper.getTime() - start > 1 * 1000);
  }
}

test "returns after some time waiting" {
  let start = JSHelper.getTime();
  let returnTrueAfter3Seconds = (): bool => { 
    invokeCounter.inc();
    return JSHelper.getTime() - start > 3 * 1000; 
  };
  if util.waitUntil(returnTrueAfter3Seconds, interval: oneSecond) {
    let invocations = invokeCounter.peek();
    assert( invocations > 1 && invocations < 10 );
  } else {
    assert(false);
  }
}

test "setting props" {
  let start = JSHelper.getTime();
  let returnFalse = (): bool => { 
    invokeCounter.inc();
    return false;
  };

  if util.waitUntil(returnFalse, interval: oneSecond, timeout: fiveSeconds) {
    assert(false);
  } else {
    // making sure that the predicate was invoked almost 5 times
    let invokeCount = invokeCounter.peek();
    assert(invokeCount > 3 && invokeCount < 7);
  }
}


test "throwing exception from predicate should throw immediately" {
  try {
    util.waitUntil((): bool => { 
      invokeCounter.inc();
      throw "ERROR";
    });
    assert(false);
  } catch {
    assert(invokeCounter.peek() == 1);
  }
}
