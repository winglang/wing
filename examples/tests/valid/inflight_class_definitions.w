class A {
  foo(): str { return "a1"; }
  inflight goo(): str { return "a2"; }
}

let a = new A();
assert(a.foo() == "a1");

inflight class B {
  foo(): str { return "b1"; }
}

let fn = inflight () => {
  inflight class C {
    foo(): str { return "c1"; }
  }

  let c = new C();
  assert(c.foo() == "c1");
};

class D {
  inner: inflight (): str;

  init() {
    class E {
      foo(): str { return "e1"; }
    }

    let pb = new E();
    assert(pb.foo() == "e1");

    inflight class F {
      foo(): str { return "f1"; }
    }

    this.inner = inflight (): str => {
      return new F().foo();
    };
  }

  getInner(): inflight (): str {
    return this.inner;
  }

  inflight callInner(): str {
    return this.inner();
  }
}

let d = new D();
let innerD = d.getInner();

test "test" {
  assert(a.goo() == "a2");

  let b = new B();
  assert(b.foo() == "b1");

  fn();

  assert(d.callInner() == "f1");
  assert(innerD() == "f1");
}