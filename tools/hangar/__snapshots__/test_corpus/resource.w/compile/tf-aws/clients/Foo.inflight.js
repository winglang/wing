class Foo  {
  constructor({ c }) {
    this.c = c;
  }
  async $inflight_init()  {
    {
      this.inflight_field = 123;
      (await this.c.inc(100));
    }
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
