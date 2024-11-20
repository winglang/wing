---
id: getting-started
title: Creating a project
keywords: [Getting started, Wing installation, installation, Wing toolchain]
slug: /
---

This guide will walk you through the following: 

- Creating your first project
- Running your project using the Wing Simulator
- Deploying your project to AWS

:::tip Don't have Wing installed? 
You can get Wing installed and your IDE setup following our [installation instructions](/install).
:::

First let's create an empty directory for your project:

```sh
mkdir hello-wing
cd hello-wing
```

You can use the CLI to bootstrap a new project: Use the `new` command and then modify `main.w` to have the following:

```sh
wing new empty
```

```js example
bring cloud;

// define a queue, a bucket and a counter
let bucket = new cloud.Bucket();
let counter = new cloud.Counter(initial: 1);
let queue = new cloud.Queue();

// When a message is received in the queue it should be consumed
// by the following closure
queue.setConsumer(inflight (message: str) => {
  // Increment the distributed counter, the index variable will 
  // store the value prior to the increment
  let index = counter.inc();
  // Once two messages are pushed to the queue, e.g. "Wing" and "Queue".
  // Two files will be created:
  // - wing-1.txt with "Hello Wing"
  // - wing-2.txt with "Hello Queue"
  bucket.put("wing-{index}.txt", "Hello, {message}");
  log("file wing-{index}.txt created");
});
```

Here we defined a queue and a counter. Every time a message is added to the queue, a handler is triggered and creates a file named `wing-{counter-index}.txt` with the content `"Hello, {message}!"`, and the counter is incremented by 1.

Now that we've written this program, let's run and test it using the **Wing Console**.
