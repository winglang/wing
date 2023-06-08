bring cloud;

// Can add common function props (e.g. timeout)
new cloud.Topic().onMessage(inflight () -> void {
  log("hello, world");
}, cloud.TopicOnMessageProps { timeout: 3m });

new cloud.Queue().addConsumer(inflight () -> void {
  log("hello, world");
}, cloud.QueueAddConsumerProps { timeout: 3m });