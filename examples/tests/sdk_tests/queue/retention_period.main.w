bring cloud;
bring util;

// TODO: timeout is not supported in sim - https://github.com/winglang/wing/issues/2401
if util.env("WING_TARGET") != "sim" {
  let var timeout = 30s;
  let var retentionPeriod = 60s;

  let q = new cloud.Queue(timeout: timeout, retentionPeriod: retentionPeriod);

  new std.Test(inflight () => {
    q.push("hello", "world");

    util.sleep(retentionPeriod);

    util.waitUntil(() => {
      return q.approxSize() == 0;
    });
  }, timeout: 2m) as "retentionPeriod";
}
