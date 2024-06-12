// This file was auto generated from an example found in: topic.md_example_5
// Example metadata: {"valid":true}
bring cloud;

// First we create a topic
let topic = new cloud.Topic();

// Then we define a consumer inflight handler
let consumerHandler = inflight(message: str) => {
  log("Doing some work with message: {message}");
};

// Now we can use a preflight method of topic to register the consumer handler
// to be invoked when a message is published to the topic.
topic.onMessage(consumerHandler);

// Then we define the producer inflight handler
let publisherHandler = inflight () => {
  // Here we use the inflight api to publish a message to the topic.
  topic.publish("Here are those launch codes you asked for.");
};

// Finally we can use multiple resources to invoke our publisher handler
// for simplicity sake we will just use a function.
new cloud.Function(publisherHandler);
