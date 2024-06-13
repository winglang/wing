---
title: Using JavaScript/TypeScript
id: using-javascript
keywords: [example, javascript, extern, typescript, js, ts]
---

## Creating inflight function from JavaScript/TypeScript file

Inflight closures are an extremely important Wing functionality. Consider the following simple wing program:

```wing example
// main.w
bring cloud;
let bucket = new cloud.Bucket();

bucket.onCreate(inflight (file) => {
  log(file);
});
```

Being able to write inflight wing alongside the preflight code is beautiful, but you may want to write the inflight function in a separate file and *language*. The `@inflight` intrinsic function can be used to create an inflight closure from a JavaScript/TypeScript:

```wing
// main.w
bring cloud;
let bucket = new cloud.Bucket();

bucket.onCreate(@inflight("./bucket_create.ts"));
//              ^ onCreate expects an `inflight (str): void` function, so the file must export a function with a typescript signature that matches
//                        ^ Relative (to current file) path to javascript or typescript file
//                          Note: This must be a static string
```

`wing compile` will generate `.bucket_create.inflight.ts` which will contain all of the information needed for TypeScript type checking and IDE support.
With that, you can create the `bucket_create.ts` file:

```ts
// bucket_create.ts
import inflight from "./.bucket_create.inflight";

export default inflight(async ({}, file) => {
//                                 ^ This is known to be a string, the first positional argument needed for `onCreate`
  console.log(file);
});
```

Something missing here is the ability to reference preflight resources inside an inflight function.
Let's create a Queue and pass it to the inflight function while exploring other options:

```wing
// main.w
bring cloud;
let bucket = new cloud.Bucket();
let queue = new cloud.Queue();

bucket.onCreate(@inflight("./bucket_create.ts",
  export: "default",
//        ^ Optional named export from the file, "default" is the default export
  lifts:[{ obj: queue, alias: "myQueue", ops: ["push"] }],
//       ^ object to lift, can be any preflight expression
//                     ^ Optional alias, by default, this will be the variable name passed to obj
//                                     ^ methods to lift, if not provided then all methods will be granted
));
``` 

```ts
// bucket_create.ts
import inflight from "./bucket_create.inflight";

export default inflight(async ({ myQueue }, file) => {
//                               ^ inflight interface to your preflight queue
  await myQueue.push(file);
});
```

## Using `extern` to expose JavaScript/TypeScript functions in preflight and inflight

When you want to use a JavaScript/TypeScript file anywhere in Wing, you can use the `extern` keyword to expose functions from that file.

1. Create a .js/.ts file that exports some functions

```js
// util.js

exports.isValidUrl = function (url) {
  return URL.canParse(url);
};
```

It may be CJS/ESM written in either JavaScript or TypeScript.

2. Use the `extern` keyword in a class to expose the function to Wing. Note that this must be `static`. It may also be `inflight`

```ts
class JsExample {
  pub extern "./util.js" static isValidUrl(url: str): bool;
}

assert(JsExample.isValidUrl("http://www.google.com"));
assert(!JsExample.isValidUrl("X?Y"));
```

### Type-safe `extern`

Running `wing compile` will generate a corresponding `.d.ts` file for each `extern`. This file can be imported into the extern file itself to ensure the extern is type-safe. Either your IDE or a separate usage of the TypeScript compiler can provide type-checking.

```ts
// util.ts
import type extern from "./util.extern";

export const isValidUrl: extern["isValidUrl"] = (url) => {
  // url is known to be a string and that we must return a boolean
  return URL.canParse(url);
};
```

The .d.ts file can also be used in JavaScript via JSDoc comments and can even be applied at a module export level.

```js
// util.js
/** @type {import("./util.extern").default} */
module.exports = {
  isValidUrl: (url) => {
    return URL.canParse(url);
  },
};
```

Coming Soon: The ability to use resources inside an `inflight extern`. See [this issue](https://github.com/winglang/wing/issues/76) for more information.
