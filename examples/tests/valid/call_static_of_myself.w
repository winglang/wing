class Foo {
  public static inflight foo(): num { return 1; }
  static inflight bar(): num { return Foo.foo(); }

  public inflight callThis(): num {
    return Foo.bar();
  }

}

inflight class Bar {
  public static bar(): num { return 2; }

  public callThis(): num {
    return Bar.bar();
  }
}

let foo = new Foo();

test "test" {
  class Zoo {
    public static zoo(): num { return 3; }
  }

  let bar = new Bar();

  assert(Foo.foo() == 1);
  assert(Bar.bar() == 2);
  assert(Zoo.zoo() == 3);
  assert(foo.callThis() == 1);
  assert(bar.callThis() == 2);
}