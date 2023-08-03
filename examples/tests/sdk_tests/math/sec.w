bring math;

assert(math.sec(-0) == 1);
assert(math.sec(0) == 1);
assert(math.sec(1) == 1.8508157176809255);
assert(math.sec(-5) == 3.5253200858160887);
assert(math.sec(math.PI) == -1);
assert(math.sec(math.TAU) == 1);

test "inflight secant" {
  assert(math.sec(-0) == 1);
  assert(math.sec(0) == 1);
  assert(math.sec(1) == 1.8508157176809255);
  assert(math.sec(-5) == 3.5253200858160887);
  assert(math.sec(math.PI) == -1);
  assert(math.sec(math.TAU) == 1);
}