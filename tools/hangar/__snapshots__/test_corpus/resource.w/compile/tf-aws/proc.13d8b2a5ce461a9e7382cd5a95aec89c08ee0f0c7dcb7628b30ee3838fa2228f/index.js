async handle() {
  const { this } = this;
  (await this.b.put("foo1.txt","bar"));
}
