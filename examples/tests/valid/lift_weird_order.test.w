class B {
  pub inflight do() {}
}

class C {
  b: B;
  new(b: B) {
    this.b = b;
  }
  pub inflight do() {
    this.b.do();
  }
}

let b = new B();
let c = new C(b);

test "something" {
  b.do();
  c.do();
}
