let extra = MutArray<Json>["bar"];
let base = [Json "foo"];
base.concat(extra.copy());

let base2 = Array<Json>["foo"];

let obj = {
  first: "ok",
  second: ["cool"].concat(base2)
};

