async handle() {
  const { this } = this;
  (await this.b.put("foo2.txt","bar"));
}
