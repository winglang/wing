---
title: Secret
id: secret
description: A built-in resource for securely storing secrets in the cloud.
keywords:
  [
    Wing reference,
    Wing language,
    language,
    Wing standard library,
    Wing programming language,
    secrets,
  ]
sidebar_position: 1
---

The `cloud.Secret` class represents a secret value (like an API key, certificate, etc.) that is securely stored in the cloud.

Secrets are encrypted at rest and in transit, and are only decrypted when they are used in a task.
Storing a secret allows you to use the value in different compute tasks while only having to rotate or revoke it in one place.

You can use the [`wing secrets`](https://www.winglang.io/docs/tools/cli#store-secrets-wing-secrets) command to store secrets in the target platform.

## Usage

### Defining a secret

```js example
bring cloud;

let secret = new cloud.Secret(
  name: "my-secret", // optional, defaults to a generated name
);
```

Before deploying your application, you will be expected to store the secret value in a secure place according to the target-specific instructions below.

### Retrieving secret values

```js example
bring cloud;

let secret = new cloud.Secret(
  name: "my-api-key",
);

new cloud.Function(inflight () => {
  let secretValue = secret.value(); // retrieve the secret as a `str` value
  let secretValueAsJson = secret.valueJson(); // retrieve the secret as a `Json` value
});
```

## Target-specific details

### Simulator (`sim`)

When using a secret in Wing's simulator, a secrets file must be added to your project in a file called: `.env`.
The simulator will look up secrets in this file by their `name`.
Secrets should be saved in a key=value format:

```json
// .env
my-api-key=1234567890
secret-key=secret-value
```

### AWS (`tf-aws` and `awscdk`)

AWS implementations of `cloud.Secret` use [AWS Secrets Manager](https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html).
Before deploying your application, you must create a secret in the AWS account with the same `name` as the secret in your Wing application.
You can do this using the AWS CLI:

```bash
aws secretsmanager create-secret --name my-api-key --secret-string 1234567890
```

It's also possible to create a secret using the AWS console.
See [AWS documentation](https://docs.aws.amazon.com/secretsmanager/latest/userguide/create_secret.html) for more details.

### Azure (`tf-azure`)

🚧 Not supported yet (tracking issue: [#2178](https://github.com/winglang/wing/issues/2178))

### GCP (`tf-gcp`)

🚧 Not supported yet (tracking issue: [#2179](https://github.com/winglang/wing/issues/2179))
## API Reference <a name="API Reference" id="API Reference"></a>

### Secret <a name="Secret" id="@winglang/sdk.cloud.Secret"></a>

A cloud secret.

#### Initializers <a name="Initializers" id="@winglang/sdk.cloud.Secret.Initializer"></a>

```wing
bring cloud;

new cloud.Secret(props?: SecretProps);
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Secret.Initializer.parameter.props">props</a></code> | <code><a href="#@winglang/sdk.cloud.SecretProps">SecretProps</a></code> | *No description.* |

---

##### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Secret.Initializer.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.cloud.SecretProps">SecretProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

##### Inflight Methods

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.ISecretClient.value">value</a></code> | Retrieve the value of the secret. |
| <code><a href="#@winglang/sdk.cloud.ISecretClient.valueJson">valueJson</a></code> | Retrieve the Json value of the secret. |

---

##### `value` <a name="value" id="@winglang/sdk.cloud.ISecretClient.value"></a>

```wing
inflight value(options?: GetSecretValueOptions): str
```

Retrieve the value of the secret.

###### `options`<sup>Optional</sup> <a name="options" id="@winglang/sdk.cloud.ISecretClient.value.parameter.options"></a>

- *Type:* <a href="#@winglang/sdk.cloud.GetSecretValueOptions">GetSecretValueOptions</a>

---

##### `valueJson` <a name="valueJson" id="@winglang/sdk.cloud.ISecretClient.valueJson"></a>

```wing
inflight valueJson(options?: GetSecretValueOptions): Json
```

Retrieve the Json value of the secret.

###### `options`<sup>Optional</sup> <a name="options" id="@winglang/sdk.cloud.ISecretClient.valueJson.parameter.options"></a>

- *Type:* <a href="#@winglang/sdk.cloud.GetSecretValueOptions">GetSecretValueOptions</a>

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.Secret.onLiftType">onLiftType</a></code> | A hook called by the Wing compiler once for each inflight host that needs to use this type inflight. |
| <code><a href="#@winglang/sdk.cloud.Secret.toInflight">toInflight</a></code> | Generates an asynchronous JavaScript statement which can be used to create an inflight client for a resource. |

---

##### `onLiftType` <a name="onLiftType" id="@winglang/sdk.cloud.Secret.onLiftType"></a>

```wing
bring cloud;

cloud.Secret.onLiftType(host: IInflightHost, ops: MutArray<str>);
```

A hook called by the Wing compiler once for each inflight host that needs to use this type inflight.

The list of requested inflight methods
needed by the inflight host are given by `ops`.

This method is commonly used for adding permissions, environment variables, or
other capabilities to the inflight host.

###### `host`<sup>Required</sup> <a name="host" id="@winglang/sdk.cloud.Secret.onLiftType.parameter.host"></a>

- *Type:* <a href="#@winglang/sdk.std.IInflightHost">IInflightHost</a>

---

###### `ops`<sup>Required</sup> <a name="ops" id="@winglang/sdk.cloud.Secret.onLiftType.parameter.ops"></a>

- *Type:* MutArray&lt;str&gt;

---

##### `toInflight` <a name="toInflight" id="@winglang/sdk.cloud.Secret.toInflight"></a>

```wing
bring cloud;

cloud.Secret.toInflight(obj: IResource);
```

Generates an asynchronous JavaScript statement which can be used to create an inflight client for a resource.

NOTE: This statement must be executed within an async context.

###### `obj`<sup>Required</sup> <a name="obj" id="@winglang/sdk.cloud.Secret.toInflight.parameter.obj"></a>

- *Type:* <a href="#@winglang/sdk.std.IResource">IResource</a>

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Secret.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.cloud.Secret.property.name">name</a></code> | <code>str</code> | Get secret name. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.cloud.Secret.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `name`<sup>Optional</sup> <a name="name" id="@winglang/sdk.cloud.Secret.property.name"></a>

```wing
name: str;
```

- *Type:* str

Get secret name.

---



## Structs <a name="Structs" id="Structs"></a>

### GetSecretValueOptions <a name="GetSecretValueOptions" id="@winglang/sdk.cloud.GetSecretValueOptions"></a>

Options when getting a secret value.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.GetSecretValueOptions.Initializer"></a>

```wing
bring cloud;

let GetSecretValueOptions = cloud.GetSecretValueOptions{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.GetSecretValueOptions.property.cache">cache</a></code> | <code>bool</code> | Whether to cache the value. |

---

##### `cache`<sup>Optional</sup> <a name="cache" id="@winglang/sdk.cloud.GetSecretValueOptions.property.cache"></a>

```wing
cache: bool;
```

- *Type:* bool
- *Default:* true

Whether to cache the value.

---

### SecretProps <a name="SecretProps" id="@winglang/sdk.cloud.SecretProps"></a>

Options for `Secret`.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.SecretProps.Initializer"></a>

```wing
bring cloud;

let SecretProps = cloud.SecretProps{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.SecretProps.property.name">name</a></code> | <code>str</code> | The secret's name. |

---

##### `name`<sup>Optional</sup> <a name="name" id="@winglang/sdk.cloud.SecretProps.property.name"></a>

```wing
name: str;
```

- *Type:* str
- *Default:* a new secret is provisioned with a generated name

The secret's name.

If no name is provided then a new secret is provisioned in the target.
If a name is provided then the resource will reference an existing
secret in the target.

---


