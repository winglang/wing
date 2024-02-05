---
title: Endpoint
id: endpoint
description: A resource that represents an endpoint.
keywords:
  [
    Wing reference,
    Wing language,
    language,
    Wing standard library,
    Wing programming language,
    Endpoint,
    URL,
  ]
sidebar_position: 1
---

The `cloud.Endpoint` represents a publicly accessible endpoint and outputs it as part of the compilation target.

## Usage

```ts playground
bring cloud;

let endpoint = new cloud.Endpoint("https://example.com");
```

## Target-specific details

### Simulator (`sim`)

The sim implementation of `cloud.Endpoint` outputs the endpoint URL.

### AWS (`tf-aws`)

The TF AWS implementation of `cloud.Endpoint` uses a [Terraform Output](https://developer.hashicorp.com/terraform/language/values/outputs).

### AWS (`awscdk`)

The AWS CDK implementation of `cloud.Endpoint` uses a [Cloudformation Output](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/outputs-section-structure.html).

### Azure (`tf-azure`)

🚧 Not supported yet

### GCP (`tf-gcp`)

🚧 Not supported yet
## API Reference <a name="API Reference" id="API Reference"></a>

### Endpoint <a name="Endpoint" id="@winglang/sdk.cloud.Endpoint"></a>

represents a publicly accessible endpoint and outputs it as part of the compilation target.

#### Initializers <a name="Initializers" id="@winglang/sdk.cloud.Endpoint.Initializer"></a>

```wing
bring cloud;

new cloud.Endpoint("https://example.com");
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Endpoint.property.url">url</a></code> | <code>str</code> | *The endpoint URL* |
| <code><a href="#@winglang/sdk.cloud.Endpoint.property.props">props</a></code> | <code>winglang/sdk.cloud.EndpointProps</code> | *The endpoint Props* |
|

---

##### `url`<sup>Required</sup> <a name="url" id="@winglang/sdk.cloud.Endpoint.property.url"></a>

- *Type:* str

---

##### `props` <a name="props" id="@winglang/sdk.cloud.Endpoint.property.props"></a>

- *Type:* winglang/sdk.cloud.EndpointProps

---



## Structs <a name="Structs" id="Structs"></a>

### EndpointProps <a name="EndpointProps" id="@winglang/sdk.cloud.EndpointProps"></a>

Options for `Endpoint`.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.EndpointProps.Initializer"></a>

```wing
bring cloud;

let EndpointProps = cloud.EndpointProps{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.EndpointProps.property.label">label</a></code> | <code>str</code> | The endpoint's label. For UI purposes. |
| <code><a href="#@winglang/sdk.cloud.EndpointProps.property.browserSupport">browserSupport</a></code> | <code>bool</code> | Whether the endpoint is supported through browsers. For UI purposes. |

---

##### `label` <a name="label" id="@winglang/sdk.cloud.EndpointProps.property.label"></a>

```wing
label: str;
```

- *Type:* str

The endpoint's label. For UI purposes.

---

*Example*

```wing
"My Dashboard"
```

---

##### `browserSupport` <a name="browserSupport" id="@winglang/sdk.cloud.EndpointProps.property.browserSupport"></a>

```wing
browserSupport: bool;
```

- *Type:* bool

Whether the endpoint is supported through browsers. For UI purposes.
## API Reference <a name="API Reference" id="API Reference"></a>

### Endpoint <a name="Endpoint" id="@winglang/sdk.cloud.Endpoint"></a>

A cloud Endpoint.

#### Initializers <a name="Initializers" id="@winglang/sdk.cloud.Endpoint.Initializer"></a>

```wing
bring cloud;

new cloud.Endpoint(url: str, props?: EndpointProps);
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Endpoint.Initializer.parameter.url">url</a></code> | <code>str</code> | *No description.* |
| <code><a href="#@winglang/sdk.cloud.Endpoint.Initializer.parameter.props">props</a></code> | <code><a href="#@winglang/sdk.cloud.EndpointProps">EndpointProps</a></code> | *No description.* |

---

##### `url`<sup>Required</sup> <a name="url" id="@winglang/sdk.cloud.Endpoint.Initializer.parameter.url"></a>

- *Type:* str

---

##### `props`<sup>Optional</sup> <a name="props" id="@winglang/sdk.cloud.Endpoint.Initializer.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.cloud.EndpointProps">EndpointProps</a>

---


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.Endpoint.onLiftType">onLiftType</a></code> | A hook called by the Wing compiler once for each inflight host that needs to use this type inflight. |

---

##### `onLiftType` <a name="onLiftType" id="@winglang/sdk.cloud.Endpoint.onLiftType"></a>

```wing
bring cloud;

cloud.Endpoint.onLiftType(host: IInflightHost, ops: MutArray<str>);
```

A hook called by the Wing compiler once for each inflight host that needs to use this type inflight.

The list of requested inflight methods
needed by the inflight host are given by `ops`.

This method is commonly used for adding permissions, environment variables, or
other capabilities to the inflight host.

###### `host`<sup>Required</sup> <a name="host" id="@winglang/sdk.cloud.Endpoint.onLiftType.parameter.host"></a>

- *Type:* <a href="#@winglang/sdk.std.IInflightHost">IInflightHost</a>

---

###### `ops`<sup>Required</sup> <a name="ops" id="@winglang/sdk.cloud.Endpoint.onLiftType.parameter.ops"></a>

- *Type:* MutArray&lt;str&gt;

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Endpoint.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.cloud.Endpoint.property.url">url</a></code> | <code>str</code> | The endpoint url. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.cloud.Endpoint.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `url`<sup>Required</sup> <a name="url" id="@winglang/sdk.cloud.Endpoint.property.url"></a>

```wing
url: str;
```

- *Type:* str

The endpoint url.

---



## Structs <a name="Structs" id="Structs"></a>

### EndpointProps <a name="EndpointProps" id="@winglang/sdk.cloud.EndpointProps"></a>

Options for `Endpoint`.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.EndpointProps.Initializer"></a>

```wing
bring cloud;

let EndpointProps = cloud.EndpointProps{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.EndpointProps.property.browserSupport">browserSupport</a></code> | <code>bool</code> | Whether the endpoint is supported through browsers. |
| <code><a href="#@winglang/sdk.cloud.EndpointProps.property.label">label</a></code> | <code>str</code> | The endpoint's label. |

---

##### `browserSupport`<sup>Optional</sup> <a name="browserSupport" id="@winglang/sdk.cloud.EndpointProps.property.browserSupport"></a>

```wing
browserSupport: bool;
```

- *Type:* bool
- *Default:* undefined

Whether the endpoint is supported through browsers.

For UI purposes.

---

##### `label`<sup>Optional</sup> <a name="label" id="@winglang/sdk.cloud.EndpointProps.property.label"></a>

```wing
label: str;
```

- *Type:* str
- *Default:* undefined

The endpoint's label.

For UI purposes.

---

*Example*

```wing
"My Dashboard"
```


## Protocols <a name="Protocols" id="Protocols"></a>

### IEndpointClient <a name="IEndpointClient" id="@winglang/sdk.cloud.IEndpointClient"></a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.IEndpointClient">IEndpointClient</a>

Inflight interface for `Endpoint`.



