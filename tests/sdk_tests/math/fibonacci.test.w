bring math;

assert(math.fibonacci(0) == 0);
assert(math.fibonacci(1) == 1);
assert(math.fibonacci(2) == 1);
assert(math.fibonacci(3) == 2);
assert(math.fibonacci(4) == 3);
assert(math.fibonacci(5) == 5);
assert(math.fibonacci(6) == 8);
assert(math.fibonacci(7) == 13);
assert(math.fibonacci(8) == 21);
assert(math.fibonacci(9) == 34);
assert(math.fibonacci(10) == 55);

test "inflight fibonacci" {
  assert(math.fibonacci(0) == 0);
  assert(math.fibonacci(1) == 1);
  assert(math.fibonacci(2) == 1);
  assert(math.fibonacci(3) == 2);
  assert(math.fibonacci(4) == 3);
  assert(math.fibonacci(5) == 5);
  assert(math.fibonacci(6) == 8);
  assert(math.fibonacci(7) == 13);
  assert(math.fibonacci(8) == 21);
  assert(math.fibonacci(9) == 34);
  assert(math.fibonacci(10) == 55);
}