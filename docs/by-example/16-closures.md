---
title: Closures
id: closures
slug: /closures
sidebar_label: Closures
description: Closures with Wing
keywords: [Wing language, variadic]
image: /img/wing-by-example.png
---

[Closures](https://en.wikipedia.org/wiki/Closure_(computer_programming)) are functions that captures variables from its surrounding lexical scope, allowing those variables to persist even after the function is executed outside its original context.


```js playground example title="main.w"
let createCounter = (): (): num => {
  let var count = 0; // This variable is part of the closure

  return () => {
    count = count + 1;
    return count;
  };
};

let counter = createCounter();

log(counter());
log(counter());
log(counter());
```

```bash title="Wing console output"
# Run locally with wing console
wing it

1
2
3
```