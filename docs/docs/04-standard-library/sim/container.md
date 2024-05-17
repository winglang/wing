---
title: Container
id: container
description: Runs a container in the Wing Simulator
keywords:
  [
    Wing reference,
    Wing language,
    language,
    Wing standard library,
    Wing programming language,
    docker,
    container,
    docker compose,
    simulator
  ]
---

The `sim.Container` resource allows running containers in the Wing Simulator:

```js
bring sim;
bring http;

let c = new sim.Container(
  name: "http-echo",
  image: "hashicorp/http-echo",
  containerPort: 5678,
  args: ["-text=bang"],
);

test "send request" {
  http.get("http://localhost:{c.hostPort}");
}
```

There is also support for building containers from a local directory with a `Dockerfile`:

```js
new sim.Container(
  name: "my-service",
  image: "./my-service",
  containerPort: 8080,
);
```

### Retaining state

When the Wing Console is closed, all containers are stopped and removed.
To retain the state of a container across console restarts, you can mount an anonymous volume:

```js
new sim.Container(
  name: "my-service",
  image: "./my-service",
  containerPort: 8080,
  volumes: ["/var/data"],
);
```

Wing will automatically name each unnamed volume in `volumes`, and reuse the named
volumes across console restarts.

## API

* `name` - a name for the container.
* `image` - a name of a public Docker image to pull and run or a path to a local directory with a
  `Dockerfile`.
* `containerPort` - a TCP port to expose from the container (optional).
* `env` - environment variables to set in the container.
* `args` - container entrypoint arguments
* `sourcePattern` - a glob pattern to use to match the files for calculating the source hash when
  determining if a rebuild is needed. By default this is all the files in the docker build context
  directory (and below).
* `sourceHash` - An explicit source hash that represents the container source. if not set, and
  `sourcePattern` is set, the hash will be calculated based on the content of the source files.

# API Reference <a name="API Reference" id="api-reference"></a>

## Resources <a name="Resources" id="Resources"></a>

### Container <a name="Container" id="@winglang/sdk.sim.Container"></a>

- *Implements:* <a href="#@winglang/sdk.sim.ISimulatorResource">ISimulatorResource</a>

Represents a container running in the Wing Simulator.

#### Initializers <a name="Initializers" id="@winglang/sdk.sim.Container.Initializer"></a>

```wing
bring sim;

new sim.Container(props: ContainerProps);
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.sim.Container.Initializer.parameter.props">props</a></code> | <code><a href="#@winglang/sdk.sim.ContainerProps">ContainerProps</a></code> | *No description.* |

---

##### `props`<sup>Required</sup> <a name="props" id="@winglang/sdk.sim.Container.Initializer.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.sim.ContainerProps">ContainerProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

##### Preflight Methods

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.sim.Container.toSimulator">toSimulator</a></code> | Convert this resource to a resource schema for the simulator. |

---

##### `toSimulator` <a name="toSimulator" id="@winglang/sdk.sim.Container.toSimulator"></a>

```wing
toSimulator(): ToSimulatorOutput
```

Convert this resource to a resource schema for the simulator.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.sim.Container.onLiftType">onLiftType</a></code> | A hook called by the Wing compiler once for each inflight host that needs to use this type inflight. |
| <code><a href="#@winglang/sdk.sim.Container.toInflight">toInflight</a></code> | Generates an asynchronous JavaScript statement which can be used to create an inflight client for a resource. |

---

##### `onLiftType` <a name="onLiftType" id="@winglang/sdk.sim.Container.onLiftType"></a>

```wing
bring sim;

sim.Container.onLiftType(host: IInflightHost, ops: MutArray<str>);
```

A hook called by the Wing compiler once for each inflight host that needs to use this type inflight.

The list of requested inflight methods
needed by the inflight host are given by `ops`.

This method is commonly used for adding permissions, environment variables, or
other capabilities to the inflight host.

###### `host`<sup>Required</sup> <a name="host" id="@winglang/sdk.sim.Container.onLiftType.parameter.host"></a>

- *Type:* <a href="#@winglang/sdk.std.IInflightHost">IInflightHost</a>

---

###### `ops`<sup>Required</sup> <a name="ops" id="@winglang/sdk.sim.Container.onLiftType.parameter.ops"></a>

- *Type:* MutArray&lt;str&gt;

---

##### `toInflight` <a name="toInflight" id="@winglang/sdk.sim.Container.toInflight"></a>

```wing
bring sim;

sim.Container.toInflight(obj: IResource);
```

Generates an asynchronous JavaScript statement which can be used to create an inflight client for a resource.

NOTE: This statement must be executed within an async context.

###### `obj`<sup>Required</sup> <a name="obj" id="@winglang/sdk.sim.Container.toInflight.parameter.obj"></a>

- *Type:* <a href="#@winglang/sdk.std.IResource">IResource</a>

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.sim.Container.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.sim.Container.property.hostPort">hostPort</a></code> | <code>str</code> | A token that resolves to the host port of this container. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.sim.Container.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `hostPort`<sup>Optional</sup> <a name="hostPort" id="@winglang/sdk.sim.Container.property.hostPort"></a>

```wing
hostPort: str;
```

- *Type:* str

A token that resolves to the host port of this container.

---



## Structs <a name="Structs" id="Structs"></a>

### ContainerProps <a name="ContainerProps" id="@winglang/sdk.sim.ContainerProps"></a>

Initialization properties for `sim.Container`.

#### Initializer <a name="Initializer" id="@winglang/sdk.sim.ContainerProps.Initializer"></a>

```wing
bring sim;

let ContainerProps = sim.ContainerProps{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.sim.ContainerProps.property.image">image</a></code> | <code>str</code> | A name of a public Docker image to pull and run or a path to a local directory with a `Dockerfile`. |
| <code><a href="#@winglang/sdk.sim.ContainerProps.property.name">name</a></code> | <code>str</code> | A name for the container. |
| <code><a href="#@winglang/sdk.sim.ContainerProps.property.args">args</a></code> | <code>MutArray&lt;str&gt;</code> | Container arguments. |
| <code><a href="#@winglang/sdk.sim.ContainerProps.property.containerPort">containerPort</a></code> | <code>num</code> | Internal container port to expose. |
| <code><a href="#@winglang/sdk.sim.ContainerProps.property.env">env</a></code> | <code>MutMap&lt;str&gt;</code> | Environment variables to set in the container. |
| <code><a href="#@winglang/sdk.sim.ContainerProps.property.sourceHash">sourceHash</a></code> | <code>str</code> | An explicit source hash that represents the container source. |
| <code><a href="#@winglang/sdk.sim.ContainerProps.property.sourcePattern">sourcePattern</a></code> | <code>str</code> | A glob of local files to consider as input sources for the container, relative to the build context directory. |
| <code><a href="#@winglang/sdk.sim.ContainerProps.property.volumes">volumes</a></code> | <code>MutArray&lt;str&gt;</code> | Volume mount points. |

---

##### `image`<sup>Required</sup> <a name="image" id="@winglang/sdk.sim.ContainerProps.property.image"></a>

```wing
image: str;
```

- *Type:* str

A name of a public Docker image to pull and run or a path to a local directory with a `Dockerfile`.

---

##### `name`<sup>Required</sup> <a name="name" id="@winglang/sdk.sim.ContainerProps.property.name"></a>

```wing
name: str;
```

- *Type:* str

A name for the container.

---

##### `args`<sup>Optional</sup> <a name="args" id="@winglang/sdk.sim.ContainerProps.property.args"></a>

```wing
args: MutArray<str>;
```

- *Type:* MutArray&lt;str&gt;
- *Default:* []

Container arguments.

---

##### `containerPort`<sup>Optional</sup> <a name="containerPort" id="@winglang/sdk.sim.ContainerProps.property.containerPort"></a>

```wing
containerPort: num;
```

- *Type:* num
- *Default:* no port exposed

Internal container port to expose.

---

##### `env`<sup>Optional</sup> <a name="env" id="@winglang/sdk.sim.ContainerProps.property.env"></a>

```wing
env: MutMap<str>;
```

- *Type:* MutMap&lt;str&gt;
- *Default:* {}

Environment variables to set in the container.

---

##### `sourceHash`<sup>Optional</sup> <a name="sourceHash" id="@winglang/sdk.sim.ContainerProps.property.sourceHash"></a>

```wing
sourceHash: str;
```

- *Type:* str
- *Default:* calculated based on the source files

An explicit source hash that represents the container source.

if not set, and `sourcePattern`
is set, the hash will be calculated based on the content of the source files.

---

##### `sourcePattern`<sup>Optional</sup> <a name="sourcePattern" id="@winglang/sdk.sim.ContainerProps.property.sourcePattern"></a>

```wing
sourcePattern: str;
```

- *Type:* str
- *Default:* all files

A glob of local files to consider as input sources for the container, relative to the build context directory.

---

##### `volumes`<sup>Optional</sup> <a name="volumes" id="@winglang/sdk.sim.ContainerProps.property.volumes"></a>

```wing
volumes: MutArray<str>;
```

- *Type:* MutArray&lt;str&gt;
- *Default:* []

Volume mount points.

---

*Example*

```wing
['/host:/container']
```



