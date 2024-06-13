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

```ts playground example
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

```ts playground example
bring cloud;

let q = new cloud.Queue();

new cloud.Function(inflight () => {
  q.push("message a");
  q.push("message b", "message c", "message d");
  log("approxSize is ${q.approxSize()}");
  log("popping message ${q.pop()!}");
  log("popping message ${q.pop()!}");
  log("approxSize is ${q.approxSize()}");
  q.purge();
  log("approxSize is ${q.approxSize()}");
});
```

### Adding a dead-letter queue

Creating a queue and adding a dead-letter queue with the maximum number of attempts configured

```ts playground example
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

```js example
bring cloud;
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
## API Reference <a name="API Reference" id="API Reference"></a>

### Queue <a name="Queue" id="@winglang/sdk.cloud.Queue"></a>

A queue.

#### Initializers <a name="Initializers" id="@winglang/sdk.cloud.Queue.Initializer"></a>

```wing
bring cloud;

new cloud.Queue(props?: QueueProps);
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Queue.Initializer.parameter.props">props</a></code> | <code><a href="#@winglang/sdk.cloud.QueueProps">QueueProps</a></code> | *No description.* |

---

##### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Queue.Initializer.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.cloud.QueueProps">QueueProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

##### Preflight Methods

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.Queue.setConsumer">setConsumer</a></code> | Create a function to consume messages from this queue. |

##### Inflight Methods

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.IQueueClient.approxSize">approxSize</a></code> | Retrieve the approximate number of messages in the queue. |
| <code><a href="#@winglang/sdk.cloud.IQueueClient.pop">pop</a></code> | Pop a message from the queue. |
| <code><a href="#@winglang/sdk.cloud.IQueueClient.purge">purge</a></code> | Purge all of the messages in the queue. |
| <code><a href="#@winglang/sdk.cloud.IQueueClient.push">push</a></code> | Push one or more messages to the queue. |

---

##### `setConsumer` <a name="setConsumer" id="@winglang/sdk.cloud.Queue.setConsumer"></a>

```wing
setConsumer(handler: IQueueSetConsumerHandler, props?: QueueSetConsumerOptions): Function
```

Create a function to consume messages from this queue.

###### `handler`<sup>Required</sup> <a name="handler" id="@winglang/sdk.cloud.Queue.setConsumer.parameter.handler"></a>

- *Type:* <a href="#@winglang/sdk.cloud.IQueueSetConsumerHandler">IQueueSetConsumerHandler</a>

---

###### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Queue.setConsumer.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.cloud.QueueSetConsumerOptions">QueueSetConsumerOptions</a>

---

##### `approxSize` <a name="approxSize" id="@winglang/sdk.cloud.IQueueClient.approxSize"></a>

```wing
inflight approxSize(): num
```

Retrieve the approximate number of messages in the queue.

##### `pop` <a name="pop" id="@winglang/sdk.cloud.IQueueClient.pop"></a>

```wing
inflight pop(): str?
```

Pop a message from the queue.

##### `purge` <a name="purge" id="@winglang/sdk.cloud.IQueueClient.purge"></a>

```wing
inflight purge(): void
```

Purge all of the messages in the queue.

##### `push` <a name="push" id="@winglang/sdk.cloud.IQueueClient.push"></a>

```wing
inflight push(...messages: Array<str>): void
```

Push one or more messages to the queue.

###### `messages`<sup>Required</sup> <a name="messages" id="@winglang/sdk.cloud.IQueueClient.push.parameter.messages"></a>

- *Type:* str

Payload to send to the queue.

Each message must be non-empty.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.Queue.onLiftType">onLiftType</a></code> | A hook called by the Wing compiler once for each inflight host that needs to use this type inflight. |
| <code><a href="#@winglang/sdk.cloud.Queue.toInflight">toInflight</a></code> | Generates an asynchronous JavaScript statement which can be used to create an inflight client for a resource. |

---

##### `onLiftType` <a name="onLiftType" id="@winglang/sdk.cloud.Queue.onLiftType"></a>

```wing
bring cloud;

cloud.Queue.onLiftType(host: IInflightHost, ops: MutArray<str>);
```

A hook called by the Wing compiler once for each inflight host that needs to use this type inflight.

The list of requested inflight methods
needed by the inflight host are given by `ops`.

This method is commonly used for adding permissions, environment variables, or
other capabilities to the inflight host.

###### `host`<sup>Required</sup> <a name="host" id="@winglang/sdk.cloud.Queue.onLiftType.parameter.host"></a>

- *Type:* <a href="#@winglang/sdk.std.IInflightHost">IInflightHost</a>

---

###### `ops`<sup>Required</sup> <a name="ops" id="@winglang/sdk.cloud.Queue.onLiftType.parameter.ops"></a>

- *Type:* MutArray&lt;str&gt;

---

##### `toInflight` <a name="toInflight" id="@winglang/sdk.cloud.Queue.toInflight"></a>

```wing
bring cloud;

cloud.Queue.toInflight(obj: IResource);
```

Generates an asynchronous JavaScript statement which can be used to create an inflight client for a resource.

NOTE: This statement must be executed within an async context.

###### `obj`<sup>Required</sup> <a name="obj" id="@winglang/sdk.cloud.Queue.toInflight.parameter.obj"></a>

- *Type:* <a href="#@winglang/sdk.std.IResource">IResource</a>

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Queue.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.cloud.Queue.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---



## Structs <a name="Structs" id="Structs"></a>

### DeadLetterQueueProps <a name="DeadLetterQueueProps" id="@winglang/sdk.cloud.DeadLetterQueueProps"></a>

Dead letter queue options.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.DeadLetterQueueProps.Initializer"></a>

```wing
bring cloud;

let DeadLetterQueueProps = cloud.DeadLetterQueueProps{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.DeadLetterQueueProps.property.queue">queue</a></code> | <code><a href="#@winglang/sdk.cloud.Queue">Queue</a></code> | Queue to receive messages that failed processing. |
| <code><a href="#@winglang/sdk.cloud.DeadLetterQueueProps.property.maxDeliveryAttempts">maxDeliveryAttempts</a></code> | <code>num</code> | Number of times a message will be processed before being sent to the dead-letter queue. |

---

##### `queue`<sup>Required</sup> <a name="queue" id="@winglang/sdk.cloud.DeadLetterQueueProps.property.queue"></a>

```wing
queue: Queue;
```

- *Type:* <a href="#@winglang/sdk.cloud.Queue">Queue</a>

Queue to receive messages that failed processing.

---

##### `maxDeliveryAttempts`<sup>Optional</sup> <a name="maxDeliveryAttempts" id="@winglang/sdk.cloud.DeadLetterQueueProps.property.maxDeliveryAttempts"></a>

```wing
maxDeliveryAttempts: num;
```

- *Type:* num
- *Default:* 1

Number of times a message will be processed before being sent to the dead-letter queue.

---

### QueueProps <a name="QueueProps" id="@winglang/sdk.cloud.QueueProps"></a>

Options for `Queue`.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.QueueProps.Initializer"></a>

```wing
bring cloud;

let QueueProps = cloud.QueueProps{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.QueueProps.property.dlq">dlq</a></code> | <code><a href="#@winglang/sdk.cloud.DeadLetterQueueProps">DeadLetterQueueProps</a></code> | A dead-letter queue. |
| <code><a href="#@winglang/sdk.cloud.QueueProps.property.retentionPeriod">retentionPeriod</a></code> | <code><a href="#@winglang/sdk.std.Duration">duration</a></code> | How long a queue retains a message. |
| <code><a href="#@winglang/sdk.cloud.QueueProps.property.timeout">timeout</a></code> | <code><a href="#@winglang/sdk.std.Duration">duration</a></code> | How long a queue's consumers have to process a message. |

---

##### `dlq`<sup>Optional</sup> <a name="dlq" id="@winglang/sdk.cloud.QueueProps.property.dlq"></a>

```wing
dlq: DeadLetterQueueProps;
```

- *Type:* <a href="#@winglang/sdk.cloud.DeadLetterQueueProps">DeadLetterQueueProps</a>
- *Default:* no dead letter queue

A dead-letter queue.

---

##### `retentionPeriod`<sup>Optional</sup> <a name="retentionPeriod" id="@winglang/sdk.cloud.QueueProps.property.retentionPeriod"></a>

```wing
retentionPeriod: duration;
```

- *Type:* <a href="#@winglang/sdk.std.Duration">duration</a>
- *Default:* 1h

How long a queue retains a message.

---

##### `timeout`<sup>Optional</sup> <a name="timeout" id="@winglang/sdk.cloud.QueueProps.property.timeout"></a>

```wing
timeout: duration;
```

- *Type:* <a href="#@winglang/sdk.std.Duration">duration</a>
- *Default:* 30s

How long a queue's consumers have to process a message.

---

### QueueSetConsumerOptions <a name="QueueSetConsumerOptions" id="@winglang/sdk.cloud.QueueSetConsumerOptions"></a>

Options for Queue.setConsumer.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.QueueSetConsumerOptions.Initializer"></a>

```wing
bring cloud;

let QueueSetConsumerOptions = cloud.QueueSetConsumerOptions{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.QueueSetConsumerOptions.property.concurrency">concurrency</a></code> | <code>num</code> | The maximum concurrent invocations that can run at one time. |
| <code><a href="#@winglang/sdk.cloud.QueueSetConsumerOptions.property.env">env</a></code> | <code>MutMap&lt;str&gt;</code> | Environment variables to pass to the function. |
| <code><a href="#@winglang/sdk.cloud.QueueSetConsumerOptions.property.logRetentionDays">logRetentionDays</a></code> | <code>num</code> | Specifies the number of days that function logs will be kept. |
| <code><a href="#@winglang/sdk.cloud.QueueSetConsumerOptions.property.memory">memory</a></code> | <code>num</code> | The amount of memory to allocate to the function, in MB. |
| <code><a href="#@winglang/sdk.cloud.QueueSetConsumerOptions.property.timeout">timeout</a></code> | <code><a href="#@winglang/sdk.std.Duration">duration</a></code> | The maximum amount of time the function can run. |
| <code><a href="#@winglang/sdk.cloud.QueueSetConsumerOptions.property.batchSize">batchSize</a></code> | <code>num</code> | The maximum number of messages to send to subscribers at once. |

---

##### `concurrency`<sup>Optional</sup> <a name="concurrency" id="@winglang/sdk.cloud.QueueSetConsumerOptions.property.concurrency"></a>

```wing
concurrency: num;
```

- *Type:* num
- *Default:* platform specific limits (100 on the simulator)

The maximum concurrent invocations that can run at one time.

---

##### `env`<sup>Optional</sup> <a name="env" id="@winglang/sdk.cloud.QueueSetConsumerOptions.property.env"></a>

```wing
env: MutMap<str>;
```

- *Type:* MutMap&lt;str&gt;
- *Default:* No environment variables.

Environment variables to pass to the function.

---

##### `logRetentionDays`<sup>Optional</sup> <a name="logRetentionDays" id="@winglang/sdk.cloud.QueueSetConsumerOptions.property.logRetentionDays"></a>

```wing
logRetentionDays: num;
```

- *Type:* num
- *Default:* 30

Specifies the number of days that function logs will be kept.

Setting negative value means logs will not expire.

---

##### `memory`<sup>Optional</sup> <a name="memory" id="@winglang/sdk.cloud.QueueSetConsumerOptions.property.memory"></a>

```wing
memory: num;
```

- *Type:* num
- *Default:* 1024

The amount of memory to allocate to the function, in MB.

---

##### `timeout`<sup>Optional</sup> <a name="timeout" id="@winglang/sdk.cloud.QueueSetConsumerOptions.property.timeout"></a>

```wing
timeout: duration;
```

- *Type:* <a href="#@winglang/sdk.std.Duration">duration</a>
- *Default:* 1m

The maximum amount of time the function can run.

---

##### `batchSize`<sup>Optional</sup> <a name="batchSize" id="@winglang/sdk.cloud.QueueSetConsumerOptions.property.batchSize"></a>

```wing
batchSize: num;
```

- *Type:* num
- *Default:* 1

The maximum number of messages to send to subscribers at once.

---

## Protocols <a name="Protocols" id="Protocols"></a>

### IQueueSetConsumerHandler <a name="IQueueSetConsumerHandler" id="@winglang/sdk.cloud.IQueueSetConsumerHandler"></a>

- *Extends:* <a href="#@winglang/sdk.std.IInflight">IInflight</a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.IQueueSetConsumerHandler">IQueueSetConsumerHandler</a>

**Inflight client:** [@winglang/sdk.cloud.IQueueSetConsumerHandlerClient](#@winglang/sdk.cloud.IQueueSetConsumerHandlerClient)

A resource with an inflight "handle" method that can be passed to `Queue.setConsumer`.



### IQueueSetConsumerHandlerClient <a name="IQueueSetConsumerHandlerClient" id="@winglang/sdk.cloud.IQueueSetConsumerHandlerClient"></a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.IQueueSetConsumerHandlerClient">IQueueSetConsumerHandlerClient</a>

Inflight client for `IQueueSetConsumerHandler`.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.IQueueSetConsumerHandlerClient.handle">handle</a></code> | Function that will be called when a message is received from the queue. |

---

##### `handle` <a name="handle" id="@winglang/sdk.cloud.IQueueSetConsumerHandlerClient.handle"></a>

```wing
inflight handle(message: Json): void
```

Function that will be called when a message is received from the queue.

###### `message`<sup>Required</sup> <a name="message" id="@winglang/sdk.cloud.IQueueSetConsumerHandlerClient.handle.parameter.message"></a>

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

---


