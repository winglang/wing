---
title: Functions
id: functions-example
keywords: [Wing example]
---


### Preflight function
```ts playground
// preflight function - when declared in preflight context
let dup = (s: str, count: num): str => {
  // code
};
```

### Inflight functions
```ts playground

let handler = inflight (message: str): void => {
  // using the inflight modifier 
  let dup = inflight (s: str, count: num): str => {
    // code
  };
  // inflight modifier is not required when function is declared in inflight context
  let dup = (s: str, count: num): str => {
    // code
  };
};
```
### Struct Expansion
```ts playground
struct Options {
  prefix: str?;
  delim: str;
}

let join_str = (a: Array<str>, opts: Options):str => {
  let prefix = opts.prefix ?? "";
  return prefix + a.join(opts.delim);
};

log(join_str(["hello", "world"], delim: ", ")); //  "!hello.world"

log(join_str(["hello", "world"], prefix: "!!", delim: "/")); // "!!hello/world");
```
