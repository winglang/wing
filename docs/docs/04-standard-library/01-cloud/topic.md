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
## API Reference <a name="API Reference" id="API Reference"></a>

### Topic <a name="Topic" id="@winglang/sdk.cloud.Topic"></a>

A topic.

#### Initializers <a name="Initializers" id="@winglang/sdk.cloud.Topic.Initializer"></a>

```wing
bring cloud;

new cloud.Topic(props?: TopicProps);
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Topic.Initializer.parameter.props">props</a></code> | <code><a href="#@winglang/sdk.cloud.TopicProps">TopicProps</a></code> | *No description.* |

---

##### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Topic.Initializer.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.cloud.TopicProps">TopicProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

##### Preflight Methods

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.Topic.onMessage">onMessage</a></code> | Run an inflight whenever an message is published to the topic. |

##### Inflight Methods

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.ITopicClient.publish">publish</a></code> | Publish message to topic. |

---

##### `onMessage` <a name="onMessage" id="@winglang/sdk.cloud.Topic.onMessage"></a>

```wing
onMessage(inflight: ITopicOnMessageHandler, props?: TopicOnMessageOptions): Function
```

Run an inflight whenever an message is published to the topic.

###### `inflight`<sup>Required</sup> <a name="inflight" id="@winglang/sdk.cloud.Topic.onMessage.parameter.inflight"></a>

- *Type:* <a href="#@winglang/sdk.cloud.ITopicOnMessageHandler">ITopicOnMessageHandler</a>

---

###### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Topic.onMessage.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.cloud.TopicOnMessageOptions">TopicOnMessageOptions</a>

---

##### `publish` <a name="publish" id="@winglang/sdk.cloud.ITopicClient.publish"></a>

```wing
inflight publish(message: str): void
```

Publish message to topic.

###### `message`<sup>Required</sup> <a name="message" id="@winglang/sdk.cloud.ITopicClient.publish.parameter.message"></a>

- *Type:* str

Payload to publish to Topic.

---


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Topic.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.cloud.Topic.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---



## Structs <a name="Structs" id="Structs"></a>

### TopicOnMessageOptions <a name="TopicOnMessageOptions" id="@winglang/sdk.cloud.TopicOnMessageOptions"></a>

Options for `Topic.onMessage`.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.TopicOnMessageOptions.Initializer"></a>

```wing
bring cloud;

let TopicOnMessageOptions = cloud.TopicOnMessageOptions{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.TopicOnMessageOptions.property.env">env</a></code> | <code>MutMap&lt;str&gt;</code> | Environment variables to pass to the function. |
| <code><a href="#@winglang/sdk.cloud.TopicOnMessageOptions.property.logRetentionDays">logRetentionDays</a></code> | <code>num</code> | Specifies the number of days that function logs will be kept. |
| <code><a href="#@winglang/sdk.cloud.TopicOnMessageOptions.property.memory">memory</a></code> | <code>num</code> | The amount of memory to allocate to the function, in MB. |
| <code><a href="#@winglang/sdk.cloud.TopicOnMessageOptions.property.timeout">timeout</a></code> | <code><a href="#@winglang/sdk.std.Duration">duration</a></code> | The maximum amount of time the function can run. |

---

##### `env`<sup>Optional</sup> <a name="env" id="@winglang/sdk.cloud.TopicOnMessageOptions.property.env"></a>

```wing
env: MutMap<str>;
```

- *Type:* MutMap&lt;str&gt;
- *Default:* No environment variables.

Environment variables to pass to the function.

---

##### `logRetentionDays`<sup>Optional</sup> <a name="logRetentionDays" id="@winglang/sdk.cloud.TopicOnMessageOptions.property.logRetentionDays"></a>

```wing
logRetentionDays: num;
```

- *Type:* num
- *Default:* 30

Specifies the number of days that function logs will be kept.

Setting negative value means logs will not expire.

---

##### `memory`<sup>Optional</sup> <a name="memory" id="@winglang/sdk.cloud.TopicOnMessageOptions.property.memory"></a>

```wing
memory: num;
```

- *Type:* num
- *Default:* 1024

The amount of memory to allocate to the function, in MB.

---

##### `timeout`<sup>Optional</sup> <a name="timeout" id="@winglang/sdk.cloud.TopicOnMessageOptions.property.timeout"></a>

```wing
timeout: duration;
```

- *Type:* <a href="#@winglang/sdk.std.Duration">duration</a>
- *Default:* 1m

The maximum amount of time the function can run.

---

### TopicProps <a name="TopicProps" id="@winglang/sdk.cloud.TopicProps"></a>

Options for `Topic`.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.TopicProps.Initializer"></a>

```wing
bring cloud;

let TopicProps = cloud.TopicProps{ ... };
```


## Protocols <a name="Protocols" id="Protocols"></a>

### ITopicOnMessageHandler <a name="ITopicOnMessageHandler" id="@winglang/sdk.cloud.ITopicOnMessageHandler"></a>

- *Extends:* <a href="#@winglang/sdk.std.IResource">IResource</a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.ITopicOnMessageHandler">ITopicOnMessageHandler</a>

**Inflight client:** [@winglang/sdk.cloud.ITopicOnMessageHandlerClient](#@winglang/sdk.cloud.ITopicOnMessageHandlerClient)

A resource with an inflight "handle" method that can be passed to `Topic.on_message`.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.ITopicOnMessageHandler.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.cloud.ITopicOnMessageHandler.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

### ITopicOnMessageHandlerClient <a name="ITopicOnMessageHandlerClient" id="@winglang/sdk.cloud.ITopicOnMessageHandlerClient"></a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.ITopicOnMessageHandlerClient">ITopicOnMessageHandlerClient</a>

Inflight client for `ITopicOnMessageHandler`.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.ITopicOnMessageHandlerClient.handle">handle</a></code> | Function that will be called when a message is received from the topic. |

---

##### `handle` <a name="handle" id="@winglang/sdk.cloud.ITopicOnMessageHandlerClient.handle"></a>

```wing
inflight handle(event: str): void
```

Function that will be called when a message is received from the topic.

###### `event`<sup>Required</sup> <a name="event" id="@winglang/sdk.cloud.ITopicOnMessageHandlerClient.handle.parameter.event"></a>

- *Type:* str

---


