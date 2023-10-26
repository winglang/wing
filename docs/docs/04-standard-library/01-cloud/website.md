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

- *Implements:* <a href="#@winglang/sdk.cloud.IWebsite">IWebsite</a>

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

##### Preflight Methods

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.cloud.Website.addFile">addFile</a></code> | Add a file to the website during deployment. |
| <code><a href="#@winglang/sdk.cloud.Website.addJson">addJson</a></code> | Add a JSON file with custom values during the website's deployment. |

---

##### `addFile` <a name="addFile" id="@winglang/sdk.cloud.Website.addFile"></a>

```wing
addFile(path: str, data: str, options?: AddFileOptions): str
```

Add a file to the website during deployment.

If the path conflicts with file path from the website's static assets, an error will be thrown.

###### `path`<sup>Required</sup> <a name="path" id="@winglang/sdk.cloud.Website.addFile.parameter.path"></a>

- *Type:* str

the file path it will be uploaded as.

---

###### `data`<sup>Required</sup> <a name="data" id="@winglang/sdk.cloud.Website.addFile.parameter.data"></a>

- *Type:* str

the data to write to the file.

---

###### `options`<sup>Optional</sup> <a name="options" id="@winglang/sdk.cloud.Website.addFile.parameter.options"></a>

- *Type:* <a href="#@winglang/sdk.cloud.AddFileOptions">AddFileOptions</a>

configure the file's options.

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

### AddFileOptions <a name="AddFileOptions" id="@winglang/sdk.cloud.AddFileOptions"></a>

Options for adding a file with custom value during the website's deployment.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.AddFileOptions.Initializer"></a>

```wing
bring cloud;

let AddFileOptions = cloud.AddFileOptions{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.AddFileOptions.property.contentType">contentType</a></code> | <code>str</code> | File's content type. |

---

##### `contentType`<sup>Optional</sup> <a name="contentType" id="@winglang/sdk.cloud.AddFileOptions.property.contentType"></a>

```wing
contentType: str;
```

- *Type:* str

File's content type.

---

### WebsiteOptions <a name="WebsiteOptions" id="@winglang/sdk.cloud.WebsiteOptions"></a>

Options for `Website`, and `ReactApp`.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.WebsiteOptions.Initializer"></a>

```wing
bring cloud;

let WebsiteOptions = cloud.WebsiteOptions{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.WebsiteOptions.property.domain">domain</a></code> | <code><a href="#@winglang/sdk.cloud.Domain">Domain</a></code> | The website's custom domain object. |

---

##### `domain`<sup>Optional</sup> <a name="domain" id="@winglang/sdk.cloud.WebsiteOptions.property.domain"></a>

```wing
domain: Domain;
```

- *Type:* <a href="#@winglang/sdk.cloud.Domain">Domain</a>
- *Default:* undefined

The website's custom domain object.

---

### WebsiteProps <a name="WebsiteProps" id="@winglang/sdk.cloud.WebsiteProps"></a>

Options for `Website`.

#### Initializer <a name="Initializer" id="@winglang/sdk.cloud.WebsiteProps.Initializer"></a>

```wing
bring cloud;

let WebsiteProps = cloud.WebsiteProps{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.WebsiteProps.property.domain">domain</a></code> | <code><a href="#@winglang/sdk.cloud.Domain">Domain</a></code> | The website's custom domain object. |
| <code><a href="#@winglang/sdk.cloud.WebsiteProps.property.path">path</a></code> | <code>str</code> | Local path to the website's static files, relative to the Wing source file or absolute. |

---

##### `domain`<sup>Optional</sup> <a name="domain" id="@winglang/sdk.cloud.WebsiteProps.property.domain"></a>

```wing
domain: Domain;
```

- *Type:* <a href="#@winglang/sdk.cloud.Domain">Domain</a>
- *Default:* undefined

The website's custom domain object.

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


## Protocols <a name="Protocols" id="Protocols"></a>

### IWebsite <a name="IWebsite" id="@winglang/sdk.cloud.IWebsite"></a>

- *Implemented By:* <a href="#@winglang/sdk.cloud.Website">Website</a>, <a href="#@winglang/sdk.cloud.IWebsite">IWebsite</a>

Base interface for a website.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.cloud.IWebsite.property.url">url</a></code> | <code>str</code> | The website URL. |

---

##### `url`<sup>Required</sup> <a name="url" id="@winglang/sdk.cloud.IWebsite.property.url"></a>

```wing
url: str;
```

- *Type:* str

The website URL.

---

