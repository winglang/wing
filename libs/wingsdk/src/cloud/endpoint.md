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

```ts playground example
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

```wing example
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
