async handle() {
  const { bigOlPublisher } = this;
  (await bigOlPublisher.publish("foo"));
  const count = (await bigOlPublisher.getObjectCount());
}
