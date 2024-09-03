bring expect;

class BaseClass {
  pub inflight x: num;
  inflight new() {
    log("BaseClass.inflight new");
    this.x = 2;
  }

  pub inflight add(a: num, b: num): num {
    return a + b;
  }
}

class SuperClass extends BaseClass {
  inflight new() {
    super();
    this.x += 1;
    log("SuperClass.inflight new");
  }
}

let c = new SuperClass();

test "counter works" {
  expect.equal(c.add(2, 3), 5);
  expect.equal(c.x, 3);
}