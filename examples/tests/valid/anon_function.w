// Define a function and assing it to a variable
let myfunc = (x: num) -> {
  print("${x}");
  x = x + 1;
  if (x > 3) {
    return;
  }
  // Recursevly call myself, this function name should be known
  // since it was defined in the outer scope
  myfunc(x);
};

myfunc(1);