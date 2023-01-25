---
title: Wing SDK
id: wingsdk
keywords: [Wing contributors, contributors, sdk]
---

This topic includes contribution guidelines related to the Wing SDK.

## 🔨 How do I build just the SDK?

The SDK resides in `libs/wingsdk` and it's where Wing's standard library of resources lives. It's written in TypeScript, and is published to npm.

The SDK is built using a couple of extra libraries and tools:

* [CDK for Terraform] ("cdktf") is a framework for defining Terraform infrastructure. The SDK uses it to generate the Terraform files that users deploy.
* [JSII] is a tool we used to compile the SDK. JSII is a wrapper over TypeScript that makes it possible to use the SDK in other languages like Python, Java, C#, and Go. This is made possible through extra type checks. In practice, the main difference from ordinary TypeScript is that you cannot use advanced TypeScript types like `Partial` or generics in public APIs.
* [Projen] is a tool used to manage project configuration files. It uses the `.projenrc.ts` file to generate `package.json` and other files. You can modify it and run `npx projen` to regenerate the resources. If you are not touching configuration files, you can totally ignore this.

Everything in the SDK can be built by running `npm run build` from `libs/wingsdk`. You can also run `npm run test` to just run tests.

(If you have any issues building the package, please open an issue and let us know!)

[CDK for Terraform]: https://github.com/hashicorp/terraform-cdk
[JSII]: https://github.com/aws/jsii
[Projen]: https://github.com/projen/projen


## 🧱 How do I add a dependency to the SDK?

If you need to add a new npm dependency to the SDK, you can do so by editing the `.projenrc.ts` file and running `npx projen` after making the edits.
If the dependency is a JSII library[2], you should add it to the list named `peerDeps` - otherwise, you should add it to `bundledDeps`.

Here is an example of adding a package named "fast-json-stringify" pinned to major version 5 through the projenrc file:

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

## 🧩 How do I add a resource to the SDK?

A resource in the SDK has several parts:

* A preflight [polycon](https://github.com/winglang/polycons) API that is shared across all cloud targets. Resource polycons are defined in `src/cloud`. For example, [`src/cloud/bucket.ts`](https://github.com/winglang/wing/tree/main/libs/wingsdk/src/cloud/bucket.ts).
* An interface representing the inflight API common across all cloud targets. By convention, if the resource is named like `Gizmo`, the inflight interface should be named `IGizmoClient`. This is usually in the same file as the preflight API.
* A simulator implementation in `src/sim`. This includes:
  * A schema with information to simulate the resource and display the resource in the Wing console. Currently these are in [`src/sim/schema-resources.ts`](https://github.com/winglang/wing/tree/main/libs/wingsdk/src/sim/schema-resources.ts).
  * A class that implements the polycon API and can produce the resource's simulation schema. For example, [`src/sim/bucket.ts`](https://github.com/winglang/wing/tree/main/libs/wingsdk/src/sim/bucket.ts).
  * An class that implements the inflight API and can simulate the resource. For example, [`src/sim/bucket.sim.ts`](https://github.com/winglang/wing/tree/main/libs/wingsdk/src/sim/bucket.sim.ts).
  * Unit tests for the simulator implementation. For example, [`test/sim/bucket.test.ts`](https://github.com/winglang/wing/tree/main/libs/wingsdk/test/sim/bucket.test.ts).
* An implementation for each target cloud (currently just AWS). This includes:
  * A class that implements the polycon API and creates all of the required terraform resources. For example, [`src/tf-aws/bucket.ts`](https://github.com/winglang/wing/tree/main/libs/wingsdk/src/tf-aws/bucket.ts).
  * A class that implements the inflight API that interacts with the cloud resource. For example, [`src/tf-aws/bucket.inflight.ts`](https://github.com/winglang/wing/tree/main/libs/wingsdk/src/tf-aws/bucket.inflight.ts).
  * Unit tests for the cloud infrastructure. For example, [`test/tf-aws/bucket.test.ts`](https://github.com/winglang/wing/tree/main/libs/wingsdk/test/tf-aws/bucket.test.ts).
  * (TODO) Integration tests for the cloud infrastructure.

If you are implementing a new resource, or implementing an existing resource for a new cloud provider, try to take a look at code for existing resources (`Bucket`, `Function`, `Queue`) to see how to structure your code.

For more information about designing resources, check out the Wing SDK design guidelines (TODO).

Feel free to create an issue if you have questions about how to implement a resource or want to discuss the design of a resource.
You can also join us on our [Wing Slack] to ask questions (or just say hi)!

[Wing Slack]: https://t.winglang.io/slack

## 🎨 How do I design the API for a SDK resource?

Check out the Wing SDK design guidelines (TODO).

## 🏁 How do I add and run tests to the SDK?

The SDK uses [jest](https://jestjs.io/) for running unit tests - all of the tests are inside of the `libs/wingsdk/test` directory, organized by the file they test.

All features and bug fixes should have tests! They're easy to forget, but they pay off by helping prevent breakages in the future.

All tests can be run by running the following command from `libs/wingsdk`:

```sh
npm run test
```

During development, you might find it useful to watch for changes and automatically re-run the tests:

```sh
npm run test:watch
```

To re-run individual tests, you can directly use the `jest` command -- for example:

```sh
npx jest test/tf-aws/bucket.test.ts
```

## 🧪 How do I set up my PRs to update snapshots?

When PR checks run they may mutate the PR branch with updates to the snapshots or other things you may have missed.
This behavior has to be enabled manually on forks. Create a repository secret called `MUTATION_TOKEN` with a personal access token that is able to read/write your repo.
