---
id: hello
title: Hello, Wing!
keywords: [Hello World, first Wing program, Wing example]
---

OK, we are ready for our first Wing program!

## Create your project directory

Let's create an empty directory for your project.

```sh
mkdir hello-wing
cd hello-wing
```

## The entrypoint file

Add a new file called `main.w` with the following code. This file is the
entrypoint of your Wing application.

```js
bring cloud;

let bucket = new cloud.Bucket();
let counter = new cloud.Counter(initial: 1);
let queue = new cloud.Queue();

queue.setConsumer(inflight (message: str) => {
  let index = counter.inc();
  bucket.put("wing-{index}.txt", "Hello, {message}");
  log("file wing-{index}.txt created");
});
```

This code should be mostly self explanatory. We define a queue and a counter, and every time a
message is added to the queue, a handler is triggered and creates a file named `wing-<counter-index>.txt` with `"Hello, {message}!"` content, and the counter is incremented by 1.

Now that we've written this program, let's run and test it using the **Wing Console**.
