---
title: Arrays
id: arrays
slug: /arrays
sidebar_label: Arrays
description: Using arrays with Wing
keywords: [Wing language, example]
image: /img/wing-by-example.png
custom_edit_url: https://github.com/winglang/wing/blob/main/docs/by-example/09-arrays.md
---

Arrays are dynamically sized in Wing and are created with the [] syntax.
Individual array items can be accessed using index operation, `array[index]`, or with the `.at(index: num)` method.
Arrays are similar to dynamically sized arrays or vectors in other languages.

```js playground example title="main.w"
let a = MutArray<num>[1, 2, 3];

log("{a[0]}, {a[1]}, {a[2]}");

a[2] = 4;

log("mutated value: {a[2]}");
log("len: {a.length}");

let data = MutArray<num>[1, 2, 3];
let twoD = MutArray<MutArray<num>>[data];

for array in twoD {
  for item in array {
    log(item * 10);
  }
} 
```

```bash title="Wing console output"
# Run locally with wing console
wing it

1, 2, 3
mutated value: 4
len: 3
10
20
30
```