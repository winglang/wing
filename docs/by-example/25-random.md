---
title: Random
id: random
slug: /random
sidebar_label: Random
description: Create random values in Wing
keywords: [Wing language, random]
image: /img/wing-by-example.png
custom_edit_url: https://github.com/winglang/wing/blob/main/docs/by-example/24-random.md
---

Using the [math standard library](/docs/api/standard-library/math/api-reference) you can generate random numbers.

_Note: The random numbers that are generated are not random enough for sensitive security tasks, such as generating encryption keys, tokens for authentication, or anything requiring unpredictable randomness for security purposes._


```js playground example title="main.w"
bring math;

log(math.random(100));

log(math.ceil(math.random(100)));

log((math.random()*5)+5);

```

```bash title="Wing console output"
# Run locally with wing console, output will vary
46.58171364582826
4
5.721934646951212
```




