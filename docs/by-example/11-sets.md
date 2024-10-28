---
title: Sets
id: sets
slug: /sets
sidebar_label: Sets
description: Using sets with Wing
keywords: [Wing language, example]
image: /img/wing-by-example.png
custom_edit_url: https://github.com/winglang/wing/blob/main/docs/by-example/11-sets.md
---


A set keeps track of collection of unique values - a specific value can only be added to a set once. Sets are immutable by default `Set<T>`, and you can make them immutable using `MutSet<T>`.


```js playground example title="main.w"
// mutable set
let unqiueNumbers = MutSet<num>[1, 2, 3, 3, 3];
unqiueNumbers.add(4);
unqiueNumbers.delete(1);

// immutable set, values cannot be added or removed
let uniqueStrings = Set<str>["unique", "values", "values"];


log(Json.stringify(unqiueNumbers.toArray()));
log(Json.stringify(unqiueNumbers.size));

log(Json.stringify(uniqueStrings.toArray()));
```

```bash title="Wing console output"
# Run locally with wing console
wing it

[2,3,4]
3
["unique", "values"]
```