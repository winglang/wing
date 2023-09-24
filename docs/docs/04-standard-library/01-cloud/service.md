---
title: Service
id: service
description: A built-in resource for publishing messages to subscribers.
keywords:
  [
    Wing reference,
    Wing language,
    language,
    Wing standard library,
    Wing programming language,
    services,
  ]
sidebar_position: 1
---

The `cloud.Service` class represents a cloud service that has a start and optional stop lifecycle.

Services are a common way to define long running code, such as web servers and custom daemons.

## Usage

### Creating a service

```js
bring cloud;

// At minimum a service needs to have an onStart handler.
let service = new cloud.Service(
  onStart: inflight() => {
    log("Service started...");
  }
);
```

### Disable auto-start

By default the service resource will start automatically, however this can be disabled by
passing `autoStart: false` to the constructor.

```js
bring cloud;

let service = new cloud.Service(
  autoStart: false,
  onStart: inflight() => {
    log("Service started...");
  }
);
```

### Defining service with stop behavior

```js
bring cloud;

let service = new cloud.Service(
  onStart: inflight() => {
    log("Service started...");
  },
  onStop: inflight() => {
    log("Service stopped...");
  },
);
```

### Stopping and starting a service

The inflight methods `start` and `stop` are used exactly how they sound, to stop and start the service.
Here is an example of using a service that will track how often it is started and stopped using counters.
An important aspect to note is that consecutive starts and stops have no affect on a service. For example
if a `service.start()` is called on a service that is already started, nothing will happen.

```js
bring cloud;

let startCounter = new cloud.Counter() as "start counter";
let stopCounter = new cloud.Counter() as "stop counter";

let service = new cloud.Service(
  autoStart: false,
  onStart: inflight() => {
    let i = startCounter.inc();
    log("Service started for the ${i}th time...");
  },
  onStop: inflight() => {
    let i = stopCounter.inc();
    log("Service stopped for the ${i}th time...");
  },
);

// Functions to stop and start the service
new cloud.Function(inflight() => {
  service.start();
}) as "start service";

new cloud.Function(inflight() => {
  service.stop();
}) as "stop service";
```

## Target-specific details

### Simulator (`sim`)

Within the context of the simulator, services are just spawned processes ran within a node vm.

### AWS (`tf-aws` and `awscdk`)

🚧 Not supported yet (tracking issue: [#1306](https://github.com/winglang/wing/issues/1306))

### Azure (`tf-azure`)

🚧 Not supported yet (tracking issue: [#1307](https://github.com/winglang/wing/issues/1307))

### GCP (`tf-gcp`)

🚧 Not supported yet (tracking issue: [#1308](https://github.com/winglang/wing/issues/1308))
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

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.cloud.Service.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

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
| <code><a href="#@winglang/sdk.cloud.ServiceProps.property.onStart">onStart</a></code> | <code><a href="#@winglang/sdk.cloud.IServiceOnStartHandler">IServiceOnStartHandler</a></code> | Handler to run when the service starts. |
| <code><a href="#@winglang/sdk.cloud.ServiceProps.property.autoStart">autoStart</a></code> | <code>bool</code> | Whether the service should start automatically. |
| <code><a href="#@winglang/sdk.cloud.ServiceProps.property.onStop">onStop</a></code> | <code><a href="#@winglang/sdk.cloud.IServiceOnStopHandler">IServiceOnStopHandler</a></code> | Handler to run in order to stop the service. |

---

##### `onStart`<sup>Required</sup> <a name="onStart" id="@winglang/sdk.cloud.ServiceProps.property.onStart"></a>

```wing
onStart: IServiceOnStartHandler;
```

- *Type:* <a href="#@winglang/sdk.cloud.IServiceOnStartHandler">IServiceOnStartHandler</a>

Handler to run when the service starts.

This is where you implement the initialization logic of
the service, start any activities asychronously, and return a context object that will be
passed into the `onStop(context)` handler.

DO NOT BLOCK! This handler should return as quickly as possible. If you need to run a long
running process, start it asynchronously.

---

##### `autoStart`<sup>Optional</sup> <a name="autoStart" id="@winglang/sdk.cloud.ServiceProps.property.autoStart"></a>

```wing
autoStart: bool;
```

- *Type:* bool
- *Default:* true

Whether the service should start automatically.

If `false`, the service will need to be started
manually by calling the inflight `start()` method.

---

##### `onStop`<sup>Optional</sup> <a name="onStop" id="@winglang/sdk.cloud.ServiceProps.property.onStop"></a>

```wing
onStop: IServiceOnStopHandler;
```

- *Type:* <a href="#@winglang/sdk.cloud.IServiceOnStopHandler">IServiceOnStopHandler</a>
- *Default:* no special activity at shutdown

Handler to run in order to stop the service.

This is where you implement the shutdown logic of
the service, stop any activities, and clean up any resources.

The handler will be called with the context object returned from `onStart()`.

---

## Protocols <a name="Protocols" id="Protocols"></a>

### IServiceOnStartHandler <a name="IServiceOnStartHandler" id="@winglang/sdk.cloud.IServiceOnStartHandler"></a>

- *Extends:* <a href="#@winglang/sdk.std.IResource">IResource</a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.IServiceOnStartHandler">IServiceOnStartHandler</a>

**Inflight client:** [@winglang/sdk.cloud.IServiceOnStartHandlerClient](#@winglang/sdk.cloud.IServiceOnStartHandlerClient)

A resource with an inflight "handle" method that can be passed to `ServiceProps.onStart`.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.IServiceOnStartHandler.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.cloud.IServiceOnStartHandler.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

### IServiceOnStartHandlerClient <a name="IServiceOnStartHandlerClient" id="@winglang/sdk.cloud.IServiceOnStartHandlerClient"></a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.IServiceOnStartHandlerClient">IServiceOnStartHandlerClient</a>

Inflight client for `IServiceOnStartHandler`.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.IServiceOnStartHandlerClient.handle">handle</a></code> | Function that will be called for service events. |

---

##### `handle` <a name="handle" id="@winglang/sdk.cloud.IServiceOnStartHandlerClient.handle"></a>

```wing
inflight handle(): any
```

Function that will be called for service events.


### IServiceOnStopHandler <a name="IServiceOnStopHandler" id="@winglang/sdk.cloud.IServiceOnStopHandler"></a>

- *Extends:* <a href="#@winglang/sdk.std.IResource">IResource</a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.IServiceOnStopHandler">IServiceOnStopHandler</a>

**Inflight client:** [@winglang/sdk.cloud.IServiceOnStopHandlerClient](#@winglang/sdk.cloud.IServiceOnStopHandlerClient)

A resource with an inflight "handle" method that can be passed to `ServiceProps.onStart`.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.IServiceOnStopHandler.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.cloud.IServiceOnStopHandler.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

### IServiceOnStopHandlerClient <a name="IServiceOnStopHandlerClient" id="@winglang/sdk.cloud.IServiceOnStopHandlerClient"></a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.IServiceOnStopHandlerClient">IServiceOnStopHandlerClient</a>

Inflight client for `IServiceOnStopHandler`.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.IServiceOnStopHandlerClient.handle">handle</a></code> | Function that will be called for service events. |

---

##### `handle` <a name="handle" id="@winglang/sdk.cloud.IServiceOnStopHandlerClient.handle"></a>

```wing
inflight handle(context?: any): void
```

Function that will be called for service events.

###### `context`<sup>Optional</sup> <a name="context" id="@winglang/sdk.cloud.IServiceOnStopHandlerClient.handle.parameter.context"></a>

- *Type:* any

the context returned from `onStart()`.

if no context is returned, this will be
`undefined`.

---


