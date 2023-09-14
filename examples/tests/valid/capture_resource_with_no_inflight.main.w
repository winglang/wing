bring cloud;

class A {
  public field: str;
  counter: cloud.Counter;

  init() { 
    this.field = "hey"; 
    this.counter = new cloud.Counter();
  }

  inflight incCounter() {
    this.counter.inc();
  }

  public inflight bar() { }
}

let a = new A();
test "test" {
  assert("hey" == a.field);

  // we are intentionally not calling `incCounter`, but the counter is still lifted into the
  // inflight context
  a.bar();
}
