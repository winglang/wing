bring cloud;

let counterA = new cloud.Counter() as "counterA";
let counterB = new cloud.Counter(initial: 500) as "counterB";
let counterC = new cloud.Counter(initial: -198) as "counterC";

test "initial:default" {
  assert(counterA.peek() == 0);
}

test "initial:positive-value" {
  assert(counterB.peek() == 500);
}

test "initial:negative-value" {
  assert(counterC.peek() == -198);
}
