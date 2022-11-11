# SDK Architecture

The Wing SDK is the standard library for the Wing language.
The core of the SDK are its APIs for creating cloud resources.

## Constructs

The SDK resources are written using the Constructs Programming Model.
[constructs](https://github.com/aws/constructs) are building blocks that can be composed together to represent more complex desired state, most commonly for cloud applications.
constructs serves as the low-level foundation of several other infrastructure-as-code frameworks, such as the [AWS CDK](https://github.com/aws/aws-cdk), [cdk8s](https://github.com/cdk8s-team/cdk8s), and [cdktf](https://github.com/hashicorp/terraform-cdk).

Conceptually, constructs are ordinary classes that additionally have a unique **scope** (parent construct) and **id**.
By adding constructs as children of other constructs, they can form in-memory trees, where each construct is uniquely addressible based on the "path" of nodes from the tree root.
When a collection of constructs all implement a method like `toTerraform()`, then it is possible to traverse the construct tree and aggregate the result of calling the method on each construct in order to synthesize a result or artifact.

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

Through polycons, when a user writes `new cloud.Bucket()` within the scope of an AWS `App`, the constructor of `cloud.Bucket` will automatically look up the polycon factory associated with the construct tree, and call the factory's `resolve` method to produce the class instance specific to that clodu target (`new tfaws.Bucket()`), and return that back to the caller.

Each `App` class has an automatically registered polycon factory, but it's possible to pass a custom factory in `new App(...)` that builds on top of (or overrides) the original factory to support more polycons, or different resolution behavior.

## Inflights

Inflights are Wing's distributed computing primitive.
They are isolated code blocks which can be packaged and executed on compute platforms in the cloud (such as containers, CI/CD pipelines or FaaS).

When a resource wants to use an inflight in an API, it is represented in the SDK using the `Inflight` class.
An `Inflight` is modeled as a struct containing:

* a snippet of code (inline string or file)
* an entrypoint (name of a function to call)
* a map of "captured" data and resources

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
    `async function $proc($cap, event) {
      await $cap.logger.print($cap.greeting);
      await $cap.queue.push(event);
    }`
  ),
  entrypoint: "$proc",
  captures: {
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

Note that "captured" resources do not only refer to resources defined outside of the inflight function, but also resources that are passed as parameters to the inflight function.

The inflight's `captures` field currently serve two purposes.

The first purpose is to provide references to resources so that the CDK code can "glue" the resources together.
This may include setting up permissions from the compute resource to the referenced resource, and other binding logic necessary to perform operations on the resource during runtime.

The second purpose is signal to the SDK that there is data that needs to be bundled with the user code.
For example, when a `cloud.Queue` is captured by an inflight in an AWS application, the user's inflight code needs to be bundled with a class that can perform `push()` (likely calling the AWS SDK).

In a later section, we will explain how the `Inflight` class is currently used to produce a JavaScript bundle during the app's synthesis.
This JavaScript bundle will inject the appropriate code for `$cap`, and it will be referenced in the final Terraform artifact.

We should note that in the future, it may be possible to "shift left" all of the bundling logic into the compiler. Then, a list of captures would only be needed for the first purpose (glueing together resources based on what actions are performed on the resources).

> 🧪 **Note:** Experimental designs starting here! 🧪

The list of captures should include ALL values, resources, and functions passed or referenced to the user's code.
For example, given this Wing code:

```wing
let queue = new cloud.Queue();
let bucket = new cloud.Bucket();
let file = "file.txt";
let add_and_store = (a: num, b: num): num ~> {
    let result = a + b;
    bucket.put(file, result.to_str());
    return result;
};
let do_stuff = (queue: cloud.Queue) ~> {
    let val = add_and_store(3, 5);
    queue.push(val);
};
```

... then the final user code may eventually look something like:

```ts
const bucket = new sdk.cloud.Bucket(this, "Bucket");
const queue = new sdk.cloud.Queue(this, "Queue");
let do_stuff = new sdk.core.Inflight({
  code: sdk.core.NodeJsCode.fromInline(/* omitted */)
  entrypoint: "$proc",
  captures: {
    queue: {
      resource: queue,
      methods: ["push"],
    },
    bucket: {
      resource: bucket,
      methods: ["put"],
    },
  },
});
```

Implicit here is that the `code` inserted by the compiler would include code for `add_and_store`, `do_stuff`, `queue`, `bucket`, and `file`. The only captures listed here are `queue` and `bucket` because those are the only captures that represent resources.

> 🧪 **Note:** End of experimental designs! 🧪

## Bundling

Currently, the SDK handles the process of bundling inflight user code with dependencies such as inflight resource clients and constants.
For simplicity, this discussion will focus on the example of a `cloud.Function` accepting an inflight handler.

The bundling process starts in the constructor of the class implementing the `cloud.Function` polycon -- for example, `tfaws.Function`.

The first step is that the function needs to obtain "clients" for all of the captured resources (modeled as `Record<string, Code>`).
To do this, it iterates over each entry in `captures`.
If the capture is a plain value or collection type, it just stringifies it.
If the capture is a resource, it inverts the control back to the captured resource by calling the resource's `_capture` method.

For example, if a `tfaws.Function` named `func` captures a `tfaws.Bucket` named `bucket`, it calls `bucket._capture(func, metadata)` where `metadata` is any extra information like the resource methods.
`_capture` will update `func`'s AWS IAM policy so that it can perform operations on the bucket, and it will return a `Code` object that contains a `BucketClient` class with methods like `get` and `put`.
After we repeat this process for all captures, we will have a map from capture names to `Code` objects.

The second step is to call esbuild.
Each `Inflight` has a `bundle` method that combines the user's code with the collection of "clients", in a template that looks something like:

```
const $cap = {
  <capture1>: <capture1-client>,
  <capture2>: <capture2-client>,
  ...
};
<user code with named entrypoint>
exports.handler = function(event) { entrypoint($cap, event) };
```

Today the SDK currently expects the user code to always have an object containing captures as its first argument, and an event as a second argument, but this may change in the future.

## Simulator

🚧 **TODO** 🚧
