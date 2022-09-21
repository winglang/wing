# Cloud Simulator Architecture

Let's say we have a wing program that looks like this:

`main.w`

```ts
bring cloud;

cloud.Bucket();
```

And we compile this wing program like this:

```sh
$ wing build main.w --target sim
```

Intermediate preflight javascript looks like this:

```js
const cloud = require('wingsdk');

class Root extends cloud.App {
  constructor() {
    super();

    new cloud.Bucket(this, "Bucket", {
      dummy: 123,
    });
  }
}

new Root({ synthesizer: 'sim' }).synth();
```

The output looks like this:

```
main.wx
 |
 +- simulator.json
 +- tree.json 
```

`simulator.json`:

```json
{
  "resources": {
    "/Root/Bucket": {
      "entrypoint": "npm://wingsdk@1.2.3/lib/local/bucket.sim.js",
    }
  }
}
```

`tree.json`:

```json
{
  "Root": {
    "type": "wingsdk.cloud.App",
    "children": {
      "Bucket": {
        "type": "wingsdk.cloud.Bucket",
        "properties": {
          "dummy": 1234
        }
      }
    }
  }
}
```

`bucket.sim.js`:

```js
const fs = require('fs');

export async function init(props) {
  const dummy = props.dummy;
  if (dummy !== 1234) {
    throw new Error("sorry, 'dummy' has to be 1234");
  }

  const tmpdir = mkdtemp();
  return {
    bucket_addr: tmpdir,
  };
}
```

Let's run the cloud simulator outside of Wing console:

```sh
$ wing-simulator ./main.wx
Extracting main.wx...
Reading simulator.json...
Provisioning /Root/Bucket...
Installing wingsdk@1.2.3
  | npm install wingsdk@1.2.3
Initializing /Root/Bucket...
  | const init = require("wingsdk/lib/local/bucket.sim.js").init;
  | const runtime_attributes = await init({ dummy: 1234 });
Reading tree.json...
Applying runtime attributes to tree.json...
Listening on http://localhost:3000
```

If we query the simulator endpoint we get the annotated tree:

```sh
$ curl http://localhost:3000/tree
{
  "Root": {
    "type": "wingsdk.cloud.App",
    "children": {
      "Bucket": {
        "type": "wingsdk.cloud.Bucket",
        "properties": {
          "dummy": 1234
        },
        "attributes": {
          "bucket_addr": "/tmp/foo-bar-baz-1232485-28dnnsjx"
        }
      }
    }
  }
} 
```

Now, let's say I want to interact with my local bucket. Let's write a little
node program (e.g a unit test):

```js
const { BucketClient } = require('wingsdk/lib/local/bucket.inflight');

// query the local simulator to find the address of the local bucket
const tree = await fetch('http://localhost:3000/tree').then(x => x.json());
const bucket_addr = tree.Root.Bucket.attributes.bucket_addr;

// create a client to interact with the local bucket
const client = new BucketClient(bucket_addr);
await client.put('foo', 'bar');
```

Under the hood, here's the implementation of `bucket.inflight`:

```js
export class BucketClient {
  constructor(bucket_addr) {
    this.bucket_addr = bucket_addr;
  }

  async put(key, value) {
    const filename = path.join(this.bucket_addr, key);
    await fs.promises.writeFile(filename, value);
  }
}
```

Now, we run the Wing Console:

```sh
$ /Applications/WingConsole/Contents/.../WingConsole ./main.wx
```

The Wing Console electron app starts up and behind the scenes executes the cloud
simulator pointing it to `main.wx` (same as we did above). The simulator
provisions the local bucket and initializes it. The simulator then starts up a
local http server with the `GET /tree` API.

The Wing Console electron app then queries the simulator for the tree and
displays it in the UI.

When the user wants to display the files contents of the local bucket, the
renderer process sends an IPC request to the main process. The main process then
instantiates a `BucketClient` (simular to the one we instantiated above), passes
it the `bucket_addr` (all hard coded!) and then calls `client.list()` to get the
list of files in the bucket.

Behind the scenes, the client basically performs an `fs.readdir()` on the
`bucket_addr` and returns the result.

## Assumptions/constraints

* Simulator SDK clients can assume that the calls they are making are local.
  They don't have to worry about working across multiple machines.
* Simulator SDK clients are not required to be browser-compatible (e.g. they can
  make filesystem calls, TCP requests, etc).
* As long as the simulator is running, multiple simulator SDK clients running in
  different processes can interact with the same resource.
* Once the simulator server finished initialization and endpoint is listening it
  means all local resources have been initialized and the runtime attributes are
  fixed.
* Implementing a simulator resource requires writing a single javascript file
  that exports an `init()` function. The `init()` function is called with the
  resource properties from the simulator provisioning manifest and returns a
  promise that resolves to the runtime attributes.
