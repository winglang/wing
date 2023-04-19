async handle() {
  const { a } = this;
  {((cond) => {if (!cond) throw new Error(`assertion failed: '("hey" === a.field)'`)})(("hey" === a.field))};
}
