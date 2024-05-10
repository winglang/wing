let func = (n: num, b: bool) => {};
func(); // Expected {} positional arguments but got {}

let optionalParamsFunc = (n: num, b: bool, s: str?) => {};
optionalParamsFunc(1); // Expected between {} and {} positional arguments but got {}

let variadicFunc = (n: num, b: bool, ...events: Array<Json>) => {};
variadicFunc(); // Expected {} positional arguments + variadic args but got {}


let variadicOptionalParamsFunc = (n: num, b: bool, s: str?, ...events: Array<Json>) => {};
variadicOptionalParamsFunc(2); // Expected between {} and {} positional arguments + variadic args but got {}

struct Options {
  prefix: str;
  priority: num;
}

let namedFunc = (n: num, b: bool, opts: Options) => {};
namedFunc(); // Expected {} positional arguments or named arguments for the last parameter but got {}

let namedOptionalParamsFunc = (n: num, b: bool, s: str?, opts: Options) => {};
namedOptionalParamsFunc(3); // Expected between {} and {} positional arguments or named arguments for the last parameter but got {}

// Variadic and named args cannot be combined atm

let invalidCombinationFunc = (n: num, b: bool, ...variadic: Array<str>, opts: Options) => {};
// Variadic param must be the last parameter

let invalidCombinationFunc2 = (n: num, b: bool, opts: Options, ...variadic: Array<str>) => {};
invalidCombinationFunc2(1, 2, prefix: "debug", priority: 0, "hello", "world");
// No named arguments expected as the struct is not the last parameter
