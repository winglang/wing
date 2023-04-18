class  Doubler {
  constructor({ func }) {
    this.func = func;
  }
  async invoke(message)  {
    {
      (await this.func.handle(message));
      (await this.func.handle(message));
    }
  }
}
exports.Doubler = Doubler;
