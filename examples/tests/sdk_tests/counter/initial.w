bring cloud;

let counterA = new cloud.Counter() as "counterA";
let counterB = new cloud.Counter(initial: 500) as "counterB";
let counterC = new cloud.Counter(initial: -198) as "counterC";

new cloud.Function(inflight () => {
  assert(counterA.peek() == 0);
}) as "test:initial:default";

new cloud.Function(inflight () => {
  assert(counterB.peek() == 500);
}) as "test:initial:positive-value";

new cloud.Function(inflight () => {
  assert(counterC.peek() == -198);
}) as "test:initial:negative-value";
