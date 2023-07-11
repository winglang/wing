---
title: Using JavaScript
id: using-javascript
keywords: [Wing example]
---

These examples require a separate file named `url_utils.js` with this code:

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

### Preflight static function
```ts 
class JsExample {  
  // preflight static 
  extern "./url_utils.js" static isValidUrl(url: str): bool;
}

assert(JsExample.isValidUrl("http://www.google.com"));
assert(!JsExample.isValidUrl("X?Y"));
```
### Preflight method
```ts 
class JsExample {  
  // preflight method
  extern "./url_utils.js" isValidUrl(url: str): bool;
}

let j = new JsExample();
assert(j.isValidUrl("http://www.google.com"));
assert(!j.isValidUrl("X?Y"));
```

### Inflight static
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
### Inflight method
```ts
class JsExample {  
  // inflight method
  extern "./url_utils.js" inflight isValidUrl(url: str): bool;
}

let j = new JsExample();
test "main" {
  assert(j.isValidUrl("http://www.google.com"));
  assert(!j.isValidUrl("X?Y"));
}
```
