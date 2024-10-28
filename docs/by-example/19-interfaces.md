---
title: Interfaces
id: interfaces
slug: /interfaces
sidebar_label: Interfaces
description: Interfaces with Wing
keywords: [Wing language, interfaces]
image: /img/wing-by-example.png
custom_edit_url: https://github.com/winglang/wing/blob/main/docs/by-example/19-interfaces.md
---

```js playground example title="main.w"
bring math;

interface Geometry {
  area(): num;
  perim(): num;
}

class Rect impl Geometry {
  width: num;
  height: num;
  new(width: num, height: num) {
    this.width = width;
    this.height = height;
  }

  pub area(): num {
      return this.height * this.width;
  }

  pub perim(): num {
    return 2 * this.height + 2 * this.width;
  }
}

class Circle impl Geometry {
  radius: num;
  new(radius: num) {
    this.radius = radius;
  }

  pub area(): num {
      return math.PI * this.radius * this.radius;
  }

  pub perim(): num {
    return 2 * math.PI * this.radius;
  }
}



let r = new Rect(3, 4);
let c = new Circle(5);

log(r.area());
log(r.perim());

log(c.area());
log(c.perim());
```

```bash title="Wing console output"
# Run locally with wing console
wing it

12
14
78.53981633974483
31.41592653589793
```