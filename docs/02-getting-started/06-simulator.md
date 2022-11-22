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
install the Wing SDK library locally using `npm i @winglang/wingsdk`.

:::

## Starting Node.js

Start Node.js (with experimental `await` support):

```sh
node --experimental-repl-await
```

## Start the simulator

Now, we import the Wing SDK library:

```js
const sdk = require("@winglang/wingsdk");
```

Next, we create an instance of the `Simulator` class and point it to our
`app.wx` file, and start the simulator.

```js
const simulator = new sdk.testing.Simulator({ simfile : "./target/app.wx"});
await simulator.start();
```

Now that our app is running, we can start exploring.

## List all resources

For example, we can list all the resources in the app:

```js
simulator.listResources()
```

Should return something like:

```js
[ 'root/cloud.Queue', 'root/cloud.Queue/OnMessage-87636ee85d7e550d' ]
```

## Send a message to the queue

Or we can directly access a simulated resource by its path. For example,
let's find the queue resource:

```js
const queue = simulator.getResourceByPath("root/cloud.Queue");
```

And push a message to it:

```js
await queue.push("wingination");
```

## Viewing logs

As a result of this `push()` you should see the output of our handler
written to STDOUT:

```
> Hello, wingination!
```

## Viewing traces

You can also use the `listTraces()` method to list all the trace events that
occurred during execution:

```js
simulator.listTraces();
```

Output should look like this:

```js
[
  {
    type: 'resource',
    data: { message: 'wingsdk.cloud.Function created.' },
    sourcePath: 'root/cloud.Queue/OnMessage-87636ee85d7e550d',
    sourceType: 'wingsdk.cloud.Function',
    timestamp: '2022-11-20T22:35:43.681Z'
  },
  {
    type: 'resource',
    data: { message: 'wingsdk.cloud.Queue created.' },
    sourcePath: 'root/cloud.Queue',
    sourceType: 'wingsdk.cloud.Queue',
    timestamp: '2022-11-20T22:35:43.682Z'
  },
  {
    data: {
      message: 'Push (message=wingination).',
      status: 'success',
      result: undefined
    },
    type: 'resource',
    sourcePath: 'root/cloud.Queue',
    sourceType: 'wingsdk.cloud.Queue',
    timestamp: '2022-11-20T22:41:07.215Z'
  },
  {
    type: 'resource',
    data: {
      message: 'Sending messages (messages=["wingination"], subscriber=sim-0).'
    },
    sourcePath: 'root/cloud.Queue',
    sourceType: 'wingsdk.cloud.Queue',
    timestamp: '2022-11-20T22:41:07.301Z'
  },
  {
    data: {
      message: 'Invoke (payload="{"messages":["wingination"]}").',
      status: 'success',
      result: undefined
    },
    type: 'resource',
    sourcePath: 'root/cloud.Queue/OnMessage-87636ee85d7e550d',
    sourceType: 'wingsdk.cloud.Function',
    timestamp: '2022-11-20T22:41:07.304Z'
  }
]
```

## Congratulations! :rocket:

You've just tested your cloud application through the `Simulator` class


[Node.js REPL]: https://nodejs.org/api/repl.html