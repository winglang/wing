class  Doubler {
  constructor({ func, stateful }) {
    this.func = func;
    this.stateful = stateful;
  }
  async invoke(message)  {
    {
      (await this.func.handle(message));
      (await this.func.handle(message));
    }
  }
}
exports.Doubler = Doubler;
