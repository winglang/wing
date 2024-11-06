---
title: Optionality
id: optionality
slug: /optionality
sidebar_label: Optionality
description: Using while statements with Wing
keywords: [Wing language, example]
image: /img/wing-by-example.png
custom_edit_url: https://github.com/winglang/wing/blob/main/docs/by-example/08-optionality.md
---

Nullity is a primary source of bugs in software. Being able to guarantee that a value will never be null makes it easier to write safe code without constantly having to take nullity into account.

An optional value can be either "nil" or a non-nil value. The type of an optional variable is represented by adding a question mark (`?`) to its end.

```js playground title="main.w"
let monday: str = "doctor";
let tuesday: str? = nil;
// Set next to tuesday if there is a value otherwise use monday value
let next = tuesday ?? monday;

log(next); // doctor
```


## Testing existence  
```ts playground example
let s1: str? = "Hello"; // type str? (optional), value "Hello"
let s2: str? = nil; // type str? (optional), value nil

if s1 != nil {
  log("x1 is not nil");
}
if s2 == nil {
  log("x2 is nil");
}
```

## Using if let
```ts playground example
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

```ts playground example
let s1: str? = nil; // type str? (optional), value nil
let s2 = s1 ?? "default value";  // s2 is of type str
log(s2); // prints default value
```

## Optional Chaining 

```ts playground example
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

```ts playground example
let b3: bool? = false; 

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
  b3 is false
**/
```
