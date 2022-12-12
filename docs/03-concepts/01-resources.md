---
title: Resources
id: resources
description: Resources are cloud services used by the application
---

Resources represent cloud services that are part of the application. They expose
both a *preflight API* used to define their deployment configuration and an
*inflight API* used to interact with them at runtime. Resources are an extension
of the [construct programming model] and as such any [CDK construct] can be
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

    dlq.on_message(inflight (m: str) => {
      log.error("dead-letter: ${m}");
    });

    this.add_dead_letter_queue(dlq);
  }
}
```
