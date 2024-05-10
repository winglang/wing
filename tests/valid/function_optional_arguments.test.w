// Test non optional named args
struct Options {
  opt1: str;
  opt2: num;
}

let fn1 = (opts: Options): str => {
  return "{opts.opt1} {opts.opt2}";
};

// Pass as struct
assert(fn1({opt1: "hey", opt2: 1}) == "hey 1");
// Pass as named args
assert(fn1(opt1: "hey", opt2: 1) == "hey 1");

// Test optional named args
let fn2 = (opts: Options?): str => {
  if let opts = opts {
    return "{opts.opt1} {opts.opt2}";
  } else {
    return "none";
  }
};

// Pass as struct
assert(fn2({opt1: "hey", opt2: 1}) == "hey 1");
// Pass as named args
assert(fn2(opt1: "hey", opt2: 1) == "hey 1");
// Use default
assert(fn2() == "none");

// Test implicitly optional named args
// Since all fields are optional the arg is optional

struct ImplitictlyOptionalOptions {
  opt1: str?;
  opt2: num?;
}

let fn3 = (opts: ImplitictlyOptionalOptions): str => {
  return "{opts.opt1 ?? "none"} {opts.opt2 ?? 0}";
};

// Pass as struct
assert(fn3({opt1: "hey", opt2: 1}) == "hey 1");
// Pass as named args
assert(fn3(opt1: "hey", opt2: 1) == "hey 1");
// Pass some named args
assert(fn3(opt1: "hey") == "hey 0");
// Use empty struct
assert(fn3({}) == "none 0");
// Use default
assert(fn3() == "none 0");

// Test optional implicitly optional named args
let fn4 = (opts: ImplitictlyOptionalOptions?): str => {
  if let opts = opts {
    return "{opts.opt1 ?? "none"} {opts.opt2 ?? 0}";
  } else {
    return "none";
  }
};

// Pass as struct
assert(fn4({opt1: "hey", opt2: 1}) == "hey 1");
// Pass as named args
assert(fn4(opt1: "hey", opt2: 1) == "hey 1");
// Pass some named args
assert(fn4(opt1: "hey") == "hey 0");
// Use empty struct
assert(fn4({}) == "none 0");
// Use default
assert(fn4() == "none");