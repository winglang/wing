---
title: Primitives
id: primitives
keywords: [Wing example]
---


## Str
### Concat and Interpolate 
```ts 
let s1 = "Hello Wing String";
log(s1); // prints Hello Wing String
let s2 = "Interpolate: {s1}"; // string interpolation
log(s2); // prints Interpolate Hello Wing String
let s3 = "Concat: " + s1; // string concatenation 
log(s3); // prints Concat: Hello Wing String
```

### Str methods
```ts 
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

```ts 
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

```ts 
let b1 = true;
let b2 = false;

if b1 && !b2 { 
  log("b1:{b1},b2:{b2}"); // prints b1:true, b2:false
}
```
