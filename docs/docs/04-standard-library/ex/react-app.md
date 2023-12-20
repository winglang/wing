---
title: React App
id: react-app
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
  useBuildCommand: true // `false` by default. Will run the build command if true, and the start command if not
  buildDir: "/dist" // default is "/build"
  startCommand: "pnpm start" // default is "npm start"
  buildCommand: "pnpm build" // default is "npm build"
  localPort: 4000 // default is 3001
 );
```

When `ReactApp` is compiled to the `sim` target, by default it runs the start command (default: `npm start`) inside `projectPath` to serve your app in development mode on a local port.

If the `useBuildCommand` environment variable is set OR if `ReactApp` is compiled to any other target, it will run the build command (default: `npm build`) inside of the `projectPath` to build the React app for production to `buildDir` and serve the app.

### Using Wing variables within react code

`ex.ReactApp` allows you to pass preflight string values from Wing to the React app using `addEnvironment` method:

```ts
bring cloud;
bring util;
bring ex;

let api = new cloud.Api();
let website = new ex.ReactApp(projectPath: "./client");

website.addEnvironment("apiUrl", api.url);
website.addEnvironment("another", "some string variable");

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

sim implementations of `ex.ReactApp` is using either the [Website resource](../01-cloud/website.md) (when `useBuildCommand` is `true`) or starts React development server when `false`.

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
| <code><a href="#@winglang/sdk.ex.ReactApp.addEnvironment">addEnvironment</a></code> | Adding a key-value pair that can be accessible later via the `window.wingEnv` object in the react code. |

---

##### `addEnvironment` <a name="addEnvironment" id="@winglang/sdk.ex.ReactApp.addEnvironment"></a>

```wing
addEnvironment(key: str, value: str): void
```

Adding a key-value pair that can be accessible later via the `window.wingEnv` object in the react code.

###### `key`<sup>Required</sup> <a name="key" id="@winglang/sdk.ex.ReactApp.addEnvironment.parameter.key"></a>

- *Type:* str

the key to add.

---

###### `value`<sup>Required</sup> <a name="value" id="@winglang/sdk.ex.ReactApp.addEnvironment.parameter.value"></a>

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

### ReactAppOptions <a name="ReactAppOptions" id="@winglang/sdk.ex.ReactAppOptions"></a>

Basic options for `ReactApp`.

#### Initializer <a name="Initializer" id="@winglang/sdk.ex.ReactAppOptions.Initializer"></a>

```wing
bring ex;

let ReactAppOptions = ex.ReactAppOptions{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.ex.ReactAppOptions.property.projectPath">projectPath</a></code> | <code>str</code> | The path to the React app root folder- can be absolute or relative to the wing folder. |
| <code><a href="#@winglang/sdk.ex.ReactAppOptions.property.buildCommand">buildCommand</a></code> | <code>str</code> | A command for building the React app. |
| <code><a href="#@winglang/sdk.ex.ReactAppOptions.property.buildDir">buildDir</a></code> | <code>str</code> | The path to the React app build folder- relative to the `projectPath`. |
| <code><a href="#@winglang/sdk.ex.ReactAppOptions.property.localPort">localPort</a></code> | <code>num</code> | A port to start a local build of the React app on. |
| <code><a href="#@winglang/sdk.ex.ReactAppOptions.property.startCommand">startCommand</a></code> | <code>str</code> | A command for starting React app locally. |
| <code><a href="#@winglang/sdk.ex.ReactAppOptions.property.useBuildCommand">useBuildCommand</a></code> | <code>bool</code> | In sim, if `true` - will use the start command, and if `false` - the build command. |

---

##### `projectPath`<sup>Required</sup> <a name="projectPath" id="@winglang/sdk.ex.ReactAppOptions.property.projectPath"></a>

```wing
projectPath: str;
```

- *Type:* str

The path to the React app root folder- can be absolute or relative to the wing folder.

---

##### `buildCommand`<sup>Optional</sup> <a name="buildCommand" id="@winglang/sdk.ex.ReactAppOptions.property.buildCommand"></a>

```wing
buildCommand: str;
```

- *Type:* str
- *Default:* "npm run build"

A command for building the React app.

---

##### `buildDir`<sup>Optional</sup> <a name="buildDir" id="@winglang/sdk.ex.ReactAppOptions.property.buildDir"></a>

```wing
buildDir: str;
```

- *Type:* str
- *Default:* "/build"

The path to the React app build folder- relative to the `projectPath`.

---

##### `localPort`<sup>Optional</sup> <a name="localPort" id="@winglang/sdk.ex.ReactAppOptions.property.localPort"></a>

```wing
localPort: num;
```

- *Type:* num
- *Default:* 3001

A port to start a local build of the React app on.

---

##### `startCommand`<sup>Optional</sup> <a name="startCommand" id="@winglang/sdk.ex.ReactAppOptions.property.startCommand"></a>

```wing
startCommand: str;
```

- *Type:* str
- *Default:* "npm run start"

A command for starting React app locally.

---

##### `useBuildCommand`<sup>Optional</sup> <a name="useBuildCommand" id="@winglang/sdk.ex.ReactAppOptions.property.useBuildCommand"></a>

```wing
useBuildCommand: bool;
```

- *Type:* bool
- *Default:* false

In sim, if `true` - will use the start command, and if `false` - the build command.

---

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
| <code><a href="#@winglang/sdk.ex.ReactAppProps.property.domain">domain</a></code> | <code><a href="#@winglang/sdk.cloud.Domain">Domain</a></code> | The website's custom domain object. |
| <code><a href="#@winglang/sdk.ex.ReactAppProps.property.projectPath">projectPath</a></code> | <code>str</code> | The path to the React app root folder- can be absolute or relative to the wing folder. |
| <code><a href="#@winglang/sdk.ex.ReactAppProps.property.buildCommand">buildCommand</a></code> | <code>str</code> | A command for building the React app. |
| <code><a href="#@winglang/sdk.ex.ReactAppProps.property.buildDir">buildDir</a></code> | <code>str</code> | The path to the React app build folder- relative to the `projectPath`. |
| <code><a href="#@winglang/sdk.ex.ReactAppProps.property.localPort">localPort</a></code> | <code>num</code> | A port to start a local build of the React app on. |
| <code><a href="#@winglang/sdk.ex.ReactAppProps.property.startCommand">startCommand</a></code> | <code>str</code> | A command for starting React app locally. |
| <code><a href="#@winglang/sdk.ex.ReactAppProps.property.useBuildCommand">useBuildCommand</a></code> | <code>bool</code> | In sim, if `true` - will use the start command, and if `false` - the build command. |

---

##### `domain`<sup>Optional</sup> <a name="domain" id="@winglang/sdk.ex.ReactAppProps.property.domain"></a>

```wing
domain: Domain;
```

- *Type:* <a href="#@winglang/sdk.cloud.Domain">Domain</a>
- *Default:* undefined

The website's custom domain object.

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

##### `localPort`<sup>Optional</sup> <a name="localPort" id="@winglang/sdk.ex.ReactAppProps.property.localPort"></a>

```wing
localPort: num;
```

- *Type:* num
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

##### `useBuildCommand`<sup>Optional</sup> <a name="useBuildCommand" id="@winglang/sdk.ex.ReactAppProps.property.useBuildCommand"></a>

```wing
useBuildCommand: bool;
```

- *Type:* bool
- *Default:* false

In sim, if `true` - will use the start command, and if `false` - the build command.

---


