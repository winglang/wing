bring cloud;

let t = new cloud.Topic();
let q = new cloud.Queue();

q.setConsumer(inflight (msg: str) => {
  t.publish("msg");
});
