async handle(message) {
  const { bucket } = this;
  (await bucket.put("wing.txt",`Hello, ${message}`));
}
