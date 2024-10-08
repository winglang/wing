// This file was auto generated from an example found in: 16-closures.md_example_1
// Example metadata: {"valid":true}
let createCounter = (): (): num => {
  let var count = 0; // This variable is part of the closure

  return () => {
    count = count + 1;
    return count;
  };
};

let counter = createCounter();

log(counter());
log(counter());
log(counter());
