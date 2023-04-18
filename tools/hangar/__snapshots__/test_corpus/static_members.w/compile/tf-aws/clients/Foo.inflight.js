class  Foo {
  constructor({ instance_field, stateful }) {
    this.instance_field = instance_field;
    this.stateful = stateful;
  }
  static async get_123()  {
    {
      return 123;
    }
  }
}
exports.Foo = Foo;
