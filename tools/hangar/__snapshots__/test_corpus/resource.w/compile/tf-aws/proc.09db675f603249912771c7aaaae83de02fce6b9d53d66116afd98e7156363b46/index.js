async handle() {
  const { bucket, res } = this;
  const s = (await res.my_method());
  {((cond) => {if (!cond) throw new Error(`assertion failed: '(s === "counter is: 101")'`)})((s === "counter is: 101"))};
  {((cond) => {if (!cond) throw new Error(`assertion failed: '((await bucket.list()).length === 1)'`)})(((await bucket.list()).length === 1))};
  {((cond) => {if (!cond) throw new Error(`assertion failed: '(res.foo.inflight_field === 123)'`)})((res.foo.inflight_field === 123))};
}
