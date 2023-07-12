---
title: Website
id: website
description: A built-in resource for creating static websites.
keywords:
  [
    Wing reference,
    Wing language,
    language,
    Wing standard library,
    Wing programming language,
    Schedule,
    Cron job,
  ]
sidebar_position: 1
---

The `cloud.Website` resource represents a static website that can be hosted in the cloud.
Websites are typically used to serve static content, such as HTML, CSS, and JavaScript files, which are updated whenever the application is redeployed.

## Usage

### Website

```ts
bring cloud;

let website = new cloud.Website(path: "./public");
```

Under `./public/index.html`

```html
<!DOCTYPE html>
<html>
  Hello Winglang!!!
</html>
```

### Webapp

An extended Web App example including static Website, API Gateway and a Redis database, can be found in this [example project](https://github.com/winglang/research/tree/main/dogfooding/where-to-eat).

## Target-specific details

Review the [Website RFC](https://www.winglang.io/contributing/rfcs/2023-04-16-website-resource) for detailed information.

### Simulator (`sim`)

sim implementations of `cloud.Website` is using [nodejs express](https://expressjs.com/).

### AWS (`tf-aws` and `awscdk`)

AWS implementations of `cloud.Website` uses [Amazon S3](https://aws.amazon.com/s3/) & [Amazon CloudFront](https://www.amazonaws.cn/en/cloudfront/).

### Azure (`tf-azure`)

🚧 Not supported yet (tracking issue: [#1295](https://github.com/winglang/wing/issues/1295))

### GCP (`tf-gcp`)

🚧 Not supported yet (tracking issue: [#1296](https://github.com/winglang/wing/issues/1296))
## API Reference <a name="API Reference" id="API Reference"></a>

### Website <a name="Website" id="@winglang/sdk.cloud.Website"></a>

**Inflight client:** [@winglang/sdk.cloud.IWebsiteClient](#@winglang/sdk.cloud.IWebsiteClient)

A cloud static website.

#### Initializers <a name="Initializers" id="@winglang/sdk.cloud.Website.Initializer"></a>

```wing
bring cloud;

new cloud.Website(props: WebsiteProps);
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Website.Initializer.parameter.props">props</a></code> | <code><a href="#@winglang/sdk.cloud.WebsiteProps">WebsiteProps</a></code> | *No description.* |

---

##### `props`<sup>Required</sup> <a name="props" id="@winglang/sdk.cloud.Website.Initializer.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.cloud.WebsiteProps">WebsiteProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.Website.addJson">addJson</a></code> | Add a JSON file with custom values during the website's deployment. |

---

##### `addJson` <a name="addJson" id="@winglang/sdk.cloud.Website.addJson"></a>

```wing
addJson(path: str, data: Json): str
```

Add a JSON file with custom values during the website's deployment.

If the path conflicts with file path from the website's static assets, an error will be thrown.

###### `path`<sup>Required</sup> <a name="path" id="@winglang/sdk.cloud.Website.addJson.parameter.path"></a>

- *Type:* str

the file path it will be uploaded as.

---

###### `data`<sup>Required</sup> <a name="data" id="@winglang/sdk.cloud.Website.addJson.parameter.data"></a>

- *Type:* <a href="#@winglang/sdk.std.Json">Json</a>

the data to write to the file.

---


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.Website.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.cloud.Website.property.display">display</a></code> | <code><a href="#@winglang/sdk.std.Display">Display</a></code> | Information on how to display a resource in the UI. |
| <code><a href="#@winglang/sdk.cloud.Website.property.path">path</a></code> | <code>str</code> | Absolute local path to the website's static files. |
| <code><a href="#@winglang/sdk.cloud.Website.property.url">url</a></code> | <code>str</code> | The website's url. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.cloud.Website.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `display`<sup>Required</sup> <a name="display" id="@winglang/sdk.cloud.Website.property.display"></a>

```wing
display: Display;
```

- *Type:* <a href="#@winglang/sdk.std.Display">Display</a>

Information on how to display a resource in the UI.

---

##### `path`<sup>Required</sup> <a name="path" id="@winglang/sdk.cloud.Website.property.path"></a>

```wing
path: str;
```

- *Type:* str

Absolute local path to the website's static files.

---

##### `url`<sup>Required</sup> <a name="url" id="@winglang/sdk.cloud.Website.property.url"></a>

```wing
url: str;
```

- *Type:* str

The website's url.

---



## Structs <a name="Structs" id="Structs"></a>

### WebsiteProps <a name="WebsiteProps" id="@winglang/sdk.cloud.WebsiteProps"></a>

website props.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.WebsiteProps.Initializer"></a>

```wing
bring cloud;

let WebsiteProps = cloud.WebsiteProps{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.WebsiteProps.property.path">path</a></code> | <code>str</code> | Local path to the website's static files, relative to the Wing source file or absolute. |
| <code><a href="#@winglang/sdk.cloud.WebsiteProps.property.domain">domain</a></code> | <code>str</code> | The website's custom domain name. |

---

##### `path`<sup>Required</sup> <a name="path" id="@winglang/sdk.cloud.WebsiteProps.property.path"></a>

```wing
path: str;
```

- *Type:* str

Local path to the website's static files, relative to the Wing source file or absolute.

---

*Example*

```wing
"./dist"
```


##### `domain`<sup>Optional</sup> <a name="domain" id="@winglang/sdk.cloud.WebsiteProps.property.domain"></a>

```wing
domain: str;
```

- *Type:* str
- *Default:* a domain is generated by the cloud provider

The website's custom domain name.

---

*Example*

```wing
"example.com"
```


## Protocols <a name="Protocols" id="Protocols"></a>

### IWebsiteClient <a name="IWebsiteClient" id="@winglang/sdk.cloud.IWebsiteClient"></a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.IWebsiteClient">IWebsiteClient</a>

Inflight methods and members of `cloud.Website`.



