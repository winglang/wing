bring util;

class JSHelper { 
  extern "./sleep-helper.js" static inflight getTime(): num;
}


test "sleep a second" {
  let start = JSHelper.getTime();
  util.sleep(1s);
  let end = JSHelper.getTime();
  assert(end - start > 800 );
  assert(end - start < 1200 );
}