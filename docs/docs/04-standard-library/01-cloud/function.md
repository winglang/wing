---
title: Function
id: function
description: A built-in resource for creating serverless functions.
keywords:
  [
    Wing reference,
    Wing language,
    language,
    Wing standard library,
    Wing programming language,
    Serverless function,
  ]
sidebar_position: 1
---

The `cloud.Function` resource represents a serverless function for performing short, stateless tasks.
Functions are typically used to run business logic in response to events, such as a file being uploaded to a bucket, a message being pushed to a queue, or a timer expiring.

When a function is invoked on a cloud provider, it is typically executed in a container that is spun up on demand.
The container is then destroyed after the function finishes executing.

Functions may be invoked more than once, and some cloud providers may automatically retry failed invocations.
For performance reasons, most cloud providers impose a timeout on functions, after which the function is automatically terminated.

## Usage

```ts playground
bring cloud;

// defining a cloud.Function resource
let countWords = new cloud.Function(inflight (s: str): str => {
  return "${s.split(" ").length}";
}) as "countWords";

new cloud.Function(inflight () => {
  let sentence = "I am a sentence with 7 words";
  // invoking cloud.Function from inflight context
  let wordsCount = countWords.invoke(sentence);
  log("'${sentence}' has ${wordsCount} words");
}) as "Invoke Me";
```

## Target-specific details

### Simulator (`sim`)

The sim implementation of `cloud.Function` runs the inflight code as a JavaScript function.

### AWS (`tf-aws` and `awscdk`)

The AWS implementation of `cloud.Function` uses [AWS Lambda](https://aws.amazon.com/lambda/).

To add extra IAM permissions to the function, you can use the `aws.Function` class as shown below.

```ts playground
bring aws;
bring cloud;

let f = new cloud.Function(inflight () => {
  log("Hello world!");
});
if let lambdaFn = aws.Function.from(f) {
  lambdaFn.addPolicyStatements(
    aws.PolicyStatement {
      actions: ["ses:sendEmail"],
      effect: aws.Effect.ALLOW,
      resources: ["*"],
    },
  );
}
```

### Azure (`tf-azure`)

The Azure implementation of `cloud.Function` uses [Azure Functions](https://azure.microsoft.com/en-us/products/functions).

🚧 `invoke` API is not supported yet (tracking issue: [#1371](https://github.com/winglang/wing/issues/1371))

### GCP (`tf-gcp`)

🚧 Not supported yet (tracking issue: [#614](https://github.com/winglang/wing/issues/614))
## API Reference <a name="API Reference" id="API Reference"></a>

### Function <a name="Function" id="@winglang/sdk.cloud.Function"></a>

- *Implements:* <a href="#@winglang/sdk.std.IInflightHost">IInflightHost</a>

A function.

#### Initializers <a name="Initializers" id="@winglang/sdk.cloud.Function.Initializer"></a>

```wing
bring cloud;

new cloud.Function(handler: IFunctionHandler, props?: FunctionProps);
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Function.Initializer.parameter.handler">handler</a></code> | <code><a href="#@winglang/sdk.cloud.IFunctionHandler">IFunctionHandler</a></code> | *No description.* |
| <code><a href="#@winglang/sdk.cloud.Function.Initializer.parameter.props">props</a></code> | <code><a href="#@winglang/sdk.cloud.FunctionProps">FunctionProps</a></code> | *No description.* |

---

##### `handler`<sup>Required</sup> <a name="handler" id="@winglang/sdk.cloud.Function.Initializer.parameter.handler"></a>

- *Type:* <a href="#@winglang/sdk.cloud.IFunctionHandler">IFunctionHandler</a>

---

##### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Function.Initializer.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.cloud.FunctionProps">FunctionProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

##### Preflight Methods

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.Function.addEnvironment">addEnvironment</a></code> | Add an environment variable to the function. |

##### Inflight Methods

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.IFunctionClient.invoke">invoke</a></code> | Invokes the function with a payload and waits for the result. |

---

##### `addEnvironment` <a name="addEnvironment" id="@winglang/sdk.cloud.Function.addEnvironment"></a>

```wing
addEnvironment(name: str, value: str): void
```

Add an environment variable to the function.

###### `name`<sup>Required</sup> <a name="name" id="@winglang/sdk.cloud.Function.addEnvironment.parameter.name"></a>

- *Type:* str

---

###### `value`<sup>Required</sup> <a name="value" id="@winglang/sdk.cloud.Function.addEnvironment.parameter.value"></a>

- *Type:* str

---

##### `invoke` <a name="invoke" id="@winglang/sdk.cloud.IFunctionClient.invoke"></a>

```wing
inflight invoke(payload: str): str
```

Invokes the function with a payload and waits for the result.

###### `payload`<sup>Required</sup> <a name="payload" id="@winglang/sdk.cloud.IFunctionClient.invoke.parameter.payload"></a>

- *Type:* str

---


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Function.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.cloud.Function.property.env">env</a></code> | <code>MutMap&lt;str&gt;</code> | Returns the set of environment variables for this function. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.cloud.Function.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="@winglang/sdk.cloud.Function.property.env"></a>

```wing
env: MutMap<str>;
```

- *Type:* MutMap&lt;str&gt;

Returns the set of environment variables for this function.

---



## Structs <a name="Structs" id="Structs"></a>

### FunctionProps <a name="FunctionProps" id="@winglang/sdk.cloud.FunctionProps"></a>

Options for `Function`.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.FunctionProps.Initializer"></a>

```wing
bring cloud;

let FunctionProps = cloud.FunctionProps{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.FunctionProps.property.env">env</a></code> | <code>MutMap&lt;str&gt;</code> | Environment variables to pass to the function. |
| <code><a href="#@winglang/sdk.cloud.FunctionProps.property.logRetentionDays">logRetentionDays</a></code> | <code>num</code> | Specifies the number of days that function logs will be kept. |
| <code><a href="#@winglang/sdk.cloud.FunctionProps.property.memory">memory</a></code> | <code>num</code> | The amount of memory to allocate to the function, in MB. |
| <code><a href="#@winglang/sdk.cloud.FunctionProps.property.timeout">timeout</a></code> | <code><a href="#@winglang/sdk.std.Duration">duration</a></code> | The maximum amount of time the function can run. |

---

##### `env`<sup>Optional</sup> <a name="env" id="@winglang/sdk.cloud.FunctionProps.property.env"></a>

```wing
env: MutMap<str>;
```

- *Type:* MutMap&lt;str&gt;
- *Default:* No environment variables.

Environment variables to pass to the function.

---

##### `logRetentionDays`<sup>Optional</sup> <a name="logRetentionDays" id="@winglang/sdk.cloud.FunctionProps.property.logRetentionDays"></a>

```wing
logRetentionDays: num;
```

- *Type:* num
- *Default:* 30

Specifies the number of days that function logs will be kept.

Setting negative value means logs will not expire.

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
timeout: duration;
```

- *Type:* <a href="#@winglang/sdk.std.Duration">duration</a>
- *Default:* 1m

The maximum amount of time the function can run.

---

## Protocols <a name="Protocols" id="Protocols"></a>

### IFunctionHandler <a name="IFunctionHandler" id="@winglang/sdk.cloud.IFunctionHandler"></a>

- *Extends:* <a href="#@winglang/sdk.std.IResource">IResource</a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.IFunctionHandler">IFunctionHandler</a>

**Inflight client:** [@winglang/sdk.cloud.IFunctionHandlerClient](#@winglang/sdk.cloud.IFunctionHandlerClient)

A resource with an inflight "handle" method that can be used to create a `cloud.Function`.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.IFunctionHandler.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.cloud.IFunctionHandler.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

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
inflight handle(event: str): void
```

Entrypoint function that will be called when the cloud function is invoked.

###### `event`<sup>Required</sup> <a name="event" id="@winglang/sdk.cloud.IFunctionHandlerClient.handle.parameter.event"></a>

- *Type:* str

---


