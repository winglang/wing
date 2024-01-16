---
title: OnDeploy
id: on-deploy
description: A resource that runs inflight code during the application's deployment.
keywords:
  [
    Wing reference,
    Wing language,
    language,
    Wing standard library,
    Wing programming language,
    OnDeploy,
    Trigger,
    Deployment,
  ]
sidebar_position: 1
---

The `cloud.OnDeploy` resource runs a block of inflight code each time the application is deployed.

## Usage

```ts playground
bring cloud;

let bucket = new cloud.Bucket();

// each time the application is deployed, all objects in the bucket are deleted
let setup = new cloud.OnDeploy(inflight () => {
  for key in bucket.list() {
    bucket.delete(key);
  }
});
```

To specify that the `cloud.OnDeploy` resource should be run before or after another resource is created or updated, use the `executeBefore` or `executeAfter` properties:

```ts playground
bring cloud;

let counter = new cloud.Counter();

let setup2 = new cloud.OnDeploy(inflight () => {
  counter.inc();
}) as "setup2";
let setup1 = new cloud.OnDeploy(inflight () => {
  counter.set(10);
}, executeBefore: [setup2]) as "setup1";
```

## Target-specific details

### Simulator (`sim`)

The sim implementation of `cloud.OnDeploy` uses a JavaScript function.

### AWS (`tf-aws` and `awscdk`)

The AWS implementation of `cloud.OnDeploy` uses a [Amazon Lambda](https://aws.amazon.com/lambda/) function, which is invoked during the Terraform or CloudFormation deployment.

### Azure (`tf-azure`)

🚧 Not supported yet (tracking issue: [#3565](https://github.com/winglang/wing/issues/3565))

### GCP (`tf-gcp`)

🚧 Not supported yet (tracking issue: [#3564](https://github.com/winglang/wing/issues/3564))
## API Reference <a name="API Reference" id="API Reference"></a>

### OnDeploy <a name="OnDeploy" id="@winglang/sdk.cloud.OnDeploy"></a>

Run code every time the app is deployed.

#### Initializers <a name="Initializers" id="@winglang/sdk.cloud.OnDeploy.Initializer"></a>

```wing
bring cloud;

new cloud.OnDeploy(handler: IOnDeployHandler, props?: OnDeployProps);
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.OnDeploy.Initializer.parameter.handler">handler</a></code> | <code><a href="#@winglang/sdk.cloud.IOnDeployHandler">IOnDeployHandler</a></code> | *No description.* |
| <code><a href="#@winglang/sdk.cloud.OnDeploy.Initializer.parameter.props">props</a></code> | <code><a href="#@winglang/sdk.cloud.OnDeployProps">OnDeployProps</a></code> | *No description.* |

---

##### `handler`<sup>Required</sup> <a name="handler" id="@winglang/sdk.cloud.OnDeploy.Initializer.parameter.handler"></a>

- *Type:* <a href="#@winglang/sdk.cloud.IOnDeployHandler">IOnDeployHandler</a>

---

##### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.OnDeploy.Initializer.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.cloud.OnDeployProps">OnDeployProps</a>

---


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.OnDeploy.onLiftType">onLiftType</a></code> | A hook called by the Wing compiler once for each inflight host that needs to use this type inflight. |

---

##### `onLiftType` <a name="onLiftType" id="@winglang/sdk.cloud.OnDeploy.onLiftType"></a>

```wing
bring cloud;

cloud.OnDeploy.onLiftType(host: IInflightHost, ops: MutArray<str>);
```

A hook called by the Wing compiler once for each inflight host that needs to use this type inflight.

The list of requested inflight methods
needed by the inflight host are given by `ops`.

This method is commonly used for adding permissions, environment variables, or
other capabilities to the inflight host.

###### `host`<sup>Required</sup> <a name="host" id="@winglang/sdk.cloud.OnDeploy.onLiftType.parameter.host"></a>

- *Type:* <a href="#@winglang/sdk.std.IInflightHost">IInflightHost</a>

---

###### `ops`<sup>Required</sup> <a name="ops" id="@winglang/sdk.cloud.OnDeploy.onLiftType.parameter.ops"></a>

- *Type:* MutArray&lt;str&gt;

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.OnDeploy.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.cloud.OnDeploy.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---



## Structs <a name="Structs" id="Structs"></a>

### OnDeployProps <a name="OnDeployProps" id="@winglang/sdk.cloud.OnDeployProps"></a>

Options for `OnDeploy`.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.OnDeployProps.Initializer"></a>

```wing
bring cloud;

let OnDeployProps = cloud.OnDeployProps{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.OnDeployProps.property.env">env</a></code> | <code>MutMap&lt;str&gt;</code> | Environment variables to pass to the function. |
| <code><a href="#@winglang/sdk.cloud.OnDeployProps.property.logRetentionDays">logRetentionDays</a></code> | <code>num</code> | Specifies the number of days that function logs will be kept. |
| <code><a href="#@winglang/sdk.cloud.OnDeployProps.property.memory">memory</a></code> | <code>num</code> | The amount of memory to allocate to the function, in MB. |
| <code><a href="#@winglang/sdk.cloud.OnDeployProps.property.timeout">timeout</a></code> | <code><a href="#@winglang/sdk.std.Duration">duration</a></code> | The maximum amount of time the function can run. |
| <code><a href="#@winglang/sdk.cloud.OnDeployProps.property.executeAfter">executeAfter</a></code> | <code>MutArray&lt;constructs.Construct&gt;</code> | Execute this trigger only after these resources have been provisioned. |
| <code><a href="#@winglang/sdk.cloud.OnDeployProps.property.executeBefore">executeBefore</a></code> | <code>MutArray&lt;constructs.Construct&gt;</code> | Adds this trigger as a dependency on other constructs. |

---

##### `env`<sup>Optional</sup> <a name="env" id="@winglang/sdk.cloud.OnDeployProps.property.env"></a>

```wing
env: MutMap<str>;
```

- *Type:* MutMap&lt;str&gt;
- *Default:* No environment variables.

Environment variables to pass to the function.

---

##### `logRetentionDays`<sup>Optional</sup> <a name="logRetentionDays" id="@winglang/sdk.cloud.OnDeployProps.property.logRetentionDays"></a>

```wing
logRetentionDays: num;
```

- *Type:* num
- *Default:* 30

Specifies the number of days that function logs will be kept.

Setting negative value means logs will not expire.

---

##### `memory`<sup>Optional</sup> <a name="memory" id="@winglang/sdk.cloud.OnDeployProps.property.memory"></a>

```wing
memory: num;
```

- *Type:* num
- *Default:* 1024

The amount of memory to allocate to the function, in MB.

---

##### `timeout`<sup>Optional</sup> <a name="timeout" id="@winglang/sdk.cloud.OnDeployProps.property.timeout"></a>

```wing
timeout: duration;
```

- *Type:* <a href="#@winglang/sdk.std.Duration">duration</a>
- *Default:* 1m

The maximum amount of time the function can run.

---

##### `executeAfter`<sup>Optional</sup> <a name="executeAfter" id="@winglang/sdk.cloud.OnDeployProps.property.executeAfter"></a>

```wing
executeAfter: MutArray<Construct>;
```

- *Type:* MutArray&lt;constructs.Construct&gt;
- *Default:* no additional dependencies

Execute this trigger only after these resources have been provisioned.

---

##### `executeBefore`<sup>Optional</sup> <a name="executeBefore" id="@winglang/sdk.cloud.OnDeployProps.property.executeBefore"></a>

```wing
executeBefore: MutArray<Construct>;
```

- *Type:* MutArray&lt;constructs.Construct&gt;
- *Default:* no additional dependencies

Adds this trigger as a dependency on other constructs.

---

## Protocols <a name="Protocols" id="Protocols"></a>

### IOnDeployHandler <a name="IOnDeployHandler" id="@winglang/sdk.cloud.IOnDeployHandler"></a>

- *Extends:* <a href="#@winglang/sdk.std.IInflight">IInflight</a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.IOnDeployHandler">IOnDeployHandler</a>

**Inflight client:** [@winglang/sdk.cloud.IOnDeployHandlerClient](#@winglang/sdk.cloud.IOnDeployHandlerClient)

A resource with an inflight "handle" method that can be used by `cloud.OnDeploy`.



### IOnDeployHandlerClient <a name="IOnDeployHandlerClient" id="@winglang/sdk.cloud.IOnDeployHandlerClient"></a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.IOnDeployHandlerClient">IOnDeployHandlerClient</a>

Inflight client for `IOnDeployHandler`.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.IOnDeployHandlerClient.handle">handle</a></code> | Entrypoint function that will be called when the app is deployed. |

---

##### `handle` <a name="handle" id="@winglang/sdk.cloud.IOnDeployHandlerClient.handle"></a>

```wing
inflight handle(): void
```

Entrypoint function that will be called when the app is deployed.


