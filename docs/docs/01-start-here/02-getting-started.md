---
id: getting-started
title: Getting Started
keywords: [Getting started, Wing installation, installation, Wing toolchain]
slug: /
---

## Welcome

Welcome, it's great to see you here!

As you prepare to start taking flight with Wing 😉, there are a few things you need to do to get set up.
This guide will walk you through the steps to setup Wing on your machine, create your first project, run it in the Wing Simulator and deploy it to AWS.

:::info

Wing is still in active development, and we would love to hear what you think! Please ping us on [Wing Discord](https://t.winglang.io/discord), share what you want to build
and let us know if you encounter any issues. There's also a cute channel with music recommendations 🎶

:::

> Did you know that you can also take Wing for a spin without installing anything?
> Check out the [Wing Playground](https://www.winglang.io/play/).

## Prerequisite

* [Node.js](https://nodejs.org/en/) v20 or later

## Install

The Wing CLI is distributed via [npm](https://www.npmjs.com/package/winglang):

```sh
npm install -g winglang
```

Verify your installation:
```
wing -V
```

## IDE Extension

Wing has extended support for two IDEs. They provide syntax highlighting, completions, go-to-definition, etc. and embedded Wing Console support:

- [VSCode](https://marketplace.visualstudio.com/items?itemName=Monada.vscode-wing) - Official extension
- [IntelliJ](https://plugins.jetbrains.com/plugin/22353-wing) - Community extension

To use Wing in other IDEs, there are a few tools available to help:

- Language server - Running `wing lsp` serves the official language server
- [TextMate grammar](https://github.com/winglang/wing/blob/main/apps/vscode-wing/syntaxes/wing.tmLanguage.json) - For syntax highlighting
- [tree-sitter grammar and queries](https://github.com/winglang/wing/tree/main/libs/tree-sitter-wing) - For syntax highlighting and more
- [Syntax Highlighting for GitHub (Chrome extension)](https://chromewebstore.google.com/detail/winglang-syntax-hightligh/gjnleleianfjpmckmmdeahlklhcdlakj) - Adds syntax highlighting to various locations within GitHub

## Create your project

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

:::info

<details><summary>Experimental TypeScript Support</summary>

If you'd like to use TypeScript instead of winglang, you can add the `--language ts` flag when creating a new project:

```sh
wing new empty --language ts
```

Then modify `main.ts` to have the following, equivalent to the above winglang code:

```ts
import { main, cloud, lift } from "@wingcloud/framework";

main((root) => {
  const bucket = new cloud.Bucket(root, "Bucket");
  const counter = new cloud.Counter(root, "Counter");
  const queue = new cloud.Queue(root, "Queue");

  queue.setConsumer(
    lift({ bucket, counter }).inflight(async ({ bucket, counter }, message) => {
      const index = await counter.inc();
      await bucket.put(`wing-${index}.txt`, `Hello, ${message}`);
      console.log(`file wing-${index}.txt created`);
    })
  );
});
```

The rest of the starting guide will be the same!
See [here](../09-typescript/index.md) for more information on using TypeScript with Wing.
  
</details>

:::

Here we defined a queue and a counter. Every time a message is added to the queue, a handler is triggered and creates a file named `wing-{counter-index}.txt` with the content `"Hello, {message}!"`, and the counter is incremented by 1.

Now that we've written this program, let's run and test it using the **Wing Console**.
