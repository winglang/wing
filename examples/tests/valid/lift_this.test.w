bring util;

class Foo {
  inflight x: num;
  inflight new() {
    this.x = 42;
  }
  inflight bar(): num { 
    return this.x;
  }
  pub inflight foo(): num { 
    return this.bar() / 2;
  }
  pub onLift(host: std.IInflightHost, ops: Array<str>) {
    if ops.contains("bar") {
      host.addEnvironment("BAR", "123");
    }
  }
}

let f = new Foo();

test "test" {
  assert(f.foo() == 21);

  // Check that calling foo() results in permissions for bar()
  // BAR should be set since we called bar()
  assert(util.env("BAR") == "123");
}
