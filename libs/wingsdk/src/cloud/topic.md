---
title: Topic
id: topic
description: A built-in resource for publishing messages to subscribers.
keywords:
  [
    Wing reference,
    Wing language,
    language,
    Wing standard library,
    Wing programming language,
    topics,
  ]
sidebar_position: 1
---

The `cloud.Topic` class represents a subject of data that is open for subscription.

Topics are a staple of event-driven architectures, especially those that rely on pub-sub messaging to decouple producers of data and the consumers of said data.

## Usage

### Creating a topic

```js
bring cloud;

let topic = new cloud.Topic();
```

### Subscribing to a topic

```js
bring cloud;

let topic = new cloud.Topic();

topic.onMessage(inflight (message: str) => {
  log("Topic published message: {message}");
});
```

### Publishing to a topic

The inflight method `publish` sends a message to all of the topic's subscribers.

```js
bring cloud;

let topic = new cloud.Topic();

inflight () => {
  topic.publish("Hello World!");
};
```

### Simple pub-sub example

Here is an example of combining the preflight and inflight apis for a topic and creating an adorable
simple pub-sub application.

```js
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
```

## Target-specific details

### Simulator (`sim`)

Within the context of the simulator, topics are implemented by keeping an in-memory list of subscribers and publishing messages to them when `publish` is called.

### AWS (`tf-aws` and `awscdk`)

AWS implementations of `cloud.Topic` use [AWS SNS](https://docs.aws.amazon.com/sns/latest/dg/welcome.html).

### Azure (`tf-azure`)

🚧 Not supported yet (tracking issue: [#621](https://github.com/winglang/wing/issues/621))

### GCP (`tf-gcp`)

🚧 Not supported yet (tracking issue: [#620](https://github.com/winglang/wing/issues/620))
