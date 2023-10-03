class Foo {
  pub static inflight foo(): num { return 1; }
  static inflight bar(): num { return Foo.foo(); }

  pub inflight callThis(): num {
    return Foo.bar();
  }

}

inflight class Bar {
  pub static bar(): num { return 2; }

  pub callThis(): num {
    return Bar.bar();
  }
}

let foo = new Foo();

test "test" {
  class Zoo {
    pub static zoo(): num { return 3; }
  }

  let bar = new Bar();

  assert(Foo.foo() == 1);
  assert(Bar.bar() == 2);
  assert(Zoo.zoo() == 3);
  assert(foo.callThis() == 1);
  assert(bar.callThis() == 2);
}