const Foo = require("./Foo.inflight.js").Foo;
const MyEnum = Object.freeze((function (MyEnum) {
  MyEnum[MyEnum["A"] = 0] = "A";
  MyEnum[MyEnum["B"] = 1] = "B";
  MyEnum[MyEnum["C"] = 2] = "C";
  return MyEnum;
})({}));
class  Bar {
  constructor({ b, e, foo, name, stateful }) {
    this.b = b;
    this.e = e;
    this.foo = foo;
    this.name = name;
    this.stateful = stateful;
  }
  static async bar_static()  {
    {
      return "bar static";
    }
  }
  async my_method()  {
    {
      (await this.foo.foo_inc());
      const s = (await Foo.foo_static());
      (await this.b.put("foo",`counter is: ${(await this.foo.foo_get())}`));
      return (await this.b.get("foo"));
    }
  }
  async test_type_access()  {
    {
      if (true) {
        {((cond) => {if (!cond) throw new Error(`assertion failed: '((await Bar.bar_static()) === "bar static")'`)})(((await Bar.bar_static()) === "bar static"))};
        {((cond) => {if (!cond) throw new Error(`assertion failed: '((await Foo.foo_static()) === "foo static")'`)})(((await Foo.foo_static()) === "foo static"))};
        {((cond) => {if (!cond) throw new Error(`assertion failed: '(this.e === MyEnum.B)'`)})((this.e === MyEnum.B))};
      }
    }
  }
}
exports.Bar = Bar;
