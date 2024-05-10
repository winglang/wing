bring math;

assert(math.acot(0) == 1.5707963267948966);
assert(math.acot(math.PI / 2) == 0.5669115049410094);
assert(math.acot(math.PI) == 0.30816907111598496);
assert(math.acot(math.TAU) == 0.15783119028815887);
assert(math.acot(-0) == -1.5707963267948966);

test "inflight arc cotgent" {
  assert(math.acot(0) == 1.5707963267948966);
  assert(math.acot(math.PI / 2) == 0.5669115049410094);
  assert(math.acot(math.PI) == 0.30816907111598496);
  assert(math.acot(math.TAU) == 0.15783119028815887);
  assert(math.acot(-0) == -1.5707963267948966);
}