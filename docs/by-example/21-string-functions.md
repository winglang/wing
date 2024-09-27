---
title: String functions
id: string-functions
slug: /string-functions
sidebar_label: String functions
description: Functions for string values in Wing
keywords: [Wing language, string, functions]
image: /img/wing-by-example.png
---

Wing provides many useful [string-related functions](/docs/api/standard-library/std/string#string-). Here are some examples to give you a sense of the usage.

```js playground example title="main.w"
log("test".contains("es"));
log("test".length);
log("test".startsWith("te"));
log("test".endsWith("st"));
log("test".indexOf("e"));

let x = ["a", "b"];
log(x.join("-"));

log("foo".replace("o", "0"));
log("foo".replaceAll("o", "0"));
log(Json.stringify(("a-b-c-d-e".split("-"))));
log("TEST".lowercase());
log("test".uppercase());
```

```bash title="Wing console output"
# Run locally with wing console
wing it

true
4
true
true
1
a-b
f0o
f00
["a","b","c","d","e"]
test
TEST
```