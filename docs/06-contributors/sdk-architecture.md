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

When a resource wants to use an inflight in an API, it is represented in the SDK using the `Inflight` class.
An `Inflight` is modeled as an object containing:

* a snippet of code (inline string or file)
* an entrypoint (name of a function to call)
* a map of resource bindings

For example, given the following Wing code:

```wing
let queue = new cloud.Queue();
let greeting = "Hello, world!";
new cloud.Function((event: str) ~> {
    print(greeting);
    queue.push(event);
});
```

... the responsibility of the Wing compiler is to transform it into JavaScript like this:

```ts
const queue = new sdk.cloud.Queue(this, "Queue");
const handler = new sdk.core.Inflight({
  code: sdk.core.NodeJsCode.fromInline(
    `const $greeting = "Hello, world!";
    async function $proc($cap, event) {
      await $cap.logger.print($greeting);
      await $cap.queue.push(event);
    }`
  ),
  entrypoint: "$proc",
  bindings: {
    logger: {
      resource: sdk.cloud.Logger.of(this),
      methods: ["print"],
    },
    queue: {
      resource: queue,
      methods: ["push"],
    },
    greeting: {
      value: "Hello, world!",
    }
  },
});
new sdk.cloud.Function(this, "Function", handler);
```

The inflight's `bindings` field currently serve two purposes.

The first purpose is to provide references to resources so that the CDK code can "glue" the resources together.
This can include setting up permissions for the compute resource to perform operations on the referenced resource during runtime.
The `methods` field associated with referenced resources specifies what operations need to be used on the resource, so that least privilege permissions can be granted to the resource running the inflight code.

The second purpose is signal to the SDK that there is data that needs to be bundled with the user code.
For example, when a `cloud.Queue` is used by an inflight in an AWS application, the user's inflight code needs to be bundled with an inflight "client" that can perform `push()` by calling the AWS SDK.

The next section explains how the `Inflight` class is used to produce a JavaScript bundle during the app's synthesis.
This JavaScript bundle will inject the appropriate code for `$cap`, and the code bundle will be included as a Terraform asset when the app is synthesized.

## Bundling

Currently, the SDK handles the process of bundling inflight user code with dependencies such as inflight resource clients and constants.
For simplicity, this discussion will focus on the example of a `cloud.Function` accepting an inflight handler.

The bundling process starts in the constructor of the class implementing the `cloud.Function` polycon -- for example, `tfaws.Function`.

The first step is that the function needs to obtain "clients" for all of the bound resources (modeled as `Record<string, Code>`).
To do this, it iterates over each resource in `bindings`, and inverts the control back to the bound resource by calling the resource's `_bind` method with the `host` (the `cloud.Function`) and a set of `policies` (list of resource names and methods that are called on them).

For example, if a `tfaws.Bucket` named `bucket` binds to a `tfaws.Function` named `func`, then `bucket._bind(func, policies)` is called.
`_bind` will update `func`'s AWS IAM policy so that it can perform operations on the bucket, and it will return a `Code` object that contains a `BucketClient` class with methods like `get` and `put`.
After we repeat this process for all resources, we will have a map from binding names to `Code` objects.

The second step is to call esbuild.
Each `Inflight` has a `bundle` method that combines the user's code with the collection of "clients", in a template that looks something like:

```ts
const $cap = {
  <binding1>: <binding1-client>,
  <binding2>: <binding2-client>,
  ...
};
// user code with named entrypoint
exports.handler = function(event) { entrypoint($cap, event) };
```

Today the SDK currently expects the user code included in an `Inflight` to always have an object containing bound resources as its first argument, and an event as a second argument.
