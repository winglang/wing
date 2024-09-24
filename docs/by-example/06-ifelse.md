---
title: If/Else
id: if-else
slug: /if-else
sidebar_label: If/Else
description: Using if else with Wing
keywords: [Wing language, example]
image: /img/wing-by-example.png
---

Flow control can be done with if/else statements. The `if` statement is optionally followed by any number of `else if` clauses and a final `else` clause.

```js playground title="main.w"
if 7 % 2 == 0 {
  log("7 is even");
} else {
  log("7 is odd");
}

if 8 % 4 == 0 {
  log("8 is divisble by 4");
}

if 8 % 2 == 0 || 7 % 2 == 0 {
  log("either 8 or 7 are even");
}

let value = 9;
if value < 0 {
  log("${value} is negative");
} else if value < 10 {
  log("${value} has 1 digit");
} else {
  log("{value} has multiple digits");
}

```

```bash title="Wing console output"
# Run locally with wing console
wing it

7 is odd
8 is divisble by 4
either 8 or 7 are even
9 has 1 digit
```