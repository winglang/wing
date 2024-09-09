bring cloud;

class Foo {
  pub instanceField: num;

  // TODO: Static field initialization not supported yet (https://github.com/winglang/wing/issues/1668)
  // static staticField: str = "Static resource value"; 
  // static inflight inflightStaticField: str = "Inflight static resource value";

  pub static m(): num { return 99; }

  new() {
    this.instanceField = 100;
  }

  static inflight get123(): num {
    return 123;
  }
}

let foo = new Foo();
assert(foo.instanceField == 100);
// TODO: Static field initialization not supported yet (https://github.com/winglang/wing/issues/1668)
// assert(Foo.staticField == "Static resource value"); 
assert(Foo.m() == 99);

test "test" {
  inflight class InflightClass {
    new() {}
    pub inflight inflightMethod(): str {
      return "Inflight method";
    }
    pub static inflight staticInflightMethod(): str {
      return "Static inflight method";
    }

    // TODO: Static field initialization not supported yet (https://github.com/winglang/wing/issues/1668)
    // static staticInflightField: str = "Static inflight value";
  }

  // TODO: acess to preflight types (`Foo`) not supported yet (https://github.com/winglang/wing/issues/1669)
  // assert(Foo.get123() == 123);
  // TODO: Static field initialization not supported yet (https://github.com/winglang/wing/issues/1668)
  // assert(Foo.inflightStaticField == "Inflight static resource value");

  let inflightClass = new InflightClass();
  assert(inflightClass.inflightMethod() == "Inflight method");
  assert(InflightClass.staticInflightMethod() == "Static inflight method");
  // TODO: Static field initialization not supported yet (https://github.com/winglang/wing/issues/1668)
  // assert(InflightClass.staticInflightField == "Static inflight value");
}
