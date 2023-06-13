---
title: Simulator
id: simulator
description: A facility for executing Wing applications on the local machine for development and testing
keywords: [Wing simulator, simulator]
---

The simulator is a set of APIs in the SDK that can be used to test Wing
applications without having to deploy the application to a cloud provider. The
simulator works with any Wing application made with the SDK's `cloud` APIs.

## Quick start guide

### Create a Wing simulator file

To use the simulator, you will need to provide a Wing simulator file -- this is
a file with a `.wsim` extension that is output when you compile your Wing program
with the `--target sim` option. Check out the [Wing Getting Started
Guide](/getting-started) for more information on how to write your
first Wing program.

## Using the simulator API (in Wing)

🚧 Coming soon! 🚧

## Using the simulator API (in TypeScript)

Now, let's try starting the simulator and creating some resource clients to
interact with the resources.

First, create an empty directory and add your `.wsim` file.
Next, run `npm install @winglang/sdk`.

Let's create a file in the directory named `main.ts`:

```typescript
import { testing } from '@winglang/sdk';

async function main() {
  const mySim = new testing.Simulator({ simfile: "hello.wsim" });
  await mySim.start();

  // (1)

  await mySim.stop();
}

void main();
```

Here, we create a new `Simulator` object, passing in the path to our simulator
file, and then start the simulator. Inside (1) we can invoke methods on the
simulator to get more information about the resources in our application. When
we are done, we call `sim.stop()` to stop the simulator and clean up all
resources (files, ports, etc.) that were created on your machine.

To print out a JSON tree view of the application, add the following line:

```typescript
console.log(JSON.stringify(sim.tree, null, 2));
```

The tree contains the IDs of all the resources in the application, as well as
details about dependencies between resources.

Now let's perform operations using a resource client. To obtain a resource's
client, get the resource's path (from the JSON tree or elsewhere) and query the
simulator with the `getResource` method. For example:

```typescript
import { cloud } from '@winglang/sdk';

const fn = mySim.getResource("root/my_function") as cloud.IFunctionClient;
const response = await fn.invoke("hello!");
console.log(response);
```

Finally, when you want to understand how Wing resources are working, you may
want to debug your application using traces and logs. Simulated resources
automatically generate traces that you can inspect by calling `listTraces()` on
your simulator instance.

```typescript
console.log(JSON.stringify(mySim.listTraces(), null, 2));
```

<!-- TODO: show how to use Node debugger with simulator? -->

Congratulations, you now know the ins and outs of using the Wing simulator! 🧑‍🎓

Check the API reference for more details about what methods are available on
different resources and their inflight clients.
