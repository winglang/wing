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
| <code><a href="#@winglang/sdk.cloud.Api.connect">connect</a></code> | Add a inflight handler to the api for CONNECT requests on the given route. |
| <code><a href="#@winglang/sdk.cloud.Api.delete">delete</a></code> | Add a inflight handler to the api for DELETE requests on the given route. |
| <code><a href="#@winglang/sdk.cloud.Api.get">get</a></code> | Add a inflight handler to the api for GET requests on the given route. |
| <code><a href="#@winglang/sdk.cloud.Api.head">head</a></code> | Add a inflight handler to the api for HEAD requests on the given route. |
| <code><a href="#@winglang/sdk.cloud.Api.options">options</a></code> | Add a inflight handler to the api for OPTIONS requests on the given route. |
| <code><a href="#@winglang/sdk.cloud.Api.patch">patch</a></code> | Add a inflight handler to the api for PATCH requests on the given route. |
| <code><a href="#@winglang/sdk.cloud.Api.post">post</a></code> | Add a inflight handler to the api for POST requests on the given route. |
| <code><a href="#@winglang/sdk.cloud.Api.put">put</a></code> | Add a inflight handler to the api for PUT requests on the given route. |

---

##### `connect` <a name="connect" id="@winglang/sdk.cloud.Api.connect"></a>

```wing
connect(route: str, inflight: ~Inflight, props?: ApiConnectProps): void
```

Add a inflight handler to the api for CONNECT requests on the given route.

###### `route`<sup>Required</sup> <a name="route" id="@winglang/sdk.cloud.Api.connect.parameter.route"></a>

- *Type:* str

The route to handle CONNECT requests for.

---

###### `inflight`<sup>Required</sup> <a name="inflight" id="@winglang/sdk.cloud.Api.connect.parameter.inflight"></a>

- *Type:* <a href="#@winglang/sdk.core.Inflight">Inflight</a>

The function to handle the request.

---

###### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Api.connect.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.cloud.ApiConnectProps">ApiConnectProps</a>

Options for the route.

---

##### `delete` <a name="delete" id="@winglang/sdk.cloud.Api.delete"></a>

```wing
delete(route: str, inflight: ~Inflight, props?: ApiDeleteProps): void
```

Add a inflight handler to the api for DELETE requests on the given route.

###### `route`<sup>Required</sup> <a name="route" id="@winglang/sdk.cloud.Api.delete.parameter.route"></a>

- *Type:* str

The route to handle DELETE requests for.

---

###### `inflight`<sup>Required</sup> <a name="inflight" id="@winglang/sdk.cloud.Api.delete.parameter.inflight"></a>

- *Type:* <a href="#@winglang/sdk.core.Inflight">Inflight</a>

The function to handle the request.

---

###### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Api.delete.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.cloud.ApiDeleteProps">ApiDeleteProps</a>

Options for the route.

---

##### `get` <a name="get" id="@winglang/sdk.cloud.Api.get"></a>

```wing
get(route: str, inflight: ~Inflight, props?: ApiGetProps): void
```

Add a inflight handler to the api for GET requests on the given route.

###### `route`<sup>Required</sup> <a name="route" id="@winglang/sdk.cloud.Api.get.parameter.route"></a>

- *Type:* str

The route to handle GET requests for.

---

###### `inflight`<sup>Required</sup> <a name="inflight" id="@winglang/sdk.cloud.Api.get.parameter.inflight"></a>

- *Type:* <a href="#@winglang/sdk.core.Inflight">Inflight</a>

The function to handle the request.

---

###### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Api.get.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.cloud.ApiGetProps">ApiGetProps</a>

Options for the route.

---

##### `head` <a name="head" id="@winglang/sdk.cloud.Api.head"></a>

```wing
head(route: str, inflight: ~Inflight, props?: ApiHeadProps): void
```

Add a inflight handler to the api for HEAD requests on the given route.

###### `route`<sup>Required</sup> <a name="route" id="@winglang/sdk.cloud.Api.head.parameter.route"></a>

- *Type:* str

The route to handle HEAD requests for.

---

###### `inflight`<sup>Required</sup> <a name="inflight" id="@winglang/sdk.cloud.Api.head.parameter.inflight"></a>

- *Type:* <a href="#@winglang/sdk.core.Inflight">Inflight</a>

The function to handle the request.

---

###### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Api.head.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.cloud.ApiHeadProps">ApiHeadProps</a>

Options for the route.

---

##### `options` <a name="options" id="@winglang/sdk.cloud.Api.options"></a>

```wing
options(route: str, inflight: ~Inflight, props?: ApiOptionsProps): void
```

Add a inflight handler to the api for OPTIONS requests on the given route.

###### `route`<sup>Required</sup> <a name="route" id="@winglang/sdk.cloud.Api.options.parameter.route"></a>

- *Type:* str

The route to handle OPTIONS requests for.

---

###### `inflight`<sup>Required</sup> <a name="inflight" id="@winglang/sdk.cloud.Api.options.parameter.inflight"></a>

- *Type:* <a href="#@winglang/sdk.core.Inflight">Inflight</a>

The function to handle the request.

---

###### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Api.options.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.cloud.ApiOptionsProps">ApiOptionsProps</a>

Options for the route.

---

##### `patch` <a name="patch" id="@winglang/sdk.cloud.Api.patch"></a>

```wing
patch(route: str, inflight: ~Inflight, props?: ApiPatchProps): void
```

Add a inflight handler to the api for PATCH requests on the given route.

###### `route`<sup>Required</sup> <a name="route" id="@winglang/sdk.cloud.Api.patch.parameter.route"></a>

- *Type:* str

The route to handle PATCH requests for.

---

###### `inflight`<sup>Required</sup> <a name="inflight" id="@winglang/sdk.cloud.Api.patch.parameter.inflight"></a>

- *Type:* <a href="#@winglang/sdk.core.Inflight">Inflight</a>

The function to handle the request.

---

###### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Api.patch.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.cloud.ApiPatchProps">ApiPatchProps</a>

Options for the route.

---

##### `post` <a name="post" id="@winglang/sdk.cloud.Api.post"></a>

```wing
post(route: str, inflight: ~Inflight, props?: ApiPostProps): void
```

Add a inflight handler to the api for POST requests on the given route.

###### `route`<sup>Required</sup> <a name="route" id="@winglang/sdk.cloud.Api.post.parameter.route"></a>

- *Type:* str

The route to handle POST requests for.

---

###### `inflight`<sup>Required</sup> <a name="inflight" id="@winglang/sdk.cloud.Api.post.parameter.inflight"></a>

- *Type:* <a href="#@winglang/sdk.core.Inflight">Inflight</a>

The function to handle the request.

---

###### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Api.post.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.cloud.ApiPostProps">ApiPostProps</a>

Options for the route.

---

##### `put` <a name="put" id="@winglang/sdk.cloud.Api.put"></a>

```wing
put(route: str, inflight: ~Inflight, props?: ApiPutProps): void
```

Add a inflight handler to the api for PUT requests on the given route.

###### `route`<sup>Required</sup> <a name="route" id="@winglang/sdk.cloud.Api.put.parameter.route"></a>

- *Type:* str

The route to handle PUT requests for.

---

###### `inflight`<sup>Required</sup> <a name="inflight" id="@winglang/sdk.cloud.Api.put.parameter.inflight"></a>

- *Type:* <a href="#@winglang/sdk.core.Inflight">Inflight</a>

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
| <code><a href="#@winglang/sdk.cloud.Api.property.display">display</a></code> | <code><a href="#@winglang/sdk.core.Display">Display</a></code> | Information on how to display a resource in the UI. |
| <code><a href="#@winglang/sdk.cloud.Api.property.stateful">stateful</a></code> | <code>bool</code> | Whether a resource is stateful, i.e. it stores information that is not defined by your application. |

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

- *Type:* <a href="#@winglang/sdk.core.Display">Display</a>

Information on how to display a resource in the UI.

---

##### `stateful`<sup>Required</sup> <a name="stateful" id="@winglang/sdk.cloud.Api.property.stateful"></a>

```wing
stateful: bool;
```

- *Type:* bool

Whether a resource is stateful, i.e. it stores information that is not defined by your application.

A non-stateful resource does not remember information about past
transactions or events, and can typically be replaced by a cloud provider
with a fresh copy without any consequences.

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
| <code><a href="#@winglang/sdk.cloud.Bucket.addObject">add_object</a></code> | Add a file to the bucket that is uploaded when the app is deployed. |

---

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


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Bucket.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.cloud.Bucket.property.display">display</a></code> | <code><a href="#@winglang/sdk.core.Display">Display</a></code> | Information on how to display a resource in the UI. |
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

- *Type:* <a href="#@winglang/sdk.core.Display">Display</a>

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
| <code><a href="#@winglang/sdk.cloud.Counter.property.display">display</a></code> | <code><a href="#@winglang/sdk.core.Display">Display</a></code> | Information on how to display a resource in the UI. |
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

- *Type:* <a href="#@winglang/sdk.core.Display">Display</a>

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

- *Implements:* <a href="#@winglang/sdk.core.IInflightHost">IInflightHost</a>

**Inflight client:** [@winglang/sdk.cloud.IFunctionClient](#@winglang/sdk.cloud.IFunctionClient)

Represents a function.

#### Initializers <a name="Initializers" id="@winglang/sdk.cloud.Function.Initializer"></a>

```wing
bring cloud;

new cloud.Function(inflight: ~Inflight, props?: FunctionProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Function.Initializer.parameter.inflight">inflight</a></code> | <code><a href="#@winglang/sdk.core.Inflight">Inflight</a></code> | *No description.* |
| <code><a href="#@winglang/sdk.cloud.Function.Initializer.parameter.props">props</a></code> | <code><a href="#@winglang/sdk.cloud.FunctionProps">FunctionProps</a></code> | *No description.* |

---

##### `inflight`<sup>Required</sup> <a name="inflight" id="@winglang/sdk.cloud.Function.Initializer.parameter.inflight"></a>

- *Type:* <a href="#@winglang/sdk.core.Inflight">Inflight</a>

---

##### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Function.Initializer.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.cloud.FunctionProps">FunctionProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.Function.addEnvironment">add_environment</a></code> | Add an environment variable to the function. |

---

##### `add_environment` <a name="add_environment" id="@winglang/sdk.cloud.Function.addEnvironment"></a>

```wing
add_environment(name: str, value: str): void
```

Add an environment variable to the function.

###### `name`<sup>Required</sup> <a name="name" id="@winglang/sdk.cloud.Function.addEnvironment.parameter.name"></a>

- *Type:* str

---

###### `value`<sup>Required</sup> <a name="value" id="@winglang/sdk.cloud.Function.addEnvironment.parameter.value"></a>

- *Type:* str

---


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Function.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.cloud.Function.property.display">display</a></code> | <code><a href="#@winglang/sdk.core.Display">Display</a></code> | Information on how to display a resource in the UI. |
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

- *Type:* <a href="#@winglang/sdk.core.Display">Display</a>

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


### JsonFile <a name="JsonFile" id="@winglang/sdk.fs.JsonFile"></a>

Represents a text file that should be synthesized in the app's outdir.

#### Initializers <a name="Initializers" id="@winglang/sdk.fs.JsonFile.Initializer"></a>

```wing
bring fs;

new fs.JsonFile(file_path: str, props: JsonFileProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.fs.JsonFile.Initializer.parameter.filePath">file_path</a></code> | <code>str</code> | *No description.* |
| <code><a href="#@winglang/sdk.fs.JsonFile.Initializer.parameter.props">props</a></code> | <code><a href="#@winglang/sdk.fs.JsonFileProps">JsonFileProps</a></code> | *No description.* |

---

##### `file_path`<sup>Required</sup> <a name="file_path" id="@winglang/sdk.fs.JsonFile.Initializer.parameter.filePath"></a>

- *Type:* str

---

##### `props`<sup>Required</sup> <a name="props" id="@winglang/sdk.fs.JsonFile.Initializer.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.fs.JsonFileProps">JsonFileProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.fs.JsonFile.save">save</a></code> | Render the contents of the file and save it to the user's file system. |

---

##### `save` <a name="save" id="@winglang/sdk.fs.JsonFile.save"></a>

```wing
save(outdir: str): void
```

Render the contents of the file and save it to the user's file system.

###### `outdir`<sup>Required</sup> <a name="outdir" id="@winglang/sdk.fs.JsonFile.save.parameter.outdir"></a>

- *Type:* str

---


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.fs.JsonFile.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.fs.JsonFile.property.filePath">file_path</a></code> | <code>str</code> | The file's relative path to the output directory. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.fs.JsonFile.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `file_path`<sup>Required</sup> <a name="file_path" id="@winglang/sdk.fs.JsonFile.property.filePath"></a>

```wing
file_path: str;
```

- *Type:* str

The file's relative path to the output directory.

---


### Logger <a name="Logger" id="@winglang/sdk.cloud.Logger"></a>

**Inflight client:** [@winglang/sdk.cloud.ILoggerClient](#@winglang/sdk.cloud.ILoggerClient)

A cloud logging facility.

#### Initializers <a name="Initializers" id="@winglang/sdk.cloud.Logger.Initializer"></a>

```wing
bring cloud;

new cloud.Logger()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.Logger.register">register</a></code> | Create a logger and register it to the given scope. |

---

##### `register` <a name="register" id="@winglang/sdk.cloud.Logger.register"></a>

```wing
bring cloud;

cloud.Logger.register()
```

Create a logger and register it to the given scope.

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Logger.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.cloud.Logger.property.display">display</a></code> | <code><a href="#@winglang/sdk.core.Display">Display</a></code> | Information on how to display a resource in the UI. |
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

- *Type:* <a href="#@winglang/sdk.core.Display">Display</a>

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
| <code><a href="#@winglang/sdk.cloud.Queue.onMessage">on_message</a></code> | Create a function to consume messages from this queue. |

---

##### `on_message` <a name="on_message" id="@winglang/sdk.cloud.Queue.onMessage"></a>

```wing
on_message(inflight: ~Inflight, props?: QueueOnMessageProps): Function
```

Create a function to consume messages from this queue.

###### `inflight`<sup>Required</sup> <a name="inflight" id="@winglang/sdk.cloud.Queue.onMessage.parameter.inflight"></a>

- *Type:* <a href="#@winglang/sdk.core.Inflight">Inflight</a>

---

###### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Queue.onMessage.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.cloud.QueueOnMessageProps">QueueOnMessageProps</a>

---


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Queue.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.cloud.Queue.property.display">display</a></code> | <code><a href="#@winglang/sdk.core.Display">Display</a></code> | Information on how to display a resource in the UI. |
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

- *Type:* <a href="#@winglang/sdk.core.Display">Display</a>

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
| <code><a href="#@winglang/sdk.cloud.Schedule.onTick">on_tick</a></code> | Create a function that runs when receiving the scheduled event. |

---

##### `on_tick` <a name="on_tick" id="@winglang/sdk.cloud.Schedule.onTick"></a>

```wing
on_tick(inflight: ~Inflight, props?: ScheduleOnTickProps): Function
```

Create a function that runs when receiving the scheduled event.

###### `inflight`<sup>Required</sup> <a name="inflight" id="@winglang/sdk.cloud.Schedule.onTick.parameter.inflight"></a>

- *Type:* <a href="#@winglang/sdk.core.Inflight">Inflight</a>

---

###### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Schedule.onTick.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.cloud.ScheduleOnTickProps">ScheduleOnTickProps</a>

---


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Schedule.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.cloud.Schedule.property.display">display</a></code> | <code><a href="#@winglang/sdk.core.Display">Display</a></code> | Information on how to display a resource in the UI. |
| <code><a href="#@winglang/sdk.cloud.Schedule.property.stateful">stateful</a></code> | <code>bool</code> | Whether a resource is stateful, i.e. it stores information that is not defined by your application. |

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

- *Type:* <a href="#@winglang/sdk.core.Display">Display</a>

Information on how to display a resource in the UI.

---

##### `stateful`<sup>Required</sup> <a name="stateful" id="@winglang/sdk.cloud.Schedule.property.stateful"></a>

```wing
stateful: bool;
```

- *Type:* bool

Whether a resource is stateful, i.e. it stores information that is not defined by your application.

A non-stateful resource does not remember information about past
transactions or events, and can typically be replaced by a cloud provider
with a fresh copy without any consequences.

---


### TextFile <a name="TextFile" id="@winglang/sdk.fs.TextFile"></a>

Represents a text file that should be synthesized in the app's outdir.

#### Initializers <a name="Initializers" id="@winglang/sdk.fs.TextFile.Initializer"></a>

```wing
bring fs;

new fs.TextFile(file_path: str, props?: TextFileProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.fs.TextFile.Initializer.parameter.filePath">file_path</a></code> | <code>str</code> | *No description.* |
| <code><a href="#@winglang/sdk.fs.TextFile.Initializer.parameter.props">props</a></code> | <code><a href="#@winglang/sdk.fs.TextFileProps">TextFileProps</a></code> | *No description.* |

---

##### `file_path`<sup>Required</sup> <a name="file_path" id="@winglang/sdk.fs.TextFile.Initializer.parameter.filePath"></a>

- *Type:* str

---

##### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.fs.TextFile.Initializer.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.fs.TextFileProps">TextFileProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.fs.TextFile.save">save</a></code> | Render the contents of the file and save it to the user's file system. |
| <code><a href="#@winglang/sdk.fs.TextFile.addLine">add_line</a></code> | Append a line to the text file's contents. |

---

##### `save` <a name="save" id="@winglang/sdk.fs.TextFile.save"></a>

```wing
save(outdir: str): void
```

Render the contents of the file and save it to the user's file system.

###### `outdir`<sup>Required</sup> <a name="outdir" id="@winglang/sdk.fs.TextFile.save.parameter.outdir"></a>

- *Type:* str

---

##### `add_line` <a name="add_line" id="@winglang/sdk.fs.TextFile.addLine"></a>

```wing
add_line(line: str): void
```

Append a line to the text file's contents.

###### `line`<sup>Required</sup> <a name="line" id="@winglang/sdk.fs.TextFile.addLine.parameter.line"></a>

- *Type:* str

---


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.fs.TextFile.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.fs.TextFile.property.filePath">file_path</a></code> | <code>str</code> | The file's relative path to the output directory. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.fs.TextFile.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `file_path`<sup>Required</sup> <a name="file_path" id="@winglang/sdk.fs.TextFile.property.filePath"></a>

```wing
file_path: str;
```

- *Type:* str

The file's relative path to the output directory.

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
| <code><a href="#@winglang/sdk.cloud.Topic.onMessage">on_message</a></code> | Run an inflight whenever an message is published to the topic. |

---

##### `on_message` <a name="on_message" id="@winglang/sdk.cloud.Topic.onMessage"></a>

```wing
on_message(inflight: ~Inflight, props?: TopicOnMessageProps): Function
```

Run an inflight whenever an message is published to the topic.

###### `inflight`<sup>Required</sup> <a name="inflight" id="@winglang/sdk.cloud.Topic.onMessage.parameter.inflight"></a>

- *Type:* <a href="#@winglang/sdk.core.Inflight">Inflight</a>

---

###### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Topic.onMessage.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.cloud.TopicOnMessageProps">TopicOnMessageProps</a>

---


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Topic.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.cloud.Topic.property.display">display</a></code> | <code><a href="#@winglang/sdk.core.Display">Display</a></code> | Information on how to display a resource in the UI. |
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

- *Type:* <a href="#@winglang/sdk.core.Display">Display</a>

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

### ApiConnectProps <a name="ApiConnectProps" id="@winglang/sdk.cloud.ApiConnectProps"></a>

Options for Api patch endpoint.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.ApiConnectProps.Initializer"></a>

```wing
bring cloud;

let api_connect_props = cloud.ApiConnectProps{ ... }
```


### ApiDeleteProps <a name="ApiDeleteProps" id="@winglang/sdk.cloud.ApiDeleteProps"></a>

Options for Api put endpoint.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.ApiDeleteProps.Initializer"></a>

```wing
bring cloud;

let api_delete_props = cloud.ApiDeleteProps{ ... }
```


### ApiGetProps <a name="ApiGetProps" id="@winglang/sdk.cloud.ApiGetProps"></a>

Options for Api get endpoint.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.ApiGetProps.Initializer"></a>

```wing
bring cloud;

let api_get_props = cloud.ApiGetProps{ ... }
```


### ApiHeadProps <a name="ApiHeadProps" id="@winglang/sdk.cloud.ApiHeadProps"></a>

Options for Api patch endpoint.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.ApiHeadProps.Initializer"></a>

```wing
bring cloud;

let api_head_props = cloud.ApiHeadProps{ ... }
```


### ApiOptionsProps <a name="ApiOptionsProps" id="@winglang/sdk.cloud.ApiOptionsProps"></a>

Options for Api patch endpoint.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.ApiOptionsProps.Initializer"></a>

```wing
bring cloud;

let api_options_props = cloud.ApiOptionsProps{ ... }
```


### ApiPatchProps <a name="ApiPatchProps" id="@winglang/sdk.cloud.ApiPatchProps"></a>

Options for Api patch endpoint.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.ApiPatchProps.Initializer"></a>

```wing
bring cloud;

let api_patch_props = cloud.ApiPatchProps{ ... }
```


### ApiPostProps <a name="ApiPostProps" id="@winglang/sdk.cloud.ApiPostProps"></a>

Options for Api post endpoint.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.ApiPostProps.Initializer"></a>

```wing
bring cloud;

let api_post_props = cloud.ApiPostProps{ ... }
```


### ApiProps <a name="ApiProps" id="@winglang/sdk.cloud.ApiProps"></a>

Properties for `Api`.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.ApiProps.Initializer"></a>

```wing
bring cloud;

let api_props = cloud.ApiProps{ ... }
```


### ApiPutProps <a name="ApiPutProps" id="@winglang/sdk.cloud.ApiPutProps"></a>

Options for Api put endpoint.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.ApiPutProps.Initializer"></a>

```wing
bring cloud;

let api_put_props = cloud.ApiPutProps{ ... }
```


### ApiRequest <a name="ApiRequest" id="@winglang/sdk.cloud.ApiRequest"></a>

Shape of a request to an inflight handler.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.ApiRequest.Initializer"></a>

```wing
bring cloud;

let api_request = cloud.ApiRequest{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.ApiRequest.property.headers">headers</a></code> | <code>MutMap&lt;str&gt;</code> | The request's headers. |
| <code><a href="#@winglang/sdk.cloud.ApiRequest.property.method">method</a></code> | <code><a href="#@winglang/sdk.cloud.HttpMethod">HttpMethod</a></code> | The request's HTTP method. |
| <code><a href="#@winglang/sdk.cloud.ApiRequest.property.path">path</a></code> | <code>str</code> | The request's path. |
| <code><a href="#@winglang/sdk.cloud.ApiRequest.property.body">body</a></code> | <code>json</code> | The request's body. |
| <code><a href="#@winglang/sdk.cloud.ApiRequest.property.query">query</a></code> | <code>str</code> | The request's query string. |
| <code><a href="#@winglang/sdk.cloud.ApiRequest.property.vars">vars</a></code> | <code>MutMap&lt;str&gt;</code> | The path variables. |

---

##### `headers`<sup>Required</sup> <a name="headers" id="@winglang/sdk.cloud.ApiRequest.property.headers"></a>

```wing
headers: MutMap<str>;
```

- *Type:* MutMap&lt;str&gt;

The request's headers.

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

##### `body`<sup>Optional</sup> <a name="body" id="@winglang/sdk.cloud.ApiRequest.property.body"></a>

```wing
body: json;
```

- *Type:* json

The request's body.

---

##### `query`<sup>Optional</sup> <a name="query" id="@winglang/sdk.cloud.ApiRequest.property.query"></a>

```wing
query: str;
```

- *Type:* str

The request's query string.

---

##### `vars`<sup>Optional</sup> <a name="vars" id="@winglang/sdk.cloud.ApiRequest.property.vars"></a>

```wing
vars: MutMap<str>;
```

- *Type:* MutMap&lt;str&gt;

The path variables.

---

### ApiResponse <a name="ApiResponse" id="@winglang/sdk.cloud.ApiResponse"></a>

Shape of a response from a inflight handler.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.ApiResponse.Initializer"></a>

```wing
bring cloud;

let api_response = cloud.ApiResponse{ ... }
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
bring cloud;

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

### CounterProps <a name="CounterProps" id="@winglang/sdk.cloud.CounterProps"></a>

Properties for `Counter`.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.CounterProps.Initializer"></a>

```wing
bring cloud;

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

### FunctionProps <a name="FunctionProps" id="@winglang/sdk.cloud.FunctionProps"></a>

Properties for `Function`.

This is the type users see when constructing a cloud.Function instance.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.FunctionProps.Initializer"></a>

```wing
bring cloud;

let function_props = cloud.FunctionProps{ ... }
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

### JsonFileProps <a name="JsonFileProps" id="@winglang/sdk.fs.JsonFileProps"></a>

Props for `JsonFile`.

#### Initializer <a name="Initializer" id="@winglang/sdk.fs.JsonFileProps.Initializer"></a>

```wing
bring fs;

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

### QueueOnMessageProps <a name="QueueOnMessageProps" id="@winglang/sdk.cloud.QueueOnMessageProps"></a>

Options for Queue.onMessage.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.QueueOnMessageProps.Initializer"></a>

```wing
bring cloud;

let queue_on_message_props = cloud.QueueOnMessageProps{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.QueueOnMessageProps.property.env">env</a></code> | <code>MutMap&lt;str&gt;</code> | Environment variables to pass to the function. |
| <code><a href="#@winglang/sdk.cloud.QueueOnMessageProps.property.memory">memory</a></code> | <code>num</code> | The amount of memory to allocate to the function, in MB. |
| <code><a href="#@winglang/sdk.cloud.QueueOnMessageProps.property.timeout">timeout</a></code> | <code><a href="#@winglang/sdk.std.Duration">Duration</a></code> | The maximum amount of time the function can run. |
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

##### `memory`<sup>Optional</sup> <a name="memory" id="@winglang/sdk.cloud.QueueOnMessageProps.property.memory"></a>

```wing
memory: num;
```

- *Type:* num
- *Default:* 128

The amount of memory to allocate to the function, in MB.

---

##### `timeout`<sup>Optional</sup> <a name="timeout" id="@winglang/sdk.cloud.QueueOnMessageProps.property.timeout"></a>

```wing
timeout: Duration;
```

- *Type:* <a href="#@winglang/sdk.std.Duration">Duration</a>
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
bring cloud;

let queue_props = cloud.QueueProps{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.QueueProps.property.initialMessages">initial_messages</a></code> | <code>MutArray&lt;str&gt;</code> | Initialize the queue with a set of messages. |
| <code><a href="#@winglang/sdk.cloud.QueueProps.property.timeout">timeout</a></code> | <code><a href="#@winglang/sdk.std.Duration">Duration</a></code> | How long a queue's consumers have to process a message. |

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

- *Type:* <a href="#@winglang/sdk.std.Duration">Duration</a>
- *Default:* Duration.fromSeconds(10)

How long a queue's consumers have to process a message.

---

### ScheduleOnTickProps <a name="ScheduleOnTickProps" id="@winglang/sdk.cloud.ScheduleOnTickProps"></a>

Options for Schedule.onTick.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.ScheduleOnTickProps.Initializer"></a>

```wing
bring cloud;

let schedule_on_tick_props = cloud.ScheduleOnTickProps{ ... }
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

let schedule_props = cloud.ScheduleProps{ ... }
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


### TextFileProps <a name="TextFileProps" id="@winglang/sdk.fs.TextFileProps"></a>

Props for `TextFile`.

#### Initializer <a name="Initializer" id="@winglang/sdk.fs.TextFileProps.Initializer"></a>

```wing
bring fs;

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

Options for `Topic.onMessage`.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.TopicOnMessageProps.Initializer"></a>

```wing
bring cloud;

let topic_on_message_props = cloud.TopicOnMessageProps{ ... }
```


### TopicProps <a name="TopicProps" id="@winglang/sdk.cloud.TopicProps"></a>

Properties for `Topic`.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.TopicProps.Initializer"></a>

```wing
bring cloud;

let topic_props = cloud.TopicProps{ ... }
```


## Classes <a name="Classes" id="Classes"></a>

### CounterClientBase <a name="CounterClientBase" id="@winglang/sdk.cloud.CounterClientBase"></a>

- *Implements:* <a href="#@winglang/sdk.cloud.ICounterClient">ICounterClient</a>

Functionality shared between all `CounterClient` implementations regardless of the target.

#### Initializers <a name="Initializers" id="@winglang/sdk.cloud.CounterClientBase.Initializer"></a>

```wing
bring cloud;

new cloud.CounterClientBase()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.CounterClientBase.dec">dec</a></code> | Decrement the counter, returning the previous value. |
| <code><a href="#@winglang/sdk.cloud.CounterClientBase.inc">inc</a></code> | Increments the counter atomically by a certain amount and returns the previous value. |
| <code><a href="#@winglang/sdk.cloud.CounterClientBase.peek">peek</a></code> | Get the current value of the counter. |
| <code><a href="#@winglang/sdk.cloud.CounterClientBase.reset">reset</a></code> | Reset a counter to a given value. |

---

##### `dec` <a name="dec" id="@winglang/sdk.cloud.CounterClientBase.dec"></a>

```wing
dec(amount?: num): num
```

Decrement the counter, returning the previous value.

###### `amount`<sup>Optional</sup> <a name="amount" id="@winglang/sdk.cloud.CounterClientBase.dec.parameter.amount"></a>

- *Type:* num

---

##### `inc` <a name="inc" id="@winglang/sdk.cloud.CounterClientBase.inc"></a>

```wing
inc(amount?: num): num
```

Increments the counter atomically by a certain amount and returns the previous value.

###### `amount`<sup>Optional</sup> <a name="amount" id="@winglang/sdk.cloud.CounterClientBase.inc.parameter.amount"></a>

- *Type:* num

---

##### `peek` <a name="peek" id="@winglang/sdk.cloud.CounterClientBase.peek"></a>

```wing
peek(): num
```

Get the current value of the counter.

Using this API may introduce race conditions since the value can change between
the time it is read and the time it is used in your code.

##### `reset` <a name="reset" id="@winglang/sdk.cloud.CounterClientBase.reset"></a>

```wing
reset(value?: num): void
```

Reset a counter to a given value.

###### `value`<sup>Optional</sup> <a name="value" id="@winglang/sdk.cloud.CounterClientBase.reset.parameter.value"></a>

- *Type:* num

---




### Duration <a name="Duration" id="@winglang/sdk.std.Duration"></a>

Represents a length of time.


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.std.Duration.fromHours">from_hours</a></code> | Create a Duration representing an amount of hours. |
| <code><a href="#@winglang/sdk.std.Duration.fromMinutes">from_minutes</a></code> | Create a Duration representing an amount of minutes. |
| <code><a href="#@winglang/sdk.std.Duration.fromSeconds">from_seconds</a></code> | Create a Duration representing an amount of seconds. |

---

##### `from_hours` <a name="from_hours" id="@winglang/sdk.std.Duration.fromHours"></a>

```wing
bring std;

std.Duration.from_hours(amount: num)
```

Create a Duration representing an amount of hours.

###### `amount`<sup>Required</sup> <a name="amount" id="@winglang/sdk.std.Duration.fromHours.parameter.amount"></a>

- *Type:* num

the amount of Hours the `Duration` will represent.

---

##### `from_minutes` <a name="from_minutes" id="@winglang/sdk.std.Duration.fromMinutes"></a>

```wing
bring std;

std.Duration.from_minutes(amount: num)
```

Create a Duration representing an amount of minutes.

###### `amount`<sup>Required</sup> <a name="amount" id="@winglang/sdk.std.Duration.fromMinutes.parameter.amount"></a>

- *Type:* num

the amount of Minutes the `Duration` will represent.

---

##### `from_seconds` <a name="from_seconds" id="@winglang/sdk.std.Duration.fromSeconds"></a>

```wing
bring std;

std.Duration.from_seconds(amount: num)
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
| <code><a href="#@winglang/sdk.std.ImmutableArray.copy">copy</a></code> | Create an immutable shallow copy of this array. |
| <code><a href="#@winglang/sdk.std.ImmutableArray.copyMut">copy_mut</a></code> | Create a mutable shallow copy of this array. |
| <code><a href="#@winglang/sdk.std.ImmutableArray.indexOf">index_of</a></code> | Returns the index of the first occurrence of searchElement found. |
| <code><a href="#@winglang/sdk.std.ImmutableArray.join">join</a></code> | Returns a new string containing the concatenated values in this array, separated by commas or a specified separator string. |
| <code><a href="#@winglang/sdk.std.ImmutableArray.lastIndexOf">last_index_of</a></code> | Returns the index of the last occurrence of searchElement found. |

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
contains(search_element: T1): bool
```

Checks if this array includes searchElement.

###### `search_element`<sup>Required</sup> <a name="search_element" id="@winglang/sdk.std.ImmutableArray.contains.parameter.searchElement"></a>

- *Type:* <a href="#@winglang/sdk.std.T1">T1</a>

to search for.

---

##### `copy` <a name="copy" id="@winglang/sdk.std.ImmutableArray.copy"></a>

```wing
copy(): ImmutableArray
```

Create an immutable shallow copy of this array.

##### `copy_mut` <a name="copy_mut" id="@winglang/sdk.std.ImmutableArray.copyMut"></a>

```wing
copy_mut(): MutableArray
```

Create a mutable shallow copy of this array.

##### `index_of` <a name="index_of" id="@winglang/sdk.std.ImmutableArray.indexOf"></a>

```wing
index_of(search_element: T1): num
```

Returns the index of the first occurrence of searchElement found.

###### `search_element`<sup>Required</sup> <a name="search_element" id="@winglang/sdk.std.ImmutableArray.indexOf.parameter.searchElement"></a>

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

##### `last_index_of` <a name="last_index_of" id="@winglang/sdk.std.ImmutableArray.lastIndexOf"></a>

```wing
last_index_of(search_element: T1): num
```

Returns the index of the last occurrence of searchElement found.

###### `search_element`<sup>Required</sup> <a name="search_element" id="@winglang/sdk.std.ImmutableArray.lastIndexOf.parameter.searchElement"></a>

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
| <code><a href="#@winglang/sdk.std.ImmutableMap.copy">copy</a></code> | Create an immutable shallow copy of this map. |
| <code><a href="#@winglang/sdk.std.ImmutableMap.copyMut">copy_mut</a></code> | Create a mutable shallow copy of this map. |
| <code><a href="#@winglang/sdk.std.ImmutableMap.get">get</a></code> | Returns a specified element from the map. |
| <code><a href="#@winglang/sdk.std.ImmutableMap.has">has</a></code> | Returns a boolean indicating whether an element with the specified key exists or not. |
| <code><a href="#@winglang/sdk.std.ImmutableMap.size">size</a></code> | Returns the number of elements in the map. |

---

##### `copy` <a name="copy" id="@winglang/sdk.std.ImmutableMap.copy"></a>

```wing
copy(): ImmutableMap
```

Create an immutable shallow copy of this map.

##### `copy_mut` <a name="copy_mut" id="@winglang/sdk.std.ImmutableMap.copyMut"></a>

```wing
copy_mut(): MutableMap
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

##### `size` <a name="size" id="@winglang/sdk.std.ImmutableMap.size"></a>

```wing
size(): num
```

Returns the number of elements in the map.

TODO: For now this has to be a method rather than a getter as macros only work on methods https://github.com/winglang/wing/issues/1658




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
| <code><a href="#@winglang/sdk.std.ImmutableSet.copy">copy</a></code> | Create an immutable shallow copy of this set. |
| <code><a href="#@winglang/sdk.std.ImmutableSet.copyMut">copy_mut</a></code> | Create a mutable shallow copy of this set. |
| <code><a href="#@winglang/sdk.std.ImmutableSet.has">has</a></code> | Returns a boolean indicating whether an element with the specified value exists in the set. |

---

##### `copy` <a name="copy" id="@winglang/sdk.std.ImmutableSet.copy"></a>

```wing
copy(): ImmutableSet
```

Create an immutable shallow copy of this set.

##### `copy_mut` <a name="copy_mut" id="@winglang/sdk.std.ImmutableSet.copyMut"></a>

```wing
copy_mut(): MutableSet
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
| <code><a href="#@winglang/sdk.std.Json.getAt">get_at</a></code> | Returns a specified element at a given index from Json Array. |

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

##### `get_at` <a name="get_at" id="@winglang/sdk.std.Json.getAt"></a>

```wing
get_at(index: num): Json
```

Returns a specified element at a given index from Json Array.

###### `index`<sup>Required</sup> <a name="index" id="@winglang/sdk.std.Json.getAt.parameter.index"></a>

- *Type:* num

The index of the element in the Json Array to return.

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
| <code><a href="#@winglang/sdk.std.MutableArray.copyMut">copy_mut</a></code> | Create a mutable shallow copy of this array. |
| <code><a href="#@winglang/sdk.std.MutableArray.indexOf">index_of</a></code> | Returns the index of the first occurrence of searchElement found. |
| <code><a href="#@winglang/sdk.std.MutableArray.join">join</a></code> | Returns a new string containing the concatenated values in this array, separated by commas or a specified separator string. |
| <code><a href="#@winglang/sdk.std.MutableArray.lastIndexOf">last_index_of</a></code> | Returns the index of the last occurrence of searchElement found. |
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
concat(arr: ImmutableArray): ImmutableArray
```

Merge arr to the end of this array.

###### `arr`<sup>Required</sup> <a name="arr" id="@winglang/sdk.std.MutableArray.concat.parameter.arr"></a>

- *Type:* <a href="#@winglang/sdk.std.ImmutableArray">ImmutableArray</a>

array to merge.

---

##### `contains` <a name="contains" id="@winglang/sdk.std.MutableArray.contains"></a>

```wing
contains(search_element: T1): bool
```

Checks if this array includes searchElement.

###### `search_element`<sup>Required</sup> <a name="search_element" id="@winglang/sdk.std.MutableArray.contains.parameter.searchElement"></a>

- *Type:* <a href="#@winglang/sdk.std.T1">T1</a>

to search for.

---

##### `copy` <a name="copy" id="@winglang/sdk.std.MutableArray.copy"></a>

```wing
copy(): ImmutableArray
```

Create an immutable shallow copy of this array.

##### `copy_mut` <a name="copy_mut" id="@winglang/sdk.std.MutableArray.copyMut"></a>

```wing
copy_mut(): MutableArray
```

Create a mutable shallow copy of this array.

##### `index_of` <a name="index_of" id="@winglang/sdk.std.MutableArray.indexOf"></a>

```wing
index_of(search_element: T1): num
```

Returns the index of the first occurrence of searchElement found.

###### `search_element`<sup>Required</sup> <a name="search_element" id="@winglang/sdk.std.MutableArray.indexOf.parameter.searchElement"></a>

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

##### `last_index_of` <a name="last_index_of" id="@winglang/sdk.std.MutableArray.lastIndexOf"></a>

```wing
last_index_of(search_element: T1): num
```

Returns the index of the last occurrence of searchElement found.

###### `search_element`<sup>Required</sup> <a name="search_element" id="@winglang/sdk.std.MutableArray.lastIndexOf.parameter.searchElement"></a>

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
| <code><a href="#@winglang/sdk.std.MutableMap.copy">copy</a></code> | Create an immutable shallow copy of this map. |
| <code><a href="#@winglang/sdk.std.MutableMap.copyMut">copy_mut</a></code> | Create a mutable shallow copy of this map. |
| <code><a href="#@winglang/sdk.std.MutableMap.get">get</a></code> | Returns a specified element from the map. |
| <code><a href="#@winglang/sdk.std.MutableMap.has">has</a></code> | Returns a boolean indicating whether an element with the specified key exists or not. |
| <code><a href="#@winglang/sdk.std.MutableMap.size">size</a></code> | Returns the number of elements in the map. |
| <code><a href="#@winglang/sdk.std.MutableMap.clear">clear</a></code> | Removes all elements. |
| <code><a href="#@winglang/sdk.std.MutableMap.delete">delete</a></code> | Removes the specified element from a map. |
| <code><a href="#@winglang/sdk.std.MutableMap.set">set</a></code> | Adds or updates an entry in a Map object with a specified key and a value. |

---

##### `copy` <a name="copy" id="@winglang/sdk.std.MutableMap.copy"></a>

```wing
copy(): ImmutableMap
```

Create an immutable shallow copy of this map.

##### `copy_mut` <a name="copy_mut" id="@winglang/sdk.std.MutableMap.copyMut"></a>

```wing
copy_mut(): MutableMap
```

Create a mutable shallow copy of this map.

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

##### `size` <a name="size" id="@winglang/sdk.std.MutableMap.size"></a>

```wing
size(): num
```

Returns the number of elements in the map.

TODO: For now this has to be a method rather than a getter as macros only work on methods https://github.com/winglang/wing/issues/1658

##### `clear` <a name="clear" id="@winglang/sdk.std.MutableMap.clear"></a>

```wing
clear(): void
```

Removes all elements.

##### `delete` <a name="delete" id="@winglang/sdk.std.MutableMap.delete"></a>

```wing
delete(key: str): bool
```

Removes the specified element from a map.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.std.MutableMap.delete.parameter.key"></a>

- *Type:* str

The key.

---

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
| <code><a href="#@winglang/sdk.std.MutableSet.copy">copy</a></code> | Create an immutable shallow copy of this set. |
| <code><a href="#@winglang/sdk.std.MutableSet.copyMut">copy_mut</a></code> | Create a mutable shallow copy of this set. |
| <code><a href="#@winglang/sdk.std.MutableSet.has">has</a></code> | Returns a boolean indicating whether an element with the specified value exists in the set. |
| <code><a href="#@winglang/sdk.std.MutableSet.add">add</a></code> | Add value to set. |
| <code><a href="#@winglang/sdk.std.MutableSet.clear">clear</a></code> | The clear() method removes all elements from a set. |
| <code><a href="#@winglang/sdk.std.MutableSet.delete">delete</a></code> | Removes a specified value from a set, if it is in the set. |

---

##### `copy` <a name="copy" id="@winglang/sdk.std.MutableSet.copy"></a>

```wing
copy(): ImmutableSet
```

Create an immutable shallow copy of this set.

##### `copy_mut` <a name="copy_mut" id="@winglang/sdk.std.MutableSet.copyMut"></a>

```wing
copy_mut(): MutableSet
```

Create a mutable shallow copy of this set.

##### `has` <a name="has" id="@winglang/sdk.std.MutableSet.has"></a>

```wing
has(value: T1): bool
```

Returns a boolean indicating whether an element with the specified value exists in the set.

###### `value`<sup>Required</sup> <a name="value" id="@winglang/sdk.std.MutableSet.has.parameter.value"></a>

- *Type:* <a href="#@winglang/sdk.std.T1">T1</a>

The value to test for presence in the Set object.

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

##### `delete` <a name="delete" id="@winglang/sdk.std.MutableSet.delete"></a>

```wing
delete(value: T1): bool
```

Removes a specified value from a set, if it is in the set.

###### `value`<sup>Required</sup> <a name="value" id="@winglang/sdk.std.MutableSet.delete.parameter.value"></a>

- *Type:* <a href="#@winglang/sdk.std.T1">T1</a>

The value to remove from the set.

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
| <code><a href="#@winglang/sdk.std.MutJson.getAt">get_at</a></code> | Returns a specified element at a given index from MutJson Array. |
| <code><a href="#@winglang/sdk.std.MutJson.set">set</a></code> | Adds or updates an element in MutJson with a specific key and value. |
| <code><a href="#@winglang/sdk.std.MutJson.setAt">set_at</a></code> | Set element in MutJson Array with a specific key and value. |

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

##### `get_at` <a name="get_at" id="@winglang/sdk.std.MutJson.getAt"></a>

```wing
get_at(index: num): MutJson
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

##### `set_at` <a name="set_at" id="@winglang/sdk.std.MutJson.setAt"></a>

```wing
set_at(index: num, value: any): void
```

Set element in MutJson Array with a specific key and value.

###### `index`<sup>Required</sup> <a name="index" id="@winglang/sdk.std.MutJson.setAt.parameter.index"></a>

- *Type:* num

---

###### `value`<sup>Required</sup> <a name="value" id="@winglang/sdk.std.MutJson.setAt.parameter.value"></a>

- *Type:* any

The value of the element to set.

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
| <code><a href="#@winglang/sdk.std.String.ends">ends</a></code> | Does this string end with the given searchString? |
| <code><a href="#@winglang/sdk.std.String.indexOf">index_of</a></code> | Returns the index of the first occurrence of searchString found. |
| <code><a href="#@winglang/sdk.std.String.lowercase">lowercase</a></code> | Returns this string in lower case. |
| <code><a href="#@winglang/sdk.std.String.split">split</a></code> | Splits string by separator. |
| <code><a href="#@winglang/sdk.std.String.starts">starts</a></code> | Does this string start with the given searchString? |
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
concat(str_n: str): str
```

Combines the text of two (or more) strings and returns a new string.

###### `str_n`<sup>Required</sup> <a name="str_n" id="@winglang/sdk.std.String.concat.parameter.strN"></a>

- *Type:* str

one or more strings to concatenate to this string.

---

##### `contains` <a name="contains" id="@winglang/sdk.std.String.contains"></a>

```wing
contains(search_string: str): bool
```

Checks if string includes substring.

###### `search_string`<sup>Required</sup> <a name="search_string" id="@winglang/sdk.std.String.contains.parameter.searchString"></a>

- *Type:* str

substring to search for.

---

##### `ends` <a name="ends" id="@winglang/sdk.std.String.ends"></a>

```wing
ends(search_string: str): bool
```

Does this string end with the given searchString?

###### `search_string`<sup>Required</sup> <a name="search_string" id="@winglang/sdk.std.String.ends.parameter.searchString"></a>

- *Type:* str

substring to search for.

---

##### `index_of` <a name="index_of" id="@winglang/sdk.std.String.indexOf"></a>

```wing
index_of(search_string: str): num
```

Returns the index of the first occurrence of searchString found.

###### `search_string`<sup>Required</sup> <a name="search_string" id="@winglang/sdk.std.String.indexOf.parameter.searchString"></a>

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

##### `starts` <a name="starts" id="@winglang/sdk.std.String.starts"></a>

```wing
starts(search_string: str): bool
```

Does this string start with the given searchString?

###### `search_string`<sup>Required</sup> <a name="search_string" id="@winglang/sdk.std.String.starts.parameter.searchString"></a>

- *Type:* str

substring to search for.

---

##### `substring` <a name="substring" id="@winglang/sdk.std.String.substring"></a>

```wing
substring(index_start: num, index_end?: num): str
```

Returns a string between indexStart, indexEnd.

###### `index_start`<sup>Required</sup> <a name="index_start" id="@winglang/sdk.std.String.substring.parameter.indexStart"></a>

- *Type:* num

index of the character we slice at.

---

###### `index_end`<sup>Optional</sup> <a name="index_end" id="@winglang/sdk.std.String.substring.parameter.indexEnd"></a>

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
| <code><a href="#@winglang/sdk.cloud.IBucketClient.get">get</a></code> | Retrieve an object from the bucket. |
| <code><a href="#@winglang/sdk.cloud.IBucketClient.getJson">get_json</a></code> | Retrieve a Json object from the bucket. |
| <code><a href="#@winglang/sdk.cloud.IBucketClient.list">list</a></code> | Retrieve existing objects keys from the bucket. |
| <code><a href="#@winglang/sdk.cloud.IBucketClient.put">put</a></code> | Put an object in the bucket. |
| <code><a href="#@winglang/sdk.cloud.IBucketClient.putJson">put_json</a></code> | Put a Json object in the bucket. |

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

##### `get_json` <a name="get_json" id="@winglang/sdk.cloud.IBucketClient.getJson"></a>

```wing
get_json(key: str): Json
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

##### `put_json` <a name="put_json" id="@winglang/sdk.cloud.IBucketClient.putJson"></a>

```wing
put_json(key: str, body: Json): void
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


### ICounterClient <a name="ICounterClient" id="@winglang/sdk.cloud.ICounterClient"></a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.CounterClientBase">CounterClientBase</a>, <a href="#@winglang/sdk.cloud.ICounterClient">ICounterClient</a>

Inflight interface for `Counter`.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.ICounterClient.dec">dec</a></code> | Decrement the counter, returning the previous value. |
| <code><a href="#@winglang/sdk.cloud.ICounterClient.inc">inc</a></code> | Increments the counter atomically by a certain amount and returns the previous value. |
| <code><a href="#@winglang/sdk.cloud.ICounterClient.peek">peek</a></code> | Get the current value of the counter. |
| <code><a href="#@winglang/sdk.cloud.ICounterClient.reset">reset</a></code> | Reset a counter to a given value. |

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

##### `reset` <a name="reset" id="@winglang/sdk.cloud.ICounterClient.reset"></a>

```wing
reset(value?: num): void
```

**Inflight client:** [true](#true)

Reset a counter to a given value.

###### `value`<sup>Optional</sup> <a name="value" id="@winglang/sdk.cloud.ICounterClient.reset.parameter.value"></a>

- *Type:* num

value to reset (default is 0).

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

- *Extends:* <a href="#@winglang/sdk.core.IResource">IResource</a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.IFunctionHandler">IFunctionHandler</a>

**Inflight client:** [wingsdk.cloud.IFunctionHandlerClient](#wingsdk.cloud.IFunctionHandlerClient)

Represents a resource with an inflight "handle" method that can be used to create a `cloud.Function`.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.IFunctionHandler.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.cloud.IFunctionHandler.property.display">display</a></code> | <code><a href="#@winglang/sdk.core.Display">Display</a></code> | Information on how to display a resource in the UI. |

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

- *Type:* <a href="#@winglang/sdk.core.Display">Display</a>

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


### ILoggerClient <a name="ILoggerClient" id="@winglang/sdk.cloud.ILoggerClient"></a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.ILoggerClient">ILoggerClient</a>

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

- *Implemented By:* <a href="#@winglang/sdk.cloud.IQueueClient">IQueueClient</a>

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

- *Extends:* <a href="#@winglang/sdk.core.IResource">IResource</a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.IQueueOnMessageHandler">IQueueOnMessageHandler</a>

**Inflight client:** [wingsdk.cloud.IQueueOnMessageHandlerClient](#wingsdk.cloud.IQueueOnMessageHandlerClient)

Represents a resource with an inflight "handle" method that can be passed to `Queue.on_message`.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.IQueueOnMessageHandler.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.cloud.IQueueOnMessageHandler.property.display">display</a></code> | <code><a href="#@winglang/sdk.core.Display">Display</a></code> | Information on how to display a resource in the UI. |

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

- *Type:* <a href="#@winglang/sdk.core.Display">Display</a>

Information on how to display a resource in the UI.

---

### IQueueOnMessageHandlerClient <a name="IQueueOnMessageHandlerClient" id="@winglang/sdk.cloud.IQueueOnMessageHandlerClient"></a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.IQueueOnMessageHandlerClient">IQueueOnMessageHandlerClient</a>

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


### IScheduleOnTickHandler <a name="IScheduleOnTickHandler" id="@winglang/sdk.cloud.IScheduleOnTickHandler"></a>

- *Extends:* <a href="#@winglang/sdk.core.IResource">IResource</a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.IScheduleOnTickHandler">IScheduleOnTickHandler</a>

**Inflight client:** [wingsdk.cloud.IScheduleOnTickHandlerClient](#wingsdk.cloud.IScheduleOnTickHandlerClient)

Represents a resource with an inflight "handle" method that can be passed to `Schedule.on_tick`.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.IScheduleOnTickHandler.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.cloud.IScheduleOnTickHandler.property.display">display</a></code> | <code><a href="#@winglang/sdk.core.Display">Display</a></code> | Information on how to display a resource in the UI. |

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

- *Type:* <a href="#@winglang/sdk.core.Display">Display</a>

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

- *Extends:* <a href="#@winglang/sdk.core.IResource">IResource</a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.ITopicOnMessageHandler">ITopicOnMessageHandler</a>

**Inflight client:** [wingsdk.cloud.ITopicOnMessageHandlerClient](#wingsdk.cloud.ITopicOnMessageHandlerClient)

Represents a resource with an inflight "handle" method that can be passed to `Topic.on_message`.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.ITopicOnMessageHandler.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.cloud.ITopicOnMessageHandler.property.display">display</a></code> | <code><a href="#@winglang/sdk.core.Display">Display</a></code> | Information on how to display a resource in the UI. |

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

- *Type:* <a href="#@winglang/sdk.core.Display">Display</a>

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


## Enums <a name="Enums" id="Enums"></a>

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

