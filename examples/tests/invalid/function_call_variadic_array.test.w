let func = (...events: Array<str>) => {
  log("hello");
};

func(["a", "b", "c"]); // should fail and inform that the parameter is variadic
