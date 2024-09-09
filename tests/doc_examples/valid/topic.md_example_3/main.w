// This file was auto generated from an example found in: topic.md_example_3
// Example metadata: {"valid":true}
bring cloud;

let queue = new cloud.Queue();
queue.setConsumer(inflight (message: str) => {
  log("Topic published message: {message}");
});

let topic = new cloud.Topic();
topic.subscribeQueue(queue);
