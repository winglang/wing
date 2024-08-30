bring util;

class Foo {
  pub inflight m1() {
    log("I'm expecting ABC to be set");
    assert(util.env("ABC") == "123");
  }

  pub static inflight m2() {
    log("I'm expecting XYZ to be set");
    assert(util.env("XYZ") == "789");
  }

  pub onLift(host: std.IInflightHost, ops: Array<str>) {
    if ops.contains("m1") {
      host.addEnvironment("ABC", "123");
    }
  }

  pub static onLiftType(host: std.IInflightHost, ops: Array<str>) {
    if ops.contains("m2") {
      host.addEnvironment("XYZ", "789");
    }
  }
}

let foo = new Foo();

test "onLift and onLiftType allow capabilities to be granted to inflight hosts" {
  foo.m1();
  Foo.m2();
}
