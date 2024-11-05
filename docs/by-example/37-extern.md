---
title: Externs
id: extern
slug: /extern
sidebar_label: Using JavaScript with Wing
description: Type reflection
keywords: [Wing language, Type reflection]
image: /img/wing-by-example.png
custom_edit_url: https://github.com/winglang/wing/blob/main/docs/by-example/36-reflection.md
---

Externs let you use JavaScript/TypeScript files within Wing. You can expose these functions and call them in Wing.

Using externs give you the ability to use the JavaScript eco-system directly in Wing.

:::tip Creating custom libraries 
Want to create your own library? You can use externs to help. Externs give you the ability to pull in code from NPM directly into your custom Wing libraries. You can see some [examples on GitHub](https://github.com/winglang/winglibs).
:::

## Exposing JavaScript functions in preflight and inflight

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
