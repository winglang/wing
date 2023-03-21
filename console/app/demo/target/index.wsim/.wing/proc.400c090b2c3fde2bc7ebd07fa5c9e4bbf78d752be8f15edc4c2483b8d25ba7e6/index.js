async handle(message) { const { counter } = this; {
  (await counter.inc());
  {console.log(`Counter is now ${(await counter.inc(0))}`)};
  return message;
} };