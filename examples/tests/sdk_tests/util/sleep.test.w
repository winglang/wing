bring util;

class JSHelper { 
  extern "./sleep-helper.js" pub static inflight getTime(): num;
}

let oneHundredMiliseconds = 0.1s;
test "sleep 100 mili seconds" {
  let start = JSHelper.getTime();
  util.sleep(oneHundredMiliseconds);
  let end = JSHelper.getTime();
  let delta = end - start;
  // Node.js setTimeout isn't precise, so the actual time slept could be less
  assert(delta >= 90);
}
