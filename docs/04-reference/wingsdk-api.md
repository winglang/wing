---
title: SDK
id: sdk
description: Wing SDK API Reference
---

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

---

##### `to_string` <a name="to_string" id="@winglang/wingsdk.cloud.Bucket.toString"></a>

```wing
to_string(): str
```

Returns a string representation of this construct.

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

---

##### `to_string` <a name="to_string" id="@winglang/wingsdk.cloud.Counter.toString"></a>

```wing
to_string(): str
```

Returns a string representation of this construct.

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
| <code><a href="#@winglang/wingsdk.cloud.Counter.property.initialValue">initialValue</a></code> | <code>num</code> | The initial value of the counter. |

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

##### `initialValue`<sup>Required</sup> <a name="initialValue" id="@winglang/wingsdk.cloud.Counter.property.initialValue"></a>

```wing
initial_value: num;
```

- *Type:* num

The initial value of the counter.

---


### Function <a name="Function" id="@winglang/wingsdk.cloud.Function"></a>

**Inflight client:** [@winglang/wingsdk.cloud.IFunctionClient](#@winglang/wingsdk.cloud.IFunctionClient)

Represents a serverless function.

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
| <code><a href="#@winglang/wingsdk.cloud.Function.addEnvironment">add_environment</a></code> | Add an environment variable to the function. |

---

##### `to_string` <a name="to_string" id="@winglang/wingsdk.cloud.Function.toString"></a>

```wing
to_string(): str
```

Returns a string representation of this construct.

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
| <code><a href="#@winglang/wingsdk.cloud.Logger.print">print</a></code> | Logs a message. |

---

##### `to_string` <a name="to_string" id="@winglang/wingsdk.cloud.Logger.toString"></a>

```wing
to_string(): str
```

Returns a string representation of this construct.

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

Represents a serverless queue.

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
| <code><a href="#@winglang/wingsdk.cloud.Queue.onMessage">on_message</a></code> | Create a function to consume messages from this queue. |

---

##### `to_string` <a name="to_string" id="@winglang/wingsdk.cloud.Queue.toString"></a>

```wing
to_string(): str
```

Returns a string representation of this construct.

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
| <code><a href="#@winglang/wingsdk.core.AppProps.property.customFactory">customFactory</a></code> | <code>polycons.IPolyconFactory</code> | A custom factory to resolve polycons. |
| <code><a href="#@winglang/wingsdk.core.AppProps.property.name">name</a></code> | <code>str</code> | The name of the app. |
| <code><a href="#@winglang/wingsdk.core.AppProps.property.outdir">outdir</a></code> | <code>str</code> | Directory where artifacts are synthesized to. |
| <code><a href="#@winglang/wingsdk.core.AppProps.property.stateFile">stateFile</a></code> | <code>str</code> | The path to a state file which will track all synthesized files. |

---

##### `customFactory`<sup>Optional</sup> <a name="customFactory" id="@winglang/wingsdk.core.AppProps.property.customFactory"></a>

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

##### `stateFile`<sup>Optional</sup> <a name="stateFile" id="@winglang/wingsdk.core.AppProps.property.stateFile"></a>

```wing
state_file: str;
```

- *Type:* str
- *Default:* no state file

The path to a state file which will track all synthesized files.

If a
statefile is not specified, we won't be able to remove extrenous files.

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

### Capture <a name="Capture" id="@winglang/wingsdk.core.Capture"></a>

Capture information.

A capture is a reference from an Inflight to a
construction-time resource or value. Either the "resource" or "value" field
will be set, but not both.

#### Initializer <a name="Initializer" id="@winglang/wingsdk.core.Capture.Initializer"></a>

```wing
bring core;

let capture = core.Capture{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.core.Capture.property.methods">methods</a></code> | <code>MutArray\<str></code> | Which methods are called on the captured resource. |
| <code><a href="#@winglang/wingsdk.core.Capture.property.resource">resource</a></code> | <code>core.ICapturableConstruct</code> | A captured resource. |
| <code><a href="#@winglang/wingsdk.core.Capture.property.value">value</a></code> | <code>any</code> | A captured immutable value (like string, number, boolean, a struct, or null). |

---

##### `methods`<sup>Optional</sup> <a name="methods" id="@winglang/wingsdk.core.Capture.property.methods"></a>

```wing
methods: MutArray<str>;
```

- *Type:* MutArray<str>

Which methods are called on the captured resource.

---

##### `resource`<sup>Optional</sup> <a name="resource" id="@winglang/wingsdk.core.Capture.property.resource"></a>

```wing
resource: ICapturableConstruct;
```

- *Type:* core.ICapturableConstruct

A captured resource.

---

##### `value`<sup>Optional</sup> <a name="value" id="@winglang/wingsdk.core.Capture.property.value"></a>

```wing
value: any;
```

- *Type:* any

A captured immutable value (like string, number, boolean, a struct, or null).

---

### CaptureMetadata <a name="CaptureMetadata" id="@winglang/wingsdk.core.CaptureMetadata"></a>

Extra metadata associated with a captured resource.

#### Initializer <a name="Initializer" id="@winglang/wingsdk.core.CaptureMetadata.Initializer"></a>

```wing
bring core;

let capture_metadata = core.CaptureMetadata{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.core.CaptureMetadata.property.methods">methods</a></code> | <code>MutArray<str></code> | Which methods are called on the captured resource. |

---

##### `methods`<sup>Optional</sup> <a name="methods" id="@winglang/wingsdk.core.CaptureMetadata.property.methods"></a>

```wing
methods: MutArray<str>;
```

- *Type:* MutArray<str>

Which methods are called on the captured resource.

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
| <code><a href="#@winglang/wingsdk.cloud.CounterProps.property.initialValue">initialValue</a></code> | <code>num</code> | The initial value of the counter. |

---

##### `initialValue`<sup>Optional</sup> <a name="initialValue" id="@winglang/wingsdk.cloud.CounterProps.property.initialValue"></a>

```wing
initial_value: num;
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
| <code><a href="#@winglang/wingsdk.core.FilesProps.property.stateFile">stateFile</a></code> | <code>str</code> | The path to a state file which will track all synthesized files. |

---

##### `app`<sup>Required</sup> <a name="app" id="@winglang/wingsdk.core.FilesProps.property.app"></a>

```wing
app: IApp;
```

- *Type:* core.IApp

The app with files to synthesize.

---

##### `stateFile`<sup>Optional</sup> <a name="stateFile" id="@winglang/wingsdk.core.FilesProps.property.stateFile"></a>

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
| <code><a href="#@winglang/wingsdk.cloud.FunctionProps.property.env">env</a></code> | <code>MutMap<str></code> | Environment variables to pass to the function. |

---

##### `env`<sup>Optional</sup> <a name="env" id="@winglang/wingsdk.cloud.FunctionProps.property.env"></a>

```wing
env: MutMap<str>;
```

- *Type:* MutMap<str>
- *Default:* No environment variables.

Environment variables to pass to the function.

---

### InflightBundleOptions <a name="InflightBundleOptions" id="@winglang/wingsdk.core.InflightBundleOptions"></a>

Options for `Inflight.bundle`.

#### Initializer <a name="Initializer" id="@winglang/wingsdk.core.InflightBundleOptions.Initializer"></a>

```wing
bring core;

let inflight_bundle_options = core.InflightBundleOptions{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.core.InflightBundleOptions.property.captureClients">captureClients</a></code> | <code>MutMap<core.Code></code> | A map of capture clients that can be bundled with the Inflight's code. |
| <code><a href="#@winglang/wingsdk.core.InflightBundleOptions.property.captureScope">captureScope</a></code> | <code>constructs.IConstruct</code> | Associate the inflight bundle with a given capture scope. |
| <code><a href="#@winglang/wingsdk.core.InflightBundleOptions.property.external">external</a></code> | <code>MutArray<str></code> | List of dependencies to exclude from the bundle. |

---

##### `captureClients`<sup>Required</sup> <a name="captureClients" id="@winglang/wingsdk.core.InflightBundleOptions.property.captureClients"></a>

```wing
capture_clients: MutMap<Code>;
```

- *Type:* MutMap<core.Code>

A map of capture clients that can be bundled with the Inflight's code.

---

##### `captureScope`<sup>Optional</sup> <a name="captureScope" id="@winglang/wingsdk.core.InflightBundleOptions.property.captureScope"></a>

```wing
capture_scope: IConstruct;
```

- *Type:* constructs.IConstruct

Associate the inflight bundle with a given capture scope.

---

##### `external`<sup>Optional</sup> <a name="external" id="@winglang/wingsdk.core.InflightBundleOptions.property.external"></a>

```wing
external: MutArray<str>;
```

- *Type:* MutArray<str>

List of dependencies to exclude from the bundle.

---

### InflightProps <a name="InflightProps" id="@winglang/wingsdk.core.InflightProps"></a>

Options for `Inflight`.

#### Initializer <a name="Initializer" id="@winglang/wingsdk.core.InflightProps.Initializer"></a>

```wing
bring core;

let inflight_props = core.InflightProps{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.core.InflightProps.property.code">code</a></code> | <code>core.Code</code> | Reference to code containing the entrypoint function. |
| <code><a href="#@winglang/wingsdk.core.InflightProps.property.entrypoint">entrypoint</a></code> | <code>str</code> | Name of the exported function to run. |
| <code><a href="#@winglang/wingsdk.core.InflightProps.property.captures">captures</a></code> | <code>MutMap<core.Capture></code> | Capture information. |

---

##### `code`<sup>Required</sup> <a name="code" id="@winglang/wingsdk.core.InflightProps.property.code"></a>

```wing
code: Code;
```

- *Type:* core.Code

Reference to code containing the entrypoint function.

---

##### `entrypoint`<sup>Required</sup> <a name="entrypoint" id="@winglang/wingsdk.core.InflightProps.property.entrypoint"></a>

```wing
entrypoint: str;
```

- *Type:* str

Name of the exported function to run.

---

*Example*

```wing
"exports.handler"
```


##### `captures`<sup>Optional</sup> <a name="captures" id="@winglang/wingsdk.core.InflightProps.property.captures"></a>

```wing
captures: MutMap<Capture>;
```

- *Type:* MutMap<core.Capture>
- *Default:* No captures

Capture information.

During runtime, a map containing all captured values
will be passed as the first argument of the entrypoint function.

Each key here will be the key for the final value in the map.

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
| <code><a href="#@winglang/wingsdk.cloud.QueueOnMessageProps.property.env">env</a></code> | <code>MutMap<str></code> | Environment variables to pass to the function. |
| <code><a href="#@winglang/wingsdk.cloud.QueueOnMessageProps.property.batchSize">batchSize</a></code> | <code>num</code> | The maximum number of messages to send to subscribers at once. |

---

##### `env`<sup>Optional</sup> <a name="env" id="@winglang/wingsdk.cloud.QueueOnMessageProps.property.env"></a>

```wing
env: MutMap<str>;
```

- *Type:* MutMap<str>
- *Default:* No environment variables.

Environment variables to pass to the function.

---

##### `batchSize`<sup>Optional</sup> <a name="batchSize" id="@winglang/wingsdk.cloud.QueueOnMessageProps.property.batchSize"></a>

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
| <code><a href="#@winglang/wingsdk.cloud.QueueProps.property.initialMessages">initialMessages</a></code> | <code>MutArray<str></code> | Initialize the queue with a set of messages. |
| <code><a href="#@winglang/wingsdk.cloud.QueueProps.property.timeout">timeout</a></code> | <code>core.Duration</code> | How long a queue's consumers have to process a message. |

---

##### `initialMessages`<sup>Optional</sup> <a name="initialMessages" id="@winglang/wingsdk.cloud.QueueProps.property.initialMessages"></a>

```wing
initial_messages: MutArray<str>;
```

- *Type:* MutArray<str>
- *Default:* []

Initialize the queue with a set of messages.

---

##### `timeout`<sup>Optional</sup> <a name="timeout" id="@winglang/wingsdk.cloud.QueueProps.property.timeout"></a>

```wing
timeout: Duration;
```

- *Type:* core.Duration
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
| <code><a href="#@winglang/wingsdk.fs.TextFileProps.property.lines">lines</a></code> | <code>MutArray<str></code> | The lines of text that will be serialized into the file during synthesis. |

---

##### `lines`<sup>Optional</sup> <a name="lines" id="@winglang/wingsdk.fs.TextFileProps.property.lines"></a>

```wing
lines: MutArray<str>;
```

- *Type:* MutArray<str>
- *Default:* []

The lines of text that will be serialized into the file during synthesis.

They will be joined with newline characters.

---

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
| <code><a href="#@winglang/wingsdk.core.DependencyVertex.property.inbound">inbound</a></code> | <code>MutArray<core.DependencyVertex></code> | Returns the parents of the vertex (i.e dependants). |
| <code><a href="#@winglang/wingsdk.core.DependencyVertex.property.outbound">outbound</a></code> | <code>MutArray<core.DependencyVertex></code> | Returns the children of the vertex (i.e dependencies). |
| <code><a href="#@winglang/wingsdk.core.DependencyVertex.property.value">value</a></code> | <code>constructs.IConstruct</code> | Returns the IConstruct this graph vertex represents. |

---

##### `inbound`<sup>Required</sup> <a name="inbound" id="@winglang/wingsdk.core.DependencyVertex.property.inbound"></a>

```wing
inbound: MutArray<DependencyVertex>;
```

- *Type:* MutArray<core.DependencyVertex>

Returns the parents of the vertex (i.e dependants).

---

##### `outbound`<sup>Required</sup> <a name="outbound" id="@winglang/wingsdk.core.DependencyVertex.property.outbound"></a>

```wing
outbound: MutArray<DependencyVertex>;
```

- *Type:* MutArray<core.DependencyVertex>

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


### Duration <a name="Duration" id="@winglang/wingsdk.core.Duration"></a>

Represents a length of time.


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.core.Duration.fromHours">from_hours</a></code> | Create a Duration representing an amount of hours. |
| <code><a href="#@winglang/wingsdk.core.Duration.fromMinutes">from_minutes</a></code> | Create a Duration representing an amount of minutes. |
| <code><a href="#@winglang/wingsdk.core.Duration.fromSeconds">from_seconds</a></code> | Create a Duration representing an amount of seconds. |

---

##### `from_hours` <a name="from_hours" id="@winglang/wingsdk.core.Duration.fromHours"></a>

```wing
bring core;

core.Duration.from_hours(amount: num)
```

Create a Duration representing an amount of hours.

###### `amount`<sup>Required</sup> <a name="amount" id="@winglang/wingsdk.core.Duration.fromHours.parameter.amount"></a>

- *Type:* num

the amount of Hours the `Duration` will represent.

---

##### `from_minutes` <a name="from_minutes" id="@winglang/wingsdk.core.Duration.fromMinutes"></a>

```wing
bring core;

core.Duration.from_minutes(amount: num)
```

Create a Duration representing an amount of minutes.

###### `amount`<sup>Required</sup> <a name="amount" id="@winglang/wingsdk.core.Duration.fromMinutes.parameter.amount"></a>

- *Type:* num

the amount of Minutes the `Duration` will represent.

---

##### `from_seconds` <a name="from_seconds" id="@winglang/wingsdk.core.Duration.fromSeconds"></a>

```wing
bring core;

core.Duration.from_seconds(amount: num)
```

Create a Duration representing an amount of seconds.

###### `amount`<sup>Required</sup> <a name="amount" id="@winglang/wingsdk.core.Duration.fromSeconds.parameter.amount"></a>

- *Type:* num

the amount of Seconds the `Duration` will represent.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.core.Duration.property.hours">hours</a></code> | <code>num</code> | Return the total number of hours in this Duration. |
| <code><a href="#@winglang/wingsdk.core.Duration.property.minutes">minutes</a></code> | <code>num</code> | Return the total number of minutes in this Duration. |
| <code><a href="#@winglang/wingsdk.core.Duration.property.seconds">seconds</a></code> | <code>num</code> | Return the total number of seconds in this Duration. |

---

##### `hours`<sup>Required</sup> <a name="hours" id="@winglang/wingsdk.core.Duration.property.hours"></a>

```wing
hours: num;
```

- *Type:* num

Return the total number of hours in this Duration.

---

##### `minutes`<sup>Required</sup> <a name="minutes" id="@winglang/wingsdk.core.Duration.property.minutes"></a>

```wing
minutes: num;
```

- *Type:* num

Return the total number of minutes in this Duration.

---

##### `seconds`<sup>Required</sup> <a name="seconds" id="@winglang/wingsdk.core.Duration.property.seconds"></a>

```wing
seconds: num;
```

- *Type:* num

Return the total number of seconds in this Duration.

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
| <code><a href="#@winglang/wingsdk.core.Files.property.stateFile">stateFile</a></code> | <code>str</code> | The path to a state file which will track all synthesized files. |

---

##### `stateFile`<sup>Optional</sup> <a name="stateFile" id="@winglang/wingsdk.core.Files.property.stateFile"></a>

```wing
state_file: str;
```

- *Type:* str

The path to a state file which will track all synthesized files.

---


### Inflight <a name="Inflight" id="@winglang/wingsdk.core.Inflight"></a>

Represents a unit of application code that can be executed by a cloud resource.

#### Initializers <a name="Initializers" id="@winglang/wingsdk.core.Inflight.Initializer"></a>

```wing
bring core;

new core.Inflight(props: InflightProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.core.Inflight.Initializer.parameter.props">props</a></code> | <code>core.InflightProps</code> | *No description.* |

---

##### `props`<sup>Required</sup> <a name="props" id="@winglang/wingsdk.core.Inflight.Initializer.parameter.props"></a>

- *Type:* core.InflightProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.core.Inflight.bundle">bundle</a></code> | Bundle this inflight process so that it can be used in the given capture scope. |
| <code><a href="#@winglang/wingsdk.core.Inflight.makeClients">make_clients</a></code> | Resolve this inflight's captured objects into a map of clients that be safely referenced at runtime. |

---

##### `bundle` <a name="bundle" id="@winglang/wingsdk.core.Inflight.bundle"></a>

```wing
bundle(options: InflightBundleOptions): Code
```

Bundle this inflight process so that it can be used in the given capture scope.

Returns the path to a JavaScript file that has been rewritten to include
all dependencies and captured values or clients. The file is isolated in
its own directory so that it can be zipped up and uploaded to cloud
providers.

High level implementation:
1. Read the file (let's say its path is path/to/foo.js)
2. Create a new javascript file named path/to/foo.prebundle.js, including a
    map of all capture clients, a new handler that calls the original
    handler with the clients passed in, and a copy of the user's code from
    path/to/foo.js.
3. Use esbuild to bundle all dependencies, outputting the result to
    path/to/foo.js.bundle/index.js.

###### `options`<sup>Required</sup> <a name="options" id="@winglang/wingsdk.core.Inflight.bundle.parameter.options"></a>

- *Type:* core.InflightBundleOptions

---

##### `make_clients` <a name="make_clients" id="@winglang/wingsdk.core.Inflight.makeClients"></a>

```wing
make_clients(captureScope: IConstruct): MutMap<Code>
```

Resolve this inflight's captured objects into a map of clients that be safely referenced at runtime.

###### `captureScope`<sup>Required</sup> <a name="captureScope" id="@winglang/wingsdk.core.Inflight.makeClients.parameter.captureScope"></a>

- *Type:* constructs.IConstruct

---


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.core.Inflight.property.captures">captures</a></code> | <code>MutMap<core.Capture></code> | Capture information. |
| <code><a href="#@winglang/wingsdk.core.Inflight.property.code">code</a></code> | <code>core.Code</code> | Reference to code containing the entrypoint function. |
| <code><a href="#@winglang/wingsdk.core.Inflight.property.entrypoint">entrypoint</a></code> | <code>str</code> | Name of the exported function which will be run. |

---

##### `captures`<sup>Required</sup> <a name="captures" id="@winglang/wingsdk.core.Inflight.property.captures"></a>

```wing
captures: MutMap<Capture>;
```

- *Type:* MutMap<core.Capture>

Capture information.

During runtime, a map containing all captured values
will be passed as the first argument of the entrypoint function.

Each key here will be the key for the final value in the map.

---

##### `code`<sup>Required</sup> <a name="code" id="@winglang/wingsdk.core.Inflight.property.code"></a>

```wing
code: Code;
```

- *Type:* core.Code

Reference to code containing the entrypoint function.

---

##### `entrypoint`<sup>Required</sup> <a name="entrypoint" id="@winglang/wingsdk.core.Inflight.property.entrypoint"></a>

```wing
entrypoint: str;
```

- *Type:* str

Name of the exported function which will be run.

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

core.InflightClient.for(filename: str, clientClass: str, args: MutArray<str>)
```

Creates a `Code` instance with code for creating an inflight client.

###### `filename`<sup>Required</sup> <a name="filename" id="@winglang/wingsdk.core.InflightClient.for.parameter.filename"></a>

- *Type:* str

---

###### `clientClass`<sup>Required</sup> <a name="clientClass" id="@winglang/wingsdk.core.InflightClient.for.parameter.clientClass"></a>

- *Type:* str

---

###### `args`<sup>Required</sup> <a name="args" id="@winglang/wingsdk.core.InflightClient.for.parameter.args"></a>

- *Type:* MutArray<str>

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

##### `text`<sup>Required</sup> <a name="text" id="@winglang/wingsdk.core.NodeJsCode.property.text"></a>

```wing
text: str;
```

- *Type:* str

The code contents.

---


### Testing <a name="Testing" id="@winglang/wingsdk.core.Testing"></a>

Testing utilities.

#### Initializers <a name="Initializers" id="@winglang/wingsdk.core.Testing.Initializer"></a>

```wing
bring core;

new core.Testing()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/wingsdk.core.Testing.inspectPrebundledCode">inspect_prebundled_code</a></code> | Obtain a reference to the prebundled Code for a given capture scope. |

---

##### `inspect_prebundled_code` <a name="inspect_prebundled_code" id="@winglang/wingsdk.core.Testing.inspectPrebundledCode"></a>

```wing
bring core;

core.Testing.inspect_prebundled_code(captureScope: IConstruct)
```

Obtain a reference to the prebundled Code for a given capture scope.

###### `captureScope`<sup>Required</sup> <a name="captureScope" id="@winglang/wingsdk.core.Testing.inspectPrebundledCode.parameter.captureScope"></a>

- *Type:* constructs.IConstruct

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
| <code><a href="#@winglang/wingsdk.cloud.IBucketClient.get">get</a></code> | Retrieve an object from the bucket. |
| <code><a href="#@winglang/wingsdk.cloud.IBucketClient.list">list</a></code> | Retrieve existing objects keys from the bucket. |
| <code><a href="#@winglang/wingsdk.cloud.IBucketClient.put">put</a></code> | Put an object in the bucket. |

---

##### `get` <a name="get" id="@winglang/wingsdk.cloud.IBucketClient.get"></a>

```wing
get(key: str): str
```

Retrieve an object from the bucket.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/wingsdk.cloud.IBucketClient.get.parameter.key"></a>

- *Type:* str

---

##### `list` <a name="list" id="@winglang/wingsdk.cloud.IBucketClient.list"></a>

```wing
list(prefix?: str): MutArray<str>
```

Retrieve existing objects keys from the bucket.

###### `prefix`<sup>Optional</sup> <a name="prefix" id="@winglang/wingsdk.cloud.IBucketClient.list.parameter.prefix"></a>

- *Type:* str

Limits the response to keys that begin with the specified prefix.

---

##### `put` <a name="put" id="@winglang/wingsdk.cloud.IBucketClient.put"></a>

```wing
put(key: str, body: str): void
```

Put an object in the bucket.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/wingsdk.cloud.IBucketClient.put.parameter.key"></a>

- *Type:* str

---

###### `body`<sup>Required</sup> <a name="body" id="@winglang/wingsdk.cloud.IBucketClient.put.parameter.body"></a>

- *Type:* str

---


### ICapturable <a name="ICapturable" id="@winglang/wingsdk.core.ICapturable"></a>

- *Implemented By:* cloud.Bucket, cloud.BucketBase, cloud.Counter, cloud.CounterBase, cloud.Function, cloud.FunctionBase, cloud.Logger, cloud.LoggerBase, cloud.Queue, cloud.QueueBase, cloud.Resource, sim.Bucket, sim.Counter, sim.Function, sim.Logger, sim.Queue, tfaws.Bucket, tfaws.Counter, tfaws.Function, tfaws.Queue, core.ICapturable, core.ICapturableConstruct

Represents something that is capturable by an Inflight.



### ICapturableConstruct <a name="ICapturableConstruct" id="@winglang/wingsdk.core.ICapturableConstruct"></a>

- *Extends:* core.ICapturable, constructs.IConstruct

- *Implemented By:* core.ICapturableConstruct

Represents a construct that is capturable by an Inflight.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/wingsdk.core.ICapturableConstruct.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/wingsdk.core.ICapturableConstruct.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

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

Invoke the function asynchronously with a given payload.

###### `payload`<sup>Required</sup> <a name="payload" id="@winglang/wingsdk.cloud.IFunctionClient.invoke.parameter.payload"></a>

- *Type:* str

---


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

Push a message to the queue.

###### `message`<sup>Required</sup> <a name="message" id="@winglang/wingsdk.cloud.IQueueClient.push.parameter.message"></a>

- *Type:* str

Payload to send to the queue.

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

