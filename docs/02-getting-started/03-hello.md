---
id: hello
title: Hello, Wing!
---

OK, we are ready for our first Wing program!

## Create your project directory

Let's create an empty directory for our project.

```sh
mkdir hello-wing
cd hello-wing
```

## Your application entrypoint

And a new file called `hello.w` with the following code. This file is the
entrypoint of your Wing application.

```ts
bring cloud;

let queue = new cloud.Queue();

inflight handler(message: str): str {
  print("Hello, ${message}!");
}

queue.onMessage(handler);
```

This code should be mostly self explanatory. We define a queue, and every time a
message is added to the queue, a handler is triggered and prints the text
`"Hello, ${message}!"`.

Now that we've written this program, let's compile and test it.

