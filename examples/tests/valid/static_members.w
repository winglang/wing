bring cloud;

class Foo {
  instance_field: num;

  // TODO: Static field initialization not supported yet (https://github.com/winglang/wing/issues/1668)
  // static static_field: str = "Static resource value"; 
  // static inflight inflight_static_field: str = "Inflight static resource value";

  static m(): num { return 99; }

  init() {
    this.instance_field = 100;
  }

  static inflight get_123(): num {
    return 123;
  }
}

let foo = new Foo();
assert(foo.instance_field == 100);
// TODO: Static field initialization not supported yet (https://github.com/winglang/wing/issues/1668)
// assert(Foo.static_field == "Static resource value"); 
assert(Foo.m() == 99);

new cloud.Function(inflight (s:str): str => {
  inflight class InflightClass {
    init() {}
    inflight inflight_method(): str {
      return "Inflight method";
    }
    static inflight static_inflight_method(): str {
      return "Static inflight method";
    }

    // TODO: Static field initialization not supported yet (https://github.com/winglang/wing/issues/1668)
    // static static_inflight_field: str = "Static inflight value";
  }

  // TODO: acess to preflight types (`Foo`) not supported yet (https://github.com/winglang/wing/issues/1669)
  // assert(Foo.get_123() == 123);
  // TODO: Static field initialization not supported yet (https://github.com/winglang/wing/issues/1668)
  // assert(Foo.inflight_static_field == "Inflight static resource value");

  let inflight_class = new InflightClass();
  assert(inflight_class.inflight_method() == "Inflight method");
  assert(InflightClass.static_inflight_method() == "Static inflight method");
  // TODO: Static field initialization not supported yet (https://github.com/winglang/wing/issues/1668)
  // assert(InflightClass.static_inflight_field == "Static inflight value");
}) as "test";
