// This file was auto generated from an example found in: 14-variadic-functions.md_example_1
// Example metadata: {"valid":true}
// Function that will take an arbitrary number of numbers as arguments.
let plus = (...numbers: Array<num>) => {
  let var value = 0;

  for number in numbers {
    value = value + number;
  }

  return value;
};

// in this example you can pass any many numbers as you want
log(plus(1, 2));
log(plus(1, 2, 3));
log(plus(1, 2, 3, 4));
