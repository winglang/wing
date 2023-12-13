# User Story 16 - Wing for TypeScript

> **Status**: Draft

Anders loves TypeScript, but he also loves the amazing experience Wing offers for building cloud applications.

It's Andres' lucky day because Wing Cloud had just announced that very soon TypeScript developers are able to start leveraging Wing libraries from the comfort of
their favorite programming language.

He got an invite for a pre-release. The invite explains that initially, there is only support for `cloud.Bucket` and `cloud.Function` and for consuming [winglibs](https://github.com/winglang/winglibs).

The example looks like this:

First, install some libraries:

```sh
$ npm i winglang wingsdk @winglibs/cloud @winglibs/checks
```

```ts
// main.ts
import { inflight, App } from "wingsdk";
import * as cloud from "@winglibs/cloud";
import { Check } from "@winglibs/checks";

// Final App depends on platform used
const app = new App();

const data = "world";
const bucket = new cloud.Bucket(app, "Bucket");

const fn = new cloud.Function(app, "Function", inflight({ bucket, data }, async (ctx, event) => {
  await ctx.bucket.put("hello.txt", ctx.data);
});

bucket.grantPut(fn);

const check = new Check(app, "Check", inflight({ message, fn, bucket, data }, async (ctx, event) => {
  await fn.invoke();
  const actual = await bucket.get("hello.txt");

  console.log(`actual = ${actual}, expected = ${data}`);

  if (actual !== ctx.data) {
    throw new Error("check failed");
  }
}));

fn.grantInvoke(check);
bucket.grantGet(check);

app.synth();
```

Now, you can open the Wing Console:

```sh
$ wing run main.ts
```

And compile to AWS:

```sh
$ wing compile -t tf-aws main.ts
```

And enjoy life!
