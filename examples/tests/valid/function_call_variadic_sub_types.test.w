let func = (...events: Array<Json>) => {
  assert(events.at(0) == "str");
  assert(events.at(1) == "str");
};

let jsonStr = Json "str";

func("str", jsonStr); // variadic args should allow sub types
