bring cloud;
bring util;

let invokeCounter = new cloud.Counter();

test "waitUntil returns true if the predicate is met immediately" {
  let start = datetime.systemNow().timestampMs;
  let result = util.waitUntil((): bool => { return true; });
  assert(result == true);
  assert(datetime.systemNow().timestampMs - start < 1000);
}

test "waitUntil throws if the predicate is never met" {
  let start = datetime.systemNow().timestampMs;
  let var threwErr = false;
  try {
    util.waitUntil((): bool => { return false; }, timeout: 1s);
  } catch {
    threwErr = true;
  }
  assert(threwErr == true);
  assert(datetime.systemNow().timestampMs - start > 1000);
}

test "waitUntil returns false if the predicate is never met and 'throws: false' is set" {
  let start = datetime.systemNow().timestampMs;
  let result = util.waitUntil(inflight (): bool => { return false; }, timeout: 1s, throws: false);
  assert(result == false);
  assert(datetime.systemNow().timestampMs - start > 1 * 1000);
}

test "waitUntil returns true if the predicate is met after some time waiting" {
  let start = datetime.systemNow().timestampMs;
  let returnTrueAfter3Seconds = (): bool => { 
    invokeCounter.inc();
    return datetime.systemNow().timestampMs - start > 3 * 1000; 
  };
  util.waitUntil(returnTrueAfter3Seconds, interval: 1s, timeout: 10s);
  let invocations = invokeCounter.peek();
  // Check that the condition was evaluated several times
  assert( invocations > 1 && invocations < 10 );
}

test "waitUntil with custom props" {
  let start = datetime.systemNow().timestampMs;
  let returnFalse = (): bool => { 
    invokeCounter.inc();
    return false;
  };

  if util.waitUntil(returnFalse, interval: 1s, timeout: 5s, throws: false) {
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
