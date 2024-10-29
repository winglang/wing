---
title: Optionality
id: optionality
slug: /optionality
sidebar_label: Optionality
description: Using while statements with Wing
keywords: [Wing language, example]
image: /img/wing-by-example.png
custom_edit_url: https://github.com/winglang/wing/blob/main/docs/by-example/08-optionality.md
---

Nullity is a primary source of bugs in software. Being able to guarantee that a value will never be null makes it easier to write safe code without constantly having to take nullity into account.

An optional value can be either "nil" or a non-nil value. The type of an optional variable is represented by adding a question mark (`?`) to its end.

```js playground title="main.w"
let monday: str = "doctor";
let tuesday: str? = nil;

// Set next to tuesday if there is a value otherwise use monday value
let next = tuesday ?? monday;

log(next);

```

```bash title="Wing console output"
# Run locally with wing console
wing it

doctor
```