bring cloud;
bring expect;

let counterA = new cloud.Counter() as "counterA";
let counterB = new cloud.Counter(initial: 500) as "counterB";
let counterC = new cloud.Counter(initial: -198) as "counterC";

expect.equal(counterA.initial, 0);
expect.equal(counterB.initial, 500);
expect.equal(counterC.initial, -198);

test "initial:default" {
  expect.equal(counterA.peek(), 0);
}

test "initial:positive-value" {
  expect.equal(counterB.peek(), 500);
}

test "initial:negative-value" {
  expect.equal(counterC.peek(), -198);
}
