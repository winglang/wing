let func = (n: num, b: bool, ...events: Array<Json>) => {
  log("hello");
};

func(); // variadic signatures should still require min positional arity
