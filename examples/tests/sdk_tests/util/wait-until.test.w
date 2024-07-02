bring cloud;
bring util;

let invokeCounter1 = new cloud.Counter() as "invoke-counter1";
let invokeCounter2 = new cloud.Counter() as "invoke-counter2";
let invokeCounter3 = new cloud.Counter() as "invoke-counter3";


test "waitUntil" {
  // "waitUntil returns true if the predicate is met immediately"
  let start1 = datetime.systemNow().timestampMs;
  let result1 = util.waitUntil((): bool => { return true; });
  assert(result1 == true);
  assert(datetime.systemNow().timestampMs - start1 < 1000);

// "waitUntil throws if the predicate is never met" 
  let start2 = datetime.systemNow().timestampMs;
  let var threwErr2 = false;
  try {
    util.waitUntil((): bool => { return false; }, timeout: 1s);
  } catch {
    threwErr2 = true;
  }
  assert(threwErr2 == true);
  assert(datetime.systemNow().timestampMs - start2 > 1000);

// "waitUntil returns false if the predicate is never met and 'throws: false' is set" 
  let start3 = datetime.systemNow().timestampMs;
  let result3 = util.waitUntil(inflight (): bool => { return false; }, timeout: 1s, throws: false);
  assert(result3 == false);
  assert(datetime.systemNow().timestampMs - start3 > 1 * 1000);

// "waitUntil returns true if the predicate is met after some time waiting" 
  let start4 = datetime.systemNow().timestampMs;
  let returnTrueAfter3Seconds = (): bool => { 
    invokeCounter1.inc();
    return datetime.systemNow().timestampMs - start4 > 3 * 1000; 
  };
  util.waitUntil(returnTrueAfter3Seconds, interval: 1s, timeout: 10s);
  let invocations = invokeCounter1.peek();
  // Check that the condition was evaluated several times
  assert( invocations > 1 && invocations < 10 );


// "waitUntil with custom props" 
  let start5 = datetime.systemNow().timestampMs;
  let returnFalse = (): bool => { 
    invokeCounter2.inc();
    return false;
  };

  if util.waitUntil(returnFalse, interval: 1s, timeout: 5s, throws: false) {
    assert(false);
  } else {
    // making sure that the predicate was invoked almost 5 times
    let invokeCount = invokeCounter2.peek();
    assert(invokeCount > 3 && invokeCount < 7);
  }

//  "throwing exception from predicate should throw immediately" 
  try {
    util.waitUntil((): bool => { 
      invokeCounter3.inc();
      throw "ERROR";
    });
    assert(false);
  } catch {
    assert(invokeCounter3.peek() == 1);
  }
}
