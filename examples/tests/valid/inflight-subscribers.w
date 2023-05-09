bring cloud;

// Can add common function props (e.g. timeout)
new cloud.Topic().on_message(inflight () => {
  log("hello, world");
}, cloud.TopicOnMessageProps { timeout: 3m });

new cloud.Queue().add_consumer(inflight () => {
  log("hello, world");
}, cloud.QueueAddConsumerProps { timeout: 3m });