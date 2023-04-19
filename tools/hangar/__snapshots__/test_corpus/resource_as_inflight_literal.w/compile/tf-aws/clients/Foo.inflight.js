class  Foo {
  constructor({ stateful }) {
    this.stateful = stateful;
  }
  async handle(message)  {
    {
      return "hello world!";
    }
  }
}
exports.Foo = Foo;
