inflight class Foo { 
  pub field1: num;
  pub field2: num;

  get_six(): num {
    return 6;
  }

  init(f2: num) {
    this.field1 = this.get_six();
    this.field2 = f2;
  }
}

inflight class FooChild extends Foo {
  pub field3: num;

  init() {
    super(5);
    this.field3 = 4;
  }
}

test "inflight class init" {
  let f = new Foo(5);
  // Make sure the init was called
  assert(f.field1 == 6 && f.field2 == 5);
}

test "inflight calls parent's init" {
  let f = new FooChild();
  // Make sure the init was called and the parent's init was called
  assert(f.field1 == 6 && f.field2 == 5 && f.field3 == 4);
}
