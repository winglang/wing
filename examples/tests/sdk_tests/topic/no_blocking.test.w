bring cloud;
bring util;

let topic = new cloud.Topic();
let counter = new cloud.Counter();

topic.onMessage(inflight () => {
  util.sleep(3s);
  counter.inc();
});

test "topic subscribers are invoked without blocking" {
  // counter starts at 0
  assert(counter.peek() == 0);

  topic.publish("hello");

  // since the subscriber sleeps for 3 seconds, the counter should still be 0
  assert(counter.peek() == 0);

  util.sleep(6s);

  // after a while, the counter should be 1
  assert(counter.peek() == 1);
}
