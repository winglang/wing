---
id: getting-started
title: Getting started
description: Wing is a cloud-oriented programming language. Most programming languages think about computers as individual machines. In Wing, the cloud is the computer.
image: https://assets.website-files.com/63720940a94e098b4e2a542b/637e2d5495f59f7654160773_Social%20thumbnail.png
slug: /
hide_title: true
---

# Welcome Wingnuts! :wave: 

:::caution This is Alpha

Wing is in its very early stages of development and not recommended for
production use. Many features are still missing, and APIs will dramatically
evolve in the coming months. We are excited for anyone to take part in
influencing the direction of every part of this project.

Our <a href="https://docs.winglang.io/status">Project Status</a> page includes
more information about stability and roadmap 👷‍♀️ 

:::

This handbook is your ultimate guide for learning about the Wing language. It is
organized like a book, so you can read it by going from top to bottom by
clicking "Next" at the bottom of each page. Alternatively, you can browse topics
through the left-hand navigation bar. You know, the regular structure...

You are invited to join the [Wing Community Slack]. We would love to get to know you!
Come say hi, hang out, geek out, help friends and share your experience ❤️

[Wing Community Slack]: https://t.winglang.io/slack

TL;DR: if you can't be bothered with all the philosophical blabber, feel free to
jump right in and [get started](./getting-started).

## What is a cloud-oriented language?

Wing is what we call a **cloud-oriented programming language**. It allows
developers to build distributed systems that fully leverage the power of the
cloud without having to worry about the underlying infrastructure.

Best explained through an example:


```js
bring cloud;

let queue = new cloud.Queue(timeout: 2m);
let bucket = new cloud.Bucket();
let counter = new cloud.Counter(initial: 100);

queue.setConsumer(inflight (body: str): str => {
  let next = counter.inc();
  let key = "myfile-${next}.txt";
  bucket.put(key, body);
});

```

In this simple application, every message that goes into the queue is written to
a new object inside a cloud bucket. An atomic counter is used to generate an
incrementing and unique key for each object.

***But don't let the simplicity of this example fool you!***

When compiling this code, the Wing compiler will produce a bundle of artifacts
that are ready to be deployed to a cloud provider. This bundle includes
[Terraform] files which define the infrastructure resources required for this
application and [JavaScript] code bundles that include the code executed on the
cloud.

When deployed to the cloud, this application can handle an infinite amount of
traffic, with no need for you to explicitly take care of scaling, load
balancing, security policies, or any other infrastructure-related concerns. For
example, when targeting AWS, Wing will use Amazon S3 for the bucket, Amazon SQS
for the queue, Amazon DynamoDB for the atomic counter, and AWS Lambda for the
handler. It will also render least privilege IAM security policies, wire up
environment variables and produce the code bundles needed for this to work.

Here's a diagram that shows the architecture produced by this code:

![Architecture diagram produced by Wing](./arch.png 'Architecture diagram')

In addition to targeting cloud providers, Wing applications can also be compiled
to run inside a local **Cloud Simulator**. This means that you can now iterate
on your code without having to deploy it to the cloud, write **unit tests** that
cover your complete cloud architecture and **debug** your code in a local
environment.

This is what we call **cloud-oriented programming**. It's a programming paradigm
which treats the cloud as a computer, and heavily relies on managed services and
distributed programming to build and deliver systems that are intrinsically
scalable, highly-available, and robust.

## Why you should consider Wing?

The cloud has evolved to become a ubiquitous platform for running almost every
type of application. It allows individuals and teams to deliver value by
leveraging services and infrastructure, which take care of many of the
challenges of building and running software.

However, the cloud has also introduced a new set of challenges for developers.
The cloud is a complex environment, and writing applications often requires
understanding low-level details of cloud services. It is also difficult to build
applications that are portable across cloud providers, and to test and debug
applications locally. Furthermore, leaky abstractions and poor tooling can make
it hard to refactor cloud architectures into reusable components.

Wing is designed to address these challenges in the following ways:

* **Iteration speed** - Wing applications can run in a local cloud simulator.
  This allows developers to iterate at a much faster pace, and to see the
  effects of incremental changes at milliseconds latency.
* **High-level cloud primitives** - Wing allows developers to leverage the cloud
  to its full extent through a set of rich, high-level and cloud-independent
  resources. This allows developers to build complete cloud applications without
  having to be infrastructure experts.
* **Distributed computing support** - the cloud is a big distributed system while traditional languages are designed to tell a single machine what to do. Wing introduces the concept of inflight functions which are code pieces that run later on remote machines while still able to capture and interact with data and resources defined elsewhere.
* **Cloud unit tests** - Wing allows developers to use the cloud simulator as a
  library inside unit tests, and to test complete architectures without
  requiring deployments or heavy mocking.
* **Infrastructure as policy** - infrastructure concerns such as deployment,
  networking, security, and observability can be applied horizontally through
  policies instead of inside the application code.



[Terraform]: https://www.terraform.io/
[JavaScript]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
