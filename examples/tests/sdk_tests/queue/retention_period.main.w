bring cloud;
bring util;

let var timeout = 30s;
let var retentionPeriod = 60s;

let q = new cloud.Queue(timeout: timeout, retentionPeriod: retentionPeriod);

test "retentionPeriod" {
  q.push("hello", "world");

  util.sleep(retentionPeriod);

  assert(util.waitUntil(() => {
    return q.approxSize() == 0;
  }));
}
