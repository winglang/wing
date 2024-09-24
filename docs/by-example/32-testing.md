---
title: Testing
id: testing
slug: /testing
sidebar_label: Testing
description: Directories
keywords: [Wing language, Directories]
image: /img/wing-by-example.png
---

Wing incorporates a [lightweight testing framework](/docs/concepts/tests), which is built around the `wing test` command and the `test` keyword.

```js playground example title="main.w"
bring math;
bring cloud;
let b = new cloud.Bucket();

test "abs" {
  assert(1 == math.abs(-1));
}

test "bucket list should include created file" {
  b.put("file", "lorem ipsum");
  let listOfFile = b.list();
  assert(listOfFile.length == 1);
}

test "bucket starts empty" {
  let listOfFile = b.list();
  assert(listOfFile.length == 0);
}

test "this test fails" {
  throw("test throws an exception fails");
}
```

```bash title="Wing console output"
# Run locally with wing console
No directory found
```




