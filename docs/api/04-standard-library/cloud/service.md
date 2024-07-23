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

Services are a common way to define long running code, such as microservices.

## Usage

### Creating a service

When defining a service, the first argument is an inflight closure that represents
the service handler. This handler is responsible to perform any initialization
activity and **return asynchronously** when initialization is complete.

```js
bring cloud;

new cloud.Service(inflight () => {
  // ...
  // kick off any initialization activities asynchronously
  // ...
  log("Service started...");
});
```

### Disable auto-start

By default the service resource will start automatically, however this can be disabled by passing
`autoStart: false` to the constructor.

```js
bring cloud;

let handler = inflight () => {
  log("service started...");
};

let service = new cloud.Service(handler, autoStart: false);
```

### Service cleanup

Optionally, the service handler inflight closure can return another inflight closure which will be
called when the service is stopped. Using a return closure allows naturally passing context between
the async calls.

```js
bring cloud;

new cloud.Service(inflight() => {
  let server = startHttpServer();
  log("Service started...");
  return () => {
    log("Service stopped...");
    server.close();
  };
});
```

### Stopping and starting a service

The inflight methods `start()` and `stop()` are used exactly how they sound, to stop and start the
service. The method `started()` returns a `bool` indicating if the service is currently started.

Here is an example of using a service that will track how often it is started and stopped using
counters. 

An important aspect to note is that consecutive starts and stops have no affect on a service. For
example, if a `service.start()` is called on a service that is already started, nothing will happen.

```js
bring cloud;

let startCounter = new cloud.Counter() as "start counter";
let stopCounter = new cloud.Counter() as "stop counter";

let handler = inflight() => {
  let i = startCounter.inc();
  log("Service started for the ${i}th time...");
  return () => {
    let i = stopCounter.inc();
    log("Service stopped for the ${i}th time...");
  };
};

let service = new cloud.Service(handler, autoStart: false);

// Functions to stop and start the service
new cloud.Function(inflight() => {
  service.start();
  assert(service.started());
}) as "start service";

new cloud.Function(inflight() => {
  service.stop();
  assert(!service.started());
}) as "stop service";
```

## Target-specific details

### Simulator (`sim`)

Within the context of the simulator, services are just spawned processes ran within a node vm.

### AWS (`tf-aws` and `awscdk`)

Within the context of AWS, services are created using AWS ECS, with a capacity provider of FARGATE. This also requires a VPC and a related resources
such as security groups, subnets, and an internet gateway, etc. If a VPC is not specified in `wing.toml`, a default VPC will be created.

The inflight closures are packaged up into a docker image and pushed to an AWS ECR repository.

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

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.Service.onLiftType">onLiftType</a></code> | A hook called by the Wing compiler once for each inflight host that needs to use this type inflight. |
| <code><a href="#@winglang/sdk.cloud.Service.toInflight">toInflight</a></code> | Generates an asynchronous JavaScript statement which can be used to create an inflight client for a resource. |

---

##### `onLiftType` <a name="onLiftType" id="@winglang/sdk.cloud.Service.onLiftType"></a>

```wing
bring cloud;

cloud.Service.onLiftType(host: IInflightHost, ops: MutArray<str>);
```

A hook called by the Wing compiler once for each inflight host that needs to use this type inflight.

The list of requested inflight methods
needed by the inflight host are given by `ops`.

This method is commonly used for adding permissions, environment variables, or
other capabilities to the inflight host.

###### `host`<sup>Required</sup> <a name="host" id="@winglang/sdk.cloud.Service.onLiftType.parameter.host"></a>

- *Type:* <a href="#@winglang/sdk.std.IInflightHost">IInflightHost</a>

---

###### `ops`<sup>Required</sup> <a name="ops" id="@winglang/sdk.cloud.Service.onLiftType.parameter.ops"></a>

- *Type:* MutArray&lt;str&gt;

---

##### `toInflight` <a name="toInflight" id="@winglang/sdk.cloud.Service.toInflight"></a>

```wing
bring cloud;

cloud.Service.toInflight(obj: IResource);
```

Generates an asynchronous JavaScript statement which can be used to create an inflight client for a resource.

NOTE: This statement must be executed within an async context.

###### `obj`<sup>Required</sup> <a name="obj" id="@winglang/sdk.cloud.Service.toInflight.parameter.obj"></a>

- *Type:* <a href="#@winglang/sdk.std.IResource">IResource</a>

---

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

### ServiceOnStartOptions <a name="ServiceOnStartOptions" id="@winglang/sdk.cloud.ServiceOnStartOptions"></a>

Options for Service.onStart.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.ServiceOnStartOptions.Initializer"></a>

```wing
bring cloud;

let ServiceOnStartOptions = cloud.ServiceOnStartOptions{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.ServiceOnStartOptions.property.concurrency">concurrency</a></code> | <code>num</code> | The maximum concurrent invocations that can run at one time. |
| <code><a href="#@winglang/sdk.cloud.ServiceOnStartOptions.property.env">env</a></code> | <code>MutMap&lt;str&gt;</code> | Environment variables to pass to the function. |
| <code><a href="#@winglang/sdk.cloud.ServiceOnStartOptions.property.logRetentionDays">logRetentionDays</a></code> | <code>num</code> | Specifies the number of days that function logs will be kept. |
| <code><a href="#@winglang/sdk.cloud.ServiceOnStartOptions.property.memory">memory</a></code> | <code>num</code> | The amount of memory to allocate to the function, in MB. |
| <code><a href="#@winglang/sdk.cloud.ServiceOnStartOptions.property.timeout">timeout</a></code> | <code><a href="#@winglang/sdk.std.Duration">duration</a></code> | The maximum amount of time the function can run. |

---

##### `concurrency`<sup>Optional</sup> <a name="concurrency" id="@winglang/sdk.cloud.ServiceOnStartOptions.property.concurrency"></a>

```wing
concurrency: num;
```

- *Type:* num
- *Default:* platform specific limits (100 on the simulator)

The maximum concurrent invocations that can run at one time.

---

##### `env`<sup>Optional</sup> <a name="env" id="@winglang/sdk.cloud.ServiceOnStartOptions.property.env"></a>

```wing
env: MutMap<str>;
```

- *Type:* MutMap&lt;str&gt;
- *Default:* No environment variables.

Environment variables to pass to the function.

---

##### `logRetentionDays`<sup>Optional</sup> <a name="logRetentionDays" id="@winglang/sdk.cloud.ServiceOnStartOptions.property.logRetentionDays"></a>

```wing
logRetentionDays: num;
```

- *Type:* num
- *Default:* 30

Specifies the number of days that function logs will be kept.

Setting negative value means logs will not expire.

---

##### `memory`<sup>Optional</sup> <a name="memory" id="@winglang/sdk.cloud.ServiceOnStartOptions.property.memory"></a>

```wing
memory: num;
```

- *Type:* num
- *Default:* 1024

The amount of memory to allocate to the function, in MB.

---

##### `timeout`<sup>Optional</sup> <a name="timeout" id="@winglang/sdk.cloud.ServiceOnStartOptions.property.timeout"></a>

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

- *Extends:* <a href="#@winglang/sdk.std.IInflight">IInflight</a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.IServiceHandler">IServiceHandler</a>

**Inflight client:** [@winglang/sdk.cloud.IServiceHandlerClient](#@winglang/sdk.cloud.IServiceHandlerClient)

Executed when a `cloud.Service` is started.



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
inflight handle(): IServiceStopHandler?
```

Handler to run when the service starts.

This is where you implement the initialization logic of
the service, start any activities asynchronously.

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

- *Extends:* <a href="#@winglang/sdk.std.IInflight">IInflight</a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.IServiceStopHandler">IServiceStopHandler</a>

**Inflight client:** [@winglang/sdk.cloud.IServiceStopHandlerClient](#@winglang/sdk.cloud.IServiceStopHandlerClient)

Executed when a `cloud.Service` is stopped.



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


