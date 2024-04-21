inflight class Foo {
  pub get(): num { return 42; }
}

struct Bar {
  foo: Foo; // WTF? is this allowed an inflight class in a struct? I can't instantiate in preflight?? not in spec..
}

let getBar = inflight (): Bar => {
  return Bar {
    foo: new Foo()
  };
};

test "test" {

  let bar = getBar();
  assert(bar.foo.get() == 42);

}