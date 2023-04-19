class  BigPublisher {
  constructor({ b, b2, q, t, stateful }) {
    this.b = b;
    this.b2 = b2;
    this.q = q;
    this.t = t;
    this.stateful = stateful;
  }
  async publish(s)  {
    {
      (await this.t.publish(s));
      (await this.q.push(s));
      (await this.b2.put("foo",s));
    }
  }
  async getObjectCount()  {
    {
      return (await this.b.list()).length;
    }
  }
}
exports.BigPublisher = BigPublisher;
