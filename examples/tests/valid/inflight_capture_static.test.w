bring util;

class Preflight {
  pub static inflight staticMethod(a: num): str {
    return "foo-{a}";
  }
}

inflight class OuterInflight {
  pub static staticMethod(b: str): num {
    return b.length;
  }
}

test "call static method of preflight" {
  assert(Preflight.staticMethod(123) == "foo-123");
}

test "call static method of an outer inflight class" {
  assert(OuterInflight.staticMethod("hello") == 5);
}

test "call static method of an inner inflight class" {
  class InnerInflight {
    pub static staticMethod(): str { return "hello"; }
  }

  assert(InnerInflight.staticMethod() == "hello");
}

test "call static method of a namespaced type" {
  if let target = util.tryEnv("WING_TARGET") {
    log("WING_TARGET={target}");
  } else {
    assert(false /* target not defined*/);
  }
}