// This file was auto generated from an example found in: counter.md_example_3
// Example metadata: {"valid":true}
bring cloud;

let counter = new cloud.Counter(initial: 100);

let counterFunc = inflight () => {
  let k1 = "key-1";
  let k2 = "key-2";

  counter.dec(1, k1); // decrement k1 by 1
  counter.inc(11, k2); // increment k2 by 11

  assert(counter.peek(k1) == 99); // check the current value of k1
  assert(counter.peek(k2) == 111); // check the current value of k2
};

new cloud.Function(counterFunc);
