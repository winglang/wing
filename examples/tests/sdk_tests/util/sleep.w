bring util;

class JSHelper { 
  extern "./sleep-helper.js" static inflight getTime(): num;
}

let oneHundredMiliseconds = 0.1s;
test "sleep 100 mili seconds" {
  let start = JSHelper.getTime();
  util.sleep(oneHundredMiliseconds);
  let end = JSHelper.getTime();
  assert(end - start > 80 );
  assert(end - start < 120 );
}
