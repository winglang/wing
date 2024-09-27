---
title: Primitive values
id: primitives
slug: /primitive-values
sidebar_label: Primitive values
description: Hello world wing example
keywords: [Wing language, example, primitives, values]
image: /img/wing-by-example.png
---

Wing has primitive types including strings, integers, floats, booleans, etc. Here are a few basic examples.

- Strings, which can be added together with +
- Integers and floats
- Booleans, with boolean operators as you'd expect

```js playground title="main.w"
log("Hello " + "Wing");

log("1+1 =  {1+1}");
log("7.0/3.0 = {7.0/3.0}");

log(true && true);
log(true || false);
log(!true);
```

```bash title="Wing console output"
# Run locally with wing console
wing it

Hello Wing
1+1 = 2
7.0/3.0 = 2.3333333333333335
true
true
false
```