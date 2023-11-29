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

The `cloud.Endpoint` resource holds a URL and outputs it.

## Usage

```ts playground
bring cloud;

let endpoint = new cloud.Endpoint("https://example.com");
```

## Target-specific details

### Simulator (`sim`)

The sim implementation of `cloud.Endpoint` outputs the endpoint URL.

### AWS (`tf-aws`)

The AWS implementation of `cloud.Endpoint` uses a [Terraform Output](https://developer.hashicorp.com/terraform/language/values/outputs).

### AWS (`awscdk`)

🚧 Not supported yet

### Azure (`tf-azure`)

🚧 Not supported yet

### GCP (`tf-gcp`)

🚧 Not supported yet
## API Reference <a name="API Reference" id="API Reference"></a>

### Endpoint <a name="Endpoint" id="@winglang/sdk.cloud.Endpoint"></a>

Holds a URL and outputs it.

#### Initializers <a name="Initializers" id="@winglang/sdk.cloud.Endpoint.Initializer"></a>

```wing
bring cloud;

new cloud.Endpoint("https://example.com");
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Ednpoint.property.url">url</a></code> | <code>str</code> | *The endpoint URL* |
|

---

##### `url`<sup>Required</sup> <a name="url" id="@winglang/sdk.cloud.Ednpoint.property.url"></a>

- *Type:* str
