async handle(e) {
  const { b, x } = this;
  (await b.put("file","foo"));
  {((cond) => {if (!cond) throw new Error(`assertion failed: '((await b.get("file")) === "foo")'`)})(((await b.get("file")) === "foo"))};
  {((cond) => {if (!cond) throw new Error(`assertion failed: '(12 === x)'`)})((12 === x))};
}
