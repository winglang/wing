class  Foo {
  constructor({ data, stateful }) {
    this.data = data;
    this.stateful = stateful;
  }
  async get_stuff()  {
    {
      return this.data.field0;
    }
  }
}
exports.Foo = Foo;
