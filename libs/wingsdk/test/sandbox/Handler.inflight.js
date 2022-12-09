export class Handler__Inflight {
  constructor({ b }) {
    this.b = b;
  }

  async handle() {
    this.b.put_something();
  }
}
