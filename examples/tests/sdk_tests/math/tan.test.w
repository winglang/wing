bring math;

assert(math.tan(-0) == -0);
assert(math.tan(0) == 0);
assert(math.tan(1) == 1.5574077246549023);
assert(math.tan(math.PI / 4) == 0.9999999999999999);

test "inflight tangent" {
  assert(math.tan(-0) == -0);
  assert(math.tan(0) == 0);
  assert(math.tan(1) == 1.5574077246549023);
  assert(math.tan(math.PI / 4) == 0.9999999999999999);
}