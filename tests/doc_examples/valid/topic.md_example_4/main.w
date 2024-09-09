// This file was auto generated from an example found in: topic.md_example_4
// Example metadata: {"valid":true}
bring cloud;

let topic = new cloud.Topic();

inflight () => {
  topic.publish(
    "Topics can now publish",
    "multiple messages at once"
  );
};
