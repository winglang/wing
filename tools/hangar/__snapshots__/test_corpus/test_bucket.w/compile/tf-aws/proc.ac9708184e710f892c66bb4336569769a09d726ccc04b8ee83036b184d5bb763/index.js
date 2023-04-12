async handle(_) {
  const { b } = this;
  (await b.put("hello.txt","world"));
  {((cond) => {if (!cond) throw new Error(`assertion failed: '((await b.get("hello.txt")) === "world")'`)})(((await b.get("hello.txt")) === "world"))};
}
