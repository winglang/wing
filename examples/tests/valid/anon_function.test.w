// Define a function and assign it to a variable
let myfunc = (var x: num) => {
  log("{x}");
  x = x + 1;
  if (x > 3.14) {
    return;
  }
  // Recursively call myself, this function name should be known
  // since it was defined in the outer scope
  myfunc(x);
};

myfunc(1);

// Immediately invoked function expression
((var x: num) => {
  assert(x == 1);
})(1);

// Immediately invoked function expression in inflight
struct S {
  a: str;
}

test "" {
  let x: S = S {
    a: () => {
      return "b";
    }()
  };
  assert(x.a == "b");
}
