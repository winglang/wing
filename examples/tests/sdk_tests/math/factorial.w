bring math;

assert(math.factorial(0) == 1);
assert(math.factorial(1) == 1);
assert(math.factorial(2) == 2);
assert(math.factorial(3) == 6);
assert(math.factorial(4) == 24);
assert(math.factorial(5) == 120);

test "inflight factorial" {
  assert(math.factorial(0) == 1);
  assert(math.factorial(1) == 1);
  assert(math.factorial(2) == 2);
  assert(math.factorial(3) == 6);
  assert(math.factorial(4) == 24);
  assert(math.factorial(5) == 120);
}