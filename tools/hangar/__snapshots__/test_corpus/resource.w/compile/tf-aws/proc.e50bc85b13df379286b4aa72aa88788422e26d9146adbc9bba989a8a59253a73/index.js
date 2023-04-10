async handle() { const { bucket, res } = this; {
  const s = (await res.my_method());
  {((cond) => {if (!cond) throw new Error(`assertion failed: '(s === "counter is: 1")'`)})((s === "counter is: 1"))};
  {((cond) => {if (!cond) throw new Error(`assertion failed: '((await bucket.list()).length === 1)'`)})(((await bucket.list()).length === 1))};
} };