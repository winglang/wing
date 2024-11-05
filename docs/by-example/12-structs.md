---
title: Structs
id: structs
slug: /structs
sidebar_label: Structs
description: Using arrays with Wing
keywords: [Wing language, example]
image: /img/wing-by-example.png
custom_edit_url: https://github.com/winglang/wing/blob/main/docs/by-example/12-structs.md
---

Structs are custom data types you can define to store structured information. They're loosely modeled after typed JSON literals in JavaScript.

```js playground example title="main.w"
// Define a simple structure called `Example`
struct Example {
  a: str;    
  b: num;    
  c: bool?;  
}

// Define another structure called `MyData` that includes composition
struct MyData {
  a: str;       
  b: num?;      
  c: Example;   
}

// Creating an instance of `MyData` with some fields initialized
let data = MyData {
  a: "hello",      
  c: {     
    a: "world",    
    b: 42,         
  }
};

log(data.a); // prints hello    
log(data.c.a); //prints world
log(data.c.b); //prints 42
```




## Struct expansion in function calls

```js playground example title="main.w"
struct Options {
  // optional
  prefix: str?;
  // required
  delim: str;
}

let join_str = (a: Array<str>, opts: Options):str => {
  let prefix = opts.prefix ?? "";
  return prefix + a.join(opts.delim);
};

// pass options directly
log(join_str(["hello", "world"], delim: ", ")); //  "hello, world"

// also OK to pass an object
let opts = Options { delim: "/" , prefix: "!!" };
log(join_str(["hello", "world"], opts)); // "!!hello/world");
```