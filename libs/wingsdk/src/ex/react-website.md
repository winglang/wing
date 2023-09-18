---
title: React Website
id: react-website
description: A built-in resource for creating deployable websites using the React framework.
keywords: [Website, React, deployment, build]
sidebar_position: 1
---

The `ex.ReactWebsite` resource represents a website, built using React, that can be both hosted in the cloud or to run on a development hot-reload server in the sim target.

## Usage

### React Website

#### Initiation

using the default arguments:

```ts
bring cloud;
bring util;

let website = new cloud.Website(projectPath: "./client", isDevRun: util.tryEnv("ENV") == "dev");
```

or customizing them:

```ts
bring cloud;
bring util;

let website = new cloud.Website(
  projectPath: "./client",
  isDevRun: util.tryEnv("ENV") == "dev"
  buildFolder: "/dist" // default is "/build"
  startCommand: "pnpm start" // default is "npm start"
  buildCommand: "pnpm build" // default is "npm build"
  hostProps: {} // website resource props (expect of the "path" prop)
  localPort: "4000" // default is 3001
 );
```

- When calling `wing it` when `isDevRun` is `true`- wing starts both the simulator and React's development server
- When calling `wing it`/`wing compile` on the sim target, when `isDevRun` is `false`- wing builds React and serves it over the [Website resource](./website.md).
- When calling `wing compile` to any other target - wing builds react locally then deploys it to the cloud! (using the [Website resource](./website.md))

#### using wing variables within react code

`ex.ReactWebsite` allows you to pass preflight arguments from wing to the React app using `addEnvironment` method:

```ts
bring cloud;
bring util;

let website = new cloud.Api();
let website = new cloud.Website(projectPath: "./client", isDevRun: util.tryEnv("ENV") == "dev");

website.addEnvironment("apiUrl", api.url);
website.addEnvironment("another", "some string variable");

```

Then in the React app use `window.wingEnv`:

```ts
const { apiUrl } = window.wingEnv;
const users = await fetch(apiUrl + "/users");
```

Currently, we can only pass preflight string variables to the React app environment.

## Target-specific details

### Simulator (`sim`)

sim implementations of `ex.ReactWebsite` is using either the [Website resource](./website.md) (when `isDevRun` is `false`) or starts React development server when `true`.

### AWS (`tf-aws` and `awscdk`)

AWS implementations of `ex.ReactWebsite` uses the [Website resource](./website.md).

### Azure (`tf-azure`)

🚧 Not supported yet (tracking issue: [#1295](https://github.com/winglang/wing/issues/1295))

### GCP (`tf-gcp`)

🚧 Not supported yet (tracking issue: [#1296](https://github.com/winglang/wing/issues/1296))
