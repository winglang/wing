# Simulator

The simulator is a set of APIs in the SDK that can be used to test Wing
applications without having to deploy the application to a cloud provider. The
simulator works with any Wing application made with the SDK's `cloud` APIs.

## Quick start guide

### Create a Wing simulator file

To use the simulator, you will need to provide a Wing simulator file -- this is
a file with a `.wx` extension that is output when you compile your Wing program
with the `--target sim` option. Check out the [Wing Getting Started
Guide](../../../README.md) for more information on how to write your first Wing
program.

## Using the simulator API (in Wing)

🚧 Coming soon! 🚧

## Using the simulator API (in TypeScript)

Now, let's try starting the simulator and creating some resource clients to
interact with the resources.

First, create an empty directory and add your `app.wx` file. Next, run `npm install @monadahq/wingsdk`.

Let's create a file in the directory named `main.ts`:

```typescript
import { testing } from '@monadahq/wingsdk';

async function main() {
  const sim = new testing.Simulator("app.wx");
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

To print out a JSON tree view of the application, add the following line:

```typescript
console.log(JSON.stringify(sim.tree, null, 2));
```

The tree contains the IDs of all the resources in the application, as well as
details about dependencies between resources.

<!--
TODO: In the future we might design a more full simulator address scheme like:
sim://SIM-ID/RESOURCE-TYPE/RESOURCE-ID
-->

To perform operations on a resource, we need to create a resource client.

To create a resource client, we will need to obtain the resource's address, and
use it to initialize a function client. For this example we'll assume the app
has a function at the path `root/my_function`. Let's create a function client
for it:

```typescript
import { FunctionClient } from "@monadahq/wingsdk/sim";

const addr = sim.getAttributes("root/my_function").fnAddr;
const client = new FunctionClient(fnAddr);

const response = await client.invoke("hello!");
console.log(response);
```

<!--
NOTE: maybe we can simplify the API to something like

const client = sim.createClient("cloud.Function", "root/my_function") as FunctionClient;
// throws if resource named "root/my_function" is not a "cloud.Funciton"
-->

Congratulations, you've invoked a function using the simulator!

Using the `QueueClient` and `BucketClient` classes you can also interact with
queues and buckets as well. Check the API reference for more details about what
methods are available on different resource clients.
