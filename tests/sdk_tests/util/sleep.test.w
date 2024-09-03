bring util;

let oneHundredMiliseconds = 0.1s;
test "sleep 100 mili seconds" {
  let start = datetime.systemNow().timestampMs;
  util.sleep(oneHundredMiliseconds);
  let end = datetime.systemNow().timestampMs;
  let delta = end - start;
  // Node.js setTimeout isn't precise, so the actual time slept could be less
  assert(delta >= 90);
}
