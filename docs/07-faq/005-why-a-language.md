---
title: Why is Wing a language, not just another library or framework? 🤔
sidebar_label: Why is Wing a language? 🤔
id: why-a-language
keywords: [faq, why language, library, winglang, Wing programming language, Wing language]
---

## New language for a new programming model

Cloud applications are fundamentally different from applications that run on a single machine - they are distributed systems that rely on cloud infrastructure to achieve their goals.

To express both infrastructure and application logic in a safe and unified programming model (aka "*cloud-oriented*"), Winglang has two execution phases: Preflight for infrastructure definitions and inflight for runtime code.

Preflight code is executed during compilation and produces the infrastructure configuration for your app (e.g. Terraform, CloudFormation, etc). Inflight code is compiled to JavaScript and executed within cloud compute platforms in Node.js environments.

Let's look at a simple example:

```ts
bring cloud;

let queue = new cloud.Queue();
let counter = new cloud.Counter();
let bucket = new cloud.Bucket();

queue.addConsumer(inflight (message: str) => {
  let i = counter.inc();
  bucket.put("file-${i}.txt", message);
});
```

`cloud.Queue`, `cloud.Counter`, and `cloud.Bucket` are *preflight objects*. They represent cloud infrastructure resources. When compiled to a specific cloud provider, such as AWS, a Terraform file will be produced with the provider's implementation of these resources. The `queue.addConsumer()` method is a *preflight method* that configures the infrastructure to invoke a particular *inflight function* for each message in the queue.

**Now comes the cool part**: the code that runs inside the inflight function interacts with the `counter` and the `bucket` objects through their *inflight methods* (`counter.inc()` and `bucket.put()`). These methods can only be called from inflight scopes.

## Very cool, but what here cannot be done by a library or compiler extension?

In existing languages, where there is no way to distinguish between multiple execution phases, it is impossible to naturally represent this idea that an object has methods that can only be executed from within a specific execution phase.

In addition, other parts of Wing's *cloud-oriented* cannot be represented naturally without native support from the language. We've seen some worthy efforts in projects like [Pulumi's Function Serialization](https://www.pulumi.com/docs/intro/concepts/function-serialization/) and [Functionless](https://functionless.org/). But although these efforts come close, they either have to make compromises in safety (e.g. it is possible to capture mutable objects) or in the programming model (e.g. type system is too complex).

We believe that Wing, a language that natively supports this paradigm, will make using it much easier by streamlining common patterns, in a way that is impossible to accomplish with existing ones. Kind of like what C++ did for object orientation. You could write object-oriented code in C, but you had to work hard to make it work without native support from the language.

## So how does writing code in Wing compare to other solutions?

By natively supporting the cloud-oriented programming paradigm, Wing allows developers to write very few lines of code and let the compiler take care of IAM policies and other cloud mechanics.

Below we've written the same simple demo app in Wing and other solutions. This simple app uses a Function to upload a text file to a Bucket, even without the `Counter` seen above that further complicates matters in other solutions:

import CodeComparison from '../src/components/CodeComparison';

<CodeComparison 
  exampleName="function-upload-to-bucket"
  desiredPlatformLabels="['Pulumi', 'Terraform', 'AWSCDK', 'CDKTF', 'CFN']"
/>
<br/>

**The below table contains the main differences that you can see in the code examples:**

| Feature                    | Wing                  | Pulumi                  | Terraform              | AWS CDK                |
|----------------------------|-----------------------|-------------------------|------------------------|------------------------|
| Language                   | Wing                  | YAML + your choice      | HCL + your choice      | Your choice            |
| Line of code               | 7                     | 98                      | 122                    | 72                     |
| Cloud Mechanics (IAM, Networking) | Generated automatically from intent | Manual              | Manual                 | Manual                 |

**This table contains some more differences that cannot fit in a small code sample :)**

| Feature                      | Wing                                          | Pulumi                                  | Terraform                              | AWS CDK                                |
|------------------------------|-----------------------------------------------|-----------------------------------------|----------------------------------------|----------------------------------------|
| Extensibility                | Custom resources                              | Custom/dynamic providers                | Custom modules                         | Custom Constructs / Resource Providers |
| Customizing lower levels     | Compiler plugins to customize generated Terraform | Direct access to cloud-provider APIs | No need since working at low level     | Escape hatches to modify underlying CloudFormation |
| Local simulation             | Built-in functional local simulator with instant hot reloading | No | No | No |
| Cross-cloud support          | Same code compiles to different clouds (for supported resources)      | No (need to write different code for different clouds) | No (need to write different code for different clouds) | No (need to write different code for different clouds) |
| Provisioning engine          | Terraform / CloudFormation through AWS-CDK (Extensible solution that supports adding more engines) | Proprietary | Terraform | CloudFormation (CDKTF is used for Terraform, but you cannot compile the same code to different engines) |
| Testing                      | Same tests run on local simulator and cloud, without mocks | Need mocks for local testing | Need mocks for local testing | Need mocks for local testing |

## Anything else?
Creating a new language that is tailored to the cloud from the ground up also allows us to assemble a variety of features (some of which exist in other languages, of course) that, when put together, offer a delightful cloud development experience. You can read more about what these features are [here](https://docs.winglang.io/faq/good-fit).









