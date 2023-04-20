async handle(s) {
  const { arr, map, set } = this;
  const b1 = (await arr.at(0));
  const b2 = (await arr.at(1));
  const q = (map)["my_queue"];
  (await b1.put("file1.txt","boom"));
  {((cond) => {if (!cond) throw new Error(`assertion failed: '((await b2.list()).length === 0)'`)})(((await b2.list()).length === 0))};
  {((cond) => {if (!cond) throw new Error(`assertion failed: '((await b1.get("file1.txt")) === "boom")'`)})(((await b1.get("file1.txt")) === "boom"))};
  (await q.push("hello"));
  {((cond) => {if (!cond) throw new Error(`assertion failed: '(await set.has("foo"))'`)})((await set.has("foo")))};
  {((cond) => {if (!cond) throw new Error(`assertion failed: '(set.size === 2)'`)})((set.size === 2))};
}
