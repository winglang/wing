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

## Notes

The `@winglibs/cloud` library is a Wing library that looks like this:

```js
bring cloud;

pub struct BucketProps {
  public: bool?;
}

pub class Bucket {
  inner: cloud.Bucket;

  new(props: BucketProps?) {
    this.inner = new cloud.Bucket(props);
  }

  pub addFile(key: str, path: str, encoding?: str): void { return this.inner.addFile(key, path, encoding); }
  pub addObject(key: str, body: str): void               { return this.inner.addObject(key, body); }

  pub onCreate(fn: IBucketEventHandler, opts?: BucketOnCreateOptions): void { return this.onCreate(fn, opts); }
  pub onDelete(fn: IBucketEventHandler, opts?: BucketOnDeleteOptions): void { return this.onDelete(fn, opts); }
  pub onUpdate(fn: IBucketEventHandler, opts?: BucketOnUpdateOptions): void { return this.onUpdate(fn, opts); }
  pub onEvent(fn: IBucketEventHandler, opts?: BucketOnEventOptions): void   { return this.onEvent(fn, opts); }

  pub inflight copy(srcKey: str, dstKey: str): void               { return this.inner.copy(srcKey, dstKey); }
  pub inflight delete(key: str, opts?: BucketDeleteOptions): void { return this.inner.delete(key, opts); }

  // ... you got the point
}
```
