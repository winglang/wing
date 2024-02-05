---
id: installation
title: Installation
keywords: [Wing installation, installation, Wing toolchain]
slug: /
---

In this section you will install Wing on your system and run your first wing application.

## Prerequisites

To install Wing, you will need the following setup:

* [Node.js](https://nodejs.org/en/) (>= 20)
* [VSCode](https://code.visualstudio.com/) (not required, but currently supported with an [extension](#wing-vscode-extension))

## Wing Toolchain

The Wing Toolchain is distributed via [npm](https://www.npmjs.com/):

```sh
npm install -g winglang
```

Verify your installation:
```
wing --version
```

To install the Wing VSCode extension, [download](https://marketplace.visualstudio.com/items?itemName=Monada.vscode-wing) it from the VSCode Marketplace. It is distributed via the VSCode Marketplace.


## Create your project

Let's create an empty directory for your project.

```sh
mkdir hello-wing
cd hello-wing
```
Add a new file called `main.w` with the following code. This file is the
entrypoint of your Wing application.

```js
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

This code should be mostly self explanatory. We define a queue and a counter, and every time a
message is added to the queue, a handler is triggered and creates a file named `wing-<counter-index>.txt` with `"Hello, {message}!"` content, and the counter is incremented by 1.

Now that we've written this program, let's run and test it using the **Wing Console**.
