---
title: Domain
id: domain
description: A built-in resource for representing a domain in the cloud.
keywords:
  [
    Wing reference,
    Wing language,
    language,
    Wing standard library,
    Wing programming language,
    Domain,
  ]
sidebar_position: 1
---

The `cloud.Domain` resource represents a domain configuration in the cloud.

## Usage

### Defining a domain

```js
bring cloud;

let domain = new cloud.Domain(
  domainName: "www.example.com",
);

new cloud.Website(path: "./site", domain: domain);
```

## Target-specific details

### Simulator (`sim`)

Under the hood, the simulator stores the domain value in memory.

Note that domain data is not persisted between simulator runs.

### AWS (`tf-aws` and `awscdk`)

The AWS implementation of `cloud.Domain` requires certain platform-specific values such as the `hostedZoneId` and either `iamCertificate` or `acmCertificateArn` to be provided.

To provide these values, there are two options. You can either pass the values in the command line or you can provide a TOML file with the configurations:

```
wing compile -t tf-aws main.w --value root/Default/Default/Domain/acmCertificateArn=arn:aws:acm:us-east-1:111111111111:certificate/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee --value root/Default/Default/Domain/hostedZoneId=Z0111111111111111111F
```

Alternatively, create a `wing.toml` file in your project directory:

```toml
[root.Default.Default.Domain]
hostedZoneId = "Z0XXXXXXXXXXXXXXXXXXF"
acmCertificateArn = "arn:aws:acm:us-east-1:111111111111:certificate/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"
```

### Azure (`tf-azure`)

🚧 Not supported yet

### GCP (`tf-gcp`)

🚧 Not supported yet## API Reference <a name="API Reference" id="API Reference"></a>

### Domain <a name="Domain" id="@winglang/sdk.cloud.Domain"></a>

A cloud Domain.

#### Initializers <a name="Initializers" id="@winglang/sdk.cloud.Domain.Initializer"></a>

```wing
bring cloud;

new cloud.Domain(props: DomainProps);
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Domain.Initializer.parameter.props">props</a></code> | <code><a href="#@winglang/sdk.cloud.DomainProps">DomainProps</a></code> | *No description.* |

---

##### `props`<sup>Required</sup> <a name="props" id="@winglang/sdk.cloud.Domain.Initializer.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.cloud.DomainProps">DomainProps</a>

---


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.Domain.onLiftType">onLiftType</a></code> | A hook called by the Wing compiler once for each inflight host that needs to use this type inflight. |
| <code><a href="#@winglang/sdk.cloud.Domain.toInflight">toInflight</a></code> | Generates an asynchronous JavaScript statement which can be used to create an inflight client for a resource. |

---

##### `onLiftType` <a name="onLiftType" id="@winglang/sdk.cloud.Domain.onLiftType"></a>

```wing
bring cloud;

cloud.Domain.onLiftType(host: IInflightHost, ops: MutArray<str>);
```

A hook called by the Wing compiler once for each inflight host that needs to use this type inflight.

The list of requested inflight methods
needed by the inflight host are given by `ops`.

This method is commonly used for adding permissions, environment variables, or
other capabilities to the inflight host.

###### `host`<sup>Required</sup> <a name="host" id="@winglang/sdk.cloud.Domain.onLiftType.parameter.host"></a>

- *Type:* <a href="#@winglang/sdk.std.IInflightHost">IInflightHost</a>

---

###### `ops`<sup>Required</sup> <a name="ops" id="@winglang/sdk.cloud.Domain.onLiftType.parameter.ops"></a>

- *Type:* MutArray&lt;str&gt;

---

##### `toInflight` <a name="toInflight" id="@winglang/sdk.cloud.Domain.toInflight"></a>

```wing
bring cloud;

cloud.Domain.toInflight(obj: IResource);
```

Generates an asynchronous JavaScript statement which can be used to create an inflight client for a resource.

NOTE: This statement must be executed within an async context.

###### `obj`<sup>Required</sup> <a name="obj" id="@winglang/sdk.cloud.Domain.toInflight.parameter.obj"></a>

- *Type:* <a href="#@winglang/sdk.std.IResource">IResource</a>

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Domain.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.cloud.Domain.property.domainName">domainName</a></code> | <code>str</code> | The domain name. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.cloud.Domain.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `domainName`<sup>Required</sup> <a name="domainName" id="@winglang/sdk.cloud.Domain.property.domainName"></a>

```wing
domainName: str;
```

- *Type:* str

The domain name.

---



## Structs <a name="Structs" id="Structs"></a>

### DomainProps <a name="DomainProps" id="@winglang/sdk.cloud.DomainProps"></a>

Options for `Domain`.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.DomainProps.Initializer"></a>

```wing
bring cloud;

let DomainProps = cloud.DomainProps{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.DomainProps.property.domainName">domainName</a></code> | <code>str</code> | The website's custom domain name. |

---

##### `domainName`<sup>Required</sup> <a name="domainName" id="@winglang/sdk.cloud.DomainProps.property.domainName"></a>

```wing
domainName: str;
```

- *Type:* str

The website's custom domain name.

---

*Example*

```wing
"example.com"
```



