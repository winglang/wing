async handle() {
  const { f } = this;
  (await f.call());
}
