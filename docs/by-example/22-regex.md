---
title: Regular expressions
id: regex
slug: /regex
sidebar_label: Regular expressions
description: Functions for string values in Wing
keywords: [Wing language, string, functions]
image: /img/wing-by-example.png
custom_edit_url: https://github.com/winglang/wing/blob/main/docs/by-example/22-regex.md
---

Wing offers built-in support for regular expressions. Here are some examples of common regexp-related tasks in Wing.


```js playground example title="main.w"

let r = regex.compile("p([a-z]+)ch");

// Checks if the regular expression matches the provided text.
log(r.test("peach"));

// Finds the first occurrence of the pattern within the text.
log(r.find("peach peach") ?? "");

// Finds all non-overlapping occurrences of the pattern within the text.
log(Json.stringify(r.findAll("peach punch pinch")));

// Finds the start and end index of all matches within the text.
log(Json.stringify(r.findAllIndex("peach punch pinch")));

// Finds the start and end index of the first match within the text.
log(Json.stringify(r.findIndex("peach")));

// Finds the first match and its submatches.
log(Json.stringify(r.findSubmatch("peach punch")));

// Finds the start and end index of the match and all submatches.
log(Json.stringify(r.findSubmatchIndex("peach punch")));

// Replaces all occurrences of the match with a replacement string.
log(r.replaceAll("a peach", "<fruit>"));
```

```bash title="Wing console output"
# Run locally with wing console
wing it

true
peach
["peach","punch","pinch"]
[[0,5],[6,11],[12,17]]
[0,5]
["peach","ea"]
[[0,5],[1,3]]
a 
```


