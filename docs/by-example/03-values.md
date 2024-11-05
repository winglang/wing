---
title: Primitive values
id: primitives
slug: /primitive-values
sidebar_label: Primitive values
description: Hello world wing example
keywords: [Wing language, example, primitives, values]
image: /img/wing-by-example.png
custom_edit_url: https://github.com/winglang/wing/blob/main/docs/by-example/03-values.md
---

Wing has primitive types including strings, integers, floats, booleans, etc. Here are a few basic examples.

- [Strings](#str), which can be added together with +
- [Integers and floats](#num)
- [Booleans](#bool), with boolean operators as you'd expect

```js playground title="main.w"
log("Hello " + "Wing"); // Hello Wing

log("1+1 =  {1+1}"); // 1+1 = 2
log("7.0/3.0 = {7.0/3.0}"); // 7.0/3.0 = 2.3333333333333335

log(true && true); // true
log(true || false); // true
log(!true); // false
```

## Str
### Concat and Interpolate 
```ts  example
let s1 = "Hello Wing String";
log(s1); // prints Hello Wing String
let s2 = "Interpolate: {s1}"; // string interpolation
log(s2); // prints Interpolate Hello Wing String
let s3 = "Concat: " + s1; // string concatenation 
log(s3); // prints Concat: Hello Wing String
```

### Str methods
```ts example
let s = "Hello to a new Wing world";

// lets start with split
for w in s.split(" ") {
  if w.startsWith("H") {
    log(w); // 'Hello' starts with H
  } 
  if w.length > 3 && w.lowercase() == w {
    log(w); // 'world' is lowercased with more then 3 chars
  }
  if w.contains("in") && w.endsWith("g") {
    log(w); // 'Wing' has in and end with g
  }
  if s.indexOf(w) == 6  {
    log(w); // 'to' position is 6
  }
  if s.at(9) == w {
    log(w); // 'a' is a single char
  }
  if s.substring(11,14) == w {
    log(w); // 'new' position is 11-14
  }
}
```

## Num

```ts example
let n1 = 10;
log("{n1}"); // 10

let n2 = n1 - 10 / 10 + 1 * 10 ; // arithmetic
log("{n2}"); // 1

let n3 = 10 % 7; // modulo 
log("{n3}"); // 3

let n4 = 10 \ 7; // FloorDiv
log("{n4}"); // 1

let n5 = 2 ** 10; // power of 
log("{n5}"); // 1024

let n6 = (10 + 1) / (12 - 1) + (20 / 2) * 2 + 10 * 2**10 / 512 + 1; 
log("{n6}"); // The meaning of the universe
```


## Bool

```ts example
let b1 = true;
let b2 = false;

if b1 && !b2 { 
  log("b1:{b1},b2:{b2}"); // prints b1:true, b2:false
}
```