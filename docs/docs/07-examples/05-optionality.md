---
title: Optionality
id: optionality
keywords: [Wing example]
---

## Definition 

```ts playground
let s1: str? = "Hello"; // type str? (optional), value "Hello"
let s2: str? = nil; // type str? (optional), value nil
```

## Testing existence  
```ts playground
let s1: str? = "Hello"; // type str? (optional), value "Hello"
let s2: str? = nil; // type str? (optional), value nil

if s1? {
  log("x1 is not nil");
}
if !s2? {
  log("x2 is nil");
}
```

## Using if let
```ts playground
let s1: str? = "Hello"; // type str? (optional), value "Hello"

// unwrap optional s1 and create s from type str
if let s = s1 {
  log("s is not optional, value {s}");
} else {
  log("s1 was nil, s doesn't exists in this scope");
}

// same as above but shadowing s1 variable
if let s1 = s1 {
  log("s1 type is str, value {s1}");
} else {
  log("s1 was nil");
}
log("s1 type is optional str");
```

## Using ?? 

```ts playground
let s1: str? = nil; // type str? (optional), value nil
let s2 = s1 ?? "default value";  // s2 is of type str
log(s2); // prints default value
```

## Optional Chaining 

```ts playground
let j  = Json {
  working: {
    a: {
      b: "value"
    }
  },
  broken: {}
};

if let value = j.tryGet("working")?.tryGet("a")?.tryGet("b")?.tryAsStr() {
  log("value is {value}");
} 

if let value = j.tryGet("broken")?.tryGet("a")?.tryGet("b")?.tryAsStr() {
  // not reachable 
} else {
  log("value was not found");
}
```

## Optional bool

```ts playground
let b3: bool? = false; 

if b3? {
  log("although b3 is false, the if statement here checks for existence of value");
}

if let b3 = b3  { // unboxing b3 and shadowing original b3 
  if b3 {
    log("b3 is true");
  } else {
    log("b3 is false");
  }
} else {
  log("b3 is nil");
}

/**
 * prints:
  although b3 is false, the if statement here checks for existence of value
  b3 is false
**/
```