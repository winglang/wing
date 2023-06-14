bring cloud;
bring util;

class JSHelper { 
  extern "./sleep-helper.js" static inflight getTime(): num;
}
let oneHundredMiliseconds = 0.1s;

test "returns true immediately" {
  let start = JSHelper.getTime();
  if util.wait(():bool => { return true; }) {
    assert(JSHelper.getTime() - start < 1000);
  } else {
    assert(false);
  }
}

test "returns false takes a minute" {
  let start = JSHelper.getTime();
  if util.wait(inflight ():bool => { return false; }) {
    assert(false);
    } else {
    assert(JSHelper.getTime() - start > 60 * 1000);
  }
}

test "return after some time waiting" {
  let start = JSHelper.getTime();
  let returnTrueAfter30Seconds = ():bool => { 
    return JSHelper.getTime() - start > 30 * 1000; 
  };
  if util.wait(returnTrueAfter30Seconds) {
    let diff = JSHelper.getTime() - start;
      assert( diff > 30 * 1000 && diff < 40 * 1000);
  } else {
    assert(false);
  }
}

let invokeationCounter = new cloud.Counter();
let oneSecond = 1s;
let tenSeconds = 10s;

test "setting props" {
  let start = JSHelper.getTime();
  let returnFalse = ():bool => { 
    invokeationCounter.inc();
    return false;
  };
  if util.wait(returnFalse, interval: oneSecond, timeout: tenSeconds ) {
    assert(false);
  } else {
    let invokeCount = invokeationCounter.peek();
    assert(invokeCount > 7 && invokeCount < 13);
  }
}
