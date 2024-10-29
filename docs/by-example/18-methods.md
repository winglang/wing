---
title: Methods
id: methods
slug: /methods
sidebar_label: Methods
description: Methods with Wing
keywords: [Wing language, variadic]
image: /img/wing-by-example.png
custom_edit_url: https://github.com/winglang/wing/blob/main/docs/by-example/18-methods.md
---

```js playground example title="main.w"
// Rect type
struct Rect {
  width: num;
  height: num;
}

// methods accepting Rect type
let area = (r: Rect): num => {
  return r.height * r.width;
};

// methods accepting Rect type
let perim = (r: Rect): num => {
  return 2 * r.height + 2 * r.width;
};

let r = Rect {
  height: 5,
  width: 10
};

log("area: {area(r)}");
log("perim: {perim(r)}");

// Or Rectangle class with public methods
class Rectangle {
  height: num;
  width: num;

  new(height: num, width: num) {
    this.height = height;
    this.width = width;
  }

  pub area(): num {
      return this.height * this.width;
  }

  pub perim(): num {
    return 2 * this.height + 2 * this.width;
  }

}

let x = new Rectangle(5, 10);
log(x.area());
log(x.perim());

```

```bash title="Wing console output"
# Run locally with wing console
wing it

area: 50
perim: 30
50
30
```