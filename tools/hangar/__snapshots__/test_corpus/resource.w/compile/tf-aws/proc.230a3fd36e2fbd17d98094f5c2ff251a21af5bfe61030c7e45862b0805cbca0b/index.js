async handle() {
  const { this } = this;
  (await this.q.push("foo"));
}
