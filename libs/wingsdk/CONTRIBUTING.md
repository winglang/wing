# Contributing to Wing SDK

Thank you for wanting to contribute to Wing SDK! This will guide you through everything you need to know to make changes 
and submit pull requests to the GitHub repository.

- [Contributing to Wing SDK](#contributing-to-wing-sdk)
  - [Opening Issues](#opening-issues)
  - [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
    - [Setting up GitHub private packages](#setting-up-github-private-packages)
  - [Orientation](#orientation)
    - [`src` folder](#src-folder)
    - [`test` folder](#test-folder)
  - [Setting up and building the project](#setting-up-and-building-the-project)
  - [Testing](#testing)
    - [Sandbox](#sandbox)
  - [Creating a resource](#creating-a-resource)
  - [Exporting code and compiling with JSII](#exporting-code-and-compiling-with-jsii)
  - [Submitting a pull request](#submitting-a-pull-request)
  - [Getting Help](#getting-help)

## Opening Issues

One of the easiest ways to contribute to the Wing SDK is by opening [issues](https://github.com/monadahq/winglang/issues/new).
If you're reporting a bug, try to include detailed information including steps to reproduce it, and what you expected to happen.
If you're suggesting a feature or enhancement, please include information about your use case for it.

## Getting Started

Start by forking or cloning the repository. [GitHub's guide](https://docs.github.com/en/get-started/quickstart/contributing-to-projects)
is a great place to get started on this process.

## Prerequisites

These tools are needed to build the library and run unit tests:

- Node.js - we recommend [nvm](https://github.com/nvm-sh/nvm) for managing Node versions
- Your favorite code editor

These tools are needed to run integration tests that deploy the resources to clouds:

- [AWS CLI](https://aws.amazon.com/cli/) - make sure to do the setup part to create credentials
- [Terraform CLI](https://learn.hashicorp.com/terraform/getting-started/install.html)
- (optional) [CDK for Terraform CLI](https://learn.hashicorp.com/tutorials/terraform/cdktf-install?in=terraform/cdktf) - not required if you are using just the commands added to npm in the projen def file

To build the project, you also need to `npm login` into `@monadahq` in order to install private npm packages.

### Setting up GitHub private packages

First, you need a [PAT](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) to login to the GitHub npm registry. Follow the instructions in the [GitHub docs](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-token) to create a PAT. Make sure it has the `read:packages` scope.

After, you should configure npm to use the @monadahq package registry by default for the packages under the @monadahq scope by running:

```sh
npm login --scope=@monadahq --registry=https://npm.pkg.github.com

# > Username: GITHUB USERNAME
# > Password: YOUR PAT
# > Email: PUBLIC-EMAIL-ADDRESS
```

See [Working with the npm registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry) for more information.

## Orientation

This is a [CDK for Terraform], [JSII], [Projen] project. In a nutshell:

* [CDK for Terraform] ("cdktf") is a framework for defining Terraform infrastructure in familiar programming languages like TypeScript, Python, Java, C#, and Go.
* [JSII] is a tool that wraps over the TypeScript compiler that makes it possible to consume the library in multiple languages. JSII code is TypeScript code, but with extra type checks. [1]
* [Projen] is a tool for managing project configuration. There is a `.projenrc.ts` file which generates `package.json` and other files. You can modify it and run `npx projen` to regenerate the resources.

> [1] Currently we only use JSII to compile preflight code. Inflight code and code for the Wing simulator is compiled with plain TypeScript.

[CDK for Terraform]: https://github.com/hashicorp/terraform-cdk
[JSII]: https://github.com/aws/jsii
[Projen]: https://github.com/projen/projen

### `src` folder

Contains the cloud resources for different targets: local and aws at the moment.

All the resource implementations inherit from the base resources in the `cloud` folder.

The non-base resources there are consumed by the app and their constructors return the injected target implementation (aws or local) using the [Polycons](https://github.com/monadahq/polycons) factory that is configured at synth time.

### `test` folder

Contains tests for the different parts of the SDK.

It also includes a `sandbox` folder which is a root of a CDK for TF project that you can use to deploy a mock app to the cloud or to our local simulator.

## Setting up and building the project

Install the dependencies using npm:

```shell
npm i
```

Building this project is accomplished by running the build script. This will build the project, generate the docs, lint the code, and run tests.

```shell
npm run build
```

Dependencies can be added by editing the `.projenrc.ts` file and running `npx projen` after making the edits.
If the dependency is a JSII library[2], you should add it to the list named `peerDeps` - otherwise, you should add it to `bundledDeps`.

Here is an example of adding a package named "fast-json-stringify" pinned to major version 5:

```diff
--- a/libs/wingsdk/.projenrc.ts
+++ b/libs/wingsdk/.projenrc.ts
@@ -17,6 +17,7 @@ const project = new cdk.JsiiProject({
   bundledDeps: [
     "esbuild-wasm",
+    "fast-json-stringify@^5",
     "@aws-sdk/client-s3",
     "@aws-sdk/client-lambda",
```

> [2] JSII libraries are npm packages that are compiled with JSII. They are usually published to npm with the `cdk` keyword, and they will have a `.jsii` file at their root.

## Testing

This project uses [jest](https://jestjs.io/) testing framework. Please refer to the documentation on it if you are not familiar with it. 

All changes need to have tests. Feature changes should have full test coverage and bug fixes should be verified first through new tests. 

All tests can be run using the `test` script:

```shell
npm run test
```

During a lot of active development you may find it useful to watch for changes and automatically re-run the tests:

```shell
npm run test:watch
```

To run individual tests, you can also directly use the `jest` command -- for example:

```shell
npx jest test/tf-aws/bucket.test.ts
```

### Sandbox

```shell
# This will synth the sandbox to either the cloud or wing local based on which
# synthesizer is specified inside `sandbox/main.ts`.
# A sim.out or cdktf.out folder will be generated.
npm install
npm run sandbox:synth

# This will deploy the sandbox app to the cloud or to the Wing simulator
npm run sandbox:deploy 

# follow up with this command to clear the cloud resources
npm run sandbox:destroy 
```

## Creating a resource

A resource in the SDK has several pieces:

* A preflight [polycon](https://github.com/monadahq/polycons) API that is common across all cloud targets. Resource polycons are defined in `src/cloud`. For example, [`src/cloud/bucket.ts`](./src/cloud/bucket.ts).
* An interface representing the inflight API common across all cloud targets. By convention, if the resource is named like `Gizmo`, the inflight interface should be named `IGizmoClient`. This can be in the same file as the preflight API.
* A simulator implementation in `src/sim`. This includes:
  * A schema with information to simulate the resource and display the resource in the Wing console. Currently these are in [`src/sim/schema.ts`](./src/sim/schema.ts).
  * A class that implements the polycon API and can produce the resource's simulation schema. For example, [`src/sim/bucket.ts`](./src/sim/bucket.ts).
  * An `init` function that creates the resource simulation. For example, [`src/sim/bucket.sim.ts`](./src/sim/bucket.sim.ts).
  * A class that implements the inflight API that interacts with the simulation. This class may require parameters that are provided from the `init` function. For example, [`src/sim/bucket.inflight.ts`](./src/sim/bucket.inflight.ts).
  * Unit tests for the simulator implementation. For example, [`test/sim/bucket.test.ts`](./test/sim/bucket.test.ts).
* An implementation for each target cloud (currently just AWS). This includes:
  * A class that implements the polycon API and creates all of the required terraform resources. For example, [`src/tf-aws/bucket.ts`](./src/tf-aws/bucket.ts).
  * A class that implements the inflight API that interacts with the cloud resource. For example, [`src/tf-aws/bucket.inflight.ts`](./src/tf-aws/bucket.inflight.ts).
  * Unit tests for the cloud infrastructure. For example, [`test/tf-aws/bucket.test.ts`](./test/tf-aws/bucket.test.ts) and [`test/tf-aws/capture.test.ts`](./test/tf-aws/captures.test.ts).

If you are implementing a new resource (or implementing an existing resource for a new cloud provider), try to take a look at code for existing resources (`Bucket`, `Function`, `Queue`) to see how to structure your code.

For more information about designing resources, check out the Wing SDK design guidelines (TODO).

Feel free to create an issue if you have questions about how to implement a resource or want to discuss the design of a resource.
You can also join us on our [Discord server](https://discord.gg/7wrggS3dZU) to ask questions (or just say hi)!

## Exporting code and compiling with JSII

The Wing SDK is written in TypeScript and compiled with [JSII], which means that the library can be used in any language that JSII supports, including Python, Java, C#, and Go.

[JSII]: https://github.com/aws/jsii

> Python, Java, C#, and Go versions of the SDK are coming soon!

In order to group APIs together, we prefer to put all public APIs like classes and interfaces inside modules, and then re-export it at the root of a directory. For example:

```ts
// src/azure/bucket.ts
export interface BucketProps {
  // ...
}

export class Bucket {
  // ...
}

// src/azure/index.ts
export * from "./bucket";

// src/index.ts
export * from "./azure";
```

However, some of the code in the Wing SDK is either:

1. Not compatible with JSII, OR
2. Does not need to be made available to other languages because it is an implementation detail. For example, code for simulating resources.

So by convention, any TypeScript files that should not be compiled by JSII should be re-exported to parent directories by files named `exports.ts`, while all other TypeScript files should be re-exported by files named `index.ts`. For example:

```ts
// src/azure/bucket.ts
export interface BucketProps {
  // ...
}

export class Bucket {
  // ...
}

// src/azure/bucket.inflight.ts
import { BlobServiceClient } from "@azure/storage-blob";

export class BucketClient {
  // ...
}

// src/azure/index.ts
export * from "./bucket";

// src/azure/exports.ts
export * from "./index";
export * from "./bucket.inflight";

// src/index.ts
export * from "./azure";

// src/exports.ts
export * from "./azure/exports";
```

Under the hood, we will exclude any files named `exports.ts` from being compiled by JSII, and just compile them with ordinary TypeScript so they are still available to TypeScript/JavaScript consumers.

## Submitting a pull request

To ensure pull requests are reviewed and accepted as quickly as possible, please make sure:

- [ ] Tests are written for all changes.

- [ ] Hand-written documentation in `wingsdk/docs/` is updated if features are being added or removed.

- [ ] `npm run build` has been run to lint, build, and update API docs.

- [ ] Commit messages are clear and descriptive and pushed to your fork.

- [ ] Your fork is in sync with the upstream repository.

Create a new pull request [here](https://github.com/monadahq/wingsdk/compare), selecting your fork for the 'compare' 
and `main` for the 'base'. 

The title of the pull request should adhere to [conventional commits](https://www.conventionalcommits.org). For example, 
if you're adding new features, the pull request title should start with `feat(sdk):`. If you are fixing a bug, then `fix(sdk):` 
should be the title prefix.

In the description reference any open issues that the changes resolve. Describe the changes you made and include anything
you think would be useful for a reviewer to know. It's also a great place to add a shout-out to anyone who helped with the 
changes.

## Getting Help

If you need help in contributing to this project please join our [Discord server](https://discord.gg/7wrggS3dZU) where 
people are waiting to help in the #help channel.
