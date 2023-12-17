# User Story 16 - Wing for TypeScript

> **Status**: Approved

[Anders](https://en.wikipedia.org/wiki/Anders_Hejlsberg) loves TypeScript, but he also loves the amazing experience Wing offers for building cloud applications.

It's Anders' lucky day because Wing Cloud had just announced that very soon TypeScript developers will be able to leverage any Wing library from the comforts of
their favorite programming language.

Anders just got an invite for a pre-release of Wing for TypeScript (code name "wing4ts"). The invite explains that in this pre-release, there is only support for `cloud.Bucket` and `cloud.Function` from the Wing Cloud Library and for consuming [winglibs](https://github.com/winglang/winglibs).

First, install the Wing CLI:

```sh
npm i winglang
```

Now, install the Wing for TypeScript library (temporary name):

```sh
npm i wing4ts
```

Now, install some winglibs:

```sh
$ npm i @winglibs/cloud @winglibs/checks
```

```ts
// main.ts
import { inflight, App } from "wing4ts";
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

const check = new Check(app, "Check", inflight({ fn, bucket, data }, async (ctx, event) => {
  await ctx.fn.invoke();
  const actual = await ctx.bucket.get("hello.txt");

  console.log(`actual = ${actual}, expected = ${ctx.data}`);

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

  pub onCreate(fn: IBucketEventHandler, opts?: BucketOnCreateOptions): void { return this.inner.onCreate(fn, opts); }
  pub onDelete(fn: IBucketEventHandler, opts?: BucketOnDeleteOptions): void { return this.inner.onDelete(fn, opts); }
  pub onUpdate(fn: IBucketEventHandler, opts?: BucketOnUpdateOptions): void { return this.inner.onUpdate(fn, opts); }
  pub onEvent(fn: IBucketEventHandler, opts?: BucketOnEventOptions): void   { return this.inner.onEvent(fn, opts); }

  pub inflight copy(srcKey: str, dstKey: str): void               { return this.inner.copy(srcKey, dstKey); }
  pub inflight delete(key: str, opts?: BucketDeleteOptions): void { return this.inner.delete(key, opts); }

  // ... you got the point

  pub grantPut(target: std.InflightHost): void { /* ??? */ }
  // ...
}
```
