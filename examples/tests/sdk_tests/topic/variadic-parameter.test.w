bring cloud;
bring util;

let c = new cloud.Counter();
let t = new cloud.Topic();
t.onMessage(inflight (msg: str) => {
  c.inc();
});

test "publish message array to topic" {
  t.publish("msg1", "msg2", "msg3", 
    "msg4", "msg5", "msg6", "msg7", 
    "msg8", "msg9", "msg10", "msg11", 
    "msg12", "msg13", "msg14", "msg15");

  assert(util.waitUntil(inflight () => { return c.peek() == 15; }));
}
