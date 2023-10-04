let func = (n: num, b: bool, ...events: Array<Json>) => {
  assert(events.at(-1) == "d");
};

func(1, true, "a", "b", "c", "d"); // variadic args should count as 1 in arity check
