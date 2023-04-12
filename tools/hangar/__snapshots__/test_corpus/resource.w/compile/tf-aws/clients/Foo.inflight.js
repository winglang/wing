class Foo  {
  constructor({ c }) {
    this.c = c;
  }
  async foo_inc()  {
    {
      (await this.c.inc());
    }
  }
  async foo_get()  {
    {
      return (await this.c.peek());
    }
  }
}
exports.Foo = Foo;
