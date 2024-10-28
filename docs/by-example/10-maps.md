---
title: Maps
id: maps
slug: /maps
sidebar_label: Maps
description: Using maps with Wing
keywords: [Wing language, example]
image: /img/wing-by-example.png
custom_edit_url: https://github.com/winglang/wing/blob/main/docs/by-example/10-maps.md
---

Maps are key-value data structures that let you associate strings with any kinds of other values.

```js playground example title="main.w"
// immutable map
let configration = Map<str>{
  "URL" => "https://winglang.io"
};

// mutable map
let listOfPrices = MutMap<num>{
  "PRODUCT_1" => 100.00,
  "PRODUCT_2" => 200.00,
  "PRODUCT_3" => 300.00
};

// Map<num> is inferred 
let values = {"a" => 1, "b" => 2};    // immutable map, Map<num> is inferred

// Change the values of the mutable map
listOfPrices.set("PRODUCT_1", 500);

log(configration.get("URL"));
log(Json.stringify(values.keys()));
log(Json.stringify(listOfPrices.get("PRODUCT_1")));
```

```bash title="Wing console output"
# Run locally with wing console
wing it

https://winglang.io
["a","b"]
500
```