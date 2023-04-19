class  Bar {
  constructor({ b, foo, name, stateful }) {
    this.b = b;
    this.foo = foo;
    this.name = name;
    this.stateful = stateful;
  }
  async my_method()  {
    {
      (await this.foo.foo_inc());
      (await this.b.put("foo",`counter is: ${(await this.foo.foo_get())}`));
      return (await this.b.get("foo"));
    }
  }
}
exports.Bar = Bar;
