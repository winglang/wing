bring cloud;

// Can add common function props (e.g. timeout)
new cloud.Topic().onMessage(inflight () => {
  log("hello, world");
}, timeout: 3m);

new cloud.Queue().setConsumer(inflight () => {
  log("hello, world");
}, timeout: 3m);