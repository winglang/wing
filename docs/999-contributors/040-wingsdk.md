---
title: Wing SDK
id: wingsdk
keywords: [Wing contributors, contributors, sdk]
---

This topic includes contribution guidelines related to the Wing SDK, the package containing the language's standard library.

## 🔨 How do I build just the SDK?

The SDK resides in `libs/wingsdk`. It's written in TypeScript, and is published to npm.

The SDK is built using a couple of extra libraries and tools:

* [CDK for Terraform] ("cdktf") is a framework for defining Terraform infrastructure. The SDK uses it to generate the Terraform files that users deploy.
* [JSII] is a tool we used to compile the SDK. JSII is a wrapper over TypeScript that makes it possible to use the SDK in other languages like Python, Java, C#, and Go. This is made possible through extra type checks. In practice, the main difference from ordinary TypeScript is that you cannot use advanced TypeScript types like `Partial` or generics in public APIs.
* [Projen] is a tool used to manage project configuration files. It uses the `.projenrc.ts` file to generate `package.json` and other files. You can modify it and run `npx projen` to regenerate the resources. If you are not touching configuration files, you can totally ignore this.

Everything in the SDK can be built by running `npm run build` from `libs/wingsdk`. You can also run `npm run test` to just run tests.

In order to work on the source code, you will need to the build at least once so that TypeScript bindings for Terraform resources will be automatically generated.
These files are not checked in because they are quite large.

(If you have any issues building the package, please open an issue and let us know!)

[CDK for Terraform]: https://github.com/hashicorp/terraform-cdk
[JSII]: https://github.com/aws/jsii
[Projen]: https://github.com/projen/projen

## 🗺️ How is the SDK organized?

Check out [this document](https://github.com/winglang/wing/blob/main/libs/wingsdk/src/README.md) for a summary of what's contained in each module of the SDK's source code.

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

## 🧱 How do I add a new Terraform provider for use in the SDK?

The SDK uses [CDK for Terraform] to generate Terraform files.
This means that you can generate bindings for any Terraform provider and reference in in the SDK using TypeScript.

To add a new provider, go to `libs/wingsdk/.projenrc.ts` and edit the section
that says "CDKTF_BINDINGS" to add the new provider.
Then, run `npx projen` to update the project.
One that has finished, you can run `npm run build` and the new bindings should be generated inside `libs/wingsdk/src/.gen`.

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

To re-run individual tests, you can directly use the `vitest` command -- for example:

```sh
npx vitest run test/target-tf-aws/bucket.test.ts
```

## What is the architecture of the Wing SDK?

## SDK Architecture

The Wing SDK is the standard library for the Wing language.
The core of the SDK are its APIs for creating cloud resources.

By using the SDK to specify the desired state of cloud application including resources like API gateways, queues, storage buckets, and so on, the SDK can synthesize an artifact for deploying that application to the cloud.
Today the SDK supports either synthesizing a collection of Terraform configuration, or synthesizing a simulator file that the SDK's `Simulator` API can use to simulate the app within Node.js.

### Constructs

The SDK resources are written using the Constructs Programming Model.
[constructs](https://github.com/aws/constructs) are building blocks that can be composed together to represent more complex desired state, most commonly for cloud applications.
constructs serves as the low-level foundation of several other infrastructure-as-code frameworks, such as the [AWS CDK](https://github.com/aws/aws-cdk), [cdk8s](https://github.com/cdk8s-team/cdk8s), and [cdktf](https://github.com/hashicorp/terraform-cdk).

Conceptually, constructs are ordinary classes that additionally have a unique **scope** (parent construct) and **id**.
By adding constructs as children of other constructs, they can form in-memory trees, where each construct is uniquely addressible based on its location within the tree.

A construct's **path** is obtained by joining the sequence of construct ids from the tree root to the construct, with the "/" character.
For example, if a construct with no parent is declared the root with an id "root", and it has a child named "Child1", the child has a path of "root/Child1".
Constructs with the same parent are required to have different ids.

> Each construct also has an **address**, which is just a hexadecimal hash of the construct's **path**.
> This value is useful for generating application identifiers in situations where the **path** cannot be used because of character / punctuation limitations.

When a tree of constructs all implement a method like `toTerraform()`, then it is possible to traverse the construct tree and aggregate the result of calling the method on each construct in order to synthesize a result or artifact.

### Polycons

In order to model resources that are implemented differently for each cloud provider, the SDK also uses [polycons](https://github.com/winglang/polycons), a [dependency injection](https://en.wikipedia.org/wiki/Dependency_injection) framework designed to work with constructs.

Using polycons, the SDK resources are structured as follows:

* Each resource has a polycon class defined in the `cloud` namespace with the API that is shared across all cloud implementations (e.g. `cloud.Bucket`).
  In order to work with polycons, any shared properties and methods expected to exist on all classes must be defined on a base clase like `cloud.BucketBase`, and then we have `cloud.Bucket` extending `cloud.BucketBase`.
  Each polycon also has a unique polycon type name needed for polycons to perform dependency injection on them.
* Each cloud target can implement a polycon by defining a class that extends the polycon base class (e.g. `tfaws.Bucket` extends `cloud.BucketBase`).
* Each cloud target defines a [polycon factory](https://github.com/winglang/polycons/blob/main/API.md#ipolyconfactory-) that defines the concrete mapping from polycon type names to polycon implementations.
* Each cloud target has a unique `App` construct that specifies logic for synthesizing a one or more types of constructs.
  It also registers the cloud target's polycon factory to that node on the construct tree.

Through polycons, when a user writes `new cloud.Bucket()` within the scope of an AWS `App`, the constructor of `cloud.Bucket` will automatically look up the polycon factory associated with the construct tree, and call the factory's `resolve` method to produce the class instance specific to that cloud target (`new tfaws.Bucket()`), and return that back to the caller.

Each `App` class has an automatically registered polycon factory, but it's possible to pass a custom factory in `new App(...)` that builds on top of (or overrides) the original factory to support more polycons, or different resolution behavior.

### Inflights

Inflights are Wing's distributed computing primitive.
They are isolated code blocks which can be packaged and executed on compute platforms in the cloud (such as containers, CI/CD pipelines or FaaS).

When a resource wants to use an inflight in an API, it is represented in the SDK through a resource with a single inflight method named `handle`.

Currently, the SDK provides a utility class named `Inflight` that can be used to quickly create an in-memory resource that implements the `handle` method.

For example, given the following Wing code:

```wing
let queue = new cloud.Queue();
let counter = new cloud.Counter();
new cloud.Function(inflight (event: str) => {
    counter.inc();
    queue.push(event);
});
```

... the Wing compiler will transform it into JavaScript like this (this is not the exact code generated, but it's close enough):

```ts
const queue = new sdk.cloud.Queue(this, "Queue");
const counter = new sdk.cloud.Counter(this, "Counter");
const handler = new sdk.core.Inflight(this, "Inflight", {
  code: sdk.core.NodeJsCode.fromInline(
    `async handle(event) {
      await this.messageCount.inc();
      await this.myQueue.push(event);
    }`
  ),
  bindings: {
    messageCount: {
      resource: counter,
      ops: ["inc"],
    },
    myQueue: {
      resource: queue,
      ops: ["push"],
    },
  },
});
new sdk.cloud.Function(this, "Function", handler);
```

Every resource added to the `bindings` field is implicitly added as a dependency of the inflight, and is made available to the inflight code through a field with the same name.
(Hence the API calls to `this.messageCount.inc` and `this.myQueue.push` passed in the `code` field above.)

The `bindings` field requires a `resource` field with a reference to the original resource object, and an `ops` field that specifies the operations that the inflight code will use on the resource.

Under the hood, two main functions are performed by the SDK with this information:

#### 1. Resource binding

First, each referenced resource is "bound" to the inflight host through a `_bind` method that is defined on all resources.
In the example above, `cloud.Function` is the host, and `cloud.Queue` is a referenced resource.
The function would call `queue._bind(this, ["push"])` to bind the queue to the function host, providing information about the methods it expects to use on the queue.

The referenced resource can then perform any necessary setup to allow the host to referenced it during runtime, such as setting up least privilege permissions.
For example, when compiling to AWS, the queue can create an IAM role that allows the function to execute `sqs:SendMessage` API calls on the queue.

In more complex resources, the `_bind` method will automatically call `_bind` on any sub-resources based on the operations that the host expects to use.
For example, suppose the user defines a `TaskList` resource with a method named `addTask`, and `addTask` calls `put` on a `cloud.Bucket` (a child resource).
Then whenever `TaskList` is bound to a host and `addTask` is one of the operations the inflight code expects to call, then the `cloud.Bucket` will automatically be bound to the host as well.

#### 2. Inflight code bundling

Second, the SDK will bundle the inflight code needed for each of the resources that it references.
For example, to call `push` on a queue in a piece of inflight code, the SDK needs to bundle the inflight code of `cloud.Queue` with the user's code.
The inflight host accomplishes this by calling the `_toInflight` method on each referenced resource, which returns a stringified JavaScript class with the code for performing the inflight operations and API calls.
These classes are then bundled together with esbuild, and can be used by the inflight host as necessary for deploying to the target cloud.

In the case of AWS for example, a `cloud.Function` will create an AWS Lambda function referencing a Terraform asset with a zipfile of the inflight code.

For the simulator, the inflight code is bundled into the `.wsim` file produced by the compiler.

## 🧪 How do I set up my PRs to update snapshots?

When PR checks run they may mutate the PR branch with updates to the snapshots or other things you may have missed.
This behavior has to be enabled manually on forks. Create a repository secret called `MUTATION_TOKEN` with a personal access token that is able to read/write your repo.
