let immutObj = Json {a: 123, b: "hello", c: [1, 2, 3]};
let mutObj = Json.deepCopyMut(immutObj);

immutObj.set("a", "foo");
//      ^^^ Unknown symbol "set" (TODO: better error message https://github.com/winglang/wing/issues/1660) 
