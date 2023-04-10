---
title: Resources
id: resources
description: Resources are cloud services used by the application
keywords: [Wing Concepts, Wing Resources]
---

Resources represent cloud services that are part of the application. They expose
both a *preflight API* used to define their deployment configuration and an
*inflight API* used to interact with them at runtime. Resources are an extension
of the [Construct Programming Model] and as such any [AWS Constructs] can be
natively used in Wing applications.

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
resource SafeQueue extends cloud.Queue {
  init() {
    let dlq = new cloud.Queue();

    dlq.add_consumer(inflight (m: str) => {
      log.error("dead-letter: ${m}");
    });

    this.add_dead_letter_queue(dlq);
  }
}
```

[Construct Programming Model]: https://docs.aws.amazon.com/cdk/v2/guide/constructs.html
[AWS Constructs]: https://github.com/aws/constructs
