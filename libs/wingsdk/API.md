# API Reference <a name="API Reference" id="api-reference"></a>

## Resources <a name="Resources" id="Resources"></a>

### Bucket <a name="Bucket" id="@winglang/sdk.cloud.Bucket"></a>

**Inflight client:** [@winglang/sdk.cloud.IBucketClient](#@winglang/sdk.cloud.IBucketClient)

Represents a cloud object store.

#### Initializers <a name="Initializers" id="@winglang/sdk.cloud.Bucket.Initializer"></a>

```wing
bring cloud;

new cloud.Bucket(props?: BucketProps)
```

| **Name**                                                                                 | **Type**                                                                | **Description**   |
| ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------- |
| <code><a href="#@winglang/sdk.cloud.Bucket.Initializer.parameter.props">props</a></code> | <code><a href="#@winglang/sdk.cloud.BucketProps">BucketProps</a></code> | _No description._ |

---

##### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Bucket.Initializer.parameter.props"></a>

- _Type:_ <a href="#@winglang/sdk.cloud.BucketProps">BucketProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name**                                                                    | **Description**                                                     |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------- |
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

- _Type:_ str

---

###### `body`<sup>Required</sup> <a name="body" id="@winglang/sdk.cloud.Bucket.addObject.parameter.body"></a>

- _Type:_ str

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                          | **Type**                                                       | **Description**                                                                                     |
| --------------------------------------------------------------------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| <code><a href="#@winglang/sdk.cloud.Bucket.property.node">node</a></code>         | <code>constructs.Node</code>                                   | The tree node.                                                                                      |
| <code><a href="#@winglang/sdk.cloud.Bucket.property.display">display</a></code>   | <code><a href="#@winglang/sdk.core.Display">Display</a></code> | Information on how to display a resource in the UI.                                                 |
| <code><a href="#@winglang/sdk.cloud.Bucket.property.stateful">stateful</a></code> | <code>bool</code>                                              | Whether a resource is stateful, i.e. it stores information that is not defined by your application. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.cloud.Bucket.property.node"></a>

```wing
node: Node;
```

- _Type:_ constructs.Node

The tree node.

---

##### `display`<sup>Required</sup> <a name="display" id="@winglang/sdk.cloud.Bucket.property.display"></a>

```wing
display: Display;
```

- _Type:_ <a href="#@winglang/sdk.core.Display">Display</a>

Information on how to display a resource in the UI.

---

##### `stateful`<sup>Required</sup> <a name="stateful" id="@winglang/sdk.cloud.Bucket.property.stateful"></a>

```wing
stateful: bool;
```

- _Type:_ bool

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

| **Name**                                                                                  | **Type**                                                                  | **Description**   |
| ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ----------------- |
| <code><a href="#@winglang/sdk.cloud.Counter.Initializer.parameter.props">props</a></code> | <code><a href="#@winglang/sdk.cloud.CounterProps">CounterProps</a></code> | _No description._ |

---

##### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Counter.Initializer.parameter.props"></a>

- _Type:_ <a href="#@winglang/sdk.cloud.CounterProps">CounterProps</a>

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                           | **Type**                                                       | **Description**                                                                                     |
| ---------------------------------------------------------------------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| <code><a href="#@winglang/sdk.cloud.Counter.property.node">node</a></code>         | <code>constructs.Node</code>                                   | The tree node.                                                                                      |
| <code><a href="#@winglang/sdk.cloud.Counter.property.display">display</a></code>   | <code><a href="#@winglang/sdk.core.Display">Display</a></code> | Information on how to display a resource in the UI.                                                 |
| <code><a href="#@winglang/sdk.cloud.Counter.property.stateful">stateful</a></code> | <code>bool</code>                                              | Whether a resource is stateful, i.e. it stores information that is not defined by your application. |
| <code><a href="#@winglang/sdk.cloud.Counter.property.initial">initial</a></code>   | <code>num</code>                                               | The initial value of the counter.                                                                   |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.cloud.Counter.property.node"></a>

```wing
node: Node;
```

- _Type:_ constructs.Node

The tree node.

---

##### `display`<sup>Required</sup> <a name="display" id="@winglang/sdk.cloud.Counter.property.display"></a>

```wing
display: Display;
```

- _Type:_ <a href="#@winglang/sdk.core.Display">Display</a>

Information on how to display a resource in the UI.

---

##### `stateful`<sup>Required</sup> <a name="stateful" id="@winglang/sdk.cloud.Counter.property.stateful"></a>

```wing
stateful: bool;
```

- _Type:_ bool

Whether a resource is stateful, i.e. it stores information that is not defined by your application.

A non-stateful resource does not remember information about past
transactions or events, and can typically be replaced by a cloud provider
with a fresh copy without any consequences.

---

##### `initial`<sup>Required</sup> <a name="initial" id="@winglang/sdk.cloud.Counter.property.initial"></a>

```wing
initial: num;
```

- _Type:_ num

The initial value of the counter.

---

### Function <a name="Function" id="@winglang/sdk.cloud.Function"></a>

- _Implements:_ <a href="#@winglang/sdk.core.IInflightHost">IInflightHost</a>

**Inflight client:** [@winglang/sdk.cloud.IFunctionClient](#@winglang/sdk.cloud.IFunctionClient)

Represents a function.

#### Initializers <a name="Initializers" id="@winglang/sdk.cloud.Function.Initializer"></a>

```wing
bring cloud;

new cloud.Function(inflight: ~Inflight, props?: FunctionProps)
```

| **Name**                                                                                         | **Type**                                                                    | **Description**   |
| ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------- | ----------------- |
| <code><a href="#@winglang/sdk.cloud.Function.Initializer.parameter.inflight">inflight</a></code> | <code><a href="#@winglang/sdk.core.Inflight">Inflight</a></code>            | _No description._ |
| <code><a href="#@winglang/sdk.cloud.Function.Initializer.parameter.props">props</a></code>       | <code><a href="#@winglang/sdk.cloud.FunctionProps">FunctionProps</a></code> | _No description._ |

---

##### `inflight`<sup>Required</sup> <a name="inflight" id="@winglang/sdk.cloud.Function.Initializer.parameter.inflight"></a>

- _Type:_ <a href="#@winglang/sdk.core.Inflight">Inflight</a>

---

##### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Function.Initializer.parameter.props"></a>

- _Type:_ <a href="#@winglang/sdk.cloud.FunctionProps">FunctionProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name**                                                                                | **Description**                              |
| --------------------------------------------------------------------------------------- | -------------------------------------------- |
| <code><a href="#@winglang/sdk.cloud.Function.addEnvironment">add_environment</a></code> | Add an environment variable to the function. |

---

##### `add_environment` <a name="add_environment" id="@winglang/sdk.cloud.Function.addEnvironment"></a>

```wing
add_environment(name: str, value: str): void
```

Add an environment variable to the function.

###### `name`<sup>Required</sup> <a name="name" id="@winglang/sdk.cloud.Function.addEnvironment.parameter.name"></a>

- _Type:_ str

---

###### `value`<sup>Required</sup> <a name="value" id="@winglang/sdk.cloud.Function.addEnvironment.parameter.value"></a>

- _Type:_ str

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                            | **Type**                                                       | **Description**                                                                                     |
| ----------------------------------------------------------------------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| <code><a href="#@winglang/sdk.cloud.Function.property.node">node</a></code>         | <code>constructs.Node</code>                                   | The tree node.                                                                                      |
| <code><a href="#@winglang/sdk.cloud.Function.property.display">display</a></code>   | <code><a href="#@winglang/sdk.core.Display">Display</a></code> | Information on how to display a resource in the UI.                                                 |
| <code><a href="#@winglang/sdk.cloud.Function.property.stateful">stateful</a></code> | <code>bool</code>                                              | Whether a resource is stateful, i.e. it stores information that is not defined by your application. |
| <code><a href="#@winglang/sdk.cloud.Function.property.env">env</a></code>           | <code>MutMap&lt;str&gt;</code>                                 | Returns the set of environment variables for this function.                                         |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.cloud.Function.property.node"></a>

```wing
node: Node;
```

- _Type:_ constructs.Node

The tree node.

---

##### `display`<sup>Required</sup> <a name="display" id="@winglang/sdk.cloud.Function.property.display"></a>

```wing
display: Display;
```

- _Type:_ <a href="#@winglang/sdk.core.Display">Display</a>

Information on how to display a resource in the UI.

---

##### `stateful`<sup>Required</sup> <a name="stateful" id="@winglang/sdk.cloud.Function.property.stateful"></a>

```wing
stateful: bool;
```

- _Type:_ bool

Whether a resource is stateful, i.e. it stores information that is not defined by your application.

A non-stateful resource does not remember information about past
transactions or events, and can typically be replaced by a cloud provider
with a fresh copy without any consequences.

---

##### `env`<sup>Required</sup> <a name="env" id="@winglang/sdk.cloud.Function.property.env"></a>

```wing
env: MutMap<str>;
```

- _Type:_ MutMap&lt;str&gt;

Returns the set of environment variables for this function.

---

### JsonFile <a name="JsonFile" id="@winglang/sdk.fs.JsonFile"></a>

Represents a text file that should be synthesized in the app's outdir.

#### Initializers <a name="Initializers" id="@winglang/sdk.fs.JsonFile.Initializer"></a>

```wing
bring fs;

new fs.JsonFile(file_path: str, props: JsonFileProps)
```

| **Name**                                                                                       | **Type**                                                                 | **Description**   |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ----------------- |
| <code><a href="#@winglang/sdk.fs.JsonFile.Initializer.parameter.filePath">file_path</a></code> | <code>str</code>                                                         | _No description._ |
| <code><a href="#@winglang/sdk.fs.JsonFile.Initializer.parameter.props">props</a></code>        | <code><a href="#@winglang/sdk.fs.JsonFileProps">JsonFileProps</a></code> | _No description._ |

---

##### `file_path`<sup>Required</sup> <a name="file_path" id="@winglang/sdk.fs.JsonFile.Initializer.parameter.filePath"></a>

- _Type:_ str

---

##### `props`<sup>Required</sup> <a name="props" id="@winglang/sdk.fs.JsonFile.Initializer.parameter.props"></a>

- _Type:_ <a href="#@winglang/sdk.fs.JsonFileProps">JsonFileProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name**                                                        | **Description**                                                        |
| --------------------------------------------------------------- | ---------------------------------------------------------------------- |
| <code><a href="#@winglang/sdk.fs.JsonFile.save">save</a></code> | Render the contents of the file and save it to the user's file system. |

---

##### `save` <a name="save" id="@winglang/sdk.fs.JsonFile.save"></a>

```wing
save(outdir: str): void
```

Render the contents of the file and save it to the user's file system.

###### `outdir`<sup>Required</sup> <a name="outdir" id="@winglang/sdk.fs.JsonFile.save.parameter.outdir"></a>

- _Type:_ str

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                          | **Type**                     | **Description**                                   |
| --------------------------------------------------------------------------------- | ---------------------------- | ------------------------------------------------- |
| <code><a href="#@winglang/sdk.fs.JsonFile.property.node">node</a></code>          | <code>constructs.Node</code> | The tree node.                                    |
| <code><a href="#@winglang/sdk.fs.JsonFile.property.filePath">file_path</a></code> | <code>str</code>             | The file's relative path to the output directory. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.fs.JsonFile.property.node"></a>

```wing
node: Node;
```

- _Type:_ constructs.Node

The tree node.

---

##### `file_path`<sup>Required</sup> <a name="file_path" id="@winglang/sdk.fs.JsonFile.property.filePath"></a>

```wing
file_path: str;
```

- _Type:_ str

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
| -------- | -------- | --------------- |

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name**                                                                 | **Description**                                     |
| ------------------------------------------------------------------------ | --------------------------------------------------- |
| <code><a href="#@winglang/sdk.cloud.Logger.register">register</a></code> | Create a logger and register it to the given scope. |

---

##### `register` <a name="register" id="@winglang/sdk.cloud.Logger.register"></a>

```wing
bring cloud;

cloud.Logger.register()
```

Create a logger and register it to the given scope.

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                          | **Type**                                                       | **Description**                                                                                     |
| --------------------------------------------------------------------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| <code><a href="#@winglang/sdk.cloud.Logger.property.node">node</a></code>         | <code>constructs.Node</code>                                   | The tree node.                                                                                      |
| <code><a href="#@winglang/sdk.cloud.Logger.property.display">display</a></code>   | <code><a href="#@winglang/sdk.core.Display">Display</a></code> | Information on how to display a resource in the UI.                                                 |
| <code><a href="#@winglang/sdk.cloud.Logger.property.stateful">stateful</a></code> | <code>bool</code>                                              | Whether a resource is stateful, i.e. it stores information that is not defined by your application. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.cloud.Logger.property.node"></a>

```wing
node: Node;
```

- _Type:_ constructs.Node

The tree node.

---

##### `display`<sup>Required</sup> <a name="display" id="@winglang/sdk.cloud.Logger.property.display"></a>

```wing
display: Display;
```

- _Type:_ <a href="#@winglang/sdk.core.Display">Display</a>

Information on how to display a resource in the UI.

---

##### `stateful`<sup>Required</sup> <a name="stateful" id="@winglang/sdk.cloud.Logger.property.stateful"></a>

```wing
stateful: bool;
```

- _Type:_ bool

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

| **Name**                                                                                | **Type**                                                              | **Description**   |
| --------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ----------------- |
| <code><a href="#@winglang/sdk.cloud.Queue.Initializer.parameter.props">props</a></code> | <code><a href="#@winglang/sdk.cloud.QueueProps">QueueProps</a></code> | _No description._ |

---

##### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Queue.Initializer.parameter.props"></a>

- _Type:_ <a href="#@winglang/sdk.cloud.QueueProps">QueueProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name**                                                                   | **Description**                                        |
| -------------------------------------------------------------------------- | ------------------------------------------------------ |
| <code><a href="#@winglang/sdk.cloud.Queue.onMessage">on_message</a></code> | Create a function to consume messages from this queue. |

---

##### `on_message` <a name="on_message" id="@winglang/sdk.cloud.Queue.onMessage"></a>

```wing
on_message(inflight: ~Inflight, props?: QueueOnMessageProps): Function
```

Create a function to consume messages from this queue.

###### `inflight`<sup>Required</sup> <a name="inflight" id="@winglang/sdk.cloud.Queue.onMessage.parameter.inflight"></a>

- _Type:_ <a href="#@winglang/sdk.core.Inflight">Inflight</a>

---

###### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Queue.onMessage.parameter.props"></a>

- _Type:_ <a href="#@winglang/sdk.cloud.QueueOnMessageProps">QueueOnMessageProps</a>

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                         | **Type**                                                       | **Description**                                                                                     |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| <code><a href="#@winglang/sdk.cloud.Queue.property.node">node</a></code>         | <code>constructs.Node</code>                                   | The tree node.                                                                                      |
| <code><a href="#@winglang/sdk.cloud.Queue.property.display">display</a></code>   | <code><a href="#@winglang/sdk.core.Display">Display</a></code> | Information on how to display a resource in the UI.                                                 |
| <code><a href="#@winglang/sdk.cloud.Queue.property.stateful">stateful</a></code> | <code>bool</code>                                              | Whether a resource is stateful, i.e. it stores information that is not defined by your application. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.cloud.Queue.property.node"></a>

```wing
node: Node;
```

- _Type:_ constructs.Node

The tree node.

---

##### `display`<sup>Required</sup> <a name="display" id="@winglang/sdk.cloud.Queue.property.display"></a>

```wing
display: Display;
```

- _Type:_ <a href="#@winglang/sdk.core.Display">Display</a>

Information on how to display a resource in the UI.

---

##### `stateful`<sup>Required</sup> <a name="stateful" id="@winglang/sdk.cloud.Queue.property.stateful"></a>

```wing
stateful: bool;
```

- _Type:_ bool

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

| **Name**                                                                                   | **Type**                                                                    | **Description**   |
| ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------- | ----------------- |
| <code><a href="#@winglang/sdk.cloud.Schedule.Initializer.parameter.props">props</a></code> | <code><a href="#@winglang/sdk.cloud.ScheduleProps">ScheduleProps</a></code> | _No description._ |

---

##### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Schedule.Initializer.parameter.props"></a>

- _Type:_ <a href="#@winglang/sdk.cloud.ScheduleProps">ScheduleProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name**                                                                | **Description**                                                 |
| ----------------------------------------------------------------------- | --------------------------------------------------------------- |
| <code><a href="#@winglang/sdk.cloud.Schedule.onTick">on_tick</a></code> | Create a function that runs when receiving the scheduled event. |

---

##### `on_tick` <a name="on_tick" id="@winglang/sdk.cloud.Schedule.onTick"></a>

```wing
on_tick(inflight: ~Inflight, props?: ScheduleOnTickProps): Function
```

Create a function that runs when receiving the scheduled event.

###### `inflight`<sup>Required</sup> <a name="inflight" id="@winglang/sdk.cloud.Schedule.onTick.parameter.inflight"></a>

- _Type:_ <a href="#@winglang/sdk.core.Inflight">Inflight</a>

---

###### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Schedule.onTick.parameter.props"></a>

- _Type:_ <a href="#@winglang/sdk.cloud.ScheduleOnTickProps">ScheduleOnTickProps</a>

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                            | **Type**                                                       | **Description**                                                                                     |
| ----------------------------------------------------------------------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| <code><a href="#@winglang/sdk.cloud.Schedule.property.node">node</a></code>         | <code>constructs.Node</code>                                   | The tree node.                                                                                      |
| <code><a href="#@winglang/sdk.cloud.Schedule.property.display">display</a></code>   | <code><a href="#@winglang/sdk.core.Display">Display</a></code> | Information on how to display a resource in the UI.                                                 |
| <code><a href="#@winglang/sdk.cloud.Schedule.property.stateful">stateful</a></code> | <code>bool</code>                                              | Whether a resource is stateful, i.e. it stores information that is not defined by your application. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.cloud.Schedule.property.node"></a>

```wing
node: Node;
```

- _Type:_ constructs.Node

The tree node.

---

##### `display`<sup>Required</sup> <a name="display" id="@winglang/sdk.cloud.Schedule.property.display"></a>

```wing
display: Display;
```

- _Type:_ <a href="#@winglang/sdk.core.Display">Display</a>

Information on how to display a resource in the UI.

---

##### `stateful`<sup>Required</sup> <a name="stateful" id="@winglang/sdk.cloud.Schedule.property.stateful"></a>

```wing
stateful: bool;
```

- _Type:_ bool

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

| **Name**                                                                                       | **Type**                                                                 | **Description**   |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ----------------- |
| <code><a href="#@winglang/sdk.fs.TextFile.Initializer.parameter.filePath">file_path</a></code> | <code>str</code>                                                         | _No description._ |
| <code><a href="#@winglang/sdk.fs.TextFile.Initializer.parameter.props">props</a></code>        | <code><a href="#@winglang/sdk.fs.TextFileProps">TextFileProps</a></code> | _No description._ |

---

##### `file_path`<sup>Required</sup> <a name="file_path" id="@winglang/sdk.fs.TextFile.Initializer.parameter.filePath"></a>

- _Type:_ str

---

##### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.fs.TextFile.Initializer.parameter.props"></a>

- _Type:_ <a href="#@winglang/sdk.fs.TextFileProps">TextFileProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name**                                                               | **Description**                                                        |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| <code><a href="#@winglang/sdk.fs.TextFile.save">save</a></code>        | Render the contents of the file and save it to the user's file system. |
| <code><a href="#@winglang/sdk.fs.TextFile.addLine">add_line</a></code> | Append a line to the text file's contents.                             |

---

##### `save` <a name="save" id="@winglang/sdk.fs.TextFile.save"></a>

```wing
save(outdir: str): void
```

Render the contents of the file and save it to the user's file system.

###### `outdir`<sup>Required</sup> <a name="outdir" id="@winglang/sdk.fs.TextFile.save.parameter.outdir"></a>

- _Type:_ str

---

##### `add_line` <a name="add_line" id="@winglang/sdk.fs.TextFile.addLine"></a>

```wing
add_line(line: str): void
```

Append a line to the text file's contents.

###### `line`<sup>Required</sup> <a name="line" id="@winglang/sdk.fs.TextFile.addLine.parameter.line"></a>

- _Type:_ str

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                          | **Type**                     | **Description**                                   |
| --------------------------------------------------------------------------------- | ---------------------------- | ------------------------------------------------- |
| <code><a href="#@winglang/sdk.fs.TextFile.property.node">node</a></code>          | <code>constructs.Node</code> | The tree node.                                    |
| <code><a href="#@winglang/sdk.fs.TextFile.property.filePath">file_path</a></code> | <code>str</code>             | The file's relative path to the output directory. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.fs.TextFile.property.node"></a>

```wing
node: Node;
```

- _Type:_ constructs.Node

The tree node.

---

##### `file_path`<sup>Required</sup> <a name="file_path" id="@winglang/sdk.fs.TextFile.property.filePath"></a>

```wing
file_path: str;
```

- _Type:_ str

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

| **Name**                                                                                | **Type**                                                              | **Description**   |
| --------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ----------------- |
| <code><a href="#@winglang/sdk.cloud.Topic.Initializer.parameter.props">props</a></code> | <code><a href="#@winglang/sdk.cloud.TopicProps">TopicProps</a></code> | _No description._ |

---

##### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Topic.Initializer.parameter.props"></a>

- _Type:_ <a href="#@winglang/sdk.cloud.TopicProps">TopicProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name**                                                                   | **Description**                                                |
| -------------------------------------------------------------------------- | -------------------------------------------------------------- |
| <code><a href="#@winglang/sdk.cloud.Topic.onMessage">on_message</a></code> | Run an inflight whenever an message is published to the topic. |

---

##### `on_message` <a name="on_message" id="@winglang/sdk.cloud.Topic.onMessage"></a>

```wing
on_message(inflight: ~Inflight, props?: TopicOnMessageProps): Function
```

Run an inflight whenever an message is published to the topic.

###### `inflight`<sup>Required</sup> <a name="inflight" id="@winglang/sdk.cloud.Topic.onMessage.parameter.inflight"></a>

- _Type:_ <a href="#@winglang/sdk.core.Inflight">Inflight</a>

---

###### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Topic.onMessage.parameter.props"></a>

- _Type:_ <a href="#@winglang/sdk.cloud.TopicOnMessageProps">TopicOnMessageProps</a>

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                         | **Type**                                                       | **Description**                                                                                     |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| <code><a href="#@winglang/sdk.cloud.Topic.property.node">node</a></code>         | <code>constructs.Node</code>                                   | The tree node.                                                                                      |
| <code><a href="#@winglang/sdk.cloud.Topic.property.display">display</a></code>   | <code><a href="#@winglang/sdk.core.Display">Display</a></code> | Information on how to display a resource in the UI.                                                 |
| <code><a href="#@winglang/sdk.cloud.Topic.property.stateful">stateful</a></code> | <code>bool</code>                                              | Whether a resource is stateful, i.e. it stores information that is not defined by your application. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.cloud.Topic.property.node"></a>

```wing
node: Node;
```

- _Type:_ constructs.Node

The tree node.

---

##### `display`<sup>Required</sup> <a name="display" id="@winglang/sdk.cloud.Topic.property.display"></a>

```wing
display: Display;
```

- _Type:_ <a href="#@winglang/sdk.core.Display">Display</a>

Information on how to display a resource in the UI.

---

##### `stateful`<sup>Required</sup> <a name="stateful" id="@winglang/sdk.cloud.Topic.property.stateful"></a>

```wing
stateful: bool;
```

- _Type:_ bool

Whether a resource is stateful, i.e. it stores information that is not defined by your application.

A non-stateful resource does not remember information about past
transactions or events, and can typically be replaced by a cloud provider
with a fresh copy without any consequences.

---

## Structs <a name="Structs" id="Structs"></a>

### BucketDeleteOptions <a name="BucketDeleteOptions" id="@winglang/sdk.cloud.BucketDeleteOptions"></a>

Interface for delete method inside `Bucket`.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.BucketDeleteOptions.Initializer"></a>

```wing
bring cloud;

let bucket_delete_options = cloud.BucketDeleteOptions{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                                          | **Type**          | **Description**                                          |
| ------------------------------------------------------------------------------------------------- | ----------------- | -------------------------------------------------------- |
| <code><a href="#@winglang/sdk.cloud.BucketDeleteOptions.property.mustExist">must_exist</a></code> | <code>bool</code> | Check failures on the method and retrieve errors if any. |

---

##### `must_exist`<sup>Optional</sup> <a name="must_exist" id="@winglang/sdk.cloud.BucketDeleteOptions.property.mustExist"></a>

```wing
must_exist: bool;
```

- _Type:_ bool
- _Default:_ false

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

| **Name**                                                                           | **Type**          | **Description**                                             |
| ---------------------------------------------------------------------------------- | ----------------- | ----------------------------------------------------------- |
| <code><a href="#@winglang/sdk.cloud.BucketProps.property.public">public</a></code> | <code>bool</code> | Whether the bucket's objects should be publicly accessible. |

---

##### `public`<sup>Optional</sup> <a name="public" id="@winglang/sdk.cloud.BucketProps.property.public"></a>

```wing
public: bool;
```

- _Type:_ bool
- _Default:_ false

Whether the bucket's objects should be publicly accessible.

---

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

- _Type:_ num
- _Default:_ 0

| **Name**                                                                            | **Type**                       | **Description**             |
| ----------------------------------------------------------------------------------- | ------------------------------ | --------------------------- |
| <code><a href="#@winglang/sdk.cloud.ApiRequest.property.headers">headers</a></code> | <code>MutMap&lt;str&gt;</code> | The request's headers.      |
| <code><a href="#@winglang/sdk.cloud.ApiRequest.property.method">method</a></code>   | <code>str</code>               | The request's HTTP method.  |
| <code><a href="#@winglang/sdk.cloud.ApiRequest.property.path">path</a></code>       | <code>str</code>               | The request's path.         |
| <code><a href="#@winglang/sdk.cloud.ApiRequest.property.body">body</a></code>       | <code>any</code>               | The request's body.         |
| <code><a href="#@winglang/sdk.cloud.ApiRequest.property.query">query</a></code>     | <code>str</code>               | The request's query string. |
| <code><a href="#@winglang/sdk.cloud.ApiRequest.property.vars">vars</a></code>       | <code>MutMap&lt;str&gt;</code> | The path variables.         |

---

##### `headers`<sup>Required</sup> <a name="headers" id="@winglang/sdk.cloud.ApiRequest.property.headers"></a>

```wing
headers: MutMap<str>;
```

- _Type:_ MutMap&lt;str&gt;

The request's headers.

---

##### `method`<sup>Required</sup> <a name="method" id="@winglang/sdk.cloud.ApiRequest.property.method"></a>

```wing
method: str;
```

- _Type:_ str

The request's HTTP method.

---

##### `path`<sup>Required</sup> <a name="path" id="@winglang/sdk.cloud.ApiRequest.property.path"></a>

```wing
path: str;
```

- _Type:_ str

The request's path.

---

##### `body`<sup>Optional</sup> <a name="body" id="@winglang/sdk.cloud.ApiRequest.property.body"></a>

```wing
body: any;
```

- _Type:_ any

The request's body.

---

##### `query`<sup>Optional</sup> <a name="query" id="@winglang/sdk.cloud.ApiRequest.property.query"></a>

```wing
bring fs;

let json_file_props = fs.JsonFileProps{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                    | **Type**         | **Description**                                                    |
| --------------------------------------------------------------------------- | ---------------- | ------------------------------------------------------------------ |
| <code><a href="#@winglang/sdk.fs.JsonFileProps.property.obj">obj</a></code> | <code>any</code> | The object that will be serialized into the file during synthesis. |

---

##### `obj`<sup>Required</sup> <a name="obj" id="@winglang/sdk.fs.JsonFileProps.property.obj"></a>

```wing
obj: any;
```

- _Type:_ any

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

| **Name**                                                                             | **Type**                       | **Description**             |
| ------------------------------------------------------------------------------------ | ------------------------------ | --------------------------- |
| <code><a href="#@winglang/sdk.cloud.ApiResponse.property.status">status</a></code>   | <code>num</code>               | The response's status code. |
| <code><a href="#@winglang/sdk.cloud.ApiResponse.property.body">body</a></code>       | <code>any</code>               | The response's body.        |
| <code><a href="#@winglang/sdk.cloud.ApiResponse.property.headers">headers</a></code> | <code>MutMap&lt;str&gt;</code> | The response's headers.     |

---

##### `memory`<sup>Optional</sup> <a name="memory" id="@winglang/sdk.cloud.QueueOnMessageProps.property.memory"></a>

```wing
memory: num;
```

- _Type:_ num
- _Default:_ 128

The amount of memory to allocate to the function, in MB.

---

##### `timeout`<sup>Optional</sup> <a name="timeout" id="@winglang/sdk.cloud.QueueOnMessageProps.property.timeout"></a>

```wing
body: any;
```

- _Type:_ any

The response's body.

---

##### `headers`<sup>Optional</sup> <a name="headers" id="@winglang/sdk.cloud.ApiResponse.property.headers"></a>

```wing
headers: MutMap<str>;
```

- _Type:_ MutMap&lt;str&gt;

The response's headers.

---

##### `batch_size`<sup>Optional</sup> <a name="batch_size" id="@winglang/sdk.cloud.QueueOnMessageProps.property.batchSize"></a>

```wing
batch_size: num;
```

- _Type:_ num
- _Default:_ 1

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

| **Name**                                                                                             | **Type**                                                        | **Description**                                         |
| ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | ------------------------------------------------------- |
| <code><a href="#@winglang/sdk.cloud.QueueProps.property.initialMessages">initial_messages</a></code> | <code>MutArray&lt;str&gt;</code>                                | Initialize the queue with a set of messages.            |
| <code><a href="#@winglang/sdk.cloud.QueueProps.property.timeout">timeout</a></code>                  | <code><a href="#@winglang/sdk.std.Duration">Duration</a></code> | How long a queue's consumers have to process a message. |

---

##### `initial_messages`<sup>Optional</sup> <a name="initial_messages" id="@winglang/sdk.cloud.QueueProps.property.initialMessages"></a>

```wing
initial_messages: MutArray<str>;
```

- _Type:_ MutArray&lt;str&gt;
- _Default:_ []

Initialize the queue with a set of messages.

---

##### `timeout`<sup>Optional</sup> <a name="timeout" id="@winglang/sdk.cloud.QueueProps.property.timeout"></a>

```wing
timeout: Duration;
```

- _Type:_ <a href="#@winglang/sdk.std.Duration">Duration</a>
- _Default:_ Duration.fromSeconds(10)

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

| **Name**                                                                                     | **Type**                                                        | **Description**                                          |
| -------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | -------------------------------------------------------- |
| <code><a href="#@winglang/sdk.cloud.ScheduleOnTickProps.property.env">env</a></code>         | <code>MutMap&lt;str&gt;</code>                                  | Environment variables to pass to the function.           |
| <code><a href="#@winglang/sdk.cloud.ScheduleOnTickProps.property.memory">memory</a></code>   | <code>num</code>                                                | The amount of memory to allocate to the function, in MB. |
| <code><a href="#@winglang/sdk.cloud.ScheduleOnTickProps.property.timeout">timeout</a></code> | <code><a href="#@winglang/sdk.std.Duration">Duration</a></code> | The maximum amount of time the function can run.         |

---

##### `env`<sup>Optional</sup> <a name="env" id="@winglang/sdk.cloud.ScheduleOnTickProps.property.env"></a>

```wing
env: MutMap<str>;
```

- _Type:_ MutMap&lt;str&gt;
- _Default:_ No environment variables.

Environment variables to pass to the function.

---

##### `memory`<sup>Optional</sup> <a name="memory" id="@winglang/sdk.cloud.ScheduleOnTickProps.property.memory"></a>

```wing
memory: num;
```

- _Type:_ num
- _Default:_ 128

The amount of memory to allocate to the function, in MB.

---

##### `timeout`<sup>Optional</sup> <a name="timeout" id="@winglang/sdk.cloud.ScheduleOnTickProps.property.timeout"></a>

```wing
timeout: Duration;
```

- _Type:_ <a href="#@winglang/sdk.std.Duration">Duration</a>
- _Default:_ 1m

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

| **Name**                                                                         | **Type**                                                        | **Description**                                                         |
| -------------------------------------------------------------------------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------- |
| <code><a href="#@winglang/sdk.cloud.ScheduleProps.property.cron">cron</a></code> | <code>str</code>                                                | Trigger events according to a cron schedule using the UNIX cron format. |
| <code><a href="#@winglang/sdk.cloud.ScheduleProps.property.rate">rate</a></code> | <code><a href="#@winglang/sdk.std.Duration">Duration</a></code> | Trigger events at a periodic rate.                                      |

---

##### `cron`<sup>Optional</sup> <a name="cron" id="@winglang/sdk.cloud.ScheduleProps.property.cron"></a>

```wing
cron: str;
```

- _Type:_ str
- _Default:_ undefined

Trigger events according to a cron schedule using the UNIX cron format.

[minute] [hour] [day of month] [month] [day of week]

---

_Example_

```wing
"0/1 * ? * *"
```

##### `rate`<sup>Optional</sup> <a name="rate" id="@winglang/sdk.cloud.ScheduleProps.property.rate"></a>

```wing
rate: Duration;
```

- _Type:_ <a href="#@winglang/sdk.std.Duration">Duration</a>
- _Default:_ undefined

Trigger events at a periodic rate.

---

_Example_

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

| **Name**                                                                        | **Type**                         | **Description**                                                           |
| ------------------------------------------------------------------------------- | -------------------------------- | ------------------------------------------------------------------------- |
| <code><a href="#@winglang/sdk.fs.TextFileProps.property.lines">lines</a></code> | <code>MutArray&lt;str&gt;</code> | The lines of text that will be serialized into the file during synthesis. |

---

##### `lines`<sup>Optional</sup> <a name="lines" id="@winglang/sdk.fs.TextFileProps.property.lines"></a>

```wing
lines: MutArray<str>;
```

- _Type:_ MutArray&lt;str&gt;
- _Default:_ []

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

- _Implements:_ <a href="#@winglang/sdk.cloud.ICounterClient">ICounterClient</a>

Functionality shared between all `CounterClient` implementations regardless of the target.

#### Initializers <a name="Initializers" id="@winglang/sdk.cloud.CounterClientBase.Initializer"></a>

```wing
bring cloud;

new cloud.CounterClientBase()
```

| **Name** | **Type** | **Description** |
| -------- | -------- | --------------- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name**                                                                      | **Description**                                                                       |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| <code><a href="#@winglang/sdk.cloud.CounterClientBase.dec">dec</a></code>     | Decrement the counter, returning the previous value.                                  |
| <code><a href="#@winglang/sdk.cloud.CounterClientBase.inc">inc</a></code>     | Increments the counter atomically by a certain amount and returns the previous value. |
| <code><a href="#@winglang/sdk.cloud.CounterClientBase.peek">peek</a></code>   | Get the current value of the counter.                                                 |
| <code><a href="#@winglang/sdk.cloud.CounterClientBase.reset">reset</a></code> | Reset a counter to a given value.                                                     |

---

##### `dec` <a name="dec" id="@winglang/sdk.cloud.CounterClientBase.dec"></a>

```wing
dec(amount?: num): num
```

Decrement the counter, returning the previous value.

###### `amount`<sup>Optional</sup> <a name="amount" id="@winglang/sdk.cloud.CounterClientBase.dec.parameter.amount"></a>

- _Type:_ num

---

##### `inc` <a name="inc" id="@winglang/sdk.cloud.CounterClientBase.inc"></a>

```wing
inc(amount?: num): num
```

Increments the counter atomically by a certain amount and returns the previous value.

###### `amount`<sup>Optional</sup> <a name="amount" id="@winglang/sdk.cloud.CounterClientBase.inc.parameter.amount"></a>

- _Type:_ num

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

- _Type:_ num

---

### Duration <a name="Duration" id="@winglang/sdk.std.Duration"></a>

Represents a length of time.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name**                                                                        | **Description**                                      |
| ------------------------------------------------------------------------------- | ---------------------------------------------------- |
| <code><a href="#@winglang/sdk.std.Duration.fromHours">from_hours</a></code>     | Create a Duration representing an amount of hours.   |
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

- _Type:_ num

the amount of Hours the `Duration` will represent.

---

##### `from_minutes` <a name="from_minutes" id="@winglang/sdk.std.Duration.fromMinutes"></a>

```wing
bring std;

std.Duration.from_minutes(amount: num)
```

Create a Duration representing an amount of minutes.

###### `amount`<sup>Required</sup> <a name="amount" id="@winglang/sdk.std.Duration.fromMinutes.parameter.amount"></a>

- _Type:_ num

the amount of Minutes the `Duration` will represent.

---

##### `from_seconds` <a name="from_seconds" id="@winglang/sdk.std.Duration.fromSeconds"></a>

```wing
bring std;

std.Duration.from_seconds(amount: num)
```

Create a Duration representing an amount of seconds.

###### `amount`<sup>Required</sup> <a name="amount" id="@winglang/sdk.std.Duration.fromSeconds.parameter.amount"></a>

- _Type:_ num

the amount of Seconds the `Duration` will represent.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                        | **Type**         | **Description**                                      |
| ------------------------------------------------------------------------------- | ---------------- | ---------------------------------------------------- |
| <code><a href="#@winglang/sdk.std.Duration.property.hours">hours</a></code>     | <code>num</code> | Return the total number of hours in this Duration.   |
| <code><a href="#@winglang/sdk.std.Duration.property.minutes">minutes</a></code> | <code>num</code> | Return the total number of minutes in this Duration. |
| <code><a href="#@winglang/sdk.std.Duration.property.seconds">seconds</a></code> | <code>num</code> | Return the total number of seconds in this Duration. |

---

##### `hours`<sup>Required</sup> <a name="hours" id="@winglang/sdk.std.Duration.property.hours"></a>

```wing
hours: num;
```

- _Type:_ num

Return the total number of hours in this Duration.

---

##### `minutes`<sup>Required</sup> <a name="minutes" id="@winglang/sdk.std.Duration.property.minutes"></a>

```wing
minutes: num;
```

- _Type:_ num

Return the total number of minutes in this Duration.

---

##### `seconds`<sup>Required</sup> <a name="seconds" id="@winglang/sdk.std.Duration.property.seconds"></a>

```wing
seconds: num;
```

- _Type:_ num

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
| -------- | -------- | --------------- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name**                                                                      | **Description**                                 |
| ----------------------------------------------------------------------------- | ----------------------------------------------- |
| <code><a href="#@winglang/sdk.std.ImmutableArray.at">at</a></code>            | Get the value at the given index.               |
| <code><a href="#@winglang/sdk.std.ImmutableArray.copy">copy</a></code>        | Create an immutable shallow copy of this array. |
| <code><a href="#@winglang/sdk.std.ImmutableArray.copyMut">copy_mut</a></code> | Create a mutable shallow copy of this array.    |

---

##### `at` <a name="at" id="@winglang/sdk.std.ImmutableArray.at"></a>

```wing
at(index: num): T1
```

Get the value at the given index.

Whether the resource should be hidden from the UI.

---

##### `title`<sup>Optional</sup> <a name="title" id="@winglang/sdk.core.DisplayProps.property.title"></a>

```wing
title: str;
```

- _Type:_ str
- _Default:_ No title.

Title of the resource.

---

### FilesProps <a name="FilesProps" id="@winglang/sdk.core.FilesProps"></a>

Props for `Files`.

#### Initializer <a name="Initializer" id="@winglang/sdk.core.FilesProps.Initializer"></a>

```wing
bring core;

let files_props = core.FilesProps{ ... }
```

Create a mutable shallow copy of this array.

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                                | **Type**               | **Description**                                                  |
| --------------------------------------------------------------------------------------- | ---------------------- | ---------------------------------------------------------------- |
| <code><a href="#@winglang/sdk.core.FilesProps.property.app">app</a></code>              | <code>core.IApp</code> | The app with files to synthesize.                                |
| <code><a href="#@winglang/sdk.core.FilesProps.property.stateFile">state_file</a></code> | <code>str</code>       | The path to a state file which will track all synthesized files. |

---

##### `app`<sup>Required</sup> <a name="app" id="@winglang/sdk.core.FilesProps.property.app"></a>

```wing
app: IApp;
```

- _Type:_ core.IApp

The app with files to synthesize.

---

##### `state_file`<sup>Optional</sup> <a name="state_file" id="@winglang/sdk.core.FilesProps.property.stateFile"></a>

```wing
state_file: str;
```

- _Type:_ str
- _Default:_ no state file

The path to a state file which will track all synthesized files.

If a
statefile is not specified, we won't be able to remove extrenous files.

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

| **Name**                                                                               | **Type**                       | **Description**                                          |
| -------------------------------------------------------------------------------------- | ------------------------------ | -------------------------------------------------------- |
| <code><a href="#@winglang/sdk.cloud.FunctionProps.property.env">env</a></code>         | <code>MutMap&lt;str&gt;</code> | Environment variables to pass to the function.           |
| <code><a href="#@winglang/sdk.cloud.FunctionProps.property.memory">memory</a></code>   | <code>num</code>               | The amount of memory to allocate to the function, in MB. |
| <code><a href="#@winglang/sdk.cloud.FunctionProps.property.timeout">timeout</a></code> | <code>std.Duration</code>      | The maximum amount of time the function can run.         |

```wing
copy_mut(): MutableMap
```

##### `env`<sup>Optional</sup> <a name="env" id="@winglang/sdk.cloud.FunctionProps.property.env"></a>

```wing
env: MutMap<str>;
```

- _Type:_ MutMap&lt;str&gt;
- _Default:_ No environment variables.

Environment variables to pass to the function.

---

##### `memory`<sup>Optional</sup> <a name="memory" id="@winglang/sdk.cloud.FunctionProps.property.memory"></a>

```wing
memory: num;
```

- _Type:_ num
- _Default:_ 128

The amount of memory to allocate to the function, in MB.

---

##### `timeout`<sup>Optional</sup> <a name="timeout" id="@winglang/sdk.cloud.FunctionProps.property.timeout"></a>

```wing
timeout: Duration;
```

- _Type:_ std.Duration
- _Default:_ 1m

The maximum amount of time the function can run.

---

### InflightBinding <a name="InflightBinding" id="@winglang/sdk.core.InflightBinding"></a>

An inflight binding.

#### Initializer <a name="Initializer" id="@winglang/sdk.core.InflightBinding.Initializer"></a>

```wing
bring core;

let inflight_binding = core.InflightBinding{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                        | **Type**                         | **Description**                              |
| ------------------------------------------------------------------------------- | -------------------------------- | -------------------------------------------- |
| <code><a href="#@winglang/sdk.core.InflightBinding.property.obj">obj</a></code> | <code>any</code>                 | The resource or capturable value.            |
| <code><a href="#@winglang/sdk.core.InflightBinding.property.ops">ops</a></code> | <code>MutArray&lt;str&gt;</code> | The list of operations used on the resource. |

---

##### `obj`<sup>Required</sup> <a name="obj" id="@winglang/sdk.core.InflightBinding.property.obj"></a>

```wing
obj: any;
```

- _Type:_ any

The resource or capturable value.

---

##### `ops`<sup>Optional</sup> <a name="ops" id="@winglang/sdk.core.InflightBinding.property.ops"></a>

```wing
ops: MutArray<str>;
```

- _Type:_ MutArray&lt;str&gt;

The list of operations used on the resource.

---

### InflightProps <a name="InflightProps" id="@winglang/sdk.core.InflightProps"></a>

Props for `Inflight`.

```wing
bring core;

let inflight_props = core.InflightProps{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                                | **Type**                                        | **Description**                                                              |
| --------------------------------------------------------------------------------------- | ----------------------------------------------- | ---------------------------------------------------------------------------- |
| <code><a href="#@winglang/sdk.core.InflightProps.property.code">code</a></code>         | <code>core.Code</code>                          | Reference to the inflight code. Only JavaScript code is currently supported. |
| <code><a href="#@winglang/sdk.core.InflightProps.property.bindings">bindings</a></code> | <code>MutMap&lt;core.InflightBinding&gt;</code> | Data and resource binding information.                                       |

- _Type:_ <a href="#@winglang/sdk.std.T1">T1</a>

##### `code`<sup>Required</sup> <a name="code" id="@winglang/sdk.core.InflightProps.property.code"></a>

```wing
code: Code;
```

- _Type:_ core.Code

Reference to the inflight code. Only JavaScript code is currently supported.

The JavaScript code needs be in the form `async handle(event) { ... }`, and
all references to resources must be made through `this.<resource>`.

---

##### `bindings`<sup>Optional</sup> <a name="bindings" id="@winglang/sdk.core.InflightProps.property.bindings"></a>

```wing
bindings: MutMap<InflightBinding>;
```

- _Type:_ MutMap&lt;core.InflightBinding&gt;
- _Default:_ no bindings

Data and resource binding information.

---

### JsonFileProps <a name="JsonFileProps" id="@winglang/sdk.fs.JsonFileProps"></a>

Props for `JsonFile`.

#### Initializer <a name="Initializer" id="@winglang/sdk.fs.JsonFileProps.Initializer"></a>

```wing
bring fs;

let json_file_props = fs.JsonFileProps{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                    | **Type**         | **Description**                                                    |
| --------------------------------------------------------------------------- | ---------------- | ------------------------------------------------------------------ |
| <code><a href="#@winglang/sdk.fs.JsonFileProps.property.obj">obj</a></code> | <code>any</code> | The object that will be serialized into the file during synthesis. |

---

##### `obj`<sup>Required</sup> <a name="obj" id="@winglang/sdk.fs.JsonFileProps.property.obj"></a>

```wing
obj: any;
```

- _Type:_ any

The object that will be serialized into the file during synthesis.

- _Type:_ str

### OperationAnnotation <a name="OperationAnnotation" id="@winglang/sdk.core.OperationAnnotation"></a>

Annotations about what resources an inflight operation may access.

The following example says that the operation may call "put" on a resource
at "this.inner", or it may call "get" on a resource passed as an argument named
"other".

```wing
{ "this.inner": { ops: ["put"] }, "other": { ops: ["get"] } }
```

#### Initializer <a name="Initializer" id="@winglang/sdk.core.OperationAnnotation.Initializer"></a>

```wing
bring core;

let operation_annotation = core.OperationAnnotation{ ... }
```

### QueueOnMessageProps <a name="QueueOnMessageProps" id="@winglang/sdk.cloud.QueueOnMessageProps"></a>

Options for Queue.onMessage.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.QueueOnMessageProps.Initializer"></a>

```wing
bring cloud;

let queue_on_message_props = cloud.QueueOnMessageProps{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| -------- | -------- | --------------- |

---

#### Methods <a name="Methods" id="Methods"></a>

```wing
env: MutMap<str>;
```

---

##### `memory`<sup>Optional</sup> <a name="memory" id="@winglang/sdk.cloud.QueueOnMessageProps.property.memory"></a>

```wing
memory: num;
```

- _Type:_ num
- _Default:_ 128

The amount of memory to allocate to the function, in MB.

---

##### `timeout`<sup>Optional</sup> <a name="timeout" id="@winglang/sdk.cloud.QueueOnMessageProps.property.timeout"></a>

```wing
timeout: Duration;
```

- _Type:_ std.Duration
- _Default:_ 1m

The maximum amount of time the function can run.

---

##### `batch_size`<sup>Optional</sup> <a name="batch_size" id="@winglang/sdk.cloud.QueueOnMessageProps.property.batchSize"></a>

```wing
batch_size: num;
```

- _Type:_ num
- _Default:_ 1

The maximum number of messages to send to subscribers at once.

```wing
pop(): T1
```

### QueueProps <a name="QueueProps" id="@winglang/sdk.cloud.QueueProps"></a>

Properties for `Queue`.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.QueueProps.Initializer"></a>

```wing
bring cloud;

let queue_props = cloud.QueueProps{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                                             | **Type**                         | **Description**                                         |
| ---------------------------------------------------------------------------------------------------- | -------------------------------- | ------------------------------------------------------- |
| <code><a href="#@winglang/sdk.cloud.QueueProps.property.initialMessages">initial_messages</a></code> | <code>MutArray&lt;str&gt;</code> | Initialize the queue with a set of messages.            |
| <code><a href="#@winglang/sdk.cloud.QueueProps.property.timeout">timeout</a></code>                  | <code>std.Duration</code>        | How long a queue's consumers have to process a message. |

- _Type:_ <a href="#@winglang/sdk.std.T1">T1</a>

##### `initial_messages`<sup>Optional</sup> <a name="initial_messages" id="@winglang/sdk.cloud.QueueProps.property.initialMessages"></a>

```wing
initial_messages: MutArray<str>;
```

- _Type:_ MutArray&lt;str&gt;
- _Default:_ []

Initialize the queue with a set of messages.

---

##### `timeout`<sup>Optional</sup> <a name="timeout" id="@winglang/sdk.cloud.QueueProps.property.timeout"></a>

```wing
timeout: Duration;
```

- _Type:_ std.Duration
- _Default:_ Duration.fromSeconds(10)

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

| **Name**                                                                                     | **Type**                       | **Description**                                          |
| -------------------------------------------------------------------------------------------- | ------------------------------ | -------------------------------------------------------- |
| <code><a href="#@winglang/sdk.cloud.ScheduleOnTickProps.property.env">env</a></code>         | <code>MutMap&lt;str&gt;</code> | Environment variables to pass to the function.           |
| <code><a href="#@winglang/sdk.cloud.ScheduleOnTickProps.property.memory">memory</a></code>   | <code>num</code>               | The amount of memory to allocate to the function, in MB. |
| <code><a href="#@winglang/sdk.cloud.ScheduleOnTickProps.property.timeout">timeout</a></code> | <code>std.Duration</code>      | The maximum amount of time the function can run.         |

---

##### `env`<sup>Optional</sup> <a name="env" id="@winglang/sdk.cloud.ScheduleOnTickProps.property.env"></a>

```wing
env: MutMap<str>;
```

- _Type:_ MutMap&lt;str&gt;
- _Default:_ No environment variables.

Environment variables to pass to the function.

---

##### `memory`<sup>Optional</sup> <a name="memory" id="@winglang/sdk.cloud.ScheduleOnTickProps.property.memory"></a>

```wing
memory: num;
```

- _Type:_ num
- _Default:_ 128

The amount of memory to allocate to the function, in MB.

```wing
copy_mut(): MutableMap
```

##### `timeout`<sup>Optional</sup> <a name="timeout" id="@winglang/sdk.cloud.ScheduleOnTickProps.property.timeout"></a>

```wing
timeout: Duration;
```

- _Type:_ std.Duration
- _Default:_ 1m

The maximum amount of time the function can run.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.std.MutableMap.get.parameter.key"></a>

### ScheduleProps <a name="ScheduleProps" id="@winglang/sdk.cloud.ScheduleProps"></a>

Properties for `Schedule`.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.ScheduleProps.Initializer"></a>

```wing
bring cloud;

let schedule_props = cloud.ScheduleProps{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                         | **Type**                  | **Description**                                                         |
| -------------------------------------------------------------------------------- | ------------------------- | ----------------------------------------------------------------------- |
| <code><a href="#@winglang/sdk.cloud.ScheduleProps.property.cron">cron</a></code> | <code>str</code>          | Trigger events according to a cron schedule using the UNIX cron format. |
| <code><a href="#@winglang/sdk.cloud.ScheduleProps.property.rate">rate</a></code> | <code>std.Duration</code> | Trigger events at a periodic rate.                                      |

---

##### `cron`<sup>Optional</sup> <a name="cron" id="@winglang/sdk.cloud.ScheduleProps.property.cron"></a>

```wing
cron: str;
```

- _Type:_ str
- _Default:_ undefined

Trigger events according to a cron schedule using the UNIX cron format.

[minute] [hour] [day of month] [month] [day of week]

---

_Example_

```wing
"0/1 * ? * *"
```

##### `rate`<sup>Optional</sup> <a name="rate" id="@winglang/sdk.cloud.ScheduleProps.property.rate"></a>

```wing
rate: Duration;
```

- _Type:_ std.Duration
- _Default:_ undefined

Trigger events at a periodic rate.

---

_Example_

```wing
1m
```

### TextFileProps <a name="TextFileProps" id="@winglang/sdk.fs.TextFileProps"></a>

Props for `TextFile`.

- _Type:_ str

```wing
bring fs;

let text_file_props = fs.TextFileProps{ ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                        | **Type**                         | **Description**                                                           |
| ------------------------------------------------------------------------------- | -------------------------------- | ------------------------------------------------------------------------- |
| <code><a href="#@winglang/sdk.fs.TextFileProps.property.lines">lines</a></code> | <code>MutArray&lt;str&gt;</code> | The lines of text that will be serialized into the file during synthesis. |

---

##### `lines`<sup>Optional</sup> <a name="lines" id="@winglang/sdk.fs.TextFileProps.property.lines"></a>

```wing
lines: MutArray<str>;
```

- _Type:_ MutArray&lt;str&gt;
- _Default:_ []

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
bring core;

new core.DependencyGraph(node: Node)
```

| **Name**                                                                                       | **Type**                     | **Description**   |
| ---------------------------------------------------------------------------------------------- | ---------------------------- | ----------------- |
| <code><a href="#@winglang/sdk.core.DependencyGraph.Initializer.parameter.node">node</a></code> | <code>constructs.Node</code> | _No description._ |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.core.DependencyGraph.Initializer.parameter.node"></a>

- _Type:_ constructs.Node

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name**                                                                         | **Description**                                                          |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| <code><a href="#@winglang/sdk.core.DependencyGraph.topology">topology</a></code> | Returns a topologically sorted array of the constructs in the sub-graph. |

---

##### `topology` <a name="topology" id="@winglang/sdk.core.DependencyGraph.topology"></a>

```wing
topology(): MutArray<IConstruct>
```

Returns a topologically sorted array of the constructs in the sub-graph.

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                          | **Type**                           | **Description**                |
| --------------------------------------------------------------------------------- | ---------------------------------- | ------------------------------ |
| <code><a href="#@winglang/sdk.core.DependencyGraph.property.root">root</a></code> | <code>core.DependencyVertex</code> | Returns the root of the graph. |

---

##### `root`<sup>Required</sup> <a name="root" id="@winglang/sdk.core.DependencyGraph.property.root"></a>

```wing
root: DependencyVertex;
```

- _Type:_ core.DependencyVertex

Returns the root of the graph.

Note that this vertex will always have `null` as its `.value` since it is an artifical root
that binds all the connected spaces of the graph.

---

### DependencyVertex <a name="DependencyVertex" id="@winglang/sdk.core.DependencyVertex"></a>

Represents a vertex in the graph.

```wing
bring std;

new core.DependencyVertex(value?: IConstruct)
```

| **Name** | **Type** | **Description** |
| -------- | -------- | --------------- |

---

##### `value`<sup>Optional</sup> <a name="value" id="@winglang/sdk.core.DependencyVertex.Initializer.parameter.value"></a>

- _Type:_ constructs.IConstruct

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name**                                                                           | **Description**                                                          |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| <code><a href="#@winglang/sdk.core.DependencyVertex.addChild">add_child</a></code> | Adds a vertex as a dependency of the current node.                       |
| <code><a href="#@winglang/sdk.core.DependencyVertex.topology">topology</a></code>  | Returns a topologically sorted array of the constructs in the sub-graph. |

---

##### `add_child` <a name="add_child" id="@winglang/sdk.core.DependencyVertex.addChild"></a>

```wing
add_child(dep: DependencyVertex): void
```

Adds a vertex as a dependency of the current node.

Also updates the parents of `dep`, so that it contains this node as a parent.

This operation will fail in case it creates a cycle in the graph.

###### `dep`<sup>Required</sup> <a name="dep" id="@winglang/sdk.core.DependencyVertex.addChild.parameter.dep"></a>

- _Type:_ core.DependencyVertex

The dependency.

---

##### `topology` <a name="topology" id="@winglang/sdk.core.DependencyVertex.topology"></a>

```wing
topology(): MutArray<IConstruct>
```

Returns a topologically sorted array of the constructs in the sub-graph.

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                                   | **Type**                                           | **Description**                                        |
| ------------------------------------------------------------------------------------------ | -------------------------------------------------- | ------------------------------------------------------ |
| <code><a href="#@winglang/sdk.core.DependencyVertex.property.inbound">inbound</a></code>   | <code>MutArray&lt;core.DependencyVertex&gt;</code> | Returns the parents of the vertex (i.e dependants).    |
| <code><a href="#@winglang/sdk.core.DependencyVertex.property.outbound">outbound</a></code> | <code>MutArray&lt;core.DependencyVertex&gt;</code> | Returns the children of the vertex (i.e dependencies). |
| <code><a href="#@winglang/sdk.core.DependencyVertex.property.value">value</a></code>       | <code>constructs.IConstruct</code>                 | Returns the IConstruct this graph vertex represents.   |

---

##### `inbound`<sup>Required</sup> <a name="inbound" id="@winglang/sdk.core.DependencyVertex.property.inbound"></a>

```wing
inbound: MutArray<DependencyVertex>;
```

- _Type:_ MutArray&lt;core.DependencyVertex&gt;

Returns the parents of the vertex (i.e dependants).

---

##### `outbound`<sup>Required</sup> <a name="outbound" id="@winglang/sdk.core.DependencyVertex.property.outbound"></a>

```wing
outbound: MutArray<DependencyVertex>;
```

- _Type:_ MutArray&lt;core.DependencyVertex&gt;

Returns the children of the vertex (i.e dependencies).

---

##### `value`<sup>Optional</sup> <a name="value" id="@winglang/sdk.core.DependencyVertex.property.value"></a>

```wing
value: IConstruct;
```

- _Type:_ constructs.IConstruct

Returns the IConstruct this graph vertex represents.

`null` in case this is the root of the graph.

---

### Display <a name="Display" id="@winglang/sdk.core.Display"></a>

Information on how to display a resource in the UI.

#### Initializers <a name="Initializers" id="@winglang/sdk.core.Display.Initializer"></a>

```wing
bring core;

new core.Display(props?: DisplayProps)
```

| **Name**                                                                                 | **Type**                       | **Description**   |
| ---------------------------------------------------------------------------------------- | ------------------------------ | ----------------- |
| <code><a href="#@winglang/sdk.core.Display.Initializer.parameter.props">props</a></code> | <code>core.DisplayProps</code> | _No description._ |

---

##### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.core.Display.Initializer.parameter.props"></a>

- _Type:_ core.DisplayProps

---

Returns the character at the specified index.

| **Name**                                                                                | **Type**          | **Description**                                    |
| --------------------------------------------------------------------------------------- | ----------------- | -------------------------------------------------- |
| <code><a href="#@winglang/sdk.core.Display.property.description">description</a></code> | <code>str</code>  | Description of the resource.                       |
| <code><a href="#@winglang/sdk.core.Display.property.hidden">hidden</a></code>           | <code>bool</code> | Whether the resource should be hidden from the UI. |
| <code><a href="#@winglang/sdk.core.Display.property.title">title</a></code>             | <code>str</code>  | Title of the resource.                             |

---

##### `description`<sup>Optional</sup> <a name="description" id="@winglang/sdk.core.Display.property.description"></a>

```wing
description: str;
```

- _Type:_ str

Description of the resource.

---

##### `hidden`<sup>Optional</sup> <a name="hidden" id="@winglang/sdk.core.Display.property.hidden"></a>

```wing
hidden: bool;
```

- _Type:_ bool

Whether the resource should be hidden from the UI.

---

##### `title`<sup>Optional</sup> <a name="title" id="@winglang/sdk.core.Display.property.title"></a>

```wing
title: str;
```

- _Type:_ str

Title of the resource.

---

### Duration <a name="Duration" id="@winglang/sdk.std.Duration"></a>

Represents a length of time.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name**                                                                        | **Description**                                      |
| ------------------------------------------------------------------------------- | ---------------------------------------------------- |
| <code><a href="#@winglang/sdk.std.Duration.fromHours">from_hours</a></code>     | Create a Duration representing an amount of hours.   |
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

- _Type:_ num

the amount of Hours the `Duration` will represent.

---

##### `from_minutes` <a name="from_minutes" id="@winglang/sdk.std.Duration.fromMinutes"></a>

```wing
bring std;

std.Duration.from_minutes(amount: num)
```

Create a Duration representing an amount of minutes.

###### `amount`<sup>Required</sup> <a name="amount" id="@winglang/sdk.std.Duration.fromMinutes.parameter.amount"></a>

- _Type:_ num

the amount of Minutes the `Duration` will represent.

---

##### `from_seconds` <a name="from_seconds" id="@winglang/sdk.std.Duration.fromSeconds"></a>

```wing
bring std;

std.Duration.from_seconds(amount: num)
```

Create a Duration representing an amount of seconds.

###### `amount`<sup>Required</sup> <a name="amount" id="@winglang/sdk.std.Duration.fromSeconds.parameter.amount"></a>

- _Type:_ num

the amount of Seconds the `Duration` will represent.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                        | **Type**         | **Description**                                      |
| ------------------------------------------------------------------------------- | ---------------- | ---------------------------------------------------- |
| <code><a href="#@winglang/sdk.std.Duration.property.hours">hours</a></code>     | <code>num</code> | Return the total number of hours in this Duration.   |
| <code><a href="#@winglang/sdk.std.Duration.property.minutes">minutes</a></code> | <code>num</code> | Return the total number of minutes in this Duration. |
| <code><a href="#@winglang/sdk.std.Duration.property.seconds">seconds</a></code> | <code>num</code> | Return the total number of seconds in this Duration. |

---

##### `hours`<sup>Required</sup> <a name="hours" id="@winglang/sdk.std.Duration.property.hours"></a>

```wing
hours: num;
```

- _Type:_ num

Return the total number of hours in this Duration.

---

##### `minutes`<sup>Required</sup> <a name="minutes" id="@winglang/sdk.std.Duration.property.minutes"></a>

```wing
minutes: num;
```

- _Type:_ num

Return the total number of minutes in this Duration.

---

##### `seconds`<sup>Required</sup> <a name="seconds" id="@winglang/sdk.std.Duration.property.seconds"></a>

```wing
seconds: num;
```

- _Type:_ num

Return the total number of seconds in this Duration.

---

### Files <a name="Files" id="@winglang/sdk.core.Files"></a>

Handles the synthesis of files.

#### Initializers <a name="Initializers" id="@winglang/sdk.core.Files.Initializer"></a>

```wing
bring core;

new core.Files(props: FilesProps)
```

| **Name**                                                                               | **Type**                     | **Description**   |
| -------------------------------------------------------------------------------------- | ---------------------------- | ----------------- |
| <code><a href="#@winglang/sdk.core.Files.Initializer.parameter.props">props</a></code> | <code>core.FilesProps</code> | _No description._ |

---

##### `props`<sup>Required</sup> <a name="props" id="@winglang/sdk.core.Files.Initializer.parameter.props"></a>

- _Type:_ core.FilesProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name**                                                         | **Description**                               |
| ---------------------------------------------------------------- | --------------------------------------------- |
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

- _Type:_ str

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                           | **Type**         | **Description**                                                  |
| ---------------------------------------------------------------------------------- | ---------------- | ---------------------------------------------------------------- |
| <code><a href="#@winglang/sdk.core.Files.property.stateFile">state_file</a></code> | <code>str</code> | The path to a state file which will track all synthesized files. |

---

##### `state_file`<sup>Optional</sup> <a name="state_file" id="@winglang/sdk.core.Files.property.stateFile"></a>

```wing
state_file: str;
```

Checks if string includes substring.

###### `search_string`<sup>Required</sup> <a name="search_string" id="@winglang/sdk.std.String.contains.parameter.searchString"></a>

- _Type:_ str

The path to a state file which will track all synthesized files.

---

### ImmutableArray <a name="ImmutableArray" id="@winglang/sdk.std.ImmutableArray"></a>

Immutable Array.

#### Initializers <a name="Initializers" id="@winglang/sdk.std.ImmutableArray.Initializer"></a>

```wing
bring std;

new std.ImmutableArray()
```

| **Name** | **Type** | **Description** |
| -------- | -------- | --------------- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name**                                                                      | **Description**                                 |
| ----------------------------------------------------------------------------- | ----------------------------------------------- |
| <code><a href="#@winglang/sdk.std.ImmutableArray.at">at</a></code>            | Get the value at the given index.               |
| <code><a href="#@winglang/sdk.std.ImmutableArray.copy">copy</a></code>        | Create an immutable shallow copy of this array. |
| <code><a href="#@winglang/sdk.std.ImmutableArray.copyMut">copy_mut</a></code> | Create a mutable shallow copy of this array.    |

---

##### `at` <a name="at" id="@winglang/sdk.std.ImmutableArray.at"></a>

```wing
at(index: num): T1
```

Get the value at the given index.

###### `index`<sup>Required</sup> <a name="index" id="@winglang/sdk.std.ImmutableArray.at.parameter.index"></a>

- _Type:_ num

index of the value to get.

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

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                            | **Type**         | **Description**          |
| ----------------------------------------------------------------------------------- | ---------------- | ------------------------ |
| <code><a href="#@winglang/sdk.std.ImmutableArray.property.length">length</a></code> | <code>num</code> | The length of the array. |

---

##### `length`<sup>Required</sup> <a name="length" id="@winglang/sdk.std.ImmutableArray.property.length"></a>

```wing
length: num;
```

- _Type:_ num

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
| -------- | -------- | --------------- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name**                                                                    | **Description**                                                                       |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| <code><a href="#@winglang/sdk.std.ImmutableMap.copy">copy</a></code>        | Create an immutable shallow copy of this map.                                         |
| <code><a href="#@winglang/sdk.std.ImmutableMap.copyMut">copy_mut</a></code> | Create a mutable shallow copy of this map.                                            |
| <code><a href="#@winglang/sdk.std.ImmutableMap.get">get</a></code>          | Returns a specified element from the map.                                             |
| <code><a href="#@winglang/sdk.std.ImmutableMap.has">has</a></code>          | Returns a boolean indicating whether an element with the specified key exists or not. |
| <code><a href="#@winglang/sdk.std.ImmutableMap.size">size</a></code>        | Returns the number of elements in the map.                                            |

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

- _Type:_ str

The key of the element to return.

---

##### `has` <a name="has" id="@winglang/sdk.std.ImmutableMap.has"></a>

```wing
has(key: str): bool
```

Returns a boolean indicating whether an element with the specified key exists or not.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.std.ImmutableMap.has.parameter.key"></a>

- _Type:_ str

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
| -------- | -------- | --------------- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name**                                                                    | **Description**                                                                             |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| <code><a href="#@winglang/sdk.std.ImmutableSet.copy">copy</a></code>        | Create an immutable shallow copy of this set.                                               |
| <code><a href="#@winglang/sdk.std.ImmutableSet.copyMut">copy_mut</a></code> | Create a mutable shallow copy of this set.                                                  |
| <code><a href="#@winglang/sdk.std.ImmutableSet.has">has</a></code>          | Returns a boolean indicating whether an element with the specified value exists in the set. |

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

- _Type:_ std.T1

The value to test for presence in the Set object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                      | **Type**         | **Description**        |
| ----------------------------------------------------------------------------- | ---------------- | ---------------------- |
| <code><a href="#@winglang/sdk.std.ImmutableSet.property.size">size</a></code> | <code>num</code> | The length of the set. |

---

##### `size`<sup>Required</sup> <a name="size" id="@winglang/sdk.std.ImmutableSet.property.size"></a>

```wing
size: num;
```

- _Type:_ num

The length of the set.

---

### InflightClient <a name="InflightClient" id="@winglang/sdk.core.InflightClient"></a>

Utility class with functions about inflight clients.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name**                                                              | **Description**                                                      |
| --------------------------------------------------------------------- | -------------------------------------------------------------------- |
| <code><a href="#@winglang/sdk.core.InflightClient.for">for</a></code> | Creates a `Code` instance with code for creating an inflight client. |

---

##### `for` <a name="for" id="@winglang/sdk.core.InflightClient.for"></a>

```wing
bring core;

core.InflightClient.for(filename: str, client_class: str, args: MutArray<str>)
```

Creates a `Code` instance with code for creating an inflight client.

###### `filename`<sup>Required</sup> <a name="filename" id="@winglang/sdk.core.InflightClient.for.parameter.filename"></a>

- _Type:_ str

substring to search for.

###### `client_class`<sup>Required</sup> <a name="client_class" id="@winglang/sdk.core.InflightClient.for.parameter.clientClass"></a>

- _Type:_ str

---

###### `args`<sup>Required</sup> <a name="args" id="@winglang/sdk.core.InflightClient.for.parameter.args"></a>

- _Type:_ MutArray&lt;str&gt;

---

### MutableArray <a name="MutableArray" id="@winglang/sdk.std.MutableArray"></a>

Mutable Array.

#### Initializers <a name="Initializers" id="@winglang/sdk.std.MutableArray.Initializer"></a>

```wing
bring std;

new std.MutableArray()
```

| **Name** | **Type** | **Description** |
| -------- | -------- | --------------- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name**                                                                    | **Description**                                 |
| --------------------------------------------------------------------------- | ----------------------------------------------- |
| <code><a href="#@winglang/sdk.std.MutableArray.at">at</a></code>            | Get the value at the given index.               |
| <code><a href="#@winglang/sdk.std.MutableArray.copy">copy</a></code>        | Create an immutable shallow copy of this array. |
| <code><a href="#@winglang/sdk.std.MutableArray.copyMut">copy_mut</a></code> | Create a mutable shallow copy of this array.    |
| <code><a href="#@winglang/sdk.std.MutableArray.pop">pop</a></code>          | Remove value from end of array.                 |
| <code><a href="#@winglang/sdk.std.MutableArray.push">push</a></code>        | Add value to end of array.                      |

---

##### `at` <a name="at" id="@winglang/sdk.std.MutableArray.at"></a>

```wing
at(index: num): T1
```

Get the value at the given index.

###### `index`<sup>Required</sup> <a name="index" id="@winglang/sdk.std.MutableArray.at.parameter.index"></a>

- _Type:_ num

index of the value to get.

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

- _Type:_ std.T1

value to add.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                          | **Type**         | **Description**          |
| --------------------------------------------------------------------------------- | ---------------- | ------------------------ |
| <code><a href="#@winglang/sdk.std.MutableArray.property.length">length</a></code> | <code>num</code> | The length of the array. |

---

##### `length`<sup>Required</sup> <a name="length" id="@winglang/sdk.std.MutableArray.property.length"></a>

```wing
length: num;
```

- _Type:_ num

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
| -------- | -------- | --------------- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name**                                                                  | **Description**                                                                       |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| <code><a href="#@winglang/sdk.std.MutableMap.copy">copy</a></code>        | Create an immutable shallow copy of this map.                                         |
| <code><a href="#@winglang/sdk.std.MutableMap.copyMut">copy_mut</a></code> | Create a mutable shallow copy of this map.                                            |
| <code><a href="#@winglang/sdk.std.MutableMap.get">get</a></code>          | Returns a specified element from the map.                                             |
| <code><a href="#@winglang/sdk.std.MutableMap.has">has</a></code>          | Returns a boolean indicating whether an element with the specified key exists or not. |
| <code><a href="#@winglang/sdk.std.MutableMap.size">size</a></code>        | Returns the number of elements in the map.                                            |
| <code><a href="#@winglang/sdk.std.MutableMap.clear">clear</a></code>      | Removes all elements.                                                                 |
| <code><a href="#@winglang/sdk.std.MutableMap.delete">delete</a></code>    | Removes the specified element from a map.                                             |
| <code><a href="#@winglang/sdk.std.MutableMap.set">set</a></code>          | Adds or updates an entry in a Map object with a specified key and a value.            |

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

- _Type:_ str

The key of the element to return.

---

##### `has` <a name="has" id="@winglang/sdk.std.MutableMap.has"></a>

```wing
has(key: str): bool
```

Returns a boolean indicating whether an element with the specified key exists or not.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.std.MutableMap.has.parameter.key"></a>

- _Type:_ str

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

- _Type:_ str

The key.

---

##### `set` <a name="set" id="@winglang/sdk.std.MutableMap.set"></a>

```wing
set(key: str, value: T1): void
```

Adds or updates an entry in a Map object with a specified key and a value.

TODO: revisit this macro after we support indexed args https://github.com/winglang/wing/issues/1659

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.std.MutableMap.set.parameter.key"></a>

- _Type:_ str

The key of the element to add.

---

###### `value`<sup>Required</sup> <a name="value" id="@winglang/sdk.std.MutableMap.set.parameter.value"></a>

- _Type:_ std.T1

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
| -------- | -------- | --------------- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name**                                                                  | **Description**                                                                             |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| <code><a href="#@winglang/sdk.std.MutableSet.copy">copy</a></code>        | Create an immutable shallow copy of this set.                                               |
| <code><a href="#@winglang/sdk.std.MutableSet.copyMut">copy_mut</a></code> | Create a mutable shallow copy of this set.                                                  |
| <code><a href="#@winglang/sdk.std.MutableSet.has">has</a></code>          | Returns a boolean indicating whether an element with the specified value exists in the set. |
| <code><a href="#@winglang/sdk.std.MutableSet.add">add</a></code>          | Add value to set.                                                                           |
| <code><a href="#@winglang/sdk.std.MutableSet.clear">clear</a></code>      | The clear() method removes all elements from a set.                                         |
| <code><a href="#@winglang/sdk.std.MutableSet.delete">delete</a></code>    | Removes a specified value from a set, if it is in the set.                                  |

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

- _Type:_ std.T1

The value to test for presence in the Set object.

---

##### `add` <a name="add" id="@winglang/sdk.std.MutableSet.add"></a>

```wing
add(value: T1): MutableSet
```

Add value to set.

###### `value`<sup>Required</sup> <a name="value" id="@winglang/sdk.std.MutableSet.add.parameter.value"></a>

- _Type:_ std.T1

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

- _Type:_ std.T1

The value to remove from the set.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                    | **Type**         | **Description**        |
| --------------------------------------------------------------------------- | ---------------- | ---------------------- |
| <code><a href="#@winglang/sdk.std.MutableSet.property.size">size</a></code> | <code>num</code> | The length of the set. |

---

##### `size`<sup>Required</sup> <a name="size" id="@winglang/sdk.std.MutableSet.property.size"></a>

```wing
size: num;
```

- _Type:_ num

The length of the set.

---

### NodeJsCode <a name="NodeJsCode" id="@winglang/sdk.core.NodeJsCode"></a>

Reference to a piece of Node.js code.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

---

##### `from_file` <a name="from_file" id="@winglang/sdk.core.NodeJsCode.fromFile"></a>

```wing
bring core;

core.NodeJsCode.from_file(path: str)
```

Reference code from a file path.

###### `path`<sup>Required</sup> <a name="path" id="@winglang/sdk.core.NodeJsCode.fromFile.parameter.path"></a>

- _Type:_ str

---

##### `from_inline` <a name="from_inline" id="@winglang/sdk.core.NodeJsCode.fromInline"></a>

```wing
bring core;

core.NodeJsCode.from_inline(text: str)
```

Reference code directly from a string.

###### `text`<sup>Required</sup> <a name="text" id="@winglang/sdk.core.NodeJsCode.fromInline.parameter.text"></a>

- _Type:_ str

---

---

##### `hash`<sup>Required</sup> <a name="hash" id="@winglang/sdk.core.NodeJsCode.property.hash"></a>

```wing
hash: str;
```

- _Type:_ str

Generate a hash of the code contents.

---

##### `language`<sup>Required</sup> <a name="language" id="@winglang/sdk.core.NodeJsCode.property.language"></a>

```wing
language: Language;
```

- _Type:_ core.Language

The language of the code.

---

##### `path`<sup>Required</sup> <a name="path" id="@winglang/sdk.core.NodeJsCode.property.path"></a>

```wing
path: str;
```

- _Type:_ str

A path to the code in the user's file system that can be referenced for bundling purposes.

---

##### `text`<sup>Required</sup> <a name="text" id="@winglang/sdk.core.NodeJsCode.property.text"></a>

```wing
text: str;
```

- _Type:_ str

The code contents.

---

### String <a name="String" id="@winglang/sdk.std.String"></a>

String.

#### Initializers <a name="Initializers" id="@winglang/sdk.std.String.Initializer"></a>

```wing
bring std;

new std.String()
```

| **Name** | **Type** | **Description** |
| -------- | -------- | --------------- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name**                                                                 | **Description**                                                      |
| ------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| <code><a href="#@winglang/sdk.std.String.at">at</a></code>               | Returns the character at the specified index.                        |
| <code><a href="#@winglang/sdk.std.String.concat">concat</a></code>       | Combines the text of two (or more) strings and returns a new string. |
| <code><a href="#@winglang/sdk.std.String.contains">contains</a></code>   | Checks if string includes substring.                                 |
| <code><a href="#@winglang/sdk.std.String.ends">ends</a></code>           | Does this string end with the given searchString?                    |
| <code><a href="#@winglang/sdk.std.String.indexOf">index_of</a></code>    | Returns the index of the first occurrence of searchString found.     |
| <code><a href="#@winglang/sdk.std.String.lowercase">lowercase</a></code> | Returns this string in lower case.                                   |
| <code><a href="#@winglang/sdk.std.String.split">split</a></code>         | Splits string by separator.                                          |
| <code><a href="#@winglang/sdk.std.String.starts">starts</a></code>       | Does this string start with the given searchString?                  |
| <code><a href="#@winglang/sdk.std.String.substring">substring</a></code> | Returns a string between indexStart, indexEnd.                       |
| <code><a href="#@winglang/sdk.std.String.trim">trim</a></code>           | Removes white spaces from start and end of this string.              |
| <code><a href="#@winglang/sdk.std.String.uppercase">uppercase</a></code> | Returns this string in upper case.                                   |

---

##### `at` <a name="at" id="@winglang/sdk.std.String.at"></a>

```wing
at(index: num): str
```

Returns the character at the specified index.

###### `index`<sup>Required</sup> <a name="index" id="@winglang/sdk.std.String.at.parameter.index"></a>

- _Type:_ num

position of the character.

---

##### `concat` <a name="concat" id="@winglang/sdk.std.String.concat"></a>

```wing
concat(str_n: str): str
```

Combines the text of two (or more) strings and returns a new string.

###### `str_n`<sup>Required</sup> <a name="str_n" id="@winglang/sdk.std.String.concat.parameter.strN"></a>

- _Type:_ str

one or more strings to concatenate to this string.

---

##### `contains` <a name="contains" id="@winglang/sdk.std.String.contains"></a>

```wing
contains(search_string: str): bool
```

Checks if string includes substring.

###### `search_string`<sup>Required</sup> <a name="search_string" id="@winglang/sdk.std.String.contains.parameter.searchString"></a>

- _Type:_ str

substring to search for.

---

##### `ends` <a name="ends" id="@winglang/sdk.std.String.ends"></a>

```wing
ends(search_string: str): bool
```

Does this string end with the given searchString?

###### `search_string`<sup>Required</sup> <a name="search_string" id="@winglang/sdk.std.String.ends.parameter.searchString"></a>

- _Type:_ str

substring to search for.

---

##### `index_of` <a name="index_of" id="@winglang/sdk.std.String.indexOf"></a>

```wing
index_of(search_string: str): num
```

Returns the index of the first occurrence of searchString found.

###### `search_string`<sup>Required</sup> <a name="search_string" id="@winglang/sdk.std.String.indexOf.parameter.searchString"></a>

- _Type:_ str

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

- _Type:_ str

separator to split by.

---

##### `starts` <a name="starts" id="@winglang/sdk.std.String.starts"></a>

```wing
starts(search_string: str): bool
```

Does this string start with the given searchString?

###### `search_string`<sup>Required</sup> <a name="search_string" id="@winglang/sdk.std.String.starts.parameter.searchString"></a>

- _Type:_ str

substring to search for.

---

##### `substring` <a name="substring" id="@winglang/sdk.std.String.substring"></a>

```wing
substring(index_start: num, index_end?: num): str
```

Returns a string between indexStart, indexEnd.

###### `index_start`<sup>Required</sup> <a name="index_start" id="@winglang/sdk.std.String.substring.parameter.indexStart"></a>

- _Type:_ num

index of the character we slice at.

---

###### `index_end`<sup>Optional</sup> <a name="index_end" id="@winglang/sdk.std.String.substring.parameter.indexEnd"></a>

- _Type:_ num

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

| **Name**                                                                    | **Type**         | **Description**           |
| --------------------------------------------------------------------------- | ---------------- | ------------------------- |
| <code><a href="#@winglang/sdk.std.String.property.length">length</a></code> | <code>num</code> | The length of the string. |

---

##### `length`<sup>Required</sup> <a name="length" id="@winglang/sdk.std.String.property.length"></a>

```wing
length: num;
```

- _Type:_ num

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
| -------- | -------- | --------------- |

---

### TreeInspector <a name="TreeInspector" id="@winglang/sdk.core.TreeInspector"></a>

Inspector that maintains an attribute bag.

#### Initializers <a name="Initializers" id="@winglang/sdk.core.TreeInspector.Initializer"></a>

```wing
bring core;

new core.TreeInspector()
```

| **Name** | **Type** | **Description** |
| -------- | -------- | --------------- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name**                                                                                | **Description**        |
| --------------------------------------------------------------------------------------- | ---------------------- |
| <code><a href="#@winglang/sdk.core.TreeInspector.addAttribute">add_attribute</a></code> | Adds attribute to bag. |

##### `add_attribute` <a name="add_attribute" id="@winglang/sdk.core.TreeInspector.addAttribute"></a>

```wing
add_attribute(key: str, value: any): void
```

Adds attribute to bag.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.core.TreeInspector.addAttribute.parameter.key"></a>

- _Type:_ str

key for metadata.

---

###### `value`<sup>Required</sup> <a name="value" id="@winglang/sdk.core.TreeInspector.addAttribute.parameter.value"></a>

- _Type:_ any

value of metadata.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                                    | **Type**                       | **Description**                                      |
| ------------------------------------------------------------------------------------------- | ------------------------------ | ---------------------------------------------------- |
| <code><a href="#@winglang/sdk.core.TreeInspector.property.attributes">attributes</a></code> | <code>MutMap&lt;any&gt;</code> | Represents the bag of attributes as key-value pairs. |

---

##### `attributes`<sup>Required</sup> <a name="attributes" id="@winglang/sdk.core.TreeInspector.property.attributes"></a>

```wing
attributes: MutMap<any>;
```

- _Type:_ MutMap&lt;any&gt;

Represents the bag of attributes as key-value pairs.

- _Type:_ str

## Protocols <a name="Protocols" id="Protocols"></a>

### IApiEndpointHandlerClient <a name="IApiEndpointHandlerClient" id="@winglang/sdk.cloud.IApiEndpointHandlerClient"></a>

- _Implemented By:_ cloud.IApiEndpointHandlerClient

Inflight client for `IApiEndpointHandler`.

#### Methods <a name="Methods" id="Methods"></a>

| **Name**                                                                                | **Description**                                                      |
| --------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| <code><a href="#@winglang/sdk.cloud.IApiEndpointHandlerClient.handle">handle</a></code> | Inflight that will be called when a request is made to the endpoint. |

---

##### `substring` <a name="substring" id="@winglang/sdk.std.String.substring"></a>

```wing
substring(index_start: num, index_end?: num): str
```

Returns a string between indexStart, indexEnd.

###### `index_start`<sup>Required</sup> <a name="index_start" id="@winglang/sdk.std.String.substring.parameter.indexStart"></a>

- _Type:_ num

index of the character we slice at.

---

###### `index_end`<sup>Optional</sup> <a name="index_end" id="@winglang/sdk.std.String.substring.parameter.indexEnd"></a>

- _Type:_ num

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

| **Name**                                                                    | **Type**         | **Description**           |
| --------------------------------------------------------------------------- | ---------------- | ------------------------- |
| <code><a href="#@winglang/sdk.std.String.property.length">length</a></code> | <code>num</code> | The length of the string. |

---

##### `length`<sup>Required</sup> <a name="length" id="@winglang/sdk.std.String.property.length"></a>

```wing
length: num;
```

- _Type:_ num

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
| -------- | -------- | --------------- |

---

## Protocols <a name="Protocols" id="Protocols"></a>

### IBucketClient <a name="IBucketClient" id="@winglang/sdk.cloud.IBucketClient"></a>

- _Implemented By:_ <a href="#@winglang/sdk.cloud.IBucketClient">IBucketClient</a>

Inflight interface for `Bucket`.

#### Methods <a name="Methods" id="Methods"></a>

| **Name**                                                                       | **Description**                                        |
| ------------------------------------------------------------------------------ | ------------------------------------------------------ |
| <code><a href="#@winglang/sdk.cloud.IBucketClient.delete">delete</a></code>    | Delete an existing object using a key from the bucket. |
| <code><a href="#@winglang/sdk.cloud.IBucketClient.get">get</a></code>          | Retrieve an object from the bucket.                    |
| <code><a href="#@winglang/sdk.cloud.IBucketClient.getJson">get_json</a></code> | Retrieve a Json object from the bucket.                |
| <code><a href="#@winglang/sdk.cloud.IBucketClient.list">list</a></code>        | Retrieve existing objects keys from the bucket.        |
| <code><a href="#@winglang/sdk.cloud.IBucketClient.put">put</a></code>          | Put an object in the bucket.                           |
| <code><a href="#@winglang/sdk.cloud.IBucketClient.putJson">put_json</a></code> | Put a Json object in the bucket.                       |

---

##### `delete` <a name="delete" id="@winglang/sdk.cloud.IBucketClient.delete"></a>

```wing
delete(key: str, opts?: BucketDeleteOptions): void
```

**Inflight client:** [true](#true)

Delete an existing object using a key from the bucket.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.cloud.IBucketClient.delete.parameter.key"></a>

- _Type:_ str

Key of the object.

---

###### `opts`<sup>Optional</sup> <a name="opts" id="@winglang/sdk.cloud.IBucketClient.delete.parameter.opts"></a>

- _Type:_ <a href="#@winglang/sdk.cloud.BucketDeleteOptions">BucketDeleteOptions</a>

Options available for delete an item from a bucket.

---

##### `get` <a name="get" id="@winglang/sdk.cloud.IBucketClient.get"></a>

```wing
get(key: str): str
```

**Inflight client:** [true](#true)

Retrieve an object from the bucket.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.cloud.IBucketClient.get.parameter.key"></a>

- _Type:_ str

Key of the object.

---

##### `get_json` <a name="get_json" id="@winglang/sdk.cloud.IBucketClient.getJson"></a>

```wing
get_json(key: str): Json
```

**Inflight client:** [true](#true)

Retrieve a Json object from the bucket.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.cloud.IBucketClient.getJson.parameter.key"></a>

- _Type:_ str

Key of the object.

---

##### `list` <a name="list" id="@winglang/sdk.cloud.IBucketClient.list"></a>

```wing
list(prefix?: str): MutArray<str>
```

**Inflight client:** [true](#true)

Retrieve existing objects keys from the bucket.

###### `prefix`<sup>Optional</sup> <a name="prefix" id="@winglang/sdk.cloud.IBucketClient.list.parameter.prefix"></a>

- _Type:_ str

Limits the response to keys that begin with the specified prefix.

---

##### `put` <a name="put" id="@winglang/sdk.cloud.IBucketClient.put"></a>

```wing
put(key: str, body: str): void
```

**Inflight client:** [true](#true)

Put an object in the bucket.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.cloud.IBucketClient.put.parameter.key"></a>

- _Type:_ str

Key of the object.

---

###### `body`<sup>Required</sup> <a name="body" id="@winglang/sdk.cloud.IBucketClient.put.parameter.body"></a>

- _Type:_ str

Content of the object we want to store into the bucket.

---

##### `put_json` <a name="put_json" id="@winglang/sdk.cloud.IBucketClient.putJson"></a>

```wing
put_json(key: str, body: Json): void
```

**Inflight client:** [true](#true)

Put a Json object in the bucket.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.cloud.IBucketClient.putJson.parameter.key"></a>

- _Type:_ str

Key of the object.

---

###### `body`<sup>Required</sup> <a name="body" id="@winglang/sdk.cloud.IBucketClient.putJson.parameter.body"></a>

- _Type:_ <a href="#@winglang/sdk.std.Json">Json</a>

Json object that we want to store into the bucket.

---

### ICounterClient <a name="ICounterClient" id="@winglang/sdk.cloud.ICounterClient"></a>

- _Implemented By:_ <a href="#@winglang/sdk.cloud.CounterClientBase">CounterClientBase</a>, <a href="#@winglang/sdk.cloud.ICounterClient">ICounterClient</a>

Inflight interface for `Counter`.

#### Methods <a name="Methods" id="Methods"></a>

| **Name**                                                                   | **Description**                                                                       |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| <code><a href="#@winglang/sdk.cloud.ICounterClient.dec">dec</a></code>     | Decrement the counter, returning the previous value.                                  |
| <code><a href="#@winglang/sdk.cloud.ICounterClient.inc">inc</a></code>     | Increments the counter atomically by a certain amount and returns the previous value. |
| <code><a href="#@winglang/sdk.cloud.ICounterClient.peek">peek</a></code>   | Get the current value of the counter.                                                 |
| <code><a href="#@winglang/sdk.cloud.ICounterClient.reset">reset</a></code> | Reset a counter to a given value.                                                     |

---

##### `dec` <a name="dec" id="@winglang/sdk.cloud.ICounterClient.dec"></a>

```wing
dec(amount?: num): num
```

**Inflight client:** [true](#true)

Decrement the counter, returning the previous value.

###### `amount`<sup>Optional</sup> <a name="amount" id="@winglang/sdk.cloud.ICounterClient.dec.parameter.amount"></a>

- _Type:_ num

amount to decrement (default is 1).

---

##### `inc` <a name="inc" id="@winglang/sdk.cloud.ICounterClient.inc"></a>

```wing
inc(amount?: num): num
```

**Inflight client:** [true](#true)

Increments the counter atomically by a certain amount and returns the previous value.

###### `amount`<sup>Optional</sup> <a name="amount" id="@winglang/sdk.cloud.ICounterClient.inc.parameter.amount"></a>

- _Type:_ num

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

- _Type:_ num

value to reset (default is 0).

---

### IFunctionClient <a name="IFunctionClient" id="@winglang/sdk.cloud.IFunctionClient"></a>

- _Implemented By:_ <a href="#@winglang/sdk.cloud.IFunctionClient">IFunctionClient</a>

Inflight interface for `Function`.

#### Methods <a name="Methods" id="Methods"></a>

| **Name**                                                                      | **Description**                                          |
| ----------------------------------------------------------------------------- | -------------------------------------------------------- |
| <code><a href="#@winglang/sdk.cloud.IFunctionClient.invoke">invoke</a></code> | Invoke the function asynchronously with a given payload. |

---

##### `invoke` <a name="invoke" id="@winglang/sdk.cloud.IFunctionClient.invoke"></a>

```wing
invoke(payload: str): str
```

**Inflight client:** [true](#true)

Invoke the function asynchronously with a given payload.

###### `payload`<sup>Required</sup> <a name="payload" id="@winglang/sdk.cloud.IFunctionClient.invoke.parameter.payload"></a>

- _Type:_ str

---

### IFunctionHandler <a name="IFunctionHandler" id="@winglang/sdk.cloud.IFunctionHandler"></a>

- _Extends:_ <a href="#@winglang/sdk.core.IResource">IResource</a>

- _Implemented By:_ <a href="#@winglang/sdk.cloud.IFunctionHandler">IFunctionHandler</a>

**Inflight client:** [wingsdk.cloud.IFunctionHandlerClient](#wingsdk.cloud.IFunctionHandlerClient)

Represents a resource with an inflight "handle" method that can be used to create a `cloud.Function`.

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                                  | **Type**                                                       | **Description**                                     |
| ----------------------------------------------------------------------------------------- | -------------------------------------------------------------- | --------------------------------------------------- |
| <code><a href="#@winglang/sdk.cloud.IFunctionHandler.property.node">node</a></code>       | <code>constructs.Node</code>                                   | The tree node.                                      |
| <code><a href="#@winglang/sdk.cloud.IFunctionHandler.property.display">display</a></code> | <code><a href="#@winglang/sdk.core.Display">Display</a></code> | Information on how to display a resource in the UI. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.cloud.IFunctionHandler.property.node"></a>

```wing
node: Node;
```

- _Type:_ constructs.Node

The tree node.

---

##### `display`<sup>Required</sup> <a name="display" id="@winglang/sdk.cloud.IFunctionHandler.property.display"></a>

```wing
display: Display;
```

- _Type:_ <a href="#@winglang/sdk.core.Display">Display</a>

Information on how to display a resource in the UI.

---

### IFunctionHandlerClient <a name="IFunctionHandlerClient" id="@winglang/sdk.cloud.IFunctionHandlerClient"></a>

- _Implemented By:_ <a href="#@winglang/sdk.cloud.IFunctionHandlerClient">IFunctionHandlerClient</a>

Inflight client for `IFunctionHandler`.

#### Methods <a name="Methods" id="Methods"></a>

| **Name**                                                                             | **Description**                                                             |
| ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------- |
| <code><a href="#@winglang/sdk.cloud.IFunctionHandlerClient.handle">handle</a></code> | Entrypoint function that will be called when the cloud function is invoked. |

---

##### `handle` <a name="handle" id="@winglang/sdk.cloud.IFunctionHandlerClient.handle"></a>

```wing
handle(event: str): void
```

**Inflight client:** [true](#true)

Entrypoint function that will be called when the cloud function is invoked.

###### `event`<sup>Required</sup> <a name="event" id="@winglang/sdk.cloud.IFunctionHandlerClient.handle.parameter.event"></a>

- _Type:_ str

---

### IInflightHost <a name="IInflightHost" id="@winglang/sdk.core.IInflightHost"></a>

- _Extends:_ core.IResource

- _Implemented By:_ cloud.Function, cloud.FunctionBase, sim.Function, tfaws.Function, tfazure.Function, core.IInflightHost

A resource that can run inflight code.

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                              | **Type**                     | **Description**                                     |
| ------------------------------------------------------------------------------------- | ---------------------------- | --------------------------------------------------- |
| <code><a href="#@winglang/sdk.core.IInflightHost.property.node">node</a></code>       | <code>constructs.Node</code> | The tree node.                                      |
| <code><a href="#@winglang/sdk.core.IInflightHost.property.display">display</a></code> | <code>core.Display</code>    | Information on how to display a resource in the UI. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.core.IInflightHost.property.node"></a>

```wing
node: Node;
```

- _Type:_ constructs.Node

The tree node.

---

##### `display`<sup>Required</sup> <a name="display" id="@winglang/sdk.core.IInflightHost.property.display"></a>

```wing
display: Display;
```

- _Type:_ core.Display

Information on how to display a resource in the UI.

---

### IInspectable <a name="IInspectable" id="@winglang/sdk.core.IInspectable"></a>

- _Implemented By:_ cloud.Api, cloud.ApiBase, cloud.Bucket, cloud.BucketBase, cloud.Counter, cloud.CounterBase, cloud.Function, cloud.FunctionBase, cloud.Logger, cloud.LoggerBase, cloud.Queue, cloud.QueueBase, cloud.Schedule, cloud.ScheduleBase, cloud.Topic, cloud.TopicBase, core.Inflight, core.Resource, sim.Bucket, sim.Counter, sim.Function, sim.Logger, sim.Queue, sim.Topic, tfaws.Api, tfaws.Bucket, tfaws.Counter, tfaws.Function, tfaws.Queue, tfaws.Schedule, tfazure.Bucket, tfazure.Function, tfgcp.Bucket, tfgcp.Logger, cloud.IFunctionHandler, cloud.IQueueOnMessageHandler, cloud.IScheduleOnTickHandler, cloud.ITopicOnMessageHandler, core.IInflightHost, core.IInspectable, core.IResource

Interface for examining a construct and exposing metadata.

### ILoggerClient <a name="ILoggerClient" id="@winglang/sdk.cloud.ILoggerClient"></a>

- _Implemented By:_ <a href="#@winglang/sdk.cloud.ILoggerClient">ILoggerClient</a>

Inflight interface for `Logger`.

#### Methods <a name="Methods" id="Methods"></a>

| **Name**                                                                  | **Description**                                                                                  |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
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

- _Type:_ str

The message to print.

---

### IQueueClient <a name="IQueueClient" id="@winglang/sdk.cloud.IQueueClient"></a>

- _Implemented By:_ <a href="#@winglang/sdk.cloud.IQueueClient">IQueueClient</a>

Inflight interface for `Queue`.

#### Methods <a name="Methods" id="Methods"></a>

| **Name**                                                                            | **Description**                                           |
| ----------------------------------------------------------------------------------- | --------------------------------------------------------- |
| <code><a href="#@winglang/sdk.cloud.IQueueClient.approxSize">approx_size</a></code> | Retrieve the approximate number of messages in the queue. |
| <code><a href="#@winglang/sdk.cloud.IQueueClient.purge">purge</a></code>            | Purge all of the messages in the queue.                   |
| <code><a href="#@winglang/sdk.cloud.IQueueClient.push">push</a></code>              | Push a message to the queue.                              |

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

- _Type:_ str

Payload to send to the queue.

---

### IQueueOnMessageHandler <a name="IQueueOnMessageHandler" id="@winglang/sdk.cloud.IQueueOnMessageHandler"></a>

- _Extends:_ <a href="#@winglang/sdk.core.IResource">IResource</a>

- _Implemented By:_ <a href="#@winglang/sdk.cloud.IQueueOnMessageHandler">IQueueOnMessageHandler</a>

**Inflight client:** [wingsdk.cloud.IQueueOnMessageHandlerClient](#wingsdk.cloud.IQueueOnMessageHandlerClient)

Represents a resource with an inflight "handle" method that can be passed to `Queue.on_message`.

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                                        | **Type**                                                       | **Description**                                     |
| ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | --------------------------------------------------- |
| <code><a href="#@winglang/sdk.cloud.IQueueOnMessageHandler.property.node">node</a></code>       | <code>constructs.Node</code>                                   | The tree node.                                      |
| <code><a href="#@winglang/sdk.cloud.IQueueOnMessageHandler.property.display">display</a></code> | <code><a href="#@winglang/sdk.core.Display">Display</a></code> | Information on how to display a resource in the UI. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.cloud.IQueueOnMessageHandler.property.node"></a>

```wing
node: Node;
```

- _Type:_ constructs.Node

The tree node.

---

##### `display`<sup>Required</sup> <a name="display" id="@winglang/sdk.cloud.IQueueOnMessageHandler.property.display"></a>

```wing
display: Display;
```

- _Type:_ <a href="#@winglang/sdk.core.Display">Display</a>

Information on how to display a resource in the UI.

---

### IQueueOnMessageHandlerClient <a name="IQueueOnMessageHandlerClient" id="@winglang/sdk.cloud.IQueueOnMessageHandlerClient"></a>

- _Implemented By:_ <a href="#@winglang/sdk.cloud.IQueueOnMessageHandlerClient">IQueueOnMessageHandlerClient</a>

Inflight client for `IQueueOnMessageHandler`.

#### Methods <a name="Methods" id="Methods"></a>

| **Name**                                                                                   | **Description**                                                         |
| ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| <code><a href="#@winglang/sdk.cloud.IQueueOnMessageHandlerClient.handle">handle</a></code> | Function that will be called when a message is received from the queue. |

---

##### `handle` <a name="handle" id="@winglang/sdk.cloud.IQueueOnMessageHandlerClient.handle"></a>

```wing
handle(message: str): void
```

**Inflight client:** [true](#true)

Function that will be called when a message is received from the queue.

###### `message`<sup>Required</sup> <a name="message" id="@winglang/sdk.cloud.IQueueOnMessageHandlerClient.handle.parameter.message"></a>

- _Type:_ str

---

### IResource <a name="IResource" id="@winglang/sdk.core.IResource"></a>

- _Extends:_ core.IInspectable, constructs.IConstruct

- _Implemented By:_ cloud.Api, cloud.ApiBase, cloud.Bucket, cloud.BucketBase, cloud.Counter, cloud.CounterBase, cloud.Function, cloud.FunctionBase, cloud.Logger, cloud.LoggerBase, cloud.Queue, cloud.QueueBase, cloud.Schedule, cloud.ScheduleBase, cloud.Topic, cloud.TopicBase, core.Inflight, core.Resource, sim.Bucket, sim.Counter, sim.Function, sim.Logger, sim.Queue, sim.Topic, tfaws.Api, tfaws.Bucket, tfaws.Counter, tfaws.Function, tfaws.Queue, tfaws.Schedule, tfazure.Bucket, tfazure.Function, tfgcp.Bucket, tfgcp.Logger, cloud.IFunctionHandler, cloud.IQueueOnMessageHandler, cloud.IScheduleOnTickHandler, cloud.ITopicOnMessageHandler, core.IInflightHost, core.IResource

Abstract interface for `Resource`.

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                          | **Type**                     | **Description**                                     |
| --------------------------------------------------------------------------------- | ---------------------------- | --------------------------------------------------- |
| <code><a href="#@winglang/sdk.core.IResource.property.node">node</a></code>       | <code>constructs.Node</code> | The tree node.                                      |
| <code><a href="#@winglang/sdk.core.IResource.property.display">display</a></code> | <code>core.Display</code>    | Information on how to display a resource in the UI. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.core.IResource.property.node"></a>

```wing
node: Node;
```

- _Type:_ constructs.Node

The tree node.

---

##### `display`<sup>Required</sup> <a name="display" id="@winglang/sdk.core.IResource.property.display"></a>

```wing
display: Display;
```

- _Type:_ core.Display

Information on how to display a resource in the UI.

---

### IScheduleOnTickHandler <a name="IScheduleOnTickHandler" id="@winglang/sdk.cloud.IScheduleOnTickHandler"></a>

- _Extends:_ <a href="#@winglang/sdk.core.IResource">IResource</a>

- _Implemented By:_ <a href="#@winglang/sdk.cloud.IScheduleOnTickHandler">IScheduleOnTickHandler</a>

**Inflight client:** [wingsdk.cloud.IScheduleOnTickHandlerClient](#wingsdk.cloud.IScheduleOnTickHandlerClient)

Represents a resource with an inflight "handle" method that can be passed to `Schedule.on_tick`.

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                                        | **Type**                                                       | **Description**                                     |
| ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | --------------------------------------------------- |
| <code><a href="#@winglang/sdk.cloud.IScheduleOnTickHandler.property.node">node</a></code>       | <code>constructs.Node</code>                                   | The tree node.                                      |
| <code><a href="#@winglang/sdk.cloud.IScheduleOnTickHandler.property.display">display</a></code> | <code><a href="#@winglang/sdk.core.Display">Display</a></code> | Information on how to display a resource in the UI. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.cloud.IScheduleOnTickHandler.property.node"></a>

```wing
node: Node;
```

- _Type:_ constructs.Node

The tree node.

---

##### `display`<sup>Required</sup> <a name="display" id="@winglang/sdk.cloud.IScheduleOnTickHandler.property.display"></a>

```wing
display: Display;
```

- _Type:_ <a href="#@winglang/sdk.core.Display">Display</a>

Information on how to display a resource in the UI.

---

### IScheduleOnTickHandlerClient <a name="IScheduleOnTickHandlerClient" id="@winglang/sdk.cloud.IScheduleOnTickHandlerClient"></a>

- _Implemented By:_ <a href="#@winglang/sdk.cloud.IScheduleOnTickHandlerClient">IScheduleOnTickHandlerClient</a>

Inflight client for `IScheduleOnTickHandler`.

#### Methods <a name="Methods" id="Methods"></a>

| **Name**                                                                                   | **Description**                                                            |
| ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------- |
| <code><a href="#@winglang/sdk.cloud.IScheduleOnTickHandlerClient.handle">handle</a></code> | Function that will be called when a message is received from the schedule. |

---

##### `handle` <a name="handle" id="@winglang/sdk.cloud.IScheduleOnTickHandlerClient.handle"></a>

```wing
handle(): void
```

**Inflight client:** [true](#true)

Function that will be called when a message is received from the schedule.

### ITopicClient <a name="ITopicClient" id="@winglang/sdk.cloud.ITopicClient"></a>

- _Implemented By:_ <a href="#@winglang/sdk.cloud.ITopicClient">ITopicClient</a>

Inflight interface for `Topic`.

#### Methods <a name="Methods" id="Methods"></a>

| **Name**                                                                     | **Description**           |
| ---------------------------------------------------------------------------- | ------------------------- |
| <code><a href="#@winglang/sdk.cloud.ITopicClient.publish">publish</a></code> | Publish message to topic. |

---

##### `publish` <a name="publish" id="@winglang/sdk.cloud.ITopicClient.publish"></a>

```wing
publish(message: str): void
```

**Inflight client:** [true](#true)

Publish message to topic.

###### `message`<sup>Required</sup> <a name="message" id="@winglang/sdk.cloud.ITopicClient.publish.parameter.message"></a>

- _Type:_ str

Payload to publish to Topic.

---

### ITopicOnMessageHandler <a name="ITopicOnMessageHandler" id="@winglang/sdk.cloud.ITopicOnMessageHandler"></a>

- _Extends:_ <a href="#@winglang/sdk.core.IResource">IResource</a>

- _Implemented By:_ <a href="#@winglang/sdk.cloud.ITopicOnMessageHandler">ITopicOnMessageHandler</a>

**Inflight client:** [wingsdk.cloud.ITopicOnMessageHandlerClient](#wingsdk.cloud.ITopicOnMessageHandlerClient)

Represents a resource with an inflight "handle" method that can be passed to `Topic.on_message`.

#### Properties <a name="Properties" id="Properties"></a>

| **Name**                                                                                        | **Type**                                                       | **Description**                                     |
| ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | --------------------------------------------------- |
| <code><a href="#@winglang/sdk.cloud.ITopicOnMessageHandler.property.node">node</a></code>       | <code>constructs.Node</code>                                   | The tree node.                                      |
| <code><a href="#@winglang/sdk.cloud.ITopicOnMessageHandler.property.display">display</a></code> | <code><a href="#@winglang/sdk.core.Display">Display</a></code> | Information on how to display a resource in the UI. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.cloud.ITopicOnMessageHandler.property.node"></a>

```wing
node: Node;
```

- _Type:_ constructs.Node

The tree node.

---

##### `display`<sup>Required</sup> <a name="display" id="@winglang/sdk.cloud.ITopicOnMessageHandler.property.display"></a>

```wing
display: Display;
```

- _Type:_ <a href="#@winglang/sdk.core.Display">Display</a>

Information on how to display a resource in the UI.

---

### ITopicOnMessageHandlerClient <a name="ITopicOnMessageHandlerClient" id="@winglang/sdk.cloud.ITopicOnMessageHandlerClient"></a>

- _Implemented By:_ <a href="#@winglang/sdk.cloud.ITopicOnMessageHandlerClient">ITopicOnMessageHandlerClient</a>

Inflight client for `ITopicOnMessageHandler`.

#### Methods <a name="Methods" id="Methods"></a>

| **Name**                                                                                   | **Description**                                                         |
| ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| <code><a href="#@winglang/sdk.cloud.ITopicOnMessageHandlerClient.handle">handle</a></code> | Function that will be called when a message is received from the topic. |

---

##### `handle` <a name="handle" id="@winglang/sdk.cloud.ITopicOnMessageHandlerClient.handle"></a>

```wing
handle(event: str): void
```

**Inflight client:** [true](#true)

Function that will be called when a message is received from the topic.

###### `event`<sup>Required</sup> <a name="event" id="@winglang/sdk.cloud.ITopicOnMessageHandlerClient.handle.parameter.event"></a>

- _Type:_ str

---
