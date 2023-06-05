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

## Your application entrypoint

Add a new file called `hello.w` with the following code. This file is the
entrypoint of your Wing application.

```ts
bring cloud;

let bucket = new cloud.Bucket();
let queue = new cloud.Queue();

queue.addConsumer(inflight (message: str) => {
  bucket.put("wing.txt", "Hello, ${message}");
});
```

This code should be mostly self explanatory. We define a queue, and every time a
message is added to the queue, a handler is triggered and creates a file named `wing.txt` with `"Hello, ${message}!"` content .

Now that we've written this program, let's run and test it using the Wing Console.

