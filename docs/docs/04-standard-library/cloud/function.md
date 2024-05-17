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

When a function is invoked on a cloud provider, it is typically executed in a container/host which is provisioned on demand.

Functions may be invoked more than once, and some cloud providers may automatically retry failed invocations.
For performance reasons, most cloud providers impose a timeout on functions, after which the function is automatically terminated.

## Usage

A function can be invoked in two ways:

* **invoke()** - Executes the function with a payload and waits for the result.
* **invokeAsync()** - Kicks off the execution of the function with a payload and returns immediately while the function is running.

```ts playground
bring cloud;
bring util;

// defining a cloud.Function resource
let countWords = new cloud.Function(inflight (s: str?): str => {
  return "{s?.split(" ")?.length ?? 0}";
}) as "countWords";

let longTask = new cloud.Function(inflight () => {
  util.sleep(30s);
  log("done!");
});

new cloud.Function(inflight () => {
  let sentence = "I am a sentence with 7 words";
  // invoking cloud.Function from inflight context
  let wordsCount = countWords.invoke(sentence);
  log("'{sentence}' has {wordsCount ?? "0"} words");

  longTask.invokeAsync("");
  log("task started");
}) as "Invoke Me";
```

## Function container reuse

Most cloud providers will opportunistically reuse the function's container in additional invocations.
It is possible to leverage this behavior to cache objects across function executions using `inflight new` and inflight fields.

The following example reads the `bigdata.json` file once and reuses it every time `query()` is called.

```ts playground
bring cloud;

let big = new cloud.Bucket();

big.addObject("bigdata.json", Json.stringify({
  "my-key": "my-value"
}));

class MyDatabase {
  inflight bigdata: Json;
  inflight new() {
    // download big data once
    this.bigdata = big.getJson("bigdata.json");
  }

  pub inflight query(key: str): Json {
    return this.bigdata.get(key);
  }
}

let db = new MyDatabase();

new cloud.Function(inflight () => {
  log(Json.stringify(db.query("my-key")));
});
```

## Target-specific details

### Simulator (`sim`)

The sim implementation of `cloud.Function` runs the inflight code as a JavaScript function.

By default, a maximum of 10 workers can be processing requests sent to a `cloud.Function` concurrently, but this number can be adjusted with the `concurrency` property:

```ts playground
new cloud.Function(inflight () => {
  // ... code that shouldn't run concurrently ...
}, concurrency: 1);
```

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

To access the AWS Lambda context object, you can use the `aws.Function` class as shown below.

```ts playground
bring aws;
bring cloud;

let f = new cloud.Function(inflight () => {
  if let ctx = aws.Function.context() {
    log(ctx.logGroupName); // prints the log group name
    log(ctx.logStreamName); // prints the log stream name

    let remainingTime = ctx.remainingTimeInMillis();
    assert(remainingTime > 0);
  }
});
```

The `context()` method returns `nil` when ran on non-AWS targets.

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
| <code><a href="#@winglang/sdk.cloud.IFunctionClient.invokeAsync">invokeAsync</a></code> | Kicks off the execution of the function with a payload and returns immediately while the function is running. |

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
inflight invoke(payload?: str): str?
```

Invokes the function with a payload and waits for the result.

###### `payload`<sup>Optional</sup> <a name="payload" id="@winglang/sdk.cloud.IFunctionClient.invoke.parameter.payload"></a>

- *Type:* str

payload to pass to the function.

If not defined, an empty string will be passed.

---

##### `invokeAsync` <a name="invokeAsync" id="@winglang/sdk.cloud.IFunctionClient.invokeAsync"></a>

```wing
inflight invokeAsync(payload?: str): void
```

Kicks off the execution of the function with a payload and returns immediately while the function is running.

###### `payload`<sup>Optional</sup> <a name="payload" id="@winglang/sdk.cloud.IFunctionClient.invokeAsync.parameter.payload"></a>

- *Type:* str

payload to pass to the function.

If not defined, an empty string will be passed.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.Function.onLiftType">onLiftType</a></code> | A hook called by the Wing compiler once for each inflight host that needs to use this type inflight. |

---

##### `onLiftType` <a name="onLiftType" id="@winglang/sdk.cloud.Function.onLiftType"></a>

```wing
bring cloud;

cloud.Function.onLiftType(host: IInflightHost, ops: MutArray<str>);
```

A hook called by the Wing compiler once for each inflight host that needs to use this type inflight.

The list of requested inflight methods
needed by the inflight host are given by `ops`.

This method is commonly used for adding permissions, environment variables, or
other capabilities to the inflight host.

###### `host`<sup>Required</sup> <a name="host" id="@winglang/sdk.cloud.Function.onLiftType.parameter.host"></a>

- *Type:* <a href="#@winglang/sdk.std.IInflightHost">IInflightHost</a>

---

###### `ops`<sup>Required</sup> <a name="ops" id="@winglang/sdk.cloud.Function.onLiftType.parameter.ops"></a>

- *Type:* MutArray&lt;str&gt;

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
| <code><a href="#@winglang/sdk.cloud.FunctionProps.property.concurrency">concurrency</a></code> | <code>num</code> | The maximum concurrent invocations that can run at one time. |
| <code><a href="#@winglang/sdk.cloud.FunctionProps.property.env">env</a></code> | <code>MutMap&lt;str&gt;</code> | Environment variables to pass to the function. |
| <code><a href="#@winglang/sdk.cloud.FunctionProps.property.logRetentionDays">logRetentionDays</a></code> | <code>num</code> | Specifies the number of days that function logs will be kept. |
| <code><a href="#@winglang/sdk.cloud.FunctionProps.property.memory">memory</a></code> | <code>num</code> | The amount of memory to allocate to the function, in MB. |
| <code><a href="#@winglang/sdk.cloud.FunctionProps.property.timeout">timeout</a></code> | <code><a href="#@winglang/sdk.std.Duration">duration</a></code> | The maximum amount of time the function can run. |

---

##### `concurrency`<sup>Optional</sup> <a name="concurrency" id="@winglang/sdk.cloud.FunctionProps.property.concurrency"></a>

```wing
concurrency: num;
```

- *Type:* num
- *Default:* platform specific limits (100 on the simulator)

The maximum concurrent invocations that can run at one time.

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
- *Default:* 1024

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

- *Extends:* <a href="#@winglang/sdk.std.IInflight">IInflight</a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.IFunctionHandler">IFunctionHandler</a>

**Inflight client:** [@winglang/sdk.cloud.IFunctionHandlerClient](#@winglang/sdk.cloud.IFunctionHandlerClient)

A resource with an inflight "handle" method that can be used to create a `cloud.Function`.



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
inflight handle(event?: str): str?
```

Entrypoint function that will be called when the cloud function is invoked.

###### `event`<sup>Optional</sup> <a name="event" id="@winglang/sdk.cloud.IFunctionHandlerClient.handle.parameter.event"></a>

- *Type:* str

---


