inflight class Foo {
  get(): num { return 42; }
}

struct Bar {
  foo: Foo;
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