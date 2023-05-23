bring cloud;

// Can add common function props (e.g. timeout)
new cloud.Topic().onMessage(inflight () => {
  log("hello, world");
}, cloud.TopicOnMessageProps { timeout: 3m });

new cloud.Queue().addConsumer(inflight () => {
  log("hello, world");
}, cloud.QueueAddConsumerProps { timeout: 3m });