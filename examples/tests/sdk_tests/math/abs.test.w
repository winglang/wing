bring math;

let x = 3;
let y = 5;

assert(math.abs(y - x) == 2);
assert(math.abs(x - y) == 2);

test "inflight absolute" {
  assert(math.abs(x - y) == 2);
  assert(math.abs(y - x) == 2);
}