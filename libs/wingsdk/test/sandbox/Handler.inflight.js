export class Handler__Inflight {
  constructor({ b }) {
    this.b = b;
  }

  async handle() {
    await this.b.put_something();
  }
}
