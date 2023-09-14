/*\
skip: true
\*/

bring cloud;
bring util;

let var timeout: duration = 30s;
let var sleep: duration = 31s;
if (util.env("WING_TARGET") == "sim") {
  timeout = 1s;
  sleep = 2s;
}


let q = new cloud.Queue(cloud.QueueProps{timeout: timeout});

q.setConsumer(inflight () => {
  util.sleep(sleep);
});


// TODO: this test fails sim due to issue: https://github.com/winglang/wing/issues/1980
new std.Test(inflight () => {  
  // each push should result in a timeout
  q.push("foo");
  q.push("foo");

  util.sleep(duration.fromSeconds(timeout.seconds + 1));
  // The queue should have 2 messages still due to timeout - doesn't work on aws or sim unfortunately
  // for aws- https://github.com/winglang/wing/issues/3354
  if (util.env("WING_TARGET") != "tf-aws") {
    assert(q.approxSize() == 2);
  }
  }, timeout: 2m) as "timeout";
