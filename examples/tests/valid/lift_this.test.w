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
}

let f = new Foo();

test "test" {
  assert(f.foo() == 21);
}
