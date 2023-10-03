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

- *Implements:* <a href="#@winglang/sdk.std.IInflightHost">IInflightHost</a>

A long-running service.

#### Initializers <a name="Initializers" id="@winglang/sdk.cloud.Service.Initializer"></a>

```wing
bring cloud;

new cloud.Service(handler: IServiceHandler, props?: ServiceProps);
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Service.Initializer.parameter.handler">handler</a></code> | <code><a href="#@winglang/sdk.cloud.IServiceHandler">IServiceHandler</a></code> | *No description.* |
| <code><a href="#@winglang/sdk.cloud.Service.Initializer.parameter.props">props</a></code> | <code><a href="#@winglang/sdk.cloud.ServiceProps">ServiceProps</a></code> | *No description.* |

---

##### `handler`<sup>Required</sup> <a name="handler" id="@winglang/sdk.cloud.Service.Initializer.parameter.handler"></a>

- *Type:* <a href="#@winglang/sdk.cloud.IServiceHandler">IServiceHandler</a>

---

##### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Service.Initializer.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.cloud.ServiceProps">ServiceProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

##### Preflight Methods

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.Service.addEnvironment">addEnvironment</a></code> | Add an environment variable to the function. |

##### Inflight Methods

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.IServiceClient.start">start</a></code> | Start the service. |
| <code><a href="#@winglang/sdk.cloud.IServiceClient.started">started</a></code> | Indicates whether the service is started. |
| <code><a href="#@winglang/sdk.cloud.IServiceClient.stop">stop</a></code> | Stop the service. |

---

##### `addEnvironment` <a name="addEnvironment" id="@winglang/sdk.cloud.Service.addEnvironment"></a>

```wing
addEnvironment(name: str, value: str): void
```

Add an environment variable to the function.

###### `name`<sup>Required</sup> <a name="name" id="@winglang/sdk.cloud.Service.addEnvironment.parameter.name"></a>

- *Type:* str

---

###### `value`<sup>Required</sup> <a name="value" id="@winglang/sdk.cloud.Service.addEnvironment.parameter.value"></a>

- *Type:* str

---

##### `start` <a name="start" id="@winglang/sdk.cloud.IServiceClient.start"></a>

```wing
inflight start(): void
```

Start the service.

##### `started` <a name="started" id="@winglang/sdk.cloud.IServiceClient.started"></a>

```wing
inflight started(): bool
```

Indicates whether the service is started.

##### `stop` <a name="stop" id="@winglang/sdk.cloud.IServiceClient.stop"></a>

```wing
inflight stop(): void
```

Stop the service.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Service.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.cloud.Service.property.env">env</a></code> | <code>MutMap&lt;str&gt;</code> | Returns the set of environment variables for this function. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.cloud.Service.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="@winglang/sdk.cloud.Service.property.env"></a>

```wing
env: MutMap<str>;
```

- *Type:* MutMap&lt;str&gt;

Returns the set of environment variables for this function.

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
| <code><a href="#@winglang/sdk.cloud.ServiceProps.property.autoStart">autoStart</a></code> | <code>bool</code> | Whether the service should start automatically. |
| <code><a href="#@winglang/sdk.cloud.ServiceProps.property.env">env</a></code> | <code>MutMap&lt;str&gt;</code> | Environment variables to pass to the function. |

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

##### `env`<sup>Optional</sup> <a name="env" id="@winglang/sdk.cloud.ServiceProps.property.env"></a>

```wing
env: MutMap<str>;
```

- *Type:* MutMap&lt;str&gt;
- *Default:* No environment variables.

Environment variables to pass to the function.

---

## Protocols <a name="Protocols" id="Protocols"></a>

### IServiceHandler <a name="IServiceHandler" id="@winglang/sdk.cloud.IServiceHandler"></a>

- *Extends:* <a href="#@winglang/sdk.std.IResource">IResource</a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.IServiceHandler">IServiceHandler</a>

**Inflight client:** [@winglang/sdk.cloud.IServiceHandlerClient](#@winglang/sdk.cloud.IServiceHandlerClient)

Executed when a `cloud.Service` is started.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.IServiceHandler.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.cloud.IServiceHandler.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

### IServiceHandlerClient <a name="IServiceHandlerClient" id="@winglang/sdk.cloud.IServiceHandlerClient"></a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.IServiceHandlerClient">IServiceHandlerClient</a>

Inflight client for `IServiceHandler`.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.IServiceHandlerClient.handle">handle</a></code> | Handler to run when the service starts. |

---

##### `handle` <a name="handle" id="@winglang/sdk.cloud.IServiceHandlerClient.handle"></a>

```wing
handle(): IServiceStopHandler
```

Handler to run when the service starts.

This is where you implement the initialization logic of
the service, start any activities asychronously.

DO NOT BLOCK! This handler should return as quickly as possible. If you need to run a long
running process, start it asynchronously.

*Example*

```wing
bring cloud;

new cloud.Service(inflight () => {
  log("starting service...");
  return () => {
    log("stoping service...");
  };
});
```



### IServiceStopHandler <a name="IServiceStopHandler" id="@winglang/sdk.cloud.IServiceStopHandler"></a>

- *Extends:* <a href="#@winglang/sdk.std.IResource">IResource</a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.IServiceStopHandler">IServiceStopHandler</a>

**Inflight client:** [@winglang/sdk.cloud.IServiceStopHandlerClient](#@winglang/sdk.cloud.IServiceStopHandlerClient)

Executed when a `cloud.Service` is stopped.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.IServiceStopHandler.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.cloud.IServiceStopHandler.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

### IServiceStopHandlerClient <a name="IServiceStopHandlerClient" id="@winglang/sdk.cloud.IServiceStopHandlerClient"></a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.IServiceStopHandlerClient">IServiceStopHandlerClient</a>

Inflight client for `IServiceStopHandler`.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.IServiceStopHandlerClient.handle">handle</a></code> | Handler to run when the service stops. |

---

##### `handle` <a name="handle" id="@winglang/sdk.cloud.IServiceStopHandlerClient.handle"></a>

```wing
inflight handle(): void
```

Handler to run when the service stops.

This is where you implement the cleanup logic of
the service, stop any activities asychronously.


