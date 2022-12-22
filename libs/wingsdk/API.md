# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### Bucket <a name="Bucket" id="@winglang/wingsdk.cloud.Bucket"></a>

**Inflight client:** [@winglang/wingsdk.cloud.IBucketClient](#@winglang/wingsdk.cloud.IBucketClient)

Represents a cloud object store.

#### Initializers <a name="Initializers" id="@winglang/wingsdk.cloud.Bucket.Initializer"></a>

```wing
bring cloud;

new cloud.Bucket(props?: BucketProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.Bucket.Initializer.parameter.props">props</a></code> | <code>cloud.BucketProps</code> | *No description.* |

---

##### `props`<sup>Optional</sup> <a name="props" id="@winglang/wingsdk.cloud.Bucket.Initializer.parameter.props"></a>

- *Type:* cloud.BucketProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.Bucket.toString">to_string</a></code> | Returns a string representation of this construct. |
| <code><a href="#@winglang/wingsdk.cloud.Bucket.addConnection">add_connection</a></code> | Adds a connection to this resource. |

---

##### `to_string` <a name="to_string" id="@winglang/wingsdk.cloud.Bucket.toString"></a>

```wing
to_string(): str
```

Returns a string representation of this construct.

##### `add_connection` <a name="add_connection" id="@winglang/wingsdk.cloud.Bucket.addConnection"></a>

```wing
add_connection(connections: Connection): void
```

Adds a connection to this resource.

A connection is a piece of metadata
describing how this resource is related to another resource.

###### `connections`<sup>Required</sup> <a name="connections" id="@winglang/wingsdk.cloud.Bucket.addConnection.parameter.connections"></a>

- *Type:* core.Connection

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.Bucket.isConstruct">is_construct</a></code> | Checks if `x` is a construct. |

---

##### ~~`is_construct`~~ <a name="is_construct" id="@winglang/wingsdk.cloud.Bucket.isConstruct"></a>

```wing
bring cloud;

cloud.Bucket.is_construct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@winglang/wingsdk.cloud.Bucket.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.Bucket.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/wingsdk.cloud.Bucket.property.stateful">stateful</a></code> | <code>bool</code> | Whether a resource is stateful, i.e. it stores information that is not defined by your application. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/wingsdk.cloud.Bucket.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `stateful`<sup>Required</sup> <a name="stateful" id="@winglang/wingsdk.cloud.Bucket.property.stateful"></a>

```wing
stateful: bool;
```

- *Type:* bool

Whether a resource is stateful, i.e. it stores information that is not defined by your application.

A non-stateful resource does not remember information about past
transactions or events, and can typically be replaced by a cloud provider
with a fresh copy without any consequences.

---


### Counter <a name="Counter" id="@winglang/wingsdk.cloud.Counter"></a>

**Inflight client:** [@winglang/wingsdk.cloud.ICounterClient](#@winglang/wingsdk.cloud.ICounterClient)

Represents a distributed atomic counter.

#### Initializers <a name="Initializers" id="@winglang/wingsdk.cloud.Counter.Initializer"></a>

```wing
bring cloud;

new cloud.Counter(props?: CounterProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.Counter.Initializer.parameter.props">props</a></code> | <code>cloud.CounterProps</code> | *No description.* |

---

##### `props`<sup>Optional</sup> <a name="props" id="@winglang/wingsdk.cloud.Counter.Initializer.parameter.props"></a>

- *Type:* cloud.CounterProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.Counter.toString">to_string</a></code> | Returns a string representation of this construct. |
| <code><a href="#@winglang/wingsdk.cloud.Counter.addConnection">add_connection</a></code> | Adds a connection to this resource. |

---

##### `to_string` <a name="to_string" id="@winglang/wingsdk.cloud.Counter.toString"></a>

```wing
to_string(): str
```

Returns a string representation of this construct.

##### `add_connection` <a name="add_connection" id="@winglang/wingsdk.cloud.Counter.addConnection"></a>

```wing
add_connection(connections: Connection): void
```

Adds a connection to this resource.

A connection is a piece of metadata
describing how this resource is related to another resource.

###### `connections`<sup>Required</sup> <a name="connections" id="@winglang/wingsdk.cloud.Counter.addConnection.parameter.connections"></a>

- *Type:* core.Connection

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.Counter.isConstruct">is_construct</a></code> | Checks if `x` is a construct. |

---

##### ~~`is_construct`~~ <a name="is_construct" id="@winglang/wingsdk.cloud.Counter.isConstruct"></a>

```wing
bring cloud;

cloud.Counter.is_construct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@winglang/wingsdk.cloud.Counter.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.Counter.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/wingsdk.cloud.Counter.property.stateful">stateful</a></code> | <code>bool</code> | Whether a resource is stateful, i.e. it stores information that is not defined by your application. |
| <code><a href="#@winglang/wingsdk.cloud.Counter.property.initial">initial</a></code> | <code>num</code> | The initial value of the counter. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/wingsdk.cloud.Counter.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `stateful`<sup>Required</sup> <a name="stateful" id="@winglang/wingsdk.cloud.Counter.property.stateful"></a>

```wing
stateful: bool;
```

- *Type:* bool

Whether a resource is stateful, i.e. it stores information that is not defined by your application.

A non-stateful resource does not remember information about past
transactions or events, and can typically be replaced by a cloud provider
with a fresh copy without any consequences.

---

##### `initial`<sup>Required</sup> <a name="initial" id="@winglang/wingsdk.cloud.Counter.property.initial"></a>

```wing
initial: num;
```

- *Type:* num

The initial value of the counter.

---


### Function <a name="Function" id="@winglang/wingsdk.cloud.Function"></a>

**Inflight client:** [@winglang/wingsdk.cloud.IFunctionClient](#@winglang/wingsdk.cloud.IFunctionClient)

Represents a function.

#### Initializers <a name="Initializers" id="@winglang/wingsdk.cloud.Function.Initializer"></a>

```wing
bring cloud;

new cloud.Function(inflight: ~Inflight, props?: FunctionProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.Function.Initializer.parameter.inflight">inflight</a></code> | <code>core.Inflight</code> | *No description.* |
| <code><a href="#@winglang/wingsdk.cloud.Function.Initializer.parameter.props">props</a></code> | <code>cloud.FunctionProps</code> | *No description.* |

---

##### `inflight`<sup>Required</sup> <a name="inflight" id="@winglang/wingsdk.cloud.Function.Initializer.parameter.inflight"></a>

- *Type:* core.Inflight

---

##### `props`<sup>Optional</sup> <a name="props" id="@winglang/wingsdk.cloud.Function.Initializer.parameter.props"></a>

- *Type:* cloud.FunctionProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.Function.toString">to_string</a></code> | Returns a string representation of this construct. |
| <code><a href="#@winglang/wingsdk.cloud.Function.addConnection">add_connection</a></code> | Adds a connection to this resource. |
| <code><a href="#@winglang/wingsdk.cloud.Function.addEnvironment">add_environment</a></code> | Add an environment variable to the function. |

---

##### `to_string` <a name="to_string" id="@winglang/wingsdk.cloud.Function.toString"></a>

```wing
to_string(): str
```

Returns a string representation of this construct.

##### `add_connection` <a name="add_connection" id="@winglang/wingsdk.cloud.Function.addConnection"></a>

```wing
add_connection(connections: Connection): void
```

Adds a connection to this resource.

A connection is a piece of metadata
describing how this resource is related to another resource.

###### `connections`<sup>Required</sup> <a name="connections" id="@winglang/wingsdk.cloud.Function.addConnection.parameter.connections"></a>

- *Type:* core.Connection

---

##### `add_environment` <a name="add_environment" id="@winglang/wingsdk.cloud.Function.addEnvironment"></a>

```wing
add_environment(_key: str, _value: str): void
```

Add an environment variable to the function.

###### `_key`<sup>Required</sup> <a name="_key" id="@winglang/wingsdk.cloud.Function.addEnvironment.parameter._key"></a>

- *Type:* str

---

###### `_value`<sup>Required</sup> <a name="_value" id="@winglang/wingsdk.cloud.Function.addEnvironment.parameter._value"></a>

- *Type:* str

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.Function.isConstruct">is_construct</a></code> | Checks if `x` is a construct. |

---

##### ~~`is_construct`~~ <a name="is_construct" id="@winglang/wingsdk.cloud.Function.isConstruct"></a>

```wing
bring cloud;

cloud.Function.is_construct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@winglang/wingsdk.cloud.Function.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.Function.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/wingsdk.cloud.Function.property.stateful">stateful</a></code> | <code>bool</code> | Whether a resource is stateful, i.e. it stores information that is not defined by your application. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/wingsdk.cloud.Function.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `stateful`<sup>Required</sup> <a name="stateful" id="@winglang/wingsdk.cloud.Function.property.stateful"></a>

```wing
stateful: bool;
```

- *Type:* bool

Whether a resource is stateful, i.e. it stores information that is not defined by your application.

A non-stateful resource does not remember information about past
transactions or events, and can typically be replaced by a cloud provider
with a fresh copy without any consequences.

---


### Logger <a name="Logger" id="@winglang/wingsdk.cloud.Logger"></a>

**Inflight client:** [@winglang/wingsdk.cloud.ILoggerClient](#@winglang/wingsdk.cloud.ILoggerClient)

A cloud logging facility.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.Logger.toString">to_string</a></code> | Returns a string representation of this construct. |
| <code><a href="#@winglang/wingsdk.cloud.Logger.addConnection">add_connection</a></code> | Adds a connection to this resource. |
| <code><a href="#@winglang/wingsdk.cloud.Logger.print">print</a></code> | Logs a message. |

---

##### `to_string` <a name="to_string" id="@winglang/wingsdk.cloud.Logger.toString"></a>

```wing
to_string(): str
```

Returns a string representation of this construct.

##### `add_connection` <a name="add_connection" id="@winglang/wingsdk.cloud.Logger.addConnection"></a>

```wing
add_connection(connections: Connection): void
```

Adds a connection to this resource.

A connection is a piece of metadata
describing how this resource is related to another resource.

###### `connections`<sup>Required</sup> <a name="connections" id="@winglang/wingsdk.cloud.Logger.addConnection.parameter.connections"></a>

- *Type:* core.Connection

---

##### `print` <a name="print" id="@winglang/wingsdk.cloud.Logger.print"></a>

```wing
print(message: str): void
```

Logs a message.

###### `message`<sup>Required</sup> <a name="message" id="@winglang/wingsdk.cloud.Logger.print.parameter.message"></a>

- *Type:* str

The message to log.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.Logger.isConstruct">is_construct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@winglang/wingsdk.cloud.Logger.of">of</a></code> | Returns the logger registered to the given scope, throwing an error if there is none. |
| <code><a href="#@winglang/wingsdk.cloud.Logger.register">register</a></code> | Create a logger and register it to the given scope. |

---

##### ~~`is_construct`~~ <a name="is_construct" id="@winglang/wingsdk.cloud.Logger.isConstruct"></a>

```wing
bring cloud;

cloud.Logger.is_construct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@winglang/wingsdk.cloud.Logger.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `of` <a name="of" id="@winglang/wingsdk.cloud.Logger.of"></a>

```wing
bring cloud;

cloud.Logger.of()
```

Returns the logger registered to the given scope, throwing an error if there is none.

##### `register` <a name="register" id="@winglang/wingsdk.cloud.Logger.register"></a>

```wing
bring cloud;

cloud.Logger.register()
```

Create a logger and register it to the given scope.

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.Logger.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/wingsdk.cloud.Logger.property.stateful">stateful</a></code> | <code>bool</code> | Whether a resource is stateful, i.e. it stores information that is not defined by your application. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/wingsdk.cloud.Logger.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `stateful`<sup>Required</sup> <a name="stateful" id="@winglang/wingsdk.cloud.Logger.property.stateful"></a>

```wing
stateful: bool;
```

- *Type:* bool

Whether a resource is stateful, i.e. it stores information that is not defined by your application.

A non-stateful resource does not remember information about past
transactions or events, and can typically be replaced by a cloud provider
with a fresh copy without any consequences.

---


### Queue <a name="Queue" id="@winglang/wingsdk.cloud.Queue"></a>

**Inflight client:** [@winglang/wingsdk.cloud.IQueueClient](#@winglang/wingsdk.cloud.IQueueClient)

Represents a queue.

#### Initializers <a name="Initializers" id="@winglang/wingsdk.cloud.Queue.Initializer"></a>

```wing
bring cloud;

new cloud.Queue(props?: QueueProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.Queue.Initializer.parameter.props">props</a></code> | <code>cloud.QueueProps</code> | *No description.* |

---

##### `props`<sup>Optional</sup> <a name="props" id="@winglang/wingsdk.cloud.Queue.Initializer.parameter.props"></a>

- *Type:* cloud.QueueProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.Queue.toString">to_string</a></code> | Returns a string representation of this construct. |
| <code><a href="#@winglang/wingsdk.cloud.Queue.addConnection">add_connection</a></code> | Adds a connection to this resource. |
| <code><a href="#@winglang/wingsdk.cloud.Queue.onMessage">on_message</a></code> | Create a function to consume messages from this queue. |

---

##### `to_string` <a name="to_string" id="@winglang/wingsdk.cloud.Queue.toString"></a>

```wing
to_string(): str
```

Returns a string representation of this construct.

##### `add_connection` <a name="add_connection" id="@winglang/wingsdk.cloud.Queue.addConnection"></a>

```wing
add_connection(connections: Connection): void
```

Adds a connection to this resource.

A connection is a piece of metadata
describing how this resource is related to another resource.

###### `connections`<sup>Required</sup> <a name="connections" id="@winglang/wingsdk.cloud.Queue.addConnection.parameter.connections"></a>

- *Type:* core.Connection

---

##### `on_message` <a name="on_message" id="@winglang/wingsdk.cloud.Queue.onMessage"></a>

```wing
on_message(inflight: ~Inflight, props?: QueueOnMessageProps): Function
```

Create a function to consume messages from this queue.

###### `inflight`<sup>Required</sup> <a name="inflight" id="@winglang/wingsdk.cloud.Queue.onMessage.parameter.inflight"></a>

- *Type:* core.Inflight

---

###### `props`<sup>Optional</sup> <a name="props" id="@winglang/wingsdk.cloud.Queue.onMessage.parameter.props"></a>

- *Type:* cloud.QueueOnMessageProps

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.Queue.isConstruct">is_construct</a></code> | Checks if `x` is a construct. |

---

##### ~~`is_construct`~~ <a name="is_construct" id="@winglang/wingsdk.cloud.Queue.isConstruct"></a>

```wing
bring cloud;

cloud.Queue.is_construct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@winglang/wingsdk.cloud.Queue.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.Queue.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/wingsdk.cloud.Queue.property.stateful">stateful</a></code> | <code>bool</code> | Whether a resource is stateful, i.e. it stores information that is not defined by your application. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/wingsdk.cloud.Queue.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `stateful`<sup>Required</sup> <a name="stateful" id="@winglang/wingsdk.cloud.Queue.property.stateful"></a>

```wing
stateful: bool;
```

- *Type:* bool

Whether a resource is stateful, i.e. it stores information that is not defined by your application.

A non-stateful resource does not remember information about past
transactions or events, and can typically be replaced by a cloud provider
with a fresh copy without any consequences.

---


### Topic <a name="Topic" id="@winglang/wingsdk.cloud.Topic"></a>

**Inflight client:** [@winglang/wingsdk.cloud.ITopicClient](#@winglang/wingsdk.cloud.ITopicClient)

Represents a topic.

#### Initializers <a name="Initializers" id="@winglang/wingsdk.cloud.Topic.Initializer"></a>

```wing
bring cloud;

new cloud.Topic(props?: TopicProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.Topic.Initializer.parameter.props">props</a></code> | <code>cloud.TopicProps</code> | *No description.* |

---

##### `props`<sup>Optional</sup> <a name="props" id="@winglang/wingsdk.cloud.Topic.Initializer.parameter.props"></a>

- *Type:* cloud.TopicProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.Topic.toString">to_string</a></code> | Returns a string representation of this construct. |
| <code><a href="#@winglang/wingsdk.cloud.Topic.addConnection">add_connection</a></code> | Adds a connection to this resource. |
| <code><a href="#@winglang/wingsdk.cloud.Topic.onMessage">on_message</a></code> | Creates function to send messages when published. |

---

##### `to_string` <a name="to_string" id="@winglang/wingsdk.cloud.Topic.toString"></a>

```wing
to_string(): str
```

Returns a string representation of this construct.

##### `add_connection` <a name="add_connection" id="@winglang/wingsdk.cloud.Topic.addConnection"></a>

```wing
add_connection(connections: Connection): void
```

Adds a connection to this resource.

A connection is a piece of metadata
describing how this resource is related to another resource.

###### `connections`<sup>Required</sup> <a name="connections" id="@winglang/wingsdk.cloud.Topic.addConnection.parameter.connections"></a>

- *Type:* core.Connection

---

##### `on_message` <a name="on_message" id="@winglang/wingsdk.cloud.Topic.onMessage"></a>

```wing
on_message(inflight: ~Inflight, props?: TopicOnMessageProps): Function
```

Creates function to send messages when published.

###### `inflight`<sup>Required</sup> <a name="inflight" id="@winglang/wingsdk.cloud.Topic.onMessage.parameter.inflight"></a>

- *Type:* core.Inflight

---

###### `props`<sup>Optional</sup> <a name="props" id="@winglang/wingsdk.cloud.Topic.onMessage.parameter.props"></a>

- *Type:* cloud.TopicOnMessageProps

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.Topic.isConstruct">is_construct</a></code> | Checks if `x` is a construct. |

---

##### ~~`is_construct`~~ <a name="is_construct" id="@winglang/wingsdk.cloud.Topic.isConstruct"></a>

```wing
bring cloud;

cloud.Topic.is_construct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@winglang/wingsdk.cloud.Topic.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.Topic.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/wingsdk.cloud.Topic.property.stateful">stateful</a></code> | <code>bool</code> | Whether a resource is stateful, i.e. it stores information that is not defined by your application. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/wingsdk.cloud.Topic.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `stateful`<sup>Required</sup> <a name="stateful" id="@winglang/wingsdk.cloud.Topic.property.stateful"></a>

```wing
stateful: bool;
```

- *Type:* bool

Whether a resource is stateful, i.e. it stores information that is not defined by your application.

A non-stateful resource does not remember information about past
transactions or events, and can typically be replaced by a cloud provider
with a fresh copy without any consequences.

---


## Structs <a name="Structs" id="Structs"></a>

### AppProps <a name="AppProps" id="@winglang/wingsdk.core.AppProps"></a>

Props for all `App` classes.

#### Initializer <a name="Initializer" id="@winglang/wingsdk.core.AppProps.Initializer"></a>

```wing
bring core;

let app_props = core.AppProps{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.core.AppProps.property.customFactory">custom_factory</a></code> | <code>polycons.IPolyconFactory</code> | A custom factory to resolve polycons. |
| <code><a href="#@winglang/wingsdk.core.AppProps.property.name">name</a></code> | <code>str</code> | The name of the app. |
| <code><a href="#@winglang/wingsdk.core.AppProps.property.outdir">outdir</a></code> | <code>str</code> | Directory where artifacts are synthesized to. |
| <code><a href="#@winglang/wingsdk.core.AppProps.property.stateFile">state_file</a></code> | <code>str</code> | The path to a state file which will track all synthesized files. |

---

##### `custom_factory`<sup>Optional</sup> <a name="custom_factory" id="@winglang/wingsdk.core.AppProps.property.customFactory"></a>

```wing
custom_factory: IPolyconFactory;
```

- *Type:* polycons.IPolyconFactory
- *Default:* use the default polycon factory included in the Wing SDK

A custom factory to resolve polycons.

---

##### `name`<sup>Optional</sup> <a name="name" id="@winglang/wingsdk.core.AppProps.property.name"></a>

```wing
name: str;
```

- *Type:* str
- *Default:* "app"

The name of the app.

---

##### `outdir`<sup>Optional</sup> <a name="outdir" id="@winglang/wingsdk.core.AppProps.property.outdir"></a>

```wing
outdir: str;
```

- *Type:* str
- *Default:* current working directory

Directory where artifacts are synthesized to.

---

##### `state_file`<sup>Optional</sup> <a name="state_file" id="@winglang/wingsdk.core.AppProps.property.stateFile"></a>

```wing
state_file: str;
```

- *Type:* str
- *Default:* no state file

The path to a state file which will track all synthesized files.

If a
statefile is not specified, we won't be able to remove extrenous files.

---

### BucketDeleteOptions <a name="BucketDeleteOptions" id="@winglang/wingsdk.cloud.BucketDeleteOptions"></a>

Interface for delete method inside `Bucket`.

#### Initializer <a name="Initializer" id="@winglang/wingsdk.cloud.BucketDeleteOptions.Initializer"></a>

```wing
bring cloud;

let bucket_delete_options = cloud.BucketDeleteOptions{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.BucketDeleteOptions.property.mustExist">must_exist</a></code> | <code>bool</code> | Check failures on the method and retrieve errors if any. |

---

##### `must_exist`<sup>Optional</sup> <a name="must_exist" id="@winglang/wingsdk.cloud.BucketDeleteOptions.property.mustExist"></a>

```wing
must_exist: bool;
```

- *Type:* bool
- *Default:* false

Check failures on the method and retrieve errors if any.

---

### BucketProps <a name="BucketProps" id="@winglang/wingsdk.cloud.BucketProps"></a>

Properties for `Bucket`.

#### Initializer <a name="Initializer" id="@winglang/wingsdk.cloud.BucketProps.Initializer"></a>

```wing
bring cloud;

let bucket_props = cloud.BucketProps{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.BucketProps.property.public">public</a></code> | <code>bool</code> | Whether the bucket's objects should be publicly accessible. |

---

##### `public`<sup>Optional</sup> <a name="public" id="@winglang/wingsdk.cloud.BucketProps.property.public"></a>

```wing
public: bool;
```

- *Type:* bool
- *Default:* false

Whether the bucket's objects should be publicly accessible.

---

### Connection <a name="Connection" id="@winglang/wingsdk.core.Connection"></a>

A connection between two resources.

#### Initializer <a name="Initializer" id="@winglang/wingsdk.core.Connection.Initializer"></a>

```wing
bring core;

let connection = core.Connection{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.core.Connection.property.direction">direction</a></code> | <code>core.Direction</code> | The direction of the connection. |
| <code><a href="#@winglang/wingsdk.core.Connection.property.relationship">relationship</a></code> | <code>str</code> | The type of relationship with the resource. |
| <code><a href="#@winglang/wingsdk.core.Connection.property.resource">resource</a></code> | <code>core.Resource</code> | The resource this connection is to. |

---

##### `direction`<sup>Required</sup> <a name="direction" id="@winglang/wingsdk.core.Connection.property.direction"></a>

```wing
direction: Direction;
```

- *Type:* core.Direction

The direction of the connection.

---

##### `relationship`<sup>Required</sup> <a name="relationship" id="@winglang/wingsdk.core.Connection.property.relationship"></a>

```wing
relationship: str;
```

- *Type:* str

The type of relationship with the resource.

---

##### `resource`<sup>Required</sup> <a name="resource" id="@winglang/wingsdk.core.Connection.property.resource"></a>

```wing
resource: Resource;
```

- *Type:* core.Resource

The resource this connection is to.

---

### ConstructInfo <a name="ConstructInfo" id="@winglang/wingsdk.core.ConstructInfo"></a>

Source information on a construct (class fqn and version).

#### Initializer <a name="Initializer" id="@winglang/wingsdk.core.ConstructInfo.Initializer"></a>

```wing
bring core;

let construct_info = core.ConstructInfo{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.core.ConstructInfo.property.fqn">fqn</a></code> | <code>str</code> | Fully qualified class name. |
| <code><a href="#@winglang/wingsdk.core.ConstructInfo.property.version">version</a></code> | <code>str</code> | Version of the module. |

---

##### `fqn`<sup>Required</sup> <a name="fqn" id="@winglang/wingsdk.core.ConstructInfo.property.fqn"></a>

```wing
fqn: str;
```

- *Type:* str

Fully qualified class name.

---

##### `version`<sup>Required</sup> <a name="version" id="@winglang/wingsdk.core.ConstructInfo.property.version"></a>

```wing
version: str;
```

- *Type:* str

Version of the module.

---

### ConstructTree <a name="ConstructTree" id="@winglang/wingsdk.core.ConstructTree"></a>

The construct tree.

#### Initializer <a name="Initializer" id="@winglang/wingsdk.core.ConstructTree.Initializer"></a>

```wing
bring core;

let construct_tree = core.ConstructTree{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.core.ConstructTree.property.tree">tree</a></code> | <code>core.ConstructTreeNode</code> | The root node. |
| <code><a href="#@winglang/wingsdk.core.ConstructTree.property.version">version</a></code> | <code>str</code> | The construct tree version. |

---

##### `tree`<sup>Required</sup> <a name="tree" id="@winglang/wingsdk.core.ConstructTree.property.tree"></a>

```wing
tree: ConstructTreeNode;
```

- *Type:* core.ConstructTreeNode

The root node.

---

##### `version`<sup>Required</sup> <a name="version" id="@winglang/wingsdk.core.ConstructTree.property.version"></a>

```wing
version: str;
```

- *Type:* str

The construct tree version.

---

### ConstructTreeNode <a name="ConstructTreeNode" id="@winglang/wingsdk.core.ConstructTreeNode"></a>

A node in the construct tree.

#### Initializer <a name="Initializer" id="@winglang/wingsdk.core.ConstructTreeNode.Initializer"></a>

```wing
bring core;

let construct_tree_node = core.ConstructTreeNode{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.core.ConstructTreeNode.property.id">id</a></code> | <code>str</code> | The ID of the node. |
| <code><a href="#@winglang/wingsdk.core.ConstructTreeNode.property.path">path</a></code> | <code>str</code> | The path of the node. |
| <code><a href="#@winglang/wingsdk.core.ConstructTreeNode.property.attributes">attributes</a></code> | <code>MutMap&lt;any&gt;</code> | The node attributes. |
| <code><a href="#@winglang/wingsdk.core.ConstructTreeNode.property.children">children</a></code> | <code>MutMap&lt;core.ConstructTreeNode&gt;</code> | The child nodes. |
| <code><a href="#@winglang/wingsdk.core.ConstructTreeNode.property.constructInfo">construct_info</a></code> | <code>core.ConstructInfo</code> | Information on the construct class that led to this node, if available. |

---

##### `id`<sup>Required</sup> <a name="id" id="@winglang/wingsdk.core.ConstructTreeNode.property.id"></a>

```wing
id: str;
```

- *Type:* str

The ID of the node.

Is part of the `path`.

---

##### `path`<sup>Required</sup> <a name="path" id="@winglang/wingsdk.core.ConstructTreeNode.property.path"></a>

```wing
path: str;
```

- *Type:* str

The path of the node.

---

##### `attributes`<sup>Optional</sup> <a name="attributes" id="@winglang/wingsdk.core.ConstructTreeNode.property.attributes"></a>

```wing
attributes: MutMap<any>;
```

- *Type:* MutMap&lt;any&gt;

The node attributes.

---

##### `children`<sup>Optional</sup> <a name="children" id="@winglang/wingsdk.core.ConstructTreeNode.property.children"></a>

```wing
children: MutMap<ConstructTreeNode>;
```

- *Type:* MutMap&lt;core.ConstructTreeNode&gt;

The child nodes.

---

##### `construct_info`<sup>Optional</sup> <a name="construct_info" id="@winglang/wingsdk.core.ConstructTreeNode.property.constructInfo"></a>

```wing
construct_info: ConstructInfo;
```

- *Type:* core.ConstructInfo

Information on the construct class that led to this node, if available.

---

### CounterProps <a name="CounterProps" id="@winglang/wingsdk.cloud.CounterProps"></a>

Properties for `Counter`.

#### Initializer <a name="Initializer" id="@winglang/wingsdk.cloud.CounterProps.Initializer"></a>

```wing
bring cloud;

let counter_props = cloud.CounterProps{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.CounterProps.property.initial">initial</a></code> | <code>num</code> | The initial value of the counter. |

---

##### `initial`<sup>Optional</sup> <a name="initial" id="@winglang/wingsdk.cloud.CounterProps.property.initial"></a>

```wing
initial: num;
```

- *Type:* num
- *Default:* 0

The initial value of the counter.

---

### FilesProps <a name="FilesProps" id="@winglang/wingsdk.core.FilesProps"></a>

Props for `Files`.

#### Initializer <a name="Initializer" id="@winglang/wingsdk.core.FilesProps.Initializer"></a>

```wing
bring core;

let files_props = core.FilesProps{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.core.FilesProps.property.app">app</a></code> | <code>core.IApp</code> | The app with files to synthesize. |
| <code><a href="#@winglang/wingsdk.core.FilesProps.property.stateFile">state_file</a></code> | <code>str</code> | The path to a state file which will track all synthesized files. |

---

##### `app`<sup>Required</sup> <a name="app" id="@winglang/wingsdk.core.FilesProps.property.app"></a>

```wing
app: IApp;
```

- *Type:* core.IApp

The app with files to synthesize.

---

##### `state_file`<sup>Optional</sup> <a name="state_file" id="@winglang/wingsdk.core.FilesProps.property.stateFile"></a>

```wing
state_file: str;
```

- *Type:* str
- *Default:* no state file

The path to a state file which will track all synthesized files.

If a
statefile is not specified, we won't be able to remove extrenous files.

---

### FunctionProps <a name="FunctionProps" id="@winglang/wingsdk.cloud.FunctionProps"></a>

Properties for `Function`.

This is the type users see when constructing a cloud.Function instance.

#### Initializer <a name="Initializer" id="@winglang/wingsdk.cloud.FunctionProps.Initializer"></a>

```wing
bring cloud;

let function_props = cloud.FunctionProps{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.FunctionProps.property.env">env</a></code> | <code>MutMap&lt;str&gt;</code> | Environment variables to pass to the function. |

---

##### `env`<sup>Optional</sup> <a name="env" id="@winglang/wingsdk.cloud.FunctionProps.property.env"></a>

```wing
env: MutMap<str>;
```

- *Type:* MutMap&lt;str&gt;
- *Default:* No environment variables.

Environment variables to pass to the function.

---

### InflightBinding <a name="InflightBinding" id="@winglang/wingsdk.core.InflightBinding"></a>

A resource binding.

#### Initializer <a name="Initializer" id="@winglang/wingsdk.core.InflightBinding.Initializer"></a>

```wing
bring core;

let inflight_binding = core.InflightBinding{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.core.InflightBinding.property.ops">ops</a></code> | <code>MutArray&lt;str&gt;</code> | The list of operations used on the resource. |
| <code><a href="#@winglang/wingsdk.core.InflightBinding.property.resource">resource</a></code> | <code>core.IResource</code> | The resource. |

---

##### `ops`<sup>Required</sup> <a name="ops" id="@winglang/wingsdk.core.InflightBinding.property.ops"></a>

```wing
ops: MutArray<str>;
```

- *Type:* MutArray&lt;str&gt;

The list of operations used on the resource.

---

##### `resource`<sup>Required</sup> <a name="resource" id="@winglang/wingsdk.core.InflightBinding.property.resource"></a>

```wing
resource: IResource;
```

- *Type:* core.IResource

The resource.

---

### InflightProps <a name="InflightProps" id="@winglang/wingsdk.core.InflightProps"></a>

Props for `Inflight`.

#### Initializer <a name="Initializer" id="@winglang/wingsdk.core.InflightProps.Initializer"></a>

```wing
bring core;

let inflight_props = core.InflightProps{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.core.InflightProps.property.code">code</a></code> | <code>core.Code</code> | Reference to the inflight code. Only JavaScript code is currently supported. |
| <code><a href="#@winglang/wingsdk.core.InflightProps.property.bindings">bindings</a></code> | <code>MutMap&lt;core.InflightBinding&gt;</code> | Resource binding information. |

---

##### `code`<sup>Required</sup> <a name="code" id="@winglang/wingsdk.core.InflightProps.property.code"></a>

```wing
code: Code;
```

- *Type:* core.Code

Reference to the inflight code. Only JavaScript code is currently supported.

The JavaScript code needs be in the form `async handle(event) { ... }`, and
all references to resources must be made through `this.<resource>`.

---

##### `bindings`<sup>Optional</sup> <a name="bindings" id="@winglang/wingsdk.core.InflightProps.property.bindings"></a>

```wing
bindings: MutMap<InflightBinding>;
```

- *Type:* MutMap&lt;core.InflightBinding&gt;
- *Default:* no bindings

Resource binding information.

---

### JsonFileProps <a name="JsonFileProps" id="@winglang/wingsdk.fs.JsonFileProps"></a>

Props for `JsonFile`.

#### Initializer <a name="Initializer" id="@winglang/wingsdk.fs.JsonFileProps.Initializer"></a>

```wing
bring fs;

let json_file_props = fs.JsonFileProps{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.fs.JsonFileProps.property.obj">obj</a></code> | <code>any</code> | The object that will be serialized into the file during synthesis. |

---

##### `obj`<sup>Required</sup> <a name="obj" id="@winglang/wingsdk.fs.JsonFileProps.property.obj"></a>

```wing
obj: any;
```

- *Type:* any

The object that will be serialized into the file during synthesis.

---

### OperationAnnotation <a name="OperationAnnotation" id="@winglang/wingsdk.core.OperationAnnotation"></a>

Annotations about what resources an inflight operation may access.

The following example says that the operation may call "put" on a resource
at "this.inner", or it may call "get" on a resource passed as an argument named
"other".

*Example*

```wing
{ "this.inner": { ops: ["put"] }, "other": { ops: ["get"] } }
```


#### Initializer <a name="Initializer" id="@winglang/wingsdk.core.OperationAnnotation.Initializer"></a>

```wing
bring core;

let operation_annotation = core.OperationAnnotation{ ... }
```


### QueueOnMessageProps <a name="QueueOnMessageProps" id="@winglang/wingsdk.cloud.QueueOnMessageProps"></a>

Options for Queue.onMessage.

#### Initializer <a name="Initializer" id="@winglang/wingsdk.cloud.QueueOnMessageProps.Initializer"></a>

```wing
bring cloud;

let queue_on_message_props = cloud.QueueOnMessageProps{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.QueueOnMessageProps.property.env">env</a></code> | <code>MutMap&lt;str&gt;</code> | Environment variables to pass to the function. |
| <code><a href="#@winglang/wingsdk.cloud.QueueOnMessageProps.property.batchSize">batch_size</a></code> | <code>num</code> | The maximum number of messages to send to subscribers at once. |

---

##### `env`<sup>Optional</sup> <a name="env" id="@winglang/wingsdk.cloud.QueueOnMessageProps.property.env"></a>

```wing
env: MutMap<str>;
```

- *Type:* MutMap&lt;str&gt;
- *Default:* No environment variables.

Environment variables to pass to the function.

---

##### `batch_size`<sup>Optional</sup> <a name="batch_size" id="@winglang/wingsdk.cloud.QueueOnMessageProps.property.batchSize"></a>

```wing
batch_size: num;
```

- *Type:* num
- *Default:* 1

The maximum number of messages to send to subscribers at once.

---

### QueueProps <a name="QueueProps" id="@winglang/wingsdk.cloud.QueueProps"></a>

Properties for `Queue`.

#### Initializer <a name="Initializer" id="@winglang/wingsdk.cloud.QueueProps.Initializer"></a>

```wing
bring cloud;

let queue_props = cloud.QueueProps{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.QueueProps.property.initialMessages">initial_messages</a></code> | <code>MutArray&lt;str&gt;</code> | Initialize the queue with a set of messages. |
| <code><a href="#@winglang/wingsdk.cloud.QueueProps.property.timeout">timeout</a></code> | <code>std.Duration</code> | How long a queue's consumers have to process a message. |

---

##### `initial_messages`<sup>Optional</sup> <a name="initial_messages" id="@winglang/wingsdk.cloud.QueueProps.property.initialMessages"></a>

```wing
initial_messages: MutArray<str>;
```

- *Type:* MutArray&lt;str&gt;
- *Default:* []

Initialize the queue with a set of messages.

---

##### `timeout`<sup>Optional</sup> <a name="timeout" id="@winglang/wingsdk.cloud.QueueProps.property.timeout"></a>

```wing
timeout: Duration;
```

- *Type:* std.Duration
- *Default:* Duration.fromSeconds(10)

How long a queue's consumers have to process a message.

---

### TextFileProps <a name="TextFileProps" id="@winglang/wingsdk.fs.TextFileProps"></a>

Props for `TextFile`.

#### Initializer <a name="Initializer" id="@winglang/wingsdk.fs.TextFileProps.Initializer"></a>

```wing
bring fs;

let text_file_props = fs.TextFileProps{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.fs.TextFileProps.property.lines">lines</a></code> | <code>MutArray&lt;str&gt;</code> | The lines of text that will be serialized into the file during synthesis. |

---

##### `lines`<sup>Optional</sup> <a name="lines" id="@winglang/wingsdk.fs.TextFileProps.property.lines"></a>

```wing
lines: MutArray<str>;
```

- *Type:* MutArray&lt;str&gt;
- *Default:* []

The lines of text that will be serialized into the file during synthesis.

They will be joined with newline characters.

---

### TopicOnMessageProps <a name="TopicOnMessageProps" id="@winglang/wingsdk.cloud.TopicOnMessageProps"></a>

Options for Topic.onMessage.

#### Initializer <a name="Initializer" id="@winglang/wingsdk.cloud.TopicOnMessageProps.Initializer"></a>

```wing
bring cloud;

let topic_on_message_props = cloud.TopicOnMessageProps{ ... }
```


### TopicProps <a name="TopicProps" id="@winglang/wingsdk.cloud.TopicProps"></a>

Properties for `Topic`.

#### Initializer <a name="Initializer" id="@winglang/wingsdk.cloud.TopicProps.Initializer"></a>

```wing
bring cloud;

let topic_props = cloud.TopicProps{ ... }
```


## Classes <a name="Classes" id="Classes"></a>

### DependencyGraph <a name="DependencyGraph" id="@winglang/wingsdk.core.DependencyGraph"></a>

Represents the dependency graph for a given Node.

This graph includes the dependency relationships between all nodes in the
node (construct) sub-tree who's root is this Node.

Note that this means that lonely nodes (no dependencies and no dependants) are also included in this graph as
childless children of the root node of the graph.

The graph does not include cross-scope dependencies. That is, if a child on the current scope depends on a node
from a different scope, that relationship is not represented in this graph.

#### Initializers <a name="Initializers" id="@winglang/wingsdk.core.DependencyGraph.Initializer"></a>

```wing
bring core;

new core.DependencyGraph(node: Node)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.core.DependencyGraph.Initializer.parameter.node">node</a></code> | <code>constructs.Node</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/wingsdk.core.DependencyGraph.Initializer.parameter.node"></a>

- *Type:* constructs.Node

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.core.DependencyGraph.topology">topology</a></code> | Returns a topologically sorted array of the constructs in the sub-graph. |

---

##### `topology` <a name="topology" id="@winglang/wingsdk.core.DependencyGraph.topology"></a>

```wing
topology(): MutArray<IConstruct>
```

Returns a topologically sorted array of the constructs in the sub-graph.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.core.DependencyGraph.property.root">root</a></code> | <code>core.DependencyVertex</code> | Returns the root of the graph. |

---

##### `root`<sup>Required</sup> <a name="root" id="@winglang/wingsdk.core.DependencyGraph.property.root"></a>

```wing
root: DependencyVertex;
```

- *Type:* core.DependencyVertex

Returns the root of the graph.

Note that this vertex will always have `null` as its `.value` since it is an artifical root
that binds all the connected spaces of the graph.

---


### DependencyVertex <a name="DependencyVertex" id="@winglang/wingsdk.core.DependencyVertex"></a>

Represents a vertex in the graph.

The value of each vertex is an `IConstruct` that is accessible via the `.value` getter.

#### Initializers <a name="Initializers" id="@winglang/wingsdk.core.DependencyVertex.Initializer"></a>

```wing
bring core;

new core.DependencyVertex(value?: IConstruct)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.core.DependencyVertex.Initializer.parameter.value">value</a></code> | <code>constructs.IConstruct</code> | *No description.* |

---

##### `value`<sup>Optional</sup> <a name="value" id="@winglang/wingsdk.core.DependencyVertex.Initializer.parameter.value"></a>

- *Type:* constructs.IConstruct

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.core.DependencyVertex.addChild">add_child</a></code> | Adds a vertex as a dependency of the current node. |
| <code><a href="#@winglang/wingsdk.core.DependencyVertex.topology">topology</a></code> | Returns a topologically sorted array of the constructs in the sub-graph. |

---

##### `add_child` <a name="add_child" id="@winglang/wingsdk.core.DependencyVertex.addChild"></a>

```wing
add_child(dep: DependencyVertex): void
```

Adds a vertex as a dependency of the current node.

Also updates the parents of `dep`, so that it contains this node as a parent.

This operation will fail in case it creates a cycle in the graph.

###### `dep`<sup>Required</sup> <a name="dep" id="@winglang/wingsdk.core.DependencyVertex.addChild.parameter.dep"></a>

- *Type:* core.DependencyVertex

The dependency.

---

##### `topology` <a name="topology" id="@winglang/wingsdk.core.DependencyVertex.topology"></a>

```wing
topology(): MutArray<IConstruct>
```

Returns a topologically sorted array of the constructs in the sub-graph.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.core.DependencyVertex.property.inbound">inbound</a></code> | <code>MutArray&lt;core.DependencyVertex&gt;</code> | Returns the parents of the vertex (i.e dependants). |
| <code><a href="#@winglang/wingsdk.core.DependencyVertex.property.outbound">outbound</a></code> | <code>MutArray&lt;core.DependencyVertex&gt;</code> | Returns the children of the vertex (i.e dependencies). |
| <code><a href="#@winglang/wingsdk.core.DependencyVertex.property.value">value</a></code> | <code>constructs.IConstruct</code> | Returns the IConstruct this graph vertex represents. |

---

##### `inbound`<sup>Required</sup> <a name="inbound" id="@winglang/wingsdk.core.DependencyVertex.property.inbound"></a>

```wing
inbound: MutArray<DependencyVertex>;
```

- *Type:* MutArray&lt;core.DependencyVertex&gt;

Returns the parents of the vertex (i.e dependants).

---

##### `outbound`<sup>Required</sup> <a name="outbound" id="@winglang/wingsdk.core.DependencyVertex.property.outbound"></a>

```wing
outbound: MutArray<DependencyVertex>;
```

- *Type:* MutArray&lt;core.DependencyVertex&gt;

Returns the children of the vertex (i.e dependencies).

---

##### `value`<sup>Optional</sup> <a name="value" id="@winglang/wingsdk.core.DependencyVertex.property.value"></a>

```wing
value: IConstruct;
```

- *Type:* constructs.IConstruct

Returns the IConstruct this graph vertex represents.

`null` in case this is the root of the graph.

---


### Files <a name="Files" id="@winglang/wingsdk.core.Files"></a>

Handles the synthesis of files.

#### Initializers <a name="Initializers" id="@winglang/wingsdk.core.Files.Initializer"></a>

```wing
bring core;

new core.Files(props: FilesProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.core.Files.Initializer.parameter.props">props</a></code> | <code>core.FilesProps</code> | *No description.* |

---

##### `props`<sup>Required</sup> <a name="props" id="@winglang/wingsdk.core.Files.Initializer.parameter.props"></a>

- *Type:* core.FilesProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.core.Files.synth">synth</a></code> | Synthesize the app into the output directory. |

---

##### `synth` <a name="synth" id="@winglang/wingsdk.core.Files.synth"></a>

```wing
synth(outdir?: str): void
```

Synthesize the app into the output directory.

The artifact produced
depends on what synthesizer was used.

###### `outdir`<sup>Optional</sup> <a name="outdir" id="@winglang/wingsdk.core.Files.synth.parameter.outdir"></a>

- *Type:* str

The output directory, if not specified, the app's outdir will be used.

---


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.core.Files.property.stateFile">state_file</a></code> | <code>str</code> | The path to a state file which will track all synthesized files. |

---

##### `state_file`<sup>Optional</sup> <a name="state_file" id="@winglang/wingsdk.core.Files.property.stateFile"></a>

```wing
state_file: str;
```

- *Type:* str

The path to a state file which will track all synthesized files.

---


### InflightClient <a name="InflightClient" id="@winglang/wingsdk.core.InflightClient"></a>

Utility class with functions about inflight clients.


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.core.InflightClient.for">for</a></code> | Creates a `Code` instance with code for creating an inflight client. |

---

##### `for` <a name="for" id="@winglang/wingsdk.core.InflightClient.for"></a>

```wing
bring core;

core.InflightClient.for(filename: str, client_class: str, args: MutArray<str>)
```

Creates a `Code` instance with code for creating an inflight client.

###### `filename`<sup>Required</sup> <a name="filename" id="@winglang/wingsdk.core.InflightClient.for.parameter.filename"></a>

- *Type:* str

---

###### `client_class`<sup>Required</sup> <a name="client_class" id="@winglang/wingsdk.core.InflightClient.for.parameter.clientClass"></a>

- *Type:* str

---

###### `args`<sup>Required</sup> <a name="args" id="@winglang/wingsdk.core.InflightClient.for.parameter.args"></a>

- *Type:* MutArray&lt;str&gt;

---



### NodeJsCode <a name="NodeJsCode" id="@winglang/wingsdk.core.NodeJsCode"></a>

Reference to a piece of Node.js code.


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.core.NodeJsCode.fromFile">from_file</a></code> | Reference code from a file path. |
| <code><a href="#@winglang/wingsdk.core.NodeJsCode.fromInline">from_inline</a></code> | Reference code directly from a string. |

---

##### `from_file` <a name="from_file" id="@winglang/wingsdk.core.NodeJsCode.fromFile"></a>

```wing
bring core;

core.NodeJsCode.from_file(path: str)
```

Reference code from a file path.

###### `path`<sup>Required</sup> <a name="path" id="@winglang/wingsdk.core.NodeJsCode.fromFile.parameter.path"></a>

- *Type:* str

---

##### `from_inline` <a name="from_inline" id="@winglang/wingsdk.core.NodeJsCode.fromInline"></a>

```wing
bring core;

core.NodeJsCode.from_inline(text: str)
```

Reference code directly from a string.

###### `text`<sup>Required</sup> <a name="text" id="@winglang/wingsdk.core.NodeJsCode.fromInline.parameter.text"></a>

- *Type:* str

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.core.NodeJsCode.property.hash">hash</a></code> | <code>str</code> | Generate a hash of the code contents. |
| <code><a href="#@winglang/wingsdk.core.NodeJsCode.property.language">language</a></code> | <code>core.Language</code> | The language of the code. |
| <code><a href="#@winglang/wingsdk.core.NodeJsCode.property.path">path</a></code> | <code>str</code> | A path to the code in the user's file system that can be referenced for bundling purposes. |
| <code><a href="#@winglang/wingsdk.core.NodeJsCode.property.sanitizedText">sanitized_text</a></code> | <code>str</code> | The code contents, sanitized for unit testing. |
| <code><a href="#@winglang/wingsdk.core.NodeJsCode.property.text">text</a></code> | <code>str</code> | The code contents. |

---

##### `hash`<sup>Required</sup> <a name="hash" id="@winglang/wingsdk.core.NodeJsCode.property.hash"></a>

```wing
hash: str;
```

- *Type:* str

Generate a hash of the code contents.

---

##### `language`<sup>Required</sup> <a name="language" id="@winglang/wingsdk.core.NodeJsCode.property.language"></a>

```wing
language: Language;
```

- *Type:* core.Language

The language of the code.

---

##### `path`<sup>Required</sup> <a name="path" id="@winglang/wingsdk.core.NodeJsCode.property.path"></a>

```wing
path: str;
```

- *Type:* str

A path to the code in the user's file system that can be referenced for bundling purposes.

---

##### `sanitized_text`<sup>Required</sup> <a name="sanitized_text" id="@winglang/wingsdk.core.NodeJsCode.property.sanitizedText"></a>

```wing
sanitized_text: str;
```

- *Type:* str

The code contents, sanitized for unit testing.

---

##### `text`<sup>Required</sup> <a name="text" id="@winglang/wingsdk.core.NodeJsCode.property.text"></a>

```wing
text: str;
```

- *Type:* str

The code contents.

---


### TreeInspector <a name="TreeInspector" id="@winglang/wingsdk.core.TreeInspector"></a>

Inspector that maintains an attribute bag.

#### Initializers <a name="Initializers" id="@winglang/wingsdk.core.TreeInspector.Initializer"></a>

```wing
bring core;

new core.TreeInspector()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.core.TreeInspector.addAttribute">add_attribute</a></code> | Adds attribute to bag. |

---

##### `add_attribute` <a name="add_attribute" id="@winglang/wingsdk.core.TreeInspector.addAttribute"></a>

```wing
add_attribute(key: str, value: any): void
```

Adds attribute to bag.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/wingsdk.core.TreeInspector.addAttribute.parameter.key"></a>

- *Type:* str

key for metadata.

---

###### `value`<sup>Required</sup> <a name="value" id="@winglang/wingsdk.core.TreeInspector.addAttribute.parameter.value"></a>

- *Type:* any

value of metadata.

---


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.core.TreeInspector.property.attributes">attributes</a></code> | <code>MutMap&lt;any&gt;</code> | Represents the bag of attributes as key-value pairs. |

---

##### `attributes`<sup>Required</sup> <a name="attributes" id="@winglang/wingsdk.core.TreeInspector.property.attributes"></a>

```wing
attributes: MutMap<any>;
```

- *Type:* MutMap&lt;any&gt;

Represents the bag of attributes as key-value pairs.

---


## Protocols <a name="Protocols" id="Protocols"></a>

### IApp <a name="IApp" id="@winglang/wingsdk.core.IApp"></a>

- *Extends:* constructs.IConstruct

- *Implemented By:* core.CdktfApp, sim.App, testing.SimApp, tfaws.App, core.IApp

A Wing application.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.core.IApp.synth">synth</a></code> | Synthesize the app into an artifact. |

---

##### `synth` <a name="synth" id="@winglang/wingsdk.core.IApp.synth"></a>

```wing
synth(): str
```

Synthesize the app into an artifact.

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.core.IApp.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/wingsdk.core.IApp.property.outdir">outdir</a></code> | <code>str</code> | Directory where artifacts are synthesized to. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/wingsdk.core.IApp.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `outdir`<sup>Required</sup> <a name="outdir" id="@winglang/wingsdk.core.IApp.property.outdir"></a>

```wing
outdir: str;
```

- *Type:* str

Directory where artifacts are synthesized to.

---

### IBucketClient <a name="IBucketClient" id="@winglang/wingsdk.cloud.IBucketClient"></a>

- *Implemented By:* cloud.IBucketClient

Inflight interface for `Bucket`.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.IBucketClient.delete">delete</a></code> | Delete an existing object using a key from the bucket. |
| <code><a href="#@winglang/wingsdk.cloud.IBucketClient.get">get</a></code> | Retrieve an object from the bucket. |
| <code><a href="#@winglang/wingsdk.cloud.IBucketClient.list">list</a></code> | Retrieve existing objects keys from the bucket. |
| <code><a href="#@winglang/wingsdk.cloud.IBucketClient.put">put</a></code> | Put an object in the bucket. |

---

##### `delete` <a name="delete" id="@winglang/wingsdk.cloud.IBucketClient.delete"></a>

```wing
delete(key: str, opts?: BucketDeleteOptions): void
```

**Inflight client:** [true](#true)

Delete an existing object using a key from the bucket.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/wingsdk.cloud.IBucketClient.delete.parameter.key"></a>

- *Type:* str

Key of the object.

---

###### `opts`<sup>Optional</sup> <a name="opts" id="@winglang/wingsdk.cloud.IBucketClient.delete.parameter.opts"></a>

- *Type:* cloud.BucketDeleteOptions

Options available for delete an item from a bucket.

---

##### `get` <a name="get" id="@winglang/wingsdk.cloud.IBucketClient.get"></a>

```wing
get(key: str): str
```

**Inflight client:** [true](#true)

Retrieve an object from the bucket.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/wingsdk.cloud.IBucketClient.get.parameter.key"></a>

- *Type:* str

Key of the object.

---

##### `list` <a name="list" id="@winglang/wingsdk.cloud.IBucketClient.list"></a>

```wing
list(prefix?: str): MutArray<str>
```

**Inflight client:** [true](#true)

Retrieve existing objects keys from the bucket.

###### `prefix`<sup>Optional</sup> <a name="prefix" id="@winglang/wingsdk.cloud.IBucketClient.list.parameter.prefix"></a>

- *Type:* str

Limits the response to keys that begin with the specified prefix.

---

##### `put` <a name="put" id="@winglang/wingsdk.cloud.IBucketClient.put"></a>

```wing
put(key: str, body: str): void
```

**Inflight client:** [true](#true)

Put an object in the bucket.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/wingsdk.cloud.IBucketClient.put.parameter.key"></a>

- *Type:* str

Key of the object.

---

###### `body`<sup>Required</sup> <a name="body" id="@winglang/wingsdk.cloud.IBucketClient.put.parameter.body"></a>

- *Type:* str

Content of the object we want to store into the bucket.

---


### ICounterClient <a name="ICounterClient" id="@winglang/wingsdk.cloud.ICounterClient"></a>

- *Implemented By:* cloud.ICounterClient

Inflight interface for `Queue`.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.ICounterClient.inc">inc</a></code> | Increments the counter atomically by a certain amount and returns the previous value. |

---

##### `inc` <a name="inc" id="@winglang/wingsdk.cloud.ICounterClient.inc"></a>

```wing
inc(amount?: num): num
```

**Inflight client:** [true](#true)

Increments the counter atomically by a certain amount and returns the previous value.

###### `amount`<sup>Optional</sup> <a name="amount" id="@winglang/wingsdk.cloud.ICounterClient.inc.parameter.amount"></a>

- *Type:* num

amount to increment (default is 1).

---


### IFunctionClient <a name="IFunctionClient" id="@winglang/wingsdk.cloud.IFunctionClient"></a>

- *Implemented By:* cloud.IFunctionClient

Inflight interface for `Function`.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.IFunctionClient.invoke">invoke</a></code> | Invoke the function asynchronously with a given payload. |

---

##### `invoke` <a name="invoke" id="@winglang/wingsdk.cloud.IFunctionClient.invoke"></a>

```wing
invoke(payload: str): str
```

**Inflight client:** [true](#true)

Invoke the function asynchronously with a given payload.

###### `payload`<sup>Required</sup> <a name="payload" id="@winglang/wingsdk.cloud.IFunctionClient.invoke.parameter.payload"></a>

- *Type:* str

---


### IFunctionHandler <a name="IFunctionHandler" id="@winglang/wingsdk.cloud.IFunctionHandler"></a>

- *Extends:* core.IResource

- *Implemented By:* cloud.IFunctionHandler

**Inflight client:** [wingsdk.cloud.IFunctionHandlerClient](#wingsdk.cloud.IFunctionHandlerClient)

Represents a resource with an inflight "handle" method that can be used to create a `cloud.Function`.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.IFunctionHandler.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/wingsdk.cloud.IFunctionHandler.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

### IFunctionHandlerClient <a name="IFunctionHandlerClient" id="@winglang/wingsdk.cloud.IFunctionHandlerClient"></a>

- *Implemented By:* cloud.IFunctionHandlerClient

Inflight client for `IFunctionHandler`.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.IFunctionHandlerClient.handle">handle</a></code> | Entrypoint function that will be called when the cloud function is invoked. |

---

##### `handle` <a name="handle" id="@winglang/wingsdk.cloud.IFunctionHandlerClient.handle"></a>

```wing
handle(event: str): void
```

**Inflight client:** [true](#true)

Entrypoint function that will be called when the cloud function is invoked.

###### `event`<sup>Required</sup> <a name="event" id="@winglang/wingsdk.cloud.IFunctionHandlerClient.handle.parameter.event"></a>

- *Type:* str

---


### IInflightHost <a name="IInflightHost" id="@winglang/wingsdk.core.IInflightHost"></a>

- *Extends:* core.IResource

- *Implemented By:* core.IInflightHost

A resource that can run inflight code.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.core.IInflightHost.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/wingsdk.core.IInflightHost.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

### IInspectable <a name="IInspectable" id="@winglang/wingsdk.core.IInspectable"></a>

- *Implemented By:* cloud.Bucket, cloud.BucketBase, cloud.Counter, cloud.CounterBase, cloud.Function, cloud.FunctionBase, cloud.Logger, cloud.LoggerBase, cloud.Queue, cloud.QueueBase, cloud.Topic, cloud.TopicBase, core.Inflight, core.Resource, sim.Bucket, sim.Counter, sim.Function, sim.Logger, sim.Queue, sim.Topic, tfaws.Bucket, tfaws.Counter, tfaws.Function, tfaws.Queue, cloud.IFunctionHandler, cloud.IQueueOnMessageHandler, cloud.ITopicOnMessageHandler, core.IInflightHost, core.IInspectable, core.IResource

Interface for examining a construct and exposing metadata.



### ILoggerClient <a name="ILoggerClient" id="@winglang/wingsdk.cloud.ILoggerClient"></a>

- *Implemented By:* cloud.ILoggerClient

Inflight interface for `Logger`.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.ILoggerClient.print">print</a></code> | Logs a message. |

---

##### `print` <a name="print" id="@winglang/wingsdk.cloud.ILoggerClient.print"></a>

```wing
print(message: str): void
```

**Inflight client:** [true](#true)

Logs a message.

The log will be associated with whichever resource is
running the inflight code.

###### `message`<sup>Required</sup> <a name="message" id="@winglang/wingsdk.cloud.ILoggerClient.print.parameter.message"></a>

- *Type:* str

The message to print.

---


### IQueueClient <a name="IQueueClient" id="@winglang/wingsdk.cloud.IQueueClient"></a>

- *Implemented By:* cloud.IQueueClient

Inflight interface for `Queue`.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.IQueueClient.push">push</a></code> | Push a message to the queue. |

---

##### `push` <a name="push" id="@winglang/wingsdk.cloud.IQueueClient.push"></a>

```wing
push(message: str): void
```

**Inflight client:** [true](#true)

Push a message to the queue.

###### `message`<sup>Required</sup> <a name="message" id="@winglang/wingsdk.cloud.IQueueClient.push.parameter.message"></a>

- *Type:* str

Payload to send to the queue.

---


### IQueueOnMessageHandler <a name="IQueueOnMessageHandler" id="@winglang/wingsdk.cloud.IQueueOnMessageHandler"></a>

- *Extends:* core.IResource

- *Implemented By:* cloud.IQueueOnMessageHandler

**Inflight client:** [wingsdk.cloud.IQueueOnMessageHandlerClient](#wingsdk.cloud.IQueueOnMessageHandlerClient)

Represents a resource with an inflight "handle" method that can be passed to `Queue.on_message`.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.IQueueOnMessageHandler.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/wingsdk.cloud.IQueueOnMessageHandler.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

### IQueueOnMessageHandlerClient <a name="IQueueOnMessageHandlerClient" id="@winglang/wingsdk.cloud.IQueueOnMessageHandlerClient"></a>

- *Implemented By:* cloud.IQueueOnMessageHandlerClient

Inflight client for `IQueueOnMessageHandler`.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.IQueueOnMessageHandlerClient.handle">handle</a></code> | Function that will be called when a message is received from the queue. |

---

##### `handle` <a name="handle" id="@winglang/wingsdk.cloud.IQueueOnMessageHandlerClient.handle"></a>

```wing
handle(message: str): void
```

**Inflight client:** [true](#true)

Function that will be called when a message is received from the queue.

###### `message`<sup>Required</sup> <a name="message" id="@winglang/wingsdk.cloud.IQueueOnMessageHandlerClient.handle.parameter.message"></a>

- *Type:* str

---


### IResource <a name="IResource" id="@winglang/wingsdk.core.IResource"></a>

- *Extends:* core.IInspectable, constructs.IConstruct

- *Implemented By:* core.Inflight, cloud.IFunctionHandler, cloud.IQueueOnMessageHandler, cloud.ITopicOnMessageHandler, core.IInflightHost, core.IResource

Abstract interface for `Resource`.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.core.IResource.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/wingsdk.core.IResource.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

### ITopicClient <a name="ITopicClient" id="@winglang/wingsdk.cloud.ITopicClient"></a>

- *Implemented By:* cloud.ITopicClient

Inflight interface for `Topic`.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.ITopicClient.publish">publish</a></code> | Publish message to topic. |

---

##### `publish` <a name="publish" id="@winglang/wingsdk.cloud.ITopicClient.publish"></a>

```wing
publish(message: str): void
```

**Inflight client:** [true](#true)

Publish message to topic.

###### `message`<sup>Required</sup> <a name="message" id="@winglang/wingsdk.cloud.ITopicClient.publish.parameter.message"></a>

- *Type:* str

Payload to publish to Topic.

---


### ITopicOnMessageHandler <a name="ITopicOnMessageHandler" id="@winglang/wingsdk.cloud.ITopicOnMessageHandler"></a>

- *Extends:* core.IResource

- *Implemented By:* cloud.ITopicOnMessageHandler

**Inflight client:** [wingsdk.cloud.ITopicOnMessageHandlerClient](#wingsdk.cloud.ITopicOnMessageHandlerClient)

Represents a resource with an inflight "handle" method that can be passed to `Topic.on_message`.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.ITopicOnMessageHandler.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/wingsdk.cloud.ITopicOnMessageHandler.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

### ITopicOnMessageHandlerClient <a name="ITopicOnMessageHandlerClient" id="@winglang/wingsdk.cloud.ITopicOnMessageHandlerClient"></a>

- *Implemented By:* cloud.ITopicOnMessageHandlerClient

Inflight client for `ITopicOnMessageHandler`.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.ITopicOnMessageHandlerClient.handle">handle</a></code> | Function that will be called when a message is received from the topic. |

---

##### `handle` <a name="handle" id="@winglang/wingsdk.cloud.ITopicOnMessageHandlerClient.handle"></a>

```wing
handle(event: str): void
```

**Inflight client:** [true](#true)

Function that will be called when a message is received from the topic.

###### `event`<sup>Required</sup> <a name="event" id="@winglang/wingsdk.cloud.ITopicOnMessageHandlerClient.handle.parameter.event"></a>

- *Type:* str

---


## Enums <a name="Enums" id="Enums"></a>

### BucketInflightMethods <a name="BucketInflightMethods" id="@winglang/wingsdk.cloud.BucketInflightMethods"></a>

List of inflight operations available for `Bucket`.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.BucketInflightMethods.PUT">PUT</a></code> | `Bucket.put`. |
| <code><a href="#@winglang/wingsdk.cloud.BucketInflightMethods.GET">GET</a></code> | `Bucket.get`. |
| <code><a href="#@winglang/wingsdk.cloud.BucketInflightMethods.LIST">LIST</a></code> | `Bucket.list`. |
| <code><a href="#@winglang/wingsdk.cloud.BucketInflightMethods.DELETE">DELETE</a></code> | `Bucket.delete`. |

---

##### `PUT` <a name="PUT" id="@winglang/wingsdk.cloud.BucketInflightMethods.PUT"></a>

`Bucket.put`.

---


##### `GET` <a name="GET" id="@winglang/wingsdk.cloud.BucketInflightMethods.GET"></a>

`Bucket.get`.

---


##### `LIST` <a name="LIST" id="@winglang/wingsdk.cloud.BucketInflightMethods.LIST"></a>

`Bucket.list`.

---


##### `DELETE` <a name="DELETE" id="@winglang/wingsdk.cloud.BucketInflightMethods.DELETE"></a>

`Bucket.delete`.

---


### CounterInflightMethods <a name="CounterInflightMethods" id="@winglang/wingsdk.cloud.CounterInflightMethods"></a>

List of inflight operations available for `Counter`.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.CounterInflightMethods.INC">INC</a></code> | `Counter.inc`. |

---

##### `INC` <a name="INC" id="@winglang/wingsdk.cloud.CounterInflightMethods.INC"></a>

`Counter.inc`.

---


### Direction <a name="Direction" id="@winglang/wingsdk.core.Direction"></a>

The direction of a connection.

Visually speaking, if a resource A has an outbound connection with resource B,
the arrow would point from A to B, and vice versa for inbound connections.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.core.Direction.OUTBOUND">OUTBOUND</a></code> | Indicates that this resource calls, triggers, or references the resource it is connected to. |
| <code><a href="#@winglang/wingsdk.core.Direction.INBOUND">INBOUND</a></code> | Indicates that this resource is called, triggered, or referenced by the resource it is connected to. |

---

##### `OUTBOUND` <a name="OUTBOUND" id="@winglang/wingsdk.core.Direction.OUTBOUND"></a>

Indicates that this resource calls, triggers, or references the resource it is connected to.

---


##### `INBOUND` <a name="INBOUND" id="@winglang/wingsdk.core.Direction.INBOUND"></a>

Indicates that this resource is called, triggered, or referenced by the resource it is connected to.

---


### FunctionInflightMethods <a name="FunctionInflightMethods" id="@winglang/wingsdk.cloud.FunctionInflightMethods"></a>

List of inflight operations available for `Function`.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.FunctionInflightMethods.INVOKE">INVOKE</a></code> | `Function.invoke`. |

---

##### `INVOKE` <a name="INVOKE" id="@winglang/wingsdk.cloud.FunctionInflightMethods.INVOKE"></a>

`Function.invoke`.

---


### Language <a name="Language" id="@winglang/wingsdk.core.Language"></a>

The language of a piece of code.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.core.Language.NODE_JS">NODE_JS</a></code> | Node.js. |

---

##### `NODE_JS` <a name="NODE_JS" id="@winglang/wingsdk.core.Language.NODE_JS"></a>

Node.js.

---


### LoggerInflightMethods <a name="LoggerInflightMethods" id="@winglang/wingsdk.cloud.LoggerInflightMethods"></a>

List of inflight operations available for `Logger`.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.LoggerInflightMethods.PRINT">PRINT</a></code> | `Logger.print`. |

---

##### `PRINT` <a name="PRINT" id="@winglang/wingsdk.cloud.LoggerInflightMethods.PRINT"></a>

`Logger.print`.

---


### QueueInflightMethods <a name="QueueInflightMethods" id="@winglang/wingsdk.cloud.QueueInflightMethods"></a>

List of inflight operations available for `Queue`.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.QueueInflightMethods.PUSH">PUSH</a></code> | `Queue.push`. |

---

##### `PUSH` <a name="PUSH" id="@winglang/wingsdk.cloud.QueueInflightMethods.PUSH"></a>

`Queue.push`.

---


### TopicInflightMethods <a name="TopicInflightMethods" id="@winglang/wingsdk.cloud.TopicInflightMethods"></a>

List of inflight operations available for `Topic`.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.cloud.TopicInflightMethods.PUBLISH">PUBLISH</a></code> | `Topic.publish`. |

---

##### `PUBLISH` <a name="PUBLISH" id="@winglang/wingsdk.cloud.TopicInflightMethods.PUBLISH"></a>

`Topic.publish`.

---

