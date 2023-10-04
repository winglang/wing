let func = (...events: Array<Json>) => {
  log("hello");
};

let jsonStr = Json "str";

func("str", jsonStr); // variadic args should allow sub types
