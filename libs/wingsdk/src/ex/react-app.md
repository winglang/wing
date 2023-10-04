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
