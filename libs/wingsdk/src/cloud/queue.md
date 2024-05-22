---
title: Queue
id: queue
description: A built-in resource for creating distributed queues - a data structure for storing messages.
keywords:
  [
    Wing reference,
    Wing language,
    language,
    Wing standard library,
    Wing programming language,
    Queue,
    Distributed queue,
    Messaging queue,
    FIFO queue,
    Channel,
  ]
sidebar_position: 1
---

The `cloud.Queue` resource represents a data structure for holding a list of messages.
Queues are typically used to decouple producers of data and the consumers of said data in distributed systems.
Queues by default are not FIFO (first in, first out) - so the order of messages is not guaranteed.

## Usage

### Setting a Queue Consumer

```ts playground
bring cloud;

let q = new cloud.Queue();

q.setConsumer(inflight (m: str) => {
  log("message ${m} consumed");
});

new cloud.Function(inflight () => {
  q.push("message a");
  q.push("message b");
});
```

### Using Queue inflight api

Pushing messages, popping them, and purging.

```ts playground
bring cloud;

let q = new cloud.Queue();

new cloud.Function(inflight () => {
  q.push("message a");
  q.push("message b", "message c", "message d");
  log("approxSize is ${q.approxSize()}");
  log("popping message ${q.pop()}");
  log("popping message ${q.pop()}");
  log("approxSize is ${q.approxSize()}");
  q.purge();
  log("approxSize is ${q.approxSize()}");
});
```

### Adding a dead-letter queue

Creating a queue and adding a dead-letter queue with the maximum number of attempts configured

```ts playground
bring cloud;

let dlq = new cloud.Queue() as "dead-letter queue";
let q = new cloud.Queue(
  dlq: { 
    queue: dlq,
    maxDeliveryAttempts: 2
  }
);
```

### Referencing an external queue

If you would like to reference an existing queue from within your application you can use the
`QueueRef` classes in the target-specific namespaces.

> This is currently only supported for `aws`.

The following example defines a reference to an Amazon SQS queue with a specific ARN and sends a
message to the queue from the function:

```js
bring aws;

let outbox = new aws.QueueRef("arn:aws:sqs:us-east-1:111111111111:Outbox");

new cloud.Function(inflight () => {
  outbox.push("send an email");
});
```

This works both when running in the simulator (requires AWS credentials on the developer's machine)
and when deployed to AWS. When this is deployed to AWS, the AWS Lambda IAM policy will include the
needed permissions.

## Target-specific details

### Simulator (`sim`)

The sim implementation of `cloud.Queue` uses JavaScript's `Array`

### AWS (`tf-aws` and `awscdk`)

The AWS implementation of `cloud.Queue` uses [Amazon Simple Queue Service](https://aws.amazon.com/sqs/).

### Azure (`tf-azure`)

🚧 Not supported yet (tracking issue: [#617](https://github.com/winglang/wing/issues/617))

### GCP (`tf-gcp`)

🚧 Not supported yet (tracking issue: [#616](https://github.com/winglang/wing/issues/616))
