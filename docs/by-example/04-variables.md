---
title: Variables
id: Variables
slug: /Variables
sidebar_label: Variables
description: Using variables with Wing
keywords: [Wing language, example]
image: /img/wing-by-example.png
---

Variables are declared with the `let` keyword. The type of most variables can be inferred automatically, but you can also add an explicit type annotation if needed.

By default, Wing doesn't let you reassign to variables, unless you add the `var` modifier. See [this blog post](https://www.winglang.io/blog/2023/02/02/good-cognitive-friction) for more details.

```js title="main.w"
// Inferred typing, wing infers the types
let a = "initial";
let a2: string = "initial"; // equivalent 
log(a); // prints initial

// types can also be declared
let b: num = 1;
let c: num = 2;
log("{b}, {c}"); // prints 1, 2

// Variable assignment
let d: str = "Hello";
d = "Test"; // error: Variable is not reassignable
let var s = "hello"; // use "var" to make variable reassignable
s = "hello world"; // OK (s is reassignable)

// Optionals
let var x1 = "Hello"; // type str, value "Hello"
let var x2: str = "Hello"; // same as above 
let var x3: str? = "Hello"; // type str? (optional), value "Hello"
let var x4: str? = nil; // type str? (optional), value nil
x1 = nil; // ERROR: Expected type to be "str", but got "nil" instead
x3 = nil; // OK (x3 is optional)

// Scoped variables
let s = "parent";
log(s); // prints parent
if true {
  let s = "inner";
  log(s); // prints inner
}
log(s); // prints parent

```