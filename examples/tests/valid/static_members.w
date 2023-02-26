bring cloud;

resource Foo {
  instance_field: num;

  // TODO: Static field initialization not supported yet
  //static static_field: str = "Static value"; 
  //static inflight inflight_static_field: str = "Inflight static value";
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
// TODO: Static field initialization not supported yet
// assert(Foo.static_field == "Static value"); 
assert(Foo.m() == 99);

new cloud.Function(inflight (s:str): str => {
  class InflightClass {
    init() {}
    inflight inflight_method(): str {
      return "Inflight method";
    }
    static inflight static_inflight_method(): str {
      return "Static inflight method";
    }
  }

  // TODO: we don't have access to the preflight type Foo here.
  // assert(Foo.get_123() == 123);
  // TODO: Static field initialization not supported yet
  // assert(Foo.inflight_static_field == "Inflight static value");

  let inflight_class = new InflightClass();
  assert(inflight_class.inflight_method() == "Inflight method");
  assert(InflightClass.static_inflight_method() == "Static inflight method");
}) as "test";
