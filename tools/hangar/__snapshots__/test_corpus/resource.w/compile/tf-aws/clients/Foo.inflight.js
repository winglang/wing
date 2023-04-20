class  Foo {
  constructor({ c, stateful }) {
    this.c = c;
    this.stateful = stateful;
  }
  async $inflight_init()  {
    {
      this.inflight_field = 123;
      (await this.c.inc(110));
      (await this.c.dec(10));
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
  static async foo_static()  {
    {
      return "foo static";
    }
  }
}
exports.Foo = Foo;
