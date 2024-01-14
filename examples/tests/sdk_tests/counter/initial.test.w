bring cloud;
bring expect;

let counterA = new cloud.Counter() as "counterA";
let counterB = new cloud.Counter(initial: 500) as "counterB";
let counterC = new cloud.Counter(initial: -198) as "counterC";

test "initial:default" {
  expect.equal(counterA.peek(), 0);
}

test "initial:positive-value" {
  expect.equal(counterB.peek(), 500);
}

test "initial:negative-value" {
  expect.equal(counterC.peek(), -198);
}
