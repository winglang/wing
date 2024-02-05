---
title: Inflight Functions
id: inflights
---

The concepts of `preflight` and `inflight` in winglang are described [here](../02-concepts/01-preflight-and-inflight.md).
In TypeScript, this is analogous to the difference between the `main` function (`preflight`) and the `inflight` function.

### Functions and `inflight`

Some resources, like `cloud.Function`, run code in the cloud. This code is an `inflight`.

To create an `inflight` in TypeScript, you can use the `inflight` function and pass it an async closure:

```ts
import { main, cloud, inflight } from "@wingcloud/framework";

main((root) => {
  new cloud.Function(
    root,
    "MyFn",
    inflight(async () => {
      // This code runs in the deployed cloud function
      return "Wing!";
    })
  );
});
```

### `lift`ing `inflight`

`inflight`s do not run in the same environment as the rest of the code, so you can't just reference variables from the outside.
The `lift` function ensures you have an interface with the data you need. This includes `inflight`-specific APIs for some resources:

```ts
import { main, cloud, lift } from "@wingcloud/framework";

main((root) => {
  const bucket = new cloud.Bucket(root, "MyBucket");
  const plainData = "Wing!";

  new cloud.Function(
    root,
    "MyFn",
    lift({ bucket, plainData }).inflight(async ({ bucket, plainData }) => {
      await bucket.put("hello.txt", plainData);
      return plainData;
    })
  );
});
```

`inflight`s themselves can also be lifted. Once lifted, they can be called like normal function:

```ts
import { main, lift } from "@wingcloud/framework";

main((root) => {
  const myInflight = inflight(async () => {
    return "Wing!";
  });

  lift({ myInflight }).inflight(async ({ myInflight }) => {
    return myInflight();
  });
});
```

Regular functions and classes cannot be lifted.
Unlike other variable, imports can be referenced inflight as-is. The imports will be brought to the inflight's environment when bundled.

```ts
import { main, inflight } from "@wingcloud/framework";
import assert from "node:assert";

main((root) => {
  inflight(async () => {
    assert.equal(1, 1);
  });
});
```

### Permissions

When `lift` is used with resources, permissions are granted automatically to access them in the cloud.
By default, these permissions are permissive and allow all actions on the resource.
To restrict the permissions, use the `grant` method after `lift`ing:

```ts
import { main, cloud, lift } from "@wingcloud/framework";

main((root) => {
  const bucket = new cloud.Bucket(root, "MyBucket");

  cloud.Function(
    root,
    "MyFn",
    lift({ bucket })
      .grant({ bucket: ["get"] })
      .inflight(async ({ bucket }) => {
        await bucket.put("hello.txt", "Wing!");
        //           ^^^ Type error, no `put` permissions!
        return "Wing!";
      })
  );
});
```

### Testing

`wing test` runs all tests within your `main`. To define a test, use the `test` function provided as the second argument to `main`:

```ts
import { main, cloud, inflight, lift } from "@wingcloud/framework";
import assert from "node:assert";

main((root, test) => {
  const fn = cloud.Function(
    root,
    "MyFn",
    inflight(async () => {
      return "Wing!";
    })
  );

  test(
    // name of the test
    "MyFn returns 'Wing!'",
    // inflight function to run as the test
    lift({ fn }).inflight(async ({ fn }) => {
      assert.equal(await fn.invoke(), "Wing!");
    })
  );
});
```
