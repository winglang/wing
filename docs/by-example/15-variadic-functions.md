---
title: Variadic Functions
id: variadic-functions
slug: /variadic-functions
sidebar_label: Variadic Functions
description: Using variadic functions with Wing
keywords: [Wing language, variadic]
image: /img/wing-by-example.png
---


Variadic functions can be called with any number of trailing arguments.

```js playground example title="main.w"
// Function that will take an arbitrary number of numbers as arguments.
let plus = (...numbers: Array<num>) => {
  let var value = 0;

  for number in numbers {
    value = value + number;
  }

  return value;
};

// in this example you can pass any many numbers as you want
log(plus(1, 2));
log(plus(1, 2, 3));
log(plus(1, 2, 3, 4));
```

```bash title="Wing console output"
# Run locally with wing console
wing it

3
6
10
```