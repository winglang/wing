class  Foo {
  constructor({ api, stateful }) {
    this.api = api;
    this.stateful = stateful;
  }
  async handle(message)  {
    {
      const url = this.api.url;
      {((cond) => {if (!cond) throw new Error(`assertion failed: 'url.startsWith("http://")'`)})(url.startsWith("http://"))};
    }
  }
}
exports.Foo = Foo;
