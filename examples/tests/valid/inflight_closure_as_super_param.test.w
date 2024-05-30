class Foo {}

class Base {
  pub h: inflight (): str;
  pub f_base: Foo;
  new(handler: inflight (): str, f: Foo) { 
    this.h = handler;
    this.f_base = f;
  }
}

class Derived extends Base {
  pub f: Foo;
  new() {
    super(inflight (): str => { 
      return "boom!";
    }, new Foo() as "in_root");
    this.f = new Foo() as "in_derived";
  }
}

let c = new Derived() as "derived";
// Make sure that instances created in a ctor are scoped to the instance they were created in
// This is related to this test because the transformed inflight closure is also an instance 
// created in a ctor, but it's special cased to to be scoped in the class because `this` isn't
// available during the closures instantiation.
assert(nodeof(c.f).path.endsWith("derived/in_derived"));
// Make sure the instance created in the super call is scoped to the parent (root)
assert(!nodeof(c.f_base).path.endsWith("derived/in_root"));
let appPath = nodeof(this).path;
assert(nodeof(c.f_base).path == "{appPath}/in_root");

test "boom!" {
  assert(c.h() == "boom!");
}