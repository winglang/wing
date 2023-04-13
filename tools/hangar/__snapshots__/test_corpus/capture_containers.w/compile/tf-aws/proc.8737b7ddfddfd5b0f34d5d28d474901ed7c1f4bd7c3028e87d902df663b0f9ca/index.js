async handle(s) {
  const { arr, arr_of_map, j, my_map, my_set } = this;
  {((cond) => {if (!cond) throw new Error(`assertion failed: '((await arr.at(0)) === "hello")'`)})(((await arr.at(0)) === "hello"))};
  {((cond) => {if (!cond) throw new Error(`assertion failed: '((await arr.at(1)) === "world")'`)})(((await arr.at(1)) === "world"))};
  {((cond) => {if (!cond) throw new Error(`assertion failed: '(arr.length === 2)'`)})((arr.length === 2))};
  {((cond) => {if (!cond) throw new Error(`assertion failed: '(await my_set.has("my"))'`)})((await my_set.has("my")))};
  {((cond) => {if (!cond) throw new Error(`assertion failed: '(my_set.size === 2)'`)})((my_set.size === 2))};
  {((cond) => {if (!cond) throw new Error(`assertion failed: '("world" in (my_map))'`)})(("world" in (my_map)))};
  {((cond) => {if (!cond) throw new Error(`assertion failed: '(Object.keys(my_map).length === 2)'`)})((Object.keys(my_map).length === 2))};
  {((cond) => {if (!cond) throw new Error(`assertion failed: '("bang" in ((await arr_of_map.at(0))))'`)})(("bang" in ((await arr_of_map.at(0)))))};
  {((cond) => {if (!cond) throw new Error(`assertion failed: '((j)["b"] === "world")'`)})(((j)["b"] === "world"))};
}
