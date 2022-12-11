---
title: Testing programmatically
id: simulator
---

As mentioned above, it is also possible to interact with your Wing application
directly through the `Simulator` class which is shipped as part of the Wing SDK.
This means that, for example, you can interact with you simulated Wing
application directly from the Node.js CLI.

:::info Prerequisite

If you are using the Wing CLI through a global installation, you'll need to
install the Wing SDK library locally using:

```sh
npm i @winglang/wingsdk
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
const sdk = require("@winglang/wingsdk"); // import the wing sdk library
const simulator = new sdk.testing.Simulator({ simfile : "./target/hello.wsim"}); // create an instance of the Simulator
await simulator.start(); // start the simulator 
```

Now that our app is running, lets trigger a message on the queue

## Trigger a message to the queue

For example, we can list all the resources in the app:

```js
 const queue = simulator.getResource("root/cloud.Queue"); // retrieve the queue resource
 await queue.push("Wing")
```

## Viewing generated file

```js
const bucket = simulator.getResource("root/cloud.Bucket"); // retrieve the bucket resource
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
