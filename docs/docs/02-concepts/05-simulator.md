---
title: Simulator
id: simulator
description: A facility for executing Wing applications on the local machine for development and testing
keywords: [Wing simulator, simulator]
---

The simulator is a built-in [platform provider](./03-platform-provider.md) that comes
provided in Wing for testing applications locally. The simulator does not
require you to deploy resources to any cloud providers. Since it's a simulation,
the simulator does not provide the same guarantees as running your application
on a cloud provider, but it can be useful for testing and debugging your
application.

There are two main ways to interact with the simulator:

* Running inflight [unit tests](/02-concepts/04-tests.md) with the `wing test` command.
* Interacting with the simulated application through the Wing Console

The simulator is also available as a set of APIs exported through the
`@winglang/sdk` npm package. A quick start guide for using the simulator APIs
is provided below.

> Note: The simulator APIs are currently experimental and are subject to
> breaking changes in the future.

## Using the low-level simulator APIs (experimental)

### Compile a Wing application for the simulator

To use the simulator, you will need a Wing program
that has beem compiled to the simulator (with `wing compile --platform sim <file>`).
Check out the [Wing Getting Started Guide](/docs) for more information on how to write your
first Wing program.

The output will typically be located in the `target` directory of your Wing project,
for example `target/my_app.wsim`.

### Start the simulator

Now, let's try starting the simulator and creating some resource clients to
interact with the resources.

First, run `npm install @winglang/sdk`.

Next, let's create a file in the directory named `main.ts`:

```typescript
import { testing } from '@winglang/sdk';

async function main() {
  const sim = new testing.Simulator({ simfile: "hello.wsim" });
  await sim.start();

  // (1)

  await sim.stop();
}

void main();
```

Here, we create a new `Simulator` object, passing in the path to our simulator
file, and then start the simulator. Inside (1) we can invoke methods on the
simulator to get more information about the resources in our application. When
we are done, we call `sim.stop()` to stop the simulator and clean up all
resources (files, ports, etc.) that were created on your machine.

The program can be invoked with `ts-node main.ts` (assuming you have
[ts-node](https://www.npmjs.com/package/ts-node) installed).

### Viewing the application tree

To print out a JSON tree view of the application, add the following line:

```typescript
console.log(JSON.stringify(sim.tree(), null, 2));
```

The tree contains the IDs of all the resources in the application, as well as
details about dependencies between resources.

### Interacting with the simulation

Now let's perform operations using a resource client. To obtain a resource's
client, get the resource's path (from the JSON tree or elsewhere) and query the
simulator with the `getResource` method. For example:

```typescript
import { cloud } from '@winglang/sdk';

const fn = sim.getResource("root/Default/cloud.Function") as cloud.IFunctionClient;
const response = await fn.invoke("hello!");
console.log(response);
```

### Debugging

Finally, when you want to understand how Wing resources are working, you may
want to debug your application using traces and logs. Simulated resources
automatically generate traces that you can inspect by calling `listTraces()` on
your simulator instance.

```typescript
console.log(JSON.stringify(sim.listTraces(), null, 2));
```
