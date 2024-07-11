---
title: Structs
id: structs
keywords: [Wing example]
---

## Deceleration and Initialization

### Required fields
```ts playground example
struct Example {
  a: str;
  b: num;
  c: bool;
}

let example = Example { a: "a", b: 0, c: false };
log(example.a); // prints "a"
```

### Optional fields
```ts playground example
struct Example {
  a: str?;
  b: num?;
  c: bool?;
}

let example = Example { };
if example.a == nil {
  log("a is nil"); 
}
```

### Composition
```ts playground example
struct Another {
  hello: str;
}

struct MyData {
  a: str;
  b: num?;
  c: Another;
}

let data = MyData {
  a: "hello",
  c: Another {
    hello: "two"
  }
};

log(data.a); // prints hello  
log(data.c.hello); // prints two
```


## Struct expansion in function calls
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
let opts = Options { delim: "," };
log(join_str(["hello", "world"], opts)); // "!!hello/world");
```
