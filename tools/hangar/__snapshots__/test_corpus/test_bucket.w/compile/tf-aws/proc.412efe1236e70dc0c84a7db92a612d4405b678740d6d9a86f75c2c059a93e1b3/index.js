async handle(_) {
  const { b } = this;
  {((cond) => {if (!cond) throw new Error(`assertion failed: '((await b.list()).length === 0)'`)})(((await b.list()).length === 0))};
  (await b.put("hello.txt","world"));
  {((cond) => {if (!cond) throw new Error(`assertion failed: '((await b.list()).length === 1)'`)})(((await b.list()).length === 1))};
}
