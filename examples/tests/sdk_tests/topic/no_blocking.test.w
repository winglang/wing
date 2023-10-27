bring cloud;
bring util;

let topic = new cloud.Topic();
let counter = new cloud.Counter();

topic.onMessage(inflight () => {
  util.sleep(3s);
  counter.inc();
});

test "topic subscribers are invoked without blocking" {
  assert(counter.peek() == 0);
  topic.publish("hello");
  assert(counter.peek() == 0);
  util.sleep(6s);
  assert(counter.peek() == 1);
}
