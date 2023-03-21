async handle(message) { const { bucket } = this; {
  (await bucket.put("hello.txt",`Hello, ${message}!`));
  {console.log(`Hello, ${message}!`)};
  return message;
} };