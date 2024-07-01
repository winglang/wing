let func = (...events: Array<str>) => {};

func(1, 2, 3); // should fail due to wrong type for variadic
func(["a", "b", "c"]); // should fail as the parameter is variadic
