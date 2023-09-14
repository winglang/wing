bring cloud;

let initCount = new cloud.Counter();

class Foo {
  inflight init() {
    initCount.inc();
  }

  public inflight method() { }
}

class Bar {
  public foo: Foo;
  init() {
    this.foo = new Foo();
  }

  public inflight callFoo() {
    this.foo.method();
  }
}

let bar = new Bar();

test "hello" {
  bar.callFoo();
  bar.foo.method();

  // TODO: https://github.com/winglang/wing/issues/3244
  assert(initCount.peek() == /*1*/ 2);
}