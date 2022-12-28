export class MyBucket__Inflight {
  constructor({ inner, thing }) {
    this.inner = inner;
    this.thing = thing;
  }

  async put_something() {
    await this.inner.put("some", this.thing);
  }
}
