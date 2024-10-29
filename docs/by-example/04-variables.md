---
title: Variables
id: Variables
slug: /Variables
sidebar_label: Variables
description: Using variables with Wing
keywords: [Wing language, example]
image: /img/wing-by-example.png
custom_edit_url: https://github.com/winglang/wing/blob/main/docs/by-example/04-variables.md
---

Variables are declared with the `let` keyword. The type of most variables can be inferred automatically, but you can also add an explicit type annotation if needed.

By default, Wing doesn't let you reassign to variables, unless you add the `var` modifier. See [this blog post](https://www.winglang.io/blog/2023/02/02/good-cognitive-friction) for more details.

```js title="main.w"

// var delcares a varaible. Wing infers the type
let a = "initial";
log(a);


// type can also be declared
let b: num = 1;
let c: num = 2;
log("{b}, {c}");

// variables cannot be changed using let without var
let d: str = "Hello";
// d = "Test"; // error: Variable is not reassignable

// makes variable reassignable
let var s = "hello";
s = "hello world"; // compiles
log(s);

```

```bash title="Wing console output"
# Run locally with wing console
wing it

initial
1, 2
hello world
```