// This file was auto generated from an example found in: topic.md_example_2
// Example metadata: {"valid":true}
bring cloud;

let topic = new cloud.Topic();

topic.onMessage(inflight (message: str) => {
  log("Topic published message: {message}");
});
