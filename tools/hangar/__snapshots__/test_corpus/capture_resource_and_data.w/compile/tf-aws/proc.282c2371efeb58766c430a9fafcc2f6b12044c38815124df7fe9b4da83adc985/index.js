async handle(e) {
  const { data, queue, res } = this;
  {((cond) => {if (!cond) throw new Error(`assertion failed: '(data.size === 3)'`)})((data.size === 3))};
  (await res.put("file.txt","world"));
  {((cond) => {if (!cond) throw new Error(`assertion failed: '((await res.get("file.txt")) === "world")'`)})(((await res.get("file.txt")) === "world"))};
  (await queue.push("spirulina"));
}
