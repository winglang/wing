bring math;

assert(math.atan(-1) == -0.7853981633974483);
assert(math.atan(-0) == -0);
assert(math.atan(0) == 0);
assert(math.atan(1) == 0.7853981633974483);

test "inflight arc tangent" {
  assert(math.atan(-1) == -0.7853981633974483);
  assert(math.atan(-0) == -0);
  assert(math.atan(0) == 0);
  assert(math.atan(1) == 0.7853981633974483);
}