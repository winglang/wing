---
title: API Reference
id: sdk
description: Wing SDK API Reference
keywords: [Wing sdk, sdk, Wing API Reference]
---

# API Reference <a name="API Reference" id="api-reference"></a>

## Resources <a name="Resources" id="Resources"></a>

### Api <a name="Api" id="@winglang/sdk.cloud.Api"></a>

Functionality shared between all `Api` implementations.

#### Initializers <a name="Initializers" id="@winglang/sdk.cloud.Api.Initializer"></a>

```wing
bring cloud;

new cloud.Api(props?: ApiProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Api.Initializer.parameter.props">props</a></code> | <code><a href="#@winglang/sdk.cloud.ApiProps">ApiProps</a></code> | *No description.* |

---

##### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Api.Initializer.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.cloud.ApiProps">ApiProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.Api.connect">connect</a></code> | Add a inflight handler to the api for CONNECT requests on the given path. |
| <code><a href="#@winglang/sdk.cloud.Api.delete">delete</a></code> | Add a inflight handler to the api for DELETE requests on the given path. |
| <code><a href="#@winglang/sdk.cloud.Api.get">get</a></code> | Add a inflight handler to the api for GET requests on the given path. |
| <code><a href="#@winglang/sdk.cloud.Api.head">head</a></code> | Add a inflight handler to the api for HEAD requests on the given path. |
| <code><a href="#@winglang/sdk.cloud.Api.options">options</a></code> | Add a inflight handler to the api for OPTIONS requests on the given path. |
| <code><a href="#@winglang/sdk.cloud.Api.patch">patch</a></code> | Add a inflight handler to the api for PATCH requests on the given path. |
| <code><a href="#@winglang/sdk.cloud.Api.post">post</a></code> | Add a inflight handler to the api for POST requests on the given path. |
| <code><a href="#@winglang/sdk.cloud.Api.put">put</a></code> | Add a inflight handler to the api for PUT requests on the given path. |

---

##### `connect` <a name="connect" id="@winglang/sdk.cloud.Api.connect"></a>

```wing
connect(path: str, inflight: IApiEndpointHandler, props?: ApiConnectProps): void
```

Add a inflight handler to the api for CONNECT requests on the given path.

###### `path`<sup>Required</sup> <a name="path" id="@winglang/sdk.cloud.Api.connect.parameter.path"></a>

- *Type:* str

The path to handle CONNECT requests for.

---

###### `inflight`<sup>Required</sup> <a name="inflight" id="@winglang/sdk.cloud.Api.connect.parameter.inflight"></a>

- *Type:* <a href="#@winglang/sdk.cloud.IApiEndpointHandler">IApiEndpointHandler</a>

The function to handle the request.

---

###### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Api.connect.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.cloud.ApiConnectProps">ApiConnectProps</a>

Options for the route.

---

##### `delete` <a name="delete" id="@winglang/sdk.cloud.Api.delete"></a>

```wing
delete(path: str, inflight: IApiEndpointHandler, props?: ApiDeleteProps): void
```

Add a inflight handler to the api for DELETE requests on the given path.

###### `path`<sup>Required</sup> <a name="path" id="@winglang/sdk.cloud.Api.delete.parameter.path"></a>

- *Type:* str

The path to handle DELETE requests for.

---

###### `inflight`<sup>Required</sup> <a name="inflight" id="@winglang/sdk.cloud.Api.delete.parameter.inflight"></a>

- *Type:* <a href="#@winglang/sdk.cloud.IApiEndpointHandler">IApiEndpointHandler</a>

The function to handle the request.

---

###### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Api.delete.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.cloud.ApiDeleteProps">ApiDeleteProps</a>

Options for the route.

---

##### `get` <a name="get" id="@winglang/sdk.cloud.Api.get"></a>

```wing
get(path: str, inflight: IApiEndpointHandler, props?: ApiGetProps): void
```

Add a inflight handler to the api for GET requests on the given path.

###### `path`<sup>Required</sup> <a name="path" id="@winglang/sdk.cloud.Api.get.parameter.path"></a>

- *Type:* str

The path to handle GET requests for.

---

###### `inflight`<sup>Required</sup> <a name="inflight" id="@winglang/sdk.cloud.Api.get.parameter.inflight"></a>

- *Type:* <a href="#@winglang/sdk.cloud.IApiEndpointHandler">IApiEndpointHandler</a>

The function to handle the request.

---

###### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Api.get.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.cloud.ApiGetProps">ApiGetProps</a>

Options for the route.

---

##### `head` <a name="head" id="@winglang/sdk.cloud.Api.head"></a>

```wing
head(path: str, inflight: IApiEndpointHandler, props?: ApiHeadProps): void
```

Add a inflight handler to the api for HEAD requests on the given path.

###### `path`<sup>Required</sup> <a name="path" id="@winglang/sdk.cloud.Api.head.parameter.path"></a>

- *Type:* str

The path to handle HEAD requests for.

---

###### `inflight`<sup>Required</sup> <a name="inflight" id="@winglang/sdk.cloud.Api.head.parameter.inflight"></a>

- *Type:* <a href="#@winglang/sdk.cloud.IApiEndpointHandler">IApiEndpointHandler</a>

The function to handle the request.

---

###### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Api.head.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.cloud.ApiHeadProps">ApiHeadProps</a>

Options for the route.

---

##### `options` <a name="options" id="@winglang/sdk.cloud.Api.options"></a>

```wing
options(path: str, inflight: IApiEndpointHandler, props?: ApiOptionsProps): void
```

Add a inflight handler to the api for OPTIONS requests on the given path.

###### `path`<sup>Required</sup> <a name="path" id="@winglang/sdk.cloud.Api.options.parameter.path"></a>

- *Type:* str

The path to handle OPTIONS requests for.

---

###### `inflight`<sup>Required</sup> <a name="inflight" id="@winglang/sdk.cloud.Api.options.parameter.inflight"></a>

- *Type:* <a href="#@winglang/sdk.cloud.IApiEndpointHandler">IApiEndpointHandler</a>

The function to handle the request.

---

###### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Api.options.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.cloud.ApiOptionsProps">ApiOptionsProps</a>

Options for the route.

---

##### `patch` <a name="patch" id="@winglang/sdk.cloud.Api.patch"></a>

```wing
patch(path: str, inflight: IApiEndpointHandler, props?: ApiPatchProps): void
```

Add a inflight handler to the api for PATCH requests on the given path.

###### `path`<sup>Required</sup> <a name="path" id="@winglang/sdk.cloud.Api.patch.parameter.path"></a>

- *Type:* str

The path to handle PATCH requests for.

---

###### `inflight`<sup>Required</sup> <a name="inflight" id="@winglang/sdk.cloud.Api.patch.parameter.inflight"></a>

- *Type:* <a href="#@winglang/sdk.cloud.IApiEndpointHandler">IApiEndpointHandler</a>

The function to handle the request.

---

###### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Api.patch.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.cloud.ApiPatchProps">ApiPatchProps</a>

Options for the route.

---

##### `post` <a name="post" id="@winglang/sdk.cloud.Api.post"></a>

```wing
post(path: str, inflight: IApiEndpointHandler, props?: ApiPostProps): void
```

Add a inflight handler to the api for POST requests on the given path.

###### `path`<sup>Required</sup> <a name="path" id="@winglang/sdk.cloud.Api.post.parameter.path"></a>

- *Type:* str

The path to handle POST requests for.

---

###### `inflight`<sup>Required</sup> <a name="inflight" id="@winglang/sdk.cloud.Api.post.parameter.inflight"></a>

- *Type:* <a href="#@winglang/sdk.cloud.IApiEndpointHandler">IApiEndpointHandler</a>

The function to handle the request.

---

###### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Api.post.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.cloud.ApiPostProps">ApiPostProps</a>

Options for the route.

---

##### `put` <a name="put" id="@winglang/sdk.cloud.Api.put"></a>

```wing
put(path: str, inflight: IApiEndpointHandler, props?: ApiPutProps): void
```

Add a inflight handler to the api for PUT requests on the given path.

###### `path`<sup>Required</sup> <a name="path" id="@winglang/sdk.cloud.Api.put.parameter.path"></a>

- *Type:* str

The path to handle PUT requests for.

---

###### `inflight`<sup>Required</sup> <a name="inflight" id="@winglang/sdk.cloud.Api.put.parameter.inflight"></a>

- *Type:* <a href="#@winglang/sdk.cloud.IApiEndpointHandler">IApiEndpointHandler</a>

The function to handle the request.

---

###### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Api.put.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.cloud.ApiPutProps">ApiPutProps</a>

Options for the route.

---


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Api.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.cloud.Api.property.display">display</a></code> | <code><a href="#@winglang/sdk.std.Display">Display</a></code> | Information on how to display a resource in the UI. |
| <code><a href="#@winglang/sdk.cloud.Api.property.url">url</a></code> | <code>str</code> | The base URL of the API endpoint. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.cloud.Api.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `display`<sup>Required</sup> <a name="display" id="@winglang/sdk.cloud.Api.property.display"></a>

```wing
display: Display;
```

- *Type:* <a href="#@winglang/sdk.std.Display">Display</a>

Information on how to display a resource in the UI.

---

##### `url`<sup>Required</sup> <a name="url" id="@winglang/sdk.cloud.Api.property.url"></a>

```wing
url: str;
```

- *Type:* str

The base URL of the API endpoint.

---


### Bucket <a name="Bucket" id="@winglang/sdk.cloud.Bucket"></a>

**Inflight client:** [@winglang/sdk.cloud.IBucketClient](#@winglang/sdk.cloud.IBucketClient)

Represents a cloud object store.

#### Initializers <a name="Initializers" id="@winglang/sdk.cloud.Bucket.Initializer"></a>

```wing
bring cloud;

new cloud.Bucket(props?: BucketProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Bucket.Initializer.parameter.props">props</a></code> | <code><a href="#@winglang/sdk.cloud.BucketProps">BucketProps</a></code> | *No description.* |

---

##### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Bucket.Initializer.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.cloud.BucketProps">BucketProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.Bucket.addObject">addObject</a></code> | Add a file to the bucket that is uploaded when the app is deployed. |
| <code><a href="#@winglang/sdk.cloud.Bucket.onCreate">onCreate</a></code> | Run an inflight whenever a file is uploaded to the bucket. |
| <code><a href="#@winglang/sdk.cloud.Bucket.onDelete">onDelete</a></code> | Run an inflight whenever a file is deleted from the bucket. |
| <code><a href="#@winglang/sdk.cloud.Bucket.onEvent">onEvent</a></code> | Run an inflight whenever a file is uploaded, modified, or deleted from the bucket. |
| <code><a href="#@winglang/sdk.cloud.Bucket.onUpdate">onUpdate</a></code> | Run an inflight whenever a file is updated in the bucket. |

---

##### `addObject` <a name="addObject" id="@winglang/sdk.cloud.Bucket.addObject"></a>

```wing
addObject(key: str, body: str): void
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

##### `onCreate` <a name="onCreate" id="@winglang/sdk.cloud.Bucket.onCreate"></a>

```wing
onCreate(fn: IBucketEventHandler, opts?: BucketOnCreateProps): void
```

Run an inflight whenever a file is uploaded to the bucket.

###### `fn`<sup>Required</sup> <a name="fn" id="@winglang/sdk.cloud.Bucket.onCreate.parameter.fn"></a>

- *Type:* <a href="#@winglang/sdk.cloud.IBucketEventHandler">IBucketEventHandler</a>

---

###### `opts`<sup>Optional</sup> <a name="opts" id="@winglang/sdk.cloud.Bucket.onCreate.parameter.opts"></a>

- *Type:* <a href="#@winglang/sdk.cloud.BucketOnCreateProps">BucketOnCreateProps</a>

---

##### `onDelete` <a name="onDelete" id="@winglang/sdk.cloud.Bucket.onDelete"></a>

```wing
onDelete(fn: IBucketEventHandler, opts?: BucketOnDeleteProps): void
```

Run an inflight whenever a file is deleted from the bucket.

###### `fn`<sup>Required</sup> <a name="fn" id="@winglang/sdk.cloud.Bucket.onDelete.parameter.fn"></a>

- *Type:* <a href="#@winglang/sdk.cloud.IBucketEventHandler">IBucketEventHandler</a>

---

###### `opts`<sup>Optional</sup> <a name="opts" id="@winglang/sdk.cloud.Bucket.onDelete.parameter.opts"></a>

- *Type:* <a href="#@winglang/sdk.cloud.BucketOnDeleteProps">BucketOnDeleteProps</a>

---

##### `onEvent` <a name="onEvent" id="@winglang/sdk.cloud.Bucket.onEvent"></a>

```wing
onEvent(fn: IBucketEventHandler, opts?: BucketOnEventProps): void
```

Run an inflight whenever a file is uploaded, modified, or deleted from the bucket.

###### `fn`<sup>Required</sup> <a name="fn" id="@winglang/sdk.cloud.Bucket.onEvent.parameter.fn"></a>

- *Type:* <a href="#@winglang/sdk.cloud.IBucketEventHandler">IBucketEventHandler</a>

---

###### `opts`<sup>Optional</sup> <a name="opts" id="@winglang/sdk.cloud.Bucket.onEvent.parameter.opts"></a>

- *Type:* <a href="#@winglang/sdk.cloud.BucketOnEventProps">BucketOnEventProps</a>

---

##### `onUpdate` <a name="onUpdate" id="@winglang/sdk.cloud.Bucket.onUpdate"></a>

```wing
onUpdate(fn: IBucketEventHandler, opts?: BucketOnUpdateProps): void
```

Run an inflight whenever a file is updated in the bucket.

###### `fn`<sup>Required</sup> <a name="fn" id="@winglang/sdk.cloud.Bucket.onUpdate.parameter.fn"></a>

- *Type:* <a href="#@winglang/sdk.cloud.IBucketEventHandler">IBucketEventHandler</a>

---

###### `opts`<sup>Optional</sup> <a name="opts" id="@winglang/sdk.cloud.Bucket.onUpdate.parameter.opts"></a>

- *Type:* <a href="#@winglang/sdk.cloud.BucketOnUpdateProps">BucketOnUpdateProps</a>

---


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Bucket.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.cloud.Bucket.property.display">display</a></code> | <code><a href="#@winglang/sdk.std.Display">Display</a></code> | Information on how to display a resource in the UI. |

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

- *Type:* <a href="#@winglang/sdk.std.Display">Display</a>

Information on how to display a resource in the UI.

---


### Counter <a name="Counter" id="@winglang/sdk.cloud.Counter"></a>

**Inflight client:** [@winglang/sdk.cloud.ICounterClient](#@winglang/sdk.cloud.ICounterClient)

Represents a distributed atomic counter.

#### Initializers <a name="Initializers" id="@winglang/sdk.cloud.Counter.Initializer"></a>

```wing
bring cloud;

new cloud.Counter(props?: CounterProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Counter.Initializer.parameter.props">props</a></code> | <code><a href="#@winglang/sdk.cloud.CounterProps">CounterProps</a></code> | *No description.* |

---

##### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Counter.Initializer.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.cloud.CounterProps">CounterProps</a>

---



#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Counter.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.cloud.Counter.property.display">display</a></code> | <code><a href="#@winglang/sdk.std.Display">Display</a></code> | Information on how to display a resource in the UI. |
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

- *Type:* <a href="#@winglang/sdk.std.Display">Display</a>

Information on how to display a resource in the UI.

---

##### `initial`<sup>Required</sup> <a name="initial" id="@winglang/sdk.cloud.Counter.property.initial"></a>

```wing
initial: num;
```

- *Type:* num

The initial value of the counter.

---


### Function <a name="Function" id="@winglang/sdk.cloud.Function"></a>

- *Implements:* <a href="#@winglang/sdk.std.IInflightHost">IInflightHost</a>

**Inflight client:** [@winglang/sdk.cloud.IFunctionClient](#@winglang/sdk.cloud.IFunctionClient)

Represents a function.

#### Initializers <a name="Initializers" id="@winglang/sdk.cloud.Function.Initializer"></a>

```wing
bring cloud;

new cloud.Function(inflight: IFunctionHandler, props?: FunctionProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Function.Initializer.parameter.inflight">inflight</a></code> | <code><a href="#@winglang/sdk.cloud.IFunctionHandler">IFunctionHandler</a></code> | *No description.* |
| <code><a href="#@winglang/sdk.cloud.Function.Initializer.parameter.props">props</a></code> | <code><a href="#@winglang/sdk.cloud.FunctionProps">FunctionProps</a></code> | *No description.* |

---

##### `inflight`<sup>Required</sup> <a name="inflight" id="@winglang/sdk.cloud.Function.Initializer.parameter.inflight"></a>

- *Type:* <a href="#@winglang/sdk.cloud.IFunctionHandler">IFunctionHandler</a>

---

##### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Function.Initializer.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.cloud.FunctionProps">FunctionProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.Function.addEnvironment">addEnvironment</a></code> | Add an environment variable to the function. |

---

##### `addEnvironment` <a name="addEnvironment" id="@winglang/sdk.cloud.Function.addEnvironment"></a>

```wing
addEnvironment(name: str, value: str, updateIfExists?: bool): void
```

Add an environment variable to the function.

###### `name`<sup>Required</sup> <a name="name" id="@winglang/sdk.cloud.Function.addEnvironment.parameter.name"></a>

- *Type:* str

---

###### `value`<sup>Required</sup> <a name="value" id="@winglang/sdk.cloud.Function.addEnvironment.parameter.value"></a>

- *Type:* str

---

###### `updateIfExists`<sup>Optional</sup> <a name="updateIfExists" id="@winglang/sdk.cloud.Function.addEnvironment.parameter.updateIfExists"></a>

- *Type:* bool

Whether to update the environment value if it exists.

When false, updating an existing environment will throw an error.

---


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Function.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.cloud.Function.property.display">display</a></code> | <code><a href="#@winglang/sdk.std.Display">Display</a></code> | Information on how to display a resource in the UI. |
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

- *Type:* <a href="#@winglang/sdk.std.Display">Display</a>

Information on how to display a resource in the UI.

---

##### `env`<sup>Required</sup> <a name="env" id="@winglang/sdk.cloud.Function.property.env"></a>

```wing
env: MutMap<str>;
```

- *Type:* MutMap&lt;str&gt;

Returns the set of environment variables for this function.

---


### Queue <a name="Queue" id="@winglang/sdk.cloud.Queue"></a>

**Inflight client:** [@winglang/sdk.cloud.IQueueClient](#@winglang/sdk.cloud.IQueueClient)

Represents a queue.

#### Initializers <a name="Initializers" id="@winglang/sdk.cloud.Queue.Initializer"></a>

```wing
bring cloud;

new cloud.Queue(props?: QueueProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Queue.Initializer.parameter.props">props</a></code> | <code><a href="#@winglang/sdk.cloud.QueueProps">QueueProps</a></code> | *No description.* |

---

##### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Queue.Initializer.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.cloud.QueueProps">QueueProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.Queue.addConsumer">addConsumer</a></code> | Create a function to consume messages from this queue. |

---

##### `addConsumer` <a name="addConsumer" id="@winglang/sdk.cloud.Queue.addConsumer"></a>

```wing
addConsumer(handler: IQueueAddConsumerHandler, props?: QueueAddConsumerProps): Function
```

Create a function to consume messages from this queue.

###### `handler`<sup>Required</sup> <a name="handler" id="@winglang/sdk.cloud.Queue.addConsumer.parameter.handler"></a>

- *Type:* <a href="#@winglang/sdk.cloud.IQueueAddConsumerHandler">IQueueAddConsumerHandler</a>

---

###### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Queue.addConsumer.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.cloud.QueueAddConsumerProps">QueueAddConsumerProps</a>

---


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Queue.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.cloud.Queue.property.display">display</a></code> | <code><a href="#@winglang/sdk.std.Display">Display</a></code> | Information on how to display a resource in the UI. |

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

- *Type:* <a href="#@winglang/sdk.std.Display">Display</a>

Information on how to display a resource in the UI.

---


### Resource <a name="Resource" id="@winglang/sdk.std.Resource"></a>

- *Implements:* <a href="#@winglang/sdk.std.IResource">IResource</a>

Shared behavior between all Wing SDK resources.

#### Initializers <a name="Initializers" id="@winglang/sdk.std.Resource.Initializer"></a>

```wing
bring std;

new std.Resource()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---



#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.std.Resource.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.std.Resource.property.display">display</a></code> | <code><a href="#@winglang/sdk.std.Display">Display</a></code> | Information on how to display a resource in the UI. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.std.Resource.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `display`<sup>Required</sup> <a name="display" id="@winglang/sdk.std.Resource.property.display"></a>

```wing
display: Display;
```

- *Type:* <a href="#@winglang/sdk.std.Display">Display</a>

Information on how to display a resource in the UI.

---


### Schedule <a name="Schedule" id="@winglang/sdk.cloud.Schedule"></a>

**Inflight client:** [@winglang/sdk.cloud.IScheduleClient](#@winglang/sdk.cloud.IScheduleClient)

Represents a schedule.

#### Initializers <a name="Initializers" id="@winglang/sdk.cloud.Schedule.Initializer"></a>

```wing
bring cloud;

new cloud.Schedule(props?: ScheduleProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Schedule.Initializer.parameter.props">props</a></code> | <code><a href="#@winglang/sdk.cloud.ScheduleProps">ScheduleProps</a></code> | *No description.* |

---

##### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Schedule.Initializer.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.cloud.ScheduleProps">ScheduleProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.Schedule.onTick">onTick</a></code> | Create a function that runs when receiving the scheduled event. |

---

##### `onTick` <a name="onTick" id="@winglang/sdk.cloud.Schedule.onTick"></a>

```wing
onTick(inflight: IScheduleOnTickHandler, props?: ScheduleOnTickProps): Function
```

Create a function that runs when receiving the scheduled event.

###### `inflight`<sup>Required</sup> <a name="inflight" id="@winglang/sdk.cloud.Schedule.onTick.parameter.inflight"></a>

- *Type:* <a href="#@winglang/sdk.cloud.IScheduleOnTickHandler">IScheduleOnTickHandler</a>

---

###### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Schedule.onTick.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.cloud.ScheduleOnTickProps">ScheduleOnTickProps</a>

---


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Schedule.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.cloud.Schedule.property.display">display</a></code> | <code><a href="#@winglang/sdk.std.Display">Display</a></code> | Information on how to display a resource in the UI. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.cloud.Schedule.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `display`<sup>Required</sup> <a name="display" id="@winglang/sdk.cloud.Schedule.property.display"></a>

```wing
display: Display;
```

- *Type:* <a href="#@winglang/sdk.std.Display">Display</a>

Information on how to display a resource in the UI.

---


### Secret <a name="Secret" id="@winglang/sdk.cloud.Secret"></a>

**Inflight client:** [@winglang/sdk.cloud.ISecretClient](#@winglang/sdk.cloud.ISecretClient)

Represents a cloud secret.

#### Initializers <a name="Initializers" id="@winglang/sdk.cloud.Secret.Initializer"></a>

```wing
bring cloud;

new cloud.Secret(props?: SecretProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Secret.Initializer.parameter.props">props</a></code> | <code><a href="#@winglang/sdk.cloud.SecretProps">SecretProps</a></code> | *No description.* |

---

##### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Secret.Initializer.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.cloud.SecretProps">SecretProps</a>

---



#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Secret.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.cloud.Secret.property.display">display</a></code> | <code><a href="#@winglang/sdk.std.Display">Display</a></code> | Information on how to display a resource in the UI. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.cloud.Secret.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `display`<sup>Required</sup> <a name="display" id="@winglang/sdk.cloud.Secret.property.display"></a>

```wing
display: Display;
```

- *Type:* <a href="#@winglang/sdk.std.Display">Display</a>

Information on how to display a resource in the UI.

---


### Service <a name="Service" id="@winglang/sdk.cloud.Service"></a>

**Inflight client:** [@winglang/sdk.cloud.IServiceClient](#@winglang/sdk.cloud.IServiceClient)

Represents a service.

#### Initializers <a name="Initializers" id="@winglang/sdk.cloud.Service.Initializer"></a>

```wing
bring cloud;

new cloud.Service(props: ServiceProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Service.Initializer.parameter.props">props</a></code> | <code><a href="#@winglang/sdk.cloud.ServiceProps">ServiceProps</a></code> | *No description.* |

---

##### `props`<sup>Required</sup> <a name="props" id="@winglang/sdk.cloud.Service.Initializer.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.cloud.ServiceProps">ServiceProps</a>

---



#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Service.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.cloud.Service.property.display">display</a></code> | <code><a href="#@winglang/sdk.std.Display">Display</a></code> | Information on how to display a resource in the UI. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.cloud.Service.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `display`<sup>Required</sup> <a name="display" id="@winglang/sdk.cloud.Service.property.display"></a>

```wing
display: Display;
```

- *Type:* <a href="#@winglang/sdk.std.Display">Display</a>

Information on how to display a resource in the UI.

---


### Table <a name="Table" id="@winglang/sdk.cloud.Table"></a>

**Inflight client:** [@winglang/sdk.cloud.ITableClient](#@winglang/sdk.cloud.ITableClient)

Represents a NoSQL database table that can be used to store and query data.

#### Initializers <a name="Initializers" id="@winglang/sdk.cloud.Table.Initializer"></a>

```wing
bring cloud;

new cloud.Table(props: TableProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Table.Initializer.parameter.props">props</a></code> | <code><a href="#@winglang/sdk.cloud.TableProps">TableProps</a></code> | *No description.* |

---

##### `props`<sup>Required</sup> <a name="props" id="@winglang/sdk.cloud.Table.Initializer.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.cloud.TableProps">TableProps</a>

---



#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Table.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.cloud.Table.property.display">display</a></code> | <code><a href="#@winglang/sdk.std.Display">Display</a></code> | Information on how to display a resource in the UI. |
| <code><a href="#@winglang/sdk.cloud.Table.property.columns">columns</a></code> | <code>MutMap&lt;<a href="#@winglang/sdk.cloud.ColumnType">ColumnType</a>&gt;</code> | Table columns. |
| <code><a href="#@winglang/sdk.cloud.Table.property.name">name</a></code> | <code>str</code> | Table name. |
| <code><a href="#@winglang/sdk.cloud.Table.property.primaryKey">primaryKey</a></code> | <code>str</code> | Table primary key name. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.cloud.Table.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `display`<sup>Required</sup> <a name="display" id="@winglang/sdk.cloud.Table.property.display"></a>

```wing
display: Display;
```

- *Type:* <a href="#@winglang/sdk.std.Display">Display</a>

Information on how to display a resource in the UI.

---

##### `columns`<sup>Required</sup> <a name="columns" id="@winglang/sdk.cloud.Table.property.columns"></a>

```wing
columns: MutMap<ColumnType>;
```

- *Type:* MutMap&lt;<a href="#@winglang/sdk.cloud.ColumnType">ColumnType</a>&gt;

Table columns.

---

##### `name`<sup>Required</sup> <a name="name" id="@winglang/sdk.cloud.Table.property.name"></a>

```wing
name: str;
```

- *Type:* str

Table name.

---

##### `primaryKey`<sup>Required</sup> <a name="primaryKey" id="@winglang/sdk.cloud.Table.property.primaryKey"></a>

```wing
primaryKey: str;
```

- *Type:* str

Table primary key name.

---


### Test <a name="Test" id="@winglang/sdk.std.Test"></a>

- *Implements:* <a href="#@winglang/sdk.std.IInflightHost">IInflightHost</a>

**Inflight client:** [@winglang/sdk.cloud.ITestClient](#@winglang/sdk.cloud.ITestClient)

Represents a unit test.

#### Initializers <a name="Initializers" id="@winglang/sdk.std.Test.Initializer"></a>

```wing
bring std;

new std.Test(inflight: ITestHandler, props?: TestProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.std.Test.Initializer.parameter.inflight">inflight</a></code> | <code><a href="#@winglang/sdk.std.ITestHandler">ITestHandler</a></code> | *No description.* |
| <code><a href="#@winglang/sdk.std.Test.Initializer.parameter.props">props</a></code> | <code><a href="#@winglang/sdk.std.TestProps">TestProps</a></code> | *No description.* |

---

##### `inflight`<sup>Required</sup> <a name="inflight" id="@winglang/sdk.std.Test.Initializer.parameter.inflight"></a>

- *Type:* <a href="#@winglang/sdk.std.ITestHandler">ITestHandler</a>

---

##### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.std.Test.Initializer.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.std.TestProps">TestProps</a>

---



#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.std.Test.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.std.Test.property.display">display</a></code> | <code><a href="#@winglang/sdk.std.Display">Display</a></code> | Information on how to display a resource in the UI. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.std.Test.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `display`<sup>Required</sup> <a name="display" id="@winglang/sdk.std.Test.property.display"></a>

```wing
display: Display;
```

- *Type:* <a href="#@winglang/sdk.std.Display">Display</a>

Information on how to display a resource in the UI.

---


### TestRunner <a name="TestRunner" id="@winglang/sdk.cloud.TestRunner"></a>

**Inflight client:** [@winglang/sdk.cloud.ITestRunnerClient](#@winglang/sdk.cloud.ITestRunnerClient)

Represents a test engine.

#### Initializers <a name="Initializers" id="@winglang/sdk.cloud.TestRunner.Initializer"></a>

```wing
bring cloud;

new cloud.TestRunner(props?: TestRunnerProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.TestRunner.Initializer.parameter.props">props</a></code> | <code><a href="#@winglang/sdk.cloud.TestRunnerProps">TestRunnerProps</a></code> | *No description.* |

---

##### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.TestRunner.Initializer.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.cloud.TestRunnerProps">TestRunnerProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.TestRunner.findTests">findTests</a></code> | Find all tests in the construct tree. |

---

##### `findTests` <a name="findTests" id="@winglang/sdk.cloud.TestRunner.findTests"></a>

```wing
findTests(): MutArray<Test>
```

Find all tests in the construct tree.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.TestRunner.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.cloud.TestRunner.property.display">display</a></code> | <code><a href="#@winglang/sdk.std.Display">Display</a></code> | Information on how to display a resource in the UI. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.cloud.TestRunner.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `display`<sup>Required</sup> <a name="display" id="@winglang/sdk.cloud.TestRunner.property.display"></a>

```wing
display: Display;
```

- *Type:* <a href="#@winglang/sdk.std.Display">Display</a>

Information on how to display a resource in the UI.

---


### Topic <a name="Topic" id="@winglang/sdk.cloud.Topic"></a>

**Inflight client:** [@winglang/sdk.cloud.ITopicClient](#@winglang/sdk.cloud.ITopicClient)

Represents a topic.

#### Initializers <a name="Initializers" id="@winglang/sdk.cloud.Topic.Initializer"></a>

```wing
bring cloud;

new cloud.Topic(props?: TopicProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Topic.Initializer.parameter.props">props</a></code> | <code><a href="#@winglang/sdk.cloud.TopicProps">TopicProps</a></code> | *No description.* |

---

##### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Topic.Initializer.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.cloud.TopicProps">TopicProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.Topic.onMessage">onMessage</a></code> | Run an inflight whenever an message is published to the topic. |

---

##### `onMessage` <a name="onMessage" id="@winglang/sdk.cloud.Topic.onMessage"></a>

```wing
onMessage(inflight: ITopicOnMessageHandler, props?: TopicOnMessageProps): Function
```

Run an inflight whenever an message is published to the topic.

###### `inflight`<sup>Required</sup> <a name="inflight" id="@winglang/sdk.cloud.Topic.onMessage.parameter.inflight"></a>

- *Type:* <a href="#@winglang/sdk.cloud.ITopicOnMessageHandler">ITopicOnMessageHandler</a>

---

###### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Topic.onMessage.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.cloud.TopicOnMessageProps">TopicOnMessageProps</a>

---


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Topic.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.cloud.Topic.property.display">display</a></code> | <code><a href="#@winglang/sdk.std.Display">Display</a></code> | Information on how to display a resource in the UI. |

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

- *Type:* <a href="#@winglang/sdk.std.Display">Display</a>

Information on how to display a resource in the UI.

---


### Website <a name="Website" id="@winglang/sdk.cloud.Website"></a>

**Inflight client:** [@winglang/sdk.cloud.IWebsiteClient](#@winglang/sdk.cloud.IWebsiteClient)

Represents a cloud static website.

#### Initializers <a name="Initializers" id="@winglang/sdk.cloud.Website.Initializer"></a>

```wing
bring cloud;

new cloud.Website(props: WebsiteProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Website.Initializer.parameter.props">props</a></code> | <code><a href="#@winglang/sdk.cloud.WebsiteProps">WebsiteProps</a></code> | *No description.* |

---

##### `props`<sup>Required</sup> <a name="props" id="@winglang/sdk.cloud.Website.Initializer.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.cloud.WebsiteProps">WebsiteProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.Website.addJson">addJson</a></code> | Add a JSON file with custom values during the website's deployment. |

---

##### `addJson` <a name="addJson" id="@winglang/sdk.cloud.Website.addJson"></a>

```wing
addJson(path: str, data: Json): str
```

Add a JSON file with custom values during the website's deployment.

If the path conflicts with file path from the website's static assets, an error will be thrown.

###### `path`<sup>Required</sup> <a name="path" id="@winglang/sdk.cloud.Website.addJson.parameter.path"></a>

- *Type:* str

the file path it will be uploaded as.

---

###### `data`<sup>Required</sup> <a name="data" id="@winglang/sdk.cloud.Website.addJson.parameter.data"></a>

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

the data to write to the file.

---


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Website.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.cloud.Website.property.display">display</a></code> | <code><a href="#@winglang/sdk.std.Display">Display</a></code> | Information on how to display a resource in the UI. |
| <code><a href="#@winglang/sdk.cloud.Website.property.path">path</a></code> | <code>str</code> | Absolute local path to the website's static files. |
| <code><a href="#@winglang/sdk.cloud.Website.property.url">url</a></code> | <code>str</code> | The website's url. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.cloud.Website.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `display`<sup>Required</sup> <a name="display" id="@winglang/sdk.cloud.Website.property.display"></a>

```wing
display: Display;
```

- *Type:* <a href="#@winglang/sdk.std.Display">Display</a>

Information on how to display a resource in the UI.

---

##### `path`<sup>Required</sup> <a name="path" id="@winglang/sdk.cloud.Website.property.path"></a>

```wing
path: str;
```

- *Type:* str

Absolute local path to the website's static files.

---

##### `url`<sup>Required</sup> <a name="url" id="@winglang/sdk.cloud.Website.property.url"></a>

```wing
url: str;
```

- *Type:* str

The website's url.

---


## Structs <a name="Structs" id="Structs"></a>

### AddConnectionProps <a name="AddConnectionProps" id="@winglang/sdk.std.AddConnectionProps"></a>

Props for `Resource.addConnection`.

#### Initializer <a name="Initializer" id="@winglang/sdk.std.AddConnectionProps.Initializer"></a>

```wing
bring std;

let AddConnectionProps = std.AddConnectionProps{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.std.AddConnectionProps.property.from">from</a></code> | <code><a href="#@winglang/sdk.std.IResource">IResource</a></code> | The resource creating the connection to `to`. |
| <code><a href="#@winglang/sdk.std.AddConnectionProps.property.relationship">relationship</a></code> | <code>str</code> | The type of relationship between the resources. |
| <code><a href="#@winglang/sdk.std.AddConnectionProps.property.to">to</a></code> | <code><a href="#@winglang/sdk.std.IResource">IResource</a></code> | The resource `from` is connecting to. |
| <code><a href="#@winglang/sdk.std.AddConnectionProps.property.implicit">implicit</a></code> | <code>bool</code> | Whether the relationship is implicit, i.e. it is not explicitly defined by the user. |

---

##### `from`<sup>Required</sup> <a name="from" id="@winglang/sdk.std.AddConnectionProps.property.from"></a>

```wing
from: IResource;
```

- *Type:* <a href="#@winglang/sdk.std.IResource">IResource</a>

The resource creating the connection to `to`.

---

##### `relationship`<sup>Required</sup> <a name="relationship" id="@winglang/sdk.std.AddConnectionProps.property.relationship"></a>

```wing
relationship: str;
```

- *Type:* str

The type of relationship between the resources.

---

##### `to`<sup>Required</sup> <a name="to" id="@winglang/sdk.std.AddConnectionProps.property.to"></a>

```wing
to: IResource;
```

- *Type:* <a href="#@winglang/sdk.std.IResource">IResource</a>

The resource `from` is connecting to.

---

##### `implicit`<sup>Optional</sup> <a name="implicit" id="@winglang/sdk.std.AddConnectionProps.property.implicit"></a>

```wing
implicit: bool;
```

- *Type:* bool
- *Default:* false

Whether the relationship is implicit, i.e. it is not explicitly defined by the user.

---

### ApiConnectProps <a name="ApiConnectProps" id="@winglang/sdk.cloud.ApiConnectProps"></a>

Options for Api patch endpoint.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.ApiConnectProps.Initializer"></a>

```wing
bring cloud;

let ApiConnectProps = cloud.ApiConnectProps{ ... }
```


### ApiDeleteProps <a name="ApiDeleteProps" id="@winglang/sdk.cloud.ApiDeleteProps"></a>

Options for Api put endpoint.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.ApiDeleteProps.Initializer"></a>

```wing
bring cloud;

let ApiDeleteProps = cloud.ApiDeleteProps{ ... }
```


### ApiGetProps <a name="ApiGetProps" id="@winglang/sdk.cloud.ApiGetProps"></a>

Options for Api get endpoint.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.ApiGetProps.Initializer"></a>

```wing
bring cloud;

let ApiGetProps = cloud.ApiGetProps{ ... }
```


### ApiHeadProps <a name="ApiHeadProps" id="@winglang/sdk.cloud.ApiHeadProps"></a>

Options for Api patch endpoint.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.ApiHeadProps.Initializer"></a>

```wing
bring cloud;

let ApiHeadProps = cloud.ApiHeadProps{ ... }
```


### ApiOptionsProps <a name="ApiOptionsProps" id="@winglang/sdk.cloud.ApiOptionsProps"></a>

Options for Api patch endpoint.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.ApiOptionsProps.Initializer"></a>

```wing
bring cloud;

let ApiOptionsProps = cloud.ApiOptionsProps{ ... }
```


### ApiPatchProps <a name="ApiPatchProps" id="@winglang/sdk.cloud.ApiPatchProps"></a>

Options for Api patch endpoint.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.ApiPatchProps.Initializer"></a>

```wing
bring cloud;

let ApiPatchProps = cloud.ApiPatchProps{ ... }
```


### ApiPostProps <a name="ApiPostProps" id="@winglang/sdk.cloud.ApiPostProps"></a>

Options for Api post endpoint.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.ApiPostProps.Initializer"></a>

```wing
bring cloud;

let ApiPostProps = cloud.ApiPostProps{ ... }
```


### ApiProps <a name="ApiProps" id="@winglang/sdk.cloud.ApiProps"></a>

Properties for `Api`.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.ApiProps.Initializer"></a>

```wing
bring cloud;

let ApiProps = cloud.ApiProps{ ... }
```


### ApiPutProps <a name="ApiPutProps" id="@winglang/sdk.cloud.ApiPutProps"></a>

Options for Api put endpoint.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.ApiPutProps.Initializer"></a>

```wing
bring cloud;

let ApiPutProps = cloud.ApiPutProps{ ... }
```


### ApiRequest <a name="ApiRequest" id="@winglang/sdk.cloud.ApiRequest"></a>

Shape of a request to an inflight handler.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.ApiRequest.Initializer"></a>

```wing
bring cloud;

let ApiRequest = cloud.ApiRequest{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.ApiRequest.property.method">method</a></code> | <code><a href="#@winglang/sdk.cloud.HttpMethod">HttpMethod</a></code> | The request's HTTP method. |
| <code><a href="#@winglang/sdk.cloud.ApiRequest.property.path">path</a></code> | <code>str</code> | The request's path. |
| <code><a href="#@winglang/sdk.cloud.ApiRequest.property.query">query</a></code> | <code>MutMap&lt;str&gt;</code> | The request's query string values. |
| <code><a href="#@winglang/sdk.cloud.ApiRequest.property.vars">vars</a></code> | <code>MutMap&lt;str&gt;</code> | The path variables. |
| <code><a href="#@winglang/sdk.cloud.ApiRequest.property.body">body</a></code> | <code>json</code> | The request's body. |
| <code><a href="#@winglang/sdk.cloud.ApiRequest.property.headers">headers</a></code> | <code>MutMap&lt;str&gt;</code> | The request's headers. |

---

##### `method`<sup>Required</sup> <a name="method" id="@winglang/sdk.cloud.ApiRequest.property.method"></a>

```wing
method: HttpMethod;
```

- *Type:* <a href="#@winglang/sdk.cloud.HttpMethod">HttpMethod</a>

The request's HTTP method.

---

##### `path`<sup>Required</sup> <a name="path" id="@winglang/sdk.cloud.ApiRequest.property.path"></a>

```wing
path: str;
```

- *Type:* str

The request's path.

---

##### `query`<sup>Required</sup> <a name="query" id="@winglang/sdk.cloud.ApiRequest.property.query"></a>

```wing
query: MutMap<str>;
```

- *Type:* MutMap&lt;str&gt;

The request's query string values.

---

##### `vars`<sup>Required</sup> <a name="vars" id="@winglang/sdk.cloud.ApiRequest.property.vars"></a>

```wing
vars: MutMap<str>;
```

- *Type:* MutMap&lt;str&gt;

The path variables.

---

##### `body`<sup>Optional</sup> <a name="body" id="@winglang/sdk.cloud.ApiRequest.property.body"></a>

```wing
body: json;
```

- *Type:* json

The request's body.

---

##### `headers`<sup>Optional</sup> <a name="headers" id="@winglang/sdk.cloud.ApiRequest.property.headers"></a>

```wing
headers: MutMap<str>;
```

- *Type:* MutMap&lt;str&gt;

The request's headers.

---

### ApiResponse <a name="ApiResponse" id="@winglang/sdk.cloud.ApiResponse"></a>

Shape of a response from a inflight handler.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.ApiResponse.Initializer"></a>

```wing
bring cloud;

let ApiResponse = cloud.ApiResponse{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.ApiResponse.property.status">status</a></code> | <code>num</code> | The response's status code. |
| <code><a href="#@winglang/sdk.cloud.ApiResponse.property.body">body</a></code> | <code>json</code> | The response's body. |
| <code><a href="#@winglang/sdk.cloud.ApiResponse.property.headers">headers</a></code> | <code>MutMap&lt;str&gt;</code> | The response's headers. |

---

##### `status`<sup>Required</sup> <a name="status" id="@winglang/sdk.cloud.ApiResponse.property.status"></a>

```wing
status: num;
```

- *Type:* num

The response's status code.

---

##### `body`<sup>Optional</sup> <a name="body" id="@winglang/sdk.cloud.ApiResponse.property.body"></a>

```wing
body: json;
```

- *Type:* json

The response's body.

---

##### `headers`<sup>Optional</sup> <a name="headers" id="@winglang/sdk.cloud.ApiResponse.property.headers"></a>

```wing
headers: MutMap<str>;
```

- *Type:* MutMap&lt;str&gt;

The response's headers.

---

### BucketDeleteOptions <a name="BucketDeleteOptions" id="@winglang/sdk.cloud.BucketDeleteOptions"></a>

Interface for delete method inside `Bucket`.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.BucketDeleteOptions.Initializer"></a>

```wing
bring cloud;

let BucketDeleteOptions = cloud.BucketDeleteOptions{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.BucketDeleteOptions.property.mustExist">mustExist</a></code> | <code>bool</code> | Check failures on the method and retrieve errors if any. |

---

##### `mustExist`<sup>Optional</sup> <a name="mustExist" id="@winglang/sdk.cloud.BucketDeleteOptions.property.mustExist"></a>

```wing
mustExist: bool;
```

- *Type:* bool
- *Default:* false

Check failures on the method and retrieve errors if any.

---

### BucketEvent <a name="BucketEvent" id="@winglang/sdk.cloud.BucketEvent"></a>

on_event notification payload- will be in use after solving issue: https://github.com/winglang/wing/issues/1927.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.BucketEvent.Initializer"></a>

```wing
bring cloud;

let BucketEvent = cloud.BucketEvent{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.BucketEvent.property.key">key</a></code> | <code>str</code> | the bucket key that triggered the event. |
| <code><a href="#@winglang/sdk.cloud.BucketEvent.property.type">type</a></code> | <code><a href="#@winglang/sdk.cloud.BucketEventType">BucketEventType</a></code> | type of event. |

---

##### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.cloud.BucketEvent.property.key"></a>

```wing
key: str;
```

- *Type:* str

the bucket key that triggered the event.

---

##### `type`<sup>Required</sup> <a name="type" id="@winglang/sdk.cloud.BucketEvent.property.type"></a>

```wing
type: BucketEventType;
```

- *Type:* <a href="#@winglang/sdk.cloud.BucketEventType">BucketEventType</a>

type of event.

---

### BucketOnCreateProps <a name="BucketOnCreateProps" id="@winglang/sdk.cloud.BucketOnCreateProps"></a>

on create event options.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.BucketOnCreateProps.Initializer"></a>

```wing
bring cloud;

let BucketOnCreateProps = cloud.BucketOnCreateProps{ ... }
```


### BucketOnDeleteProps <a name="BucketOnDeleteProps" id="@winglang/sdk.cloud.BucketOnDeleteProps"></a>

on delete event options.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.BucketOnDeleteProps.Initializer"></a>

```wing
bring cloud;

let BucketOnDeleteProps = cloud.BucketOnDeleteProps{ ... }
```


### BucketOnEventProps <a name="BucketOnEventProps" id="@winglang/sdk.cloud.BucketOnEventProps"></a>

on any event options.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.BucketOnEventProps.Initializer"></a>

```wing
bring cloud;

let BucketOnEventProps = cloud.BucketOnEventProps{ ... }
```


### BucketOnUpdateProps <a name="BucketOnUpdateProps" id="@winglang/sdk.cloud.BucketOnUpdateProps"></a>

on update event options.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.BucketOnUpdateProps.Initializer"></a>

```wing
bring cloud;

let BucketOnUpdateProps = cloud.BucketOnUpdateProps{ ... }
```


### BucketProps <a name="BucketProps" id="@winglang/sdk.cloud.BucketProps"></a>

Properties for `Bucket`.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.BucketProps.Initializer"></a>

```wing
bring cloud;

let BucketProps = cloud.BucketProps{ ... }
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

### Connection <a name="Connection" id="@winglang/sdk.std.Connection"></a>

A connection between two resources.

#### Initializer <a name="Initializer" id="@winglang/sdk.std.Connection.Initializer"></a>

```wing
bring std;

let Connection = std.Connection{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.std.Connection.property.direction">direction</a></code> | <code><a href="#@winglang/sdk.std.Direction">Direction</a></code> | The direction of the connection. |
| <code><a href="#@winglang/sdk.std.Connection.property.implicit">implicit</a></code> | <code>bool</code> | Whether the relationship is implicit, i.e. it is not explicitly defined by the user. |
| <code><a href="#@winglang/sdk.std.Connection.property.relationship">relationship</a></code> | <code>str</code> | The type of relationship with the resource. |
| <code><a href="#@winglang/sdk.std.Connection.property.resource">resource</a></code> | <code><a href="#@winglang/sdk.std.IResource">IResource</a></code> | The resource this connection is to. |

---

##### `direction`<sup>Required</sup> <a name="direction" id="@winglang/sdk.std.Connection.property.direction"></a>

```wing
direction: Direction;
```

- *Type:* <a href="#@winglang/sdk.std.Direction">Direction</a>

The direction of the connection.

---

##### `implicit`<sup>Required</sup> <a name="implicit" id="@winglang/sdk.std.Connection.property.implicit"></a>

```wing
implicit: bool;
```

- *Type:* bool

Whether the relationship is implicit, i.e. it is not explicitly defined by the user.

---

##### `relationship`<sup>Required</sup> <a name="relationship" id="@winglang/sdk.std.Connection.property.relationship"></a>

```wing
relationship: str;
```

- *Type:* str

The type of relationship with the resource.

---

##### `resource`<sup>Required</sup> <a name="resource" id="@winglang/sdk.std.Connection.property.resource"></a>

```wing
resource: IResource;
```

- *Type:* <a href="#@winglang/sdk.std.IResource">IResource</a>

The resource this connection is to.

---

### CounterProps <a name="CounterProps" id="@winglang/sdk.cloud.CounterProps"></a>

Properties for `Counter`.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.CounterProps.Initializer"></a>

```wing
bring cloud;

let CounterProps = cloud.CounterProps{ ... }
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

### DisplayProps <a name="DisplayProps" id="@winglang/sdk.std.DisplayProps"></a>

Properties for the Display class.

#### Initializer <a name="Initializer" id="@winglang/sdk.std.DisplayProps.Initializer"></a>

```wing
bring std;

let DisplayProps = std.DisplayProps{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.std.DisplayProps.property.description">description</a></code> | <code>str</code> | Description of the resource. |
| <code><a href="#@winglang/sdk.std.DisplayProps.property.hidden">hidden</a></code> | <code>bool</code> | Whether the resource should be hidden from the UI. |
| <code><a href="#@winglang/sdk.std.DisplayProps.property.title">title</a></code> | <code>str</code> | Title of the resource. |

---

##### `description`<sup>Optional</sup> <a name="description" id="@winglang/sdk.std.DisplayProps.property.description"></a>

```wing
description: str;
```

- *Type:* str
- *Default:* No description.

Description of the resource.

---

##### `hidden`<sup>Optional</sup> <a name="hidden" id="@winglang/sdk.std.DisplayProps.property.hidden"></a>

```wing
hidden: bool;
```

- *Type:* bool
- *Default:* Undefined

Whether the resource should be hidden from the UI.

---

##### `title`<sup>Optional</sup> <a name="title" id="@winglang/sdk.std.DisplayProps.property.title"></a>

```wing
title: str;
```

- *Type:* str
- *Default:* No title.

Title of the resource.

---

### FunctionProps <a name="FunctionProps" id="@winglang/sdk.cloud.FunctionProps"></a>

Properties for `Function`.

This is the type users see when constructing a cloud.Function instance.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.FunctionProps.Initializer"></a>

```wing
bring cloud;

let FunctionProps = cloud.FunctionProps{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.FunctionProps.property.env">env</a></code> | <code>MutMap&lt;str&gt;</code> | Environment variables to pass to the function. |
| <code><a href="#@winglang/sdk.cloud.FunctionProps.property.memory">memory</a></code> | <code>num</code> | The amount of memory to allocate to the function, in MB. |
| <code><a href="#@winglang/sdk.cloud.FunctionProps.property.timeout">timeout</a></code> | <code><a href="#@winglang/sdk.std.Duration">Duration</a></code> | The maximum amount of time the function can run. |

---

##### `env`<sup>Optional</sup> <a name="env" id="@winglang/sdk.cloud.FunctionProps.property.env"></a>

```wing
env: MutMap<str>;
```

- *Type:* MutMap&lt;str&gt;
- *Default:* No environment variables.

Environment variables to pass to the function.

---

##### `memory`<sup>Optional</sup> <a name="memory" id="@winglang/sdk.cloud.FunctionProps.property.memory"></a>

```wing
memory: num;
```

- *Type:* num
- *Default:* 128

The amount of memory to allocate to the function, in MB.

---

##### `timeout`<sup>Optional</sup> <a name="timeout" id="@winglang/sdk.cloud.FunctionProps.property.timeout"></a>

```wing
timeout: Duration;
```

- *Type:* <a href="#@winglang/sdk.std.Duration">Duration</a>
- *Default:* 1m

The maximum amount of time the function can run.

---

### GetSecretValueOptions <a name="GetSecretValueOptions" id="@winglang/sdk.cloud.GetSecretValueOptions"></a>

Options when getting a secret value.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.GetSecretValueOptions.Initializer"></a>

```wing
bring cloud;

let GetSecretValueOptions = cloud.GetSecretValueOptions{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.GetSecretValueOptions.property.cache">cache</a></code> | <code>bool</code> | Whether to cache the value. |

---

##### `cache`<sup>Optional</sup> <a name="cache" id="@winglang/sdk.cloud.GetSecretValueOptions.property.cache"></a>

```wing
cache: bool;
```

- *Type:* bool
- *Default:* true

Whether to cache the value.

---

### QueueAddConsumerProps <a name="QueueAddConsumerProps" id="@winglang/sdk.cloud.QueueAddConsumerProps"></a>

Options for Queue.addConsumer.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.QueueAddConsumerProps.Initializer"></a>

```wing
bring cloud;

let QueueAddConsumerProps = cloud.QueueAddConsumerProps{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.QueueAddConsumerProps.property.env">env</a></code> | <code>MutMap&lt;str&gt;</code> | Environment variables to pass to the function. |
| <code><a href="#@winglang/sdk.cloud.QueueAddConsumerProps.property.memory">memory</a></code> | <code>num</code> | The amount of memory to allocate to the function, in MB. |
| <code><a href="#@winglang/sdk.cloud.QueueAddConsumerProps.property.timeout">timeout</a></code> | <code><a href="#@winglang/sdk.std.Duration">Duration</a></code> | The maximum amount of time the function can run. |
| <code><a href="#@winglang/sdk.cloud.QueueAddConsumerProps.property.batchSize">batchSize</a></code> | <code>num</code> | The maximum number of messages to send to subscribers at once. |

---

##### `env`<sup>Optional</sup> <a name="env" id="@winglang/sdk.cloud.QueueAddConsumerProps.property.env"></a>

```wing
env: MutMap<str>;
```

- *Type:* MutMap&lt;str&gt;
- *Default:* No environment variables.

Environment variables to pass to the function.

---

##### `memory`<sup>Optional</sup> <a name="memory" id="@winglang/sdk.cloud.QueueAddConsumerProps.property.memory"></a>

```wing
memory: num;
```

- *Type:* num
- *Default:* 128

The amount of memory to allocate to the function, in MB.

---

##### `timeout`<sup>Optional</sup> <a name="timeout" id="@winglang/sdk.cloud.QueueAddConsumerProps.property.timeout"></a>

```wing
timeout: Duration;
```

- *Type:* <a href="#@winglang/sdk.std.Duration">Duration</a>
- *Default:* 1m

The maximum amount of time the function can run.

---

##### `batchSize`<sup>Optional</sup> <a name="batchSize" id="@winglang/sdk.cloud.QueueAddConsumerProps.property.batchSize"></a>

```wing
batchSize: num;
```

- *Type:* num
- *Default:* 1

The maximum number of messages to send to subscribers at once.

---

### QueueProps <a name="QueueProps" id="@winglang/sdk.cloud.QueueProps"></a>

Properties for `Queue`.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.QueueProps.Initializer"></a>

```wing
bring cloud;

let QueueProps = cloud.QueueProps{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.QueueProps.property.initialMessages">initialMessages</a></code> | <code>MutArray&lt;str&gt;</code> | Initialize the queue with a set of messages. |
| <code><a href="#@winglang/sdk.cloud.QueueProps.property.retentionPeriod">retentionPeriod</a></code> | <code><a href="#@winglang/sdk.std.Duration">Duration</a></code> | How long a queue retains a message. |
| <code><a href="#@winglang/sdk.cloud.QueueProps.property.timeout">timeout</a></code> | <code><a href="#@winglang/sdk.std.Duration">Duration</a></code> | How long a queue's consumers have to process a message. |

---

##### `initialMessages`<sup>Optional</sup> <a name="initialMessages" id="@winglang/sdk.cloud.QueueProps.property.initialMessages"></a>

```wing
initialMessages: MutArray<str>;
```

- *Type:* MutArray&lt;str&gt;
- *Default:* []

Initialize the queue with a set of messages.

---

##### `retentionPeriod`<sup>Optional</sup> <a name="retentionPeriod" id="@winglang/sdk.cloud.QueueProps.property.retentionPeriod"></a>

```wing
retentionPeriod: Duration;
```

- *Type:* <a href="#@winglang/sdk.std.Duration">Duration</a>
- *Default:* undefined

How long a queue retains a message.

---

##### `timeout`<sup>Optional</sup> <a name="timeout" id="@winglang/sdk.cloud.QueueProps.property.timeout"></a>

```wing
timeout: Duration;
```

- *Type:* <a href="#@winglang/sdk.std.Duration">Duration</a>
- *Default:* undefined

How long a queue's consumers have to process a message.

---

### ScheduleOnTickProps <a name="ScheduleOnTickProps" id="@winglang/sdk.cloud.ScheduleOnTickProps"></a>

Options for Schedule.onTick.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.ScheduleOnTickProps.Initializer"></a>

```wing
bring cloud;

let ScheduleOnTickProps = cloud.ScheduleOnTickProps{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.ScheduleOnTickProps.property.env">env</a></code> | <code>MutMap&lt;str&gt;</code> | Environment variables to pass to the function. |
| <code><a href="#@winglang/sdk.cloud.ScheduleOnTickProps.property.memory">memory</a></code> | <code>num</code> | The amount of memory to allocate to the function, in MB. |
| <code><a href="#@winglang/sdk.cloud.ScheduleOnTickProps.property.timeout">timeout</a></code> | <code><a href="#@winglang/sdk.std.Duration">Duration</a></code> | The maximum amount of time the function can run. |

---

##### `env`<sup>Optional</sup> <a name="env" id="@winglang/sdk.cloud.ScheduleOnTickProps.property.env"></a>

```wing
env: MutMap<str>;
```

- *Type:* MutMap&lt;str&gt;
- *Default:* No environment variables.

Environment variables to pass to the function.

---

##### `memory`<sup>Optional</sup> <a name="memory" id="@winglang/sdk.cloud.ScheduleOnTickProps.property.memory"></a>

```wing
memory: num;
```

- *Type:* num
- *Default:* 128

The amount of memory to allocate to the function, in MB.

---

##### `timeout`<sup>Optional</sup> <a name="timeout" id="@winglang/sdk.cloud.ScheduleOnTickProps.property.timeout"></a>

```wing
timeout: Duration;
```

- *Type:* <a href="#@winglang/sdk.std.Duration">Duration</a>
- *Default:* 1m

The maximum amount of time the function can run.

---

### ScheduleProps <a name="ScheduleProps" id="@winglang/sdk.cloud.ScheduleProps"></a>

Properties for `Schedule`.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.ScheduleProps.Initializer"></a>

```wing
bring cloud;

let ScheduleProps = cloud.ScheduleProps{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.ScheduleProps.property.cron">cron</a></code> | <code>str</code> | Trigger events according to a cron schedule using the UNIX cron format. |
| <code><a href="#@winglang/sdk.cloud.ScheduleProps.property.rate">rate</a></code> | <code><a href="#@winglang/sdk.std.Duration">Duration</a></code> | Trigger events at a periodic rate. |

---

##### `cron`<sup>Optional</sup> <a name="cron" id="@winglang/sdk.cloud.ScheduleProps.property.cron"></a>

```wing
cron: str;
```

- *Type:* str
- *Default:* undefined

Trigger events according to a cron schedule using the UNIX cron format.

[minute] [hour] [day of month] [month] [day of week]

---

*Example*

```wing
"0/1 * ? * *"
```


##### `rate`<sup>Optional</sup> <a name="rate" id="@winglang/sdk.cloud.ScheduleProps.property.rate"></a>

```wing
rate: Duration;
```

- *Type:* <a href="#@winglang/sdk.std.Duration">Duration</a>
- *Default:* undefined

Trigger events at a periodic rate.

---

*Example*

```wing
1m
```


### SecretProps <a name="SecretProps" id="@winglang/sdk.cloud.SecretProps"></a>

Properties for `Secret`.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.SecretProps.Initializer"></a>

```wing
bring cloud;

let SecretProps = cloud.SecretProps{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.SecretProps.property.name">name</a></code> | <code>str</code> | The secret's name. |

---

##### `name`<sup>Optional</sup> <a name="name" id="@winglang/sdk.cloud.SecretProps.property.name"></a>

```wing
name: str;
```

- *Type:* str
- *Default:* a new secret is provisioned with a generated name

The secret's name.

If no name is provided then a new secret is provisioned in the target.
If a name is provided then the resource will reference an existing
secret in the target.

---

### ServiceOnStartProps <a name="ServiceOnStartProps" id="@winglang/sdk.cloud.ServiceOnStartProps"></a>

Options for Service.onStart.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.ServiceOnStartProps.Initializer"></a>

```wing
bring cloud;

let ServiceOnStartProps = cloud.ServiceOnStartProps{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.ServiceOnStartProps.property.env">env</a></code> | <code>MutMap&lt;str&gt;</code> | Environment variables to pass to the function. |
| <code><a href="#@winglang/sdk.cloud.ServiceOnStartProps.property.memory">memory</a></code> | <code>num</code> | The amount of memory to allocate to the function, in MB. |
| <code><a href="#@winglang/sdk.cloud.ServiceOnStartProps.property.timeout">timeout</a></code> | <code><a href="#@winglang/sdk.std.Duration">Duration</a></code> | The maximum amount of time the function can run. |

---

##### `env`<sup>Optional</sup> <a name="env" id="@winglang/sdk.cloud.ServiceOnStartProps.property.env"></a>

```wing
env: MutMap<str>;
```

- *Type:* MutMap&lt;str&gt;
- *Default:* No environment variables.

Environment variables to pass to the function.

---

##### `memory`<sup>Optional</sup> <a name="memory" id="@winglang/sdk.cloud.ServiceOnStartProps.property.memory"></a>

```wing
memory: num;
```

- *Type:* num
- *Default:* 128

The amount of memory to allocate to the function, in MB.

---

##### `timeout`<sup>Optional</sup> <a name="timeout" id="@winglang/sdk.cloud.ServiceOnStartProps.property.timeout"></a>

```wing
timeout: Duration;
```

- *Type:* <a href="#@winglang/sdk.std.Duration">Duration</a>
- *Default:* 1m

The maximum amount of time the function can run.

---

### ServiceProps <a name="ServiceProps" id="@winglang/sdk.cloud.ServiceProps"></a>

Properties for `Service`.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.ServiceProps.Initializer"></a>

```wing
bring cloud;

let ServiceProps = cloud.ServiceProps{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.ServiceProps.property.onStart">onStart</a></code> | <code><a href="#@winglang/sdk.cloud.IServiceOnEventHandler">IServiceOnEventHandler</a></code> | Handler to run with the service starts. |
| <code><a href="#@winglang/sdk.cloud.ServiceProps.property.autoStart">autoStart</a></code> | <code>bool</code> | Whether the service should start automatically. |
| <code><a href="#@winglang/sdk.cloud.ServiceProps.property.onStop">onStop</a></code> | <code><a href="#@winglang/sdk.cloud.IServiceOnEventHandler">IServiceOnEventHandler</a></code> | Handler to run with the service stops. |

---

##### `onStart`<sup>Required</sup> <a name="onStart" id="@winglang/sdk.cloud.ServiceProps.property.onStart"></a>

```wing
onStart: IServiceOnEventHandler;
```

- *Type:* <a href="#@winglang/sdk.cloud.IServiceOnEventHandler">IServiceOnEventHandler</a>

Handler to run with the service starts.

---

##### `autoStart`<sup>Optional</sup> <a name="autoStart" id="@winglang/sdk.cloud.ServiceProps.property.autoStart"></a>

```wing
autoStart: bool;
```

- *Type:* bool
- *Default:* true

Whether the service should start automatically.

---

##### `onStop`<sup>Optional</sup> <a name="onStop" id="@winglang/sdk.cloud.ServiceProps.property.onStop"></a>

```wing
onStop: IServiceOnEventHandler;
```

- *Type:* <a href="#@winglang/sdk.cloud.IServiceOnEventHandler">IServiceOnEventHandler</a>
- *Default:* no special activity at shutdown

Handler to run with the service stops.

---

### TableProps <a name="TableProps" id="@winglang/sdk.cloud.TableProps"></a>

Properties for `Table`.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.TableProps.Initializer"></a>

```wing
bring cloud;

let TableProps = cloud.TableProps{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.TableProps.property.columns">columns</a></code> | <code>MutMap&lt;<a href="#@winglang/sdk.cloud.ColumnType">ColumnType</a>&gt;</code> | The table's columns. |
| <code><a href="#@winglang/sdk.cloud.TableProps.property.name">name</a></code> | <code>str</code> | The table's name. |
| <code><a href="#@winglang/sdk.cloud.TableProps.property.primaryKey">primaryKey</a></code> | <code>str</code> | The table's primary key. |

---

##### `columns`<sup>Optional</sup> <a name="columns" id="@winglang/sdk.cloud.TableProps.property.columns"></a>

```wing
columns: MutMap<ColumnType>;
```

- *Type:* MutMap&lt;<a href="#@winglang/sdk.cloud.ColumnType">ColumnType</a>&gt;
- *Default:* undefined

The table's columns.

---

##### `name`<sup>Optional</sup> <a name="name" id="@winglang/sdk.cloud.TableProps.property.name"></a>

```wing
name: str;
```

- *Type:* str
- *Default:* undefined

The table's name.

---

##### `primaryKey`<sup>Optional</sup> <a name="primaryKey" id="@winglang/sdk.cloud.TableProps.property.primaryKey"></a>

```wing
primaryKey: str;
```

- *Type:* str
- *Default:* undefined

The table's primary key.

No two rows can have the same value for the
primary key.

---

### TestProps <a name="TestProps" id="@winglang/sdk.std.TestProps"></a>

Properties for `Test`.

This is the type users see when constructing a std.Test instance.

#### Initializer <a name="Initializer" id="@winglang/sdk.std.TestProps.Initializer"></a>

```wing
bring std;

let TestProps = std.TestProps{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.std.TestProps.property.env">env</a></code> | <code>MutMap&lt;str&gt;</code> | Environment variables to pass to the function. |
| <code><a href="#@winglang/sdk.std.TestProps.property.memory">memory</a></code> | <code>num</code> | The amount of memory to allocate to the function, in MB. |
| <code><a href="#@winglang/sdk.std.TestProps.property.timeout">timeout</a></code> | <code><a href="#@winglang/sdk.std.Duration">Duration</a></code> | The maximum amount of time the function can run. |

---

##### `env`<sup>Optional</sup> <a name="env" id="@winglang/sdk.std.TestProps.property.env"></a>

```wing
env: MutMap<str>;
```

- *Type:* MutMap&lt;str&gt;
- *Default:* No environment variables.

Environment variables to pass to the function.

---

##### `memory`<sup>Optional</sup> <a name="memory" id="@winglang/sdk.std.TestProps.property.memory"></a>

```wing
memory: num;
```

- *Type:* num
- *Default:* 128

The amount of memory to allocate to the function, in MB.

---

##### `timeout`<sup>Optional</sup> <a name="timeout" id="@winglang/sdk.std.TestProps.property.timeout"></a>

```wing
timeout: Duration;
```

- *Type:* <a href="#@winglang/sdk.std.Duration">Duration</a>
- *Default:* 1m

The maximum amount of time the function can run.

---

### TestResult <a name="TestResult" id="@winglang/sdk.cloud.TestResult"></a>

A result of a single test.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.TestResult.Initializer"></a>

```wing
bring cloud;

let TestResult = cloud.TestResult{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.TestResult.property.pass">pass</a></code> | <code>bool</code> | Whether the test passed. |
| <code><a href="#@winglang/sdk.cloud.TestResult.property.path">path</a></code> | <code>str</code> | The path of the test. |
| <code><a href="#@winglang/sdk.cloud.TestResult.property.traces">traces</a></code> | <code>MutArray&lt;<a href="#@winglang/sdk.cloud.Trace">Trace</a>&gt;</code> | List of traces emitted during the test. |
| <code><a href="#@winglang/sdk.cloud.TestResult.property.error">error</a></code> | <code>str</code> | The error message if the test failed. |

---

##### `pass`<sup>Required</sup> <a name="pass" id="@winglang/sdk.cloud.TestResult.property.pass"></a>

```wing
pass: bool;
```

- *Type:* bool

Whether the test passed.

---

##### `path`<sup>Required</sup> <a name="path" id="@winglang/sdk.cloud.TestResult.property.path"></a>

```wing
path: str;
```

- *Type:* str

The path of the test.

---

##### `traces`<sup>Required</sup> <a name="traces" id="@winglang/sdk.cloud.TestResult.property.traces"></a>

```wing
traces: MutArray<Trace>;
```

- *Type:* MutArray&lt;<a href="#@winglang/sdk.cloud.Trace">Trace</a>&gt;

List of traces emitted during the test.

---

##### `error`<sup>Optional</sup> <a name="error" id="@winglang/sdk.cloud.TestResult.property.error"></a>

```wing
error: str;
```

- *Type:* str

The error message if the test failed.

---

### TestRunnerProps <a name="TestRunnerProps" id="@winglang/sdk.cloud.TestRunnerProps"></a>

Properties for `TestRunner`.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.TestRunnerProps.Initializer"></a>

```wing
bring cloud;

let TestRunnerProps = cloud.TestRunnerProps{ ... }
```


### TopicOnMessageProps <a name="TopicOnMessageProps" id="@winglang/sdk.cloud.TopicOnMessageProps"></a>

Options for `Topic.onMessage`.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.TopicOnMessageProps.Initializer"></a>

```wing
bring cloud;

let TopicOnMessageProps = cloud.TopicOnMessageProps{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.TopicOnMessageProps.property.env">env</a></code> | <code>MutMap&lt;str&gt;</code> | Environment variables to pass to the function. |
| <code><a href="#@winglang/sdk.cloud.TopicOnMessageProps.property.memory">memory</a></code> | <code>num</code> | The amount of memory to allocate to the function, in MB. |
| <code><a href="#@winglang/sdk.cloud.TopicOnMessageProps.property.timeout">timeout</a></code> | <code><a href="#@winglang/sdk.std.Duration">Duration</a></code> | The maximum amount of time the function can run. |

---

##### `env`<sup>Optional</sup> <a name="env" id="@winglang/sdk.cloud.TopicOnMessageProps.property.env"></a>

```wing
env: MutMap<str>;
```

- *Type:* MutMap&lt;str&gt;
- *Default:* No environment variables.

Environment variables to pass to the function.

---

##### `memory`<sup>Optional</sup> <a name="memory" id="@winglang/sdk.cloud.TopicOnMessageProps.property.memory"></a>

```wing
memory: num;
```

- *Type:* num
- *Default:* 128

The amount of memory to allocate to the function, in MB.

---

##### `timeout`<sup>Optional</sup> <a name="timeout" id="@winglang/sdk.cloud.TopicOnMessageProps.property.timeout"></a>

```wing
timeout: Duration;
```

- *Type:* <a href="#@winglang/sdk.std.Duration">Duration</a>
- *Default:* 1m

The maximum amount of time the function can run.

---

### TopicProps <a name="TopicProps" id="@winglang/sdk.cloud.TopicProps"></a>

Properties for `Topic`.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.TopicProps.Initializer"></a>

```wing
bring cloud;

let TopicProps = cloud.TopicProps{ ... }
```


### Trace <a name="Trace" id="@winglang/sdk.cloud.Trace"></a>

Represents an trace emitted during simulation.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.Trace.Initializer"></a>

```wing
bring cloud;

let Trace = cloud.Trace{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Trace.property.data">data</a></code> | <code>any</code> | A JSON blob with structured data. |
| <code><a href="#@winglang/sdk.cloud.Trace.property.sourcePath">sourcePath</a></code> | <code>str</code> | The path of the resource that emitted the trace. |
| <code><a href="#@winglang/sdk.cloud.Trace.property.sourceType">sourceType</a></code> | <code>str</code> | The type of the source that emitted the trace. |
| <code><a href="#@winglang/sdk.cloud.Trace.property.timestamp">timestamp</a></code> | <code>str</code> | The timestamp of the event, in ISO 8601 format. |
| <code><a href="#@winglang/sdk.cloud.Trace.property.type">type</a></code> | <code><a href="#@winglang/sdk.cloud.TraceType">TraceType</a></code> | The type of a trace. |

---

##### `data`<sup>Required</sup> <a name="data" id="@winglang/sdk.cloud.Trace.property.data"></a>

```wing
data: any;
```

- *Type:* any

A JSON blob with structured data.

---

##### `sourcePath`<sup>Required</sup> <a name="sourcePath" id="@winglang/sdk.cloud.Trace.property.sourcePath"></a>

```wing
sourcePath: str;
```

- *Type:* str

The path of the resource that emitted the trace.

---

##### `sourceType`<sup>Required</sup> <a name="sourceType" id="@winglang/sdk.cloud.Trace.property.sourceType"></a>

```wing
sourceType: str;
```

- *Type:* str

The type of the source that emitted the trace.

---

##### `timestamp`<sup>Required</sup> <a name="timestamp" id="@winglang/sdk.cloud.Trace.property.timestamp"></a>

```wing
timestamp: str;
```

- *Type:* str

The timestamp of the event, in ISO 8601 format.

---

*Example*

```wing
2020-01-01T00:00:00.000Z
```


##### `type`<sup>Required</sup> <a name="type" id="@winglang/sdk.cloud.Trace.property.type"></a>

```wing
type: TraceType;
```

- *Type:* <a href="#@winglang/sdk.cloud.TraceType">TraceType</a>

The type of a trace.

---

### WebsiteProps <a name="WebsiteProps" id="@winglang/sdk.cloud.WebsiteProps"></a>

website props.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.WebsiteProps.Initializer"></a>

```wing
bring cloud;

let WebsiteProps = cloud.WebsiteProps{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.WebsiteProps.property.path">path</a></code> | <code>str</code> | Local path to the website's static files, relative to the Wing source file or absolute. |
| <code><a href="#@winglang/sdk.cloud.WebsiteProps.property.domain">domain</a></code> | <code>str</code> | The website's custom domain name. |

---

##### `path`<sup>Required</sup> <a name="path" id="@winglang/sdk.cloud.WebsiteProps.property.path"></a>

```wing
path: str;
```

- *Type:* str

Local path to the website's static files, relative to the Wing source file or absolute.

---

*Example*

```wing
"./dist"
```


##### `domain`<sup>Optional</sup> <a name="domain" id="@winglang/sdk.cloud.WebsiteProps.property.domain"></a>

```wing
domain: str;
```

- *Type:* str
- *Default:* a domain is generated by the cloud provider

The website's custom domain name.

---

*Example*

```wing
"example.com"
```


## Classes <a name="Classes" id="Classes"></a>

### Boolean <a name="Boolean" id="@winglang/sdk.std.Boolean"></a>

Boolean.

#### Initializers <a name="Initializers" id="@winglang/sdk.std.Boolean.Initializer"></a>

```wing
bring std;

new std.Boolean()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.std.Boolean.fromJson">fromJson</a></code> | Parse a boolean from Json. |

---

##### `fromJson` <a name="fromJson" id="@winglang/sdk.std.Boolean.fromJson"></a>

```wing
bring std;

std.Boolean.fromJson(json: Json)
```

Parse a boolean from Json.

###### `json`<sup>Required</sup> <a name="json" id="@winglang/sdk.std.Boolean.fromJson.parameter.json"></a>

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

to parse boolean from.

---



### Display <a name="Display" id="@winglang/sdk.std.Display"></a>

Information on how to display a resource in the UI.

#### Initializers <a name="Initializers" id="@winglang/sdk.std.Display.Initializer"></a>

```wing
bring std;

new std.Display(props?: DisplayProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.std.Display.Initializer.parameter.props">props</a></code> | <code><a href="#@winglang/sdk.std.DisplayProps">DisplayProps</a></code> | *No description.* |

---

##### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.std.Display.Initializer.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.std.DisplayProps">DisplayProps</a>

---



#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.std.Display.property.description">description</a></code> | <code>str</code> | Description of the resource. |
| <code><a href="#@winglang/sdk.std.Display.property.hidden">hidden</a></code> | <code>bool</code> | Whether the resource should be hidden from the UI. |
| <code><a href="#@winglang/sdk.std.Display.property.title">title</a></code> | <code>str</code> | Title of the resource. |

---

##### `description`<sup>Optional</sup> <a name="description" id="@winglang/sdk.std.Display.property.description"></a>

```wing
description: str;
```

- *Type:* str

Description of the resource.

---

##### `hidden`<sup>Optional</sup> <a name="hidden" id="@winglang/sdk.std.Display.property.hidden"></a>

```wing
hidden: bool;
```

- *Type:* bool

Whether the resource should be hidden from the UI.

---

##### `title`<sup>Optional</sup> <a name="title" id="@winglang/sdk.std.Display.property.title"></a>

```wing
title: str;
```

- *Type:* str

Title of the resource.

---


### Duration <a name="Duration" id="@winglang/sdk.std.Duration"></a>

Represents a length of time.


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.std.Duration.fromHours">fromHours</a></code> | Create a Duration representing an amount of hours. |
| <code><a href="#@winglang/sdk.std.Duration.fromMinutes">fromMinutes</a></code> | Create a Duration representing an amount of minutes. |
| <code><a href="#@winglang/sdk.std.Duration.fromSeconds">fromSeconds</a></code> | Create a Duration representing an amount of seconds. |

---

##### `fromHours` <a name="fromHours" id="@winglang/sdk.std.Duration.fromHours"></a>

```wing
bring std;

std.Duration.fromHours(amount: num)
```

Create a Duration representing an amount of hours.

###### `amount`<sup>Required</sup> <a name="amount" id="@winglang/sdk.std.Duration.fromHours.parameter.amount"></a>

- *Type:* num

the amount of Hours the `Duration` will represent.

---

##### `fromMinutes` <a name="fromMinutes" id="@winglang/sdk.std.Duration.fromMinutes"></a>

```wing
bring std;

std.Duration.fromMinutes(amount: num)
```

Create a Duration representing an amount of minutes.

###### `amount`<sup>Required</sup> <a name="amount" id="@winglang/sdk.std.Duration.fromMinutes.parameter.amount"></a>

- *Type:* num

the amount of Minutes the `Duration` will represent.

---

##### `fromSeconds` <a name="fromSeconds" id="@winglang/sdk.std.Duration.fromSeconds"></a>

```wing
bring std;

std.Duration.fromSeconds(amount: num)
```

Create a Duration representing an amount of seconds.

###### `amount`<sup>Required</sup> <a name="amount" id="@winglang/sdk.std.Duration.fromSeconds.parameter.amount"></a>

- *Type:* num

the amount of Seconds the `Duration` will represent.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.std.Duration.property.hours">hours</a></code> | <code>num</code> | Return the total number of hours in this Duration. |
| <code><a href="#@winglang/sdk.std.Duration.property.minutes">minutes</a></code> | <code>num</code> | Return the total number of minutes in this Duration. |
| <code><a href="#@winglang/sdk.std.Duration.property.seconds">seconds</a></code> | <code>num</code> | Return the total number of seconds in this Duration. |

---

##### `hours`<sup>Required</sup> <a name="hours" id="@winglang/sdk.std.Duration.property.hours"></a>

```wing
hours: num;
```

- *Type:* num

Return the total number of hours in this Duration.

---

##### `minutes`<sup>Required</sup> <a name="minutes" id="@winglang/sdk.std.Duration.property.minutes"></a>

```wing
minutes: num;
```

- *Type:* num

Return the total number of minutes in this Duration.

---

##### `seconds`<sup>Required</sup> <a name="seconds" id="@winglang/sdk.std.Duration.property.seconds"></a>

```wing
seconds: num;
```

- *Type:* num

Return the total number of seconds in this Duration.

---


### ImmutableArray <a name="ImmutableArray" id="@winglang/sdk.std.ImmutableArray"></a>

Immutable Array.

#### Initializers <a name="Initializers" id="@winglang/sdk.std.ImmutableArray.Initializer"></a>

```wing
bring std;

new std.ImmutableArray()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.std.ImmutableArray.at">at</a></code> | Get the value at the given index. |
| <code><a href="#@winglang/sdk.std.ImmutableArray.concat">concat</a></code> | Merge arr to the end of this array. |
| <code><a href="#@winglang/sdk.std.ImmutableArray.contains">contains</a></code> | Checks if this array includes searchElement. |
| <code><a href="#@winglang/sdk.std.ImmutableArray.copyMut">copyMut</a></code> | Create a mutable shallow copy of this array. |
| <code><a href="#@winglang/sdk.std.ImmutableArray.indexOf">indexOf</a></code> | Returns the index of the first occurrence of searchElement found. |
| <code><a href="#@winglang/sdk.std.ImmutableArray.join">join</a></code> | Returns a new string containing the concatenated values in this array, separated by commas or a specified separator string. |
| <code><a href="#@winglang/sdk.std.ImmutableArray.lastIndexOf">lastIndexOf</a></code> | Returns the index of the last occurrence of searchElement found. |

---

##### `at` <a name="at" id="@winglang/sdk.std.ImmutableArray.at"></a>

```wing
at(index: num): T1
```

Get the value at the given index.

###### `index`<sup>Required</sup> <a name="index" id="@winglang/sdk.std.ImmutableArray.at.parameter.index"></a>

- *Type:* num

index of the value to get.

---

##### `concat` <a name="concat" id="@winglang/sdk.std.ImmutableArray.concat"></a>

```wing
concat(arr: ImmutableArray): ImmutableArray
```

Merge arr to the end of this array.

###### `arr`<sup>Required</sup> <a name="arr" id="@winglang/sdk.std.ImmutableArray.concat.parameter.arr"></a>

- *Type:* <a href="#@winglang/sdk.std.ImmutableArray">ImmutableArray</a>

array to merge.

---

##### `contains` <a name="contains" id="@winglang/sdk.std.ImmutableArray.contains"></a>

```wing
contains(searchElement: T1): bool
```

Checks if this array includes searchElement.

###### `searchElement`<sup>Required</sup> <a name="searchElement" id="@winglang/sdk.std.ImmutableArray.contains.parameter.searchElement"></a>

- *Type:* <a href="#@winglang/sdk.std.T1">T1</a>

to search for.

---

##### `copyMut` <a name="copyMut" id="@winglang/sdk.std.ImmutableArray.copyMut"></a>

```wing
copyMut(): MutableArray
```

Create a mutable shallow copy of this array.

##### `indexOf` <a name="indexOf" id="@winglang/sdk.std.ImmutableArray.indexOf"></a>

```wing
indexOf(searchElement: T1): num
```

Returns the index of the first occurrence of searchElement found.

###### `searchElement`<sup>Required</sup> <a name="searchElement" id="@winglang/sdk.std.ImmutableArray.indexOf.parameter.searchElement"></a>

- *Type:* <a href="#@winglang/sdk.std.T1">T1</a>

to search for.

---

##### `join` <a name="join" id="@winglang/sdk.std.ImmutableArray.join"></a>

```wing
join(separator?: str): str
```

Returns a new string containing the concatenated values in this array, separated by commas or a specified separator string.

If the array has only
one item, then that item will be returned without using the separator.

###### `separator`<sup>Optional</sup> <a name="separator" id="@winglang/sdk.std.ImmutableArray.join.parameter.separator"></a>

- *Type:* str

---

##### `lastIndexOf` <a name="lastIndexOf" id="@winglang/sdk.std.ImmutableArray.lastIndexOf"></a>

```wing
lastIndexOf(searchElement: T1): num
```

Returns the index of the last occurrence of searchElement found.

###### `searchElement`<sup>Required</sup> <a name="searchElement" id="@winglang/sdk.std.ImmutableArray.lastIndexOf.parameter.searchElement"></a>

- *Type:* <a href="#@winglang/sdk.std.T1">T1</a>

to search for.

---


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.std.ImmutableArray.property.length">length</a></code> | <code>num</code> | The length of the array. |

---

##### `length`<sup>Required</sup> <a name="length" id="@winglang/sdk.std.ImmutableArray.property.length"></a>

```wing
length: num;
```

- *Type:* num

The length of the array.

---


### ImmutableMap <a name="ImmutableMap" id="@winglang/sdk.std.ImmutableMap"></a>

Immutable Map.

#### Initializers <a name="Initializers" id="@winglang/sdk.std.ImmutableMap.Initializer"></a>

```wing
bring std;

new std.ImmutableMap()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.std.ImmutableMap.copyMut">copyMut</a></code> | Create a mutable shallow copy of this map. |
| <code><a href="#@winglang/sdk.std.ImmutableMap.get">get</a></code> | Returns a specified element from the map. |
| <code><a href="#@winglang/sdk.std.ImmutableMap.has">has</a></code> | Returns a boolean indicating whether an element with the specified key exists or not. |
| <code><a href="#@winglang/sdk.std.ImmutableMap.keys">keys</a></code> | Returns the keys of this map. |
| <code><a href="#@winglang/sdk.std.ImmutableMap.size">size</a></code> | Returns the number of elements in the map. |
| <code><a href="#@winglang/sdk.std.ImmutableMap.values">values</a></code> | Returns the values of this map. |

---

##### `copyMut` <a name="copyMut" id="@winglang/sdk.std.ImmutableMap.copyMut"></a>

```wing
copyMut(): MutableMap
```

Create a mutable shallow copy of this map.

##### `get` <a name="get" id="@winglang/sdk.std.ImmutableMap.get"></a>

```wing
get(key: str): T1
```

Returns a specified element from the map.

If the value that is associated to the provided key is an object, then you will get a reference
to that object and any change made to that object will effectively modify it inside the map.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.std.ImmutableMap.get.parameter.key"></a>

- *Type:* str

The key of the element to return.

---

##### `has` <a name="has" id="@winglang/sdk.std.ImmutableMap.has"></a>

```wing
has(key: str): bool
```

Returns a boolean indicating whether an element with the specified key exists or not.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.std.ImmutableMap.has.parameter.key"></a>

- *Type:* str

The key of the element to test for presence.

---

##### `keys` <a name="keys" id="@winglang/sdk.std.ImmutableMap.keys"></a>

```wing
keys(): ImmutableArray
```

Returns the keys of this map.

##### `size` <a name="size" id="@winglang/sdk.std.ImmutableMap.size"></a>

```wing
size(): num
```

Returns the number of elements in the map.

TODO: For now this has to be a method rather than a getter as macros only work on methods https://github.com/winglang/wing/issues/1658

##### `values` <a name="values" id="@winglang/sdk.std.ImmutableMap.values"></a>

```wing
values(): ImmutableArray
```

Returns the values of this map.




### ImmutableSet <a name="ImmutableSet" id="@winglang/sdk.std.ImmutableSet"></a>

Immutable Set.

#### Initializers <a name="Initializers" id="@winglang/sdk.std.ImmutableSet.Initializer"></a>

```wing
bring std;

new std.ImmutableSet()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.std.ImmutableSet.copyMut">copyMut</a></code> | Create a mutable shallow copy of this set. |
| <code><a href="#@winglang/sdk.std.ImmutableSet.has">has</a></code> | Returns a boolean indicating whether an element with the specified value exists in the set. |

---

##### `copyMut` <a name="copyMut" id="@winglang/sdk.std.ImmutableSet.copyMut"></a>

```wing
copyMut(): MutableSet
```

Create a mutable shallow copy of this set.

##### `has` <a name="has" id="@winglang/sdk.std.ImmutableSet.has"></a>

```wing
has(value: T1): bool
```

Returns a boolean indicating whether an element with the specified value exists in the set.

###### `value`<sup>Required</sup> <a name="value" id="@winglang/sdk.std.ImmutableSet.has.parameter.value"></a>

- *Type:* <a href="#@winglang/sdk.std.T1">T1</a>

The value to test for presence in the Set object.

---


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.std.ImmutableSet.property.size">size</a></code> | <code>num</code> | The length of the set. |

---

##### `size`<sup>Required</sup> <a name="size" id="@winglang/sdk.std.ImmutableSet.property.size"></a>

```wing
size: num;
```

- *Type:* num

The length of the set.

---


### Json <a name="Json" id="@winglang/sdk.std.Json"></a>

Immutable Json.

#### Initializers <a name="Initializers" id="@winglang/sdk.std.Json.Initializer"></a>

```wing
bring std;

new std.Json()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.std.Json.get">get</a></code> | Returns a specified element from the Json. |
| <code><a href="#@winglang/sdk.std.Json.getAt">getAt</a></code> | Returns a specified element at a given index from Json Array. |

---

##### `get` <a name="get" id="@winglang/sdk.std.Json.get"></a>

```wing
get(key: str): Json
```

Returns a specified element from the Json.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.std.Json.get.parameter.key"></a>

- *Type:* str

The key of the element to return.

---

##### `getAt` <a name="getAt" id="@winglang/sdk.std.Json.getAt"></a>

```wing
getAt(index: num): Json
```

Returns a specified element at a given index from Json Array.

###### `index`<sup>Required</sup> <a name="index" id="@winglang/sdk.std.Json.getAt.parameter.index"></a>

- *Type:* num

The index of the element in the Json Array to return.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.std.Json.clone">clone</a></code> | Creates a immutable deep clone of the Json. |
| <code><a href="#@winglang/sdk.std.Json.cloneMut">cloneMut</a></code> | Creates a mutable deep clone of the Json. |
| <code><a href="#@winglang/sdk.std.Json.delete">delete</a></code> | Deletes a key in a given Json. |
| <code><a href="#@winglang/sdk.std.Json.keys">keys</a></code> | Returns the keys from the Json object. |
| <code><a href="#@winglang/sdk.std.Json.parse">parse</a></code> | Parse a string into a Json. |
| <code><a href="#@winglang/sdk.std.Json.stringify">stringify</a></code> | Formats Json as string. |
| <code><a href="#@winglang/sdk.std.Json.tryParse">tryParse</a></code> | Try to parse a string into a Json. |
| <code><a href="#@winglang/sdk.std.Json.values">values</a></code> | Returns the values from the Json. |

---

##### `clone` <a name="clone" id="@winglang/sdk.std.Json.clone"></a>

```wing
bring std;

std.Json.clone(json: Json)
```

Creates a immutable deep clone of the Json.

###### `json`<sup>Required</sup> <a name="json" id="@winglang/sdk.std.Json.clone.parameter.json"></a>

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

to clone.

---

##### `cloneMut` <a name="cloneMut" id="@winglang/sdk.std.Json.cloneMut"></a>

```wing
bring std;

std.Json.cloneMut(json: Json)
```

Creates a mutable deep clone of the Json.

###### `json`<sup>Required</sup> <a name="json" id="@winglang/sdk.std.Json.cloneMut.parameter.json"></a>

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

to clone.

---

##### `delete` <a name="delete" id="@winglang/sdk.std.Json.delete"></a>

```wing
bring std;

std.Json.delete(json: Json, key: str)
```

Deletes a key in a given Json.

###### `json`<sup>Required</sup> <a name="json" id="@winglang/sdk.std.Json.delete.parameter.json"></a>

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

to delete key from.

---

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.std.Json.delete.parameter.key"></a>

- *Type:* str

the key to delete.

---

##### `keys` <a name="keys" id="@winglang/sdk.std.Json.keys"></a>

```wing
bring std;

std.Json.keys(json: Json)
```

Returns the keys from the Json object.

###### `json`<sup>Required</sup> <a name="json" id="@winglang/sdk.std.Json.keys.parameter.json"></a>

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

to get keys from.

---

##### `parse` <a name="parse" id="@winglang/sdk.std.Json.parse"></a>

```wing
bring std;

std.Json.parse(str: str)
```

Parse a string into a Json.

###### `str`<sup>Required</sup> <a name="str" id="@winglang/sdk.std.Json.parse.parameter.str"></a>

- *Type:* str

to parse as Json.

---

##### `stringify` <a name="stringify" id="@winglang/sdk.std.Json.stringify"></a>

```wing
bring std;

std.Json.stringify(json: Json, indent?: num)
```

Formats Json as string.

(JSON.stringify($args$))

###### `json`<sup>Required</sup> <a name="json" id="@winglang/sdk.std.Json.stringify.parameter.json"></a>

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

to format as string.

---

###### `indent`<sup>Optional</sup> <a name="indent" id="@winglang/sdk.std.Json.stringify.parameter.indent"></a>

- *Type:* num

---

##### `tryParse` <a name="tryParse" id="@winglang/sdk.std.Json.tryParse"></a>

```wing
bring std;

std.Json.tryParse(str: str)
```

Try to parse a string into a Json.

###### `str`<sup>Required</sup> <a name="str" id="@winglang/sdk.std.Json.tryParse.parameter.str"></a>

- *Type:* str

to parse as Json.

---

##### `values` <a name="values" id="@winglang/sdk.std.Json.values"></a>

```wing
bring std;

std.Json.values(json: Json)
```

Returns the values from the Json.

###### `json`<sup>Required</sup> <a name="json" id="@winglang/sdk.std.Json.values.parameter.json"></a>

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

to get values from.

---



### MutableArray <a name="MutableArray" id="@winglang/sdk.std.MutableArray"></a>

Mutable Array.

#### Initializers <a name="Initializers" id="@winglang/sdk.std.MutableArray.Initializer"></a>

```wing
bring std;

new std.MutableArray()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.std.MutableArray.at">at</a></code> | Get the value at the given index. |
| <code><a href="#@winglang/sdk.std.MutableArray.concat">concat</a></code> | Merge arr to the end of this array. |
| <code><a href="#@winglang/sdk.std.MutableArray.contains">contains</a></code> | Checks if this array includes searchElement. |
| <code><a href="#@winglang/sdk.std.MutableArray.copy">copy</a></code> | Create an immutable shallow copy of this array. |
| <code><a href="#@winglang/sdk.std.MutableArray.indexOf">indexOf</a></code> | Returns the index of the first occurrence of searchElement found. |
| <code><a href="#@winglang/sdk.std.MutableArray.join">join</a></code> | Returns a new string containing the concatenated values in this array, separated by commas or a specified separator string. |
| <code><a href="#@winglang/sdk.std.MutableArray.lastIndexOf">lastIndexOf</a></code> | Returns the index of the last occurrence of searchElement found. |
| <code><a href="#@winglang/sdk.std.MutableArray.pop">pop</a></code> | Remove value from end of array. |
| <code><a href="#@winglang/sdk.std.MutableArray.push">push</a></code> | Add value to end of array. |

---

##### `at` <a name="at" id="@winglang/sdk.std.MutableArray.at"></a>

```wing
at(index: num): T1
```

Get the value at the given index.

###### `index`<sup>Required</sup> <a name="index" id="@winglang/sdk.std.MutableArray.at.parameter.index"></a>

- *Type:* num

index of the value to get.

---

##### `concat` <a name="concat" id="@winglang/sdk.std.MutableArray.concat"></a>

```wing
concat(arr: MutableArray): MutableArray
```

Merge arr to the end of this array.

###### `arr`<sup>Required</sup> <a name="arr" id="@winglang/sdk.std.MutableArray.concat.parameter.arr"></a>

- *Type:* <a href="#@winglang/sdk.std.MutableArray">MutableArray</a>

array to merge.

---

##### `contains` <a name="contains" id="@winglang/sdk.std.MutableArray.contains"></a>

```wing
contains(searchElement: T1): bool
```

Checks if this array includes searchElement.

###### `searchElement`<sup>Required</sup> <a name="searchElement" id="@winglang/sdk.std.MutableArray.contains.parameter.searchElement"></a>

- *Type:* <a href="#@winglang/sdk.std.T1">T1</a>

to search for.

---

##### `copy` <a name="copy" id="@winglang/sdk.std.MutableArray.copy"></a>

```wing
copy(): ImmutableArray
```

Create an immutable shallow copy of this array.

##### `indexOf` <a name="indexOf" id="@winglang/sdk.std.MutableArray.indexOf"></a>

```wing
indexOf(searchElement: T1): num
```

Returns the index of the first occurrence of searchElement found.

###### `searchElement`<sup>Required</sup> <a name="searchElement" id="@winglang/sdk.std.MutableArray.indexOf.parameter.searchElement"></a>

- *Type:* <a href="#@winglang/sdk.std.T1">T1</a>

to search for.

---

##### `join` <a name="join" id="@winglang/sdk.std.MutableArray.join"></a>

```wing
join(separator?: str): str
```

Returns a new string containing the concatenated values in this array, separated by commas or a specified separator string.

If the array has only
one item, then that item will be returned without using the separator.

###### `separator`<sup>Optional</sup> <a name="separator" id="@winglang/sdk.std.MutableArray.join.parameter.separator"></a>

- *Type:* str

---

##### `lastIndexOf` <a name="lastIndexOf" id="@winglang/sdk.std.MutableArray.lastIndexOf"></a>

```wing
lastIndexOf(searchElement: T1): num
```

Returns the index of the last occurrence of searchElement found.

###### `searchElement`<sup>Required</sup> <a name="searchElement" id="@winglang/sdk.std.MutableArray.lastIndexOf.parameter.searchElement"></a>

- *Type:* <a href="#@winglang/sdk.std.T1">T1</a>

to search for.

---

##### `pop` <a name="pop" id="@winglang/sdk.std.MutableArray.pop"></a>

```wing
pop(): T1
```

Remove value from end of array.

##### `push` <a name="push" id="@winglang/sdk.std.MutableArray.push"></a>

```wing
push(value: T1): void
```

Add value to end of array.

###### `value`<sup>Required</sup> <a name="value" id="@winglang/sdk.std.MutableArray.push.parameter.value"></a>

- *Type:* <a href="#@winglang/sdk.std.T1">T1</a>

value to add.

---


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.std.MutableArray.property.length">length</a></code> | <code>num</code> | The length of the array. |

---

##### `length`<sup>Required</sup> <a name="length" id="@winglang/sdk.std.MutableArray.property.length"></a>

```wing
length: num;
```

- *Type:* num

The length of the array.

---


### MutableMap <a name="MutableMap" id="@winglang/sdk.std.MutableMap"></a>

Mutable Map.

#### Initializers <a name="Initializers" id="@winglang/sdk.std.MutableMap.Initializer"></a>

```wing
bring std;

new std.MutableMap()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.std.MutableMap.clear">clear</a></code> | Removes all elements. |
| <code><a href="#@winglang/sdk.std.MutableMap.copy">copy</a></code> | Create an immutable shallow copy of this map. |
| <code><a href="#@winglang/sdk.std.MutableMap.delete">delete</a></code> | Removes the specified element from a map. |
| <code><a href="#@winglang/sdk.std.MutableMap.get">get</a></code> | Returns a specified element from the map. |
| <code><a href="#@winglang/sdk.std.MutableMap.has">has</a></code> | Returns a boolean indicating whether an element with the specified key exists or not. |
| <code><a href="#@winglang/sdk.std.MutableMap.keys">keys</a></code> | Returns the keys of this map. |
| <code><a href="#@winglang/sdk.std.MutableMap.set">set</a></code> | Adds or updates an entry in a Map object with a specified key and a value. |
| <code><a href="#@winglang/sdk.std.MutableMap.size">size</a></code> | Returns the number of elements in the map. |
| <code><a href="#@winglang/sdk.std.MutableMap.values">values</a></code> | Returns the values of this map. |

---

##### `clear` <a name="clear" id="@winglang/sdk.std.MutableMap.clear"></a>

```wing
clear(): void
```

Removes all elements.

##### `copy` <a name="copy" id="@winglang/sdk.std.MutableMap.copy"></a>

```wing
copy(): ImmutableMap
```

Create an immutable shallow copy of this map.

##### `delete` <a name="delete" id="@winglang/sdk.std.MutableMap.delete"></a>

```wing
delete(key: str): bool
```

Removes the specified element from a map.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.std.MutableMap.delete.parameter.key"></a>

- *Type:* str

The key.

---

##### `get` <a name="get" id="@winglang/sdk.std.MutableMap.get"></a>

```wing
get(key: str): T1
```

Returns a specified element from the map.

If the value that is associated to the provided key is an object, then you will get a reference
to that object and any change made to that object will effectively modify it inside the map.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.std.MutableMap.get.parameter.key"></a>

- *Type:* str

The key of the element to return.

---

##### `has` <a name="has" id="@winglang/sdk.std.MutableMap.has"></a>

```wing
has(key: str): bool
```

Returns a boolean indicating whether an element with the specified key exists or not.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.std.MutableMap.has.parameter.key"></a>

- *Type:* str

The key of the element to test for presence.

---

##### `keys` <a name="keys" id="@winglang/sdk.std.MutableMap.keys"></a>

```wing
keys(): ImmutableArray
```

Returns the keys of this map.

##### `set` <a name="set" id="@winglang/sdk.std.MutableMap.set"></a>

```wing
set(key: str, value: T1): void
```

Adds or updates an entry in a Map object with a specified key and a value.

TODO: revisit this macro after we support indexed args https://github.com/winglang/wing/issues/1659

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.std.MutableMap.set.parameter.key"></a>

- *Type:* str

The key of the element to add.

---

###### `value`<sup>Required</sup> <a name="value" id="@winglang/sdk.std.MutableMap.set.parameter.value"></a>

- *Type:* <a href="#@winglang/sdk.std.T1">T1</a>

The value of the element to add.

---

##### `size` <a name="size" id="@winglang/sdk.std.MutableMap.size"></a>

```wing
size(): num
```

Returns the number of elements in the map.

TODO: For now this has to be a method rather than a getter as macros only work on methods https://github.com/winglang/wing/issues/1658

##### `values` <a name="values" id="@winglang/sdk.std.MutableMap.values"></a>

```wing
values(): ImmutableArray
```

Returns the values of this map.




### MutableSet <a name="MutableSet" id="@winglang/sdk.std.MutableSet"></a>

Mutable Set.

#### Initializers <a name="Initializers" id="@winglang/sdk.std.MutableSet.Initializer"></a>

```wing
bring std;

new std.MutableSet()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.std.MutableSet.add">add</a></code> | Add value to set. |
| <code><a href="#@winglang/sdk.std.MutableSet.clear">clear</a></code> | The clear() method removes all elements from a set. |
| <code><a href="#@winglang/sdk.std.MutableSet.copy">copy</a></code> | Create an immutable shallow copy of this set. |
| <code><a href="#@winglang/sdk.std.MutableSet.delete">delete</a></code> | Removes a specified value from a set, if it is in the set. |
| <code><a href="#@winglang/sdk.std.MutableSet.has">has</a></code> | Returns a boolean indicating whether an element with the specified value exists in the set. |

---

##### `add` <a name="add" id="@winglang/sdk.std.MutableSet.add"></a>

```wing
add(value: T1): MutableSet
```

Add value to set.

###### `value`<sup>Required</sup> <a name="value" id="@winglang/sdk.std.MutableSet.add.parameter.value"></a>

- *Type:* <a href="#@winglang/sdk.std.T1">T1</a>

value to add.

---

##### `clear` <a name="clear" id="@winglang/sdk.std.MutableSet.clear"></a>

```wing
clear(): void
```

The clear() method removes all elements from a set.

##### `copy` <a name="copy" id="@winglang/sdk.std.MutableSet.copy"></a>

```wing
copy(): ImmutableSet
```

Create an immutable shallow copy of this set.

##### `delete` <a name="delete" id="@winglang/sdk.std.MutableSet.delete"></a>

```wing
delete(value: T1): bool
```

Removes a specified value from a set, if it is in the set.

###### `value`<sup>Required</sup> <a name="value" id="@winglang/sdk.std.MutableSet.delete.parameter.value"></a>

- *Type:* <a href="#@winglang/sdk.std.T1">T1</a>

The value to remove from the set.

---

##### `has` <a name="has" id="@winglang/sdk.std.MutableSet.has"></a>

```wing
has(value: T1): bool
```

Returns a boolean indicating whether an element with the specified value exists in the set.

###### `value`<sup>Required</sup> <a name="value" id="@winglang/sdk.std.MutableSet.has.parameter.value"></a>

- *Type:* <a href="#@winglang/sdk.std.T1">T1</a>

The value to test for presence in the Set object.

---


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.std.MutableSet.property.size">size</a></code> | <code>num</code> | The length of the set. |

---

##### `size`<sup>Required</sup> <a name="size" id="@winglang/sdk.std.MutableSet.property.size"></a>

```wing
size: num;
```

- *Type:* num

The length of the set.

---


### MutJson <a name="MutJson" id="@winglang/sdk.std.MutJson"></a>

Mutable Json.

#### Initializers <a name="Initializers" id="@winglang/sdk.std.MutJson.Initializer"></a>

```wing
bring std;

new std.MutJson()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.std.MutJson.get">get</a></code> | Returns a specified element from the Json. |
| <code><a href="#@winglang/sdk.std.MutJson.getAt">getAt</a></code> | Returns a specified element at a given index from MutJson Array. |
| <code><a href="#@winglang/sdk.std.MutJson.set">set</a></code> | Adds or updates an element in MutJson with a specific key and value. |
| <code><a href="#@winglang/sdk.std.MutJson.setAt">setAt</a></code> | Set element in MutJson Array with a specific key and value. |

---

##### `get` <a name="get" id="@winglang/sdk.std.MutJson.get"></a>

```wing
get(key: str): MutJson
```

Returns a specified element from the Json.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.std.MutJson.get.parameter.key"></a>

- *Type:* str

The key of the element to return.

---

##### `getAt` <a name="getAt" id="@winglang/sdk.std.MutJson.getAt"></a>

```wing
getAt(index: num): MutJson
```

Returns a specified element at a given index from MutJson Array.

###### `index`<sup>Required</sup> <a name="index" id="@winglang/sdk.std.MutJson.getAt.parameter.index"></a>

- *Type:* num

The index of the element in the MutJson Array to return.

---

##### `set` <a name="set" id="@winglang/sdk.std.MutJson.set"></a>

```wing
set(key: str, value: any): void
```

Adds or updates an element in MutJson with a specific key and value.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.std.MutJson.set.parameter.key"></a>

- *Type:* str

The key of the element to add.

---

###### `value`<sup>Required</sup> <a name="value" id="@winglang/sdk.std.MutJson.set.parameter.value"></a>

- *Type:* any

The value of the element to add.

---

##### `setAt` <a name="setAt" id="@winglang/sdk.std.MutJson.setAt"></a>

```wing
setAt(index: num, value: any): void
```

Set element in MutJson Array with a specific key and value.

###### `index`<sup>Required</sup> <a name="index" id="@winglang/sdk.std.MutJson.setAt.parameter.index"></a>

- *Type:* num

---

###### `value`<sup>Required</sup> <a name="value" id="@winglang/sdk.std.MutJson.setAt.parameter.value"></a>

- *Type:* any

The value of the element to set.

---




### Number <a name="Number" id="@winglang/sdk.std.Number"></a>

Number.

#### Initializers <a name="Initializers" id="@winglang/sdk.std.Number.Initializer"></a>

```wing
bring std;

new std.Number()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.std.Number.fromJson">fromJson</a></code> | Parse a number from Json. |
| <code><a href="#@winglang/sdk.std.Number.fromStr">fromStr</a></code> | Parse a number from string. |

---

##### `fromJson` <a name="fromJson" id="@winglang/sdk.std.Number.fromJson"></a>

```wing
bring std;

std.Number.fromJson(json: Json)
```

Parse a number from Json.

###### `json`<sup>Required</sup> <a name="json" id="@winglang/sdk.std.Number.fromJson.parameter.json"></a>

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

to parse number from.

---

##### `fromStr` <a name="fromStr" id="@winglang/sdk.std.Number.fromStr"></a>

```wing
bring std;

std.Number.fromStr(str: str)
```

Parse a number from string.

###### `str`<sup>Required</sup> <a name="str" id="@winglang/sdk.std.Number.fromStr.parameter.str"></a>

- *Type:* str

to parse number from.

---



### Range <a name="Range" id="@winglang/sdk.std.Range"></a>

Range.

#### Initializers <a name="Initializers" id="@winglang/sdk.std.Range.Initializer"></a>

```wing
bring std;

new std.Range()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---





### String <a name="String" id="@winglang/sdk.std.String"></a>

String.

#### Initializers <a name="Initializers" id="@winglang/sdk.std.String.Initializer"></a>

```wing
bring std;

new std.String()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.std.String.at">at</a></code> | Returns the character at the specified index. |
| <code><a href="#@winglang/sdk.std.String.concat">concat</a></code> | Combines the text of two (or more) strings and returns a new string. |
| <code><a href="#@winglang/sdk.std.String.contains">contains</a></code> | Checks if string includes substring. |
| <code><a href="#@winglang/sdk.std.String.endsWith">endsWith</a></code> | Does this string end with the given searchString? |
| <code><a href="#@winglang/sdk.std.String.indexOf">indexOf</a></code> | Returns the index of the first occurrence of searchString found. |
| <code><a href="#@winglang/sdk.std.String.lowercase">lowercase</a></code> | Returns this string in lower case. |
| <code><a href="#@winglang/sdk.std.String.split">split</a></code> | Splits string by separator. |
| <code><a href="#@winglang/sdk.std.String.startsWith">startsWith</a></code> | Does this string start with the given searchString? |
| <code><a href="#@winglang/sdk.std.String.substring">substring</a></code> | Returns a string between indexStart, indexEnd. |
| <code><a href="#@winglang/sdk.std.String.trim">trim</a></code> | Removes white spaces from start and end of this string. |
| <code><a href="#@winglang/sdk.std.String.uppercase">uppercase</a></code> | Returns this string in upper case. |

---

##### `at` <a name="at" id="@winglang/sdk.std.String.at"></a>

```wing
at(index: num): str
```

Returns the character at the specified index.

###### `index`<sup>Required</sup> <a name="index" id="@winglang/sdk.std.String.at.parameter.index"></a>

- *Type:* num

position of the character.

---

##### `concat` <a name="concat" id="@winglang/sdk.std.String.concat"></a>

```wing
concat(strN: str): str
```

Combines the text of two (or more) strings and returns a new string.

###### `strN`<sup>Required</sup> <a name="strN" id="@winglang/sdk.std.String.concat.parameter.strN"></a>

- *Type:* str

one or more strings to concatenate to this string.

---

##### `contains` <a name="contains" id="@winglang/sdk.std.String.contains"></a>

```wing
contains(searchString: str): bool
```

Checks if string includes substring.

###### `searchString`<sup>Required</sup> <a name="searchString" id="@winglang/sdk.std.String.contains.parameter.searchString"></a>

- *Type:* str

substring to search for.

---

##### `endsWith` <a name="endsWith" id="@winglang/sdk.std.String.endsWith"></a>

```wing
endsWith(searchString: str): bool
```

Does this string end with the given searchString?

###### `searchString`<sup>Required</sup> <a name="searchString" id="@winglang/sdk.std.String.endsWith.parameter.searchString"></a>

- *Type:* str

substring to search for.

---

##### `indexOf` <a name="indexOf" id="@winglang/sdk.std.String.indexOf"></a>

```wing
indexOf(searchString: str): num
```

Returns the index of the first occurrence of searchString found.

###### `searchString`<sup>Required</sup> <a name="searchString" id="@winglang/sdk.std.String.indexOf.parameter.searchString"></a>

- *Type:* str

substring to search for.

---

##### `lowercase` <a name="lowercase" id="@winglang/sdk.std.String.lowercase"></a>

```wing
lowercase(): str
```

Returns this string in lower case.

##### `split` <a name="split" id="@winglang/sdk.std.String.split"></a>

```wing
split(separator: str): MutArray<str>
```

Splits string by separator.

###### `separator`<sup>Required</sup> <a name="separator" id="@winglang/sdk.std.String.split.parameter.separator"></a>

- *Type:* str

separator to split by.

---

##### `startsWith` <a name="startsWith" id="@winglang/sdk.std.String.startsWith"></a>

```wing
startsWith(searchString: str): bool
```

Does this string start with the given searchString?

###### `searchString`<sup>Required</sup> <a name="searchString" id="@winglang/sdk.std.String.startsWith.parameter.searchString"></a>

- *Type:* str

substring to search for.

---

##### `substring` <a name="substring" id="@winglang/sdk.std.String.substring"></a>

```wing
substring(indexStart: num, indexEnd?: num): str
```

Returns a string between indexStart, indexEnd.

###### `indexStart`<sup>Required</sup> <a name="indexStart" id="@winglang/sdk.std.String.substring.parameter.indexStart"></a>

- *Type:* num

index of the character we slice at.

---

###### `indexEnd`<sup>Optional</sup> <a name="indexEnd" id="@winglang/sdk.std.String.substring.parameter.indexEnd"></a>

- *Type:* num

optional - index of the character we end slicing at.

---

##### `trim` <a name="trim" id="@winglang/sdk.std.String.trim"></a>

```wing
trim(): str
```

Removes white spaces from start and end of this string.

##### `uppercase` <a name="uppercase" id="@winglang/sdk.std.String.uppercase"></a>

```wing
uppercase(): str
```

Returns this string in upper case.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.std.String.fromJson">fromJson</a></code> | Parse string from Json. |

---

##### `fromJson` <a name="fromJson" id="@winglang/sdk.std.String.fromJson"></a>

```wing
bring std;

std.String.fromJson(json: Json)
```

Parse string from Json.

###### `json`<sup>Required</sup> <a name="json" id="@winglang/sdk.std.String.fromJson.parameter.json"></a>

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

to create string from.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.std.String.property.length">length</a></code> | <code>num</code> | The length of the string. |

---

##### `length`<sup>Required</sup> <a name="length" id="@winglang/sdk.std.String.property.length"></a>

```wing
length: num;
```

- *Type:* num

The length of the string.

---


### T1 <a name="T1" id="@winglang/sdk.std.T1"></a>

Generic type argument.

This type is replaced at compile time.

#### Initializers <a name="Initializers" id="@winglang/sdk.std.T1.Initializer"></a>

```wing
bring std;

new std.T1()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---





## Protocols <a name="Protocols" id="Protocols"></a>

### IApiClient <a name="IApiClient" id="@winglang/sdk.cloud.IApiClient"></a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.IApiClient">IApiClient</a>

Inflight methods and members of `cloud.Api`.



### IApiEndpointHandler <a name="IApiEndpointHandler" id="@winglang/sdk.cloud.IApiEndpointHandler"></a>

- *Extends:* <a href="#@winglang/sdk.std.IResource">IResource</a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.IApiEndpointHandler">IApiEndpointHandler</a>

**Inflight client:** [@winglang/sdk.cloud.IApiEndpointHandlerClient](#@winglang/sdk.cloud.IApiEndpointHandlerClient)

Represents a resource with an inflight "handle" method that can be passed to one of the `Api` request preflight methods.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.IApiEndpointHandler.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.cloud.IApiEndpointHandler.property.display">display</a></code> | <code><a href="#@winglang/sdk.std.Display">Display</a></code> | Information on how to display a resource in the UI. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.cloud.IApiEndpointHandler.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `display`<sup>Required</sup> <a name="display" id="@winglang/sdk.cloud.IApiEndpointHandler.property.display"></a>

```wing
display: Display;
```

- *Type:* <a href="#@winglang/sdk.std.Display">Display</a>

Information on how to display a resource in the UI.

---

### IApiEndpointHandlerClient <a name="IApiEndpointHandlerClient" id="@winglang/sdk.cloud.IApiEndpointHandlerClient"></a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.IApiEndpointHandlerClient">IApiEndpointHandlerClient</a>

Inflight client for `IApiEndpointHandler`.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.IApiEndpointHandlerClient.handle">handle</a></code> | Inflight that will be called when a request is made to the endpoint. |

---

##### `handle` <a name="handle" id="@winglang/sdk.cloud.IApiEndpointHandlerClient.handle"></a>

```wing
handle(request: ApiRequest): ApiResponse
```

**Inflight client:** [true](#true)

Inflight that will be called when a request is made to the endpoint.

###### `request`<sup>Required</sup> <a name="request" id="@winglang/sdk.cloud.IApiEndpointHandlerClient.handle.parameter.request"></a>

- *Type:* <a href="#@winglang/sdk.cloud.ApiRequest">ApiRequest</a>

---


### IBucketClient <a name="IBucketClient" id="@winglang/sdk.cloud.IBucketClient"></a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.IBucketClient">IBucketClient</a>

Inflight interface for `Bucket`.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.IBucketClient.delete">delete</a></code> | Delete an existing object using a key from the bucket. |
| <code><a href="#@winglang/sdk.cloud.IBucketClient.exists">exists</a></code> | Check if an object exists in the bucket. |
| <code><a href="#@winglang/sdk.cloud.IBucketClient.get">get</a></code> | Retrieve an object from the bucket. |
| <code><a href="#@winglang/sdk.cloud.IBucketClient.getJson">getJson</a></code> | Retrieve a Json object from the bucket. |
| <code><a href="#@winglang/sdk.cloud.IBucketClient.list">list</a></code> | Retrieve existing objects keys from the bucket. |
| <code><a href="#@winglang/sdk.cloud.IBucketClient.publicUrl">publicUrl</a></code> | Returns a url to the given file. |
| <code><a href="#@winglang/sdk.cloud.IBucketClient.put">put</a></code> | Put an object in the bucket. |
| <code><a href="#@winglang/sdk.cloud.IBucketClient.putJson">putJson</a></code> | Put a Json object in the bucket. |
| <code><a href="#@winglang/sdk.cloud.IBucketClient.tryDelete">tryDelete</a></code> | Delete an object from the bucket if it exists. |
| <code><a href="#@winglang/sdk.cloud.IBucketClient.tryGet">tryGet</a></code> | Get an object from the bucket if it exists. |
| <code><a href="#@winglang/sdk.cloud.IBucketClient.tryGetJson">tryGetJson</a></code> | Gets an object from the bucket if it exists, parsing it as Json. |

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

- *Type:* <a href="#@winglang/sdk.cloud.BucketDeleteOptions">BucketDeleteOptions</a>

Options available for delete an item from a bucket.

---

##### `exists` <a name="exists" id="@winglang/sdk.cloud.IBucketClient.exists"></a>

```wing
exists(key: str): bool
```

**Inflight client:** [true](#true)

Check if an object exists in the bucket.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.cloud.IBucketClient.exists.parameter.key"></a>

- *Type:* str

Key of the object.

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

##### `getJson` <a name="getJson" id="@winglang/sdk.cloud.IBucketClient.getJson"></a>

```wing
getJson(key: str): Json
```

**Inflight client:** [true](#true)

Retrieve a Json object from the bucket.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.cloud.IBucketClient.getJson.parameter.key"></a>

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

##### `publicUrl` <a name="publicUrl" id="@winglang/sdk.cloud.IBucketClient.publicUrl"></a>

```wing
publicUrl(key: str): str
```

**Inflight client:** [true](#true)

Returns a url to the given file.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.cloud.IBucketClient.publicUrl.parameter.key"></a>

- *Type:* str

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

##### `putJson` <a name="putJson" id="@winglang/sdk.cloud.IBucketClient.putJson"></a>

```wing
putJson(key: str, body: Json): void
```

**Inflight client:** [true](#true)

Put a Json object in the bucket.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.cloud.IBucketClient.putJson.parameter.key"></a>

- *Type:* str

Key of the object.

---

###### `body`<sup>Required</sup> <a name="body" id="@winglang/sdk.cloud.IBucketClient.putJson.parameter.body"></a>

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

Json object that we want to store into the bucket.

---

##### `tryDelete` <a name="tryDelete" id="@winglang/sdk.cloud.IBucketClient.tryDelete"></a>

```wing
tryDelete(key: str): bool
```

**Inflight client:** [true](#true)

Delete an object from the bucket if it exists.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.cloud.IBucketClient.tryDelete.parameter.key"></a>

- *Type:* str

Key of the object.

---

##### `tryGet` <a name="tryGet" id="@winglang/sdk.cloud.IBucketClient.tryGet"></a>

```wing
tryGet(key: str): str
```

**Inflight client:** [true](#true)

Get an object from the bucket if it exists.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.cloud.IBucketClient.tryGet.parameter.key"></a>

- *Type:* str

Key of the object.

---

##### `tryGetJson` <a name="tryGetJson" id="@winglang/sdk.cloud.IBucketClient.tryGetJson"></a>

```wing
tryGetJson(key: str): Json
```

**Inflight client:** [true](#true)

Gets an object from the bucket if it exists, parsing it as Json.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.cloud.IBucketClient.tryGetJson.parameter.key"></a>

- *Type:* str

Key of the object.

---


### IBucketEventHandler <a name="IBucketEventHandler" id="@winglang/sdk.cloud.IBucketEventHandler"></a>

- *Extends:* <a href="#@winglang/sdk.std.IResource">IResource</a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.IBucketEventHandler">IBucketEventHandler</a>

**Inflight client:** [@winglang/sdk.cloud.IBucketEventHandlerClient](#@winglang/sdk.cloud.IBucketEventHandlerClient)

Represents a resource with an inflight "handle" method that can be passed to the bucket events.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.IBucketEventHandler.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.cloud.IBucketEventHandler.property.display">display</a></code> | <code><a href="#@winglang/sdk.std.Display">Display</a></code> | Information on how to display a resource in the UI. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.cloud.IBucketEventHandler.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `display`<sup>Required</sup> <a name="display" id="@winglang/sdk.cloud.IBucketEventHandler.property.display"></a>

```wing
display: Display;
```

- *Type:* <a href="#@winglang/sdk.std.Display">Display</a>

Information on how to display a resource in the UI.

---

### IBucketEventHandlerClient <a name="IBucketEventHandlerClient" id="@winglang/sdk.cloud.IBucketEventHandlerClient"></a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.IBucketEventHandlerClient">IBucketEventHandlerClient</a>

Represents a resource with an inflight "handle" method that can be passed to the bucket events.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.IBucketEventHandlerClient.handle">handle</a></code> | Function that will be called when an event notification is fired. |

---

##### `handle` <a name="handle" id="@winglang/sdk.cloud.IBucketEventHandlerClient.handle"></a>

```wing
handle(key: str, type: BucketEventType): void
```

**Inflight client:** [true](#true)

Function that will be called when an event notification is fired.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.cloud.IBucketEventHandlerClient.handle.parameter.key"></a>

- *Type:* str

---

###### `type`<sup>Required</sup> <a name="type" id="@winglang/sdk.cloud.IBucketEventHandlerClient.handle.parameter.type"></a>

- *Type:* <a href="#@winglang/sdk.cloud.BucketEventType">BucketEventType</a>

---


### ICounterClient <a name="ICounterClient" id="@winglang/sdk.cloud.ICounterClient"></a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.ICounterClient">ICounterClient</a>

Inflight interface for `Counter`.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.ICounterClient.dec">dec</a></code> | Decrement the counter, returning the previous value. |
| <code><a href="#@winglang/sdk.cloud.ICounterClient.inc">inc</a></code> | Increments the counter atomically by a certain amount and returns the previous value. |
| <code><a href="#@winglang/sdk.cloud.ICounterClient.peek">peek</a></code> | Get the current value of the counter. |
| <code><a href="#@winglang/sdk.cloud.ICounterClient.set">set</a></code> | Set a counter to a given value. |

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

##### `set` <a name="set" id="@winglang/sdk.cloud.ICounterClient.set"></a>

```wing
set(value: num): void
```

**Inflight client:** [true](#true)

Set a counter to a given value.

###### `value`<sup>Required</sup> <a name="value" id="@winglang/sdk.cloud.ICounterClient.set.parameter.value"></a>

- *Type:* num

new value.

---


### IFunctionClient <a name="IFunctionClient" id="@winglang/sdk.cloud.IFunctionClient"></a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.IFunctionClient">IFunctionClient</a>

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

- *Extends:* <a href="#@winglang/sdk.std.IResource">IResource</a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.IFunctionHandler">IFunctionHandler</a>

**Inflight client:** [@winglang/sdk.cloud.IFunctionHandlerClient](#@winglang/sdk.cloud.IFunctionHandlerClient)

Represents a resource with an inflight "handle" method that can be used to create a `cloud.Function`.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.IFunctionHandler.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.cloud.IFunctionHandler.property.display">display</a></code> | <code><a href="#@winglang/sdk.std.Display">Display</a></code> | Information on how to display a resource in the UI. |

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

- *Type:* <a href="#@winglang/sdk.std.Display">Display</a>

Information on how to display a resource in the UI.

---

### IFunctionHandlerClient <a name="IFunctionHandlerClient" id="@winglang/sdk.cloud.IFunctionHandlerClient"></a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.IFunctionHandlerClient">IFunctionHandlerClient</a>

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


### IInflightHost <a name="IInflightHost" id="@winglang/sdk.std.IInflightHost"></a>

- *Extends:* <a href="#@winglang/sdk.std.IResource">IResource</a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.Function">Function</a>, <a href="#@winglang/sdk.std.Test">Test</a>, <a href="#@winglang/sdk.std.IInflightHost">IInflightHost</a>

A resource that can run inflight code.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.std.IInflightHost.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.std.IInflightHost.property.display">display</a></code> | <code><a href="#@winglang/sdk.std.Display">Display</a></code> | Information on how to display a resource in the UI. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.std.IInflightHost.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `display`<sup>Required</sup> <a name="display" id="@winglang/sdk.std.IInflightHost.property.display"></a>

```wing
display: Display;
```

- *Type:* <a href="#@winglang/sdk.std.Display">Display</a>

Information on how to display a resource in the UI.

---

### IQueueAddConsumerHandler <a name="IQueueAddConsumerHandler" id="@winglang/sdk.cloud.IQueueAddConsumerHandler"></a>

- *Extends:* <a href="#@winglang/sdk.std.IResource">IResource</a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.IQueueAddConsumerHandler">IQueueAddConsumerHandler</a>

**Inflight client:** [@winglang/sdk.cloud.IQueueAddConsumerHandlerClient](#@winglang/sdk.cloud.IQueueAddConsumerHandlerClient)

Represents a resource with an inflight "handle" method that can be passed to `Queue.addConsumer`.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.IQueueAddConsumerHandler.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.cloud.IQueueAddConsumerHandler.property.display">display</a></code> | <code><a href="#@winglang/sdk.std.Display">Display</a></code> | Information on how to display a resource in the UI. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.cloud.IQueueAddConsumerHandler.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `display`<sup>Required</sup> <a name="display" id="@winglang/sdk.cloud.IQueueAddConsumerHandler.property.display"></a>

```wing
display: Display;
```

- *Type:* <a href="#@winglang/sdk.std.Display">Display</a>

Information on how to display a resource in the UI.

---

### IQueueAddConsumerHandlerClient <a name="IQueueAddConsumerHandlerClient" id="@winglang/sdk.cloud.IQueueAddConsumerHandlerClient"></a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.IQueueAddConsumerHandlerClient">IQueueAddConsumerHandlerClient</a>

Inflight client for `IQueueAddConsumerHandler`.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.IQueueAddConsumerHandlerClient.handle">handle</a></code> | Function that will be called when a message is received from the queue. |

---

##### `handle` <a name="handle" id="@winglang/sdk.cloud.IQueueAddConsumerHandlerClient.handle"></a>

```wing
handle(message: str): void
```

**Inflight client:** [true](#true)

Function that will be called when a message is received from the queue.

###### `message`<sup>Required</sup> <a name="message" id="@winglang/sdk.cloud.IQueueAddConsumerHandlerClient.handle.parameter.message"></a>

- *Type:* str

---


### IQueueClient <a name="IQueueClient" id="@winglang/sdk.cloud.IQueueClient"></a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.IQueueClient">IQueueClient</a>

Inflight interface for `Queue`.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.IQueueClient.approxSize">approxSize</a></code> | Retrieve the approximate number of messages in the queue. |
| <code><a href="#@winglang/sdk.cloud.IQueueClient.pop">pop</a></code> | Pop a message from the queue. |
| <code><a href="#@winglang/sdk.cloud.IQueueClient.purge">purge</a></code> | Purge all of the messages in the queue. |
| <code><a href="#@winglang/sdk.cloud.IQueueClient.push">push</a></code> | Push a message to the queue. |

---

##### `approxSize` <a name="approxSize" id="@winglang/sdk.cloud.IQueueClient.approxSize"></a>

```wing
approxSize(): num
```

**Inflight client:** [true](#true)

Retrieve the approximate number of messages in the queue.

##### `pop` <a name="pop" id="@winglang/sdk.cloud.IQueueClient.pop"></a>

```wing
pop(): str
```

**Inflight client:** [true](#true)

Pop a message from the queue.

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


### IResource <a name="IResource" id="@winglang/sdk.std.IResource"></a>

- *Extends:* <a href="#@winglang/sdk.core.IInspectable">IInspectable</a>, constructs.IConstruct

- *Implemented By:* <a href="#@winglang/sdk.cloud.Api">Api</a>, <a href="#@winglang/sdk.cloud.Bucket">Bucket</a>, <a href="#@winglang/sdk.cloud.Counter">Counter</a>, <a href="#@winglang/sdk.cloud.Function">Function</a>, <a href="#@winglang/sdk.cloud.Queue">Queue</a>, <a href="#@winglang/sdk.cloud.Schedule">Schedule</a>, <a href="#@winglang/sdk.cloud.Secret">Secret</a>, <a href="#@winglang/sdk.cloud.Service">Service</a>, <a href="#@winglang/sdk.cloud.Table">Table</a>, <a href="#@winglang/sdk.cloud.TestRunner">TestRunner</a>, <a href="#@winglang/sdk.cloud.Topic">Topic</a>, <a href="#@winglang/sdk.cloud.Website">Website</a>, <a href="#@winglang/sdk.redis.Redis">Redis</a>, <a href="#@winglang/sdk.std.Resource">Resource</a>, <a href="#@winglang/sdk.std.Test">Test</a>, <a href="#@winglang/sdk.cloud.IApiEndpointHandler">IApiEndpointHandler</a>, <a href="#@winglang/sdk.cloud.IBucketEventHandler">IBucketEventHandler</a>, <a href="#@winglang/sdk.cloud.IFunctionHandler">IFunctionHandler</a>, <a href="#@winglang/sdk.cloud.IQueueAddConsumerHandler">IQueueAddConsumerHandler</a>, <a href="#@winglang/sdk.cloud.IScheduleOnTickHandler">IScheduleOnTickHandler</a>, <a href="#@winglang/sdk.cloud.IServiceOnEventHandler">IServiceOnEventHandler</a>, <a href="#@winglang/sdk.cloud.ITopicOnMessageHandler">ITopicOnMessageHandler</a>, <a href="#@winglang/sdk.std.IInflightHost">IInflightHost</a>, <a href="#@winglang/sdk.std.IResource">IResource</a>, <a href="#@winglang/sdk.std.ITestHandler">ITestHandler</a>

Abstract interface for `Resource`.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.std.IResource.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.std.IResource.property.display">display</a></code> | <code><a href="#@winglang/sdk.std.Display">Display</a></code> | Information on how to display a resource in the UI. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.std.IResource.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `display`<sup>Required</sup> <a name="display" id="@winglang/sdk.std.IResource.property.display"></a>

```wing
display: Display;
```

- *Type:* <a href="#@winglang/sdk.std.Display">Display</a>

Information on how to display a resource in the UI.

---

### IScheduleClient <a name="IScheduleClient" id="@winglang/sdk.cloud.IScheduleClient"></a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.IScheduleClient">IScheduleClient</a>

Inflight interface for `Schedule`.



### IScheduleOnTickHandler <a name="IScheduleOnTickHandler" id="@winglang/sdk.cloud.IScheduleOnTickHandler"></a>

- *Extends:* <a href="#@winglang/sdk.std.IResource">IResource</a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.IScheduleOnTickHandler">IScheduleOnTickHandler</a>

**Inflight client:** [@winglang/sdk.cloud.IScheduleOnTickHandlerClient](#@winglang/sdk.cloud.IScheduleOnTickHandlerClient)

Represents a resource with an inflight "handle" method that can be passed to `Schedule.on_tick`.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.IScheduleOnTickHandler.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.cloud.IScheduleOnTickHandler.property.display">display</a></code> | <code><a href="#@winglang/sdk.std.Display">Display</a></code> | Information on how to display a resource in the UI. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.cloud.IScheduleOnTickHandler.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `display`<sup>Required</sup> <a name="display" id="@winglang/sdk.cloud.IScheduleOnTickHandler.property.display"></a>

```wing
display: Display;
```

- *Type:* <a href="#@winglang/sdk.std.Display">Display</a>

Information on how to display a resource in the UI.

---

### IScheduleOnTickHandlerClient <a name="IScheduleOnTickHandlerClient" id="@winglang/sdk.cloud.IScheduleOnTickHandlerClient"></a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.IScheduleOnTickHandlerClient">IScheduleOnTickHandlerClient</a>

Inflight client for `IScheduleOnTickHandler`.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.IScheduleOnTickHandlerClient.handle">handle</a></code> | Function that will be called when a message is received from the schedule. |

---

##### `handle` <a name="handle" id="@winglang/sdk.cloud.IScheduleOnTickHandlerClient.handle"></a>

```wing
handle(): void
```

**Inflight client:** [true](#true)

Function that will be called when a message is received from the schedule.


### ISecretClient <a name="ISecretClient" id="@winglang/sdk.cloud.ISecretClient"></a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.ISecretClient">ISecretClient</a>

Inflight interface for `Secret`.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.ISecretClient.value">value</a></code> | Retrieve the value of the secret. |
| <code><a href="#@winglang/sdk.cloud.ISecretClient.valueJson">valueJson</a></code> | Retrieve the Json value of the secret. |

---

##### `value` <a name="value" id="@winglang/sdk.cloud.ISecretClient.value"></a>

```wing
value(options?: GetSecretValueOptions): str
```

**Inflight client:** [true](#true)

Retrieve the value of the secret.

###### `options`<sup>Optional</sup> <a name="options" id="@winglang/sdk.cloud.ISecretClient.value.parameter.options"></a>

- *Type:* <a href="#@winglang/sdk.cloud.GetSecretValueOptions">GetSecretValueOptions</a>

---

##### `valueJson` <a name="valueJson" id="@winglang/sdk.cloud.ISecretClient.valueJson"></a>

```wing
valueJson(options?: GetSecretValueOptions): Json
```

**Inflight client:** [true](#true)

Retrieve the Json value of the secret.

###### `options`<sup>Optional</sup> <a name="options" id="@winglang/sdk.cloud.ISecretClient.valueJson.parameter.options"></a>

- *Type:* <a href="#@winglang/sdk.cloud.GetSecretValueOptions">GetSecretValueOptions</a>

---


### IServiceClient <a name="IServiceClient" id="@winglang/sdk.cloud.IServiceClient"></a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.IServiceClient">IServiceClient</a>

Inflight interface for `Service`.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.IServiceClient.start">start</a></code> | Start the service. |
| <code><a href="#@winglang/sdk.cloud.IServiceClient.stop">stop</a></code> | Stop the service. |

---

##### `start` <a name="start" id="@winglang/sdk.cloud.IServiceClient.start"></a>

```wing
start(): void
```

**Inflight client:** [true](#true)

Start the service.

##### `stop` <a name="stop" id="@winglang/sdk.cloud.IServiceClient.stop"></a>

```wing
stop(): void
```

**Inflight client:** [true](#true)

Stop the service.


### IServiceOnEventClient <a name="IServiceOnEventClient" id="@winglang/sdk.cloud.IServiceOnEventClient"></a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.IServiceOnEventClient">IServiceOnEventClient</a>

Inflight client for `IServiceOnEventHandler`.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.IServiceOnEventClient.handle">handle</a></code> | Function that will be called for service events. |

---

##### `handle` <a name="handle" id="@winglang/sdk.cloud.IServiceOnEventClient.handle"></a>

```wing
handle(): void
```

**Inflight client:** [true](#true)

Function that will be called for service events.


### IServiceOnEventHandler <a name="IServiceOnEventHandler" id="@winglang/sdk.cloud.IServiceOnEventHandler"></a>

- *Extends:* <a href="#@winglang/sdk.std.IResource">IResource</a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.IServiceOnEventHandler">IServiceOnEventHandler</a>

**Inflight client:** [@winglang/sdk.cloud.IServiceOnEventClient](#@winglang/sdk.cloud.IServiceOnEventClient)

Represents a resource with an inflight "handle" method that can be passed to `ServiceProps.on_start` || `ServiceProps.on_stop`.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.IServiceOnEventHandler.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.cloud.IServiceOnEventHandler.property.display">display</a></code> | <code><a href="#@winglang/sdk.std.Display">Display</a></code> | Information on how to display a resource in the UI. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.cloud.IServiceOnEventHandler.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `display`<sup>Required</sup> <a name="display" id="@winglang/sdk.cloud.IServiceOnEventHandler.property.display"></a>

```wing
display: Display;
```

- *Type:* <a href="#@winglang/sdk.std.Display">Display</a>

Information on how to display a resource in the UI.

---

### ITableClient <a name="ITableClient" id="@winglang/sdk.cloud.ITableClient"></a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.ITableClient">ITableClient</a>

Inflight interface for `Table`.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.ITableClient.delete">delete</a></code> | Delete a row from the table, by primary key. |
| <code><a href="#@winglang/sdk.cloud.ITableClient.get">get</a></code> | Get a row from the table, by primary key. |
| <code><a href="#@winglang/sdk.cloud.ITableClient.insert">insert</a></code> | Insert a row into the table. |
| <code><a href="#@winglang/sdk.cloud.ITableClient.list">list</a></code> | List all rows in the table. |
| <code><a href="#@winglang/sdk.cloud.ITableClient.update">update</a></code> | Update a row in the table. |

---

##### `delete` <a name="delete" id="@winglang/sdk.cloud.ITableClient.delete"></a>

```wing
delete(key: str): void
```

**Inflight client:** [true](#true)

Delete a row from the table, by primary key.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.cloud.ITableClient.delete.parameter.key"></a>

- *Type:* str

primary key to delete the row.

---

##### `get` <a name="get" id="@winglang/sdk.cloud.ITableClient.get"></a>

```wing
get(key: str): Json
```

**Inflight client:** [true](#true)

Get a row from the table, by primary key.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.cloud.ITableClient.get.parameter.key"></a>

- *Type:* str

primary key to search.

---

##### `insert` <a name="insert" id="@winglang/sdk.cloud.ITableClient.insert"></a>

```wing
insert(key: str, row: Json): void
```

**Inflight client:** [true](#true)

Insert a row into the table.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.cloud.ITableClient.insert.parameter.key"></a>

- *Type:* str

primary key to insert the row.

---

###### `row`<sup>Required</sup> <a name="row" id="@winglang/sdk.cloud.ITableClient.insert.parameter.row"></a>

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

data to be inserted.

---

##### `list` <a name="list" id="@winglang/sdk.cloud.ITableClient.list"></a>

```wing
list(): MutArray<Json>
```

**Inflight client:** [true](#true)

List all rows in the table.

##### `update` <a name="update" id="@winglang/sdk.cloud.ITableClient.update"></a>

```wing
update(key: str, row: Json): void
```

**Inflight client:** [true](#true)

Update a row in the table.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.cloud.ITableClient.update.parameter.key"></a>

- *Type:* str

primary key to update the row.

---

###### `row`<sup>Required</sup> <a name="row" id="@winglang/sdk.cloud.ITableClient.update.parameter.row"></a>

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

data to be updated.

---


### ITestHandler <a name="ITestHandler" id="@winglang/sdk.std.ITestHandler"></a>

- *Extends:* <a href="#@winglang/sdk.std.IResource">IResource</a>

- *Implemented By:* <a href="#@winglang/sdk.std.ITestHandler">ITestHandler</a>

**Inflight client:** [@winglang/sdk.std.ITestHandlerClient](#@winglang/sdk.std.ITestHandlerClient)

Interface with an inflight "handle" method that can be used to construct a `std.Test`.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.std.ITestHandler.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.std.ITestHandler.property.display">display</a></code> | <code><a href="#@winglang/sdk.std.Display">Display</a></code> | Information on how to display a resource in the UI. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.std.ITestHandler.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `display`<sup>Required</sup> <a name="display" id="@winglang/sdk.std.ITestHandler.property.display"></a>

```wing
display: Display;
```

- *Type:* <a href="#@winglang/sdk.std.Display">Display</a>

Information on how to display a resource in the UI.

---

### ITestHandlerClient <a name="ITestHandlerClient" id="@winglang/sdk.std.ITestHandlerClient"></a>

- *Implemented By:* <a href="#@winglang/sdk.std.ITestHandlerClient">ITestHandlerClient</a>

Inflight client for `ITestHandler`.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.std.ITestHandlerClient.handle">handle</a></code> | Inflight function that will be called when the test is run. |

---

##### `handle` <a name="handle" id="@winglang/sdk.std.ITestHandlerClient.handle"></a>

```wing
handle(): void
```

**Inflight client:** [true](#true)

Inflight function that will be called when the test is run.


### ITestRunnerClient <a name="ITestRunnerClient" id="@winglang/sdk.cloud.ITestRunnerClient"></a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.ITestRunnerClient">ITestRunnerClient</a>

Inflight interface for `TestRunner`.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.ITestRunnerClient.listTests">listTests</a></code> | List all tests available for this test engine. |
| <code><a href="#@winglang/sdk.cloud.ITestRunnerClient.runTest">runTest</a></code> | Run a test with a given path and return the result. |

---

##### `listTests` <a name="listTests" id="@winglang/sdk.cloud.ITestRunnerClient.listTests"></a>

```wing
listTests(): MutArray<str>
```

**Inflight client:** [true](#true)

List all tests available for this test engine.

##### `runTest` <a name="runTest" id="@winglang/sdk.cloud.ITestRunnerClient.runTest"></a>

```wing
runTest(path: str): TestResult
```

**Inflight client:** [true](#true)

Run a test with a given path and return the result.

###### `path`<sup>Required</sup> <a name="path" id="@winglang/sdk.cloud.ITestRunnerClient.runTest.parameter.path"></a>

- *Type:* str

---


### ITopicClient <a name="ITopicClient" id="@winglang/sdk.cloud.ITopicClient"></a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.ITopicClient">ITopicClient</a>

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

- *Extends:* <a href="#@winglang/sdk.std.IResource">IResource</a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.ITopicOnMessageHandler">ITopicOnMessageHandler</a>

**Inflight client:** [@winglang/sdk.cloud.ITopicOnMessageHandlerClient](#@winglang/sdk.cloud.ITopicOnMessageHandlerClient)

Represents a resource with an inflight "handle" method that can be passed to `Topic.on_message`.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.ITopicOnMessageHandler.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.cloud.ITopicOnMessageHandler.property.display">display</a></code> | <code><a href="#@winglang/sdk.std.Display">Display</a></code> | Information on how to display a resource in the UI. |

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

- *Type:* <a href="#@winglang/sdk.std.Display">Display</a>

Information on how to display a resource in the UI.

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
handle(event: str): void
```

**Inflight client:** [true](#true)

Function that will be called when a message is received from the topic.

###### `event`<sup>Required</sup> <a name="event" id="@winglang/sdk.cloud.ITopicOnMessageHandlerClient.handle.parameter.event"></a>

- *Type:* str

---


### IWebsiteClient <a name="IWebsiteClient" id="@winglang/sdk.cloud.IWebsiteClient"></a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.IWebsiteClient">IWebsiteClient</a>

Inflight methods and members of `cloud.Website`.



## Enums <a name="Enums" id="Enums"></a>

### BucketEventType <a name="BucketEventType" id="@winglang/sdk.cloud.BucketEventType"></a>

bucket events to subscribe to.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.BucketEventType.CREATE">CREATE</a></code> | create. |
| <code><a href="#@winglang/sdk.cloud.BucketEventType.DELETE">DELETE</a></code> | delete. |
| <code><a href="#@winglang/sdk.cloud.BucketEventType.UPDATE">UPDATE</a></code> | update. |

---

##### `CREATE` <a name="CREATE" id="@winglang/sdk.cloud.BucketEventType.CREATE"></a>

create.

---


##### `DELETE` <a name="DELETE" id="@winglang/sdk.cloud.BucketEventType.DELETE"></a>

delete.

---


##### `UPDATE` <a name="UPDATE" id="@winglang/sdk.cloud.BucketEventType.UPDATE"></a>

update.

---


### ColumnType <a name="ColumnType" id="@winglang/sdk.cloud.ColumnType"></a>

Table column types.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.ColumnType.STRING">STRING</a></code> | string type. |
| <code><a href="#@winglang/sdk.cloud.ColumnType.NUMBER">NUMBER</a></code> | number type. |
| <code><a href="#@winglang/sdk.cloud.ColumnType.BOOLEAN">BOOLEAN</a></code> | bool type. |
| <code><a href="#@winglang/sdk.cloud.ColumnType.DATE">DATE</a></code> | date type. |
| <code><a href="#@winglang/sdk.cloud.ColumnType.JSON">JSON</a></code> | json type. |

---

##### `STRING` <a name="STRING" id="@winglang/sdk.cloud.ColumnType.STRING"></a>

string type.

---


##### `NUMBER` <a name="NUMBER" id="@winglang/sdk.cloud.ColumnType.NUMBER"></a>

number type.

---


##### `BOOLEAN` <a name="BOOLEAN" id="@winglang/sdk.cloud.ColumnType.BOOLEAN"></a>

bool type.

---


##### `DATE` <a name="DATE" id="@winglang/sdk.cloud.ColumnType.DATE"></a>

date type.

---


##### `JSON` <a name="JSON" id="@winglang/sdk.cloud.ColumnType.JSON"></a>

json type.

---


### Direction <a name="Direction" id="@winglang/sdk.std.Direction"></a>

The direction of a connection.

Visually speaking, if a resource A has an outbound connection with resource B,
the arrow would point from A to B, and vice versa for inbound connections.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.std.Direction.OUTBOUND">OUTBOUND</a></code> | Indicates that this resource calls, triggers, or references the resource it is connected to. |
| <code><a href="#@winglang/sdk.std.Direction.INBOUND">INBOUND</a></code> | Indicates that this resource is called, triggered, or referenced by the resource it is connected to. |

---

##### `OUTBOUND` <a name="OUTBOUND" id="@winglang/sdk.std.Direction.OUTBOUND"></a>

Indicates that this resource calls, triggers, or references the resource it is connected to.

---


##### `INBOUND` <a name="INBOUND" id="@winglang/sdk.std.Direction.INBOUND"></a>

Indicates that this resource is called, triggered, or referenced by the resource it is connected to.

---


### HttpMethod <a name="HttpMethod" id="@winglang/sdk.cloud.HttpMethod"></a>

Allowed HTTP methods for a endpoint.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.HttpMethod.GET">GET</a></code> | Get. |
| <code><a href="#@winglang/sdk.cloud.HttpMethod.HEAD">HEAD</a></code> | Head. |
| <code><a href="#@winglang/sdk.cloud.HttpMethod.POST">POST</a></code> | Post. |
| <code><a href="#@winglang/sdk.cloud.HttpMethod.PUT">PUT</a></code> | Put. |
| <code><a href="#@winglang/sdk.cloud.HttpMethod.DELETE">DELETE</a></code> | Delete. |
| <code><a href="#@winglang/sdk.cloud.HttpMethod.CONNECT">CONNECT</a></code> | Connect. |
| <code><a href="#@winglang/sdk.cloud.HttpMethod.OPTIONS">OPTIONS</a></code> | Options. |
| <code><a href="#@winglang/sdk.cloud.HttpMethod.PATCH">PATCH</a></code> | Patch. |

---

##### `GET` <a name="GET" id="@winglang/sdk.cloud.HttpMethod.GET"></a>

Get.

---


##### `HEAD` <a name="HEAD" id="@winglang/sdk.cloud.HttpMethod.HEAD"></a>

Head.

---


##### `POST` <a name="POST" id="@winglang/sdk.cloud.HttpMethod.POST"></a>

Post.

---


##### `PUT` <a name="PUT" id="@winglang/sdk.cloud.HttpMethod.PUT"></a>

Put.

---


##### `DELETE` <a name="DELETE" id="@winglang/sdk.cloud.HttpMethod.DELETE"></a>

Delete.

---


##### `CONNECT` <a name="CONNECT" id="@winglang/sdk.cloud.HttpMethod.CONNECT"></a>

Connect.

---


##### `OPTIONS` <a name="OPTIONS" id="@winglang/sdk.cloud.HttpMethod.OPTIONS"></a>

Options.

---


##### `PATCH` <a name="PATCH" id="@winglang/sdk.cloud.HttpMethod.PATCH"></a>

Patch.

---


### TraceType <a name="TraceType" id="@winglang/sdk.cloud.TraceType"></a>

The type of a trace.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.TraceType.RESOURCE">RESOURCE</a></code> | A trace representing a resource activity. |
| <code><a href="#@winglang/sdk.cloud.TraceType.LOG">LOG</a></code> | A trace representing a message emitted by the logger. |

---

##### `RESOURCE` <a name="RESOURCE" id="@winglang/sdk.cloud.TraceType.RESOURCE"></a>

A trace representing a resource activity.

---


##### `LOG` <a name="LOG" id="@winglang/sdk.cloud.TraceType.LOG"></a>

A trace representing a message emitted by the logger.

---

