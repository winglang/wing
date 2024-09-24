---
title: Number parsing
id: number-parsing
slug: /number-parsing
sidebar_label: Number Parsing
description: Parse values into numbers
keywords: [Wing language, random]
image: /img/wing-by-example.png
---

```js playground example title="main.w"
let j = Json { a: 100 };

let x: num = num.fromStr("1");
let y: num = num.fromJson(j.get("a"));

log(x);
log(y);
```

```bash title="Wing console output"
# Run locally with wing console
1
100
```




