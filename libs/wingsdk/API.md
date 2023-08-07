## API Reference <a name="API Reference" id="API Reference"></a>

### Service <a name="Service" id="@winglang/sdk.cloud.Service"></a>

A long-running service.

#### Initializers <a name="Initializers" id="@winglang/sdk.cloud.Service.Initializer"></a>

```wing
bring cloud;

new cloud.Service(props: ServiceProps);
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Service.Initializer.parameter.props">props</a></code> | <code><a href="#@winglang/sdk.cloud.ServiceProps">ServiceProps</a></code> | *No description.* |

---

##### `props`<sup>Required</sup> <a name="props" id="@winglang/sdk.cloud.Service.Initializer.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.cloud.ServiceProps">ServiceProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

##### Inflight Methods

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.IServiceClient.start">start</a></code> | Start the service. |
| <code><a href="#@winglang/sdk.cloud.IServiceClient.stop">stop</a></code> | Stop the service. |

---

##### `start` <a name="start" id="@winglang/sdk.cloud.IServiceClient.start"></a>

```wing
inflight start(): void
```

Start the service.

##### `stop` <a name="stop" id="@winglang/sdk.cloud.IServiceClient.stop"></a>

```wing
inflight stop(): void
```

Stop the service.


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



## Structs <a name="Structs" id="Structs"></a>

### ServiceOnStartProps <a name="ServiceOnStartProps" id="@winglang/sdk.cloud.ServiceOnStartProps"></a>

Options for Service.onStart.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.ServiceOnStartProps.Initializer"></a>

```wing
bring cloud;

let ServiceOnStartProps = cloud.ServiceOnStartProps{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.ServiceOnStartProps.property.env">env</a></code> | <code>MutMap&lt;str&gt;</code> | Environment variables to pass to the function. |
| <code><a href="#@winglang/sdk.cloud.ServiceOnStartProps.property.memory">memory</a></code> | <code>num</code> | The amount of memory to allocate to the function, in MB. |
| <code><a href="#@winglang/sdk.cloud.ServiceOnStartProps.property.timeout">timeout</a></code> | <code><a href="#@winglang/sdk.std.Duration">duration</a></code> | The maximum amount of time the function can run. |

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
timeout: duration;
```

- *Type:* <a href="#@winglang/sdk.std.Duration">duration</a>
- *Default:* 1m

The maximum amount of time the function can run.

---

### ServiceProps <a name="ServiceProps" id="@winglang/sdk.cloud.ServiceProps"></a>

Options for `Service`.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.ServiceProps.Initializer"></a>

```wing
bring cloud;

let ServiceProps = cloud.ServiceProps{ ... };
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

## Protocols <a name="Protocols" id="Protocols"></a>

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
inflight handle(): void
```

Function that will be called for service events.


### IServiceOnEventHandler <a name="IServiceOnEventHandler" id="@winglang/sdk.cloud.IServiceOnEventHandler"></a>

- *Extends:* <a href="#@winglang/sdk.std.IResource">IResource</a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.IServiceOnEventHandler">IServiceOnEventHandler</a>

**Inflight client:** [@winglang/sdk.cloud.IServiceOnEventClient](#@winglang/sdk.cloud.IServiceOnEventClient)

A resource with an inflight "handle" method that can be passed to `ServiceProps.on_start` || `ServiceProps.on_stop`.


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

