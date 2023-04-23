---
title: Testing programmatically
id: simulator
keywords: [Wing testing programmatically, Wing simulator]
---

## The Simulator target (`sim`)

In addition to cloud services as backends, the Wing SDK is shipped with built-in
support for a **simulator backend** for each resource. The simulator provides a
fully-functional implementation for the cloud resources you use in your
application.

For example, the simulated implementation of `cloud.Queue` is simply an
in-memory array of items.

## Compiling your program

So now, we return to the root of the project and compile our app and target the cloud simulator using the following command:

```sh
cd ../../../../
wing compile -t sim hello.w
```

## Compilation output

This would create a new file at `target/hello.wsim` which is the simulated
version of your entire cloud application.

Now that we have an `hello.wsim` file, we can either interact with through the Wing
Console or load it into a `Simulator` class which is shipped as part of the Wing SDK and use it programmatically.

This means that, for example, you can interact with your simulated Wing
application directly from the Node.js CLI.

:::info Prerequisite

If you are using the Wing CLI through a global installation, you'll need to
install the Wing SDK library locally using:

```sh
npm i @winglang/sdk
```

:::

## Starting Node.js

Start Node.js (with experimental `await` support):

```sh
node --experimental-repl-await
```

## Start the simulator

Now, we import the Wing SDK library:

```js
const sdk = require("@winglang/sdk"); // import the wing sdk library
const simulator = new sdk.testing.Simulator({ simfile : "./target/hello.wsim"}); // create an instance of the Simulator
await simulator.start(); // start the simulator 
```

Now that our app is running, lets trigger a message on the queue

## Trigger a message to the queue

For example, we can list all the resources in the app:

```js
 const queue = simulator.getResource("root/Default/cloud.Queue"); // retrieve the queue resource
 await queue.push("Wing")
```

## Viewing generated file

```js
const bucket = simulator.getResource("root/Default/cloud.Bucket"); // retrieve the bucket resource
await bucket.list() // will show available files
await bucket.get("wing.txt") // will show the file content
```

The result of the last two function calls will be

```
[ 'wing.txt' ]
'Hello, Wing'
```


## Congratulations! :rocket:

You've just tested your cloud application through the `Simulator` class


[Node.js REPL]: https://nodejs.org/api/repl.html
