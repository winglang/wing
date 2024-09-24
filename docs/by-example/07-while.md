---
title: While
id: while
slug: /while
sidebar_label: While
description: Using while statements with Wing
keywords: [Wing language, example]
image: /img/wing-by-example.png
---

While loops repeatedly check a condition and run a block of code until the condition is `false`.

```js playground title="main.w"
let var i = 0;

while i < 2 {
  log("while {i}");
  i = i + 1;
}
```

```bash title="Wing console output"
# Run locally with wing console
wing it

while 0
while 1
```