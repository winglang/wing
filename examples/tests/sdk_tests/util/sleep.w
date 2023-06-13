bring util;

class JSHelper { 
  extern "./sleep-helper.js" static inflight getTime(): num;
}

test "sleep a second" {
  let start = JSHelper.getTime();
  util.Util.sleep(1000);
  let end = JSHelper.getTime();
  assert(end - start > 1000 );
  assert(end - start < 2000 );
}