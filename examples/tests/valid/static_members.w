bring cloud;

class Foo {
  instanceField: num;

  // TODO: Static field initialization not supported yet (https://github.com/winglang/wing/issues/1668)
  // static staticField: str = "Static resource value"; 
  // static inflight inflightStaticField: str = "Inflight static resource value";

  static m(): num { return 99; }

  init() {
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

new cloud.Function(inflight (s:str): str => {
  inflight class InflightClass {
    init() {}
    inflight inflightMethod(): str {
      return "Inflight method";
    }
    static inflight staticInflightMethod(): str {
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
}) as "test";
