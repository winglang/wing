---
title: State
id: state
description: Key/value in-memory state for the simulator.
keywords:
  [
    Wing reference,
    Wing language,
    language,
    Wing standard library,
    Wing programming language,
    In-memory state,
    State,
    Simulator
  ]
---

The `sim.State` is a simple key/value in-memory store for the simulator with support for lazy
tokens.

Consider a use case where there is an attribute of a simulated service that only gets resolved during initialization (e.g. the exposed port of a container). In order to create such resources, we need a way to obtain a lazy token that gets resolved during simulator initialization. It just so happens that we already have a mechanism like this, but it was not exposed as a public API.

Use the preflight method `state.token(key)` to obtain a token that can be used to reference the
value of the state at runtime.

During simulator app initialization (i.e. `cloud.OnDeploy` or `cloud.Service` startup), you must
call the inflight method `state.set(key, value)` to set the runtime value. The value will be
available at runtime through the inflight method `state.get(key)`, or via a resolved token.

## Usage

Let's say I want to create a simulated service that has property called `startTime` which returns
the time the service was started. This information is also known when the service is actually
initialized.

```js
bring cloud;
bring sim;

class MyService {
  startTime: str;

  new() {
    let state = new sim.State();

    new cloud.Service(inflight () => {
      state.set("start", std.Datetime.utcNow().toIso());
    });

    this.startTime = state.token("start");
  }
}
```

In this example, the `startTime` property will resolve to a *simulator token* (something like
`${root/MyService/State#attrs.start)}`) which can be referenced ("lifted") into inflight context
naturally:

```js
let s = new MyService();

new cloud.Function(inflight () => {
  log("service start time is {s}");
});
```

This creates an implicit dependency between the `cloud.Function` and `MyService` such that only when
the state `start` is set, the `cloud.Function` will be initialized with the actual value.
# API Reference <a name="API Reference" id="api-reference"></a>

## Resources <a name="Resources" id="Resources"></a>

### State <a name="State" id="@winglang/sdk.sim.State"></a>

- *Implements:* <a href="#@winglang/sdk.sim.ISimulatorResource">ISimulatorResource</a>

Key/value in-memory state for the simulator.

Use the preflight method `token(key)` to obtain a token that can be used to reference the value
of the state at runtime.

During deployment (i.e. `cloud.OnDeploy` or `cloud.Service` startup), you must call the inflight
method `set(key, value)` to set the runtime value. The value will be available at runtime through
the inflight method `get(key)` (or resolved as a token).

See tests for examples.

#### Initializers <a name="Initializers" id="@winglang/sdk.sim.State.Initializer"></a>

```wing
bring sim;

new sim.State();
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

##### Preflight Methods

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.sim.State.token">token</a></code> | Returns a token that can be used to retrieve the value of the state after the simulation has run. |
| <code><a href="#@winglang/sdk.sim.State.toSimulator">toSimulator</a></code> | Convert this resource to a resource schema for the simulator. |

##### Inflight Methods

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.sim.IStateClient.get">get</a></code> | Gets the runtime state of this object. |
| <code><a href="#@winglang/sdk.sim.IStateClient.set">set</a></code> | Sets the state of runtime a runtime object. |
| <code><a href="#@winglang/sdk.sim.IStateClient.tryGet">tryGet</a></code> | Checks if runtime state exists for this object and returns it's value. |

---

##### `token` <a name="token" id="@winglang/sdk.sim.State.token"></a>

```wing
token(key: str): str
```

Returns a token that can be used to retrieve the value of the state after the simulation has run.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.sim.State.token.parameter.key"></a>

- *Type:* str

The object key retrieved through the inflight `state.get()`.

---

##### `toSimulator` <a name="toSimulator" id="@winglang/sdk.sim.State.toSimulator"></a>

```wing
toSimulator(): ToSimulatorOutput
```

Convert this resource to a resource schema for the simulator.

##### `get` <a name="get" id="@winglang/sdk.sim.IStateClient.get"></a>

```wing
inflight get(key: str): Json
```

Gets the runtime state of this object.

Throws if there is no value for the given key.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.sim.IStateClient.get.parameter.key"></a>

- *Type:* str

The object's key.

---

##### `set` <a name="set" id="@winglang/sdk.sim.IStateClient.set"></a>

```wing
inflight set(key: str, value: Json): void
```

Sets the state of runtime a runtime object.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.sim.IStateClient.set.parameter.key"></a>

- *Type:* str

The object's key.

---

###### `value`<sup>Required</sup> <a name="value" id="@winglang/sdk.sim.IStateClient.set.parameter.value"></a>

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

The object's value.

---

##### `tryGet` <a name="tryGet" id="@winglang/sdk.sim.IStateClient.tryGet"></a>

```wing
inflight tryGet(key: str): Json?
```

Checks if runtime state exists for this object and returns it's value.

If no value exists,
returns `nil`.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.sim.IStateClient.tryGet.parameter.key"></a>

- *Type:* str

The object's key.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.sim.State.onLiftType">onLiftType</a></code> | A hook called by the Wing compiler once for each inflight host that needs to use this type inflight. |
| <code><a href="#@winglang/sdk.sim.State.toInflight">toInflight</a></code> | Generates an asynchronous JavaScript statement which can be used to create an inflight client for a resource. |

---

##### `onLiftType` <a name="onLiftType" id="@winglang/sdk.sim.State.onLiftType"></a>

```wing
bring sim;

sim.State.onLiftType(host: IInflightHost, ops: MutArray<str>);
```

A hook called by the Wing compiler once for each inflight host that needs to use this type inflight.

The list of requested inflight methods
needed by the inflight host are given by `ops`.

This method is commonly used for adding permissions, environment variables, or
other capabilities to the inflight host.

###### `host`<sup>Required</sup> <a name="host" id="@winglang/sdk.sim.State.onLiftType.parameter.host"></a>

- *Type:* <a href="#@winglang/sdk.std.IInflightHost">IInflightHost</a>

---

###### `ops`<sup>Required</sup> <a name="ops" id="@winglang/sdk.sim.State.onLiftType.parameter.ops"></a>

- *Type:* MutArray&lt;str&gt;

---

##### `toInflight` <a name="toInflight" id="@winglang/sdk.sim.State.toInflight"></a>

```wing
bring sim;

sim.State.toInflight(obj: IResource);
```

Generates an asynchronous JavaScript statement which can be used to create an inflight client for a resource.

NOTE: This statement must be executed within an async context.

###### `obj`<sup>Required</sup> <a name="obj" id="@winglang/sdk.sim.State.toInflight.parameter.obj"></a>

- *Type:* <a href="#@winglang/sdk.std.IResource">IResource</a>

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.sim.State.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.sim.State.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---





