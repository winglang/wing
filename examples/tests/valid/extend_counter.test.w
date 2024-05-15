bring cloud;
bring util;
bring expect;

let global_value = "yo";

class MyCounter extends cloud.Counter {
  pub field1: num;
  new() {
    this.field1 = 5;
  }

  pub inflight inc() {
    expect.equal(this.field1, 5);
    expect.equal(global_value, "yo");
    super.inc();
  }

  pub inflight extra1(): str {
    return "extra1";
  }
}

class MySuperCounter extends MyCounter {
  pub field2: num;
  new() {
    this.field2 = 10;
  }

  pub inflight inc() {
    expect.equal(this.field2, 10);
    expect.equal(this.field1, 5);
    expect.equal(global_value, "yo");
    super.inc();
  }

  pub inflight extra2(): str {
    return "extra2";
  }
}

let c = new MySuperCounter();

test "counter works" {
  c.inc();
  expect.equal(c.peek(), 1);
  expect.equal(c.extra1(), "extra1");
  expect.equal(c.extra2(), "extra2");
}
