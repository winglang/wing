---
title: Using JavaScript
id: using-javascript
keywords: [Wing example]
---

Calling a Javascript function from Wing requires two steps. 

First, export the function from Javascript.

This examples exports `isValidUrl` from a file named`url_utils.js`:

```js
exports.isValidUrl = function(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
```

### Preflight function

To call this in preflight code, define the function as an `extern` in a class.

**Note:** Extern functions must be `static.` 

If you want to use the function outside of the class, be sure to declare it as `pub`.

```ts 
class JsExample {  
  // preflight static 
  pub extern "./url_utils.js" static isValidUrl(url: str): bool;
}

assert(JsExample.isValidUrl("http://www.google.com"));
assert(!JsExample.isValidUrl("X?Y"));
```

### Inflight

To call the function inflight, add the `inflight` modifier. 

```ts
class JsExample {  
  // inflight static method
  extern "./url_utils.js" static inflight  isValidUrl(url: str): bool;
}

test "main" {
  assert(JsExample.isValidUrl("http://www.google.com"));
  assert(!JsExample.isValidUrl("X?Y"));
}
```
