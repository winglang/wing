---
title: Resources
id: resources
description: Resources are cloud services used by the application
keywords: [Wing Concepts, Wing Resources]
---

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
