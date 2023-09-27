bring cloud;
bring util;

let var timeout = 100ms;
let var retentionPeriod = 1s;

let q = new cloud.Queue(timeout: timeout, retentionPeriod: retentionPeriod);

test "retentionPeriod" {
  q.push("hello", "world");

  assert(util.waitUntil(() => {
    return q.approxSize() == 0;
  }));
}
