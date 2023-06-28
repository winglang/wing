---
title: Primitives
id: primitives
keywords: [Wing example]
---


## Str
### Concat and Interpolate 
```ts playground
let s1 = "Hello Wing String";
log(s1); // prints Hello Wing String
let s2 = "Interpolate: ${s1}"; // string interpolation
log(s2); // prints Interpolate Hello Wing String
let s3 = "Concat: " + s1; // string concatenation 
log(s3); // prints Concat: Hello Wing String
```

### Kitchen Sink
```ts playground
let s = "Hello to a new Wing world";

let var rebuilt = "";
// lets start with split
for w in s.split(" ") {
  if w.startsWith("H") {
    rebuilt = "${rebuilt} ${w}"; // 'Hello' starts with H
  } 
  if w.length > 3 && w.lowercase() == w {
    rebuilt = "${rebuilt} ${w}"; // 'world' is lowercased with more then 3 chars
  }
  if w.contains("in") && w.endsWith("g") {
    rebuilt = "${rebuilt} ${w}"; // 'Wing' has in and end with g
  }
  if s.indexOf(w) == 6  {
    rebuilt = "${rebuilt} ${w}"; // 'to' position is 6
  }
  if s.at(9) == w {
    rebuilt = "${rebuilt} ${w}"; // 'a' is a single char
  }
  if s.substring(11,14) == w {
    rebuilt = "${rebuilt} ${w}"; // 'new' position is 11-14
  }
}
log(rebuilt); // prints "Hello to a new Wing world"
```

## Num

```ts playground
let n1 = 10;
log("${n1}"); // 10

let n2 = n1 - 10 / 10 + 1 * 10 ; // arithmetic
log("${n2}"); // 1

let n3 = n1 % 7; // modulo 
log("${n3}"); // 3

let n4 = n1 \ 7; // FloorDiv
log("${n4}"); // 1

let n5 = 2 ** n1; // power of 
log("${n5}"); // 1024

let n6 = (10 + 1) / (12 - 1) + (20 / 2) * 2 + 10 * 2**10 / 512 + 1; 
log("${n6}"); // The meaning of the universe
```


## Bool

```ts playground
let b1 = true;
let b2 = false;
let b3: bool? = false; 

if b1 && !b2 { 
  log("${b1},${b2}");
}

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
  true,false
  although b3 is false, the if statement here checks for existence of value
  b3 is false
**/
```