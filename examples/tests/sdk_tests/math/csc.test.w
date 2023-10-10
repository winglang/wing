bring math;

assert(math.csc(-0) == -math.INF);
assert(math.csc(0) == math.INF);
assert(math.csc(1) == 1.1883951057781212);
assert(math.csc(-5) == 1.0428352127714058);
assert(math.csc(math.PI / 2) == 1);
assert(math.csc(math.TAU / 4) == 1);
assert(math.csc(math.PI * 3 / 2) == -1);
assert(math.csc(math.TAU * 3 / 4) == -1);

test "inflight cosecant" {
  assert(math.csc(-0) == -math.INF);
  assert(math.csc(0) == math.INF);
  assert(math.csc(1) == 1.1883951057781212);
  assert(math.csc(-5) == 1.0428352127714058);
  assert(math.csc(math.PI / 2) == 1);
  assert(math.csc(math.TAU / 4) == 1);
  assert(math.csc(math.PI * 3 / 2) == -1);
  assert(math.csc(math.TAU * 3 / 4) == -1);
}