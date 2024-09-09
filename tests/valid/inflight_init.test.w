bring "jsii-fixture" as jsii_fixture;

inflight class Foo { 
  pub field1: num;
  pub field2: num;

  get_six(): num {
    return 6;
  }

  new(f2: num) {
    this.field1 = this.get_six();
    this.field2 = f2;
  }
}

inflight class FooChild extends Foo {
  pub field3: num;

  new() {
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

test "inflight calls parent's init when non exists" {
  // Note these are all inflight classes since we're in an inflight test context
  class FooNoInit {
    protected leet(): num {
      return 1337;
    }
  }

  class FooChild extends FooNoInit {
    pub field: num;

    new() {
      super();
      this.field = this.leet();
    }
  }

  let f = new FooChild();
  // Make sure the init was called and the parent's init was called
  assert(f.field == 1337);
}

test "inflight class inherits form JSII class" {
  class Foo extends jsii_fixture.JsiiClass {
    pub foo_str: str;
    pub foo_num: num;

    protected get_six(): num {
      return 6;
    }

    new(x: num, y: str) {
      super(x); // Call non-inflight parent's init
      this.foo_str = "{y} {x}"; // Use init args in inflight's init 
      this.foo_num = this.get_six(); // Call inflight method in inflight's init
    }
  }

  let f = new Foo(1, "Foo");

  assert(f.foo_str == "Foo 1" && f.field() == 1 && f.foo_num == 6);

  class FooChild extends Foo {
    pub child_field: num;

    new() {
      super(2, "FooChild"); // Call parent's init which will also handle the JSII class's init
      this.child_field = this.get_six() + 1;
    }
  }

  let f_child = new FooChild();

  assert(f_child.foo_str == "FooChild 2" && f_child.field() == 2 && f_child.foo_num == 6 && f_child.child_field == 7);
}