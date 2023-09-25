bring cloud;
bring util;

let var timeout: duration = 5s;
let var retentionPeriod: duration = 7s;
let var sleepTime: duration = 9s;

let q = new cloud.Queue(cloud.QueueProps{timeout: timeout, retentionPeriod: retentionPeriod});

test "retentionPeriod" {
  q.push("hello");
  q.push("world");
  
  util.sleep(sleepTime);

  assert(util.waitUntil((): bool => {
    return q.approxSize() == 0;
  }));
}
