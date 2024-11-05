---
title: While
id: while
slug: /while
sidebar_label: While
description: Using while statements with Wing
keywords: [Wing language, example]
image: /img/wing-by-example.png
custom_edit_url: https://github.com/winglang/wing/blob/main/docs/by-example/07-while.md
---

While loops repeatedly check a condition and run a block of code until the condition is `false`.

```js playground title="main.w"
let var i = 0;

while i < 100 {
  i = i + 1;
  if i == 20 {
    // although the while loop goes to 100, we break it at 20
    break;
  }
  if i % 2 == 0 {
    // continue for even numbers
    continue;
  }
  log("{i}");
}
```

```bash title="Wing console output"
# Run locally with wing console
wing it

1
3
5
7
9
11
13
15
17
19
```