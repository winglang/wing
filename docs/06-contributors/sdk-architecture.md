---
title: SDK Architecture
id: sdk-architecture
keywords: [SDK architecture, sdk]
---
# SDK Architecture

The Wing SDK is the standard library for the Wing language.
The core of the SDK are its APIs for creating cloud resources.

By using the SDK to specify the desired state of cloud application including resources like API gateways, queues, storage buckets, and so on, the SDK can synthesize an artifact for deploying that application to the cloud.
Today the SDK supports either synthesizing a collection of Terraform configuration, or synthesizing a simulator file that the SDK's `Simulator` API can use to simulate the app within Node.js.

## Constructs

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

## Polycons

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

## Inflights

Inflights are Wing's distributed computing primitive.
They are isolated code blocks which can be packaged and executed on compute platforms in the cloud (such as containers, CI/CD pipelines or FaaS).

When a resource wants to use an inflight in an API, it is represented in the SDK through a resource with a single inflight method named `handle`.

Currently, the SDK provides a utility class named `Inflight` that can be used to quickly create a resource with an implementation of the `handle` method.

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
      await this.message_count.inc();
      await this.my_queue.push(event);
    }`
  ),
  bindings: {
    message_count: {
      resource: counter,
      ops: ["inc"],
    },
    my_queue: {
      resource: queue,
      ops: ["push"],
    },
  },
});
new sdk.cloud.Function(this, "Function", handler);
```

Every resource added to the `bindings` field is implicitly added as a dependency of the inflight, and is made available to the inflight code through a field with the same name.
(Hence the API calls to `this.message_count.print` and `this.my_queue.push` in the inflight code.)

The `bindings` field requires a `resource` field with a reference to the original resource object, and an `ops` field that specifies the operations that the inflight code will use on the resource.

Under the hood, two main functions are performed by the SDK with this information:

### 1. Resource binding

First, each referenced resource is "bound" to the inflight host through a `_bind` method that is defined on all resources.
In the example above, `cloud.Function` is the host, and `cloud.Queue` is a referenced resource.
The function would call `queue._bind(this, ["push"])` to bind the queue to the function host, providing information about the methods it expects to use on the queue.

The referenced resource can then perform any necessary setup to allow the host to referenced it during runtime, such as setting up least privilege permissions.
For example, when compiling to AWS, the queue can create an IAM role that allows the function to execute `sqs:SendMessage` API calls on the queue.

In more complex resources, the `_bind` method will automatically call `_bind` on any sub-resources based on the operations that the host expects to use.
For example, suppose the user defines a `TaskList` resource with a method named `add_task`, and `add_task` calls `put` on a `cloud.Bucket` (a child resource).
Then whenever `TaskList` is bound to a host and `add_task` is one of the operations the inflight code expects to call, then the `cloud.Bucket` will automatically be bound to the host as well.

### 2. Inflight code bundling

Second, the SDK will bundle the inflight code needed for each of the resources that it references.
For example, to call `push` on a queue in a piece of inflight code, the SDK needs to bundle the inflight code of `cloud.Queue` with the user's code.
The inflight host accomplishes this by calling the `_toInflight` method on each referenced resource, which returns a stringified JavaScript class with the code for performing the inflight operations and API calls.
These classes are then bundled together with esbuild, and can be used by the inflight host as necessary for deploying to the target cloud.

In the case of AWS for example, a `cloud.Function` will create an AWS Lambda function referencing a Terraform asset with a zipfile of the inflight code.

For the simulator, the inflight code is bundled into the `.wsim` file produced by the compiler.
