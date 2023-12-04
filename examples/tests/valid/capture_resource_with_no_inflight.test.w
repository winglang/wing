bring cloud;

class A {
  pub field: str;
  counter: cloud.Counter;

  new() { 
    this.field = "hey"; 
    this.counter = new cloud.Counter();
  }

  inflight incCounter() {
    this.counter.inc();
  }

  pub inflight bar() { }
}

let a = new A();
test "test" {
  assert("hey" == a.field);

  // we are intentionally not calling `incCounter`, but the counter is still lifted into the
  // inflight context
  a.bar();
}
