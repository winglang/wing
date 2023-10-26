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


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Secret.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.cloud.Secret.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

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


