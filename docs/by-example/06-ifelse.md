---
title: If/Else
id: if-else
slug: /if-else
sidebar_label: If/Else
description: Using if else with Wing
keywords: [Wing language, example]
image: /img/wing-by-example.png
custom_edit_url: https://github.com/winglang/wing/blob/main/docs/by-example/06-ifelse.md
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


### If / else if / else
```js playground title="main.w"
let grade = (score: num): str => {
  // Parentheses are optional in conditions.
  // However, curly braces are required in `if/else` statements.
  if 0 < score && score < 55 {
      return "F";
  } else if 55 <= score && score < 65 {
      return "C";
  } else if 65 <= score && score < 75  {
      return "B";
  } else if 75 <= score && score <= 100 {
      return "A";
  } else {
      return "Invalid grade";
  }
};

log("54 is {grade(54)}"); // 54 is F
log("62 is {grade(62)}"); // 62 is C
log("68 is {grade(68)}"); // 68 is B
log("99 is {grade(99)}"); // 99 is A
log("101 is {grade(101)}"); // 101 is Invalid grade
```