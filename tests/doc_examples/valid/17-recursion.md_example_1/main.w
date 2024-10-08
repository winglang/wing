// This file was auto generated from an example found in: 17-recursion.md_example_1
// Example metadata: {"valid":true}
let fact = (n: num): num => {
  if n == 0 {
    return 1;
  }
  return n * fact(n - 1);
};


log(fact(7));
