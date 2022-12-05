---
id: inflights
title: Inflights
description: Inflight functions are code blocks that are executed on the cloud
---

Inflights (or "inflight functions") are Wing's distributed computing primitive.
They are isolated code blocks which can be packaged and executed on compute
platforms in the cloud (such as containers, CI/CD pipelines or FaaS).

Inflights can seamlessly interact with resources through the resource's inflight
API.

The following example shows how `my_inflight` is hosted inside a cloud function
and puts an object inside a bucket:

```js
bring cloud;
let bucket = new cloud.Bucket();

new cloud.Function((_: str): str ~> {
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


