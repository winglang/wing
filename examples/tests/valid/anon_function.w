// Define a function and assign it to a variable
let myfunc = (x: num) => {
  print("${x}");
  x = x + 1;
  if (x > 3.14) {
    return;
  }
  // Recursively call myself, this function name should be known
  // since it was defined in the outer scope
  myfunc(x);
};

myfunc(1);