---
title: Resource
id: resource
description: Model a simulated resource with a lifecycle.
keywords:
  [
    Wing reference,
    Wing language,
    language,
    Wing standard library,
    Wing programming language,
    Resource,
    Simulator
  ]
---

The `sim.Resource` class models a simulated resource with a lifecycle.
It's can be used to represent any cloud service where API calls are made over HTTP
to interact with the service at runtime.

## Usage

As an example, suppose we want to simulate a service that stores a number, like the one in `cloud.Counter`, which has two methods: `inc` and `peek`.

First, we'll define an inflight class that represents the service's backend:

```js
bring sim;

// a resource backend must implement IResource
inflight class CounterBackend impl sim.IResource {
  var counter: num;

  new(ctx: sim.IResourceContext) {
    // startup code
    this.counter = 0;
  }

  pub onStop() {
    // shutdown code
  }

  pub inc(n: num?): num {
    let p = this.counter;
    this.counter += (n ?? 1);
    return p;
  }

  pub peek(): num {
    return this.counter;
  }
}
```

Each `CounterBackend` object that's created will have its own state.
It will be initialized by the simulator with its constructor (the `new()` method), and shut down using its `onStop` method.

From the perspective of `CounterBackend`, its `inc` and `peek` methods are always called serially, even if requests are made concurrently from other resources.

Next, we have to define a preflight class which represents the service's frontend:

```js
class Counter {
  backend: sim.Resource;

  new() {
    // this is a "backend factory". it returns an inflight class that implements the
    // resource.
    let factory = inflight (ctx): sim.IResource => {
      return new CounterBackend(ctx);
    };

    this.backend = new sim.Resource(factory);
  }

  pub inflight inc(n: num?): num {
    let response = this.backend.call("inc", [Json (n ?? 1)]);
    return num.fromJson(response);
  }

  pub inflight peek(): num {
    let response = this.backend.call("peek");
    return num.fromJson(response);
  }
}
```

The `Counter` class is a simple wrapper around the `CounterBackend` class. It provides a way to interact with the resource using the `inc` and `peek` methods.

`sim.Resource` has an inflight method named `call` that takes the name of a method to call and an array of arguments, and returns the serialized response from the resource.
The arguments are serialized and sent to the resource over HTTP, which will process the request and returns a serialized response.

> Note: Since the `call` method makes networked requests, it's important that the resource implementation provided by the inflight class responds in a timely manner.
> If the resource takes over 30 seconds to respond, `call` will throw an error, and the simulator will terminate the resource.

The `Counter` class can be used like this:

```js
let c = new Counter();

new cloud.Function(inflight () => {
  log("counter is {c.peek()}");
  c.inc();
  log("counter is now {c.peek()}");
});
```

### Serializability

Methods that are called on a `sim.Resource` instance must be serializable, meaning
all of their arguments and return values must be serializable.

The following types are serializable:

- `num`
- `str`
- `bool`
- `Json`
- `Array`
- `Map`
- `T?` where `T` is a serializable type
- enums
- structs that contain only serializable types

The `call` function on `sim.Resource` only supports arguments that are valid `Json` values.
To convert a value to `Json`, use the `Json` constructor:

```js
let x: num = 5;
let y: str = "a";
this.backend.call("myMethod", [Json x, Json y]);
```

Return values can be converted back from `Json` using an appropriate `fromJson` method.

```js
let response = this.backend.call("myMethod");
let result: num = num.fromJson(response);
```

> Note: some types are missing `fromJson` methods. To work around this, you may use `unsafeCast()` to cast the value into the desired type.
>
> ```js
> let response = this.backend.call("myOtherMethod");
> let result: MyEnum = unsafeCast(response);
> ```

### Late-bound Tokens

Consider a use case where there is an attribute of a simulated service that only gets resolved during initialization (e.g. the exposed port of a container).
In order to create such resources, we need a way to obtain a lazy token that gets resolved during simulator initialization.

Use the preflight method `resource.createToken(key)` to obtain a token that can be used to reference the value of the attribute at runtime.

During resource simulation, you must call `ctx.resolveToken(key, value)` during a resource's constructor method to set the runtime value.

```js playground
inflight class MyResourceBackend impl sim.IResource {
  new(ctx: sim.IResourceContext) {
    ctx.resolveToken("startTime", "2023-10-16T20:47:39.511Z");
  }

  pub onStop() {}
}

class MyResource {
  backend: sim.Resource;
  pub startTime: str;

  new() {
    this.backend = new sim.Resource(inflight () => {
      return new MyResourceBackend();
    });
    this.startTime = this.backend.createToken("startTime");
  }
}

let r = new ResourceWithState();

new cloud.Function(inflight () => {
  let time = util.env("START_TIME");
  log("start time is {time}");
}, env: {
  START_TIME: r.startTime, // lazy token can be used in preflight configuration
});

// ...or you can use it directly inflight, where the value is automatically resolved

new cloud.Function(inflight () => {
  log("start time is {r.startTime}");
});
```
# API Reference <a name="API Reference" id="api-reference"></a>

## Resources <a name="Resources" id="Resources"></a>

### Resource <a name="Resource" id="@winglang/sdk.sim.Resource"></a>

- *Implements:* <a href="#@winglang/sdk.std.IResource">IResource</a>, <a href="#@winglang/sdk.sim.ISimulatorResource">ISimulatorResource</a>, <a href="#@winglang/sdk.std.IInflightHost">IInflightHost</a>, <a href="#@winglang/sdk.sim.ISimulatorInflightHost">ISimulatorInflightHost</a>

A backend for a simulated resource.

#### Initializers <a name="Initializers" id="@winglang/sdk.sim.Resource.Initializer"></a>

```wing
bring sim;

new sim.Resource(factory: IResourceFactory);
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.sim.Resource.Initializer.parameter.factory">factory</a></code> | <code><a href="#@winglang/sdk.sim.IResourceFactory">IResourceFactory</a></code> | *No description.* |

---

##### `factory`<sup>Required</sup> <a name="factory" id="@winglang/sdk.sim.Resource.Initializer.parameter.factory"></a>

- *Type:* <a href="#@winglang/sdk.sim.IResourceFactory">IResourceFactory</a>

---

#### Methods <a name="Methods" id="Methods"></a>

##### Preflight Methods

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.sim.Resource.addEnvironment">addEnvironment</a></code> | Add an environment variable to make available to the inflight code. |
| <code><a href="#@winglang/sdk.sim.Resource.addPermission">addPermission</a></code> | Add a simulated permission to this inflight host. |
| <code><a href="#@winglang/sdk.sim.Resource.createToken">createToken</a></code> | Obtain a token that can be used to reference an attribute of this resource that is only resolved once the resource is started in the simulator. |
| <code><a href="#@winglang/sdk.sim.Resource.toSimulator">toSimulator</a></code> | Convert this resource to a resource schema for the simulator. |

##### Inflight Methods

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.sim.IResourceClient.call">call</a></code> | Call a method on the resource. |

---

##### `addEnvironment` <a name="addEnvironment" id="@winglang/sdk.sim.Resource.addEnvironment"></a>

```wing
addEnvironment(name: str, value: str): void
```

Add an environment variable to make available to the inflight code.

###### `name`<sup>Required</sup> <a name="name" id="@winglang/sdk.sim.Resource.addEnvironment.parameter.name"></a>

- *Type:* str

---

###### `value`<sup>Required</sup> <a name="value" id="@winglang/sdk.sim.Resource.addEnvironment.parameter.value"></a>

- *Type:* str

---

##### `addPermission` <a name="addPermission" id="@winglang/sdk.sim.Resource.addPermission"></a>

```wing
addPermission(resource: IResource, op: str): void
```

Add a simulated permission to this inflight host.

###### `resource`<sup>Required</sup> <a name="resource" id="@winglang/sdk.sim.Resource.addPermission.parameter.resource"></a>

- *Type:* <a href="#@winglang/sdk.std.IResource">IResource</a>

---

###### `op`<sup>Required</sup> <a name="op" id="@winglang/sdk.sim.Resource.addPermission.parameter.op"></a>

- *Type:* str

---

##### `createToken` <a name="createToken" id="@winglang/sdk.sim.Resource.createToken"></a>

```wing
createToken(name: str): str
```

Obtain a token that can be used to reference an attribute of this resource that is only resolved once the resource is started in the simulator.

If the token is used in inflight code or in the configuration of a simulated
resource (e.g. as an environment variable), the relevant resource will
automatically take a dependency on the resource the token belongs to.

###### `name`<sup>Required</sup> <a name="name" id="@winglang/sdk.sim.Resource.createToken.parameter.name"></a>

- *Type:* str

The name of the token.

---

##### `toSimulator` <a name="toSimulator" id="@winglang/sdk.sim.Resource.toSimulator"></a>

```wing
toSimulator(): ToSimulatorOutput
```

Convert this resource to a resource schema for the simulator.

##### `call` <a name="call" id="@winglang/sdk.sim.IResourceClient.call"></a>

```wing
inflight call(method: str, args?: MutArray<Json>): Json
```

Call a method on the resource.

###### `method`<sup>Required</sup> <a name="method" id="@winglang/sdk.sim.IResourceClient.call.parameter.method"></a>

- *Type:* str

---

###### `args`<sup>Optional</sup> <a name="args" id="@winglang/sdk.sim.IResourceClient.call.parameter.args"></a>

- *Type:* MutArray&lt;<a href="#@winglang/sdk.std.Json">Json</a>&gt;

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.sim.Resource.onLiftType">onLiftType</a></code> | A hook called by the Wing compiler once for each inflight host that needs to use this type inflight. |

---

##### `onLiftType` <a name="onLiftType" id="@winglang/sdk.sim.Resource.onLiftType"></a>

```wing
bring sim;

sim.Resource.onLiftType(host: IInflightHost, ops: MutArray<str>);
```

A hook called by the Wing compiler once for each inflight host that needs to use this type inflight.

The list of requested inflight methods
needed by the inflight host are given by `ops`.

This method is commonly used for adding permissions, environment variables, or
other capabilities to the inflight host.

###### `host`<sup>Required</sup> <a name="host" id="@winglang/sdk.sim.Resource.onLiftType.parameter.host"></a>

- *Type:* <a href="#@winglang/sdk.std.IInflightHost">IInflightHost</a>

---

###### `ops`<sup>Required</sup> <a name="ops" id="@winglang/sdk.sim.Resource.onLiftType.parameter.ops"></a>

- *Type:* MutArray&lt;str&gt;

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.sim.Resource.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.sim.Resource.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---




## Protocols <a name="Protocols" id="Protocols"></a>

### IResource <a name="IResource" id="@winglang/sdk.sim.IResource"></a>

- *Implemented By:* <a href="#@winglang/sdk.sim.IResource">IResource</a>

Contract that a resource backend must implement.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.sim.IResource.onStop">onStop</a></code> | Runs when the resource is stopped. |

---

##### `onStop` <a name="onStop" id="@winglang/sdk.sim.IResource.onStop"></a>

```wing
onStop(): void
```

Runs when the resource is stopped.


### IResourceContext <a name="IResourceContext" id="@winglang/sdk.sim.IResourceContext"></a>

- *Implemented By:* <a href="#@winglang/sdk.sim.IResourceContext">IResourceContext</a>

Context for implementing a simulator resource.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.sim.IResourceContext.log">log</a></code> | Log a message at the current point in time. |
| <code><a href="#@winglang/sdk.sim.IResourceContext.resolveToken">resolveToken</a></code> | Resolves a token value. |
| <code><a href="#@winglang/sdk.sim.IResourceContext.statedir">statedir</a></code> | The directory for the resource's state. |

---

##### `log` <a name="log" id="@winglang/sdk.sim.IResourceContext.log"></a>

```wing
inflight log(message: str, level?: LogLevel): void
```

Log a message at the current point in time.

Defaults to `info` level.

###### `message`<sup>Required</sup> <a name="message" id="@winglang/sdk.sim.IResourceContext.log.parameter.message"></a>

- *Type:* str

The message to log.

---

###### `level`<sup>Optional</sup> <a name="level" id="@winglang/sdk.sim.IResourceContext.log.parameter.level"></a>

- *Type:* <a href="#@winglang/sdk.std.LogLevel">LogLevel</a>

The severity of the message.

---

##### `resolveToken` <a name="resolveToken" id="@winglang/sdk.sim.IResourceContext.resolveToken"></a>

```wing
inflight resolveToken(name: str, value: str): void
```

Resolves a token value.

All tokens must be resolved during the
constructor of the resource.

###### `name`<sup>Required</sup> <a name="name" id="@winglang/sdk.sim.IResourceContext.resolveToken.parameter.name"></a>

- *Type:* str

The name of the token.

---

###### `value`<sup>Required</sup> <a name="value" id="@winglang/sdk.sim.IResourceContext.resolveToken.parameter.value"></a>

- *Type:* str

The value of the token.

---

##### `statedir` <a name="statedir" id="@winglang/sdk.sim.IResourceContext.statedir"></a>

```wing
statedir(): str
```

The directory for the resource's state.


### IResourceFactory <a name="IResourceFactory" id="@winglang/sdk.sim.IResourceFactory"></a>

- *Extends:* <a href="#@winglang/sdk.std.IInflight">IInflight</a>

- *Implemented By:* <a href="#@winglang/sdk.sim.IResourceFactory">IResourceFactory</a>

**Inflight client:** [@winglang/sdk.sim.IResourceFactoryClient](#@winglang/sdk.sim.IResourceFactoryClient)

A resource with an inflight "handle" method that can be passed to the `sim.Resource` constructor.



### IResourceFactoryClient <a name="IResourceFactoryClient" id="@winglang/sdk.sim.IResourceFactoryClient"></a>

- *Implemented By:* <a href="#@winglang/sdk.sim.IResourceFactoryClient">IResourceFactoryClient</a>

A resource with an inflight "handle" method that can be passed to the `sim.Resource` constructor.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.sim.IResourceFactoryClient.handle">handle</a></code> | Function that will be called to create the resource. |

---

##### `handle` <a name="handle" id="@winglang/sdk.sim.IResourceFactoryClient.handle"></a>

```wing
inflight handle(context: IResourceContext): IResource
```

Function that will be called to create the resource.

###### `context`<sup>Required</sup> <a name="context" id="@winglang/sdk.sim.IResourceFactoryClient.handle.parameter.context"></a>

- *Type:* <a href="#@winglang/sdk.sim.IResourceContext">IResourceContext</a>

---


### ISimulatorInflightHost <a name="ISimulatorInflightHost" id="@winglang/sdk.sim.ISimulatorInflightHost"></a>

- *Extends:* <a href="#@winglang/sdk.std.IInflightHost">IInflightHost</a>

- *Implemented By:* <a href="#@winglang/sdk.sim.Resource">Resource</a>, <a href="#@winglang/sdk.sim.ISimulatorInflightHost">ISimulatorInflightHost</a>

Interfaces shared by all preflight classes that host inflight code.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.sim.ISimulatorInflightHost.addPermission">addPermission</a></code> | Add a simulated permission to this inflight host. |

---

##### `addPermission` <a name="addPermission" id="@winglang/sdk.sim.ISimulatorInflightHost.addPermission"></a>

```wing
addPermission(resource: IResource, op: str): void
```

Add a simulated permission to this inflight host.

###### `resource`<sup>Required</sup> <a name="resource" id="@winglang/sdk.sim.ISimulatorInflightHost.addPermission.parameter.resource"></a>

- *Type:* <a href="#@winglang/sdk.std.IResource">IResource</a>

The resource to add.

---

###### `op`<sup>Required</sup> <a name="op" id="@winglang/sdk.sim.ISimulatorInflightHost.addPermission.parameter.op"></a>

- *Type:* str

The action to add.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.sim.ISimulatorInflightHost.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.sim.ISimulatorInflightHost.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

### ISimulatorResource <a name="ISimulatorResource" id="@winglang/sdk.sim.ISimulatorResource"></a>

- *Extends:* <a href="#@winglang/sdk.std.IResource">IResource</a>

- *Implemented By:* <a href="#@winglang/sdk.sim.Container">Container</a>, <a href="#@winglang/sdk.sim.Policy">Policy</a>, <a href="#@winglang/sdk.sim.Resource">Resource</a>, <a href="#@winglang/sdk.sim.State">State</a>, <a href="#@winglang/sdk.sim.ISimulatorResource">ISimulatorResource</a>

Interfaces shared by all preflight classes targeting the simulator.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.sim.ISimulatorResource.toSimulator">toSimulator</a></code> | Convert this resource to a resource schema for the simulator. |

---

##### `toSimulator` <a name="toSimulator" id="@winglang/sdk.sim.ISimulatorResource.toSimulator"></a>

```wing
toSimulator(): ToSimulatorOutput
```

Convert this resource to a resource schema for the simulator.

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.sim.ISimulatorResource.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.sim.ISimulatorResource.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

