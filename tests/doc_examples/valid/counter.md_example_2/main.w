// This file was auto generated from an example found in: counter.md_example_2
// Example metadata: {"valid":true}
bring cloud;

let counter = new cloud.Counter();

let counterFunc = inflight () => {
  let prev = counter.inc(); // increment by 1 and return previous value
  counter.inc(5); // increment by 5
  counter.dec(); // decrement by 1
  counter.dec(2); // decrement by 2

  assert(counter.peek() == 3); // check the current value

  counter.set(100); // set to a specific value
};

new cloud.Function(counterFunc);
