async handle(message) { const { counter } = this; {
  const value = (await counter.inc());
  {console.log(`Counter is now ${(await counter.inc(0))}`)};
  {((cond) => {if (!cond) throw new Error(`assertion failed: '(value === 1)'`)})((value === 1))};
} };