---
id: inflights
title: Preflight and Inflight 
description: Wing two execution phases preflight and inflight
keywords: [Inflights, Inflight functions, Preflight, Preflight code]
---

## Preflight

MISSING

## Inflight 

Inflights (or "inflight functions") are Wing's distributed computing primitive.
They are isolated code blocks which can be packaged and executed on compute
platforms in the cloud (such as containers, CI/CD pipelines or FaaS).

Inflights can seamlessly interact with resources through the resource's inflight
API.

The following example shows an inflight which puts an object inside a bucket,
hosted in a cloud function:

```js
bring cloud;

let bucket = new cloud.Bucket();

new cloud.Function(inflight (_: str): str => {
  bucket.put("hello.txt", "world");
});
```

But before we explain what inflight functions are (we also call them
"inflights"), let's take a step back and talk about what are cloud applications
anyway?

A cloud application is software that deeply leverages **cloud resources** in
order to perform its duties. A cloud resource is *any network-accessible
service*. These resources can be used to store data or files (like buckets),
process HTTP requests (like API gateways), distribute content (like CDNs),
publish notifications to mobile phones or run user-defined code (such as Lambda
functions or Kubernetes deployments). Cloud providers such as AWS, GCP and Azure
offer a basic set of resources (similar to how an operating system offers a
basic set of resources to applications running on the machine), but that doesn't
imply that those are the only resources an application might use.

These managed services offer not only functional capabilities to applications,
but also many non-functional benefits such as high availability, elastic
scalability and reliability. By relying on cloud resources, developers are able
to innovate faster and focus on the direct value that their applications create
for users.

Wing is designed around this new programming paradigm, which we call
**cloud-oriented programming**.



### Diving deeper into inflight functions

> Taken from [Inflight Magazine](https://docs.winglang.io/blog/2022/12/28/magazine-001#diving-deeper-into-inflight-functions)

[Inflight functions](https://docs.winglang.io/concepts/inflights) are likely Wing's most significant
language innovation. Since cloud applications are distributed systems and code is executed on
multiple machines across various compute platforms, our language needs first-class support for this
idea: code that executes in the cloud and interacts with managed services around it. This is where
inflight functions come into play.

Asynchronous and concurrent programming have been a continuous source for programming language
innovation and research. Since the early days of
[`fork()`](https://man7.org/linux/man-pages/man2/fork.2.html) in POSIX, multi-threaded programming,
[Goroutines](https://gobyexample.com/goroutines), [Erlang
Processes](https://www.erlang.org/doc/reference_manual/processes.html) and the recently popularized,
cooperative concurrency with `async/await`, developers have been looking for ways to write
applications that included more than a single thread of execution in a safe and intuitive manner.

Wing's inflight functions can be thought of as a type of asynchronous function that can be
**packaged and executed on a remote system**, such as inside a [Kubernetes
Pod](https://kubernetes.io/docs/concepts/workloads/pods/), [AWS
Lambda](https://aws.amazon.com/lambda/), [Azure
Functions](https://azure.microsoft.com/en-us/products/functions/), on [Cloudflare Edge
Workers](https://workers.cloudflare.com/) or on any other cloud compute platform.

While inflights are typically compiled into machine code (like JavaScript), Wing may also be able to
compile them into state machines, orchestrated workflows, and other formats in the future

Our canonic example is a function that wants to put an object inside a bucket:

```js
bring cloud;

let myBucket = new cloud.Bucket();

new cloud.Function(inflight () => {
  myBucket.put("hello", "world");
});
```

The magic happens when the inflight function is referencing `myBucket`. The `cloud.Bucket` which is
defined (with `new`) outside the function closure is a preflight object which represents a **cloud infrastructure resource**,
not an in-memory object. When the function code interacts with this bucket (calls
`myBucket.put()`), it represents an interaction across machine boundaries. The code is executed
inside some compute service such as AWS Lambda, and the bucket is backed by something like Amazon
S3. The compiler has to do quite a lot in order to make this a reality on the cloud: it needs to
wire up the bucket information during deployment, add the right permissions to the Lambda's IAM
policy, and create a code bundle with just the right set of dependencies.

Inflight functions can interact with preflight objects through their *inflight interface*. This is not very
different from e.g. `async` functions in JavaScript, where it doesn't really make sense to `await`
an async function from synchronous contexts. It is also not very different from how
[Goroutines](https://gobyexample.com/goroutines) can only interact with the world through
[Channels](https://gobyexample.com/channels), or child processes can interact through pipes. 

Inflight functions are an *isolation boundary* enforced by the compiler. This means that there are
certain limitations on what can be accessed from an inflight scope. Specifically, you can only
access *immutable data* and interact with *preflight object* through their inflight API (like the
example above demonstrates). If you try to call `myBucket.put()` outside of an `inflight` context
the Wing compiler will emit this error: 

```
Cannot call inflight function "myBucket.put" while in preflight phase
```

Many folks are asking us [why is Wing a language and not a
library](https://news.ycombinator.com/item?id=34051472). Inflight functions and preflight objects are a
great example. We believe it is impossible to ensure this level of isolation and interaction
semantics in existing languages through a library, or even through a compiler extension. We've seen
some worthy efforts in projects like [Pulumi's Function
Serialization](https://www.pulumi.com/docs/intro/concepts/function-serialization/),
[Punchcard](https://github.com/sam-goodwin/punchcard) and [Functionless](https://github.com/functionless/functionless),
and in all of these cases, there are either compromises in safety (e.g. it is possible to capture
mutable objects) or in the programming model (e.g. type system is too complex).

We believe inflight functions are a fundamental building block of cloud-oriented programming, and we
are on a journey to get them right. From a syntactic perspective, we recently decided to [remove the
short hand `~>`](https://github.com/winglang/wing/pull/866) for representing inflight closures, and
instead use a simple `inflight` modifier. We've been debating this for a while, and a
[comment](https://winglang.slack.com/archives/C047QFSUL5R/p1670050350350909?thread_ts=1670030202.531749&cid=C047QFSUL5R)
from a Wingnut, Adam Ruka, tilted the scale in favor of the less quirky syntax. Don't be surprised,
though, if `~>` will come back, in addition to the inflight keyword, at some point when things mature.

So now, defining inflight functions in Wing is very similar to defining `async` functions, only that
instead of the `async` modifier, you can use the `inflight` modifier. Here's an inflight function
closure:

```js
let handler = inflight (e: str): str => {
  // on air (apologies, the puns are unavoidable, really)
};
```

## Preflight Classes

MISSING

Resources are cloud services that are part of the application. Wing uses preflight classes to
represent these resources and expose both a *preflight API* used to define their deployment
configuration and an *inflight API* used to interact with them at runtime. Resources are an
extension of the [Construct Programming Model] and as such any [AWS Constructs] can be natively used
in Wing applications.

The following code defines a bucket resource:

```js
new cloud.Bucket();
```

:::caution Conceptual Example
The following code block is meant to serve as an example of what is possible 
based on the wing language specifications. Additional feature implementations
will need to be completed to make the example possible.
:::

The following code declares a new resource called `SafeQueue` which contains
a queue with a dead-letter-queue associated with it:

```js
class SafeQueue extends cloud.Queue {
  init() {
    let dlq = new cloud.Queue();

    dlq.addConsumer(inflight (m: str) => {
      log.error("dead-letter: ${m}");
    });

    this.addDeadLetterQueue(dlq);
  }
}
```

## Identifiers

Resources are identified by a unique name.
The name is used to identify the resource in the Wing Console, and is typically used for determining the logical name of the resource in the target provisioning engine (such as Terraform or CloudFormation), and the physical name of the resource in the target cloud provider (such as AWS, Azure, or GCP).

The default name of a resource is the name of the class. The name can be overridden using the `as` syntax:

```js
let bucket1 = new cloud.Bucket(); // default name is "cloud.Bucket"
let bucket2 = new cloud.Bucket() as "my-bucket";
```

The name of a resource needs to be unique within the scope it is defined.
New classes introduce new scopes, so the same name can be used for different resources in different classes.

```js
class Group1 {
  init() {
    new cloud.Bucket() as "Store";
  }
}

class Group2 {
  init() {
    new cloud.Bucket() as "Store";
  }
}

// The following is valid
new Group1();
new Group2();
```

[Construct Programming Model]: https://docs.aws.amazon.com/cdk/v2/guide/constructs.html
[AWS Constructs]: https://github.com/aws/constructs

## Inflight Classes

MISSING

