---
title: For
id: for
slug: /for
sidebar_label: For
description: Using for loops with Wing
keywords: [Wing language, example]
image: /img/wing-by-example.png
custom_edit_url: https://github.com/winglang/wing/blob/main/docs/by-example/05-for.md
---

Wing supports looping over collections with `for..in` statements.

[for..in](/docs/api/language-reference#26-for) is used to iterate over an array, a set or a range.

```js playground title="main.w"
// a standard for loop
for item in 1..3 {
  log(item);
}

// for-in with arrays
let arr = [1, 2, 3];
for item in arr {
  log(item);
}

// break a loop
let items = Set<num>[1, 2, 3];
for item in items {
  if item == 1 {
    break;
  }
  log(item);
}

// continue the next iteration of the loop
for item in 1..10 {
  if item % 2 == 0 {
    continue;
  }
  log(item);
}

```

```bash title="Wing console output"
# Run locally with wing console
wing it

1
2
1
2
3
1
3
5
7
9
```