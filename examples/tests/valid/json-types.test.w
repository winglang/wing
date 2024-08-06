

let extra = MutArray<Json>["bar"];
let base = [Json "foo"];
base.concat(extra.copy());

let base2 = Array<Json>["foo"];

let obj = {
  first: "ok",
  second: ["cool"].concat(base2)
};

let arr = MutArray<num>[1, 2, 3];
arr.push(4);

let map = MutMap<str>{"a" => "1"};
map.set("b", "2");

let takeJson = (obj: Json) => {
  
};

takeJson({ values: arr });
takeJson({ values: map });