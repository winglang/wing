bring cloud;
bring util;

let counter_received_messages = new cloud.Counter();

let dlq_without_retries = new cloud.Queue() as "dlq without retries";
let queue_without_retries = new cloud.Queue(
  dlq: { queue: dlq_without_retries }
) as "queue without retries";
queue_without_retries.setConsumer(inflight (msg: str) => {
  counter_received_messages.inc(1, msg);
  if msg == "fail" {
    throw "error";
  }
});


new std.Test(
  inflight () => {
    queue_without_retries.push("Hello");
    queue_without_retries.push("fail");
    queue_without_retries.push("World!");

    // wait until it executes once.
    assert(util.waitUntil(inflight () => { return counter_received_messages.peek("Hello") == 1; }));
    assert(util.waitUntil(inflight () => { return counter_received_messages.peek("World!") == 1; }));
    assert(util.waitUntil(inflight () => { return counter_received_messages.peek("fail") == 1; }));

    // check if the "fail" message has arrived at the dead-letter queue
    assert(util.waitUntil(inflight () => { return dlq_without_retries.pop() == "fail"; }));
  }, 
  // To make this test work on AWS, it's necessary to set a high timeout 
  // because if the message fails, we have to wait for the visibility timeout 
  // to expire in order to retrieve the same message from the queue again.
  timeout: 5m) as "one execution and send fail message to dead-letter queue";

let dlq_with_retries = new cloud.Queue() as "dlq with retries";
let queue_with_retries = new cloud.Queue(
  dlq: {
    queue: dlq_with_retries,
    maxDeliveryAttempts: 2
  }
) as "queue with retries";
queue_with_retries.setConsumer(inflight (msg: str) => {
  counter_received_messages.inc(1, msg);
  if msg == "fail" {
    throw "error";
  }
});

new std.Test(inflight () => {
  queue_with_retries.push("Hello");
  queue_with_retries.push("fail");
  queue_with_retries.push("World!");

  // wait until it executes once and retry one more times.
  assert(util.waitUntil(inflight () => { return counter_received_messages.peek("Hello") == 1; }));
  assert(util.waitUntil(inflight () => { return counter_received_messages.peek("World!") == 1; }));
  assert(util.waitUntil(inflight () => { return counter_received_messages.peek("fail") == 2; }));

  // check if the "fail" message has arrived at the dead-letter queue
  assert(util.waitUntil(inflight () => { return dlq_with_retries.pop() == "fail"; }));
}, timeout: 5m) as "one execution, two retries and send the fail message to dead-letter queue";
