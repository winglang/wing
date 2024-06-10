---
title: Functions
id: functions-example
keywords: [Wing example]
---


### Preflight function

```ts playground example
// preflight function - when declared in preflight context
let dup = (s: str, count: num): str => {
  // code
};
```

### Inflight functions

Inflight functions are Wing's distributed computing primitive. They are isolated code blocks which can be packaged and executed on compute platforms in the cloud (such as containers, Lambda/Cloud Function, etc..).

```ts playground example

let handler = inflight (message: str): void => {
  // using the inflight modifier 
  let dup = inflight (s: str, count: num): str => {
    // code
  };
  // inflight modifier is not required when function is declared in inflight context
  let sup = (s: str, count: num): str => {
    // code
  };
};
```
### Struct Expansion
```ts playground example
struct Options {
  prefix: str?;
  delim: str;
}

let join_str = (a: Array<str>, opts: Options):str => {
  let prefix = opts.prefix ?? "";
  return prefix + a.join(opts.delim);
};

log(join_str(["hello", "world"], delim: ", ")); //  "!hello.world"

// also OK to pass an object
let opts = Options { delim: "/" , prefix: "!!" };
log(join_str(["hello", "world"], opts)); // "!!hello/world");
```
