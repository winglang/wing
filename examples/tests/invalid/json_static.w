let j = MutJson {a: 123, b: "hello", c: [1, 2, 3]};
let immut_j = Json.clone(j);

immut_j.set("a", "foo");
//      ^^^ Unknown symbol "set" (TODO: better error message https://github.com/winglang/wing/issues/1660) 
