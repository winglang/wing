bring cloud;
bring util;

let c = new cloud.Counter();

let key_without_retries = "without_retries";
let dlq_without_retries = new cloud.Queue() as "dlq without retries";
let queue_without_retries = new cloud.Queue(
  dlq: { queue: dlq_without_retries }
) as "queue without retries";
queue_without_retries.setConsumer(inflight (msg: str) => {
  if msg == "fail" {
    c.inc(1, key_without_retries);
    throw "error";
  }
});

new std.Test(inflight () => {
  queue_without_retries.push("Hello");
  queue_without_retries.push("fail");
  queue_without_retries.push("World!");

  // wait until it executes once.
  assert(util.waitUntil(inflight () => { return c.peek(key_without_retries) == 1; }));

  // check if the "fail" message has arrived at the dead-letter queue
  assert(util.waitUntil(inflight () => { return dlq_without_retries.pop() == "fail"; }));
}, std.TestProps {timeout: 5m}) as "one execution and send fail message to dead-letter queue";


let key_with_retries = "with_retries";
let dlq_with_retries = new cloud.Queue() as "dlq with retries";
let queue_with_retries = new cloud.Queue(
  dlq: {
    queue: dlq_with_retries,
    maxDeliveryAttemps: 3
  }
) as "queue with retries";
queue_with_retries.setConsumer(inflight (msg: str) => {
  if msg == "fail" {
    c.inc(1, key_with_retries);
    throw "error";
  }
});

new std.Test(inflight () => {
  queue_with_retries.push("Hello");
  queue_with_retries.push("fail");
  queue_with_retries.push("World!");

  // wait until it executes once and retry three more times.
  assert(util.waitUntil(inflight () => { return c.peek(key_with_retries) == 3; }));

  // check if the "fail" message has arrived at the dead-letter queue
  assert(util.waitUntil(inflight () => { return dlq_with_retries.pop() == "fail"; }));
}, std.TestProps {timeout: 5m}) as "one execution, two retries and send the fail message to dead-letter queue";
