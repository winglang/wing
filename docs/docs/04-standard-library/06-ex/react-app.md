---
title: React Website
id: react-website
description: A built-in resource for creating deployable websites using the React framework.
keywords: [Website, React, deployment, build]
sidebar_position: 1
---

The `ex.ReactApp` resource represents a website, built using React, that can be both hosted in the cloud or to run on a development hot-reload server in the sim target.

## Usage

### Initialization

Using the default arguments:

```ts
bring ex;
bring util;

let website = new ex.ReactApp(projectPath: "./client");
```

or customizing them:

```ts
bring ex;
bring util;

let website = new ex.ReactApp(
  projectPath: "./client",
  isDevRun: util.tryEnv("ENV") == "dev" // `true`` by default. will run the start command if true, and the build command if not
  buildDir: "/dist" // default is "/build"
  startCommand: "pnpm start" // default is "npm start"
  buildCommand: "pnpm build" // default is "npm build"
  hostProps: {} // properties that apply to the react app host, which is a `cloud.Website` resource
  localPort: "4000" // default is 3001
 );
```

- When calling `wing it` with `isDevRun` set to `true`, Wing will start both the simulator and React's development server.
- When calling `wing it` or `wing compile` for the `sim` target with `isDevRun` set to `false`, Wing will build React and serve it via the [Website resource](../01-cloud/website.md).
- When calling `wing compile` for any other target, Wing will build React locally and generate output files, preparing it for deployment to the cloud using the [Website resource](../01-cloud/website.md).

#### using wing variables within react code

`ex.ReactApp` allows you to pass preflight arguments from wing to the React app using `addEnvironmentVariable` method:

```ts
bring cloud;
bring util;
bring ex;

let api = new cloud.Api();
let website = new ex.ReactApp(projectPath: "./client", isDevRun: util.tryEnv("ENV") == "dev");

website.addEnvironmentVariable("apiUrl", api.url);
website.addEnvironmentVariable("another", "some string variable");

```

Then in the React app use `window.wingEnv`:
(accessible after adding `<script src="./wing.js"></script>` to the index file)

```ts
const { apiUrl } = window.wingEnv;
const users = await fetch(apiUrl + "/users");
```

Currently, we can only pass preflight string variables to the React app environment.

## Target-specific details

### Simulator (`sim`)

sim implementations of `ex.ReactApp` is using either the [Website resource](../01-cloud/website.md) (when `isDevRun` is `false`) or starts React development server when `true`.

### AWS (`tf-aws` and `awscdk`)

AWS implementations of `ex.ReactApp` uses the [Website resource](../01-cloud/website.md).

### Azure (`tf-azure`)

🚧 Not supported yet (tracking issue: [#4220](https://github.com/winglang/wing/issues/4220))

### GCP (`tf-gcp`)

🚧 Not supported yet (tracking issue: [#4221](https://github.com/winglang/wing/issues/4221))
# API Reference <a name="API Reference" id="api-reference"></a>

## Resources <a name="Resources" id="Resources"></a>

### ReactApp <a name="ReactApp" id="@winglang/sdk.ex.ReactApp"></a>

A cloud deployable React App.

#### Initializers <a name="Initializers" id="@winglang/sdk.ex.ReactApp.Initializer"></a>

```wing
bring ex;

new ex.ReactApp(props: ReactAppProps);
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.ReactApp.Initializer.parameter.props">props</a></code> | <code><a href="#@winglang/sdk.ex.ReactAppProps">ReactAppProps</a></code> | *No description.* |

---

##### `props`<sup>Required</sup> <a name="props" id="@winglang/sdk.ex.ReactApp.Initializer.parameter.props"></a>

- *Type:* <a href="#@winglang/sdk.ex.ReactAppProps">ReactAppProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

##### Preflight Methods

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.ex.ReactApp.addEnvironmentVariable">addEnvironmentVariable</a></code> | Adding a key-value pair that can be accessible later via the `window.wingEnv` object in the react code. |

---

##### `addEnvironmentVariable` <a name="addEnvironmentVariable" id="@winglang/sdk.ex.ReactApp.addEnvironmentVariable"></a>

```wing
addEnvironmentVariable(key: str, value: str): void
```

Adding a key-value pair that can be accessible later via the `window.wingEnv` object in the react code.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.ReactApp.addEnvironmentVariable.parameter.key"></a>

- *Type:* str

the key to add.

---

###### `value`<sup>Required</sup> <a name="value" id="@winglang/sdk.ex.ReactApp.addEnvironmentVariable.parameter.value"></a>

- *Type:* str

the value to add.

---


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.ReactApp.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@winglang/sdk.ex.ReactApp.property.url">url</a></code> | <code>str</code> | Website's url. |

---

##### `node`<sup>Required</sup> <a name="node" id="@winglang/sdk.ex.ReactApp.property.node"></a>

```wing
node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `url`<sup>Required</sup> <a name="url" id="@winglang/sdk.ex.ReactApp.property.url"></a>

```wing
url: str;
```

- *Type:* str

Website's url.

---



## Structs <a name="Structs" id="Structs"></a>

### ReactAppProps <a name="ReactAppProps" id="@winglang/sdk.ex.ReactAppProps"></a>

Options for `ReactApp`.

#### Initializer <a name="Initializer" id="@winglang/sdk.ex.ReactAppProps.Initializer"></a>

```wing
bring ex;

let ReactAppProps = ex.ReactAppProps{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.ReactAppProps.property.projectPath">projectPath</a></code> | <code>str</code> | The path to the React app root folder- can be absolute or relative to the wing folder. |
| <code><a href="#@winglang/sdk.ex.ReactAppProps.property.buildCommand">buildCommand</a></code> | <code>str</code> | A command for building the React app. |
| <code><a href="#@winglang/sdk.ex.ReactAppProps.property.buildDir">buildDir</a></code> | <code>str</code> | The path to the React app build folder- relative to the `projectPath`. |
| <code><a href="#@winglang/sdk.ex.ReactAppProps.property.hostProps">hostProps</a></code> | <code><a href="#@winglang/sdk.cloud.WebsiteOptions">WebsiteOptions</a></code> | Additional properties to run the website host with. |
| <code><a href="#@winglang/sdk.ex.ReactAppProps.property.isDevRun">isDevRun</a></code> | <code>bool</code> | In sim, if `true` - will use the start command, and if `false` - the build command. |
| <code><a href="#@winglang/sdk.ex.ReactAppProps.property.localPort">localPort</a></code> | <code>any</code> | A port to start a local build of the React app on. |
| <code><a href="#@winglang/sdk.ex.ReactAppProps.property.startCommand">startCommand</a></code> | <code>str</code> | A command for starting React app locally. |

---

##### `projectPath`<sup>Required</sup> <a name="projectPath" id="@winglang/sdk.ex.ReactAppProps.property.projectPath"></a>

```wing
projectPath: str;
```

- *Type:* str

The path to the React app root folder- can be absolute or relative to the wing folder.

---

##### `buildCommand`<sup>Optional</sup> <a name="buildCommand" id="@winglang/sdk.ex.ReactAppProps.property.buildCommand"></a>

```wing
buildCommand: str;
```

- *Type:* str
- *Default:* "npm run build"

A command for building the React app.

---

##### `buildDir`<sup>Optional</sup> <a name="buildDir" id="@winglang/sdk.ex.ReactAppProps.property.buildDir"></a>

```wing
buildDir: str;
```

- *Type:* str
- *Default:* "/build"

The path to the React app build folder- relative to the `projectPath`.

---

##### `hostProps`<sup>Optional</sup> <a name="hostProps" id="@winglang/sdk.ex.ReactAppProps.property.hostProps"></a>

```wing
hostProps: WebsiteOptions;
```

- *Type:* <a href="#@winglang/sdk.cloud.WebsiteOptions">WebsiteOptions</a>
- *Default:* {}

Additional properties to run the website host with.

---

##### `isDevRun`<sup>Optional</sup> <a name="isDevRun" id="@winglang/sdk.ex.ReactAppProps.property.isDevRun"></a>

```wing
isDevRun: bool;
```

- *Type:* bool
- *Default:* false

In sim, if `true` - will use the start command, and if `false` - the build command.

---

##### `localPort`<sup>Optional</sup> <a name="localPort" id="@winglang/sdk.ex.ReactAppProps.property.localPort"></a>

```wing
localPort: any;
```

- *Type:* any
- *Default:* 3001

A port to start a local build of the React app on.

---

##### `startCommand`<sup>Optional</sup> <a name="startCommand" id="@winglang/sdk.ex.ReactAppProps.property.startCommand"></a>

```wing
startCommand: str;
```

- *Type:* str
- *Default:* "npm run start"

A command for starting React app locally.

---


