bring cloud;

let initCount = new cloud.Counter();

class Foo {
  inflight init() {
    initCount.inc();
  }

  pub inflight method() { }
}

class Bar {
  pub foo: Foo;
  init() {
    this.foo = new Foo();
  }

  pub inflight callFoo() {
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