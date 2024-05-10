class A {
  pub a: str;

  new() {
    this.a = "a";
  }

  pub inflight do(): str {
    return this.a;
  }
}

class B extends A {
  pub b: str;

  new() {
    super();
    this.b = "b";
  }

  pub inflight do(): str {
    return "{this.b} {super.do()}";
  }
}

class C extends B {
  pub c: str;

  new() {
    super();
    this.c = "c";
  }

  inflight dummy() {
    // Directly access the field of the parent class, this means it's lifted both for 
    // initializing the parent class and for direct access here. This verifies we don't
    // lift twice and cause a name conflict.
    log("{this.b}");
  }

  pub inflight do(): str {
    return "{this.c} {super.do()}";
  }
}

let c = new C();
test "test" {
  assert(c.do() == "c b a");
}