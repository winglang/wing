bring math;
// TODO: need to handle NaN
// assert(math.asin(-2) == NaN);
assert(math.asin(-1) == -1.5707963267948966);
assert(math.asin(-0) == -0);
assert(math.asin(0) == 0);
assert(math.asin(0.5) == 0.5235987755982989);
assert(math.asin(1) == 1.5707963267948966);
// TODO: need to handle NaN
// assert(math.asin(2) == NaN);

test "inflight arc sine" {
  // TODO: need to handle NaN
  // assert(math.asin(-2) == NaN);
  assert(math.asin(-1) == -1.5707963267948966);
  assert(math.asin(-0) == -0);
  assert(math.asin(0) == 0);
  assert(math.asin(0.5) == 0.5235987755982989);
  assert(math.asin(1) == 1.5707963267948966);
  // TODO: need to handle NaN
  // assert(math.asin(2) == NaN);
}