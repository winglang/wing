class Foo {
  inflight x: num;
  inflight init() {
    this.x = 42;
  }
  inflight bar(): num { 
    return this.x;
  }
  inflight foo(): num { 
    return this.bar() / 2;
  }
}

let f = new Foo();

test "test" {
  assert(f.foo() == 21);
}
