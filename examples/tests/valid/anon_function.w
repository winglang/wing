// Define a function and assign it to a variable
let myfunc = (var x: num) -> void {
  log("${x}");
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
((var x: num) -> void {
  assert(x == 1);
})(1);