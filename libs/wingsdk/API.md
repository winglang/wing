# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### Bucket <a name="Bucket" id="@winglang/sdk.cloud.Bucket"></a>

**Inflight client:** [@winglang/sdk.cloud.IBucketClient](#@winglang/sdk.cloud.IBucketClient)

Represents a cloud object store.

#### Initializers <a name="Initializers" id="@winglang/sdk.cloud.Bucket.Initializer"></a>

```wing
bring { cloud } from "@winglang/sdk"

new cloud.Bucket(props?: BucketProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Bucket.Initializer.parameter.props">props</a></code> | <code>@winglang/sdk.cloud.BucketProps</code> | *No description.* |

---

##### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Bucket.Initializer.parameter.props"></a>

- *Type:* @winglang/sdk.cloud.BucketProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.Bucket.toString">to_string</a></code> | Returns a string representation of this construct. |
| <code><a href="#@winglang/sdk.cloud.Bucket.addObject">add_object</a></code> | Add a file to the bucket that is uploaded when the app is deployed. |

---

##### `to_string` <a name="to_string" id="@winglang/sdk.cloud.Bucket.toString"></a>

```wing
to_string(): str
```

Returns a string representation of this construct.

##### `add_object` <a name="add_object" id="@winglang/sdk.cloud.Bucket.addObject"></a>

```wing
add_object(key: str, body: str): void
```

Add a file to the bucket that is uploaded when the app is deployed.

TODO: In the future this will support uploading any `Blob` type or
referencing a file from the local filesystem.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.cloud.Bucket.addObject.parameter.key"></a>

- *Type:* str

---

###### `body`<sup>Required</sup> <a name="body" id="@winglang/sdk.cloud.Bucket.addObject.parameter.body"></a>

- *Type:* str

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.Bucket.isConstruct">is_construct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@winglang/sdk.cloud.Bucket.addConnection">add_connection</a></code> | Adds a connection between two resources. |

---

##### `is_construct` <a name="is_construct" id="@winglang/sdk.cloud.Bucket.isConstruct"></a>

```wing
bring { cloud } from "@winglang/sdk"

cloud.Bucket.is_construct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="@winglang/sdk.cloud.Bucket.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `add_connection` <a name="add_connection" id="@winglang/sdk.cloud.Bucket.addConnection"></a>

```wing
bring { cloud } from "@winglang/sdk"

cloud.Bucket.add_connection(props: AddConnectionProps)
```

Adds a connection between two resources.

A connection is a piece of
metadata describing how one resource is related to another resource. This
metadata is recorded in the tree.json file.

###### `props`<sup>Required</sup> <a name="props" id="@winglang/sdk.cloud.Bucket.addConnection.parameter.props"></a>

- *Type:* @winglang/sdk.core.AddConnectionProps

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Bucket.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.cloud.Bucket.property.display">display</a></code> | <code>@winglang/sdk.core.Display</code> | Information on how to display a resource in the UI. |
| <code><a href="#@winglang/sdk.cloud.Bucket.property.stateful">stateful</a></code> | <code>bool</code> | Whether a resource is stateful, i.e. it stores information that is not defined by your application. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.cloud.Bucket.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `display`<sup>Required</sup> <a name="display" id="@winglang/sdk.cloud.Bucket.property.display"></a>

```wing
display: Display;
```

- *Type:* @winglang/sdk.core.Display

Information on how to display a resource in the UI.

---

##### `stateful`<sup>Required</sup> <a name="stateful" id="@winglang/sdk.cloud.Bucket.property.stateful"></a>

```wing
stateful: bool;
```

- *Type:* bool

Whether a resource is stateful, i.e. it stores information that is not defined by your application.

A non-stateful resource does not remember information about past
transactions or events, and can typically be replaced by a cloud provider
with a fresh copy without any consequences.

---


### Counter <a name="Counter" id="@winglang/sdk.cloud.Counter"></a>

**Inflight client:** [@winglang/sdk.cloud.ICounterClient](#@winglang/sdk.cloud.ICounterClient)

Represents a distributed atomic counter.

#### Initializers <a name="Initializers" id="@winglang/sdk.cloud.Counter.Initializer"></a>

```wing
bring { cloud } from "@winglang/sdk"

new cloud.Counter(props?: CounterProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Counter.Initializer.parameter.props">props</a></code> | <code>@winglang/sdk.cloud.CounterProps</code> | *No description.* |

---

##### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Counter.Initializer.parameter.props"></a>

- *Type:* @winglang/sdk.cloud.CounterProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.Counter.toString">to_string</a></code> | Returns a string representation of this construct. |

---

##### `to_string` <a name="to_string" id="@winglang/sdk.cloud.Counter.toString"></a>

```wing
to_string(): str
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.Counter.isConstruct">is_construct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@winglang/sdk.cloud.Counter.addConnection">add_connection</a></code> | Adds a connection between two resources. |

---

##### `is_construct` <a name="is_construct" id="@winglang/sdk.cloud.Counter.isConstruct"></a>

```wing
bring { cloud } from "@winglang/sdk"

cloud.Counter.is_construct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="@winglang/sdk.cloud.Counter.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `add_connection` <a name="add_connection" id="@winglang/sdk.cloud.Counter.addConnection"></a>

```wing
bring { cloud } from "@winglang/sdk"

cloud.Counter.add_connection(props: AddConnectionProps)
```

Adds a connection between two resources.

A connection is a piece of
metadata describing how one resource is related to another resource. This
metadata is recorded in the tree.json file.

###### `props`<sup>Required</sup> <a name="props" id="@winglang/sdk.cloud.Counter.addConnection.parameter.props"></a>

- *Type:* @winglang/sdk.core.AddConnectionProps

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Counter.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.cloud.Counter.property.display">display</a></code> | <code>@winglang/sdk.core.Display</code> | Information on how to display a resource in the UI. |
| <code><a href="#@winglang/sdk.cloud.Counter.property.stateful">stateful</a></code> | <code>bool</code> | Whether a resource is stateful, i.e. it stores information that is not defined by your application. |
| <code><a href="#@winglang/sdk.cloud.Counter.property.initial">initial</a></code> | <code>num</code> | The initial value of the counter. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.cloud.Counter.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `display`<sup>Required</sup> <a name="display" id="@winglang/sdk.cloud.Counter.property.display"></a>

```wing
display: Display;
```

- *Type:* @winglang/sdk.core.Display

Information on how to display a resource in the UI.

---

##### `stateful`<sup>Required</sup> <a name="stateful" id="@winglang/sdk.cloud.Counter.property.stateful"></a>

```wing
stateful: bool;
```

- *Type:* bool

Whether a resource is stateful, i.e. it stores information that is not defined by your application.

A non-stateful resource does not remember information about past
transactions or events, and can typically be replaced by a cloud provider
with a fresh copy without any consequences.

---

##### `initial`<sup>Required</sup> <a name="initial" id="@winglang/sdk.cloud.Counter.property.initial"></a>

```wing
initial: num;
```

- *Type:* num

The initial value of the counter.

---


### Function <a name="Function" id="@winglang/sdk.cloud.Function"></a>

**Inflight client:** [@winglang/sdk.cloud.IFunctionClient](#@winglang/sdk.cloud.IFunctionClient)

Represents a function.

#### Initializers <a name="Initializers" id="@winglang/sdk.cloud.Function.Initializer"></a>

```wing
bring { cloud } from "@winglang/sdk"

new cloud.Function(inflight: ~Inflight, props?: FunctionProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Function.Initializer.parameter.inflight">inflight</a></code> | <code>@winglang/sdk.core.Inflight</code> | *No description.* |
| <code><a href="#@winglang/sdk.cloud.Function.Initializer.parameter.props">props</a></code> | <code>@winglang/sdk.cloud.FunctionProps</code> | *No description.* |

---

##### `inflight`<sup>Required</sup> <a name="inflight" id="@winglang/sdk.cloud.Function.Initializer.parameter.inflight"></a>

- *Type:* @winglang/sdk.core.Inflight

---

##### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Function.Initializer.parameter.props"></a>

- *Type:* @winglang/sdk.cloud.FunctionProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.Function.toString">to_string</a></code> | Returns a string representation of this construct. |
| <code><a href="#@winglang/sdk.cloud.Function.addEnvironment">add_environment</a></code> | Add an environment variable to the function. |

---

##### `to_string` <a name="to_string" id="@winglang/sdk.cloud.Function.toString"></a>

```wing
to_string(): str
```

Returns a string representation of this construct.

##### `add_environment` <a name="add_environment" id="@winglang/sdk.cloud.Function.addEnvironment"></a>

```wing
add_environment(_key: str, _value: str): void
```

Add an environment variable to the function.

###### `_key`<sup>Required</sup> <a name="_key" id="@winglang/sdk.cloud.Function.addEnvironment.parameter._key"></a>

- *Type:* str

---

###### `_value`<sup>Required</sup> <a name="_value" id="@winglang/sdk.cloud.Function.addEnvironment.parameter._value"></a>

- *Type:* str

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.Function.isConstruct">is_construct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@winglang/sdk.cloud.Function.addConnection">add_connection</a></code> | Adds a connection between two resources. |

---

##### `is_construct` <a name="is_construct" id="@winglang/sdk.cloud.Function.isConstruct"></a>

```wing
bring { cloud } from "@winglang/sdk"

cloud.Function.is_construct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="@winglang/sdk.cloud.Function.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `add_connection` <a name="add_connection" id="@winglang/sdk.cloud.Function.addConnection"></a>

```wing
bring { cloud } from "@winglang/sdk"

cloud.Function.add_connection(props: AddConnectionProps)
```

Adds a connection between two resources.

A connection is a piece of
metadata describing how one resource is related to another resource. This
metadata is recorded in the tree.json file.

###### `props`<sup>Required</sup> <a name="props" id="@winglang/sdk.cloud.Function.addConnection.parameter.props"></a>

- *Type:* @winglang/sdk.core.AddConnectionProps

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Function.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.cloud.Function.property.display">display</a></code> | <code>@winglang/sdk.core.Display</code> | Information on how to display a resource in the UI. |
| <code><a href="#@winglang/sdk.cloud.Function.property.stateful">stateful</a></code> | <code>bool</code> | Whether a resource is stateful, i.e. it stores information that is not defined by your application. |
| <code><a href="#@winglang/sdk.cloud.Function.property.env">env</a></code> | <code>MutMap&lt;str&gt;</code> | Returns the set of environment variables for this function. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.cloud.Function.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `display`<sup>Required</sup> <a name="display" id="@winglang/sdk.cloud.Function.property.display"></a>

```wing
display: Display;
```

- *Type:* @winglang/sdk.core.Display

Information on how to display a resource in the UI.

---

##### `stateful`<sup>Required</sup> <a name="stateful" id="@winglang/sdk.cloud.Function.property.stateful"></a>

```wing
stateful: bool;
```

- *Type:* bool

Whether a resource is stateful, i.e. it stores information that is not defined by your application.

A non-stateful resource does not remember information about past
transactions or events, and can typically be replaced by a cloud provider
with a fresh copy without any consequences.

---

##### `env`<sup>Required</sup> <a name="env" id="@winglang/sdk.cloud.Function.property.env"></a>

```wing
env: MutMap<str>;
```

- *Type:* MutMap&lt;str&gt;

Returns the set of environment variables for this function.

---


### Logger <a name="Logger" id="@winglang/sdk.cloud.Logger"></a>

**Inflight client:** [@winglang/sdk.cloud.ILoggerClient](#@winglang/sdk.cloud.ILoggerClient)

A cloud logging facility.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.Logger.toString">to_string</a></code> | Returns a string representation of this construct. |
| <code><a href="#@winglang/sdk.cloud.Logger.print">print</a></code> | Logs a message (preflight). |

---

##### `to_string` <a name="to_string" id="@winglang/sdk.cloud.Logger.toString"></a>

```wing
to_string(): str
```

Returns a string representation of this construct.

##### `print` <a name="print" id="@winglang/sdk.cloud.Logger.print"></a>

```wing
print(message: str): void
```

Logs a message (preflight).

###### `message`<sup>Required</sup> <a name="message" id="@winglang/sdk.cloud.Logger.print.parameter.message"></a>

- *Type:* str

The message to log.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.Logger.isConstruct">is_construct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@winglang/sdk.cloud.Logger.addConnection">add_connection</a></code> | Adds a connection between two resources. |
| <code><a href="#@winglang/sdk.cloud.Logger.of">of</a></code> | Returns the logger registered to the given scope, throwing an error if there is none. |
| <code><a href="#@winglang/sdk.cloud.Logger.register">register</a></code> | Create a logger and register it to the given scope. |

---

##### `is_construct` <a name="is_construct" id="@winglang/sdk.cloud.Logger.isConstruct"></a>

```wing
bring { cloud } from "@winglang/sdk"

cloud.Logger.is_construct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="@winglang/sdk.cloud.Logger.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `add_connection` <a name="add_connection" id="@winglang/sdk.cloud.Logger.addConnection"></a>

```wing
bring { cloud } from "@winglang/sdk"

cloud.Logger.add_connection(props: AddConnectionProps)
```

Adds a connection between two resources.

A connection is a piece of
metadata describing how one resource is related to another resource. This
metadata is recorded in the tree.json file.

###### `props`<sup>Required</sup> <a name="props" id="@winglang/sdk.cloud.Logger.addConnection.parameter.props"></a>

- *Type:* @winglang/sdk.core.AddConnectionProps

---

##### `of` <a name="of" id="@winglang/sdk.cloud.Logger.of"></a>

```wing
bring { cloud } from "@winglang/sdk"

cloud.Logger.of()
```

Returns the logger registered to the given scope, throwing an error if there is none.

##### `register` <a name="register" id="@winglang/sdk.cloud.Logger.register"></a>

```wing
bring { cloud } from "@winglang/sdk"

cloud.Logger.register()
```

Create a logger and register it to the given scope.

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Logger.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.cloud.Logger.property.display">display</a></code> | <code>@winglang/sdk.core.Display</code> | Information on how to display a resource in the UI. |
| <code><a href="#@winglang/sdk.cloud.Logger.property.stateful">stateful</a></code> | <code>bool</code> | Whether a resource is stateful, i.e. it stores information that is not defined by your application. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.cloud.Logger.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `display`<sup>Required</sup> <a name="display" id="@winglang/sdk.cloud.Logger.property.display"></a>

```wing
display: Display;
```

- *Type:* @winglang/sdk.core.Display

Information on how to display a resource in the UI.

---

##### `stateful`<sup>Required</sup> <a name="stateful" id="@winglang/sdk.cloud.Logger.property.stateful"></a>

```wing
stateful: bool;
```

- *Type:* bool

Whether a resource is stateful, i.e. it stores information that is not defined by your application.

A non-stateful resource does not remember information about past
transactions or events, and can typically be replaced by a cloud provider
with a fresh copy without any consequences.

---


### Queue <a name="Queue" id="@winglang/sdk.cloud.Queue"></a>

**Inflight client:** [@winglang/sdk.cloud.IQueueClient](#@winglang/sdk.cloud.IQueueClient)

Represents a queue.

#### Initializers <a name="Initializers" id="@winglang/sdk.cloud.Queue.Initializer"></a>

```wing
bring { cloud } from "@winglang/sdk"

new cloud.Queue(props?: QueueProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Queue.Initializer.parameter.props">props</a></code> | <code>@winglang/sdk.cloud.QueueProps</code> | *No description.* |

---

##### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Queue.Initializer.parameter.props"></a>

- *Type:* @winglang/sdk.cloud.QueueProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.Queue.toString">to_string</a></code> | Returns a string representation of this construct. |
| <code><a href="#@winglang/sdk.cloud.Queue.onMessage">on_message</a></code> | Create a function to consume messages from this queue. |

---

##### `to_string` <a name="to_string" id="@winglang/sdk.cloud.Queue.toString"></a>

```wing
to_string(): str
```

Returns a string representation of this construct.

##### `on_message` <a name="on_message" id="@winglang/sdk.cloud.Queue.onMessage"></a>

```wing
on_message(inflight: ~Inflight, props?: QueueOnMessageProps): Function
```

Create a function to consume messages from this queue.

###### `inflight`<sup>Required</sup> <a name="inflight" id="@winglang/sdk.cloud.Queue.onMessage.parameter.inflight"></a>

- *Type:* @winglang/sdk.core.Inflight

---

###### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Queue.onMessage.parameter.props"></a>

- *Type:* @winglang/sdk.cloud.QueueOnMessageProps

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.Queue.isConstruct">is_construct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@winglang/sdk.cloud.Queue.addConnection">add_connection</a></code> | Adds a connection between two resources. |

---

##### `is_construct` <a name="is_construct" id="@winglang/sdk.cloud.Queue.isConstruct"></a>

```wing
bring { cloud } from "@winglang/sdk"

cloud.Queue.is_construct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="@winglang/sdk.cloud.Queue.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `add_connection` <a name="add_connection" id="@winglang/sdk.cloud.Queue.addConnection"></a>

```wing
bring { cloud } from "@winglang/sdk"

cloud.Queue.add_connection(props: AddConnectionProps)
```

Adds a connection between two resources.

A connection is a piece of
metadata describing how one resource is related to another resource. This
metadata is recorded in the tree.json file.

###### `props`<sup>Required</sup> <a name="props" id="@winglang/sdk.cloud.Queue.addConnection.parameter.props"></a>

- *Type:* @winglang/sdk.core.AddConnectionProps

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Queue.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.cloud.Queue.property.display">display</a></code> | <code>@winglang/sdk.core.Display</code> | Information on how to display a resource in the UI. |
| <code><a href="#@winglang/sdk.cloud.Queue.property.stateful">stateful</a></code> | <code>bool</code> | Whether a resource is stateful, i.e. it stores information that is not defined by your application. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.cloud.Queue.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `display`<sup>Required</sup> <a name="display" id="@winglang/sdk.cloud.Queue.property.display"></a>

```wing
display: Display;
```

- *Type:* @winglang/sdk.core.Display

Information on how to display a resource in the UI.

---

##### `stateful`<sup>Required</sup> <a name="stateful" id="@winglang/sdk.cloud.Queue.property.stateful"></a>

```wing
stateful: bool;
```

- *Type:* bool

Whether a resource is stateful, i.e. it stores information that is not defined by your application.

A non-stateful resource does not remember information about past
transactions or events, and can typically be replaced by a cloud provider
with a fresh copy without any consequences.

---


### Topic <a name="Topic" id="@winglang/sdk.cloud.Topic"></a>

**Inflight client:** [@winglang/sdk.cloud.ITopicClient](#@winglang/sdk.cloud.ITopicClient)

Represents a topic.

#### Initializers <a name="Initializers" id="@winglang/sdk.cloud.Topic.Initializer"></a>

```wing
bring { cloud } from "@winglang/sdk"

new cloud.Topic(props?: TopicProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Topic.Initializer.parameter.props">props</a></code> | <code>@winglang/sdk.cloud.TopicProps</code> | *No description.* |

---

##### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Topic.Initializer.parameter.props"></a>

- *Type:* @winglang/sdk.cloud.TopicProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.Topic.toString">to_string</a></code> | Returns a string representation of this construct. |
| <code><a href="#@winglang/sdk.cloud.Topic.onMessage">on_message</a></code> | Creates function to send messages when published. |

---

##### `to_string` <a name="to_string" id="@winglang/sdk.cloud.Topic.toString"></a>

```wing
to_string(): str
```

Returns a string representation of this construct.

##### `on_message` <a name="on_message" id="@winglang/sdk.cloud.Topic.onMessage"></a>

```wing
on_message(inflight: ~Inflight, props?: TopicOnMessageProps): Function
```

Creates function to send messages when published.

###### `inflight`<sup>Required</sup> <a name="inflight" id="@winglang/sdk.cloud.Topic.onMessage.parameter.inflight"></a>

- *Type:* @winglang/sdk.core.Inflight

---

###### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Topic.onMessage.parameter.props"></a>

- *Type:* @winglang/sdk.cloud.TopicOnMessageProps

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.Topic.isConstruct">is_construct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@winglang/sdk.cloud.Topic.addConnection">add_connection</a></code> | Adds a connection between two resources. |

---

##### `is_construct` <a name="is_construct" id="@winglang/sdk.cloud.Topic.isConstruct"></a>

```wing
bring { cloud } from "@winglang/sdk"

cloud.Topic.is_construct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="@winglang/sdk.cloud.Topic.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `add_connection` <a name="add_connection" id="@winglang/sdk.cloud.Topic.addConnection"></a>

```wing
bring { cloud } from "@winglang/sdk"

cloud.Topic.add_connection(props: AddConnectionProps)
```

Adds a connection between two resources.

A connection is a piece of
metadata describing how one resource is related to another resource. This
metadata is recorded in the tree.json file.

###### `props`<sup>Required</sup> <a name="props" id="@winglang/sdk.cloud.Topic.addConnection.parameter.props"></a>

- *Type:* @winglang/sdk.core.AddConnectionProps

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Topic.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.cloud.Topic.property.display">display</a></code> | <code>@winglang/sdk.core.Display</code> | Information on how to display a resource in the UI. |
| <code><a href="#@winglang/sdk.cloud.Topic.property.stateful">stateful</a></code> | <code>bool</code> | Whether a resource is stateful, i.e. it stores information that is not defined by your application. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.cloud.Topic.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `display`<sup>Required</sup> <a name="display" id="@winglang/sdk.cloud.Topic.property.display"></a>

```wing
display: Display;
```

- *Type:* @winglang/sdk.core.Display

Information on how to display a resource in the UI.

---

##### `stateful`<sup>Required</sup> <a name="stateful" id="@winglang/sdk.cloud.Topic.property.stateful"></a>

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

### AddConnectionProps <a name="AddConnectionProps" id="@winglang/sdk.core.AddConnectionProps"></a>

Props for `Resource.addConnection`.

#### Initializer <a name="Initializer" id="@winglang/sdk.core.AddConnectionProps.Initializer"></a>

```wing
bring { core } from "@winglang/sdk"

let add_connection_props = core.AddConnectionProps{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.core.AddConnectionProps.property.from">from</a></code> | <code>@winglang/sdk.core.IResource</code> | The resource creating the connection to `to`. |
| <code><a href="#@winglang/sdk.core.AddConnectionProps.property.relationship">relationship</a></code> | <code>str</code> | The type of relationship between the resources. |
| <code><a href="#@winglang/sdk.core.AddConnectionProps.property.to">to</a></code> | <code>@winglang/sdk.core.IResource</code> | The resource `from` is connecting to. |
| <code><a href="#@winglang/sdk.core.AddConnectionProps.property.implicit">implicit</a></code> | <code>bool</code> | Whether the relationship is implicit, i.e. it is not explicitly defined by the user. |

---

##### `from`<sup>Required</sup> <a name="from" id="@winglang/sdk.core.AddConnectionProps.property.from"></a>

```wing
from: IResource;
```

- *Type:* @winglang/sdk.core.IResource

The resource creating the connection to `to`.

---

##### `relationship`<sup>Required</sup> <a name="relationship" id="@winglang/sdk.core.AddConnectionProps.property.relationship"></a>

```wing
relationship: str;
```

- *Type:* str

The type of relationship between the resources.

---

##### `to`<sup>Required</sup> <a name="to" id="@winglang/sdk.core.AddConnectionProps.property.to"></a>

```wing
to: IResource;
```

- *Type:* @winglang/sdk.core.IResource

The resource `from` is connecting to.

---

##### `implicit`<sup>Optional</sup> <a name="implicit" id="@winglang/sdk.core.AddConnectionProps.property.implicit"></a>

```wing
implicit: bool;
```

- *Type:* bool
- *Default:* false

Whether the relationship is implicit, i.e. it is not explicitly defined by the user.

---

### AppProps <a name="AppProps" id="@winglang/sdk.core.AppProps"></a>

Props for all `App` classes.

#### Initializer <a name="Initializer" id="@winglang/sdk.core.AppProps.Initializer"></a>

```wing
bring { core } from "@winglang/sdk"

let app_props = core.AppProps{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.core.AppProps.property.customFactory">custom_factory</a></code> | <code>polycons.IPolyconFactory</code> | A custom factory to resolve polycons. |
| <code><a href="#@winglang/sdk.core.AppProps.property.name">name</a></code> | <code>str</code> | The name of the app. |
| <code><a href="#@winglang/sdk.core.AppProps.property.outdir">outdir</a></code> | <code>str</code> | Directory where artifacts are synthesized to. |
| <code><a href="#@winglang/sdk.core.AppProps.property.stateFile">state_file</a></code> | <code>str</code> | The path to a state file which will track all synthesized files. |

---

##### `custom_factory`<sup>Optional</sup> <a name="custom_factory" id="@winglang/sdk.core.AppProps.property.customFactory"></a>

```wing
custom_factory: IPolyconFactory;
```

- *Type:* polycons.IPolyconFactory
- *Default:* use the default polycon factory included in the Wing SDK

A custom factory to resolve polycons.

---

##### `name`<sup>Optional</sup> <a name="name" id="@winglang/sdk.core.AppProps.property.name"></a>

```wing
name: str;
```

- *Type:* str
- *Default:* "app"

The name of the app.

---

##### `outdir`<sup>Optional</sup> <a name="outdir" id="@winglang/sdk.core.AppProps.property.outdir"></a>

```wing
outdir: str;
```

- *Type:* str
- *Default:* current working directory

Directory where artifacts are synthesized to.

---

##### `state_file`<sup>Optional</sup> <a name="state_file" id="@winglang/sdk.core.AppProps.property.stateFile"></a>

```wing
state_file: str;
```

- *Type:* str
- *Default:* no state file

The path to a state file which will track all synthesized files.

If a
statefile is not specified, we won't be able to remove extrenous files.

---

### BucketDeleteOptions <a name="BucketDeleteOptions" id="@winglang/sdk.cloud.BucketDeleteOptions"></a>

Interface for delete method inside `Bucket`.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.BucketDeleteOptions.Initializer"></a>

```wing
bring { cloud } from "@winglang/sdk"

let bucket_delete_options = cloud.BucketDeleteOptions{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.BucketDeleteOptions.property.mustExist">must_exist</a></code> | <code>bool</code> | Check failures on the method and retrieve errors if any. |

---

##### `must_exist`<sup>Optional</sup> <a name="must_exist" id="@winglang/sdk.cloud.BucketDeleteOptions.property.mustExist"></a>

```wing
must_exist: bool;
```

- *Type:* bool
- *Default:* false

Check failures on the method and retrieve errors if any.

---

### BucketProps <a name="BucketProps" id="@winglang/sdk.cloud.BucketProps"></a>

Properties for `Bucket`.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.BucketProps.Initializer"></a>

```wing
bring { cloud } from "@winglang/sdk"

let bucket_props = cloud.BucketProps{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.BucketProps.property.public">public</a></code> | <code>bool</code> | Whether the bucket's objects should be publicly accessible. |

---

##### `public`<sup>Optional</sup> <a name="public" id="@winglang/sdk.cloud.BucketProps.property.public"></a>

```wing
public: bool;
```

- *Type:* bool
- *Default:* false

Whether the bucket's objects should be publicly accessible.

---

### Connection <a name="Connection" id="@winglang/sdk.core.Connection"></a>

A connection between two resources.

#### Initializer <a name="Initializer" id="@winglang/sdk.core.Connection.Initializer"></a>

```wing
bring { core } from "@winglang/sdk"

let connection = core.Connection{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.core.Connection.property.direction">direction</a></code> | <code>@winglang/sdk.core.Direction</code> | The direction of the connection. |
| <code><a href="#@winglang/sdk.core.Connection.property.implicit">implicit</a></code> | <code>bool</code> | Whether the relationship is implicit, i.e. it is not explicitly defined by the user. |
| <code><a href="#@winglang/sdk.core.Connection.property.relationship">relationship</a></code> | <code>str</code> | The type of relationship with the resource. |
| <code><a href="#@winglang/sdk.core.Connection.property.resource">resource</a></code> | <code>@winglang/sdk.core.IResource</code> | The resource this connection is to. |

---

##### `direction`<sup>Required</sup> <a name="direction" id="@winglang/sdk.core.Connection.property.direction"></a>

```wing
direction: Direction;
```

- *Type:* @winglang/sdk.core.Direction

The direction of the connection.

---

##### `implicit`<sup>Required</sup> <a name="implicit" id="@winglang/sdk.core.Connection.property.implicit"></a>

```wing
implicit: bool;
```

- *Type:* bool

Whether the relationship is implicit, i.e. it is not explicitly defined by the user.

---

##### `relationship`<sup>Required</sup> <a name="relationship" id="@winglang/sdk.core.Connection.property.relationship"></a>

```wing
relationship: str;
```

- *Type:* str

The type of relationship with the resource.

---

##### `resource`<sup>Required</sup> <a name="resource" id="@winglang/sdk.core.Connection.property.resource"></a>

```wing
resource: IResource;
```

- *Type:* @winglang/sdk.core.IResource

The resource this connection is to.

---

### ConstructInfo <a name="ConstructInfo" id="@winglang/sdk.core.ConstructInfo"></a>

Source information on a construct (class fqn and version).

#### Initializer <a name="Initializer" id="@winglang/sdk.core.ConstructInfo.Initializer"></a>

```wing
bring { core } from "@winglang/sdk"

let construct_info = core.ConstructInfo{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.core.ConstructInfo.property.fqn">fqn</a></code> | <code>str</code> | Fully qualified class name. |
| <code><a href="#@winglang/sdk.core.ConstructInfo.property.version">version</a></code> | <code>str</code> | Version of the module. |

---

##### `fqn`<sup>Required</sup> <a name="fqn" id="@winglang/sdk.core.ConstructInfo.property.fqn"></a>

```wing
fqn: str;
```

- *Type:* str

Fully qualified class name.

---

##### `version`<sup>Required</sup> <a name="version" id="@winglang/sdk.core.ConstructInfo.property.version"></a>

```wing
version: str;
```

- *Type:* str

Version of the module.

---

### ConstructTree <a name="ConstructTree" id="@winglang/sdk.core.ConstructTree"></a>

The construct tree.

#### Initializer <a name="Initializer" id="@winglang/sdk.core.ConstructTree.Initializer"></a>

```wing
bring { core } from "@winglang/sdk"

let construct_tree = core.ConstructTree{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.core.ConstructTree.property.tree">tree</a></code> | <code>@winglang/sdk.core.ConstructTreeNode</code> | The root node. |
| <code><a href="#@winglang/sdk.core.ConstructTree.property.version">version</a></code> | <code>str</code> | The construct tree version. |

---

##### `tree`<sup>Required</sup> <a name="tree" id="@winglang/sdk.core.ConstructTree.property.tree"></a>

```wing
tree: ConstructTreeNode;
```

- *Type:* @winglang/sdk.core.ConstructTreeNode

The root node.

---

##### `version`<sup>Required</sup> <a name="version" id="@winglang/sdk.core.ConstructTree.property.version"></a>

```wing
version: str;
```

- *Type:* str

The construct tree version.

---

### ConstructTreeNode <a name="ConstructTreeNode" id="@winglang/sdk.core.ConstructTreeNode"></a>

A node in the construct tree.

#### Initializer <a name="Initializer" id="@winglang/sdk.core.ConstructTreeNode.Initializer"></a>

```wing
bring { core } from "@winglang/sdk"

let construct_tree_node = core.ConstructTreeNode{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.core.ConstructTreeNode.property.id">id</a></code> | <code>str</code> | The ID of the node. |
| <code><a href="#@winglang/sdk.core.ConstructTreeNode.property.path">path</a></code> | <code>str</code> | The path of the node. |
| <code><a href="#@winglang/sdk.core.ConstructTreeNode.property.attributes">attributes</a></code> | <code>MutMap&lt;any&gt;</code> | The node attributes. |
| <code><a href="#@winglang/sdk.core.ConstructTreeNode.property.children">children</a></code> | <code>MutMap&lt;@winglang/sdk.core.ConstructTreeNode&gt;</code> | The child nodes. |
| <code><a href="#@winglang/sdk.core.ConstructTreeNode.property.constructInfo">construct_info</a></code> | <code>@winglang/sdk.core.ConstructInfo</code> | Information on the construct class that led to this node, if available. |
| <code><a href="#@winglang/sdk.core.ConstructTreeNode.property.display">display</a></code> | <code>@winglang/sdk.core.DisplayInfo</code> | Information on how to display this node in the UI. |

---

##### `id`<sup>Required</sup> <a name="id" id="@winglang/sdk.core.ConstructTreeNode.property.id"></a>

```wing
id: str;
```

- *Type:* str

The ID of the node.

Is part of the `path`.

---

##### `path`<sup>Required</sup> <a name="path" id="@winglang/sdk.core.ConstructTreeNode.property.path"></a>

```wing
path: str;
```

- *Type:* str

The path of the node.

---

##### `attributes`<sup>Optional</sup> <a name="attributes" id="@winglang/sdk.core.ConstructTreeNode.property.attributes"></a>

```wing
attributes: MutMap<any>;
```

- *Type:* MutMap&lt;any&gt;

The node attributes.

---

##### `children`<sup>Optional</sup> <a name="children" id="@winglang/sdk.core.ConstructTreeNode.property.children"></a>

```wing
children: MutMap<ConstructTreeNode>;
```

- *Type:* MutMap&lt;@winglang/sdk.core.ConstructTreeNode&gt;

The child nodes.

---

##### `construct_info`<sup>Optional</sup> <a name="construct_info" id="@winglang/sdk.core.ConstructTreeNode.property.constructInfo"></a>

```wing
construct_info: ConstructInfo;
```

- *Type:* @winglang/sdk.core.ConstructInfo

Information on the construct class that led to this node, if available.

---

##### `display`<sup>Optional</sup> <a name="display" id="@winglang/sdk.core.ConstructTreeNode.property.display"></a>

```wing
display: DisplayInfo;
```

- *Type:* @winglang/sdk.core.DisplayInfo

Information on how to display this node in the UI.

---

### CounterProps <a name="CounterProps" id="@winglang/sdk.cloud.CounterProps"></a>

Properties for `Counter`.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.CounterProps.Initializer"></a>

```wing
bring { cloud } from "@winglang/sdk"

let counter_props = cloud.CounterProps{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.CounterProps.property.initial">initial</a></code> | <code>num</code> | The initial value of the counter. |

---

##### `initial`<sup>Optional</sup> <a name="initial" id="@winglang/sdk.cloud.CounterProps.property.initial"></a>

```wing
initial: num;
```

- *Type:* num
- *Default:* 0

The initial value of the counter.

---

### DisplayInfo <a name="DisplayInfo" id="@winglang/sdk.core.DisplayInfo"></a>

Information on how to display a construct in the UI.

#### Initializer <a name="Initializer" id="@winglang/sdk.core.DisplayInfo.Initializer"></a>

```wing
bring { core } from "@winglang/sdk"

let display_info = core.DisplayInfo{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.core.DisplayInfo.property.description">description</a></code> | <code>str</code> | Description of the resource. |
| <code><a href="#@winglang/sdk.core.DisplayInfo.property.hidden">hidden</a></code> | <code>bool</code> | Whether the resource should be hidden from the UI. |
| <code><a href="#@winglang/sdk.core.DisplayInfo.property.title">title</a></code> | <code>str</code> | Title of the resource. |

---

##### `description`<sup>Optional</sup> <a name="description" id="@winglang/sdk.core.DisplayInfo.property.description"></a>

```wing
description: str;
```

- *Type:* str
- *Default:* No description

Description of the resource.

---

##### `hidden`<sup>Optional</sup> <a name="hidden" id="@winglang/sdk.core.DisplayInfo.property.hidden"></a>

```wing
hidden: bool;
```

- *Type:* bool
- *Default:* false (visible)

Whether the resource should be hidden from the UI.

---

##### `title`<sup>Optional</sup> <a name="title" id="@winglang/sdk.core.DisplayInfo.property.title"></a>

```wing
title: str;
```

- *Type:* str
- *Default:* The type and/or identifier of the resource

Title of the resource.

---

### DisplayProps <a name="DisplayProps" id="@winglang/sdk.core.DisplayProps"></a>

Properties for the Display class.

#### Initializer <a name="Initializer" id="@winglang/sdk.core.DisplayProps.Initializer"></a>

```wing
bring { core } from "@winglang/sdk"

let display_props = core.DisplayProps{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.core.DisplayProps.property.description">description</a></code> | <code>str</code> | Description of the resource. |
| <code><a href="#@winglang/sdk.core.DisplayProps.property.hidden">hidden</a></code> | <code>bool</code> | Whether the resource should be hidden from the UI. |
| <code><a href="#@winglang/sdk.core.DisplayProps.property.title">title</a></code> | <code>str</code> | Title of the resource. |

---

##### `description`<sup>Optional</sup> <a name="description" id="@winglang/sdk.core.DisplayProps.property.description"></a>

```wing
description: str;
```

- *Type:* str
- *Default:* No description.

Description of the resource.

---

##### `hidden`<sup>Optional</sup> <a name="hidden" id="@winglang/sdk.core.DisplayProps.property.hidden"></a>

```wing
hidden: bool;
```

- *Type:* bool
- *Default:* Undefined

Whether the resource should be hidden from the UI.

---

##### `title`<sup>Optional</sup> <a name="title" id="@winglang/sdk.core.DisplayProps.property.title"></a>

```wing
title: str;
```

- *Type:* str
- *Default:* No title.

Title of the resource.

---

### FilesProps <a name="FilesProps" id="@winglang/sdk.core.FilesProps"></a>

Props for `Files`.

#### Initializer <a name="Initializer" id="@winglang/sdk.core.FilesProps.Initializer"></a>

```wing
bring { core } from "@winglang/sdk"

let files_props = core.FilesProps{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.core.FilesProps.property.app">app</a></code> | <code>@winglang/sdk.core.IApp</code> | The app with files to synthesize. |
| <code><a href="#@winglang/sdk.core.FilesProps.property.stateFile">state_file</a></code> | <code>str</code> | The path to a state file which will track all synthesized files. |

---

##### `app`<sup>Required</sup> <a name="app" id="@winglang/sdk.core.FilesProps.property.app"></a>

```wing
app: IApp;
```

- *Type:* @winglang/sdk.core.IApp

The app with files to synthesize.

---

##### `state_file`<sup>Optional</sup> <a name="state_file" id="@winglang/sdk.core.FilesProps.property.stateFile"></a>

```wing
state_file: str;
```

- *Type:* str
- *Default:* no state file

The path to a state file which will track all synthesized files.

If a
statefile is not specified, we won't be able to remove extrenous files.

---

### FunctionProps <a name="FunctionProps" id="@winglang/sdk.cloud.FunctionProps"></a>

Properties for `Function`.

This is the type users see when constructing a cloud.Function instance.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.FunctionProps.Initializer"></a>

```wing
bring { cloud } from "@winglang/sdk"

let function_props = cloud.FunctionProps{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.FunctionProps.property.env">env</a></code> | <code>MutMap&lt;str&gt;</code> | Environment variables to pass to the function. |
| <code><a href="#@winglang/sdk.cloud.FunctionProps.property.timeout">timeout</a></code> | <code>@winglang/sdk.std.Duration</code> | The maximum amount of time the function can run. |

---

##### `env`<sup>Optional</sup> <a name="env" id="@winglang/sdk.cloud.FunctionProps.property.env"></a>

```wing
env: MutMap<str>;
```

- *Type:* MutMap&lt;str&gt;
- *Default:* No environment variables.

Environment variables to pass to the function.

---

##### `timeout`<sup>Optional</sup> <a name="timeout" id="@winglang/sdk.cloud.FunctionProps.property.timeout"></a>

```wing
timeout: Duration;
```

- *Type:* @winglang/sdk.std.Duration
- *Default:* 1m

The maximum amount of time the function can run.

---

### InflightBindings <a name="InflightBindings" id="@winglang/sdk.core.InflightBindings"></a>

Inflight bindings.

#### Initializer <a name="Initializer" id="@winglang/sdk.core.InflightBindings.Initializer"></a>

```wing
bring { core } from "@winglang/sdk"

let inflight_bindings = core.InflightBindings{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.core.InflightBindings.property.data">data</a></code> | <code>MutMap&lt;any&gt;</code> | Immutable data being referenced by the inflight (key is the symbol); |
| <code><a href="#@winglang/sdk.core.InflightBindings.property.resources">resources</a></code> | <code>MutMap&lt;@winglang/sdk.core.InflightResourceBinding&gt;</code> | Resources being referenced by the inflight (key is the symbol). |

---

##### `data`<sup>Optional</sup> <a name="data" id="@winglang/sdk.core.InflightBindings.property.data"></a>

```wing
data: MutMap<any>;
```

- *Type:* MutMap&lt;any&gt;

Immutable data being referenced by the inflight (key is the symbol);

---

##### `resources`<sup>Optional</sup> <a name="resources" id="@winglang/sdk.core.InflightBindings.property.resources"></a>

```wing
resources: MutMap<InflightResourceBinding>;
```

- *Type:* MutMap&lt;@winglang/sdk.core.InflightResourceBinding&gt;

Resources being referenced by the inflight (key is the symbol).

---

### InflightProps <a name="InflightProps" id="@winglang/sdk.core.InflightProps"></a>

Props for `Inflight`.

#### Initializer <a name="Initializer" id="@winglang/sdk.core.InflightProps.Initializer"></a>

```wing
bring { core } from "@winglang/sdk"

let inflight_props = core.InflightProps{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.core.InflightProps.property.code">code</a></code> | <code>@winglang/sdk.core.Code</code> | Reference to the inflight code. Only JavaScript code is currently supported. |
| <code><a href="#@winglang/sdk.core.InflightProps.property.bindings">bindings</a></code> | <code>@winglang/sdk.core.InflightBindings</code> | Data and resource binding information. |

---

##### `code`<sup>Required</sup> <a name="code" id="@winglang/sdk.core.InflightProps.property.code"></a>

```wing
code: Code;
```

- *Type:* @winglang/sdk.core.Code

Reference to the inflight code. Only JavaScript code is currently supported.

The JavaScript code needs be in the form `async handle(event) { ... }`, and
all references to resources must be made through `this.<resource>`.

---

##### `bindings`<sup>Optional</sup> <a name="bindings" id="@winglang/sdk.core.InflightProps.property.bindings"></a>

```wing
bindings: InflightBindings;
```

- *Type:* @winglang/sdk.core.InflightBindings
- *Default:* no bindings

Data and resource binding information.

---

### InflightResourceBinding <a name="InflightResourceBinding" id="@winglang/sdk.core.InflightResourceBinding"></a>

A resource binding.

#### Initializer <a name="Initializer" id="@winglang/sdk.core.InflightResourceBinding.Initializer"></a>

```wing
bring { core } from "@winglang/sdk"

let inflight_resource_binding = core.InflightResourceBinding{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.core.InflightResourceBinding.property.ops">ops</a></code> | <code>MutArray&lt;str&gt;</code> | The list of operations used on the resource. |
| <code><a href="#@winglang/sdk.core.InflightResourceBinding.property.resource">resource</a></code> | <code>@winglang/sdk.core.IResource</code> | The resource. |

---

##### `ops`<sup>Required</sup> <a name="ops" id="@winglang/sdk.core.InflightResourceBinding.property.ops"></a>

```wing
ops: MutArray<str>;
```

- *Type:* MutArray&lt;str&gt;

The list of operations used on the resource.

---

##### `resource`<sup>Required</sup> <a name="resource" id="@winglang/sdk.core.InflightResourceBinding.property.resource"></a>

```wing
resource: IResource;
```

- *Type:* @winglang/sdk.core.IResource

The resource.

---

### JsonFileProps <a name="JsonFileProps" id="@winglang/sdk.fs.JsonFileProps"></a>

Props for `JsonFile`.

#### Initializer <a name="Initializer" id="@winglang/sdk.fs.JsonFileProps.Initializer"></a>

```wing
bring { fs } from "@winglang/sdk"

let json_file_props = fs.JsonFileProps{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.fs.JsonFileProps.property.obj">obj</a></code> | <code>any</code> | The object that will be serialized into the file during synthesis. |

---

##### `obj`<sup>Required</sup> <a name="obj" id="@winglang/sdk.fs.JsonFileProps.property.obj"></a>

```wing
obj: any;
```

- *Type:* any

The object that will be serialized into the file during synthesis.

---

### OperationAnnotation <a name="OperationAnnotation" id="@winglang/sdk.core.OperationAnnotation"></a>

Annotations about what resources an inflight operation may access.

The following example says that the operation may call "put" on a resource
at "this.inner", or it may call "get" on a resource passed as an argument named
"other".

*Example*

```wing
{ "this.inner": { ops: ["put"] }, "other": { ops: ["get"] } }
```


#### Initializer <a name="Initializer" id="@winglang/sdk.core.OperationAnnotation.Initializer"></a>

```wing
bring { core } from "@winglang/sdk"

let operation_annotation = core.OperationAnnotation{ ... }
```


### QueueOnMessageProps <a name="QueueOnMessageProps" id="@winglang/sdk.cloud.QueueOnMessageProps"></a>

Options for Queue.onMessage.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.QueueOnMessageProps.Initializer"></a>

```wing
bring { cloud } from "@winglang/sdk"

let queue_on_message_props = cloud.QueueOnMessageProps{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.QueueOnMessageProps.property.env">env</a></code> | <code>MutMap&lt;str&gt;</code> | Environment variables to pass to the function. |
| <code><a href="#@winglang/sdk.cloud.QueueOnMessageProps.property.timeout">timeout</a></code> | <code>@winglang/sdk.std.Duration</code> | The maximum amount of time the function can run. |
| <code><a href="#@winglang/sdk.cloud.QueueOnMessageProps.property.batchSize">batch_size</a></code> | <code>num</code> | The maximum number of messages to send to subscribers at once. |

---

##### `env`<sup>Optional</sup> <a name="env" id="@winglang/sdk.cloud.QueueOnMessageProps.property.env"></a>

```wing
env: MutMap<str>;
```

- *Type:* MutMap&lt;str&gt;
- *Default:* No environment variables.

Environment variables to pass to the function.

---

##### `timeout`<sup>Optional</sup> <a name="timeout" id="@winglang/sdk.cloud.QueueOnMessageProps.property.timeout"></a>

```wing
timeout: Duration;
```

- *Type:* @winglang/sdk.std.Duration
- *Default:* 1m

The maximum amount of time the function can run.

---

##### `batch_size`<sup>Optional</sup> <a name="batch_size" id="@winglang/sdk.cloud.QueueOnMessageProps.property.batchSize"></a>

```wing
batch_size: num;
```

- *Type:* num
- *Default:* 1

The maximum number of messages to send to subscribers at once.

---

### QueueProps <a name="QueueProps" id="@winglang/sdk.cloud.QueueProps"></a>

Properties for `Queue`.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.QueueProps.Initializer"></a>

```wing
bring { cloud } from "@winglang/sdk"

let queue_props = cloud.QueueProps{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.QueueProps.property.initialMessages">initial_messages</a></code> | <code>MutArray&lt;str&gt;</code> | Initialize the queue with a set of messages. |
| <code><a href="#@winglang/sdk.cloud.QueueProps.property.timeout">timeout</a></code> | <code>@winglang/sdk.std.Duration</code> | How long a queue's consumers have to process a message. |

---

##### `initial_messages`<sup>Optional</sup> <a name="initial_messages" id="@winglang/sdk.cloud.QueueProps.property.initialMessages"></a>

```wing
initial_messages: MutArray<str>;
```

- *Type:* MutArray&lt;str&gt;
- *Default:* []

Initialize the queue with a set of messages.

---

##### `timeout`<sup>Optional</sup> <a name="timeout" id="@winglang/sdk.cloud.QueueProps.property.timeout"></a>

```wing
timeout: Duration;
```

- *Type:* @winglang/sdk.std.Duration
- *Default:* Duration.fromSeconds(10)

How long a queue's consumers have to process a message.

---

### TextFileProps <a name="TextFileProps" id="@winglang/sdk.fs.TextFileProps"></a>

Props for `TextFile`.

#### Initializer <a name="Initializer" id="@winglang/sdk.fs.TextFileProps.Initializer"></a>

```wing
bring { fs } from "@winglang/sdk"

let text_file_props = fs.TextFileProps{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.fs.TextFileProps.property.lines">lines</a></code> | <code>MutArray&lt;str&gt;</code> | The lines of text that will be serialized into the file during synthesis. |

---

##### `lines`<sup>Optional</sup> <a name="lines" id="@winglang/sdk.fs.TextFileProps.property.lines"></a>

```wing
lines: MutArray<str>;
```

- *Type:* MutArray&lt;str&gt;
- *Default:* []

The lines of text that will be serialized into the file during synthesis.

They will be joined with newline characters.

---

### TopicOnMessageProps <a name="TopicOnMessageProps" id="@winglang/sdk.cloud.TopicOnMessageProps"></a>

Options for Topic.onMessage.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.TopicOnMessageProps.Initializer"></a>

```wing
bring { cloud } from "@winglang/sdk"

let topic_on_message_props = cloud.TopicOnMessageProps{ ... }
```


### TopicProps <a name="TopicProps" id="@winglang/sdk.cloud.TopicProps"></a>

Properties for `Topic`.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.TopicProps.Initializer"></a>

```wing
bring { cloud } from "@winglang/sdk"

let topic_props = cloud.TopicProps{ ... }
```


## Classes <a name="Classes" id="Classes"></a>

### DependencyGraph <a name="DependencyGraph" id="@winglang/sdk.core.DependencyGraph"></a>

Represents the dependency graph for a given Node.

This graph includes the dependency relationships between all nodes in the
node (construct) sub-tree who's root is this Node.

Note that this means that lonely nodes (no dependencies and no dependants) are also included in this graph as
childless children of the root node of the graph.

The graph does not include cross-scope dependencies. That is, if a child on the current scope depends on a node
from a different scope, that relationship is not represented in this graph.

#### Initializers <a name="Initializers" id="@winglang/sdk.core.DependencyGraph.Initializer"></a>

```wing
bring { core } from "@winglang/sdk"

new core.DependencyGraph(node: Node)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.core.DependencyGraph.Initializer.parameter.node">node</a></code> | <code>constructs.Node</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.core.DependencyGraph.Initializer.parameter.node"></a>

- *Type:* constructs.Node

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.core.DependencyGraph.topology">topology</a></code> | Returns a topologically sorted array of the constructs in the sub-graph. |

---

##### `topology` <a name="topology" id="@winglang/sdk.core.DependencyGraph.topology"></a>

```wing
topology(): MutArray<IConstruct>
```

Returns a topologically sorted array of the constructs in the sub-graph.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.core.DependencyGraph.property.root">root</a></code> | <code>@winglang/sdk.core.DependencyVertex</code> | Returns the root of the graph. |

---

##### `root`<sup>Required</sup> <a name="root" id="@winglang/sdk.core.DependencyGraph.property.root"></a>

```wing
root: DependencyVertex;
```

- *Type:* @winglang/sdk.core.DependencyVertex

Returns the root of the graph.

Note that this vertex will always have `null` as its `.value` since it is an artifical root
that binds all the connected spaces of the graph.

---


### DependencyVertex <a name="DependencyVertex" id="@winglang/sdk.core.DependencyVertex"></a>

Represents a vertex in the graph.

The value of each vertex is an `IConstruct` that is accessible via the `.value` getter.

#### Initializers <a name="Initializers" id="@winglang/sdk.core.DependencyVertex.Initializer"></a>

```wing
bring { core } from "@winglang/sdk"

new core.DependencyVertex(value?: IConstruct)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.core.DependencyVertex.Initializer.parameter.value">value</a></code> | <code>constructs.IConstruct</code> | *No description.* |

---

##### `value`<sup>Optional</sup> <a name="value" id="@winglang/sdk.core.DependencyVertex.Initializer.parameter.value"></a>

- *Type:* constructs.IConstruct

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.core.DependencyVertex.addChild">add_child</a></code> | Adds a vertex as a dependency of the current node. |
| <code><a href="#@winglang/sdk.core.DependencyVertex.topology">topology</a></code> | Returns a topologically sorted array of the constructs in the sub-graph. |

---

##### `add_child` <a name="add_child" id="@winglang/sdk.core.DependencyVertex.addChild"></a>

```wing
add_child(dep: DependencyVertex): void
```

Adds a vertex as a dependency of the current node.

Also updates the parents of `dep`, so that it contains this node as a parent.

This operation will fail in case it creates a cycle in the graph.

###### `dep`<sup>Required</sup> <a name="dep" id="@winglang/sdk.core.DependencyVertex.addChild.parameter.dep"></a>

- *Type:* @winglang/sdk.core.DependencyVertex

The dependency.

---

##### `topology` <a name="topology" id="@winglang/sdk.core.DependencyVertex.topology"></a>

```wing
topology(): MutArray<IConstruct>
```

Returns a topologically sorted array of the constructs in the sub-graph.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.core.DependencyVertex.property.inbound">inbound</a></code> | <code>MutArray&lt;@winglang/sdk.core.DependencyVertex&gt;</code> | Returns the parents of the vertex (i.e dependants). |
| <code><a href="#@winglang/sdk.core.DependencyVertex.property.outbound">outbound</a></code> | <code>MutArray&lt;@winglang/sdk.core.DependencyVertex&gt;</code> | Returns the children of the vertex (i.e dependencies). |
| <code><a href="#@winglang/sdk.core.DependencyVertex.property.value">value</a></code> | <code>constructs.IConstruct</code> | Returns the IConstruct this graph vertex represents. |

---

##### `inbound`<sup>Required</sup> <a name="inbound" id="@winglang/sdk.core.DependencyVertex.property.inbound"></a>

```wing
inbound: MutArray<DependencyVertex>;
```

- *Type:* MutArray&lt;@winglang/sdk.core.DependencyVertex&gt;

Returns the parents of the vertex (i.e dependants).

---

##### `outbound`<sup>Required</sup> <a name="outbound" id="@winglang/sdk.core.DependencyVertex.property.outbound"></a>

```wing
outbound: MutArray<DependencyVertex>;
```

- *Type:* MutArray&lt;@winglang/sdk.core.DependencyVertex&gt;

Returns the children of the vertex (i.e dependencies).

---

##### `value`<sup>Optional</sup> <a name="value" id="@winglang/sdk.core.DependencyVertex.property.value"></a>

```wing
value: IConstruct;
```

- *Type:* constructs.IConstruct

Returns the IConstruct this graph vertex represents.

`null` in case this is the root of the graph.

---


### Display <a name="Display" id="@winglang/sdk.core.Display"></a>

Information on how to display a resource in the UI.

#### Initializers <a name="Initializers" id="@winglang/sdk.core.Display.Initializer"></a>

```wing
bring { core } from "@winglang/sdk"

new core.Display(props?: DisplayProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.core.Display.Initializer.parameter.props">props</a></code> | <code>@winglang/sdk.core.DisplayProps</code> | *No description.* |

---

##### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.core.Display.Initializer.parameter.props"></a>

- *Type:* @winglang/sdk.core.DisplayProps

---



#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.core.Display.property.description">description</a></code> | <code>str</code> | Description of the resource. |
| <code><a href="#@winglang/sdk.core.Display.property.hidden">hidden</a></code> | <code>bool</code> | Whether the resource should be hidden from the UI. |
| <code><a href="#@winglang/sdk.core.Display.property.title">title</a></code> | <code>str</code> | Title of the resource. |

---

##### `description`<sup>Optional</sup> <a name="description" id="@winglang/sdk.core.Display.property.description"></a>

```wing
description: str;
```

- *Type:* str

Description of the resource.

---

##### `hidden`<sup>Optional</sup> <a name="hidden" id="@winglang/sdk.core.Display.property.hidden"></a>

```wing
hidden: bool;
```

- *Type:* bool

Whether the resource should be hidden from the UI.

---

##### `title`<sup>Optional</sup> <a name="title" id="@winglang/sdk.core.Display.property.title"></a>

```wing
title: str;
```

- *Type:* str

Title of the resource.

---


### Files <a name="Files" id="@winglang/sdk.core.Files"></a>

Handles the synthesis of files.

#### Initializers <a name="Initializers" id="@winglang/sdk.core.Files.Initializer"></a>

```wing
bring { core } from "@winglang/sdk"

new core.Files(props: FilesProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.core.Files.Initializer.parameter.props">props</a></code> | <code>@winglang/sdk.core.FilesProps</code> | *No description.* |

---

##### `props`<sup>Required</sup> <a name="props" id="@winglang/sdk.core.Files.Initializer.parameter.props"></a>

- *Type:* @winglang/sdk.core.FilesProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.core.Files.synth">synth</a></code> | Synthesize the app into the output directory. |

---

##### `synth` <a name="synth" id="@winglang/sdk.core.Files.synth"></a>

```wing
synth(outdir?: str): void
```

Synthesize the app into the output directory.

The artifact produced
depends on what synthesizer was used.

###### `outdir`<sup>Optional</sup> <a name="outdir" id="@winglang/sdk.core.Files.synth.parameter.outdir"></a>

- *Type:* str

The output directory, if not specified, the app's outdir will be used.

---


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.core.Files.property.stateFile">state_file</a></code> | <code>str</code> | The path to a state file which will track all synthesized files. |

---

##### `state_file`<sup>Optional</sup> <a name="state_file" id="@winglang/sdk.core.Files.property.stateFile"></a>

```wing
state_file: str;
```

- *Type:* str

The path to a state file which will track all synthesized files.

---


### InflightClient <a name="InflightClient" id="@winglang/sdk.core.InflightClient"></a>

Utility class with functions about inflight clients.


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.core.InflightClient.for">for</a></code> | Creates a `Code` instance with code for creating an inflight client. |

---

##### `for` <a name="for" id="@winglang/sdk.core.InflightClient.for"></a>

```wing
bring { core } from "@winglang/sdk"

core.InflightClient.for(filename: str, client_class: str, args: MutArray<str>)
```

Creates a `Code` instance with code for creating an inflight client.

###### `filename`<sup>Required</sup> <a name="filename" id="@winglang/sdk.core.InflightClient.for.parameter.filename"></a>

- *Type:* str

---

###### `client_class`<sup>Required</sup> <a name="client_class" id="@winglang/sdk.core.InflightClient.for.parameter.clientClass"></a>

- *Type:* str

---

###### `args`<sup>Required</sup> <a name="args" id="@winglang/sdk.core.InflightClient.for.parameter.args"></a>

- *Type:* MutArray&lt;str&gt;

---



### NodeJsCode <a name="NodeJsCode" id="@winglang/sdk.core.NodeJsCode"></a>

Reference to a piece of Node.js code.


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.core.NodeJsCode.fromFile">from_file</a></code> | Reference code from a file path. |
| <code><a href="#@winglang/sdk.core.NodeJsCode.fromInline">from_inline</a></code> | Reference code directly from a string. |

---

##### `from_file` <a name="from_file" id="@winglang/sdk.core.NodeJsCode.fromFile"></a>

```wing
bring { core } from "@winglang/sdk"

core.NodeJsCode.from_file(path: str)
```

Reference code from a file path.

###### `path`<sup>Required</sup> <a name="path" id="@winglang/sdk.core.NodeJsCode.fromFile.parameter.path"></a>

- *Type:* str

---

##### `from_inline` <a name="from_inline" id="@winglang/sdk.core.NodeJsCode.fromInline"></a>

```wing
bring { core } from "@winglang/sdk"

core.NodeJsCode.from_inline(text: str)
```

Reference code directly from a string.

###### `text`<sup>Required</sup> <a name="text" id="@winglang/sdk.core.NodeJsCode.fromInline.parameter.text"></a>

- *Type:* str

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.core.NodeJsCode.property.hash">hash</a></code> | <code>str</code> | Generate a hash of the code contents. |
| <code><a href="#@winglang/sdk.core.NodeJsCode.property.language">language</a></code> | <code>@winglang/sdk.core.Language</code> | The language of the code. |
| <code><a href="#@winglang/sdk.core.NodeJsCode.property.path">path</a></code> | <code>str</code> | A path to the code in the user's file system that can be referenced for bundling purposes. |
| <code><a href="#@winglang/sdk.core.NodeJsCode.property.text">text</a></code> | <code>str</code> | The code contents. |

---

##### `hash`<sup>Required</sup> <a name="hash" id="@winglang/sdk.core.NodeJsCode.property.hash"></a>

```wing
hash: str;
```

- *Type:* str

Generate a hash of the code contents.

---

##### `language`<sup>Required</sup> <a name="language" id="@winglang/sdk.core.NodeJsCode.property.language"></a>

```wing
language: Language;
```

- *Type:* @winglang/sdk.core.Language

The language of the code.

---

##### `path`<sup>Required</sup> <a name="path" id="@winglang/sdk.core.NodeJsCode.property.path"></a>

```wing
path: str;
```

- *Type:* str

A path to the code in the user's file system that can be referenced for bundling purposes.

---

##### `text`<sup>Required</sup> <a name="text" id="@winglang/sdk.core.NodeJsCode.property.text"></a>

```wing
text: str;
```

- *Type:* str

The code contents.

---


### TreeInspector <a name="TreeInspector" id="@winglang/sdk.core.TreeInspector"></a>

Inspector that maintains an attribute bag.

#### Initializers <a name="Initializers" id="@winglang/sdk.core.TreeInspector.Initializer"></a>

```wing
bring { core } from "@winglang/sdk"

new core.TreeInspector()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.core.TreeInspector.addAttribute">add_attribute</a></code> | Adds attribute to bag. |

---

##### `add_attribute` <a name="add_attribute" id="@winglang/sdk.core.TreeInspector.addAttribute"></a>

```wing
add_attribute(key: str, value: any): void
```

Adds attribute to bag.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.core.TreeInspector.addAttribute.parameter.key"></a>

- *Type:* str

key for metadata.

---

###### `value`<sup>Required</sup> <a name="value" id="@winglang/sdk.core.TreeInspector.addAttribute.parameter.value"></a>

- *Type:* any

value of metadata.

---


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.core.TreeInspector.property.attributes">attributes</a></code> | <code>MutMap&lt;any&gt;</code> | Represents the bag of attributes as key-value pairs. |

---

##### `attributes`<sup>Required</sup> <a name="attributes" id="@winglang/sdk.core.TreeInspector.property.attributes"></a>

```wing
attributes: MutMap<any>;
```

- *Type:* MutMap&lt;any&gt;

Represents the bag of attributes as key-value pairs.

---


## Protocols <a name="Protocols" id="Protocols"></a>

### IApp <a name="IApp" id="@winglang/sdk.core.IApp"></a>

- *Extends:* constructs.IConstruct

- *Implemented By:* @winglang/sdk.core.CdktfApp, @winglang/sdk.sim.App, @winglang/sdk.testing.SimApp, @winglang/sdk.tfaws.App, @winglang/sdk.tfazure.App, @winglang/sdk.tfgcp.App, @winglang/sdk.core.IApp

A Wing application.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.core.IApp.synth">synth</a></code> | Synthesize the app into an artifact. |

---

##### `synth` <a name="synth" id="@winglang/sdk.core.IApp.synth"></a>

```wing
synth(): str
```

Synthesize the app into an artifact.

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.core.IApp.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.core.IApp.property.outdir">outdir</a></code> | <code>str</code> | Directory where artifacts are synthesized to. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.core.IApp.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `outdir`<sup>Required</sup> <a name="outdir" id="@winglang/sdk.core.IApp.property.outdir"></a>

```wing
outdir: str;
```

- *Type:* str

Directory where artifacts are synthesized to.

---

### IBucketClient <a name="IBucketClient" id="@winglang/sdk.cloud.IBucketClient"></a>

- *Implemented By:* @winglang/sdk.cloud.IBucketClient

Inflight interface for `Bucket`.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.IBucketClient.delete">delete</a></code> | Delete an existing object using a key from the bucket. |
| <code><a href="#@winglang/sdk.cloud.IBucketClient.get">get</a></code> | Retrieve an object from the bucket. |
| <code><a href="#@winglang/sdk.cloud.IBucketClient.list">list</a></code> | Retrieve existing objects keys from the bucket. |
| <code><a href="#@winglang/sdk.cloud.IBucketClient.put">put</a></code> | Put an object in the bucket. |

---

##### `delete` <a name="delete" id="@winglang/sdk.cloud.IBucketClient.delete"></a>

```wing
delete(key: str, opts?: BucketDeleteOptions): void
```

**Inflight client:** [true](#true)

Delete an existing object using a key from the bucket.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.cloud.IBucketClient.delete.parameter.key"></a>

- *Type:* str

Key of the object.

---

###### `opts`<sup>Optional</sup> <a name="opts" id="@winglang/sdk.cloud.IBucketClient.delete.parameter.opts"></a>

- *Type:* @winglang/sdk.cloud.BucketDeleteOptions

Options available for delete an item from a bucket.

---

##### `get` <a name="get" id="@winglang/sdk.cloud.IBucketClient.get"></a>

```wing
get(key: str): str
```

**Inflight client:** [true](#true)

Retrieve an object from the bucket.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.cloud.IBucketClient.get.parameter.key"></a>

- *Type:* str

Key of the object.

---

##### `list` <a name="list" id="@winglang/sdk.cloud.IBucketClient.list"></a>

```wing
list(prefix?: str): MutArray<str>
```

**Inflight client:** [true](#true)

Retrieve existing objects keys from the bucket.

###### `prefix`<sup>Optional</sup> <a name="prefix" id="@winglang/sdk.cloud.IBucketClient.list.parameter.prefix"></a>

- *Type:* str

Limits the response to keys that begin with the specified prefix.

---

##### `put` <a name="put" id="@winglang/sdk.cloud.IBucketClient.put"></a>

```wing
put(key: str, body: str): void
```

**Inflight client:** [true](#true)

Put an object in the bucket.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.cloud.IBucketClient.put.parameter.key"></a>

- *Type:* str

Key of the object.

---

###### `body`<sup>Required</sup> <a name="body" id="@winglang/sdk.cloud.IBucketClient.put.parameter.body"></a>

- *Type:* str

Content of the object we want to store into the bucket.

---


### ICounterClient <a name="ICounterClient" id="@winglang/sdk.cloud.ICounterClient"></a>

- *Implemented By:* @winglang/sdk.cloud.CounterClientBase, @winglang/sdk.cloud.ICounterClient

Inflight interface for `Counter`.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.ICounterClient.dec">dec</a></code> | Decrement the counter, returning the previous value. |
| <code><a href="#@winglang/sdk.cloud.ICounterClient.inc">inc</a></code> | Increments the counter atomically by a certain amount and returns the previous value. |
| <code><a href="#@winglang/sdk.cloud.ICounterClient.peek">peek</a></code> | Get the current value of the counter. |

---

##### `dec` <a name="dec" id="@winglang/sdk.cloud.ICounterClient.dec"></a>

```wing
dec(amount?: num): num
```

**Inflight client:** [true](#true)

Decrement the counter, returning the previous value.

###### `amount`<sup>Optional</sup> <a name="amount" id="@winglang/sdk.cloud.ICounterClient.dec.parameter.amount"></a>

- *Type:* num

amount to decrement (default is 1).

---

##### `inc` <a name="inc" id="@winglang/sdk.cloud.ICounterClient.inc"></a>

```wing
inc(amount?: num): num
```

**Inflight client:** [true](#true)

Increments the counter atomically by a certain amount and returns the previous value.

###### `amount`<sup>Optional</sup> <a name="amount" id="@winglang/sdk.cloud.ICounterClient.inc.parameter.amount"></a>

- *Type:* num

amount to increment (default is 1).

---

##### `peek` <a name="peek" id="@winglang/sdk.cloud.ICounterClient.peek"></a>

```wing
peek(): num
```

**Inflight client:** [true](#true)

Get the current value of the counter.

Using this API may introduce race conditions since the value can change between
the time it is read and the time it is used in your code.


### IFunctionClient <a name="IFunctionClient" id="@winglang/sdk.cloud.IFunctionClient"></a>

- *Implemented By:* @winglang/sdk.cloud.IFunctionClient

Inflight interface for `Function`.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.IFunctionClient.invoke">invoke</a></code> | Invoke the function asynchronously with a given payload. |

---

##### `invoke` <a name="invoke" id="@winglang/sdk.cloud.IFunctionClient.invoke"></a>

```wing
invoke(payload: str): str
```

**Inflight client:** [true](#true)

Invoke the function asynchronously with a given payload.

###### `payload`<sup>Required</sup> <a name="payload" id="@winglang/sdk.cloud.IFunctionClient.invoke.parameter.payload"></a>

- *Type:* str

---


### IFunctionHandler <a name="IFunctionHandler" id="@winglang/sdk.cloud.IFunctionHandler"></a>

- *Extends:* @winglang/sdk.core.IResource

- *Implemented By:* @winglang/sdk.cloud.IFunctionHandler

**Inflight client:** [wingsdk.cloud.IFunctionHandlerClient](#wingsdk.cloud.IFunctionHandlerClient)

Represents a resource with an inflight "handle" method that can be used to create a `cloud.Function`.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.IFunctionHandler.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.cloud.IFunctionHandler.property.display">display</a></code> | <code>@winglang/sdk.core.Display</code> | Information on how to display a resource in the UI. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.cloud.IFunctionHandler.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `display`<sup>Required</sup> <a name="display" id="@winglang/sdk.cloud.IFunctionHandler.property.display"></a>

```wing
display: Display;
```

- *Type:* @winglang/sdk.core.Display

Information on how to display a resource in the UI.

---

### IFunctionHandlerClient <a name="IFunctionHandlerClient" id="@winglang/sdk.cloud.IFunctionHandlerClient"></a>

- *Implemented By:* @winglang/sdk.cloud.IFunctionHandlerClient

Inflight client for `IFunctionHandler`.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.IFunctionHandlerClient.handle">handle</a></code> | Entrypoint function that will be called when the cloud function is invoked. |

---

##### `handle` <a name="handle" id="@winglang/sdk.cloud.IFunctionHandlerClient.handle"></a>

```wing
handle(event: str): void
```

**Inflight client:** [true](#true)

Entrypoint function that will be called when the cloud function is invoked.

###### `event`<sup>Required</sup> <a name="event" id="@winglang/sdk.cloud.IFunctionHandlerClient.handle.parameter.event"></a>

- *Type:* str

---


### IInflightHost <a name="IInflightHost" id="@winglang/sdk.core.IInflightHost"></a>

- *Extends:* @winglang/sdk.core.IResource

- *Implemented By:* @winglang/sdk.cloud.Function, @winglang/sdk.cloud.FunctionBase, @winglang/sdk.sim.Function, @winglang/sdk.tfaws.Function, @winglang/sdk.tfazure.Function, @winglang/sdk.core.IInflightHost

A resource that can run inflight code.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.core.IInflightHost.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.core.IInflightHost.property.display">display</a></code> | <code>@winglang/sdk.core.Display</code> | Information on how to display a resource in the UI. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.core.IInflightHost.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `display`<sup>Required</sup> <a name="display" id="@winglang/sdk.core.IInflightHost.property.display"></a>

```wing
display: Display;
```

- *Type:* @winglang/sdk.core.Display

Information on how to display a resource in the UI.

---

### IInspectable <a name="IInspectable" id="@winglang/sdk.core.IInspectable"></a>

- *Implemented By:* @winglang/sdk.cloud.Bucket, @winglang/sdk.cloud.BucketBase, @winglang/sdk.cloud.Counter, @winglang/sdk.cloud.CounterBase, @winglang/sdk.cloud.Function, @winglang/sdk.cloud.FunctionBase, @winglang/sdk.cloud.Logger, @winglang/sdk.cloud.LoggerBase, @winglang/sdk.cloud.Queue, @winglang/sdk.cloud.QueueBase, @winglang/sdk.cloud.Topic, @winglang/sdk.cloud.TopicBase, @winglang/sdk.core.Inflight, @winglang/sdk.core.Resource, @winglang/sdk.sim.Bucket, @winglang/sdk.sim.Counter, @winglang/sdk.sim.Function, @winglang/sdk.sim.Logger, @winglang/sdk.sim.Queue, @winglang/sdk.sim.Topic, @winglang/sdk.tfaws.Bucket, @winglang/sdk.tfaws.Counter, @winglang/sdk.tfaws.Function, @winglang/sdk.tfaws.Queue, @winglang/sdk.tfazure.Bucket, @winglang/sdk.tfazure.Function, @winglang/sdk.tfgcp.Bucket, @winglang/sdk.tfgcp.Logger, @winglang/sdk.cloud.IFunctionHandler, @winglang/sdk.cloud.IQueueOnMessageHandler, @winglang/sdk.cloud.ITopicOnMessageHandler, @winglang/sdk.core.IInflightHost, @winglang/sdk.core.IInspectable, @winglang/sdk.core.IResource

Interface for examining a construct and exposing metadata.



### ILoggerClient <a name="ILoggerClient" id="@winglang/sdk.cloud.ILoggerClient"></a>

- *Implemented By:* @winglang/sdk.cloud.ILoggerClient

Inflight interface for `Logger`.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.ILoggerClient.print">print</a></code> | Logs a message. The log will be associated with whichever resource is running the inflight code. |

---

##### `print` <a name="print" id="@winglang/sdk.cloud.ILoggerClient.print"></a>

```wing
print(message: str): void
```

**Inflight client:** [true](#true)

Logs a message. The log will be associated with whichever resource is running the inflight code.

NOTICE: this is not an async function because it is wrapped by `console.log()`.

###### `message`<sup>Required</sup> <a name="message" id="@winglang/sdk.cloud.ILoggerClient.print.parameter.message"></a>

- *Type:* str

The message to print.

---


### IQueueClient <a name="IQueueClient" id="@winglang/sdk.cloud.IQueueClient"></a>

- *Implemented By:* @winglang/sdk.cloud.IQueueClient

Inflight interface for `Queue`.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.IQueueClient.approxSize">approx_size</a></code> | Retrieve the approximate number of messages in the queue. |
| <code><a href="#@winglang/sdk.cloud.IQueueClient.purge">purge</a></code> | Purge all of the messages in the queue. |
| <code><a href="#@winglang/sdk.cloud.IQueueClient.push">push</a></code> | Push a message to the queue. |

---

##### `approx_size` <a name="approx_size" id="@winglang/sdk.cloud.IQueueClient.approxSize"></a>

```wing
approx_size(): num
```

**Inflight client:** [true](#true)

Retrieve the approximate number of messages in the queue.

##### `purge` <a name="purge" id="@winglang/sdk.cloud.IQueueClient.purge"></a>

```wing
purge(): void
```

**Inflight client:** [true](#true)

Purge all of the messages in the queue.

##### `push` <a name="push" id="@winglang/sdk.cloud.IQueueClient.push"></a>

```wing
push(message: str): void
```

**Inflight client:** [true](#true)

Push a message to the queue.

###### `message`<sup>Required</sup> <a name="message" id="@winglang/sdk.cloud.IQueueClient.push.parameter.message"></a>

- *Type:* str

Payload to send to the queue.

---


### IQueueOnMessageHandler <a name="IQueueOnMessageHandler" id="@winglang/sdk.cloud.IQueueOnMessageHandler"></a>

- *Extends:* @winglang/sdk.core.IResource

- *Implemented By:* @winglang/sdk.cloud.IQueueOnMessageHandler

**Inflight client:** [wingsdk.cloud.IQueueOnMessageHandlerClient](#wingsdk.cloud.IQueueOnMessageHandlerClient)

Represents a resource with an inflight "handle" method that can be passed to `Queue.on_message`.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.IQueueOnMessageHandler.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.cloud.IQueueOnMessageHandler.property.display">display</a></code> | <code>@winglang/sdk.core.Display</code> | Information on how to display a resource in the UI. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.cloud.IQueueOnMessageHandler.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `display`<sup>Required</sup> <a name="display" id="@winglang/sdk.cloud.IQueueOnMessageHandler.property.display"></a>

```wing
display: Display;
```

- *Type:* @winglang/sdk.core.Display

Information on how to display a resource in the UI.

---

### IQueueOnMessageHandlerClient <a name="IQueueOnMessageHandlerClient" id="@winglang/sdk.cloud.IQueueOnMessageHandlerClient"></a>

- *Implemented By:* @winglang/sdk.cloud.IQueueOnMessageHandlerClient

Inflight client for `IQueueOnMessageHandler`.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.IQueueOnMessageHandlerClient.handle">handle</a></code> | Function that will be called when a message is received from the queue. |

---

##### `handle` <a name="handle" id="@winglang/sdk.cloud.IQueueOnMessageHandlerClient.handle"></a>

```wing
handle(message: str): void
```

**Inflight client:** [true](#true)

Function that will be called when a message is received from the queue.

###### `message`<sup>Required</sup> <a name="message" id="@winglang/sdk.cloud.IQueueOnMessageHandlerClient.handle.parameter.message"></a>

- *Type:* str

---


### IResource <a name="IResource" id="@winglang/sdk.core.IResource"></a>

- *Extends:* @winglang/sdk.core.IInspectable, constructs.IConstruct

- *Implemented By:* @winglang/sdk.cloud.Bucket, @winglang/sdk.cloud.BucketBase, @winglang/sdk.cloud.Counter, @winglang/sdk.cloud.CounterBase, @winglang/sdk.cloud.Function, @winglang/sdk.cloud.FunctionBase, @winglang/sdk.cloud.Logger, @winglang/sdk.cloud.LoggerBase, @winglang/sdk.cloud.Queue, @winglang/sdk.cloud.QueueBase, @winglang/sdk.cloud.Topic, @winglang/sdk.cloud.TopicBase, @winglang/sdk.core.Inflight, @winglang/sdk.core.Resource, @winglang/sdk.sim.Bucket, @winglang/sdk.sim.Counter, @winglang/sdk.sim.Function, @winglang/sdk.sim.Logger, @winglang/sdk.sim.Queue, @winglang/sdk.sim.Topic, @winglang/sdk.tfaws.Bucket, @winglang/sdk.tfaws.Counter, @winglang/sdk.tfaws.Function, @winglang/sdk.tfaws.Queue, @winglang/sdk.tfazure.Bucket, @winglang/sdk.tfazure.Function, @winglang/sdk.tfgcp.Bucket, @winglang/sdk.tfgcp.Logger, @winglang/sdk.cloud.IFunctionHandler, @winglang/sdk.cloud.IQueueOnMessageHandler, @winglang/sdk.cloud.ITopicOnMessageHandler, @winglang/sdk.core.IInflightHost, @winglang/sdk.core.IResource

Abstract interface for `Resource`.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.core.IResource.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.core.IResource.property.display">display</a></code> | <code>@winglang/sdk.core.Display</code> | Information on how to display a resource in the UI. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.core.IResource.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `display`<sup>Required</sup> <a name="display" id="@winglang/sdk.core.IResource.property.display"></a>

```wing
display: Display;
```

- *Type:* @winglang/sdk.core.Display

Information on how to display a resource in the UI.

---

### ITopicClient <a name="ITopicClient" id="@winglang/sdk.cloud.ITopicClient"></a>

- *Implemented By:* @winglang/sdk.cloud.ITopicClient

Inflight interface for `Topic`.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.ITopicClient.publish">publish</a></code> | Publish message to topic. |

---

##### `publish` <a name="publish" id="@winglang/sdk.cloud.ITopicClient.publish"></a>

```wing
publish(message: str): void
```

**Inflight client:** [true](#true)

Publish message to topic.

###### `message`<sup>Required</sup> <a name="message" id="@winglang/sdk.cloud.ITopicClient.publish.parameter.message"></a>

- *Type:* str

Payload to publish to Topic.

---


### ITopicOnMessageHandler <a name="ITopicOnMessageHandler" id="@winglang/sdk.cloud.ITopicOnMessageHandler"></a>

- *Extends:* @winglang/sdk.core.IResource

- *Implemented By:* @winglang/sdk.cloud.ITopicOnMessageHandler

**Inflight client:** [wingsdk.cloud.ITopicOnMessageHandlerClient](#wingsdk.cloud.ITopicOnMessageHandlerClient)

Represents a resource with an inflight "handle" method that can be passed to `Topic.on_message`.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.ITopicOnMessageHandler.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.cloud.ITopicOnMessageHandler.property.display">display</a></code> | <code>@winglang/sdk.core.Display</code> | Information on how to display a resource in the UI. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.cloud.ITopicOnMessageHandler.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `display`<sup>Required</sup> <a name="display" id="@winglang/sdk.cloud.ITopicOnMessageHandler.property.display"></a>

```wing
display: Display;
```

- *Type:* @winglang/sdk.core.Display

Information on how to display a resource in the UI.

---

### ITopicOnMessageHandlerClient <a name="ITopicOnMessageHandlerClient" id="@winglang/sdk.cloud.ITopicOnMessageHandlerClient"></a>

- *Implemented By:* @winglang/sdk.cloud.ITopicOnMessageHandlerClient

Inflight client for `ITopicOnMessageHandler`.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.ITopicOnMessageHandlerClient.handle">handle</a></code> | Function that will be called when a message is received from the topic. |

---

##### `handle` <a name="handle" id="@winglang/sdk.cloud.ITopicOnMessageHandlerClient.handle"></a>

```wing
handle(event: str): void
```

**Inflight client:** [true](#true)

Function that will be called when a message is received from the topic.

###### `event`<sup>Required</sup> <a name="event" id="@winglang/sdk.cloud.ITopicOnMessageHandlerClient.handle.parameter.event"></a>

- *Type:* str

---


## Enums <a name="Enums" id="Enums"></a>

### Direction <a name="Direction" id="@winglang/sdk.core.Direction"></a>

The direction of a connection.

Visually speaking, if a resource A has an outbound connection with resource B,
the arrow would point from A to B, and vice versa for inbound connections.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.core.Direction.OUTBOUND">OUTBOUND</a></code> | Indicates that this resource calls, triggers, or references the resource it is connected to. |
| <code><a href="#@winglang/sdk.core.Direction.INBOUND">INBOUND</a></code> | Indicates that this resource is called, triggered, or referenced by the resource it is connected to. |

---

##### `OUTBOUND` <a name="OUTBOUND" id="@winglang/sdk.core.Direction.OUTBOUND"></a>

Indicates that this resource calls, triggers, or references the resource it is connected to.

---


##### `INBOUND` <a name="INBOUND" id="@winglang/sdk.core.Direction.INBOUND"></a>

Indicates that this resource is called, triggered, or referenced by the resource it is connected to.

---


### Language <a name="Language" id="@winglang/sdk.core.Language"></a>

The language of a piece of code.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.core.Language.NODE_JS">NODE_JS</a></code> | Node.js. |

---

##### `NODE_JS` <a name="NODE_JS" id="@winglang/sdk.core.Language.NODE_JS"></a>

Node.js.

---

