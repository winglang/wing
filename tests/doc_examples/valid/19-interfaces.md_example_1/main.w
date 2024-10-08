// This file was auto generated from an example found in: 19-interfaces.md_example_1
// Example metadata: {"valid":true}
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
